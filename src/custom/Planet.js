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

  this.spawnCollectibles( 5 );

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

    var pos = new DE.Vector2( Math.random() * 2 - 1, Math.random() * 2 - 1 );

    pos.normalize();
    pos.multiply( this.collisionRadius + 50 );

    collectible.x = this.x + pos.x;
    collectible.y = this.y + pos.y;

    collectibles.push( collectible );

  }

  return collectibles;

}

export default Planet;

