import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function Inside( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.INSIDE_X
    ,y: CONFIG.INSIDE_Y
    ,renderer: new DE.SpriteRenderer( { spriteName: 'inside-ecolo' } )
    ,zindex: 6
  } );
  this.enable = false;
}

Inside.prototype = new DE.GameObject();
Inside.constructor = Inside;
Inside.supr = DE.GameObject.prototype;

Inside.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'inside-' + result );

  if ( result === 'dark' ) {
    DE.Audio.music.stopAllAndPlay( 'house-dark' );
  }
};

export default Inside;

