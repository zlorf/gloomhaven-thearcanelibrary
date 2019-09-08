import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import { EventEmitter } from 'events';
import {GLOBAL_ACHIEVEMENTS} from '../constants/Achievements';

const CHANGE_GAME_EVENT = "changeGame";
const MAX_PROSPERITY = 64;

// default object avoids null issues throughout app before a game is loaded
let _game = Object.assign({
  "version": 0,
  "name": "",
  "prosperity": 0,
  "donations": 0,
  "partyLocation": "",
  "partyNotes": "",
  "partyAchievements": {},
  "reputation": 0,
  "globalAchievements": {},
  "scenariosUnlocked": [],
  "scenariosComplete": [],
  "treasuresUnlocked": [],
  "monsterHealth": {
    "defaultScenarioLevel": -1,
    "defaultNumPlaying": -1,
    "scenario": -1,
    "monsters": {}
  }
}, upgradeGame(getGameLocalStorage()));

function upgradeGame(game) {
  if (!game.donations) {
    game.donations = 0;
  }
  if (!game.version) {
    game.version = 0;
  }
  if (game.version === 0) {
    // convert old global achievements into the new one (reference: https://boardgamegeek.com/thread/1761512/official-second-printing-change-log)
    if (game.globalAchievements[GLOBAL_ACHIEVEMENTS.THE_RIFT_CLOSED] || game.globalAchievements[GLOBAL_ACHIEVEMENTS.THE_DEMON_DETHRONED]) {
      // give the new achievement
      game.globalAchievements[GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED] = true;

      // clear the old achievements to reduce confusion
      game.globalAchievements[GLOBAL_ACHIEVEMENTS.THE_RIFT_CLOSED] = false;
      game.globalAchievements[GLOBAL_ACHIEVEMENTS.THE_DEMON_DETHRONED] = false;
    }

    if (game.monsterHealth && !game.monsterHealth.defaultNumPlaying) {
      game.monsterHealth.defaultNumPlaying = 4;
    }
  }
  return game;
}

function setGame(game) {
  setGameLocalStorage(game);
  _game = game;
}

function getGameLocalStorage() {
  try {
    return JSON.parse(window.localStorage.getItem('game'));
  }
  catch (e) {
    return { };
  }
}

function setGameLocalStorage(game) {
  try {
    window.localStorage.setItem('game', JSON.stringify(game));
  }
  catch (e) { }
}

function changeProsperity(amount) {
  const newProsperity = Math.max(0, Math.min(MAX_PROSPERITY, _game.prosperity + amount));
  changeGame({prosperity: newProsperity});
}

function changeGame(game) {
  setGame(Object.assign({}, _game, game));
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
      // if required, convert an old save game to a new save game
      setGame(upgradeGame(action.game));

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

    case GameConstants.CHANGE_GAME:
      changeGame(action.game);
      GameStore.emitGameChange();
      break;

    default:
  }
});

export default GameStore;
