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

var homeWorld = new GameScreen( "HomeWorld", {
  camera: [ 0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, {} ]
  , initialize: function()
  {
    var self = this;

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


    this.weather     = new Weather();
    this.environment = new Environment();
    this.house       = new House();
    this.overHouse   = new House( 'outside' );
    this.overHouse.zindex += 10;
    this.inside      = new Inside();
    this.roomType    = new RoomType();
    this.pet         = new Pet();

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

    this.scene.add( this.customOrder, this.character, this.title, this.overHouse, this.weather.bg, this.animTransition, this.clouds );

    this.on( "show", function( params  )
    {
      this.camera.fadeIn( undefined, true );
      this.animTransition.enable = false;
      this.animTransition.renderer.restartAnim();
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
            if ( window.confirm( DE.Localization.get( 'wanna-restart' ) ) ) {
              this.currentDay = 0;
              this.currentDailyIndex = 0;
              this.character.x = -70;
              this.environment.reset();
              this.house.reset();
              this.weather.reset();
              this.inside.reset();
              this.pet.reset();
              this.roomType.reset();
              this.dailyCheck( 0 );
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
        msg = "Voyons voir cette nouvelle maison";
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
      MessageBox.create( "On garde ?" );
      ChooseBox.create( [
        { text: 'Oui', value: 1 },
        { text: 'Non', value: 0 }
      ], value => {
        MessageBox.removeAll();
        if ( value ) {
          this.dailyCheck( this.currentDailyIndex + 1 );
        }
        else {
          MessageBox.create( "Ah... Bon, je ferais mieux de retourner me coucher." );
          this.currentDay--;
          dreamWorld.phase--;
          this.dailyCheck( CONFIG.ANIM.DAILY_ORDER.length - 1 );
        }
      } );
    };

    // animation start
    this.startGame = function() {
      // console.log( "start me" );
      this.title.fadeOut( 1500 );
      this.title.moveTo( { y: -150 }, 1500, () => {
        this.title.enable = false;
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
      // console.log( result, this.currentDay, target )
      this.currentDay++;
      var filters = target.customize( result );

      if ( filters ) {
        if ( !this.scene.filters ) {
          this.scene.filters = [];
        }
        this.scene.filters = this.scene.filters.concat( filters );
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
    };

    this.goSleep = function() {
      // TODO make transition great again
      this.character.renderer.changeSprite( 'real-char-back' );
      const musics = DE.Audio.music.getAll();
      for ( let i in musics ) {
        musics[ i ].fade(1, 0, 2000);
      }

      setTimeout( () => {
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