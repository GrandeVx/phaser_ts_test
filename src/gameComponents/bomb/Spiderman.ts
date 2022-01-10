import GamePlay from "../../scenes/GamePlay";
import IBomb from "./IBomb";
export default class Spiderman extends Phaser.GameObjects.Sprite implements IBomb {

    protected _config: genericConfig;
    protected _scene: GamePlay;
    // private _body: Phaser.Physics.Arcade.Body;
    private _run: Array<number> = [0, 1, 2, 3];
    private _idle: Array<number> = [4,5];
  

    constructor(params: genericConfig) {
      super(params.scene, params.x, params.y, params.key);
      this._config = params;
      this._scene = <GamePlay>params.scene;
      // this._body = <Phaser.Physics.Arcade.Body>this.body;
      this.create();
    }
  
    create() {
  

      let _animation = {
        key: "run",
        frames: this.anims.generateFrameNumbers("spiderman2",
          { frames: this._run }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };
      this.anims.create(_animation);
  
      _animation = {
        key: "idle",
        frames: this.anims.generateFrameNumbers("spiderman2",
          { frames: this._idle }),
        frameRate: 10,
        yoyo: false,
        repeat: -1
      };
  
      this.anims.create(_animation);
      this.play("idle");
      this._scene.add.existing(this);
    
  



    }
  
    update(time: number, delta: number) {

    }

    movement(where:string) {

      if (where == "right") {
        this.flipX = false;
        this.play("run",true);
        this.x += 10;
      }
      if (where == "left") {
        this.flipX = true;
        this.play("run",true);
        this.x -= 10;
      }
      if (where == "down") {
        this.play("run");
        this.y += 10;
      }
      if (where == "up") {
        this.play("run");
        this.y -= 10;
      }


    }
  
    removeItem() {}


}