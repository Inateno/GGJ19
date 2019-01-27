import DE from '@dreamirl/dreamengine'

function DreamWorldControler( dreamWorld )
{
  DE.GameObject.call( this );

  this.dreamWorld = dreamWorld;

  this.shockWaveRadius = 0;

  this.addAutomatism("checkPlanetsGravity", "checkPlanetsGravity");
  this.addAutomatism("checkPlanetsCollectibles", "checkPlanetsCollectibles");
  this.addAutomatism("checkPlayerOutside", "checkPlayerOutside");
  this.addAutomatism("checkEndGame", "checkEndGame");
}

DreamWorldControler.prototype = new DE.GameObject();
DreamWorldControler.constructor = DreamWorldControler;
DreamWorldControler.supr = DE.GameObject.prototype;

DreamWorldControler.prototype.checkPlanetsGravity = function()
{
  const player = this.dreamWorld.player;

  //var landed = false;

  for ( let index = 0; index < this.dreamWorld.planets.length; index++ ) {

    const planet = this.dreamWorld.planets[ index ];

    if ( player.vector2.getDistance( planet ) - planet.collisionRadius < 2 )
    {
      player.land();
      
      if ( !planet.hasReleasedCollectibles )
      {
        planet.createShockwave( this.dreamWorld.scene  );
        planet.releaseCollectibles( player );
      }
    }
      
    if ( player.vector2.isInRangeFrom( planet.vector2, planet.gravityRadius ) ) {

      var dir = new DE.Vector2( planet.x - player.x, planet.y - player.y );
      dir.normalize();
      dir.multiply( planet.attractForce );
      
      player.vector2.getDistance( planet );

      var ratio = 1 - ( player.vector2.getDistance( planet ) - planet.collisionRadius ) / ( planet.gravityRadius - planet.collisionRadius );

      player.addGravity( { x: dir.x * ratio * 0.016, y: dir.y * ratio * 0.016 } );
      player.ratioGravity = ratio;
    }

    if ( player.vector2.isInRangeFrom( planet.vector2, planet.collisionRadius ) ) { 

      player.translate( new DE.Vector2( 0, player.vector2.getDistance( planet ) - planet.collisionRadius + 1 ) );
      player.velocity.x = 0; 
      player.velocity.y = 0; 
    }
  }

  //player.landed = landed;

}

DreamWorldControler.prototype.checkPlanetsCollectibles = function() {

  if( this.dreamWorld.collectiblesStored == 10 )
    return;

  const player = this.dreamWorld.player;

  for ( let i = 0; i < this.dreamWorld.collectibles.length; i++ ) {

    let collectible = this.dreamWorld.collectibles[ i ];

    if( collectible.vector2.getDistance( player ) < collectible.attractRadius )
    {
      var dir = new DE.Vector2( player.x - collectible.x, player.y - collectible.y );

      dir.normalize();
      dir.multiply( collectible.attractForce );

      collectible.velocity.x += dir.x * 0.016;
      collectible.velocity.y += dir.y * 0.016;

      if( collectible.vector2.getDistance( player ) < 50 && this.dreamWorld.collectiblesStored < 10 )
      {
        this.dreamWorld.collectiblesStored++;
        this.dreamWorld.collectibles.splice( i, 1 );
        i--;
        collectible.goToSlot( this.dreamWorld.hud.getSlot(), player );
      }
    }
  }
}

DreamWorldControler.prototype.checkEndGame = function()
{
  if( this.dreamWorld.hud.allSlotFilled() )
  {
    
    var scores = {
      Ecolo: 0,
      Bobo: 0,
      Kitch: 0,
      Gamer: 0,
      Dark: 0
    }

    var collectibles = this.dreamWorld.hud.getCollectibles();

    for (let index = 0; index < collectibles.length; index++) {
      const collectible = collectibles[index];
      scores[collectible.type] += collectible.value;
    }

    var most = 0;
    var mostType = "Ecolo";

    for (const type in scores) {
      if(scores[ type ] > most)
      {
        most = scores[ type ];
        mostType = type;
      }
    }

    setTimeout( () => {
      this.dreamWorld.trigger( "changeScreen", "HomeWorld", { type: mostType.toLowerCase() } );
    }, 2000 );
  } 
}

DreamWorldControler.prototype.checkPlayerOutside = function()
{
  const player = this.dreamWorld.player;

  if(player.x < -3000)
    player.x = 3000;
  if(player.x > 3000)
    player.x = -3000;
  if(player.y < -3000)
    player.y = 3000;
  if(player.y > 3000)
    player.y = -3000;
}

export default DreamWorldControler;

