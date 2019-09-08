import { Component } from 'react';
import _ from 'underscore';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

class GameComponent extends Component {
  constructor() {
    super();

    this.state = this.getStateFromGame(GameStore.getGame());
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    GameStore.addGameChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GameStore.removeGameChangeListener(this.onChange);
  }

  onChange() {
    this.setState(this.getStateFromGame(GameStore.getGame()));
  }

  setStateAndUpdateGame(mutator, callback) {
    this.setState((state) => {
      const change = _.isFunction(mutator) ? mutator(state): mutator;
      GameActions.changeGame(this.getGameUpdateFromState(change));
      return change;
    }, callback);
  }

  getStateFromGame(game) {
    throw new Error('Implementation not provided');
  }

  /**
   * If local state contains more than subset of gameState, use this method to extract
   * gameState-only properties.
   * By default, all state changes are commited into game store.
   */
  getGameUpdateFromState(change) {
    return change;
  }
}

export default GameComponent;
