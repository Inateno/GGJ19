import DE from '@dreamirl/dreamengine'
import CONFIG from 'config';

function Hud( )
{
  DE.GameObject.call( this );

  this.slots = [];
  this.indexSlot = 0;

  for (let index = 0; index < 10; index++) {
    var slot = new DE.GameObject( {
      x: -375 + 37.5 + index * 75,
      y: -CONFIG.SCREEN_HEIGHT / 2 + 75
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

