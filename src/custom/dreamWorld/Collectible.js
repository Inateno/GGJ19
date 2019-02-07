import DE from '@dreamirl/dreamengine'
import CONFIG from 'config';

function Collectible( data )
{
  DE.GameObject.call( this, {
    collisionRadius: 50,
    attractRadius: 150,
    attractForce: 3,
    zindex: 10,
    type: data.type,
    value: data.value,
    scale: data.scale * ( data.phase > 1 ? 0.5 : 1 ),
    velocity: new DE.Vector2( 0, 0 ),
    renderers: [
      new DE.SpriteRenderer( { spriteName: "phase-" + data.phase + "-" + data.type } ),
      new DE.SpriteRenderer( { spriteName: "phase-" + data.phase + "-" + data.type, scale: 1 } )
    ],
    slowRate: 0.98,
    automatisms: [ [ "move", "move" ], [ "updateEffect", "updateEffect" ] ]
  } );

  this.renderers[ 1 ].alpha = 0;

  this.effectSpeed = CONFIG.COLLECTIBLE_EFFECT_SPEED;

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

Collectible.prototype.updateEffect = function()
{
  this.renderers[ 1 ].alpha += this.effectSpeed;
  this.renderers[ 1 ].scale.x += this.effectSpeed / 4;
  this.renderers[ 1 ].scale.y += this.effectSpeed / 4;

  if(this.renderers[ 1 ].alpha <= CONFIG.COLLECTIBLE_EFFECT_MIN)
    this.effectSpeed = CONFIG.COLLECTIBLE_EFFECT_SPEED;
  else if(this.renderers[ 1 ].alpha >= CONFIG.COLLECTIBLE_EFFECT_MAX)  
    this.effectSpeed = -CONFIG.COLLECTIBLE_EFFECT_SPEED;
}

Collectible.prototype.move = function()
{
  var oldPos = new DE.Vector2( this.x, this.y );
  var offset = new DE.Vector2();

  if(!this.targetSlot) 
  {
    this.translate( this.velocity, true );

    offset.x = oldPos.x - this.x;
    offset.y = oldPos.y - this.y;
    offset.turnVector( -this.rotation + Math.PI );

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
      this.x = this.targetSlot.x;
      this.y = this.targetSlot.y;
      this.rotation = 0;
      
      this.hud.earnedCollectibles.push( this );

      /*this.renderers[ 0 ].setPause( true );
      this.removeAutomatism( "updateEffect" );
      this.renderers[ 1 ].visible = false;*/
    }
  }

  this.renderers[ 1 ].x = offset.x;
  this.renderers[ 1 ].y = offset.y;
}

Collectible.prototype.goToSlot = function( slot, hud )
{
  this.targetSlot = slot;
  this.hud = hud;
}

export default Collectible;

