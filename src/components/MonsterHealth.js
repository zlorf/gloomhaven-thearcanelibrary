import React from 'react';
import _ from 'underscore';
import { Grid, Row, Col, Button, ProgressBar, Modal } from 'react-bootstrap';
import GameComponent from './GameComponent';
import GloomhavenIcon from '../components/utils/GloomhavenIcon';
import {MONSTERS} from '../constants/MonsterStats';
import {SCENARIOS, RANGES, RANGE_TITLES} from '../constants/Scenarios';

const iconWidth = "30px";
const iconWidthSmall = "18px";

const ALL_STATUSES = ["statusEffectStun", "statusEffectDisarm", "statusEffectImmobilize", "statusEffectPoison", "statusEffectWound", "statusEffectMuddle", "statusEffectStrengthen", "statusEffectInvisible"];
const IMMUNITIES_MAP = {
  "statusEffectStun": "%stun%",
  "statusEffectDisarm": "%disarm%",
  "statusEffectImmobilize": "%immobilize%",
  "statusEffectPoison": "%poison%",
  "statusEffectWound": "%wound%",
  "statusEffectMuddle": "%muddle%",
};

class MonsterHealthComponent extends GameComponent {
  constructor() {
    super();

   // monsterHealth is already present in the state.
   Object.assign(this.state, {
      displayMonsterType: "ACTIVE",
      statusTokenPopup: "",
      statusTokensEnabled: [],
      healAmount: 2,
      endMonsterRoundToggled: false,
      healToggled: false,
      clearAllStatusEffectsToggled: false
    });

    this.scenarioGo = this.scenarioGo.bind(this);
  }

  getStateFromGame(game) {
    return {
      monsterHealth: game.monsterHealth || {},
    };
  }

  getGameUpdateFromState(change) {
    return _.pick(change, 'monsterHealth');
  }

  getAllActiveMonsters() {
    let activeMonsterList = [];

    // cycle through all the monsters of all different types, looking for the ones that are active
    for (let monsterNameProperty in this.state.monsterHealth.monsters) {
      if (this.state.monsterHealth.monsters.hasOwnProperty(monsterNameProperty)) {
        let monsterRecords = this.state.monsterHealth.monsters[monsterNameProperty];

        let activeMonsterRecords = monsterRecords.filter(function(currentValue, index) {
          return currentValue.alive;
        });

        activeMonsterList = activeMonsterList.concat(activeMonsterRecords);
      }
    }

    return activeMonsterList;
  }

  getMonsterType(monsterName) {
    return MONSTERS.monsters[monsterName];
  }

  getMonsterLevelStats(monster) {
    return this.getMonsterType(monster.name).level[monster.level];
  }

  makeMonsterToggleButton(monsterToDisplay) {
    let buttonClass = "btn-monster-dead";
    if (monsterToDisplay.alive) {
      if (monsterToDisplay.elite) {
        buttonClass = "btn-monster-elite";
      }
      else {
        buttonClass = "btn-monster-normal";
      }

      if (monsterToDisplay.summon) {
        buttonClass += " btn-monster-summon";
      }
    }

    buttonClass += " btn-monster";

    let monsterStatusTokens = [];

    if (!monsterToDisplay.statusTokens) {
      monsterToDisplay.statusTokens = [];
    }

    for (let i=0; i<monsterToDisplay.statusTokens.length; i++) {
      let statusToken = monsterToDisplay.statusTokens[i];

      monsterStatusTokens.push(
        <GloomhavenIcon key={i} icon={statusToken} width={iconWidthSmall} />
      );
    }

    let buttonText = monsterToDisplay.name + ' ' + monsterToDisplay.number;
    if (monsterToDisplay.summon && monsterToDisplay.alive) {
      buttonText += '*';
    }

    return (
      <Button block onClick={() => this.toggleMonster(monsterToDisplay)} className={buttonClass}>
        {buttonText} {monsterStatusTokens}
      </Button>
    );
  }

  makeMonsterKillButton(monsterToDisplay) {
    return (
      <Button disabled={!monsterToDisplay.alive} block onClick={() => this.showConfirmKillMonster(monsterToDisplay)} className={"btn-lightning" + (!monsterToDisplay.alive ? " btn-disabled" : "")}>Kill Monster</Button>
    );
  }

