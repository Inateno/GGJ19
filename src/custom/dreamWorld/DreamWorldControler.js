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
  if ( this.dreamWorld.gameEnded )
  {
    this.dreamWorld.player.velocity.multiply( 0.95 );
    return;
  }

  const player = this.dreamWorld.player;

  for ( let index = 0; index < this.dreamWorld.planets.length; index++ ) {

    const planet = this.dreamWorld.planets[ index ];

    if ( player.vector2.getDistance( planet ) - planet.collisionRadius < 2 )
    {
      //player.land( planet );
      
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
      player.land( planet );
      player.translate( new DE.Vector2( 0, player.vector2.getDistance( planet ) - planet.collisionRadius + 1 ) );
      player.velocity.x = 0; 
      player.velocity.y = 0; 
    }
  }
}

DreamWorldControler.prototype.checkPlanetsCollectibles = function() {

  if( this.dreamWorld.collectiblesStored == 10 )
    return;

  const player = this.dreamWorld.player;

  var offset = new DE.Vector2( 0, 32 );
  offset.turnVector( player.rotation );

  var playerPos = new DE.Vector2( offset.x + player.x, offset.y + player.y );

  for ( let i = 0; i < this.dreamWorld.collectibles.length; i++ ) 
  {
    let collectible = this.dreamWorld.collectibles[ i ];

    if( collectible.vector2.getDistance( player ) < collectible.attractRadius )
    {
      var dir = new DE.Vector2( playerPos.x - collectible.x, playerPos.y - collectible.y );

      dir.normalize();
      dir.multiply( collectible.attractForce );

      collectible.velocity.x += dir.x * 0.016;
      collectible.velocity.y += dir.y * 0.016;

      if( collectible.vector2.getDistance( playerPos ) < 50 && this.dreamWorld.collectiblesStored < 10 )
      {
        this.dreamWorld.collectiblesStored++;
        this.dreamWorld.collectibles.splice( i, 1 );
        i--;

        DE.Audio.fx.play( "collectible-catch" );

        collectible.goToSlot( this.dreamWorld.hud.getSlot(), this.dreamWorld.hud );

        var pos = collectible.getPos();
        collectible.x = pos.x;
        collectible.y = pos.y;
        this.dreamWorld.hud.add( collectible );

        gtag( 'event', 'catch-collectible', { 'type': collectible.type, 'value': collectible.value } );
      }
    }
  }
}

DreamWorldControler.prototype.checkEndGame = function()
{
  if( this.dreamWorld.hud.earnedCollectibles.length == 10 && !this.dreamWorld.gameEnded )
  {

    var scores = {
      ecolo: 0,
      bobo: 0,
      kitch: 0,
      gamer: 0,
      dark: 0
    }

    var collectibles = this.dreamWorld.hud.earnedCollectibles;

    for (let index = 0; index < collectibles.length; index++) {
      const collectible = collectibles[index];
      scores[collectible.type] += collectible.value;
    }

    var most = 0;
    var mostType = "ecolo";

    for (const type in scores) {
      if(scores[ type ] > most)
      {
        most = scores[ type ];
        mostType = type;
      }
    }

    gtag( 'event', 'end-night', { 'day': this.dreamWorld.phase, 'final-type': mostType } );

    var endFunc = () => {
      this.dreamWorld.camera.fadeOut();
      this.dreamWorld.gui.fadeOut();
      this.dreamWorld.trigger( "changeScreen", "HomeWorld", { type: mostType } );
    };

    this.dreamWorld.gameEnded = true;
    this.dreamWorld.player.removeAutomatism( "moveToCursor" );
    this.dreamWorld.player.axes.x = 0;
    this.dreamWorld.btnAudio.enable = false;

    this.dreamWorld.hud.combineCollectibles( { most: most, mostType: mostType, phase: this.dreamWorld.phase }, endFunc );
  } 
}

DreamWorldControler.prototype.checkPlayerOutside = function()
{
  const player = this.dreamWorld.player;

  if(player.x < -3500)
    player.x = 3500;
  if(player.x > 3500)
    player.x = -3500;
  if(player.y < -3500)
    player.y = 3500;
  if(player.y > 3500)
    player.y = -3500;
}

export default DreamWorldControler;

