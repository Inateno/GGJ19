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

    /*** DEBUG MODE */
      /*window.dreamw = this;
       dreamw.scene.scale.x = 0.1;
       dreamw.scene.scale.y = 0.1;
       dreamw.camera.x = 1280;
       dreamw.camera.y = 720;*/
    /*** */
    
    this.background = new DE.GameObject( {
      x: -5000,
      y: -5000,
      zindex:-50,
      renderer: new DE.TilingRenderer( { spriteName: "tileBackground", width: 10000, height: 10000 } )
    } );
    /*this.background.x = -CONFIG.SCREEN_WIDTH / 2;
    this.background.y = -CONFIG.SCREEN_HEIGHT / 2;*/
    this.background.focus( this.camera );
    this.scene.add( this.background );

    this.scene.filterArea = new PIXI.Rectangle(-4000,-4000,8000,8000);
    this.scene.filters = [];

    this.collectibles = [];
    this.planets = [];

    this.scene.interactive = true; 
    this.scene.pointerdown = ( pos ) => {
      if ( this.player )
      {
        this.player.onPointerDown( pos );
      }
    }

    this.scene.pointermove = ( pos ) => {
      if ( this.player )
      {
        this.player.onPointerMove( pos );
      }
    }

    this.scene.pointerup = ( pos ) => {
      if ( this.player )
      {
        this.player.onPointerUp( pos );
      }
    }

    

    this.on( "show", function( self, args )
    {
      this.spawnPlanets();
      this.hud = new Hud();
      this.spawnPlayer();
      this.controler = new DreamWorldControler( this );

      this.collectiblesStored = 0;

      DE.Audio.music.stopAllAndPlay( 'space' );
      DE.Audio.music.get( 'space' ).fade( 0, 0.7, 500 );
      
      this.scene.add( this.controler, this.hud );

    } );
    this.on( "hide", function()
    {
      //delete collectibles
      for (let index = 0; index < this.collectibles.length; index++) {
        const collec = this.collectibles[index];
        this.scene.remove(collec);
      }
      this.collectibles = [];

      //delete planets
      for (let index = 0; index < this.planets.length; index++) {
        const planet = this.planets[index];
        this.scene.remove(planet);
      }
      this.planet = [];

      //delete hud
      if(this.player)
      {
        for (let index = 0; index < this.hud.slots.length; index++) {
          const slot = this.hud.slots[index];

          slot.removeChildren();
        }
        this.player.removeChildren();
        this.scene.remove( this.hud );
        this.hud = undefined;

        //delete player
        this.scene.remove(this.player);
        this.player = undefined;
      }

      //reset arrays
      this.scene.remove(this.controler);
      this.controler = undefined;
    } );
  }
} );

dreamWorld.spawnPlanets = function()
{
  this.planetSpawn = new Planet( { planetId: Planet.IDS.hide, scale: 0.5 } );
  
  this.add( this.planetSpawn );
  this.planets = [ this.planetSpawn ];

  for (let i = 0; i < 250; i++) {
    var pos = { x: Math.random() * 6000 - 3000, y: Math.random() * 6000 - 3000 };

    var planet = new Planet( { 
      planetId: Planet.IDS[ Math.floor( Math.random() * 5 ) + 1 ], 
      scale: Math.random() * 0.5 + 0.5, 
    } );

    planet.rotation = Math.random() * Math.PI * 2;
    planet.x = pos.x;
    planet.y = pos.y;

    this.add( planet );
    this.planets.push( planet );
  }

  for (let index1 = 0; index1 < this.planets.length; index1++) {
      
    const planet1 = this.planets[ index1 ];
    
    for (let index2 = 0; index2 < this.planets.length; index2++) {
      
      if(index2 == index1 )
        continue;
      
      const planet2 = this.planets[ index2 ];
      
      if( planet1.vector2.isInRangeFrom( planet2, planet1.gravityRadius + planet2.gravityRadius ) )
      {
        this.planets.splice( index2, 1 );
        planet2.askToKill();
        
        if( index2 < index1 ) 
          index1--;
        index2--;
      }
    }
  }

  this.planets.forEach(planet => {
    if( planet.type == Planet.IDS.hide)
      return;

    var collectibles = planet.spawnCollectibles( 2 );
    this.collectibles = this.collectibles.concat( collectibles );
    this.add( collectibles )
  });
}

dreamWorld.spawnPlayer = function()
{
  this.player = new Player();

  this.player.y = this.planetSpawn.y - this.planetSpawn.height / 2;

  this.add( this.player );

  this.camera.focus( this.player, { options: { rotation: true } } );
  
  this.player.add( this.hud.slots );
}

export default dreamWorld;