  calculateBossHealth(healthString, scenarioLevel, numPlaying) {
    let health = 0;

    let healthParts = healthString.split("x");

    for (let i=0; i<healthParts.length; i++) {
      let healthPart = healthParts[i];

      // translate this part of the health string to a number
      if (healthPart === "C") {
        // number of characters
        healthPart = numPlaying;
      }
      else if (healthPart === "L") {
        // scenario level
        healthPart = scenarioLevel;
      }

      if (health <= 0) {
        // this is the first number we're adding to the calculation
        health = healthPart
      }
      else {
        // multiple this number by the previous health number
        health *= healthPart;
      }
    }

    return health;
  }

  makeMonsterHealthProgressBar(monsterToDisplay) {
    let monsterHealth = this.state.monsterHealth;
    let monsterType = this.getMonsterType(monsterToDisplay.name);
    let monsterLevelStats = this.getMonsterLevelStats(monsterToDisplay);

    let maxHealth = 0;

    if (monsterType.isBoss) {
      maxHealth = this.calculateBossHealth(monsterLevelStats.health, monsterToDisplay.level, monsterHealth.defaultNumPlaying);
    }
    else {
      if (monsterToDisplay.elite) {
        maxHealth = monsterLevelStats.elite.health;
      }
      else {
        maxHealth = monsterLevelStats.normal.health;
      }
    }

    let healthNow = maxHealth - monsterToDisplay.damage;
    if (healthNow < 0) {
      healthNow = 0;
    }

    return (
      <ProgressBar label={healthNow} max={maxHealth} min={0} now={healthNow} className="progress-grey" />
    );
  }

  makeMonsterDamageHealButton(monsterToDisplay, isHeal) {
    let text = "-";
    let damageAmount = 1;
    let buttonClass = "btn-doomstalker";

    if (isHeal) {
      text = "+";
      damageAmount = -1;
      buttonClass = "btn-brute";
    }

    if (!monsterToDisplay.alive) {
      buttonClass += " btn-disabled"
    }

    return (
      <Button disabled={!monsterToDisplay.alive} block onClick={() => this.changeMonsterDamage(monsterToDisplay, damageAmount)} className={buttonClass}>{text}</Button>
    );
  }

  makeMonsterScenarioLevelButton(monsterToDisplay) {
    return (
      <Button disabled={!monsterToDisplay.alive} onClick={() => this.changeMonsterScenarioLevel(monsterToDisplay)} className={(!monsterToDisplay.alive ? " btn-disabled" : "")} block>{monsterToDisplay.level}</Button>
    );
  }

  makeDisplayedMonsterSection(monsterToDisplay) {
    let key = monsterToDisplay.name + monsterToDisplay.number;

    let monsterToggleButton = this.makeMonsterToggleButton(monsterToDisplay);
    let monsterKillButton = this.makeMonsterKillButton(monsterToDisplay);
    let monsterHealthProgressBar = this.makeMonsterHealthProgressBar(monsterToDisplay);
    let monsterTakeDamageButton = this.makeMonsterDamageHealButton(monsterToDisplay, false);
    let monsterHealButton = this.makeMonsterDamageHealButton(monsterToDisplay, true);
    let monsterLevelButton = this.makeMonsterScenarioLevelButton(monsterToDisplay);

    return(
      <Col xs={12} md={6} key={key} className="monster-health-col">
        <Row>
          <Col xs={8} className="wide-right">
            {monsterToggleButton}
          </Col>
          <Col xs={4} className="wide-left">
            { this.isDisplayActiveOnly() ? monsterKillButton : monsterLevelButton }
          </Col>
        </Row>
        <Row>
          <Col xs={8} className="wide-right">
            {monsterHealthProgressBar}
          </Col>
          <Col xs={2} className="wide-both">
            {monsterTakeDamageButton}
          </Col>
          <Col xs={2} className="wide-left">
            {monsterHealButton}
          </Col>
        </Row>
      </Col>
    );
  }

  isDisplayActiveOnly() {
    return this.state.displayMonsterType === "ACTIVE";
  }

