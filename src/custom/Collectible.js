import DE from '@dreamirl/dreamengine'

function Collectible( data )
{
  DE.GameObject.call( this, {
    renderer: new DE.SpriteRenderer( { spriteName: "collectible" + data.type } )
  } );

  this.collisionRadius = 50;
  this.attractRadius = 250;
  this.attractForce = 4;

}

Collectible.Types = {
  c0: "Vide"
  ,"0": "Vide"
  ,c1: "Goth"
  ,"1": "Goth"
  ,c2: "Giraffe"
  ,"2": "Giraffe"
  ,c3: "Chill"
  ,"3": "Chill"
  ,c4: "Chill"
  ,"4": "Chill"
}

Collectible.prototype = new DE.GameObject();
Collectible.constructor = Collectible;
Collectible.supr = DE.GameObject.prototype;

export default Collectible;

