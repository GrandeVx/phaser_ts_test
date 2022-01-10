import { GameData } from "../GameData";

export default class Preloader extends Phaser.Scene {
  
  private _loading: Phaser.GameObjects.BitmapText;
  private _progress: Phaser.GameObjects.Graphics;
  private _image: Phaser.GameObjects.Image;
  
  private _text_list : [string,string,string,string] = ["Caricamento...", "Giuro Sto Caricando..", "Mamma mia ma quanto Pesa...","Passare alla Fibra ?.."];
  private _text_counter : number = 0;

  // image properties
  private _x_adder: number = 1;
  private _y_adder: number = 1;

  constructor() {
    super({
      key: "Preloader",
    });
  }
  // chiamato alla creazione della scena
  preload() {
    this.cameras.main.setBackgroundColor("#ffffff"); // background bianco
    this._progress = this.add.graphics();
    this.loadAssets();
  }


  name_update(news:string,time:number)  {
   // make a timer of 10 seconds
    this.time.delayedCall(time, () => {
      this._loading.text = news;
    }
    , [], this);
    
  }


  // costantemente chiamata
  update(time: number, delta: number) {

    // se l'immagine tocca il bordo destro / sinistro
    if (this._image.x > this.game.canvas.width  || this._image.x < 0) {
      this._x_adder *= -1;
    }
    // se l'immagine tocca il bordo superiore / inferiore
    if (this._image.y > this.game.canvas.height || this._image.y < 0) {
      this._y_adder *= -1;
    }

    // aggiorniamo la posizione del logo
    this._image.x += this._x_adder;
    this._image.y += this._y_adder;

    this._text_counter++ 

    if (this._text_counter > 200){
      this._loading.text = this._text_list[Math.floor(Math.random() * this._text_list.length)];
      this._text_counter = 0;
    }

  }

  // fase di inziializzazione della scena
  init() {

    // generazione dell'oggetto immagine
    this._image = this.add
      .image(
        GameData.preloader.imageX,
        GameData.preloader.imageY,
        GameData.preloader.image
      )
      .setAlpha(0);
    // il tweens aggisce contemporaneamente su una serie di oggetti
    this.tweens.add({
      targets: [this._image],
      alpha: 1,
      duration: 500,
    });

    this._loading = this.add
      .bitmapText(this.game.canvas.width / 2, 580, "arcade", "", 30)
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0.5, 1);
  }

  // caricamento degli assets
  loadAssets(): void {

    this.load.on("start", () => { });

    // caricamento dei vari file 
    this.load.on("fileprogress", (file: any, value: any) => {
      // console.log("fileprogress", file, value);
    });

    // la progress bar viene chiamata con il valore del caricamento 
    this.load.on("progress", (value: any) => {
      this._progress.clear();
      this._progress.fillStyle(0xff0000, 1);
      this._progress.fillRect(0, 530, 1280 * value, 70);
      this._loading.setText(`Loading... ${Math.round(value * 100)}%`);
    });

    // caricamento completato
    this.load.on("complete", () => {
      this._loading.setText("Tap to start!");
       this.input.once("pointerdown", () => {
        // il tweens aggisce contemporaneamente su una serie di oggetti
        this.tweens.add({
          targets: [this._image, this._loading],
          alpha: 0,
          duration: 500,
          onComplete: () => {
            this.scene.start("Intro"); // quando avviene un click si passa alla scena Intro
          },
        });
      });
    });


    //Assets Load
    //--------------------------

    //SCRIPT
    if(GameData.script!=null)
    GameData.script.forEach((element: ScriptAsset) => {
      this.load.script(element.key, element.path);
    });

    // IMAGES
    if(GameData.images!=null)
    GameData.images.forEach((element: ImageAsset) => {
      this.load.image(element.name, element.path);
    });

    // TILEMAPS
   if(GameData.tilemaps!=null)
    GameData.tilemaps.forEach((element: TileMapsAsset) => {
      this.load.tilemapTiledJSON(element.key, element.path);
    });

    // ATLAS
    if(GameData.atlas!=null)
    GameData.atlas.forEach((element: AtlasAsset) => {
      this.load.atlas(element.key, element.imagepath, element.jsonpath);
    });

    // SPRITESHEETS
    if(GameData.spritesheets!=null)
    GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
      this.load.spritesheet(element.name, element.path, {
        frameWidth: element.width,
        frameHeight: element.height,
        endFrame: element.frames,
      });
    });

    //bitmap fonts
    if(GameData.bitmapfont!=null)
    GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
      this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
    });

    // SOUNDS
    if(GameData.sounds!=null)
    GameData.sounds.forEach((element: SoundAsset) => {
      this.load.audio(element.name, element.paths);
    });

    // Audio
    if(GameData.audio!=null)
    GameData.audio.forEach((element: AudioSpriteAsset) => {
      this.load.audioSprite(
        element.name,
        element.jsonpath,
        element.paths,
        element.instance
      );
    });
  }
}
