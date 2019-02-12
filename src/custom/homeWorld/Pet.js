import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';
import speedToTime from 'speedToTime';

function Pet( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.PET_X
    ,y: CONFIG.PET_Y
    ,renderer: new DE.SpriteRenderer( { spriteName: "pet-bobo" } )
    ,zindex: 8
  } );
  this.enable = false;
  this.currentCusto = undefined;
}

Pet.prototype = new DE.GameObject();
Pet.constructor = Pet;
Pet.supr = DE.GameObject.prototype;

Pet.prototype.customize = function( result )
{
  this.zindex = 8;
  this.enable = true;
  this.currentCusto = result;
  this.renderer.changeSprite( 'pet-' + result );

  if ( result == 'dark' ) {
    this.renderer.pingPongMode = false;
    this.moveTo( { y: 470 }, 1000, function() {
      this.addAutomatism( 'moving', 'moving', { interval: 500, persistent: false } );
    } );
  }
  else if ( result !== 'kitch' ) {
    this.renderer.startFrame = 0;
    this.renderer.setFrame( 0 ).setPause( true  );
    this.addAutomatism( 'moving', 'moving', { interval: 500, persistent: false } );
  }
  else {
    this.zindex = 3;
    this.x = 390;
    this.y = 240;
    this.alpha = 0;
    this.renderer.setPause( true );
    this.fadeIn( 250 );
    this.moveTo( { y: 200 }, 500, function() {
      this.renderer.setPause( false );
      setTimeout( () => { this.renderer.startFrame = 4; }, 150 * 4 );
      this.addAutomatism( 'checkKitchAnim', 'checkKitchAnim', { interval: 2500 } );
    } );
  }

  if ( result === 'dark' || result === 'kitch' ) {
    DE.Audio.music.stopAllAndPlay( 'house-' + result );
  }
};

Pet.prototype.checkKitchAnim = function()
{
  if ( Math.random() > 0.7 ) {
    this.renderer.startFrame = 0;
    setTimeout( () => { this.renderer.startFrame = 4; }, 150 * 12 );
  }
};

const MIN_X_POS = 370;
const MAX_X_POS = 820;

Pet.prototype.moving = function()
{
  var pos = MIN_X_POS + ( Math.random() * ( MAX_X_POS - MIN_X_POS ) ) >> 0;
  var delay = speedToTime( this, { x: pos, y: this.y }, Math.random() * 2 + 1 >> 0 );
  
  if ( this.currentCusto !== 'dark' ) {
    this.renderer.startFrame = 2;
    this.renderer.setFrame( 0 ).setPause( false );
  }
  this.renderer.scale.x = pos < this.x ? -1 : 1;

  this.moveTo( { x: pos }, delay, function() {
    if ( this.currentCusto !== 'dark' ) {
      this.renderer.startFrame = 0;
      this.renderer.setFrame( 0 ).setPause( true );
    }
    this.addAutomatism( 'moving', 'moving', { interval: Math.random() * 5500 >> 0, persistent: false } );
  } );
};

Pet.prototype.reset = function()
{
  this.enable = false;
  this.currentCusto = undefined;
};

export default Pet;

