
import BOMB from "../gameComponents/bomb/Bomb";
import Spiderman from "../gameComponents/bomb/Spiderman";
import Hero from "../gameComponents/hero/Hero";
import StateMachine from "../StateMachine";

export default class GamePlay extends Phaser.Scene {

  private _sfx: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private _groupBomb: Phaser.GameObjects.Group;
  private _logo: Phaser.GameObjects.Image;
  private cursors:any;
  private _sprite: Phaser.GameObjects.Sprite;
  private _run: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7];
  private _idle: Array<number> = [8,9,10,11,12,13];
  private _hero: Hero;
  private stateMachine = new StateMachine(this, 'hero')
  moon: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: "GamePlay" });
  }

  preload() {
    this.load.image('background', 'assets/images/background.jpg');
        // generiamo lo sprite sheet per il nostro personaggio
        this.load.spritesheet('hero-idle-sheet', '../assets/images/hero/idle.png', {
          frameWidth: 32,
          frameHeight: 64,
        });
    
        this.load.spritesheet('hero-run-sheet', '../assets/images/hero/run.png', {
          frameWidth: 32,
          frameHeight: 64,
        });
    
        this.load.spritesheet('hero-pivot-sheet', '../assets/images/hero/pivot.png', {
          frameWidth: 32,
          frameHeight: 64,
        });
    
        this.load.spritesheet('hero-jump-sheet', '../assets/images/hero/jump.png', {
          frameWidth: 32,
          frameHeight: 64,
        });
    
        this.load.spritesheet('hero-flip-sheet', '../assets/images/hero/spinjump.png', {
          frameWidth: 32,
          frameHeight: 64,
        });
    
        this.load.spritesheet('hero-fall-sheet', '../assets/images/hero/fall.png', {
          frameWidth: 32,
          frameHeight: 64,
        });
    
        this.load.spritesheet('moon-sheet222', '../assets/images/hero/moon.png', {
          frameWidth: 100,
          frameHeight: 100,
        });
    
  }
  init() {}
  create() {

    this.add.image(0, 0, 'background').setOrigin(0.2);
    this.input.addPointer(2);

    this._sfx = this.sound.addAudioSprite("sfx");

    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.anims.create({
      key: 'hero-idle',
      frames: this.anims.generateFrameNumbers('hero-idle-sheet', {start: 0, end: 1}),
    });

    this.anims.create({
      key: 'hero-running',
      frames: this.anims.generateFrameNumbers('hero-run-sheet', {start: 0, end: 5}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hero-pivoting',
      frames: this.anims.generateFrameNumbers('hero-pivot-sheet',{start: 0, end: 1}),
    });

    this.anims.create({
      key: 'hero-jumping',
      frames: this.anims.generateFrameNumbers('hero-jump-sheet',{start: 0, end: 2}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hero-flipping',
      frames: this.anims.generateFrameNumbers('hero-flip-sheet',{start: 0, end: 10}),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: 'hero-fallings',
      frames: this.anims.generateFrameNumbers('hero-fall-sheet',{start: 0, end: 2}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'moon-anim',
      frames: this.anims.generateFrameNumbers('moon-sheet222',{start: 0, end: 40}),
      frameRate: 10,
      repeat: -1,
    });

    this.moon = this.add.sprite(100, 100, 'moon-sheet222');
    this.moon.setScale(2);
    this.anims.play('moon-anim', this.moon);




    //this._groupBomb.add(new BOMB({ scene:this,key:"BOMB",x:100,y:100}))
    this._hero = new Hero({ scene: this, key: "HERO", x: 215, y: 160,  });

    const piattaforma = this.add.rectangle(220,240,260,10,0x4BCB7C); // creiamo un rettangolo
    this.physics.add.existing(piattaforma,true); // aggiungiamo la fisica al nostro rettangolo


    this.physics.add.collider(this._hero,piattaforma); // aggiungiamo la collisione tra il nostro rettangolo e il nostro personaggio


  }


  update(time: number, delta: number) {

    // check if user press the D key
    this._hero.update(time,delta)

  

}
}