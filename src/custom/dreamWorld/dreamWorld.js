import DE from '@dreamirl/dreamengine';
import CONFIG from 'config';
import { GameScreen } from '@dreamirl/de-plugin-gamescreen';
import DreamWorldControler from 'DreamWorldControler';
import Planet from 'Planet';
import Player from 'Player';
import Hud from 'Hud';

var dreamWorld = new GameScreen( "dreamWorld", {
  camera: [ 0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, {} ]
  , initialize: function()
  {
    var self = this;

    this.controler = new DreamWorldControler( this );
    this.hud = new Hud();
    this.scene.add( this.controler, this.hud );

    this.scene.filterArea = new PIXI.Rectangle(-4000,-4000,8000,8000);
    this.scene.filters = [];

    this.collectibles = [];

    this.on( "show", function( self, args )
    {
      this.spawnPlanets();
      this.spawnPlayer();
    } );
    this.on( "hide", function()
    {
      
    } );
  }
} );

dreamWorld.spawnPlanets = function()
{
  this.planetSpawn = new Planet( { planetId: Planet.IDS.vide } );
  
  this.add( this.planetSpawn );
  this.planets = [ this.planetSpawn ];

  this.collectibles = this.collectibles.concat( this.planetSpawn.spawnCollectibles( 5 ) );
  
  for ( let index = 1; index < 4; index++ ) {
    
    var planet = new Planet( { planetId: Planet.IDS[ index ] } );
    
    planet.x = ( index % 2 ) * 1000;
    planet.y = ( index > 1 ? 1000 : 0 );

    this.add( planet );
    this.planets.push( planet );

    this.collectibles = this.collectibles.concat( planet.spawnCollectibles( 5 ) );
  }

  this.add( this.collectibles );
}

dreamWorld.spawnPlayer = function()
{
  this.player = new Player( { skin: "" } );

  this.player.y = this.planetSpawn.y - this.planetSpawn.height / 2;

  this.add( this.player );

  this.camera.focus( this.player, { options: { rotation: true } } );
  
  this.player.add( this.hud.slots );
}

export default dreamWorld;