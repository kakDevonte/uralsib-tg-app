import Game from '../scenes/Game';

class ProgressBar {
  constructor(scene: Game) {
    this.scene = scene;
    this.init();
  }

  private scene: Game;
  public bg: Phaser.GameObjects.Sprite;
  private pointer: Phaser.GameObjects.Sprite;
  private tile: Phaser.GameObjects.TileSprite;
  private tween: Phaser.Tweens.Tween;
  public text: Phaser.GameObjects.Text;

  private init(): void {
    const { centerX, centerY, height, width } = this.scene.cameras.main;

    this.bg = this.scene.add
      .sprite((width / 100) * 5, (height / 100) * 5, 'progress-bg')
      .setOrigin(0, 0.5);

    this.tile = this.scene.add
      .tileSprite(this.bg.x, this.bg.y, 0, this.bg.height, 'progress')
      .setOrigin(0, 0.5);

    this.tile.setDisplaySize(0, this.bg.height);

    const mask = this.bg.createBitmapMask();
    this.tile.setMask(mask);

    this.pointer = this.scene.add.sprite(this.bg.x, this.bg.y, 'point');

    this.text = this.scene.add
      .text(this.bg.getBounds().right + 15, this.bg.y, '650', {
        font: '34px stolzl_medium',
        color: '#7545C9',
      })
      .setOrigin(0, 0.5);
  }

  public updateProgress(score: number): void {
    this.text.setText(String(score));

    const x = this.bg.x + (this.bg.displayWidth / 1000) * score;
    this.pointer.setX(x);
    this.tile.setDisplaySize(x - this.tile.x, this.bg.height);
  }

  public resetProgress(): void {
    this.pointer.setX(this.bg.x);
    this.tile.setDisplaySize(0, this.bg.height);
  }
}

export default ProgressBar;
