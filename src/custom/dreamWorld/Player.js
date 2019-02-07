import DE from '@dreamirl/dreamengine';

import CONFIG from 'config';

function Player( )
{
  DE.GameObject.call( this, {
    axes: new DE.Vector2( 0, 0 )
    ,inputs: new DE.Vector2( 0, 0 )
    ,velocity: new DE.Vector2( 0, 0 )
    ,gravity: new DE.Vector2( 0, 0 )
    ,landed: false
    ,zindex: 20
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

  DE.Inputs.on( "keyDown", "left", function() { self.inputs.x -= 4; } );
  DE.Inputs.on( "keyDown", "right", function() { self.inputs.x += 4; } );
  DE.Inputs.on( "keyUp", "left", function() { self.inputs.x += 4; } );
  DE.Inputs.on( "keyUp", "right", function() { self.inputs.x -= 4; } );

  DE.Inputs.on( "keyDown", "up", function() { self.inputs.y -= 4; } );
  DE.Inputs.on( "keyDown", "down", function() { self.inputs.y += 4; } );
  DE.Inputs.on( "keyUp", "up", function() { self.inputs.y += 4; } );
  DE.Inputs.on( "keyUp", "down", function() { self.inputs.y -= 4; } );

  DE.Inputs.on( "keyUp", "jump", function() { 
    var vector = new DE.Vector2( self.inputs.x, self.inputs.y );

    if(self.landed || ( self.inputs.x == 0 && self.inputs.y ==0 ) )
      vector.y = -4;

    var wasLanded = self.landed;
    var shouldJump = vector.y < -0;

    if( vector.y < 0 )
    {
      self.landed = false;
      
      self.body.renderer.changeSprite( "dream-char-fly" );
      
      if ( self.currentMusic ) {
        DE.Audio.music.get( self.currentMusic ).fade( 1, 0, 850 );
        DE.Audio.music.play( 'space' );
        self.currentMusic = null;
      }
    }

    vector.turnVector( self.rotation + Math.PI );
  
    if( wasLanded && shouldJump )
    {
      self.translate( { x: vector.x, y: vector.y }, true );
    }
    if( !wasLanded )
    {
      self.body.renderer.changeSprite( "dream-char-fly" );
    }
  
    self.velocity.x += vector.x;
    self.velocity.y += vector.y;
  } );
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

  var inputAxes = new DE.Vector2( this.inputs.x || this.axes.x, this.inputs.y || this.axes.y );

  this.body.renderer.setPause( false );
  
  if ( this.landed ) {
    if ( inputAxes.x !== 0 ) {
      this.body.scale.x = Math.sign( inputAxes.x );
    }
    else {
      this.body.renderer.setPause( true );
    }
    inputAxes.y = 0;
    this.translate( inputAxes );
  }
  else {
    inputAxes.turnVector( this.rotation + Math.PI );

    this.velocity.x += inputAxes.x * 0.025;
    this.velocity.y += inputAxes.y * 0.025;
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
  this.touchStart = { x: pos.data.global.x + CONFIG.SCREEN_WIDTH / 2, y: pos.data.global.y + CONFIG.SCREEN_HEIGHT / 2 };

  this.addAutomatism( "moveToCursor", "moveToCursor" );
}

Player.prototype.onPointerMove = function( pos )
{
  this.touchMove = { x: pos.data.global.x + CONFIG.SCREEN_WIDTH / 2, y: pos.data.global.y + CONFIG.SCREEN_HEIGHT / 2 } ;
}

Player.prototype.onPointerUp = function( pos )
{
  this.removeAutomatism( "moveToCursor", "moveToCursor" );

  var touchEnd = { x: pos.data.global.x + CONFIG.SCREEN_WIDTH / 2, y: pos.data.global.y + CONFIG.SCREEN_HEIGHT / 2 } ;

  var vector = new DE.Vector2( touchEnd.x - CONFIG.SCREEN_WIDTH, touchEnd.y - CONFIG.SCREEN_HEIGHT );

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
  this.touchMove = undefined;
}

Player.prototype.moveToCursor = function( )
{
  if(this.touchMove)
    var vector = new DE.Vector2( this.touchMove.x - CONFIG.SCREEN_WIDTH, this.touchMove.y - CONFIG.SCREEN_HEIGHT );
  else
    var vector = new DE.Vector2( this.touchStart.x - CONFIG.SCREEN_WIDTH, this.touchStart.y - CONFIG.SCREEN_HEIGHT );

  if( this.landed && this.touchStart )
  {
    var dirX = vector.x;

    if ( Math.abs( dirX ) > 50 ) {
      dirX = Math.sign( dirX ) * ( Math.abs( dirX ) - 50 );
      this.axes.x = dirX / Math.abs(dirX) * 4;
    }
    else {
      this.axes.x = 0;
    }
  }
  else if( !this.landed )
  {
    vector.x = Math.min(Math.max(vector.x, -300), 300);
    vector.y = Math.min(Math.max(vector.y, -300), 300);
  
    vector.turnVector( this.rotation + Math.PI );
  
    this.velocity.x += vector.x * 0.001;
    this.velocity.y += vector.y * 0.001;
  }
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

