import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function House( currentState )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2,
    y: CONFIG.SCREEN_HEIGHT / 2,
    renderer: new DE.SpriteRenderer( { spriteName: 'house-out' } ),
    zindex: 3
  } );

  this.currentCusto = undefined;
  this.basicSprite =  {
    outside: 'house-out',
    inside: 'house-basic'
  };
  this.currentState = currentState || 'inside';
  this.addAutomatism( 'changeFrame', 'changeFrame', { interval: 500 } );
  this.changeFrame();

  if( !currentState )
  {
    this.door = new DE.GameObject( { 
      x: 779 - this.x,
      y: 608 - this.y,
      renderer: new DE.SpriteRenderer( { spriteName: "basic-door" } )
    } );
    this.door.renderer.setPause( true );
    this.add( this.door );
  }
}

House.prototype = new DE.GameObject();
House.constructor = House;
House.supr = DE.GameObject.prototype;

House.prototype.openDoor = function()
{
  this.door.renderer.reversed = false;
  this.door.renderer.restartAnim();
  this.door.renderer.setPause( false );
}

House.prototype.closeDoor = function()
{
  this.door.renderer.reversed = true;
  this.door.renderer.restartAnim();
}

House.prototype.customize = function( result )
{
  this.enable = true;
  this.currentCusto = result;

  this.door.fadeOut( undefined, undefined, () => {
    this.door.renderer.changeSprite( 'wood-door' );
    this.door.fadeIn();
  } );

  this.fadeOut( undefined, undefined, () => {
    this.renderer.changeSprite( 'house-' + result );
    this.removeAutomatism( 'changeFrame' );
    this.fadeIn( undefined, undefined, () => {
      if ( result === 'dark' ) {
        DE.Audio.music.stopAllAndPlay( 'house-dark' );
      }
    } );
  } );
};

House.prototype.reset = function()
{
  this.renderer.changeSprite( 'house-basic' );
  this.addAutomatism( 'changeFrame', 'changeFrame', { interval: 500 } );
  this.currentCusto = undefined;
};

House.prototype.changeFrame = function()
{
  let frameNum = this.renderer.spriteName === this.basicSprite[ this.currentState ] ? '-2' : '';
  this.renderer.changeSprite( this.basicSprite[ this.currentState ] + frameNum )
};

export default House;