  makeDisplayedMonsterSections() {
    let displayedMonstersData = [];
    let displayedMonstersHTML = [];

    // find which monsters to display
    if (this.isDisplayActiveOnly()) {
      displayedMonstersData = this.getAllActiveMonsters();
    }
    else {
      displayedMonstersData = this.state.monsterHealth.monsters[this.state.displayMonsterType];
    }

    // ensure that monsters are sorted alphabetically by name and then by their number
    if (displayedMonstersData) {
      displayedMonstersData.sort(function(a, b) {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        if (aName < bName) {return -1;}
        if (aName > bName) {return 1;}
        if (a.number < b.number) {return -1;}
        if (a.number > b.number) {return 1;}
        return 0;
      });

      for (let i=0; i<displayedMonstersData.length; i++) {
        let monsterToDisplay = displayedMonstersData[i];

        displayedMonstersHTML.push(this.makeDisplayedMonsterSection(monsterToDisplay));
      }
    }

    return displayedMonstersHTML;
  }

  getScenarioMonsters(scenario) {
    return SCENARIOS[scenario].monsters;
  }

  scenarioGo() {
    this.setStateAndUpdateGame((state) => {
      let monsterHealthCopy = Object.assign({}, state.monsterHealth);

      // first clear all existing monsters
      monsterHealthCopy.monsters = {};

      // find all the monster types that are in this scenario by default
      const decks = this.getScenarioMonsters(monsterHealthCopy.scenario);
      const monsterNames = _.pluck(decks, 'name');

      monsterNames.sort(function(a, b) {
        let aName = a.toLowerCase();
        let bName = b.toLowerCase();

        if (aName < bName) {return -1;}
        if (aName > bName) {return 1;}
        return 0;
      });

      for (let i=0; i<monsterNames.length; i++) {
        let monsterName = monsterNames[i];

        // find the monsters stats in the data structure
        let monsterType = this.getMonsterType(monsterName);

        let monsters = [];

        for (let j=0; j<monsterType.standeeCount; j++) {
          // add a monster record to the data structure
          monsters.push({
            name: monsterName,
            number: j + 1,
            elite: false,
            level: monsterHealthCopy.defaultScenarioLevel,
            alive: false,
            damage: 0,
            statusTokens: []
          });
        }

        monsterHealthCopy.monsters[monsterName] = monsters;
      }

      return {
        monsterHealth: monsterHealthCopy,
        displayMonsterType: "ACTIVE"
      };
    });
  }

  createMonsterHeaderButton(monsterName) {
    return (
      <Col xs={12} md={3} key={monsterName}>
        <Button onClick={() => this.showMonsters(monsterName)} className="btn-lightning" block>{monsterName}</Button>
      </Col>
    );
  }

  createMonsterHeaderActiveButton() {
    return (
      <Col xs={12} md={3} key={"active"}>
        <Button onClick={() => this.showActiveMonsters()} className="btn-scoundrel" block>All Active</Button>
      </Col>
    );
  }

  showActiveMonsters() {
    this.setState({
      displayMonsterType: "ACTIVE"
    });
  }

  showMonsters(monsterName) {
    this.setState({
      displayMonsterType: monsterName
    });
  }

  createScenarioLevelButton(value, activeValue) {
    return (
      <Col xs={1} md={1} key={value}>
        <Button onClick={() => this.levelButtonClick(value)} className={activeValue === value ? "btn-doomstalker" : ""} block>{value}</Button>
      </Col>
    );
  }

  createNumCharactersButton(value, activeValue) {
    return (
      <Col xs={3} key={value}>
        <Button onClick={() => this.numCharactersButtonClick(value)} className={activeValue === value ? "btn-doomstalker" : ""} block>{value}</Button>
      </Col>
    );
  }

  setMonsterHealthState(mutator) {
    this.setStateAndUpdateGame((state) => {
      let monsterHealthCopy = Object.assign({}, state.monsterHealth);
      mutator(monsterHealthCopy);
      return {
        monsterHealth: monsterHealthCopy
      }
    });
  }

  levelButtonClick(value) {
    this.setMonsterHealthState((monsterHealth) => {
      monsterHealth.defaultScenarioLevel = value;
    });
  }

  numCharactersButtonClick(value) {
    this.setMonsterHealthState((monsterHealth) => {
      monsterHealth.defaultNumPlaying = value;
    });
  }

