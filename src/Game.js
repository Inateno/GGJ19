/**
* Author
 @Inateno / http://inateno.com / http://dreamirl.com

* ContributorsList
 @Inateno

***
simple Game declaration
**/
import DE from '@dreamirl/dreamengine';
import GameScreenManager from '@dreamirl/de-plugin-gamescreen';
import ChooseBox from '@dreamirl/de-plugin-choosebox';
import MessageBox from '@dreamirl/de-plugin-messagebox';

import CONFIG from 'config';
import homeWorld from 'homeWorld';
import dreamWorld from 'dreamWorld';

import './index.css';

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
    width            : CONFIG.SCREEN_WIDTH,
    height           : CONFIG.SCREEN_HEIGHT,
    backgroundColor  : "0x000000",
    roundPixels      : false,
    scaleMode        : PIXI.SCALE_MODES.NEAREST
  } );
  Game.render.init();
  
  DE.start();
}

Game.onload = function()
{
  console.log( "game start" );

  // DE.Audio.mute();
  DE.Audio.music.setVolume( 75 );
  DE.Audio.fx.setVolume( 50 );
  MessageBox.init();
  ChooseBox.init();
  ChooseBox.create( [
    { text: "English", value: "en" },
    { text: "Français", value: "fr" }
  ], function( lang ) {
    DE.Localization.getLang( lang );

    gtag( 'event', 'choosed-lang', { 'lang': lang } );

    Game.screenManager = new GameScreenManager( Game.render, [ homeWorld, dreamWorld ] );
    Game.screenManager.changeScreen( homeWorld.name );

    var ms = DE.Audio.music.getAll();
    for ( var i in ms ) {
      ms[ i ].load();
    }
  } );
}

export default Game;
