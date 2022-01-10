import GamePlay from "../../scenes/GamePlay";
import IBomb from "../bomb/IBomb";
import StateMachine from "../../StateMachine";


export default class Hero extends Phaser.GameObjects.Sprite implements IBomb {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _runAnimation: Array<number>=[0, 1, 2, 3, 4, 5];
  private keys : any;
  private stateMachine: StateMachine

  private _x_velocity: number = 0;

  private can_jump : boolean = false;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, 'hero-idle-sheet');
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this.create();

    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);

    this._body.setCollideWorldBounds(true);

    this._body.setSize(12,40);
    this._body.setOffset(12,23);
    this._body.setMaxVelocity(250, 400);
    this._body.setDragX(750);

    this.keys = this._scene.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    });


    // SETUP STATE MACHINE

    this.stateMachine = new StateMachine(this, 'hero')

    this.stateMachine.addState('idle', {
        onEnter: this.onIdleEnter,
        onUpdate: this.onIdleUpdate
    })
        .addState('run', {
            onEnter: this.onRunEnter,
            onUpdate: this.onRunUpdate,
        })
        .addState('jump', {
            onEnter: this.onJumpEnter,
            onUpdate: this.onJumpUpdate,
        })
        .addState('fall', {
            onEnter: this.onFallEnter,
            onUpdate: this.onFallUpdate,
        })
        .addState('flip', {
            onEnter: this.onFlipEnter,
            onUpdate: this.onFlipUpdate,
            })

    


    this.stateMachine.setState('idle')



  }

    private onRunEnter() {
    this.anims.play('hero-running', true);
    this._body.setVelocityX(this._x_velocity);
    }

   private onRunUpdate(dt: number) {
        console.log("run");
        this.anims.play('hero-running', true);
        this._body.setVelocityX(this._x_velocity);
    }

    private onJumpEnter() {
        this.anims.play('hero-jumping', true);
        this._body.setVelocityY(-300);
        this.can_jump = true;
    }

    private onJumpUpdate() {
        this.anims.play('hero-jumping', true);
    }


    private onIdleEnter() {
        this.anims.play('hero-idle', true);
        this._body.setVelocityX(0);
    }   

    private onIdleUpdate() {
        this.anims.play('hero-idle', true);
    }   

    private onFallEnter() {
        this.anims.play('hero-fallings', true);
        this._body.setVelocityY(300);
    }

    private onFallUpdate() {
        this.anims.play('hero-fallings', true);
    }

    private onFlipEnter() {
        this.anims.play('hero-flipping', true);
        this._body.setVelocityY(-400);
    }

    private onFlipUpdate() {
        this.anims.play('hero-flipping', true);
    }


  create() {


    
  }

  preUpdate(time : any, delta : any) {

    super.preUpdate(time,delta);


    
    // MOVIMENTO

    if (this.keys.left.isDown) {

    //     this._body.setAccelerationX(-250);
    //   this.anims.play('hero-running',true); // abilitiamo la riproduzione dell'animazione (il parametro true)
        this._x_velocity = -250;
        this.stateMachine.setState('run');
        this.flipX = true; // abilitiamo il flip del nostro sprite (per simulare il movimento a sinistra)
        this._body.offset.x = 8; // ricordando che l'offset definisce la posizione del rectangolo (x,y) per la collisione 8 è la posizione ottimale mentre il nostro character è centrato va verso sinistra

    }        
    if (this.keys.right.isDown) {
        //this._body.setAccelerationX(250);
        //this.anims.play('hero-running',true); // abilitiamo la riproduzione dell'animazione (il parametro true)
        this._x_velocity = 250;
        this.stateMachine.setState('run');
        this.flipX = false; // disabilitiamo il flip del nostro sprite (per simulare il movimento a destra)
        this._body.offset.x = 12; // ricordando che l'offset definisce la posizione del rectangolo (x,y) per la collisione 12 è la posizione ottimale mentre il nostro character è centrato va verso destra
    }

    if (this.keys.space.isDown && this._body.onFloor()) {
        this.stateMachine.setState('jump')
    }

    if (this._body.velocity.y < 0 && this.stateMachine.isCurrentState('flip')) {
        this.stateMachine.setState('flip')
    }

    if (!this.keys.space.isDown && !this._body.onFloor()) {
        this.stateMachine.setState('fall')
    }


    if (!this.keys.up.isDown && !this.keys.down.isDown && !this.keys.left.isDown && !this.keys.right.isDown && !this.keys.space.isDown && this._body.onFloor()) {
        this.stateMachine.setState('idle')
    }

    


    // SALTO



    

}

  update(time: number, delta: number) {
    this.stateMachine.update(delta)
  }

  removeItem() {}
}
