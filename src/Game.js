/**
* Author
 @Inateno / http://inateno.com / http://dreamirl.com

* ContributorsList
 @Inateno

***
simple Game declaration
**/
import DE from '@dreamirl/dreamengine';
import CONFIG from 'config';
import GameScreenManager from '@dreamirl/de-plugin-gamescreen';
import homeWorld from 'homeWorld';
import dreamWorld from 'dreamWorld';

var Game = {};
  
Game.render = null;
Game.scene  = null;

// init
Game.init = function()
{
  console.log( "game init" );
  // DE.config.DEBUG = 1;
  // DE.config.DEBUG_LEVEL = 2;
  
  // Create the renderer before assets start loading
  Game.render = new DE.Render( "render", {
    resizeMode       : "stretch-ratio",
    width          : CONFIG.SCREEN_WIDTH,
    height         : CONFIG.SCREEN_HEIGHT,
    backgroundColor: "0x00004F",
    roundPixels    : false,
    powerPreferences: "high-performance"
  } );
  Game.render.init();
  
  DE.start();
}

Game.onload = function()
{
  console.log( "game start" );

  DE.Audio.mute();
  DE.Audio.music.setVolume( 75 );
  DE.Audio.fx.setVolume( 50 );
  Game.screenManager = new GameScreenManager( Game.render, [ homeWorld, dreamWorld ] );
  Game.screenManager.changeScreen( homeWorld.name );
  
}

export default Game;
