import Game from '../scenes/Game';

const SIDE = 38; // ширина края платформа
const HEIGHT = 78; // высота спрайта платформы

class Platform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, x: number, y: number, size: number) {
    super(scene, x, y, 'pixel');
    this.size = size;
    this.init();
  }

  public tween: Phaser.Tweens.Tween;
  public size: number;
  private left: Phaser.GameObjects.Sprite;
  private center: Phaser.GameObjects.TileSprite;
  private right: Phaser.GameObjects.Sprite;

  private init(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(this.size - 10, 50);
    this.setPushable(false);
    this.build();
    this.move();
  }

  private build(): void {
    this.left = this.scene.add
      .sprite(this.leftX(), this.y, 'platform')
      .setOrigin(0, 0.5);

    this.right = this.scene.add
      .sprite(this.rightX(), this.y, 'platform')
      .setOrigin(1, 0.5)
      .setFlipX(true);

    const width = this.size - SIDE * 2 + 5;
    this.center = this.scene.add.tileSprite(
      this.x,
      this.y,
      width,
      HEIGHT,
      'platform-tile'
    );
  }

  private leftX(): number {
    return this.x - this.size / 2;
  }

  private rightX(): number {
    return this.x + this.size / 2;
  }

  private move(): void {
    this.tween = this.scene.add.tween({
      targets: this,
      x: '-=' + 1650, //Settings.getSpeed(),
      duration: 4500, //Settings.duration,
      onComplete: (): void => this.destroy(),
    });
  }

  public destroy(): void {
    this.left?.destroy();
    this.center?.destroy();
    this.right?.destroy();
    super.destroy();
  }

  protected preUpdate(): void {
    this.left.setX(this.leftX());
    this.right.setX(this.rightX());
    this.center.setX(this.x);
  }
}

export default Platform;
