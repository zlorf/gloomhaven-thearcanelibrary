import React from 'react';
import _ from 'underscore';
import { Grid, Row, Col, Table, Glyphicon, Button, Label } from 'react-bootstrap';
import GameActions from '../actions/GameActions';
import GameComponent from './GameComponent';
import ExpansionConstants from '../constants/ExpansionConstants';
import {SCENARIOS} from '../constants/Scenarios';
import {TREASURES} from '../constants/Treasures';

const DONATION_MILESTONES = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100];

class ProsperityComponent extends GameComponent {
  getStateFromGame(game) {
    return {
      prosperity: game.prosperity || 0,
      donations: game.donations || 0,
      treasuresUnlocked: game.treasuresUnlocked || [],
      scenariosComplete: game.scenariosComplete || [],
      scenariosUnlocked: game.scenariosUnlocked || [],
    };
  }

  increaseProsperity() {
    GameActions.changeProsperity(1);
  }

  decreaseProsperity() {
    GameActions.changeProsperity(-1);
  }

  donateToGreatOak(amount) {
    this.setStateAndUpdateGame((state) => {
      let newDonations = state.donations + amount || 0;
      let prosperityChange = 0;

      if (newDonations > 100) {
        newDonations = 100;
      }

      if (newDonations < 0) {
        newDonations = 0;
      }

      if (newDonations !== state.donations) {
        if (DONATION_MILESTONES.indexOf(newDonations) > -1 && amount > 0) {
          // if we've actually changed the donation level and we've reached a milestone
          prosperityChange = 1;
        } else if (DONATION_MILESTONES.indexOf(state.donations) > -1 && amount < 0) {
          prosperityChange = -1;
        }
      }

      let newProsperity = state.prosperity + prosperityChange;

      if (newProsperity > 64) {
        newProsperity = 64;
      }

      if (newProsperity < 0) {
        newProsperity = 0;
      }

      return {donations: newDonations, prosperity: newProsperity};
    });
  }

  /* takes in the number of checkmarks and outputs the prosperity level */
  prosperityLevel(ticks) {
    switch (true) {
        case (ticks < 4):
            return 1;
        case (ticks < 9):
            return 2;
          case (ticks < 15):
            return 3;
          case (ticks < 22):
            return 4;
          case (ticks < 30):
            return 5;
          case (ticks < 39):
            return 6;
          case (ticks < 50):
            return 7;
          case (ticks < 64):
            return 8;
          case (ticks >= 64):
            return 9;
        default:
            return 1;
    }
  }

  getScenarioNumber(tresureNumber) {
    for (const [number, scenario] of Object.entries(SCENARIOS)) {
      const treasures = scenario.treasures;
      if (treasures && treasures.indexOf(tresureNumber) >= 0) {
        return scenario.symbol || number;
      }
    }
    console.error("Treasure not found for " + tresureNumber + "!");
  }

  makeTreasureColumn(number, availableTreasures, treasuresInCompleteScenarios) {
    let unlocked = false;
    let available = false;
    let treasureInCompleteScenario = false;

    let treasure = TREASURES[number];

    if (availableTreasures.indexOf(number) >= 0) {
      available = true;
    }

    if (treasuresInCompleteScenarios.indexOf(number) >= 0) {
      treasureInCompleteScenario = true;
    }

    if (this.state.treasuresUnlocked.indexOf(number) >= 0) {
      // we have this treasure
      unlocked = true;
    }

    let buttonText = number;
    if (unlocked) {
      buttonText += " - " + treasure.title;
    }

    let buttonStyle = "";
    if (unlocked) {
      buttonStyle = "btn-scoundrel";
    }
    else if (treasureInCompleteScenario) {
      buttonStyle = "btn-lightning";

      // also add some text to button to let user know which scenario they missed treasure from
      buttonText += " - Missed in scenario " + this.getScenarioNumber(number);
    }
    else if (available) {
      buttonStyle = "btn-doomstalker";
    }

    return (
      <Col key={number} xs={12} md={4} lg={3} >
        <Button className={buttonStyle} onClick={() => this.toggleTreasure(number, availableTreasures)} block>{buttonText}</Button>
      </Col>
    );
  }

