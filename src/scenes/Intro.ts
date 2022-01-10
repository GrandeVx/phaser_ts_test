export default class Intro extends Phaser.Scene {
  private _play: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {}

  create() {

    this.add.text(this.game.canvas.width / 2, 200, "BENVENUTO", {fontSize:"60px",color:"0x000000"}).setOrigin(.5)

    this._play = this.add
      .bitmapText(640, 550, "arcade", "PLAY")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xff8200)

      // Click event
      .on("pointerup", () => {
        this._play.removeInteractive();
        this.startGame(); // Avvio Gioco
      })
      // MOUSE SOPRA
      .on("pointerover", () => {
        this._play.setTint(0xff0000);
      })
      // MOUSE SOTTO
      .on("pointerout", () => {
        this._play.setTint(0xff8200);
      });
    
  }


  startGame() {
  
      this.scene.stop("Intro"); // Stop Scena Intro
      this.scene.start("GamePlay"); // Start Scena GamePlay
      this.scene.start("Hud"); // Start Scena Hud
      this.scene.bringToTop("Hud"); // la scena HUD è sopra le altre (Z-index > *)
      if (this.sys.game.device.input.touch) {}
  }

  update(time: number, delta: number) {
    
  }

}

