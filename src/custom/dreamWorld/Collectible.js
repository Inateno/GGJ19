import DE from '@dreamirl/dreamengine'

function Collectible( data )
{
  DE.GameObject.call( this, {
    collisionRadius: 50,
    attractRadius: 150,
    attractForce: 3,
    zindex: -1,
    type: data.type,
    value: data.value,
    scale: data.scale,
    velocity: new DE.Vector2( 0, 0 ),
    renderer: new DE.SpriteRenderer( { spriteName: "collectible-" + data.type } ),
    slowRate: 0.98,
    automatisms: [ [ "move", "move" ] ]
  } );
}

Collectible.Types = {
  ecolo: "ecolo"
  ,"0": "ecolo"
  ,bobo: "bobo"
  ,"1": "bobo"
  ,kitch: "kitch"
  ,"2": "kitch"
  ,gamer: "gamer"
  ,"3": "gamer"
  ,dark: "dark"
  ,"4": "dark"
}

Collectible.getRandomType = function()
{
  return Collectible.Types[Math.random() * 5 >> 0];
}

Collectible.prototype = new DE.GameObject();
Collectible.constructor = Collectible;
Collectible.supr = DE.GameObject.prototype;

Collectible.prototype.move = function()
{
  if(!this.targetSlot) 
  {
    this.translate( this.velocity, true );

    this.velocity.multiply( this.slowRate );
  }
  else if(this.targetSlot && !this.focused)
  {
    var posTarget = this.targetSlot.getWorldPos();
    var pos = this.getWorldPos();
    var dir = new DE.Vector2( posTarget.x - pos.x, posTarget.y - pos.y );
    dir.multiply( 0.2 );

    this.translate( dir, true )
    
    if( dir.getDistance( { x: 0, y: 0 } ) < 2 )
    {
      this.focused = true;
      this.x = 0;
      this.y = 0;
      this.rotation = 0;
      this.targetSlot.add( this );
    }
  }
}

Collectible.prototype.goToSlot = function( slot )
{
  this.targetSlot = slot;
}

export default Collectible;

