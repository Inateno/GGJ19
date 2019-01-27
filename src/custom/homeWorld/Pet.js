import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function Pet( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.PET_X
    ,y: CONFIG.PET_Y
    ,renderer: new DE.SpriteRenderer( { spriteName: "pet-bobo" } )
    ,zindex: 8
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
    DE.Audio.music.stopAllAndPlay( 'house-' + result );
  }
};

export default Pet;

