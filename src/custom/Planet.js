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
  this.numberCollectibles = Math.random() * 10 >> 0;
  this.collectibles = [];
  
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

Planet.prototype.spawnCollectibles = function()
{
  for (let index = 0; index < this.numberCollectibles; index++) {
    var collectible = new Collectible( { type: "" } );

    this.collectibles.push( collectible );
    this.add( collectible );

  }
}

export default Planet;

