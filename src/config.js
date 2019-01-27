const CONFIG = {
  SCREEN_WIDTH : 1280,
  SCREEN_HEIGHT : 720,
  HOUSE_X: 670,
  HOUSE_Y: 470,
  CHARACTER_INITIAL_X: -70,
  CHARACTER_INITIAL_Y: 700,
  CHARACTER_SPEED: 3,

  ANIM: {
    IDLE_DURATION: 1500,
    DAILY_CHECK: {
      WEATHER: 270,
      ENV: 950,
      ROOM: 500,
      INSIDE: 750,
      HOUSE: 630,
      SLEEP_ROOM: 810
    },
    DAILY_ORDER: [ 'WEATHER', 'ROOM', 'INSIDE', 'ENV', 'HOUSE', 'SLEEP_ROOM' ]
  }
}

export default CONFIG;