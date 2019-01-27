import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function House( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.INSIDE_X
    ,y: CONFIG.INSIDE_Y
    ,renderer: new DE.SpriteRenderer( { spriteName: 'inside-ecolo' } )
    ,zindex: 6
  } );
  this.enable = false;
}

House.prototype = new DE.GameObject();
House.constructor = House;
House.supr = DE.GameObject.prototype;

House.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'inside-' + result );

  if ( result === 'dark' ) {
    // DE.AudioManager.stopAllAndPlay( 'dark-theme' );
  }
};

export default House;

