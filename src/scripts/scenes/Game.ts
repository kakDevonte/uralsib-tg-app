import Coin from '../components/Coin';
import Platform from '../components/Platform';
import Player from '../components/Player';
import { coin } from '../types/enums';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import Rules from '../screens/Rules';
import User from '../data/User';

const MAX_JUMP = 120; // абстрактное число максимального прыжка
const MIN_INDENT = 70; // минимально расстояние для следующей платформы
const TOP_INDENT = 300; // верхняя граница отступа для платформы
const BOTTOM_INDENT = 200; // нижняя граница отступа для платформы
const DISTANCE = 400; // расстояние между платформами

export default class Game extends Phaser.Scene {
  private bg: Phaser.GameObjects.TileSprite;
  private player: Player;
  private progressBar: ProgressBar;
  public currentVelocity: number = 300;
  private readonly minVelocity: number = 320;
  private readonly maxVelocity: number = 1000;
  public platforms: Phaser.Physics.Arcade.Group;
  public coins: Phaser.Physics.Arcade.Group;
  public collider: Phaser.Physics.Arcade.Collider;
  private platformEvent: Phaser.Time.TimerEvent;
  private scoreEvent: Phaser.Time.TimerEvent;
  private pauseBtn: Button;
  private isPressPause: Boolean;
  private isPause: Boolean;
  public screen: any;

  constructor() {
    super('Game');
    this.isPressPause = false;
    this.isPause = false;
  }

  public create(): void {
    this.createBackground();
    this.player = new Player(this);
    this.progressBar = new ProgressBar(this);
    this.coins = this.physics.add.group();
    this.platforms = this.physics.add.group();
    this.collider = this.physics.add.collider(this.player, this.platforms);
    this.pauseBtn = new Button(
      this,
      (this.cameras.main.width / 100) * 95,
      this.progressBar.bg.y,
      'pause',
      () => {
        this.setPause();
      }
    ).setOrigin(0.5, 0.5);

    this.createPlatform(true);
    this.tapOnTheScreen();
    this.createPlatformEvent();
    this.createScoreEvent();
    this.setCollisions();

    this.events.on('resume', (scene: this, data) => {
      this.isPause = false;
      this.platformEvent.paused = false;
      this.scoreEvent.paused = false;
      this.player.setVisible(true);
    });
  }

  public update(): void {
    if (this.isPause) return;

    if (User.getScore() >= 1000) {
      this.progressBar.resetProgress();
      this.scene.stop();
      this.scene.start('Result');
    }
    this.progressBar.updateProgress(User.getScore());
    this.onOutOfBounds();
    let velocity = this.minVelocity;
    this.currentVelocity = Math.min(velocity, this.maxVelocity);
    this.bg.tilePositionX += (this.currentVelocity / this.minVelocity) * 4.2;
  }

  private setPause(): void {
    this.scene.pause();
    this.scene.launch('Modal');
    this.isPause = true;
    this.platformEvent.paused = true;
    this.scoreEvent.paused = true;
    this.player.setVisible(false);
  }

  private setResume(): void {
    // this.scene.resume();
    this.isPause = false;
    this.platformEvent.paused = false;
    this.scoreEvent.paused = false;
    this.player.setVisible(true);
  }

  private tapOnTheScreen(): void {
    this.pauseBtn.on('pointerdown', () => {
      this.isPressPause = true;
    });
    this.input.on('pointerdown', (): void => {
      console.log('ásdsadasdsad');
      if (this.isPressPause) return;

      this.isPressPause = false;
      if (this.player.anims.getName() === 'jump') return;
      this.player.jump();
    });
  }

  private createBackground(): void {
    this.bg = this.add
      .tileSprite(
        0,
        this.cameras.main.centerY,
        this.cameras.main.displayWidth,
        this.cameras.main.displayHeight,
        'bg'
      )
      .setOrigin(0, 0.5);
  }

  private getPlatformPosition(
    size: number,
    start: boolean = false
  ): { x: number; y: number } {
    const last: Platform = this.platforms.getChildren()[
      this.platforms.getLength() - 1
    ] as Platform;

    if (start) {
      return {
        x: this.cameras.main.width / 1.5,
        y: this.player.body.bottom + 70,
      };
    } else if (last) {
      if (last.getBounds().right + DISTANCE > this.cameras.main.width) {
        return null;
      }
      const up =
        last.y - TOP_INDENT < TOP_INDENT
          ? false
          : last.y + BOTTOM_INDENT > this.cameras.main.height - BOTTOM_INDENT
          ? true
          : Boolean(Math.round(Math.random()));

      const min = up ? last.y - MAX_JUMP - MIN_INDENT : last.y + MIN_INDENT;
      const max = up ? last.y - MIN_INDENT : last.y + MIN_INDENT + MAX_JUMP;

      return {
        x: this.cameras.main.width + size / 2,
        y: Phaser.Math.Between(max, min),
      };
    }
    return null;
  }

  private createPlatform(first: boolean = false): void {
    const size = first ? 500 : Phaser.Math.Between(200, 400);
    const position = this.getPlatformPosition(size, first);

    if (position === null) return;
    const platform = new Platform(this, position.x, position.y, size);
    this.platforms.add(platform);
    this.createCoin(platform);
  }

  private createPlatformEvent(): void {
    this.platformEvent = this.time.addEvent({
      delay: 10,
      callback: (): void => {
        this.createPlatform();
        this.isPressPause = false;
      },
      loop: true,
    });
  }

  private createScoreEvent(): void {
    this.scoreEvent = this.time.addEvent({
      delay: 1000,
      callback: (): void => {
        User.plusScore(1);
      },
      loop: true,
    });
  }

  public setCollisions(): void {
    this.physics.add.overlap(this.platforms, this.player, () => {
      this.progressBar.resetProgress();
      this.player.die();
      this.scene.stop();
      this.scene.start('Result');
    });

    this.physics.add.overlap(
      this.coins,
      this.player,
      (obj1: Player, obj2: Coin) => {
        if (!obj2.isTaked) {
          obj2.setIsTaked();
          obj2.coin === coin.BLUE ? User.plusScore(50) : User.plusScore(20);
        }
      }
    );
  }

  private createCoin(platform: Platform): void {
    if (Phaser.Math.Between(1, 3) !== 1) return;

    const type = Phaser.Math.Between(1, 2) === coin.BLUE ? coin.BLUE : coin.RED;
    const texture = type === coin.BLUE ? 'blue-' : 'red-';
    const num =
      type === coin.BLUE
        ? Phaser.Math.Between(1, 4)
        : Phaser.Math.Between(1, 5);
    const x = Phaser.Math.Between(
      platform.x - platform.size / 2 + 25,
      platform.x + platform.size / 2 - 25
    );
    const icon = new Coin(this, x, platform.y - 80, texture + num, type);
    this.coins.add(icon);
  }

  private onOutOfBounds = () => {
    if (this.player.y >= this.cameras.main.height) {
      this.progressBar.resetProgress();
      this.progressBar.updateProgress(User.getScore());
      this.scene.stop();
      this.scene.start('Result');
    }
  };
}
