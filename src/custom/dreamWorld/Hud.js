import DE from '@dreamirl/dreamengine'
import CONFIG from 'config';

function Hud( )
{
  DE.GameObject.call( this );

  this.slots = [];
  this.indexSlot = 0;

  for (let index = 0; index < 10; index++) {
    var slot = new DE.GameObject( {
      x: -500 + 50 + index * 100,
      y: -CONFIG.SCREEN_HEIGHT / 2 + 75,
      renderer: new DE.SpriteRenderer( { spriteName: "hud-slot" } )
    } )

    this.slots.push(slot);
  }
}

Hud.prototype = new DE.GameObject();
Hud.constructor = Hud;
Hud.supr = DE.GameObject.prototype;

Hud.prototype.getSlot = function()
{
  var slot = this.slots[this.indexSlot];
  
  this.indexSlot++;
  
  return slot;
}

Hud.prototype.getCollectibles = function()
{
  var collectibles = [];

  for (let index = 0; index < this.slots.length; index++) {
    collectibles.push( this.slots[index].gameObjects[ 0 ] );
  }

  return collectibles;
}

Hud.prototype.allSlotFilled = function()
{
  for (let index = 0; index < this.slots.length; index++) {
    const slot = this.slots[index];
    if(slot.gameObjects.length === 0)
      return false;
  }

  return true;
}

export default Hud;

