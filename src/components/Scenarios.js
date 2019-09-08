import React from 'react';
import _ from 'underscore';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import GameComponent from './GameComponent';
import ExpansionConstants from '../constants/ExpansionConstants';
import {SCENARIOS, RANGES} from '../constants/Scenarios';
import GloomhavenIcon from '../components/utils/GloomhavenIcon';

class ScenariosComponent extends GameComponent {
  getStateFromGame(game) {
    return {
      partyAchievements: game.partyAchievements || {},
      globalAchievements: game.globalAchievements || {},
      scenariosComplete: game.scenariosComplete || [],
      scenariosUnlocked: game.scenariosUnlocked || [],
    };
  }

  isAllowedToDoScenario(number) {
    const scenario = SCENARIOS[number];
    const globalAchievements = this.state.globalAchievements;
    const partyAchievements = this.state.partyAchievements;

    const conditionsSatisfied = [];
    for (const reqGlobAch of (scenario.globalAchievementsRequired || [])) {
      conditionsSatisfied.push(globalAchievements[reqGlobAch] === "true");
    }
    for (const reqGlobAchInc of (scenario.globalAchievementsRequiredIncomplete || [])) {
      conditionsSatisfied.push(!globalAchievements[reqGlobAchInc]);
    }
    for (const reqPartyAch of (scenario.partyAchievementsRequired || [])) {
      conditionsSatisfied.push(partyAchievements[reqPartyAch] === "true");
    }
    for (const reqPartyAchInc of (scenario.partyAchievementsRequiredIncomplete || [])) {
      conditionsSatisfied.push(partyAchievements[reqPartyAchInc] !== "true");
    }

    const f = scenario.onlyOneAchievementRequired ? _.some : _.every;
    return f(conditionsSatisfied);
  }

  makeScenarioColumn(number) {
    let scenario = SCENARIOS[number];
    // mainly just for testing - make sure we're not trying to render a scenario that doesn't exist
    if (!scenario) {
      return "";
    }

    let buttonStyle = "";

    if (this.state.scenariosComplete.indexOf(number) >= 0) {
      // scenario is complete - no need to check requirements
      buttonStyle = "btn-scoundrel";
    }
    else if (this.state.scenariosUnlocked.indexOf(number) >= 0) {
      // scenario is unlocked but we haven't done it yet - check the requirements
      if (this.isAllowedToDoScenario(number)) {
        // we are allowed to do this scenario
        buttonStyle = "btn-doomstalker";
      }
      else {
        // there is a party or global achievement blocking us from doing this scenario (this could change later)
        buttonStyle = "btn-lightning";
      }
    }

    // just save some space on mobiles by shrinking the buttons when they are showing only a number
    let xs = 6;
    let iconHeight = 20;

    let buttonText = scenario.symbol || number;
    let icon = scenario.icon ? <GloomhavenIcon icon={scenario.icon} height={iconHeight} /> : '';

    // always show number, but only show scenario title if it is unlocked
    if (this.state.scenariosUnlocked.indexOf(number) >= 0) {
      buttonText += ": " + scenario.title;
      xs = 12;
    }

    return (
      <Col key={number} xs={xs} md={4} lg={3}>
        <Button onClick={() => this.toggleScenarioClick(number)} className={buttonStyle} block>{icon}<span>{buttonText}</span></Button>
      </Col>
    );
  }

  addScenarioToList(listName, number) {
    this.setStateAndUpdateGame((state) => {
      return {
        [listName]: _.union(state[listName], [number]),
      };
    });
  }

  completeScenario(number) {
    this.addScenarioToList("scenariosComplete", number);
  }

  unlockScenario(number) {
    this.addScenarioToList("scenariosUnlocked", number);
  }

  lockScenario(number) {
    // to lock a scenario, it needs to be removed from both the unlocked and completed lists
    this.setStateAndUpdateGame((state) => {
      return {
        scenariosComplete: _.without(state.scenariosComplete, number),
        scenariosUnlocked: _.without(state.scenariosUnlocked, number),
      };
    });
  }

