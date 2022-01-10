import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {
  private _scoreText: Phaser.GameObjects.BitmapText;
  private _score: number;
  private _gamePlay: GamePlay;

  

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() {}

  create() {
  
    this._gamePlay = <GamePlay>this.scene.get("GamePlay");
    this._gamePlay.events.off("update-score", this.updateScore, this);
    this._gamePlay.events.on("update-score", this.updateScore, this);
    this._score = 0;
    this.registry.set("score", this._score);

    this._scoreText = this.add
      .bitmapText(20, 20, "arcade", "0")
      .setFontSize(30)
      .setTint(0x000000)
      .setOrigin(0);

  }

  update() {

    if (this._score == 100) { this.gameOver();}
  }


  private updateScore(parameters: Array<any>): void {
    this._score += parameters[0];
    this._scoreText.setText(this._score + "");
    this.registry.set("score", this._score);
  
  }

  private gameOver() {
    
      this.scene.stop("Hud");
      this.scene.stop("GamePlay");
      this.scene.start("GameOver");
     
  }
}
