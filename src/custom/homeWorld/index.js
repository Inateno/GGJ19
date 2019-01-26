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
      zindex: 10,
      z: -2,
      renderer: new DE.SpriteRenderer( { spriteName: "title" } ),
      hitArea: new DE.PIXI.Rectangle( 0, 0, 1000, 1000 ),
      pointerup: () => {
        this.interactive = false;
        self.startGame();
      }
    } );
    this.character = new DE.GameObject( {
      x: CONFIG.SCREEN_WIDTH * 0.5,
      y: CONFIG.SCREEN_HEIGHT * 0.7,
      zindex: 10,
      renderer: new DE.SpriteRenderer( { spriteName: 'real-char-walk', y: -80, scale: 1 } ),
      gameObjects: [
        new DE.GameObject( {
          x: 200,
          renderer: new DE.SpriteRenderer( { spriteName: 'real-char-idle', y: -80, scale: 1 } )
        } ),
        new DE.GameObject( {
          x: 100,
          renderer: new DE.SpriteRenderer( { spriteName: 'real-char-happy', y: -80, scale: 1 } )
        } )
        ,new DE.GameObject( {
          x: -200,
          renderer: new DE.SpriteRenderer( { spriteName: 'dream-char-walk', y: -80, scale: 1 } )
        } ),
        new DE.GameObject( {
          x: -100,
          renderer: new DE.SpriteRenderer( { spriteName: 'dream-char-fly', y: -80, scale: 1 } )
        } )
      ]
    } );
    window.character = this.character;
    window.title = this.title;
    
    // this.weather     = new Weather();
    // this.environment = new Environment();
    this.house       = new House();
    window.house = this.house;
    // this.inside      = new Inside();
    // this.roomType    = new RoomType();
    // this.pet         = new Pet();

    // this.customOrder = [
    //   this.weather,
    //   this.environment,
    //   this.house,
    //   this.inside,
    //   this.roomType,
    //   this.pet
    // ];

    this.currentDay = 0;

    this.scene.add( this.house, this.character, this.title );
    // this.scene.add( this.customOrder, this.character, this.title );

    this.on( "show", function( self, args )
    {
      if ( args && args[ 1 ] ) {
        this.afterNight( args[ 1 ] );
      }
      else {
        this.title.y = 170;
        this.title.fadeIn( 500, true );
      }
    } );
    this.on( "hide", function()
    {

    } );
  },
  startGame: () => {
    // TODO animate clouds to popout

    this.title.fadeOut( 1500 );
    this.title.moveTo( { y: -150 }, 2500, () => this.goSleep() );
  },

  afterNight: ( result ) => {
    let target = this.customOrder[ this.currentDay ];
    target.customize( result );

    this.character.animate( target.name, result )
      .then( () => {
        this.currentDay++;
        this.goSleep();
      } );
  }
  , goSleep: () => {
    // TODO make transition great again

    this.trigger( 'changeScreen', 'dreamWorld' );
  }
} );

export default homeWorld;