import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function Pet( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2
    ,y: CONFIG.SCREEN_HEIGHT / 2
    ,renderer: new DE.SpriteRenderer( { spriteName: "pet-ecolo" } )
  } );
  this.enable = false;
}

Pet.prototype = new DE.GameObject();
Pet.constructor = Pet;
Pet.supr = DE.GameObject.prototype;

Pet.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'pet-' + result );

  // TODO add position / animations sequence depending on the pet

  if ( result === 'dark' || result === 'kitch' ) {
    DE.AudioManager.stopAllAndPlay( result + '-theme' );
  }
};

export default Pet;

