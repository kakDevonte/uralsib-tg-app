export default class Result extends Phaser.Scene {
  private bg: Phaser.GameObjects.Sprite;

  constructor() {
    super('Result');
  }

  public create(): void {
    const bg = this.add
      .sprite(0, this.cameras.main.height, 'gradient')
      .setOrigin(0, 1);
    bg.setDisplaySize(this.cameras.main.width, bg.height);
  }
}
