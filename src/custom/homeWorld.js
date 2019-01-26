import DE from '@dreamirl/dreamengine';
import CONFIG from 'config';
import { GameScreen } from '@dreamirl/de-plugin-gamescreen';

var homeWorld = new GameScreen( "HomeWorld", {
  camera: [ 0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, {} ]
  , initialize: function()
  {
    var self = this;

    this.house = new DE.GameObject( {
      x: CONFIG.SCREEN_WIDTH / 2
      ,y: CONFIG.SCREEN_HEIGHT / 2
      ,renderer: new DE.SpriteRenderer( { spriteName: "house" } )
    } );

    this.scene.add(this.house);

    this.on( "show", function( self, args )
    {

    } );
    this.on( "hide", function()
    {

    } );
  }
} );

export default homeWorld;