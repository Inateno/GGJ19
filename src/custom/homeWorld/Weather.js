import DE from '@dreamirl/dreamengine'
import ParticlesEmitter from '@dreamirl/de-plugin-particles-emitter';
import { GodrayFilter } from 'pixi-filters';

import CONFIG from 'config';

import RAIN_CONFIG from 'particles-rain';
import SNOW_CONFIG from 'particles-snow';
import STARS_CONFIG from 'particles-stars';

function Weather( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2,
    y: 0,
    zindex: 2
  } );

  this.bg = new DE.GameObject( {
    x: CONFIG.SCREEN_WIDTH / 2,
    y: CONFIG.SCREEN_HEIGHT / 2,
    renderer: new DE.SpriteRenderer( { spriteName: 'weather-bg-basic' } )
  } );

  this.rain = new ParticlesEmitter( {}, RAIN_CONFIG, [ 'particle-rain' ] );
  this.snow = new ParticlesEmitter( {}, SNOW_CONFIG, [ 'particle-snow' ] );
  this.stars = new ParticlesEmitter( {}, STARS_CONFIG, [ 'particle-rain' ] );

  this.supersun = new DE.GameObject( {
    enable: false,
    upTime: function() {
      this.godray.time += 0.01;
    },
    automatisms: [
      [ 'ut', 'upTime' ]
    ]
  } );
  this.supersun.godray = new GodrayFilter();

  this.clouds = []; // used for rain and snow
  this.themeParticles = {
    bobo: this.snow,
    gamer: this.rain,
    dark: this.stars
  };

  for ( let i in this.themeParticles ) {
    this.themeParticles[ i ].enable = false;
    this.add( this.themeParticles[ i ] );
  }
  this.add( this.supersun );
}

Weather.prototype = new DE.GameObject();
Weather.constructor = Weather;
Weather.supr = DE.GameObject.prototype;

Weather.prototype.customize = function( result )
{
  var filters = [];
  this.enable = true;
  this.bg.enable = true;

  this.bg.renderer.changeSprite( 'weather-bg-' + result );

  if ( this.themeParticles[ result ] ) {
    this.themeParticles[ result ].start();
  }
  if ( result === 'kitch' ) {
    this.supersun.enable = true;
    filters.push( this.supersun.godray );
  }

  return filters;
};

export default Weather;

