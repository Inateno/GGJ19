import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function Environment( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2
    ,y: CONFIG.SCREEN_HEIGHT / 2
    ,renderer: new DE.SpriteRenderer( { spriteName: 'env-basic' } )
    ,zindex: 1
  } );

  this.currentCusto = undefined;
  this.animatedSprite = 'env-basic';
  this.addAutomatism( 'changeFrame', 'changeFrame', { interval: 500 } );
}

Environment.prototype = new DE.GameObject();
Environment.constructor = Environment;
Environment.supr = DE.GameObject.prototype;

Environment.prototype.customize = function( result )
{
  this.enable = true;
  this.currentCusto = result;
  this.fadeOut( undefined, undefined, () => {
    this.renderer.changeSprite( 'env-' + result );
    this.removeAutomatism( 'changeFrame' );
    this.fadeIn();
  } );
};

Environment.prototype.reset = function()
{
  this.renderer.changeSprite( 'env-basic' );
  this.addAutomatism( 'changeFrame', 'changeFrame', { interval: 500 } );
  this.currentCusto = undefined;
};

Environment.prototype.changeFrame = function()
{
  let frameNum = this.renderer.spriteName === this.animatedSprite ? '-2' : '';
  this.renderer.changeSprite( this.animatedSprite + frameNum )
};

export default Environment;

