import DE from '@dreamirl/dreamengine'
import CONFIG from 'config';
import { ShockwaveFilter } from 'pixi-filters';
import Collectible from './Collectible';

function Hud( )
{
  DE.GameObject.call( this );

  this.slots = [];
  this.earnedCollectibles = [];
  this.indexSlot = 0;

  for (let index = 0; index < 10; index++) {
    var slot = new DE.GameObject( {
      x: CONFIG.SCREEN_WIDTH / 2 - 450 + index * 100,
      y: 75,
      zindex: 5,
      renderer: new DE.SpriteRenderer( { spriteName: "hud-slot" } )
    } )

    this.slots.push( slot );
    this.add( slot );
  }

  this.combineContainers = [];

  for (let index = 0; index < 10; index++) {
    var container = new DE.GameObject( {
      x: CONFIG.SCREEN_WIDTH / 2,
      y: CONFIG.SCREEN_HEIGHT / 2 - 125,
      zindex: 5,
      animate: function() {
        this.rotation += 0.15;
        this.collec.vector2.multiply( 1 - 0.025 );
      }
    } )

    this.combineContainers.push( container );
    this.add( container );
  }

  this.animTransition = new DE.GameObject( {
    zindex: 100,
    renderer: new DE.SpriteRenderer( { spriteName: "anim-transition-nuit" } )
  } );
  this.animTransition.renderer.reversed = true;
  this.animTransition.renderer.restartAnim();
  this.animTransition.enable = false;
  this.animTransition.x = CONFIG.SCREEN_WIDTH / 2;
  this.animTransition.y = CONFIG.SCREEN_HEIGHT / 2;
  this.animTransition.width = CONFIG.SCREEN_WIDTH;
  this.animTransition.height = CONFIG.SCREEN_HEIGHT;

  this.add( this.animTransition );
}

Hud.prototype = new DE.GameObject();
Hud.constructor = Hud;
Hud.supr = DE.GameObject.prototype;

Hud.prototype.getSlot = function()
{
  var slot = this.slots[ this.indexSlot ];
  
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

Hud.prototype.combineCollectibles = function( data, endCallback )
{
  this.winData = data;
  this.endCallback = endCallback;

  for (let index = 0; index < this.earnedCollectibles.length; index++) {
    const collec = this.earnedCollectibles[index];
    const container = this.combineContainers[index];

    collec.x -= container.x;
    collec.y -= container.y;

    container.add( collec );
    container.collec = collec;
    
    setTimeout( () => {
      this.slots[ index ].enable = false;
      container.addAutomatism( "animate", "animate" );
    }, index * 250);
  }

  this.addAutomatism( "checkCombineEnded", "checkCombineEnded" );
}

Hud.prototype.checkCombineEnded = function()
{
  var ended = true;

  for (let index = 0; index < this.earnedCollectibles.length; index++) {
    const collec = this.earnedCollectibles[index];
    if ( collec.vector2.getDistance( {x: 0, y:0 } ) > 10 )
      ended = false;
  }

  if( ended )
  {
    this.removeAutomatism( "checkCombineEnded" )
    DE.Audio.fx.play( "collectible-complete" );
    
    this.createShockwave();
    this.showWinCollectible();
  }
}

Hud.prototype.createShockwave = function()
{
  this.swFilter = new ShockwaveFilter( {
    x: CONFIG.SCREEN_WIDTH / 2,
    y: CONFIG.SCREEN_HEIGHT / 2 - 125
  }, {
    wavelength: 200,
    brightness: 2
  } );

  this.parent.parent.filters =  [ this.swFilter ];

  this.addAutomatism( "updateFilter", "updateFilter" );
}

Hud.prototype.updateFilter = function()
{
  this.swFilter.time += 0.02;
  this.swFilter.wavelength -= 1;
  
  if ( this.swFilter.time > 2 )
  {
    this.removeAutomatism( "updateFilter" );

    this.parent.parent.filters = [];
  }
}

Hud.prototype.showWinCollectible = function()
{
  var scale = this.winData.most / 100;
  this.bigCollectible = new Collectible( { phase: this.winData.phase, type: this.winData.mostType, value: 0, scale: scale } );

  this.bigCollectible.x = CONFIG.SCREEN_WIDTH / 2;
  this.bigCollectible.y = CONFIG.SCREEN_HEIGHT / 2 - 125;

  this.add( this.bigCollectible );

  for (let index = 0; index < this.combineContainers.length; index++) {
    const container = this.combineContainers[ index ];
    container.removeAutomatism( "animate" );
    this.remove( container );
  }

  setTimeout( () => {
    this.bigCollectible.moveTo( { x: CONFIG.SCREEN_WIDTH / 2, y: CONFIG.SCREEN_HEIGHT / 2 - 32 }, 1500, () => { this.showTransition() } );
    this.bigCollectible.scaleTo( 0, 1500 );
  }, 2000 );
}

Hud.prototype.showTransition = function()
{
  this.animTransition.enable = true;
  this.animTransition.fadeIn( 250, true );
  this.animTransition.renderer.onAnimEnd = this.endCallback;
}

export default Hud;

