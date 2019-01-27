import DE from '@dreamirl/dreamengine'

import CONFIG from 'config';

function RoomType( data )
{
  DE.GameObject.call( this, {
    x: CONFIG.ROOM_TYPE_X
    ,y: CONFIG.ROOM_TYPE_Y
    ,renderer: new DE.SpriteRenderer( { spriteName: 'room-basic' } )
    ,zindex: 7
  } );
}

RoomType.prototype = new DE.GameObject();
RoomType.constructor = RoomType;
RoomType.supr = DE.GameObject.prototype;

RoomType.prototype.customize = function( result )
{
  this.enable = true;
  this.renderer.changeSprite( 'room-' + result );
};

export default RoomType;