  toggleTreasure(number, availableTreasures) {
    this.setStateAndUpdateGame((state) => {
      let treasuresUnlockedCopy = state.treasuresUnlocked.slice(0);

      let indexOfScenarioToRemoveFromUnlocked = treasuresUnlockedCopy.indexOf(number);

      if (indexOfScenarioToRemoveFromUnlocked >= 0) {
        // we already unlocked this treasure: mark it as locked again (this allows users to undo their mistakes)
        treasuresUnlockedCopy.splice(indexOfScenarioToRemoveFromUnlocked, 1);
      }
      else if (availableTreasures.indexOf(number) >= 0) {
        // we have not already unlocked this treasure, and it is actually available to us based on unlocked scenarios: mark it as unlocked
        treasuresUnlockedCopy.push(number);
      }

      // otherwise, if it's not yet unlocked but we don't have access to it: do nothing (the user must unlock the relevant scenario first)
      return {
        treasuresUnlocked: treasuresUnlockedCopy
      };

    });
  }

  makeTreasuresInCompleteScenarios() {
    return _.chain(this.state.scenariosComplete)
      .map((num) => SCENARIOS[num].treasures)
      .filter()
      .flatten()
      .value();
  }

  makeAvailableTreasures() {
    return _.chain(this.state.scenariosUnlocked)
      .map((num) => SCENARIOS[num].treasures)
      .filter()
      .flatten()
      .value();
  }

