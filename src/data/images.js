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
      , [ "pet-ecolo", "house/pet/pet-ecolo.png", { totalFrame: 7, isLoop: false, interval: 100 } ]
      , [ "pet-dark", "house/pet/pet-dark.png", { totalFrame: 3, interval: 70 } ]
      , [ "pet-bobo", "house/pet/pet-bobo.png", { totalFrame: 4, animated: false, interval: 100 } ]
      , [ "pet-kitch", "house/pet/pet-kitch.png", { totalFrame: 5, startFrame: 0, endFrame: 1, interval: 100 } ]
      , [ "pet-gamer", "house/pet/pet-gamer.png", { totalFrame: 4, animated: false, interval: 100 } ]

      , [ "real-char-walk", "house/mr-holme-walk.png", { totalFrame: 4, interval: 100 } ]
      , [ "real-char-idle", "house/mr-holme-idle.png", { totalFrame: 5, interval: 300, startFrame: 1, endFrame: 4, pingPongMode: true } ]
      , [ "real-char-happy", "house/mr-holme-happy.png", { totalFrame: 5, interval: 150, startFrame: 1, pingPongMode: true } ]
      , [ "real-char-back", "house/mr-holme-back.png", { totalFrame: 3, interval: 150 } ]

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

      , [ "phase-1-bobo", "space/collectibles/phase-1-bobo.png", { totalFrame: 3, interval: 250, pingPongMode: true } ]
      , [ "phase-1-dark", "space/collectibles/phase-1-dark.png", { totalFrame: 5, interval: 250 } ]
      , [ "phase-1-gamer", "space/collectibles/phase-1-gamer.png", { totalFrame: 3, interval: 250, pingPongMode: true } ]
      , [ "phase-1-kitch", "space/collectibles/phase-1-kitch.png", { totalFrame: 3, interval: 250, pingPongMode: true } ]
      , [ "phase-1-ecolo", "space/collectibles/phase-1-ecolo.png", { totalFrame: 3, interval: 250, pingPongMode: true } ]

      , [ "phase-2-bobo", "space/collectibles/phase-2-bobo.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-2-dark", "space/collectibles/phase-2-dark.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-2-gamer", "space/collectibles/phase-2-gamer.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-2-kitch", "space/collectibles/phase-2-kitch.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-2-ecolo", "space/collectibles/phase-2-ecolo.png", { totalFrame: 3, interval: 250 } ]

      , [ "phase-3-bobo", "space/collectibles/phase-3-bobo.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-3-dark", "space/collectibles/phase-3-dark.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-3-gamer", "space/collectibles/phase-3-gamer.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-3-kitch", "space/collectibles/phase-3-kitch.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-3-ecolo", "space/collectibles/phase-3-ecolo.png", { totalFrame: 3, interval: 250 } ]

      , [ "phase-4-bobo", "space/collectibles/phase-4-bobo.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-4-dark", "space/collectibles/phase-4-dark.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-4-gamer", "space/collectibles/phase-4-gamer.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-4-kitch", "space/collectibles/phase-4-kitch.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-4-ecolo", "space/collectibles/phase-4-ecolo.png", { totalFrame: 3, interval: 250 } ]

      , [ "phase-5-bobo", "space/collectibles/phase-5-bobo.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-5-dark", "space/collectibles/phase-5-dark.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-5-gamer", "space/collectibles/phase-5-gamer.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-5-kitch", "space/collectibles/phase-5-kitch.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-5-ecolo", "space/collectibles/phase-5-ecolo.png", { totalFrame: 3, interval: 250 } ]

      , [ "phase-6-bobo", "space/collectibles/phase-6-bobo.png", { totalFrame: 4, interval: 250 } ]
      , [ "phase-6-dark", "space/collectibles/phase-6-dark.png", { totalFrame: 3, interval: 250 } ]
      , [ "phase-6-gamer", "space/collectibles/phase-6-gamer.png", { totalFrame: 4, interval: 250 } ]
      , [ "phase-6-kitch", "space/collectibles/phase-6-kitch.png", { totalFrame: 4, interval: 250 } ]
      , [ "phase-6-ecolo", "space/collectibles/phase-6-ecolo.png", { totalFrame: 3, interval: 250 } ]

      , [ "hud-slot", "space/hud-slot.png" ]

    ],
    
    // a custom pool not loaded by default, you have to load it whenever you want (you can display a custom loader or just the default loader)
    aCustomPool: [
      // resources
    ]
  }
};

export default images;
