import Settings from '../data/Settings';
import Button from '../components/Button';

class Rules {
  constructor(scene: Phaser.Scene, func: () => void) {
    this.scene = scene;
    this.func = func;
    this.init();
  }

  private func: () => void;
  private scene: Phaser.Scene;
  private rect: any;
  private button: Button;
  private texts: Phaser.GameObjects.Text[];
  private rules: Phaser.GameObjects.Text;
  private rules_text: Phaser.GameObjects.Text;
  private balls50: Phaser.GameObjects.Text;

  private bg: Phaser.GameObjects.Sprite;
  private blue1: Phaser.GameObjects.Sprite;
  private blue2: Phaser.GameObjects.Sprite;
  private blue3: Phaser.GameObjects.Sprite;
  private blue4: Phaser.GameObjects.Sprite;

  private balls20: Phaser.GameObjects.Text;

  private red1: Phaser.GameObjects.Sprite;
  private red2: Phaser.GameObjects.Sprite;
  private red3: Phaser.GameObjects.Sprite;
  private red4: Phaser.GameObjects.Sprite;
  private red5: Phaser.GameObjects.Sprite;

  private rules_text2: Phaser.GameObjects.Text;
  private luck: Phaser.GameObjects.Text;

  private init(): void {
    const { centerX, centerY, width, height } = this.scene.cameras.main;

    this.bg = this.scene.add
      .sprite(0, this.scene.cameras.main.height, 'gradient')
      .setOrigin(0, 1);
    this.bg.setDisplaySize(this.scene.cameras.main.width, this.bg.height);

    this.texts = [];

    this.rect = this.scene.add
      // @ts-ignore
      .rexRoundRectangle(
        centerX,
        centerY,
        width * 0.9,
        Settings.isMobile() ? height * 0.7 : height * 0.8,
        15,
        0xffffff
      )
      .setOrigin(0.5, 0.5);

    this.button = new Button(
      this.scene,
      centerX + this.rect.width * 0.42,
      centerY - this.rect.height * 0.43,
      'close',
      () => {
        this.hide();
        this.func.call(this.scene);
      }
    ).setDepth(6);

    this.rules = this.scene.add
      .text(centerX, centerY - this.rect.height * 0.4, Settings.lang.rules, {
        font: '42px stolzl_medium',
        color: '#0c0000',
        align: 'center',
      })
      .setOrigin(0.5, 0);

    this.rules_text = this.scene.add
      .text(
        centerX,
        this.rules.y + this.rules.height * 1.5,
        Settings.lang.rules_text,
        {
          font: '24px stolzl_light',
          color: '#0c0000',
          align: 'left',
        }
      )
      .setOrigin(0.5, 0)
      .setFontStyle('bold');

    this.balls50 = this.scene.add
      .text(
        this.rules_text.x - this.rules_text.width / 2,
        this.rules_text.y + this.rules_text.height,
        Settings.lang.balls50,
        {
          font: '24px stolzl_medium',
          color: '#0c0000',
          align: 'left',
        }
      )
      .setOrigin(0, 0)
      .setFontStyle('bold');

    this.blue1 = this.scene.add
      .sprite(
        this.balls50.x + this.balls50.width * 1.2,
        this.balls50.y + this.balls50.height / 2,
        'blue-1'
      )
      .setScale(0.6);

    this.blue2 = this.scene.add
      .sprite(
        this.blue1.x + this.blue1.width,
        this.balls50.y + this.balls50.height / 2,
        'blue-2'
      )
      .setScale(0.6);

    this.blue3 = this.scene.add
      .sprite(
        this.blue2.x + this.blue2.width,
        this.balls50.y + this.balls50.height / 2,
        'blue-3'
      )
      .setScale(0.6);

    this.blue4 = this.scene.add
      .sprite(
        this.blue3.x + this.blue3.width,
        this.balls50.y + this.balls50.height / 2,
        'blue-4'
      )
      .setScale(0.6);

    this.balls20 = this.scene.add
      .text(
        this.rules_text.x - this.rules_text.width / 2,
        this.blue4.y + this.blue4.height * 0.8,
        Settings.lang.balls20,
        {
          font: '24px stolzl_medium',
          color: '#0c0000',
          align: 'left',
        }
      )
      .setOrigin(0, 0)
      .setFontStyle('bold');

    this.red1 = this.scene.add
      .sprite(
        this.balls20.x + this.balls20.width * 1.2,
        this.balls20.y + this.balls20.height / 2,
        'red-1'
      )
      .setScale(0.6);

    this.red2 = this.scene.add
      .sprite(
        this.red1.x + this.red1.width,
        this.balls20.y + this.balls20.height / 2,
        'red-1'
      )
      .setScale(0.6);

    this.red3 = this.scene.add
      .sprite(
        this.red2.x + this.red2.width,
        this.balls20.y + this.balls20.height / 2,
        'red-1'
      )
      .setScale(0.6);

    this.red4 = this.scene.add
      .sprite(
        this.red3.x + this.red3.width,
        this.balls20.y + this.balls20.height / 2,
        'red-1'
      )
      .setScale(0.6);

    this.red5 = this.scene.add
      .sprite(
        this.red4.x + this.red4.width,
        this.balls20.y + this.balls20.height / 2,
        'red-1'
      )
      .setScale(0.6);

    this.rules_text2 = this.scene.add
      .text(
        this.rules_text.x - this.rules_text.width / 2,
        this.red5.y + this.red5.height * 0.8,
        Settings.lang.rules_text2,
        {
          font: '24px stolzl_light',
          color: '#0c0000',
          align: 'left',
        }
      )
      .setOrigin(0, 0)
      .setFontStyle('bold');

    this.luck = this.scene.add
      .text(
        this.rules_text.x - this.rules_text.width / 2,
        this.rules_text2.y + this.rules_text2.height * 1.2,
        Settings.lang.luck,
        {
          font: '24px stolzl_light',
          color: '#0c0000',
          align: 'left',
        }
      )
      .setOrigin(0, 0)
      .setFontStyle('bold');

    this.texts.push(this.rules_text);
    this.texts.push(this.rules_text2);
    this.texts.push(this.rules);
    this.texts.push(this.balls50);
    this.texts.push(this.balls20);
    this.texts.push(this.luck);
  }

  private hide(): void {
    this.rect.destroy();
    this.blue1.destroy();
    this.blue2.destroy();
    this.blue3.destroy();
    this.blue4.destroy();

    this.red1.destroy();
    this.red2.destroy();
    this.red3.destroy();
    this.red4.destroy();
    this.red5.destroy();
    this.bg.destroy();
    this.button.destroy();
    this.texts.map((text) => {
      text.destroy();
    });
  }
}

export default Rules;
