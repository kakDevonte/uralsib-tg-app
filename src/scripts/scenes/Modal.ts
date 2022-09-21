import Rules from '../screens/Rules';
import Game from './Game';

class Modal extends Phaser.Scene {
  constructor() {
    super('Modal');
  }

  public create(): void {
    new Rules(this, () => {
      const Game = this.game.scene.getScene('Game') as Game;
      this.scene.stop();
      Game.scene.resume();
    });
  }
}

export default Modal;
