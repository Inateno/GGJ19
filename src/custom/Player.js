import DE from '@dreamirl/dreamengine'

function Player( data )
{
  DE.GameObject.call( this, {
    axes: new DE.Vector2( 0, 0 )
    ,velocity: new DE.Vector2( 0, 0 )
    ,gravity: new DE.Vector2( 0, 0 )
    ,landed: false
    ,zindex: 10
    ,automatisms: [ ["move","move"] ]
  } );

  this.body = new DE.GameObject( { 
    y: -32
    ,renderer: new DE.SpriteRenderer( { spriteName: "player" + data.skin } ) 
  } );

  this.add( this.body );

  this.setupInputs();

}

Player.prototype = new DE.GameObject();
Player.constructor = Player;
Player.supr = DE.GameObject.prototype;

Player.prototype.setupInputs = function()
{
  var self = this;

  DE.Inputs.on( "keyDown", "left", function() { self.axes.x = -4; } );
  DE.Inputs.on( "keyDown", "right", function() { self.axes.x = 4; } );
  DE.Inputs.on( "keyUp", "left", function() { self.axes.x = 0; } );
  DE.Inputs.on( "keyUp", "right", function() { self.axes.x = 0; } );

  DE.Inputs.on( "keyDown", "jump", function() { self.jump(); } );
}

Player.prototype.move = function()
{

  if ( !this.landed )
  {
    var rot = new DE.Vector2( this.gravity.x, this.gravity.y ).getAngle( { x: 0,y: 0 } ) + Math.PI / 2;
    this.rotation += ( rot - this.rotation ) / 20;
  }
  else 
  {
    this.rotation = new DE.Vector2( this.gravity.x, this.gravity.y ).getAngle( { x: 0,y: 0 } ) + Math.PI / 2;
  }

  this.gravity.x = 0;
  this.gravity.y = 0;

  var newAxe = new DE.Vector2( this.axes.x, this.axes.y );
  
  newAxe.rotate( this.rotation );

  this.translate( this.velocity, true );
  this.translate( newAxe );
}

Player.prototype.rotateJump = function(vector, angle)
{
  let cos = Math.cos( angle );
  let sin = Math.sin( angle );

  return new DE.Vector2 (
      (vector.x * cos - vector.y * sin),
      (vector.x * sin + vector.y * cos)
  );
}

Player.prototype.jump = function()
{
  if( !this.landed ) 
    return;

  var jump = new DE.Vector2( 0, -7 );

  jump = this.rotateJump( jump, this.rotation );

  this.velocity.x += jump.x;
  this.velocity.y += jump.y;

  this.translate( { x: jump.x * 0.5, y: jump.y * 0.5 }, true );
}

Player.prototype.addGravity = function( vector )
{
  this.velocity.x += vector.x;
  this.velocity.y += vector.y;

  this.gravity.x += vector.x;
  this.gravity.y += vector.y;
  
}

export default Player;

