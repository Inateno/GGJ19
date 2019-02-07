/**
 * @ContributorsList
 * @Inateno / http://inateno.com / http://dreamirl.com
 *
 * this is the audios list sample that will be loaded by the project
 * Please declare in the same way than this example.
 * To automatically preload a file just set "preload" to true.
 */
const audios = [
  // MUSICS
  [ "main-theme", "audio/music/neutre", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "house-ecolo", "audio/music/maison-ecolo", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "house-bobo", "audio/music/maison-bowbow", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "house-kitch", "audio/music/maison-kitsch", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "house-gamer", "audio/music/maison-gamer", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "house-dark", "audio/music/maison-halloween", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  
  ,[ "planet-ecolo", "audio/music/planet-ecolo", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "planet-bobo", "audio/music/planet-bowbow", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "planet-kitch", "audio/music/planet-kitsch", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "planet-gamer", "audio/music/planet-gamer", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "planet-dark", "audio/music/planet-halloween", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]

  ,[ "rain", "audio/fx/rain", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "sea", "audio/fx/sea", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "nature", "audio/fx/nature", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]
  ,[ "space", "audio/music/space", [ 'ogg', 'mp3' ], { "preload": false, "loop": true, "isMusic": true } ]

  // FX
  ,[ "land", "audio/fx/amerissage", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "pool": 1 } ]
  ,[ "warp", "audio/fx/warp", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "pool": 1 } ]

  ,[ "collectible-catch", "audio/fx/collectible-catch", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "pool": 1 } ]
  ,[ "collectible-complete", "audio/fx/collectible-complete", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "pool": 1 } ]
  ,[ "decollage", "audio/fx/decollage", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "pool": 1 } ]
];

export default audios;
