class Button extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    callback: Function = (): void => {}
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.callback = callback;
    this.init();
  }

  public x: number;
  public y: number;
  public press: boolean;
  public callback: Function = (): void => {};
  private simple: boolean = false;

  private init(): void {
    this.scene.add.existing(this);
    this.pressButton();
  }

  public setSimpleClick(): void {
    this.simple = true;
  }

  private pressButton(): void {
    this.setInteractive();
    this.on('pointerdown', (): void => {
      this.press = true;
      let counter = 0;
      let filter = 0xffffff;

      const interval = this.scene.time.addEvent({
        delay: 5,
        callback: (): void => {
          filter -= 0x111111;
          this.setTint(filter);

          if (!this.simple) {
            this.y = Math.round(this.y + 1);
          }
          counter++;

          if (counter >= 3) {
            interval.remove(false);
          }
        },
        callbackScope: this,
        loop: true,
      });
    });

    this.on('pointerout', (): void => {
      if (this.press) {
        this.press = false;
        let counter = 0;
        let filter = 0xcccccc;

        const interval = this.scene.time.addEvent({
          delay: 10,
          callback: (): void => {
            filter += 0x111111;
            this.setTint(filter);

            if (!this.simple) {
              this.y = Math.round(this.y - 1);
            }
            counter++;

            if (counter >= 3) {
              interval.remove(false);
            }
          },
          callbackScope: this,
          loop: true,
        });
      }
    });

    this.on('pointerup', (): void => {
      if (this.press) {
        this.press = false;
        let counter = 0;
        let filter = 0xcccccc;
        const interval = this.scene.time.addEvent({
          delay: 10,
          callback: (): void => {
            filter += 0x111111;
            this.setTint(filter);

            if (!this.simple) {
              this.y = Math.round(this.y - 1);
            }
            counter++;

            if (counter >= 3) {
              interval.remove(false);
            }
          },
          callbackScope: this,
          loop: true,
        });

        this.callback();
      }
    });
  }
}

export default Button;
