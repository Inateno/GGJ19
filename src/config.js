const CONFIG = {
  SCREEN_WIDTH : 1280,
  SCREEN_HEIGHT : 720,

  ROOM_TYPE_X : 500,
  ROOM_TYPE_Y : 582,

  INSIDE_X: 717,
  INSIDE_Y: 530,

  PET_X: 590,
  PET_Y: 637,

  CHARACTER_INITIAL_X: -70,
  CHARACTER_INITIAL_Y: 700,
  CHARACTER_SPEED: 3,

  ANIM: {
    IDLE_DURATION: 1500,
    DAILY_CHECK: {
      WEATHER: 270,
      ENV: 950,
      ROOM: 460,
      INSIDE: 700,
      HOUSE: 600,
      SLEEP_ROOM: 770
    },
    DAILY_ORDER: [ 'WEATHER', 'ROOM', 'INSIDE', 'ENV', 'HOUSE', 'SLEEP_ROOM' ],
    DAILY_INDEXES: [ 0, 3, 4, 2, 1 ]
  },

  VELOCITY_MAX: 6
}

export default CONFIG;