import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function BtnAudio( muted )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH - 75,
    y: 75,
    renderer: new DE.SpriteRenderer( { spriteName: muted ? "btn-audio-off" : "btn-audio-on" } ),
    zindex: 50,
    interactive: true,
    pointerup: ( e ) => {
      this.onClick( e );
    }
  } );
}

BtnAudio.prototype = new DE.GameObject();
BtnAudio.constructor = BtnAudio;
BtnAudio.supr = DE.GameObject.prototype;

BtnAudio.prototype.onClick = function( e )
{
  e.stopPropagation();

  DE.Audio.toggle();
  this.updateSprite();
}

BtnAudio.prototype.updateSprite = function()
{
  this.renderer.changeSprite( DE.Audio.isMuted() ? "btn-audio-off" : "btn-audio-on" );
}

export default BtnAudio;