  toggleScenarioClick(number) {
    if (this.state.scenariosComplete.indexOf(number) >= 0) {
      // scenario is complete: mark it is locked again (this step allows users to undo their mistakes)
      this.lockScenario(number);
    }
    else if (this.state.scenariosUnlocked.indexOf(number) >= 0) {
      // scenario is unlocked but we haven't done it yet

      if (this.isAllowedToDoScenario(number)) {
        // we are allowed to do this scenario: mark it as complete
        this.completeScenario(number);
      }
      else {
        // something is blocking us from completing this scenario: mark it as locked again (this step allows users to undo their mistakes)
        this.lockScenario(number);
      }
    }
    else {
      // scenario is locked: mark it as unlocked
      this.unlockScenario(number);
    }
  }

  render() {
    let campaignMissionColumns = [];
    let personalQuestColumns = [];
    let randomScenarioColumns = [];
    let otherColumns = [];

    // campaign missions
    for (let i=1; i<= 51; i++) {
      campaignMissionColumns.push(this.makeScenarioColumn(i));
    }

    // personal quests
    for (let i=52; i<= 62; i++) {
      personalQuestColumns.push(this.makeScenarioColumn(i));
    }

    // random side scenarios
    for (let i=63; i<= 71; i++) {
      randomScenarioColumns.push(this.makeScenarioColumn(i));
    }

    // other (class & events) scenarios
    for (let i=72; i<= 95; i++) {
      otherColumns.push(this.makeScenarioColumn(i));
    }

    // Forgotten Circles
    const forgottenCirclesColumns = _.map(RANGES[1], (i) => this.makeScenarioColumn(i));

    // solo scenarios
    const soloColumns = _.map(RANGES[2], (i) => this.makeScenarioColumn(i));

    // kickstarter scenarios
    const kickstarterColumns = _.map(RANGES[3], (i) => this.makeScenarioColumn(i));

    return (
      <div className="container scenarios-container">
        <Grid>
          <Row>
            <Col xs={12}>
              <p>You can track your campaign's progress of <strong>unlocking and completing</strong> scenarios with the buttons below.</p>
              <p>Each button has a number that corresponds to a scenario in the scenario book. Selecting a scenario button will reveal its name and mark it as <strong>unlocked</strong>. You can do this when you place a sticker on the map.</p>
              <p>Selecting a scenario that has been unlocked will change its status to <strong>completed</strong>.</p>
              <p>Both the <strong>party achievements</strong> and <strong>global achievements</strong> that you have marked as gained and lost in the app will determine whether you are eligible to do a scenario in campaign mode. The status of a scenario will <strong>update automatically</strong> as you gain and lose party and global achievements.</p>
              <p>Please note that the achievement requirements should be up to date for the <strong>second printing</strong> of Gloomhaven, because there were a number of loopholes closed. Please see the <strong>Scenario book</strong> and <strong>Sticker sheets</strong> section of <a href="https://boardgamegeek.com/thread/1761512/official-second-printing-change-log">Official Second Printing Change Log</a> for further details if you own the original printing.</p>
              <p>The <strong>Kickstarer scenarios</strong> start with <strong>K</strong> (eg. K9). The <strong>solo scenarios</strong> start with <strong>S</strong> (eg. S11) and are in the order presented in the solo scenario book.</p>
            </Col>
          </Row>
          <Row className="scenario-key">
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-scoundrel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Scenario successfully complete
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-doomstalker">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Scenario unlocked
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-lightning">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Ineligible for scenario
            </Col>
          </Row>
          <Row>
            <Col lg={12}><h2>{ExpansionConstants.BASE}</h2></Col>
            {campaignMissionColumns}
          </Row>
          <hr />
          <Row>
            {personalQuestColumns}
          </Row>
          <hr />
          <Row>
            {randomScenarioColumns}
          </Row>
          <hr />
          <Row>
            {otherColumns}
          </Row>
          <hr />
          <Row>
            <Col lg={12}><h2>{ExpansionConstants.FORGOTTEN_CIRCLES}</h2></Col>
            {forgottenCirclesColumns}
          </Row>
          <hr />
          <Row>
            <Col lg={12}>
              <h2>{ExpansionConstants.SOLO}</h2>
              <p>Coresponding scenario is unlocked whether the class reaches level 5.</p>
            </Col>
            {soloColumns}
          </Row>
          <hr />
          <Row>
            <Col lg={12}><h2>{ExpansionConstants.KICKSTARTER}</h2></Col>
            {kickstarterColumns}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ScenariosComponent;
