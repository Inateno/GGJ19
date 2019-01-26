import DE from '@dreamirl/dreamengine'

function DreamWorldControler( dreamWorld )
{
  DE.GameObject.call( this );

  this.dreamWorld = dreamWorld;

  this.addAutomatism("checkPlanetsGravity", "checkPlanetsGravity");
}

DreamWorldControler.prototype = new DE.GameObject();
DreamWorldControler.constructor = DreamWorldControler;
DreamWorldControler.supr = DE.GameObject.prototype;

DreamWorldControler.prototype.checkPlanetsGravity = function()
{
  const player = this.dreamWorld.player;

  var landed = false;

  for ( let index = 0; index < this.dreamWorld.planets.length; index++ ) {

    const planet = this.dreamWorld.planets[ index ];

    if ( player.vector2.getDistance( planet ) - planet.collisionRadius < 5 )
      landed = true;
    
    if ( player.vector2.isInRangeFrom( planet.vector2, planet.gravityRadius ) ) {

      var dir = new DE.Vector2( planet.x - player.x, planet.y - player.y );
      dir.normalize();
      dir.multiply( planet.attractForce );
      
      player.vector2.getDistance( planet );

      var ratio = 1 - ( player.vector2.getDistance( planet ) - planet.collisionRadius ) / ( planet.gravityRadius - planet.collisionRadius );
      console.log({ x: dir.x * ratio * 0.0016, y: dir.y * ratio * 0.0016 } )
      player.addGravity( { x: dir.x * ratio * 0.0016, y: dir.y * ratio * 0.0016 } );
    }

    if ( player.vector2.isInRangeFrom( planet.vector2, planet.collisionRadius ) ) { 

      player.translate( new DE.Vector2( 0, player.vector2.getDistance( planet ) - planet.collisionRadius + 1 ) );
      player.velocity.x = 0; 
      player.velocity.y = 0; 
    }
  }

  player.landed = landed;

}

export default DreamWorldControler;