  killMonster(monster) {
    this.setMonsterHealthState((monsterHealth) => {
      monster.alive = false;
      monster.damage = 0;
      monster.statusTokens = [];
    });
    this.closeConfirmKillMonster();
  }

  changeMonsterScenarioLevel(monster) {
    this.setMonsterHealthState((monsterHealth) => {
      monster.level = (monster.level + 1) % 8;
    });
  }

  healMonster(monster) {
    this.setMonsterHealthState((monsterHealth) => {
      let poisonIndex = monster.statusTokens.indexOf("statusEffectPoison");
      let woundIndex = monster.statusTokens.indexOf("statusEffectWound");
      let healDamage = true;
      if (poisonIndex > -1) {
        // poison blocks heal
        healDamage = false;
        // remove poison
        monster.statusTokens.splice(poisonIndex, 1);
      }
      if (woundIndex > -1) {
        // remove wound
        monster.statusTokens.splice(woundIndex, 1);
      }
      if (healDamage) {
        this.changeMonsterDamageInternal(monster, -this.state.healAmount);
      }
    });
  }

  changeMonsterDamage(monster, damageAmount) {
    this.setMonsterHealthState((monsterHealth) => {
      this.changeMonsterDamageInternal(monster, damageAmount);
    });
  }

  changeMonsterDamageInternal(monster, damageAmount) {
    let monsterLevelStats = this.getMonsterLevelStats(monster);
    let monsterType = this.getMonsterType(monster.name);
    let damage = monster.damage + damageAmount;

    let health = 0;
    if (monsterType.isBoss) {
      health = monsterLevelStats.health;
    }
    else {
      if (monster.elite) {
        health = monsterLevelStats.elite.health;
      }
      else {
        health = monsterLevelStats.normal.health;
      }
    }

    if (damage >= health) {
      damage = health;
    }
    else if (damage < 0) {
      damage = 0;
    }

    monster.damage = damage;
  }

  clearStatusEffectToggles() {
    this.setState({
      statusTokensEnabled: [],
      healToggled: false,
      endMonsterRoundToggled: false,
      clearAllStatusEffectsToggled: false
    });
  }

  toggleStatusEffect(statusEffect) {
    let enabled = this.state.statusTokensEnabled;
    let tokenIndex = enabled.indexOf(statusEffect);

    if (tokenIndex > -1) {
      // turn it off
      enabled.splice(tokenIndex, 1);
    }
    else {
      // turn it on
      enabled.push(statusEffect);
    }

    this.setState({
      statusTokensEnabled: enabled,
      healToggled: false,
      endMonsterRoundToggled: false,
      clearAllStatusEffectsToggled: false
    });
  }

  clearAllStatusEffectsForMonster(monster) {
    this.setMonsterHealthState((monsterHealth) => {
      monster.statusTokens = [];
    });
  }

  toggleStatusToken(statusToken, monster) {
    this.setMonsterHealthState((monsterHealth) => {
      // for backwards compatibility
      if (!monster.statusTokens) {
        monster.statusTokens = [];
      }

      const monsterType = this.getMonsterType(monster.name);
      const monsterLevelStats = this.getMonsterLevelStats(monster);
      const immunity = IMMUNITIES_MAP[statusToken];
      const isImmune = monsterType.isBoss && immunity && _.contains(monsterLevelStats.immunities, immunity);

      const index = monster.statusTokens.indexOf(statusToken);
      if (index >= 0) {
        // remove this status token from monster
        monster.statusTokens.splice(index, 1);
      }
      else if (!isImmune) {
        // add this status token to monster if it is not immune
        monster.statusTokens.push(statusToken);
      }
    });
  }

  endRoundForMonster(monster) {
    this.setMonsterHealthState((monsterHealth) => {
      let poisoned = monster.statusTokens.indexOf("statusEffectPoison") > -1;
      let wounded = monster.statusTokens.indexOf("statusEffectWound") > -1;

      // remove everything except poison and wound
      monster.statusTokens = [];

      if (poisoned) {
        monster.statusTokens.push("statusEffectPoison");
      }

      if (wounded) {
        monster.statusTokens.push("statusEffectWound");
      }
    });
  }

