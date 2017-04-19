import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import { EventEmitter } from 'events';

const CHANGE_GAME_EVENT = "changeGame";
const MAX_PROSPERITY = 64;

let _game = {};

function setGame(game) {
  _game = game;
}

function changeProsperity(amount) {
  let newProsperity = _game.prosperity + amount;

  if (newProsperity > MAX_PROSPERITY) {
    newProsperity = MAX_PROSPERITY;
  }

  if (newProsperity < 0) {
    newProsperity = 0;
  }

  _game.prosperity = newProsperity;
}

class GameStoreClass extends EventEmitter {

  emitGameChange() {
    this.emit(CHANGE_GAME_EVENT);
  }

  addGameChangeListener(callback) {
    this.on(CHANGE_GAME_EVENT, callback)
  }

  removeGameChangeListener(callback) {
    this.removeListener(CHANGE_GAME_EVENT, callback)
  }

  getGame() {
    return _game;
  }

}

const GameStore = new GameStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
GameStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case GameConstants.RECEIVE_GAME:
      setGame(action.game);

      // We need to call emitGameChange so the event listener knows that a change has been made
      GameStore.emitGameChange();
      break;

    case GameConstants.RECEIVE_GAME_ERROR:
      alert(action.message);
      GameStore.emitGameChange();
      break;

    case GameConstants.CHANGE_PROSPERITY:
      changeProsperity(action.amount);
      GameStore.emitGameChange();
      break;

    default:
  }

});

export default GameStore;