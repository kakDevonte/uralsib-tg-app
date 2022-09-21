import Button from '../components/Button';

export default class Start extends Phaser.Scene {
  private button: Button;

  constructor() {
    super('Start');
  }

  public create(): void {
    const bg = this.add
      .sprite(0, this.cameras.main.height, 'gradient')
      .setOrigin(0, 1);
    bg.setDisplaySize(this.cameras.main.width, bg.height);

    this.button = new Button(
      this,
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'start-btn',
      (): void => {
        this.scene.stop();
        this.scene.start('Game');
      }
    );
  }
}
