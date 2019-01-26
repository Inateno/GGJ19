import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function Weather( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2
    ,y: 0
  } );
}

Weather.prototype = new DE.GameObject();
Weather.constructor = Weather;
Weather.supr = DE.GameObject.prototype;

Weather.prototype.customize = function( result )
{
  this.enable = true;

  // TODO create one file for each weather and add it as sub object (with it's own logic)

  if ( result === 'dark' ) {
    DE.AudioManager.stopAllAndPlay( 'ecolo-theme' );
  }
  // hude exception
  else if ( result === 'ecolo' ) {
    DE.AudioManager.stopAllAndPlay( 'happiness-theme' );
  }
};

export default Weather;

