import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function Environment( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2
    ,y: CONFIG.SCREEN_HEIGHT / 2
    ,renderer: new DE.SpriteRenderer( { spriteName: 'env-basic' } )
  } );
}

Environment.prototype = new DE.GameObject();
Environment.constructor = Environment;
Environment.supr = DE.GameObject.prototype;

Environment.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'env-' + result );

  if ( result === 'ecolo' || result === 'dark' ) {
    DE.AudioManager.stopAllAndPlay( result + '-theme' );
  }
};

export default Environment;

