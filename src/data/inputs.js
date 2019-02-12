/**
 * @ContributorsList
 * @Inateno / http://inateno.com / http://dreamirl.com
 *
 * this is the inputs list sample that will be loaded by the project
 * Please declare in the same way than this example.
 */
const inputs = {
  "left":{"keycodes":[ "K.left" , 'K.a', 'K.q' ] },
  "right":{"keycodes":[ "K.right" , 'K.d' ] },
  "up":{"keycodes":[ "K.up" , 'K.z', 'K.w' ] },
  "down":{"keycodes":[ "K.down" , 'K.s' ] },
  
  "jump":{"keycodes":[ 'G0.B.A', "K.space" ] },
  
  // dedicated for plugin choosebox
  "choose-up":{"keycodes":[ "K.up" , 'K.z', 'K.w' ] },
  "choose-down":{"keycodes":[ "K.down" , 'K.s' ] },
  "choose-enter":{"keycodes":[ "K.space" , 'K.enter' ] },
  "skipMessage":{"keycodes":[ "K.space" , 'K.enter' ] }
};

export default inputs;