  toggleMonster(monster) {
    let monsterType = this.getMonsterType(monster.name);

    if (this.isDisplayActiveOnly()) {
      // we're display all active monsters

      if (this.state.statusTokensEnabled.length > 0) {
        // toggle the selected status effects for this particular monster
        for (let i=0; i<this.state.statusTokensEnabled.length; i++) {
          let effect = this.state.statusTokensEnabled[i];

          this.toggleStatusToken(effect, monster);
        }
      }
      else if (this.state.healToggled) {
        this.healMonster(monster);
      }
      else if (this.state.endMonsterRoundToggled) {
        this.endRoundForMonster(monster);
      }
      else if (this.state.clearAllStatusEffectsToggled) {
        this.clearAllStatusEffectsForMonster(monster);
      }
      else {
        // show the popup for status effects
        this.setState({
          statusTokenPopup: monster
        });
      }

      return; // don't carry on and update game state in this method - it was already done in one of the methods called
    }
    else {
      // if we're displaying only monsters of a particular type, then this button toggles between normal/elite/summon/dead
      this.setMonsterHealthState((monsterHealth) => {
        if (monsterType.isBoss) {
          // boss monster: dead -> alive (normal) -> dead -> ...

          if (!monster.alive) {
            // dead -> alive (normal)
            monster.alive = true;
          }
          else {
            // alive (normal) -> dead
            monster.alive = false;
          }
        }
        else {
          // regular monster: dead -> alive (normal) -> alive (elite) -> alive (normal, summon) -> alive (elite, summon) -> dead -> ...

          if (!monster.alive) {
            // dead -> alive (normal)
            monster.alive = true;
            monster.elite = false;
          }
          else if (!monster.elite && !monster.summon) {
            // alive (normal) -> alive (elite)
            monster.elite = true;
          }
          else if (monster.elite && !monster.summon) {
            // alive (elite) -> alive (normal, summon)
            monster.elite = false;
            monster.summon = true;
          }
          else if (!monster.elite && monster.summon) {
            // alive (normal, summon) -> alive (elite, summon)
            monster.elite = true;
          }
          else {
            // alive (elite, summon) -> dead
            monster.alive = false;
            monster.elite = false;
            monster.summon = false;
            monster.damage = 0;
          }
        }
      });
    }
  }

  closeStatusTokenPopup() {
    this.setState({
      statusTokenPopup: ""
    });
  }

  makeStatusTokenButtons() {
    let buttons = [];

    if (this.state.statusTokenPopup === "") {
      return buttons;
    }

    for (let i=0; i< ALL_STATUSES.length; i++) {
      let statusToken = ALL_STATUSES[i];

      buttons.push(
        <Col key={i} xs={4} md={3}>
          <Button block onClick={() => this.toggleStatusToken(statusToken, this.state.statusTokenPopup)} className={this.state.statusTokenPopup.statusTokens && this.state.statusTokenPopup.statusTokens.indexOf(statusToken) >= 0 ? "btn-doomstalker" : ""}>
            <GloomhavenIcon icon={statusToken} width={iconWidth} />
          </Button>
        </Col>
      );
    }

    return buttons;
  }

  makeStatusEffectToggles() {
    let buttons = [];

    for (let i=0; i< ALL_STATUSES.length; i++) {
      let statusToken = ALL_STATUSES[i];

      buttons.push(
        <Col key={i} xs={3} md={1}>
          <Button block onClick={() => this.toggleStatusEffect(statusToken)} className={this.state.statusTokensEnabled && this.state.statusTokensEnabled.indexOf(statusToken) >= 0 ? "btn-doomstalker" : ""}>
            <GloomhavenIcon icon={statusToken} width={iconWidth} />
          </Button>
        </Col>
      );
    }

    return buttons;
  }

  showScenarioChooser() {
    this.setState({
      showScenarioChooser: true
    });
  }

  showMonsterChooser() {
    this.setState({
      showMonsterChooser: true
    });
  }

  closeScenarioChooser() {
    this.setState({
      showScenarioChooser: false
    });
  }

  closeConfirmKillMonster() {
    this.setState({
      confirmKillMonster: null
    });
  }


  showConfirmKillMonster(monster) {
    this.setState({
      confirmKillMonster: monster
    });
  }

  closeMonsterChooser() {
    this.setState({
      showMonsterChooser: false
    });
  }

