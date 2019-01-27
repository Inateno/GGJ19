import DE from '@dreamirl/dreamengine';
import CONFIG from 'config';
import { GameScreen } from '@dreamirl/de-plugin-gamescreen';
import DreamWorldControler from 'DreamWorldControler';
import Planet from 'Planet';
import Player from 'Player';
import Hud from 'Hud';

var dreamWorld = new GameScreen( "dreamWorld", {
  camera: [ 0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, { } ]
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
  this.planetSpawn = new Planet( { planetId: Planet.IDS.vide, scale: 0.5 } );
  
  this.add( this.planetSpawn );
  this.planets = [ this.planetSpawn ];
  
  var vectorTranslation = new DE.Vector2( 0, 0 );

  for ( let i = 1; i < 6; i++ ) {
    
    var bigPlanet = new Planet( { planetId: Planet.IDS[ i ] } );
    
    vectorTranslation.rotate( ( Math.PI * 2 / 5 ) * ( i - 1 ), true );
    vectorTranslation.translate( { x: 0, y: -1500 }, false, true );

    bigPlanet.x = vectorTranslation.x;
    bigPlanet.y = vectorTranslation.y;
    bigPlanet.rotation = vectorTranslation.rotation;

    this.add( bigPlanet );
    this.planets.push( bigPlanet );

    this.collectibles = this.collectibles.concat( bigPlanet.spawnCollectibles( 2 ) );

    for ( let j = 1; j < 5; j++ ) {
      var smallPlanet = new Planet( { planetId: Planet.IDS[ i ], scale: 0.5 } );

      vectorTranslation.rotation = bigPlanet.rotation;
      vectorTranslation.x = bigPlanet.x;
      vectorTranslation.y = bigPlanet.y;

      vectorTranslation.rotate( ( Math.PI * 2 / 4 ) * ( j - 1 ), true );
      vectorTranslation.translate( { x: 0, y: -750 }, false, true );

      smallPlanet.x = vectorTranslation.x;
      smallPlanet.y = vectorTranslation.y;

      this.add( smallPlanet );
      this.planets.push( smallPlanet );

      this.collectibles = this.collectibles.concat( smallPlanet.spawnCollectibles( 2 ) );
    }

    vectorTranslation.x = 0;
    vectorTranslation.y = 0;
    vectorTranslation.rotation = 0;
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