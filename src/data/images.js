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
      // main / real world
      [ "title", "house/title.png", { totalFrame: 3, interval: 250 } ]

      , [ "weather-bg-basic", "house/weather/basic.png" ]
      , [ "weather-bg-ecolo", "house/weather/bg-ecolo.png" ]
      , [ "weather-bg-bobo", "house/weather/bg-bobo.png" ]
      , [ "weather-bg-kitch", "house/weather/bg-kitch.png" ]
      , [ "weather-bg-gamer", "house/weather/bg-gamer.png" ]
      , [ "weather-bg-dark", "house/weather/bg-dark.png" ]

      , [ "house-out", "house/house/out-1.png" ]
      , [ "house-out-2", "house/house/out-2.png" ]

      , [ "house-basic", "house/house/basic-1.png" ]
      , [ "house-basic-2", "house/house/basic-2.png" ]
      , [ "house-ecolo", "house/house/house-ecolo.png" ]
      , [ "house-bobo", "house/house/house-bobo.png" ]
      , [ "house-kitch", "house/house/house-kitch.png" ]
      , [ "house-gamer", "house/house/house-gamer.png" ]
      , [ "house-dark", "house/house/house-dark.png" ]

      , [ "env-basic", "house/env/basic-1.png" ]
      , [ "env-basic-2", "house/env/basic-2.png" ]
      , [ "env-ecolo", "house/env/env-ecolo.png" ]
      , [ "env-bobo", "house/env/env-bobo.png" ]
      , [ "env-kitch", "house/env/env-kitch.png" ]
      , [ "env-gamer", "house/env/env-gamer.png" ]
      , [ "env-dark", "house/env/env-dark.png" ]

      // TODO inside to add
      , [ "inside-ecolo", "house/inside/inside-ecolo.png" ]
      , [ "inside-bobo", "house/inside/inside-bobo.png" ]
      , [ "inside-kitch", "house/inside/inside-kitch.png" ]
      , [ "inside-gamer", "house/inside/inside-gamer.png" ]
      , [ "inside-dark", "house/inside/inside-dark.png" ]

      , [ "room-basic", "house/room-type/basic.png" ]
      , [ "room-ecolo", "house/room-type/room-ecolo.png" ]
      , [ "room-bobo", "house/room-type/room-bobo.png" ]
      , [ "room-kitch", "house/room-type/room-kitch.png" ]
      , [ "room-gamer", "house/room-type/room-gamer.png" ]
      , [ "room-dark", "house/room-type/room-dark.png" ]

      // TODO pets to add
      , [ "pet-ecolo", "house/pet/ecolo.png" ]

      , [ "real-char-walk", "house/mr-holme-walk.png", { totalFrame: 4, interval: 100 } ]
      , [ "real-char-idle", "house/mr-holme-idle.png", { totalFrame: 5, interval: 300, startFrame: 1, endFrame: 4, pingPongMode: true } ]
      , [ "real-char-happy", "house/mr-holme-happy.png", { totalFrame: 5, interval: 150, startFrame: 1, pingPongMode: true } ]

      , [ "particle-rain", "house/weather/rain.png" ]
      , [ "particle-snow", "house/weather/snow.png" ]

      // dream world
      , [ "dream-char-walk", "space/mr-dream-walk.png", { totalFrame: 3, interval: 120 } ]
      , [ "dream-char-fly", "space/mr-dream-fly.png", { totalFrame: 3, interval: 120 } ]

      , [ "tileBackground", "space/tileBackground.png" ]
      
      , [ "planet-ecolo", "space/planet-ecolo.png" ]
      , [ "planet-bobo", "space/planet-bobo.png" ]
      , [ "planet-kitch", "space/planet-kitch.png" ]
      , [ "planet-gamer", "space/planet-gamer.png" ]
      , [ "planet-dark", "space/planet-dark.png" ]
      , [ "planet-hide", "space/planet-hide.png" ]

      , [ "collectible-bobo", "space/collectible-bobo.png" ]
      , [ "collectible-dark", "space/collectible-dark.png" ]
      , [ "collectible-gamer", "space/collectible-gamer.png" ]
      , [ "collectible-kitch", "space/collectible-kitch.png" ]
      , [ "collectible-ecolo", "space/collectible-ecolo.png" ]

      , [ "nuagePlanet", "space/nuagePlanet.png" ]

    ],
    
    // a custom pool not loaded by default, you have to load it whenever you want (you can display a custom loader or just the default loader)
    aCustomPool: [
      // resources
    ]
  }
};

export default images;