  makeScenarioChooserButtons() {
    return _.map(RANGES, (nums, rangeIndex) => {
      const buttons = _.map(nums, (i) => this.makeScenarioChooserButton(SCENARIOS[i].symbol || i, i));
      return (
        <Row className="scenario-chooser-container" key={rangeIndex}>
          <Col xs={12}><h4>{RANGE_TITLES[rangeIndex]}</h4></Col>
          {buttons}
        </Row>
      );
    });
  }

  makeScenarioChooserButton(buttonText, scenarioNumber) {
    return(
      <Col xs={2} key={scenarioNumber}>
        <Button block className="btn-doomstalker btn-scenario-chooser" onClick={() => this.chooseScenario(scenarioNumber)}>{buttonText}</Button>
      </Col>
    );
  }

  makeMonsterChooserButtons() {
    let buttons = [];

    for (let monsterName in MONSTERS.monsters) {
      if (MONSTERS.monsters.hasOwnProperty(monsterName)) {
        buttons.push(this.makeMonsterChooserButton(monsterName));
      }
    }

    buttons.sort(function(a, b) {
      let aKey = a.key.toLowerCase();
      let bKey = b.key.toLowerCase();

      if (aKey < bKey) {return -1;}
      if (aKey > bKey) {return 1;}
      return 0;
    });

    return buttons;
  }

  makeMonsterChooserButton(monsterName) {
    // is this monster already selected?
    let selected = this.state.monsterHealth.monsters[monsterName];

    let buttonClass = "btn-scenario-chooser";
    if (selected) {
      buttonClass += " btn-doomstalker";
    }

    return(
      <Col key={monsterName} xs={6}>
        <Button block className={buttonClass} onClick={() => this.toggleChooseMonster(monsterName)}>{monsterName}</Button>
      </Col>
    );
  }

  toggleChooseMonster(monsterName) {
    this.setMonsterHealthState((monsterHealth) => {
      // find the monsters stats in the data structure
      let monsterType = this.getMonsterType(monsterName);

      if (monsterHealth.monsters[monsterName]) {
        // we already have this monster - remove it
        delete monsterHealth.monsters[monsterName];
      }
      else {
        // add this monster to the available types
        let monsters = [];

        for (let j=0; j<monsterType.standeeCount; j++) {
          // add a monster record to the data structure
          monsters.push({
            name: monsterName,
            number: j + 1,
            elite: false,
            level: monsterHealth.defaultScenarioLevel,
            alive: false,
            damage: 0,
            statusTokens: []
          });
        }

        monsterHealth.monsters[monsterName] = monsters;
      }

      // just clear the scenario since we're no longer sticking with the predefined monsters
      monsterHealth.scenario = -1;
    });
  }

  chooseScenario(scenarioNumber) {
    this.setMonsterHealthState((monsterHealth) => {
      monsterHealth.scenario = scenarioNumber;
    });
    this.scenarioGo();
    this.closeScenarioChooser();
  }

  isMonstersChosen() {
    for (let monster in this.state.monsterHealth.monsters) {
      if (this.state.monsterHealth.monsters.hasOwnProperty(monster)) {
        return true;
      }
    }
  }

  toggleHealChange(change) {
    let newAmount = this.state.healAmount + change;

    if (newAmount <= 0) {
      newAmount = 1;
    }

    this.setState({
      healAmount: newAmount
    });
  }

  toggleHeal() {
    let healToggled = !this.state.healToggled;

    this.setState({
      healToggled: healToggled,
      endMonsterRoundToggled: false,
      clearAllStatusEffectsToggled: false,
      statusTokensEnabled: []
    });
  }

  toggleClearAllStatusEffects() {
    let clearAllStatusEffectsToggled = !this.state.clearAllStatusEffectsToggled;

    this.setState({
      healToggled: false,
      endMonsterRoundToggled: false,
      clearAllStatusEffectsToggled: clearAllStatusEffectsToggled,
      statusTokensEnabled: []
    });
  }

  toggleEndOfMonsterRound() {
    let endMonsterRoundToggled = !this.state.endMonsterRoundToggled;

    this.setState({
      healToggled: false,
      endMonsterRoundToggled: endMonsterRoundToggled,
      clearAllStatusEffectsToggled: false,
      statusTokensEnabled: []
    });
  }

