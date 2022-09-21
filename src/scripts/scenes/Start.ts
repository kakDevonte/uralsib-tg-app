import Button from '../components/Button';
import Rules from '../screens/Rules';
import Settings from '../data/Settings';

export default class Start extends Phaser.Scene {
  private buttonStart: Button;
  private buttonRules: Button;
  private welcome: Phaser.GameObjects.Text;
  private runToFinish: Phaser.GameObjects.Text;
  private hundred: Phaser.GameObjects.Text;
  private bonus: Phaser.GameObjects.Text;
  private bank: Phaser.GameObjects.Text;
  private goodLuck: Phaser.GameObjects.Text;
  private texts: Phaser.GameObjects.Text[];
  private logo: Phaser.GameObjects.Sprite;
  private isRules: boolean;

  constructor() {
    super('Start');
    this.isRules = false;
  }

  public screen: any;

  public create(): void {
    const { centerX, centerY, height, width } = this.cameras.main;
    const bg = this.add.sprite(0, height, 'gradient').setOrigin(0, 1);
    bg.setDisplaySize(width, bg.height);

    this.welcome = this.add
      .text(centerX, height * 0.1, Settings.lang.welcome, {
        font: '42px stolzl_medium',
        color: '#ffffff',
        align: 'center',
      })
      .setLineSpacing(5)
      .setOrigin(0.5, 0);

    this.runToFinish = this.add
      .text(
        this.welcome.getBounds().x * 2.5,
        this.welcome.getBounds().bottom + 25,
        Settings.lang.runToFinish,
        {
          font: '26px stolzl_light',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0, 0);

    this.hundred = this.add
      .text(
        this.runToFinish.getBounds().right + 5,
        this.runToFinish.y,
        Settings.lang.hundred,
        {
          font: '26px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0, 0);

    this.bonus = this.add
      .text(
        this.runToFinish.getBounds().x * 1.2,
        this.hundred.getBounds().bottom,
        Settings.lang.bonus,
        {
          font: '26px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0, 0);

    this.bank = this.add
      .text(
        this.bonus.getBounds().right,
        this.hundred.getBounds().bottom,
        Settings.lang.bank,
        {
          font: '26px stolzl_light',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0, 0);

    this.goodLuck = this.add
      .text(
        centerX,
        this.bank.getBounds().bottom + 25,
        Settings.lang.goodLuck,
        {
          font: '26px stolzl_light',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0.5, 0);

    this.logo = this.add
      .sprite(centerX, centerY + 100, 'menu-logo')
      .setOrigin(0.5, 0.5)
      .setScale(Settings.isMobile() ? 1 : 0.8);

    this.buttonRules = new Button(
      this,
      this.cameras.main.width * 0.27,
      this.cameras.main.height * 0.9,
      'rules-btn',
      (): void => {
        this.setShow(false);
        this.isRules = true;
        this.screen = new Rules(this, () => {
          this.setShow(true);
        });
      }
    );

    this.buttonStart = new Button(
      this,
      this.cameras.main.width * 0.73,
      this.cameras.main.height * 0.9,
      'start-btn',
      (): void => {
        this.setShow(false);
        if (this.isRules) {
          this.scene.stop();
          this.scene.start('Game');
        } else {
          this.isRules = true;
          this.screen = new Rules(this, () => {
            this.scene.stop();
            this.scene.start('Game');
          });
        }
      }
    );
    this.texts = [];
    this.texts.push(this.welcome);
    this.texts.push(this.runToFinish);
    this.texts.push(this.hundred);
    this.texts.push(this.bonus);
    this.texts.push(this.bank);
    this.texts.push(this.goodLuck);
  }

  private setShow(flag: boolean): void {
    this.buttonStart.setVisible(flag);
    this.buttonRules.setVisible(flag);
    this.texts.map((text) => {
      text.setVisible(flag);
    });
    this.logo.setVisible(flag);
  }
  // private show(): void {
  //     this.buttonStart.setVisible(false)
  //     this.buttonRules.setVisible(false)
  //     this.texts.map((text) => {
  //         text.setVisible(false);
  //     });
  //     this.logo.setVisible(false);
  // }
}
