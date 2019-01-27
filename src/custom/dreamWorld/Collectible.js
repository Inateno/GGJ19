import DE from '@dreamirl/dreamengine'

function Collectible( data )
{
  DE.GameObject.call( this, {
    collisionRadius: 50,
    attractRadius: 250,
    attractForce: 3,
    zindex: -1,
    type: data.type,
    value: data.value,
    scale: data.scale,
    velocity: new DE.Vector2( 0, 0 ),
    renderer: new DE.SpriteRenderer( { spriteName: "collectible"/* + data.type */ } ),
    slowRate: 0.98,
    automatisms: [ [ "move", "move" ] ]
  } );

  switch (this.type) {
    case Collectible.Types.Ecolo:
      this.renderer.tint = 0x00ee00;
      break;

    case Collectible.Types.Bobo:
      this.renderer.tint = 0x0000ee;
      break;  

    case Collectible.Types.Kitch:
      this.renderer.tint = 0xee0055;
      break;  

    case Collectible.Types.Gamer:
      this.renderer.tint = 0xeeee00;
      break;  

    case Collectible.Types.Dark:
      this.renderer.tint = 0x550000;
      break;  
  }
}

Collectible.Types = {
  Ecolo: "Ecolo"
  ,"0": "Ecolo"
  ,Bobo: "Bobo"
  ,"1": "Bobo"
  ,Kitch: "Kitch"
  ,"2": "Kitch"
  ,Gamer: "Gamer"
  ,"3": "Gamer"
  ,Dark: "Dark"
  ,"4": "Dark"
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

