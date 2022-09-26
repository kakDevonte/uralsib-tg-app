import Settings from '../data/Settings';
import Button from '../components/Button';
import User from '../data/User';
import { uralsibAPI } from '../libs/Api';

export default class Result extends Phaser.Scene {
  private bg: Phaser.GameObjects.Sprite;
  private resultLogo: Phaser.GameObjects.Sprite;
  private resultIsFire: Phaser.GameObjects.Text;
  private percent: Phaser.GameObjects.Text;
  private free: Phaser.GameObjects.Text;
  private cashBack: Phaser.GameObjects.Text;

  private see: Phaser.GameObjects.Text;
  private only: Phaser.GameObjects.Text;
  private oneBid: Phaser.GameObjects.Text;
  private forTheBonus: Phaser.GameObjects.Text;
  private rubls: Phaser.GameObjects.Text;

  private dot1: Phaser.GameObjects.Sprite;
  private dot2: Phaser.GameObjects.Sprite;
  private dot3: Phaser.GameObjects.Sprite;

  private result: Phaser.GameObjects.Text;

  private againBtn: Button;
  private prizeBtn: Button;

  constructor() {
    super('Result');
  }

  public preload(): void {
    (async () => {
      await this.endGame();
    })();
    (async () => {
      await this.updateUser();
    })();
  }

  public create(): void {
    if (User.getScore() > 1000) {
      User.resetScore();
      User.plusScore(1000);
      User.setRecord(User.getScore());
    }

    const { centerX, centerY, width, height } = this.cameras.main;
    const fontSize = Settings.isMobile() ? 24 : 16;
    const bg = this.add
      .sprite(0, this.cameras.main.height, 'gradient')
      .setOrigin(0, 1);
    bg.setDisplaySize(this.cameras.main.width, bg.height);

    this.resultLogo = this.add
      .sprite(centerX, height * (Settings.isMobile() ? 0.15 : 0.2), 'result')
      .setScale(Settings.isMobile() ? 1 : 0.9);

    this.result = this.add
      .text(
        this.resultLogo.x + 132,
        this.resultLogo.y - 45,
        String(User.getScore() + ' ' + this.getScoreWord(User.getScore())),
        {
          font: '38px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setOrigin(0.5, 0);

    const record =
      'Твой рекорд - ' +
      User.getRecord() +
      ' ' +
      this.getScoreWord(User.getScore());
    this.add
      .text(this.resultLogo.x + 122, this.resultLogo.y + 20, record, {
        font: '17px stolzl_medium',
        color: '#FFFFFF',
        align: 'center',
      })
      .setOrigin(0.5, 0);

    this.resultIsFire = this.add
      .text(
        centerX,
        this.resultLogo.getBounds().bottom,
        Settings.lang.resultIsFire,
        {
          font: '10px stolzl_book',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontSize(fontSize)
      .setOrigin(0.5, 0);

    this.percent = this.add
      .text(
        centerX,
        this.resultIsFire.getBounds().bottom + height * 0.04,
        Settings.lang.percent,
        {
          font: '20px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontStyle('bold')
      .setFontSize(fontSize)
      .setOrigin(0.5, 0);

    this.dot1 = this.add
      .sprite(
        this.percent.getBounds().x,
        this.percent.getBounds().centerY,
        'dot'
      )
      .setOrigin(1, 0.5);

    this.free = this.add
      .text(
        centerX,
        this.percent.getBounds().bottom + this.percent.height / 2,
        Settings.lang.free,
        {
          font: '20px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontStyle('bold')
      .setFontSize(fontSize)
      .setOrigin(0.5, 0);

    this.dot2 = this.add
      .sprite(this.free.getBounds().x, this.free.getBounds().centerY, 'dot')
      .setOrigin(1, 0.5);

    this.cashBack = this.add
      .text(
        centerX,
        this.free.getBounds().bottom + this.free.height / 2,
        Settings.lang.cashBack,
        {
          font: '20px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontStyle('bold')
      .setFontSize(fontSize)
      .setOrigin(0.5, 0);

    this.dot3 = this.add
      .sprite(
        this.cashBack.getBounds().x,
        this.cashBack.getBounds().centerY,
        'dot'
      )
      .setOrigin(1, 0.5);

    this.see = this.add
      .text(
        this.resultIsFire.getBounds().x + 15,
        this.cashBack.getBounds().bottom + height * 0.04,
        Settings.lang.see,
        {
          font: '20px stolzl_book',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontSize(fontSize)
      .setOrigin(0, 0);

    this.only = this.add
      .text(
        this.see.getBounds().right,
        this.see.getBounds().centerY,
        Settings.lang.only,
        {
          font: '20px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontStyle('bold')
      .setFontSize(fontSize)
      .setOrigin(0, 0.5);

    this.oneBid = this.add
      .text(
        this.see.getBounds().x,
        this.see.getBounds().bottom,
        Settings.lang.oneBid,
        {
          font: '20px stolzl_medium',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontStyle('bold')
      .setFontSize(fontSize)
      .setOrigin(0, 0);

    this.forTheBonus = this.add
      .text(
        this.oneBid.getBounds().right,
        this.oneBid.getBounds().centerY,
        Settings.lang.forTheBonus,
        {
          font: '20px stolzl_book',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontSize(fontSize)
      .setOrigin(0, 0.5);

    this.rubls = this.add
      .text(
        this.see.getBounds().x,
        this.forTheBonus.getBounds().bottom,
        Settings.lang.rubls,
        {
          font: '20px stolzl_book',
          color: '#ffffff',
          align: 'center',
        }
      )
      .setFontSize(fontSize)
      .setOrigin(0, 0);

    this.againBtn = new Button(
      this,
      centerX,
      height * 0.9,
      'again-btn',
      (): void => {
        User.resetScore();
        this.scene.stop();
        this.scene.start('Game');
      }
    ).setScale(Settings.isMobile() ? 1 : 0.8);

    this.prizeBtn = new Button(
      this,
      centerX,
      this.againBtn.getBounds().top - this.againBtn.height / 1.5,
      'prize-btn',
      (): void => {
        uralsibAPI.pressButton();
        const link = 'https://www.youtube.com/c/Parimatchesports';
        const a = document.createElement('a');
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.href = link;
        a.click();
        document.body.removeChild(a);
      }
    ).setScale(Settings.isMobile() ? 1 : 0.8);

    // this.NADO = this.add
    //   .text(centerX, centerY, String(User.getRecord()), {
    //     font: '58px stolzl_medium',
    //     color: '#ffffff',
    //     align: 'center',
    //   })
    //   .setOrigin(0.5, 0.5)
  }

  private getScoreWord(score: number): string {
    const lastDigit = score % 10;
    let word: string;

    if (lastDigit === 1) word = 'балл';
    else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4)
      word = 'балла';
    else word = 'баллов';

    if (score > 10) {
      const lastDigits = score % 100;

      if (
        lastDigits === 11 ||
        lastDigits === 12 ||
        lastDigits === 13 ||
        lastDigits === 14
      )
        word = 'баллов';
    }
    return word;
  }

  private async endGame() {
    await uralsibAPI.endGame();
  }

  private async updateUser() {
    await uralsibAPI.updateUser({
      telegram_id: User.getID(),
      telegram_username: User.getUsername(),
      score: User.getRecord(),
      isLaunched: true,
    });
  }
}
