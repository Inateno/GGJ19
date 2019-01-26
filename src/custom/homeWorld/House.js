import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function House( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2
    ,y: CONFIG.SCREEN_HEIGHT / 2
    ,renderer: new DE.SpriteRenderer( { spriteName: 'house-basic' } )
  } );
}

House.prototype = new DE.GameObject();
House.constructor = House;
House.supr = DE.GameObject.prototype;

House.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'house-' + result );

  if ( result === 'dark' ) {
    DE.AudioManager.stopAllAndPlay( 'dark-theme' );
  }
};

export default House;

