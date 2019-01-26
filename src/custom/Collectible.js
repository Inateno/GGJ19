import DE from '@dreamirl/dreamengine'

function Collectible( data )
{
  DE.GameObject.call( this, {
    collisionRadius: 50,
    attractRadius: 250,
    attractForce: 3,
    zindex: -1,
    velocity: new DE.Vector2( 0, 0 ),
    renderer: new DE.SpriteRenderer( { spriteName: "collectible" + data.type } ),
    slowRate: 0.98,
    automatisms: [ [ "move", "move" ] ]
  } );
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

Collectible.prototype.move = function()
{
  this.translate( this.velocity, true );

  this.velocity.multiply( this.slowRate );

  //this.rotation = this.velocity.getAngle( { x: 0, y: 0} );
}

export default Collectible;

