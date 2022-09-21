import Game from '../scenes/Game';
import { coin } from '../types/enums';

class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, x: number, y: number, texture: string, coin: coin) {
    super(scene, x, y, texture);
    this.coin = coin;
    this.init();
  }

  public tween: Phaser.Tweens.Tween;
  public coin: coin;
  public isTaked: boolean;
  private mark: Phaser.GameObjects.Sprite;

  private init(): void {
    this.isTaked = false;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setPushable(false);
    this.move();
  }

  private move(): void {
    this.tween = this.scene.add.tween({
      targets: this,
      x: '-=' + 1650, //Settings.getSpeed(),
      duration: 4500, //Settings.duration,
      onComplete: (): void => {
        this.mark?.destroy();
        this.destroy();
      },
    });
  }

  public setIsTaked(): void {
    this.isTaked = true;
    const texture = this.coin === coin.BLUE ? 'ice' : 'flame';
    const y = this.coin === coin.BLUE ? this.y - 5 : this.y;
    this.mark = this.scene.add.sprite(this.x, y, texture);
  }

  protected preUpdate(): void {
    if (this.mark) {
      this.mark.setX(this.x - 5);
    }
  }
}

export default Coin;
