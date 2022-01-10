export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1280,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: true,
  },

  preloader: {
    bgColor: "",
    image: "logo",
    imageX: 640,
    imageY: 300,
    loadingText: "",
  },

  spritesheets: [
    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 6
    },
    {
      name:"spiderman",
      path:"assets/images/spiderman.png",
      width:32,
      height:32,
      frames:1
    },
    {
      name: "spiderman2",
      path: "assets/images/spiderman2.png",
      width: 33,
      height: 31,
      frames: 6
    },
    {
      name: "players",
      path: "assets/images/players.png",
      width: 52,
      height: 70,
      frames: 84
    }
 
  ],

  images: [
    { name: "logo", path: "assets/images/logo.png" },
    { name: "background", path: "assets/images/background.jpg" },
  ],

  atlas: [
    
  ],

 
  sounds: [
      {
      name: "music0",
      paths: ["assets/sounds/music0.ogg", "assets/sounds/music0.m4a"],
      volume: 1,
      loop: false,
      frame: 1,
    },
  ],
  audio: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instances: 10,
    },
  ],

  script: [
    {
      key: "webfont",
      path: "assets/js/webfonts.js",
    },
  ],

  bitmapfont: [
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml",
    }
  ],
};
