import DE from '@dreamirl/dreamengine'

function Planet( data )
{
  DE.GameObject.call( this, {
    renderer: new DE.SpriteRenderer( { spriteName: "planet" + data.planetId } )
  } );

  this.collisionRadius = 245;
  this.gravityRadius = 850;
  this.attractForce = 10;

  /**
   * TODO
   * elements présents sur la planette collectibles + entitées ? (génération aleatoire ?)
   * shaders d'ambiance ?
   * musique ?
   */


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

export default Planet;