  render() {
    // treasures
    let treasureColumns = [];

    let availableTreasures = this.makeAvailableTreasures();
    let treasuresInCompleteScenarios = this.makeTreasuresInCompleteScenarios();

    treasureColumns.push(<Col lg={12} key="t0"><h2>{ExpansionConstants.BASE}</h2></Col>);
    for (let i=1; i<TREASURES.length; i++) {
      if (i === 76) {
        treasureColumns.push(<Col lg={12} key="t1"><h2>{ExpansionConstants.FORGOTTEN_CIRCLES}</h2></Col>);
      }
      treasureColumns.push(this.makeTreasureColumn(i, availableTreasures, treasuresInCompleteScenarios));
    }

    // prosperity
    let level = this.prosperityLevel(this.state.prosperity);
    let unlocked = <Glyphicon glyph="check" />

    let prosperityChecks = [];

    for (let i=1; i<=this.state.prosperity; i++) {
      if ([4, 9, 15, 22, 30, 39, 50, 64].indexOf(i) > -1) {
        prosperityChecks.push(<Glyphicon className="milestone" glyph="check" key={i} />);
      }
      else {
        prosperityChecks.push(<Glyphicon glyph="check" key={i} />);
      }
    }

    for (let i=this.state.prosperity + 1; i<=64; i++) {
      if ([4, 9, 15, 22, 30, 39, 50, 64].indexOf(i) > -1) {
        prosperityChecks.push(<Glyphicon className="milestone" glyph="unchecked" key={i} />);
      }
      else {
        prosperityChecks.push(<Glyphicon glyph="unchecked" key={i} />);
      }
    }

    let donationChecks = [];

    for (let i=1; i<=this.state.donations && (this.state.donations >= 10 || i <=10); i++) {
      if (DONATION_MILESTONES.indexOf(i) > -1) {
        donationChecks.push(<Glyphicon className="milestone" glyph="check" key={i} />);
      }
      else {
        donationChecks.push(<Glyphicon glyph="check" key={i} />);
      }
    }

    for (let i=this.state.donations + 1; i<=100 && (this.state.donations >= 10 || i <=10); i++) {
      if (DONATION_MILESTONES.indexOf(i) > -1) {
        donationChecks.push(<Glyphicon className="milestone" glyph="unchecked" key={i} />);
      }
      else {
        donationChecks.push(<Glyphicon glyph="unchecked" key={i} />);
      }
    }

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <p>Use the buttons to keep track of the current <strong>prosperity level</strong> of <em>Gloomhaven</em>. As you reach new prosperity levels, the key below will let you know which items have been unlocked (the number refer to the <strong>big numbers</strong> on the backs of the cards, not the small number on the front).</p>
              {this.state.donations >= 10 &&
                <p>When donating to the <strong>Sanctuary of the Great Oak</strong>, the prosperity level will automatically be adjusted when you reach a new milestone.</p>
              }
              <p>Please note that the prosperity track is correct for the <strong>second printing</strong> of Gloomhaven. The first printing has one extra checkbox per prosperity level.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8} className="prosperity-checks-container">
              <Row>
                <Col xs={12} md={12} className="text-center">
                  <h2>Prosperity</h2>
                </Col>
                <Col xs={12} md={12} className="prosperity-label-container text-center">
                  <Label className="label-xxlarge label-brute">{level}</Label>
                </Col>
                <Col xs={6} md={6}>
                  <Button href="#" className="btn-lightning" block onClick={this.decreaseProsperity.bind(this)}><Glyphicon glyph="minus" /></Button>
                </Col>
                <Col xs={6} md={6}>
                  <Button href="#" className="btn-scoundrel" block onClick={this.increaseProsperity.bind(this)}><Glyphicon glyph="plus" /></Button>
                </Col>
              </Row>
              <Row className="prosperity-checks-list">
                <Col xs={12} md={12}>
                  {prosperityChecks}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} className="text-center">
                  <h2>Sanctuary of the Great Oak</h2>
                </Col>
                <Col xs={12} md={12} className="prosperity-label-container text-center">
                  <Label className="label-xxlarge label-brute">{this.state.donations * 10}</Label>
                </Col>
                <Col xs={6} md={6}>
                  <Button href="#" className="btn-lightning" block onClick={() => this.donateToGreatOak(-1)}><Glyphicon glyph="minus" /></Button>
                </Col>
                <Col xs={6} md={6}>
                  <Button href="#" className="btn-scoundrel" block onClick={() => this.donateToGreatOak(1)}><Glyphicon glyph="plus" /></Button>
                </Col>
              </Row>
              <Row className="prosperity-checks-list">
                <Col xs={12} md={12}>
                  {donationChecks}
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4}>
              <Table striped condensed hover>
                <thead>
                  <tr>
                    <th>Item Numbers</th>
                    <th>Unlocked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001 - 014</td>
                    <td>{level >= 1 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>015 - 021</td>
                    <td>{level >= 2 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>022 - 028</td>
                    <td>{level >= 3 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>029 - 035</td>
                    <td>{level >= 4 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>036 - 042</td>
                    <td>{level >= 5 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>043 - 049</td>
                    <td>{level >= 6 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>050 - 056</td>
                    <td>{level >= 7 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>057 - 063</td>
                    <td>{level >= 8 && unlocked}</td>
                  </tr>
                  <tr>
                    <td>064 - 070</td>
                    <td>{level >= 9 && unlocked}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h2>Treasure</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <p>Trying to remember what treasure overlay tiles you've missed? Look no further!</p>
              <p>Any scenarios you have <strong>marked as unlocked</strong> on the <a href="/scenarios">Scenario</a> page will be marked as available below, allowing you to select them. Clicking on an available treasure button will mark it as discovered and <strong>reveal its contents</strong>.</p>
              <p>Undiscovered treasures in scenarios you have <strong>marked as complete</strong> on the <a href="/scenarios">Scenario</a> page will be shown in red below.</p>
            </Col>
          </Row>
          <Row className="treasure-key">
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-scoundrel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Treasure discovered
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-doomstalker">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Treasure in available scenario
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-lightning">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Missed Treasure in complete scenario
            </Col>
          </Row>
          <Row className="treasure-container">
            {treasureColumns}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProsperityComponent;
