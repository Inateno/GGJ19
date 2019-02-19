import DE from '@dreamirl/dreamengine';
import { GameScreen } from '@dreamirl/de-plugin-gamescreen';
import MessageBox from '@dreamirl/de-plugin-messagebox';
import ChooseBox from '@dreamirl/de-plugin-choosebox';

import CONFIG from 'config';
import dreamWorld from 'dreamWorld'
import speedToTime from 'speedToTime';

import Weather     from './Weather';
import House       from './House';
import Environment from './Environment';
import Inside      from './Inside';
import RoomType    from './RoomType';
import Pet         from './Pet';

import Collectible from 'Collectible'
import BtnAudio    from 'BtnAudio'

var homeWorld = new GameScreen( "HomeWorld", {
  camera: [ 0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, {} ]
  , initialize: function()
  {
    var self = this;

    this.camera.pointerup = function()
    {
      MessageBox.shutDownCurrentBox();
    };
    /*** */
    if ( process.env.NODE_ENV === 'development' ) {
      console.error( 'debug is active' );
      window.wt = this.weather;
      window.home = this;
    }
    /*** */

    this.title = new DE.GameObject( {
      x: CONFIG.SCREEN_WIDTH / 2,
      zindex: 20,
      z: -2,
      renderer: new DE.SpriteRenderer( { spriteName: 'title' } ),
      hitArea: new DE.PIXI.Rectangle( -1000, -1000, 2000, 2000 ),
      interactive: true,
      pointerup: () => {
        this.interactive = false;
        self.startGame();
      }
    } );
    this.character = new DE.GameObject( {
      x: CONFIG.CHARACTER_INITIAL_X,
      y: CONFIG.CHARACTER_INITIAL_Y,
      zindex: 10,
      renderer: new DE.SpriteRenderer( { spriteName: 'real-char-walk', y: -80, scale: 1 } )
    } );
    this.character.enable = true;
    this.character.makeMove = function( target, duration, cb )
    {
      if ( target.x < this.x ) {
        this.renderer.scale.x = -1;
      }
      else {
        this.renderer.scale.x = 1;
      }
      this.renderer.changeSprite( 'real-char-walk' );
      this.moveTo( target, duration, cb );
    };
    this.clouds = [
      new DE.GameObject( {
        x: 200, y: 170, zindex: 19,
        renderer: new DE.SpriteRenderer( { spriteName: 'cloud-1' } ),
        revertPos: function() {
          this.y += this.rdir * 20;
          this.rdir = -this.rdir;
        },
        rdir: -1,
        automatisms: [ [
          'revertPos', 'revertPos', { interval: 723 }
        ] ]
      } ),
      new DE.GameObject( {
        x: CONFIG.SCREEN_WIDTH - 200, y: 110, zindex: 19,
        renderer: new DE.SpriteRenderer( { spriteName: 'cloud-2' } ),
        revertPos: function() {
          this.y += this.rdir * 20;
          this.rdir = -this.rdir;
        },
        rdir: 1,
        automatisms: [ [
          'revertPos', 'revertPos', { interval: 1083 }
        ] ]
      } )
    ];

    this.btnAudio = new BtnAudio( DE.Audio.isMuted() );
    this.btnAudio.enable = false;

    this.weather     = new Weather();
    this.weather.collectibleTarget = CONFIG.DAY_COLLECTIBLE_TARGETS.WEATHER;
    this.environment = new Environment();
    this.environment.collectibleTarget = CONFIG.DAY_COLLECTIBLE_TARGETS.ENV;
    this.house       = new House();
    this.house.collectibleTarget = CONFIG.DAY_COLLECTIBLE_TARGETS.HOUSE;
    this.overHouse   = new House( 'outside' );
    this.overHouse.zindex += 10;
    this.inside      = new Inside();
    this.inside.collectibleTarget = CONFIG.DAY_COLLECTIBLE_TARGETS.INSIDE;
    this.roomType    = new RoomType();
    this.roomType.collectibleTarget = CONFIG.DAY_COLLECTIBLE_TARGETS.ROOM;
    this.pet         = new Pet();
    this.pet.collectibleTarget = CONFIG.DAY_COLLECTIBLE_TARGETS.PET;

    this.afterNightCollectible = new Collectible( { type: "bobo", phase: 1, scale: 1 } );
    this.afterNightCollectible.zindex = 50;
    this.afterNightCollectible.enable = false;

    this.customOrder = [
      this.weather,
      this.environment,
      this.house,
      this.inside,
      this.roomType,
      this.pet
    ];

    this.currentDay = 0;

    this.animTransition = new DE.GameObject( {
      zindex: 100,
      renderer: new DE.SpriteRenderer( { spriteName: "anim-transition-nuit" } )
    } );
    this.animTransition.enable = false;
    this.animTransition.x = CONFIG.SCREEN_WIDTH / 2;
    this.animTransition.y = CONFIG.SCREEN_HEIGHT / 2;
    this.animTransition.width = CONFIG.SCREEN_WIDTH;
    this.animTransition.height = CONFIG.SCREEN_HEIGHT;

    this.scene.add( this.customOrder, this.character, this.title, this.overHouse, this.weather.bg, this.animTransition, this.afterNightCollectible, this.clouds, this.btnAudio );

    this.on( "show", function( params  )
    {
      this.camera.fadeIn( undefined, true );
      this.animTransition.enable = false;
      this.animTransition.renderer.restartAnim();

      this.btnAudio.updateSprite();

      if( this.tempFilters )
      {
        this.scene.filters = this.tempFilters;
        this.tempFilters = undefined;
      }

      // console.log( "show", params, this.currentDay );
      if ( params && params.type ) {
        this.afterNight( params.type );
      }
      else {
        this.overHouse.enable = true;
        this.title.y = 170;
        this.title.fadeIn( 500, true );

        // this.environment.enable = false;
        DE.Audio.music.stopAllAndPlay( 'main-theme' );
      }
    } );
    this.on( "hide", function()
    {

    } );

    this.currentDailyIndex = 0;
    this.dailyCheck = function( index ) {
      this.currentDailyIndex = index;

      // console.log( "daily check", this.currentDailyIndex, "day", this.currentDay );
      let target = this.customOrder[ CONFIG.ANIM.DAILY_INDEXES[ this.currentDailyIndex ] - 1 ];
      var isHappy = target && target.currentCusto !== undefined;

      if ( this.currentDailyIndex >= CONFIG.ANIM.DAILY_ORDER.length ) {
        // console.log( 'time to sleep' );

        if ( this.currentDay < 6 ) {
          setTimeout( () => this.goSleep(), 500 );
        }
        else {
          MessageBox.create( DE.Localization.get( 'is-it-home' ), () => {
            this.character.renderer.setPause(true);
            
            MessageBox.create( DE.Localization.get( 'wanna-restart' ) );
            ChooseBox.create( [
              { text: DE.Localization.get( 'yes' ), value: 1 },
              { text: DE.Localization.get( 'no' ), value: 0 }
            ], value => {
              MessageBox.removeAll();
              if ( value ) {
                this.currentDay = 1;
                this.currentDailyIndex = 0;
                this.character.x = -70;
                this.environment.reset();
                this.house.reset();
                this.weather.reset();
                this.inside.reset();
                this.pet.reset();
                this.roomType.reset();
                this.dailyCheck( 0 );
                DE.Audio.music.stopAllAndPlay( 'main-theme' );
              }
              else {
                MessageBox.create( DE.Localization.get( 'credits-thanks' ), () => {
                  MessageBox.create( DE.Localization.get( 'credits-theme' ), () => {
                    MessageBox.create( DE.Localization.get( 'credits-team' ), () => {
                        MessageBox.create( DE.Localization.get( 'the-end' ) );
                    } );
                  } );
                } );
              }
              this.character.renderer.setPause(false);
            } );
          } );
        }
        return;
      }
      if ( this.currentDailyIndex === 1 && this.currentDay === 0 ) {
        this.overHouse.addAutomatism( "fo", "fadeOut", { interval: 200, persistent: false } );
      }
      let pos = this.character.getWorldPos();
      let targetPos = {
        x: CONFIG.ANIM.DAILY_CHECK[ CONFIG.ANIM.DAILY_ORDER[ this.currentDailyIndex ] ],
        y: pos.y
      };
      if ( this.currentDay === 0 && this.currentDailyIndex === 0 ) {
        targetPos.x = 200;
      }
      
      this.character.makeMove( targetPos,
        speedToTime( pos, targetPos, CONFIG.CHARACTER_SPEED ),
        () => {
          this.character.renderer.changeSprite( isHappy ? 'real-char-happy' : 'real-char-idle' );
          setTimeout(() => this.displayDailyMessage(), 20 );//CONFIG.ANIM.IDLE_DURATION );
        }
      );
    }

    /**
     * create the message corresponding to what the character is checking
     */
    this.displayDailyMessage = function()
    {
      let target = this.customOrder[ CONFIG.ANIM.DAILY_INDEXES[ this.currentDailyIndex ] - 1 ];
      var key = "custom-" + CONFIG.ANIM.DAILY_ORDER[ this.currentDailyIndex ].toLowerCase();
      if ( target && target.currentCusto !== undefined ) {
        key += "-" + target.currentCusto;
      }
      
      // console.log( "key is", key );
      var msg = DE.Localization.get( key );
      if ( this.currentDay === 0 && this.currentDailyIndex === 0 ) {
        msg = DE.Localization.get( 'new-house' );
      }
      MessageBox.create( msg, () => {
        if ( this.currentDay > 0 && CONFIG.ANIM.DAILY_INDEXES[ this.currentDailyIndex ] === this.currentDay ) {
          this.askToKeep();
        }
        else {
          this.dailyCheck( this.currentDailyIndex + 1 );
        }
      } );
    };

    /**
     * create the choose box that ask if we keep it or not, if answer is not, rollback one day
     */
    this.askToKeep = function()
    {
      MessageBox.create( DE.Localization.get( 'keep-it' ) );
      ChooseBox.create( [
        { text: DE.Localization.get( 'yes' ), value: 1 },
        { text: DE.Localization.get( 'no' ), value: 0 }
      ], value => {
        MessageBox.removeAll();
        if ( value ) {
          this.dailyCheck( this.currentDailyIndex + 1 );
        }
        else {
          MessageBox.create( DE.Localization.get( 'not-keeping' ), () => {
            this.currentDay--;
            dreamWorld.phase--;
            this.dailyCheck( CONFIG.ANIM.DAILY_ORDER.length - 1 );
          } );
        }
      } );
    };

    // animation start
    this.startGame = function() {
      // console.log( "start me" );
      this.title.fadeOut( 1500 );
      this.title.moveTo( { y: -150 }, 1500, () => {
        this.title.enable = false;
        this.btnAudio.enable = true;
        this.dailyCheck( 0 );
      } );
      this.clouds.forEach(go => {
        go.moveTo( { x: go.x > CONFIG.SCREEN_WIDTH * 0.5 ? CONFIG.SCREEN_WIDTH + 300 : -300 }, 2000, function(){ this.enable = false; } );
      });
    };
  
    this.afterNight = function( result ) {
      DE.Audio.music.stopAllAndPlay( 'house-' + result );
      DE.Audio.music.get( 'house-' + result ).fade( 0, 1, 500 );
      let target = this.customOrder[ this.currentDay ];

      this.afterNightCollectible.customize( result, this.currentDay + 1, 0 );
      this.afterNightCollectible.enable = true;
      this.afterNightCollectible.x = this.character.x;
      this.afterNightCollectible.y = this.character.y - 80;

      this.character.renderer.changeSprite( 'real-char-happy' );

      setTimeout( () => 
      { 
        this.afterNightCollectible.scaleTo( ( ( this.currentDay + 1 ) > 1 ? 1 : 2 ), 1000, () => 
        {
          this.afterNightCollectible.moveTo( target.collectibleTarget, 2000, () => 
          {
            this.afterNightCollectible.scaleTo( 0, 500, () => 
            {
              this.currentDay++;
              var filters = target.customize( result );

              if ( filters ) {
                this.scene.filters = filters;
              }

              if ( this.weather.rain.enable ) {
                DE.Audio.music.play( 'rain' );
                DE.Audio.music.get( 'rain' ).fade( 0, 1, 500 );
              }

              if ( this.environment.renderer.spriteName === 'env-ecolo' ) {
                DE.Audio.music.play( 'nature' );
                DE.Audio.music.get( 'nature' ).fade( 0, 1, 500 );
              }
              else if ( this.environment.renderer.spriteName === 'env-kitch' ) {
                DE.Audio.music.play( 'sea' );
                DE.Audio.music.get( 'sea' ).fade( 0, 1, 500 );
              }

              this.dailyCheck( 0 );

              this.house.closeDoor();
            } );
          } );
        } );
      }, 1000);
    };

    this.goSleep = function() {
      // TODO make transition great again
      this.character.renderer.changeSprite( 'real-char-back' );
      const musics = DE.Audio.music.getAll();
      for ( let i in musics ) {
        musics[ i ].fade(1, 0, 2000);
      }

      this.house.openDoor();

      setTimeout( () => {
        if( this.scene.filters && this.scene.filters.length > 0 )
        {
          this.tempFilters = this.scene.filters;
          this.scene.filters = [];
        }
          
        this.animTransition.enable = true;
        this.animTransition.fadeIn( 250, true );
        this.animTransition.renderer.onAnimEnd = () => {
          DE.Audio.fx.play( 'warp' );
          this.trigger( 'changeScreen', 'dreamWorld' );
        }
      }, 750 );
    };
  }
} );

export default homeWorld;