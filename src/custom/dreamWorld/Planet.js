import DE from '@dreamirl/dreamengine'
import Collectible from 'Collectible'
import { ShockwaveFilter } from 'pixi-filters';

function Planet( data )
{
  DE.GameObject.call( this, {
    scale: data.scale || 1,
    renderers: [ 
      new DE.SpriteRenderer( { spriteName: "planet-hide" } ),
      new DE.SpriteRenderer( { spriteName: "planet-" + data.planetId } ),
      new DE.GraphicRenderer()
     ]
  } );


  this.planetMask = this.renderers[ 2 ];
  this.renderers[ 1 ].mask = this.planetMask;

  this.collectibles = [];
  this.maskRadius = 0;
  this.maxMaskRadius = 250;
  this.collisionRadius = 245 * this.scale.x;
  this.gravityRadius = 650 * this.scale.x;
  this.attractForce = 14 * this.scale.x;
  this.type = data.planetId;
  this.hasReleasedCollectibles = false;
}

Planet.IDS = {
  hide: "hide"
  ,"0": "hide"
  ,ecolo: "ecolo"
  ,"1": "ecolo"
  ,bobo: "bobo"
  ,"2": "bobo"
  ,kitch: "kitch"
  ,"3": "kitch"
  ,gamer: "gamer"
  ,"4": "gamer"
  ,dark: "dark"
  ,"5": "dark"
}

Planet.prototype = new DE.GameObject();
Planet.constructor = Planet;
Planet.supr = DE.GameObject.prototype;

Planet.prototype.spawnCollectibles = function( numberCollectibles )
{
  for ( let index = 0; index < numberCollectibles; index++ ) {

    var scale = Math.random() * 2 + 1;
    var value = scale * 100;

    var collectible = new Collectible( { type: this.type, value: value, scale: scale } );

    collectible.x = this.x;
    collectible.y = this.y;
    
    collectible.rotation = Math.random() * Math.PI * 2;

    this.collectibles.push( collectible );
  }

  return this.collectibles;
}

Planet.prototype.rotateCollectible = function(vector, angle)
{
  let cos = Math.cos( angle );
  let sin = Math.sin( angle );

  return new DE.Vector2 (
      (vector.x * cos - vector.y * sin),
      (vector.x * sin + vector.y * cos)
  );
}

Planet.prototype.releaseCollectibles = function( target )
{
  DE.Audio.fx.play( "land" );
  
  if(this.type == Planet.IDS.hide)
  {
    this.hasReleasedCollectibles = true;
    return;
  }

  for (let index = 0; index < this.collectibles.length; index++) {
    const collectible = this.collectibles[index];
    
    var velocity = new DE.Vector2( target.x - this.x, target.y - this.y );
    var speed = Math.random() * 4 + 6;

    velocity.normalize();
    velocity.multiply( speed );

    velocity = this.rotateCollectible( velocity, ( 1 - 2 * index ) * Math.PI / 3 );

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

  this.maskRadius += 9 / this.scale.x;

  if(this.maskRadius >= this.maxMaskRadius)
  {
    this.removeAutomatism( "updateMask" );

    this.planetMask.clear();
    this.planetMask.beginFill( 0xffffff );
    this.planetMask.drawCircle( 0, 0, this.maxMaskRadius )
    this.planetMask.endFill();
  }
}

Planet.prototype.createShockwave = function( target )
{
  this.swFilter = new ShockwaveFilter( this.getPos(), {
    wavelength: 200,
    brightness: 2
  } );
  
  this.filterTarget = target;
  
  this.filterTarget.filters =  this.filterTarget.filters.concat( [ this.swFilter ] );

  this.addAutomatism( "updateFilter", "updateFilter" );
}

Planet.prototype.updateFilter = function()
{
  this.swFilter.time += 0.02;
  this.swFilter.wavelength -= 1;
  
  if ( this.swFilter.time > 4 )
  {
    this.removeAutomatism( "updateFilter" );

    var filters = [].concat( this.filterTarget.filters );
    filters.indexOf( this.swFilter );
    filters.splice( filters.indexOf( this.swFilter ), 1 );
    this.filterTarget.filters = filters;
  }

  var worldPos = this.getPos();

  this.swFilter.center.x = worldPos.x;
  this.swFilter.center.y = worldPos.y;
}

export default Planet;