  render() {
    let scenarioLevelButtons = [];

    for (let i=0; i<=7; i++) {
      scenarioLevelButtons.push(this.createScenarioLevelButton(i, this.state.monsterHealth.defaultScenarioLevel));
    }

    let numCharactersButtons = [];

    for (let i=2; i<=4; i++) {
        numCharactersButtons.push(this.createNumCharactersButton(i, this.state.monsterHealth.defaultNumPlaying));
    }

    let monsterHeaderButtons = [];

    for (let monsterNameProperty in this.state.monsterHealth.monsters) {
      if (this.state.monsterHealth.monsters.hasOwnProperty(monsterNameProperty)) {
          monsterHeaderButtons.push(this.createMonsterHeaderButton(monsterNameProperty));
      }
    }

    monsterHeaderButtons.push(this.createMonsterHeaderActiveButton());

    let displayedMonsterSections = this.makeDisplayedMonsterSections();

    let statusTokenButtons = this.makeStatusTokenButtons();

    let scenarioChooserButtonsSections = this.makeScenarioChooserButtons();

    let monsterChooserButtons = this.makeMonsterChooserButtons();

    let statusEffectToggles = this.makeStatusEffectToggles();

    return (
      <div className="container monster-health-container">
        <Modal id="modal" show={this.state.statusTokenPopup !== ""} onHide={() => this.closeStatusTokenPopup()}>
          <Modal.Header closeButton>
            <Modal.Title>Status Effects for {this.state.statusTokenPopup.name} {this.state.statusTokenPopup.number}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="status-token-buttons row">
              {statusTokenButtons}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-lightning" onClick={() => this.closeStatusTokenPopup()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal id="modal" show={this.state.showScenarioChooser} onHide={() => this.closeScenarioChooser()}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Scenario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <span>Warning: selecting a new scenario will wipe all unsaved existing monster health data.</span>
              </Col>
            </Row>
            <hr/>
            {scenarioChooserButtonsSections}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-lightning" onClick={() => this.closeScenarioChooser()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal id="modal" show={this.state.showMonsterChooser} onHide={() => this.closeMonsterChooser()}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Monsters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <span>Warning: unselecting any monster type will wipe all unsaved existing monster health data for that monster.</span>
              </Col>
            </Row>
            <hr/>
            <Row>
              {monsterChooserButtons}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-lightning" onClick={() => this.closeMonsterChooser()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal id="modal" show={this.state.confirmKillMonster && this.state.confirmKillMonster !== null} onHide={() => this.closeConfirmKillMonster()}>
          <Modal.Header closeButton>
            <Modal.Title>Kill Monster</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <span>Are you sure you want to kill this monster?</span>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Button block className="btn-scoundrel" onClick={() => this.killMonster(this.state.confirmKillMonster)}>Kill</Button>
              </Col>
              <Col xs={6}>
                <Button block className="btn-lightning" onClick={() => this.closeConfirmKillMonster()}>Cancel</Button>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {/*<Button className="btn-lightning" onClick={() => this.closeConfirmKillMonster()}>Close</Button>*/}
          </Modal.Footer>
        </Modal>

      	<Grid>
          <Row className="monster-health-row">
            <Col xs={12} md={7}>
              <Row>
                <Col xs={2}>
                  <div className="text-middle-button">Level</div>
                </Col>
                {scenarioLevelButtons}
              </Row>
            </Col>
            <Col xs={12} md={5}>
              <Row>
                <Col xs={2}>
                  <div className="text-middle-button">Chars</div>
                </Col>
                {numCharactersButtons}
              </Row>
            </Col>
          </Row>
          {this.state.monsterHealth.defaultScenarioLevel > -1 && this.state.monsterHealth.defaultNumPlaying > -1 &&
            <Row className="monster-health-row">
              <Col xs={6} md={6}>
                <Button className="btn-scoundrel" block onClick={() => this.showScenarioChooser()}>Scenario</Button>
              </Col>
              <Col xs={6} md={6}>
                <Button className="btn-scoundrel" block onClick={() => this.showMonsterChooser()}>Monster Types</Button>
              </Col>
            </Row>
          }
          {(this.state.monsterHealth.scenario > -1 || this.isMonstersChosen()) &&
            <Row className="monster-health-row">
              {monsterHeaderButtons}
            </Row>
          }
          <Row className="monster-heath-monsters-container">
            {displayedMonsterSections}
          </Row>
          <hr/>
          {(this.state.monsterHealth.scenario > -1 || this.isMonstersChosen()) &&
            <Row className="status-token-buttons">
              <Col xs={12} md={4}>
                <Button block onClick={() => this.clearStatusEffectToggles()}>Unselect All</Button>
              </Col>
              {statusEffectToggles}
              <Col xs={12} md={4}>
                <Button block className={this.state.endMonsterRoundToggled ? "btn-doomstalker" : ""} onClick={() => this.toggleEndOfMonsterRound()}>End Monster Turn</Button>
              </Col>
              <Col xs={12} md={4}>
                <Button block className={this.state.clearAllStatusEffectsToggled ? "btn-doomstalker" : ""} onClick={() => this.toggleClearAllStatusEffects()}>Clear All Status Effects</Button>
              </Col>
              <Col xs={6} md={2}>
                <Button block className={this.state.healToggled ? "btn-doomstalker" : ""} onClick={() => this.toggleHeal()}>Heal {this.state.healAmount}</Button>
              </Col>
              <Col xs={3} md={1}>
                <Button block className="btn-doomstalker" onClick={() => this.toggleHealChange(-1)}>-</Button>
              </Col>
              <Col xs={3} md={1}>
                <Button block className="btn-brute" onClick={() => this.toggleHealChange(1)}>+</Button>
              </Col>
            </Row>
          }
          <hr/>
          <Row className="monster-health-row">
            <Col xs={12} md={12}>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Select scenario level and number of characters</li>
                <li>Choose a scenario using the button provided or select particular monsters for random scenarios</li>
                <li>
                  To create monsters, press on the desired monster type
                  <ul>
                    <li>Each monster name has a number - this is the standee that it refers to</li>
                    <li>Tapping on the monster name will toggle between dead/normal/elite and whether or not the monster is a summon (represented by an asterix: *)</li>
                    <li>The individual scenario level for each monster is displayed to the right of the name (you can tap this to change it per monster)</li>
                    <li>Starting health will be the monster's health according to their level</li>
                  </ul>
                </li>
                <li>When you're done creating monsters, press the <strong>All Active</strong> button to show only monsters that are on the board</li>
                <li>The blue buttons control the monsters remaining health</li>
                <li>When viewing <strong>All Active monsters</strong>, pressing the monsters name will allow you to toggle the <strong>status effects</strong> applied to that monster</li>
                <li>When a monster is dead, press the <strong>Kill Monster</strong> button to remove them from the active list</li>
                <li>
                  The toggle buttons below the monster healt indicators allow you to apply and remove status effects from monsters in a different way. Toggle on one of the buttons and then press any of the monster buttons to apply the effect.
                  <ul>
                    <li><b>Unselect All</b> will toggle off all of the buttons</li>
                    <li><b>End Monster Turn</b> will remove all but the poison and would status effects from selected monsters (<b>CAUTION:</b> effects applied during a monsters turn (usually strengthen or invisibility) should not be removed this way - see game rules if unsure)</li>
                    <li><b>Clear All Status Effects</b> will remove all status effects from selected monsters</li>
                    <li><b>Heal X</b> will apply a healing effect to selected monsters, removing poison and wound and healing damage if applicable (the buttons to the right of this toggle button change the magnitude of the heal)</li>
                  </ul>
                </li>
              </ol>
              <p><strong>Remarks:</strong></p>
              <p>
                The following monsters appearing in Jaws of the Lion have undergone slight changes versus their basic counterparts:<br/>
                Black Imp, Giant Viper, Living Corpse, Living Spirit, Stone Golem, and Vermling Scouts.<br/>
                The stats listed here are taken from the base Gloomhaven. For a complete list of changes, see <a href="https://www.reddit.com/r/Gloomhaven/comments/hdz6pm/jaws_of_the_lion_monster_ability_card_changes/">this excellent Reddit post</a>.
              </p>
            </Col>
          </Row>
      	</Grid>
      </div>
    );
  }
}

export default MonsterHealthComponent;
