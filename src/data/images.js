/**
 * @ContributorsList
 * @Inateno / http://inateno.com / http://dreamirl.com
 *
 * this is the images file sample that will be loaded by the project in the ResourcesManager module
 * it can also load .json files (for sheets and particles)
 * Please declare in the same way than this example.
 * To load image as default just set "load" to true.
 *
 * Otherwise you can load/add images when you want, load images by calling the DREAM_ENGINE.ImageManager.pushImage function
 *
 * - [ name, url, { load:Bool, totalFrame:Int, totalLine:Int, interval:Int (ms), animated:Bool, isReversed:Bool } ]
 *
 * name, and url are required
 */
const images = {
  // images folder name 
  baseUrl: "imgs/",
  
  // usage name, real name (can contain subpath), extension, parameters
  pools: {
    // loaded when engine is inited
    default: [
      [ "title", "house/title.png", { totalFrame: 3, interval: 250 } ]
      , [ "house-basic", "house/house/basic.png" ]
      , [ "real-char-walk", "house/mr-holme-walk.png", { totalFrame: 4, interval: 100 } ]
      , [ "real-char-idle", "house/mr-holme-idle.png", { totalFrame: 5, interval: 300, startFrame: 1, endFrame: 4, pingPongMode: true } ]
      , [ "real-char-happy", "house/mr-holme-happy.png", { totalFrame: 5, interval: 150, startFrame: 1, pingPongMode: true } ]

      , [ "dream-char-walk", "space/mr-dream-walk.png", { totalFrame: 3, interval: 120 } ]
      , [ "dream-char-fly", "space/mr-dream-fly.png", { totalFrame: 3, interval: 120 } ]

      , [ "player", "space/player.png" ]
      , [ "planetVide", "space/planetVide.png" ]
      , [ "planetGoth", "space/planetGoth.png" ]
      , [ "planetGiraffe", "space/planetGiraffe.png" ]
      , [ "planetChill", "space/planetChill.png" ]
    ],
    
    // a custom pool not loaded by default, you have to load it whenever you want (you can display a custom loader or just the default loader)
    aCustomPool: [
      // resources
    ]
  }
};

export default images;
