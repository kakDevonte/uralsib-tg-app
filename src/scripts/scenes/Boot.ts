import * as Webfont from '../libs/Webfonts.js';
import gradient from '../../assets/images/gradient.png';
import bg from '../../assets/images/bg.jpg';
import pixel from '../../assets/images/pixel.png';
import player from '../../assets/images/player.png';
import platform from '../../assets/images/platform.png';
import platformTile from '../../assets/images/platform-tile.png';
import blue1 from '../../assets/images/blue-1.png';
import blue2 from '../../assets/images/blue-2.png';
import blue3 from '../../assets/images/blue-3.png';
import blue4 from '../../assets/images/blue-4.png';
import red1 from '../../assets/images/red-1.png';
import red2 from '../../assets/images/red-2.png';
import red3 from '../../assets/images/red-3.png';
import red4 from '../../assets/images/red-4.png';
import red5 from '../../assets/images/red-5.png';
import ice from '../../assets/images/ice.png';
import flame from '../../assets/images/flame.png';
import startBtn from '../../assets/images/start-btn.png';
import progressBg from '../../assets/images/progress-bg.png';
import pause from '../../assets/images/pause.png';
import progress from '../../assets/images/progress.png';
import point from '../../assets/images/point.png';
import close from '../../assets/images/close.png';
import rulesBtn from '../../assets/images/rules-btn.png';
import menuLogo from '../../assets/images/menu-logo.png';
import result from '../../assets/images/result.png';
import dot from '../../assets/images/dot.png';
import prizeBtn from '../../assets/images/prize-btn.png';
import againBtn from '../../assets/images/again-btn.png';

export default class Boot extends Phaser.Scene {
  private fontsReady: boolean;

  constructor() {
    super('Boot');
  }

  public init(): void {
    Webfont.load({
      custom: { families: ['stolzl_medium', 'stolzl_light'] },
      active: () => {
        this.fontsReady = true;
      },
    });
  }

  public preload(): void {
    this.preloadAssets();
  }

  public create(): void {
    this.scene.stop();
    this.scene.start('Start');
  }

  private preloadAssets(): void {
    this.load.image('bg', bg);
    this.load.image('gradient', gradient);
    this.load.image('pixel', pixel);
    this.load.image('blue-1', blue1);
    this.load.image('blue-2', blue2);
    this.load.image('blue-3', blue3);
    this.load.image('blue-4', blue4);
    this.load.image('red-1', red1);
    this.load.image('red-2', red2);
    this.load.image('red-3', red3);
    this.load.image('red-4', red4);
    this.load.image('red-5', red5);
    this.load.image('ice', ice);
    this.load.image('flame', flame);
    this.load.image('platform', platform);
    this.load.image('platform-tile', platformTile);
    this.load.image('start-btn', startBtn);
    this.load.image('progress-bg', progressBg);
    this.load.image('pause', pause);
    this.load.image('progress', progress);
    this.load.image('point', point);
    this.load.image('close', close);
    this.load.image('rules-btn', rulesBtn);
    this.load.image('menu-logo', menuLogo);
    this.load.image('result', result);
    this.load.image('dot', dot);
    this.load.image('again-btn', againBtn);
    this.load.image('prize-btn', prizeBtn);

    this.load.plugin(
      'rexroundrectangleplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js',
      true
    );

    this.load.spritesheet('player', player, {
      frameWidth: 150,
      frameHeight: 199,
    });
  }
}
