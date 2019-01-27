import DE from '@dreamirl/dreamengine'
import Collectible from 'Collectible'
import { ShockwaveFilter } from 'pixi-filters';

function Planet( data )
{
  DE.GameObject.call( this, {
    renderers: [ 
      new DE.SpriteRenderer( { spriteName: "planetHide" } ),
      new DE.SpriteRenderer( { spriteName: "planet" + data.planetId } ),
      new DE.GraphicRenderer()
     ]
  } );


  this.planetMask = this.renderers[ 2 ];
  this.renderers[ 1 ].mask = this.planetMask;

  this.maskRadius = 0;
  this.maxMaskRadius = 250;
  this.collisionRadius = 245;
  this.gravityRadius = 750;
  this.attractForce = 4;
  this.type = "";
  this.hasReleasedCollectibles = false;
  this.collectibles = undefined;
}

Planet.IDS = {
  vide: "Vide"
  ,"0": "Vide"
  ,goth: "Goth"
  ,"1": "Goth"
  ,giraffe: "Giraffe"
  ,"2": "Giraffe"
  ,chill: "Chill"
  ,"3": "Chill"
}

Planet.prototype = new DE.GameObject();
Planet.constructor = Planet;
Planet.supr = DE.GameObject.prototype;

Planet.prototype.spawnCollectibles = function( numberCollectibles )
{
  var collectibles = [];

  for ( let index = 0; index < numberCollectibles; index++ ) {

    var scale = Math.random() * 1 + 0.5;
    var value = scale * 100;

    var collectible = new Collectible( { type: Collectible.getRandomType(), value: value, scale: scale } );

    collectible.x = this.x;
    collectible.y = this.y;
    
    collectible.rotation = Math.random() * Math.PI * 2;

    collectibles.push( collectible );
  }

  this.collectibles = collectibles;
  
  return collectibles;
}

Planet.prototype.releaseCollectibles = function()
{
  for (let index = 0; index < this.collectibles.length; index++) {
    const collectible = this.collectibles[index];
    
    var velocity = new DE.Vector2( Math.random() * 2 - 1, Math.random() * 2 - 1 );
    var speed = Math.random() * 4 + 6;

    velocity.normalize();
    velocity.multiply( speed );

    collectible.velocity = velocity;

  }

  this.addAutomatism("updateMask", "updateMask");

  this.hasReleasedCollectibles = true;
}

Planet.prototype.updateMask = function()
{
  this.planetMask.clear();
  this.planetMask.beginFill( 0xffffff );
  this.planetMask.drawCircle( 0, 0, this.maskRadius )
  this.planetMask.endFill();

  this.maskRadius += 9;

  if(this.maskRadius >= this.maxMaskRadius)
    this.removeAutomatism( "updateMask" );
}

Planet.prototype.createShockwave = function( target )
{
  this.swFilter = new ShockwaveFilter( this.getPos(), {
    wavelength: 200,
    brightness: 2
  } );
  
  this.filterTarget = target;
  
  this.filterTarget.filters = this.filterTarget.filters.concat( [ this.swFilter ] );

  this.addAutomatism( "updateFilter", "updateFilter" );
}

Planet.prototype.updateFilter = function()
{
  this.swFilter.time += 0.02;
  
  if ( this.swFilter.time > 3 )
  {
    this.removeAutomatism( "updateFilter" );
    this.filterTarget.filters.splice( this.filterTarget.filters.indexOf( this.swFilter ), 1 );
  }

  var worldPos = this.getPos();

  this.swFilter.center.x = worldPos.x;
  this.swFilter.center.y = worldPos.y;
}

export default Planet;

