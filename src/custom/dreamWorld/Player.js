import DE from '@dreamirl/dreamengine'

function Player( )
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
    ,renderer: new DE.SpriteRenderer( { spriteName: "dream-char-walk" } ) 
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
  if(this.gravity.x != 0 || this.gravity.y != 0)
  {
    var rot = new DE.Vector2( this.gravity.x, this.gravity.y ).getAngle( { x: 0,y: 0 } ) + Math.PI / 2;

    rot = ( Math.PI * 2 + rot ) % (Math.PI * 2);
    this.rotation = ( Math.PI * 2 + this.rotation ) % (Math.PI * 2);

    if( rot < 1 && this.rotation > 6 )
      rot = rot + this.rotation;
    if( rot > 6 && this.rotation < 1 )
      this.rotation = this.rotation + rot;

    var calc = rot - this.rotation;

    this.rotation += calc * this.ratioGravity;
    
    this.gravity.x = 0;
    this.gravity.y = 0;
  }

  var newAxe = new DE.Vector2( this.axes.x, this.axes.y );
  
  newAxe.rotate( this.rotation );

  this.translate( this.velocity, true );
  this.translate( newAxe );

  this.body.renderer.setPause( false );

  if(newAxe.x < 0)
    this.body.scale.x = -1;
  else if(newAxe.x > 0)
    this.body.scale.x = 1;
  else if(this.landed)
    this.body.renderer.setPause( true );
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
  if ( !this.landed ) {
    return;
  }
  
  if ( this.currentMusic ) {
    DE.Audio.music.get( this.currentMusic ).fade( 1, 0, 850 );
    DE.Audio.music.play( 'space' );
    this.currentMusic = null;
  }

  this.landed = false;

  var jump = new DE.Vector2( 0, -5 );

  jump = this.rotateJump( jump, this.rotation );

  this.velocity.x += jump.x;
  this.velocity.y += jump.y;

  this.translate( { x: jump.x, y: jump.y }, true );

  this.body.renderer.changeSprite( "dream-char-fly" );
}

Player.prototype.land = function( planet )
{
  if ( !this.landed ) {
    if ( planet.type !== 'hide' ) {
      DE.Audio.music.pauseAllAndPlay( 'planet-' + planet.type );
      DE.Audio.music.get( 'planet-' + planet.type ).fade( 0, 1, 250 );
      this.currentMusic = 'planet-' + planet.type;
    }
    else {
      DE.Audio.music.pauseAllAndPlay( 'space' );
    }
    this.landed = true;
    this.body.renderer.changeSprite( "dream-char-walk" );    
  }
}

Player.prototype.addGravity = function( vector )
{
  this.velocity.x += vector.x;
  this.velocity.y += vector.y;

  this.gravity.x += vector.x;
  this.gravity.y += vector.y;
  
}

export default Player;

