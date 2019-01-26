import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function RoomType( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.SCREEN_WIDTH / 2
    ,y: CONFIG.SCREEN_HEIGHT / 2
    ,renderer: new DE.SpriteRenderer( { spriteName: 'room-ecolo' } )
  } );
  this.enable = false;
}

RoomType.prototype = new DE.GameObject();
RoomType.constructor = RoomType;
RoomType.supr = DE.GameObject.prototype;

RoomType.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'room-' + result );

  // change the music in any case (??)
  DE.AudioManager.stopAllAndPlay( result + '-theme' );
};

export default RoomType;

