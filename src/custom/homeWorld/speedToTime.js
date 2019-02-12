import DE from '@dreamirl/dreamengine'

function speedToTime( position, target, speed ) {
  var vector = new DE.Vector2( position.x, position.y );
  var distance = vector.getDistance( target );

  return distance / speed * 16 >> 0;
}

export default speedToTime;