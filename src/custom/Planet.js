import DE from '@dreamirl/dreamengine'
import Collectible from 'Collectible'

function Planet( data )
{
  DE.GameObject.call( this, {
    renderer: new DE.SpriteRenderer( { spriteName: "planet" + data.planetId } )
  } );

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

    var collectible = new Collectible( { type: this.type } );

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

  this.hasReleasedCollectibles = true;
}

export default Planet;

