import DE from '@dreamirl/dreamengine';
import { GameScreen } from '@dreamirl/de-plugin-gamescreen';

import CONFIG from 'config';

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

    this.title = new DE.GameObject( {
      x: CONFIG.SCREEN_WIDTH / 2,
      zindex: 20,
      z: -2,
      renderer: new DE.SpriteRenderer( { spriteName: "title" } ),
      hitArea: new DE.PIXI.Rectangle( 0, 0, 1000, 1000 ),
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
      this.renderer.changeSprite( 'real-char-walk' );
      this.moveTo( target, duration, cb );
    };

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

    // this.scene.add( this.house, this.character, this.title );
    this.scene.add( this.customOrder, this.character, this.title, this.overHouse );

    this.on( "show", function( self, args )
    {
      if ( args && args[ 1 ] ) {
        this.afterNight( args[ 1 ] );
      }
      else {
        this.house.enable = false;
        this.overHouse.enable = true;
        this.title.y = 170;
        this.title.fadeIn( 500, true );
      }
    } );
    this.on( "hide", function()
    {

    } );

    this.currentDailyIndex = 0;
    this.dailyCheck = function( index ) {
      this.character.renderer.changeSprite( 'real-char-idle' );
      if ( index >= CONFIG.ANIM.DAILY_ORDER.length ) {
        console.log( 'time to sleep' );
        setTimeout( () => this.goSleep(), 500 );
        return;
      }
      if ( index === 1 && this.currentDay === 0 ) {
        this.house.enable = true;
        this.overHouse.fadeOut();
      }
      this.currentDailyIndex = index;
      let pos = this.character.getWorldPos();
      let targetPos = {
        x: CONFIG.ANIM.DAILY_CHECK[ CONFIG.ANIM.DAILY_ORDER[ this.currentDailyIndex ] ],
        y: pos.y
      };
      this.character.addAutomatism( 'mt', 'makeMove', {
        args: [
          targetPos,
          speedToTime( pos, targetPos, CONFIG.CHARACTER_SPEED ),
          () => this.dailyCheck( this.currentDailyIndex + 1 )
        ],
        interval: CONFIG.ANIM.IDLE_DURATION,
        persistent: false
      } );
    }

    // animation start
    this.startGame = function() {
      console.log( "start me" );
      // TODO animate clouds to popout
      this.title.fadeOut( 1500 );
      this.title.moveTo( { y: -150 }, 1500, () => {
        this.dailyCheck( 0 );
      } );
    };
  
    this.afterNight = function( result ) {
      let target = this.customOrder[ this.currentDay ];
      target.customize( result );
  
      this.character.animate( target.name, result )
        .then( () => {
          this.currentDay++;
          this.goSleep();
        } );
    };
    this.goSleep = function() {
      // TODO make transition great again
  
      this.trigger( 'changeScreen', 'dreamWorld' );
    };
  }
} );

function speedToTime( position, target, speed ) {
  var vector = new DE.Vector2( position.x, position.y );
  var distance = vector.getDistance( target );

  return distance / speed * 16 >> 0;
}

export default homeWorld;