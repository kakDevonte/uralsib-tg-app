import Game from '../scenes/Game';

const MAX_JUMP = 500; // максимальный счетчик нажатия прыжка

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(
      scene,
      scene.cameras.main.centerX - 210,
      scene.cameras.main.centerY,
      'player'
    );
    this.init();
  }

  public scene: Game;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumpCounter: number;

  private init(): void {
    this.jumpCounter = 0;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 2,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'crash',
      frames: [{ key: 'player', frame: 0 }],
    });
    this.scene.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 1 }],
    });
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravityY(1400);
    this.setDepth(3);
    this.body.setSize(80);
    this.body.enable = true;
  }

  public jump(): void {
    this.setVelocityY(-800);
  }

  public die(): void {
    this.play('crash', true);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.playAnimation();
  }

  private playAnimation(): void {
    if (this.body.touching.down) {
      this.play('run', true);
    } else {
      this.play('jump', true);
    }
  }
}

export default Player;
