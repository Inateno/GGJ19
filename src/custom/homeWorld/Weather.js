import DE from '@dreamirl/dreamengine'
import ParticlesEmitter from '@dreamirl/de-plugin-particles-emitter';

import CONFIG from 'config';

import RAIN_CONFIG from 'particles-rain';
import SNOW_CONFIG from 'particles-snow';

function Weather( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2,
    y: 0,
    zindex: 2
  } );

  this.rain = new ParticlesEmitter( {}, RAIN_CONFIG, [ 'particle-rain' ]);
  this.snow = new ParticlesEmitter( {}, SNOW_CONFIG, [ 'particle-snow' ]);

  this.themeLinks = {
    // ecolo: this.sun,
    bobo: this.rain,
    // kitch: this.shiny,
    gamer: this.snow,
    // dark: this.night
  };

  for ( let i in this.themeLinks ) {
    this.add( this.themeLinks[ i ] );
  }
}

Weather.prototype = new DE.GameObject();
Weather.constructor = Weather;
Weather.supr = DE.GameObject.prototype;

Weather.prototype.customize = function( result )
{
  this.enable = true;

  // TODO create one file for each weather and add it as sub object (with it's own logic)
  this.themeLinks[ result ].start();

  if ( result === 'dark' ) {
    DE.AudioManager.stopAllAndPlay( 'ecolo-theme' );
  }
  // hude exception
  else if ( result === 'ecolo' ) {
    DE.AudioManager.stopAllAndPlay( 'happiness-theme' );
  }
};

export default Weather;

