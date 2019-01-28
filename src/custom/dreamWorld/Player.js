import DE from '@dreamirl/dreamengine';

import CONFIG from 'config';

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
}

Player.prototype = new DE.GameObject();
Player.constructor = Player;
Player.supr = DE.GameObject.prototype;

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

  var inputAxes = new DE.Vector2( this.axes.x, this.axes.y );

  this.body.renderer.setPause( false );
  
  if ( this.landed ) {
    if ( inputAxes.x !== 0 ) {
      this.body.scale.x = Math.sign( inputAxes.x );
    }
    else {
      this.body.renderer.setPause( true );
    }
  
    this.translate( inputAxes );
  }
  else {
    inputAxes.turnVector( this.rotation + Math.PI );

    this.velocity.x += inputAxes.x * 0.1;
    this.velocity.y += inputAxes.y * 0.1;
  }

  if ( Math.abs( this.velocity.x ) > CONFIG.VELOCITY_MAX ) {
    this.velocity.x = Math.sign( this.velocity.x ) * CONFIG.VELOCITY_MAX;
  }
  if ( Math.abs( this.velocity.y ) > CONFIG.VELOCITY_MAX ) {
    this.velocity.y = Math.sign( this.velocity.y ) * CONFIG.VELOCITY_MAX;
  }

  this.translate( this.velocity, true );
}

Player.prototype.onPointerDown = function( pos )
{
  this.touchStart = { x: CONFIG.SCREEN_WIDTH, y: CONFIG.SCREEN_HEIGHT  } ;
}

Player.prototype.onPointerMove = function( pos )
{
  if( this.landed && this.touchStart )
  {
    var touchMove = { x: pos.data.global.x + CONFIG.SCREEN_WIDTH / 2, y: pos.data.global.y + CONFIG.SCREEN_HEIGHT / 2 } ;
    var dirX = touchMove.x - this.touchStart.x;
    
    this.axes.x = dirX / Math.abs(dirX) * 4;
  }
}

Player.prototype.onPointerUp = function( pos )
{
  var touchEnd = { x: pos.data.global.x + CONFIG.SCREEN_WIDTH / 2, y: pos.data.global.y + CONFIG.SCREEN_HEIGHT / 2 } ;

  var vector = new DE.Vector2( touchEnd.x - this.touchStart.x, touchEnd.y - this.touchStart.y );

  console.log(vector)

  vector.x = Math.min(Math.max(vector.x, -300), 300);
  vector.y = Math.min(Math.max(vector.y, -300), 300);

  var wasLanded = this.landed;
  var shouldJump = vector.y < -25;

  if( vector.y < 0 )
  {
    this.landed = false;
    
    this.body.renderer.changeSprite( "dream-char-fly" );
    
    if ( this.currentMusic ) {
      DE.Audio.music.get( this.currentMusic ).fade( 1, 0, 850 );
      DE.Audio.music.play( 'space' );
      this.currentMusic = null;
    }
  }

  vector.turnVector( this.rotation + Math.PI );
  
  if( wasLanded && shouldJump )
  {
    this.translate( { x: vector.x * 0.05, y: vector.y * 0.05 }, true );
  }
  if( !wasLanded )
  {
    this.body.renderer.changeSprite( "dream-char-fly" );
  }

  this.velocity.x += vector.x * 0.03;
  this.velocity.y += vector.y * 0.03;

  this.axes.x = 0;
  this.touchStart = undefined;
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

