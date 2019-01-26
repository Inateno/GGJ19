import DE from '@dreamirl/dreamengine'

function House( data )
{
  DE.GameObject.call( this, {
    renderer: new DE.SpriteRenderer( { spriteName: "house" } )
  } );

  /**
   * TODO
   * compositions, renderers
   * sons
   * particules
   * zones animations (array positions -> animation)
   */

  

}

House.prototype = new DE.GameObject();
House.constructor = House;
House.supr = DE.GameObject.prototype;

export default House;

