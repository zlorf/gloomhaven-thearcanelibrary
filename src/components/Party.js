import React from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon, Well, Label } from 'react-bootstrap';
import GameComponent from './GameComponent';
import {PARTY_ACHIEVEMENTS} from '../constants/Party';
import ExpansionConstants from '../constants/ExpansionConstants';

const possiblePartyAchievements = [
  [ExpansionConstants.BASE,
    [
      PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND,
      PARTY_ACHIEVEMENTS.A_MAP_TO_TREASURE,
      PARTY_ACHIEVEMENTS.ACROSS_THE_DIVIDE,
      PARTY_ACHIEVEMENTS.AN_INVITATION,
      PARTY_ACHIEVEMENTS.BAD_BUSINESS,
      PARTY_ACHIEVEMENTS.DARK_BOUNTY,
      PARTY_ACHIEVEMENTS.DEBT_COLLECTION,
      PARTY_ACHIEVEMENTS.FIRST_STEPS,
      PARTY_ACHIEVEMENTS.FISHS_AID,
      PARTY_ACHIEVEMENTS.FOLLOWING_CLUES,
      PARTY_ACHIEVEMENTS.GRAVE_JOB,
      PARTY_ACHIEVEMENTS.HIGH_SEA_ESCORT,
      PARTY_ACHIEVEMENTS.JEKSERAHS_PLANS,
      PARTY_ACHIEVEMENTS.REDTHORNS_AID,
      PARTY_ACHIEVEMENTS.SIN_RA,
      PARTY_ACHIEVEMENTS.STONEBREAKERS_CENSER,
      PARTY_ACHIEVEMENTS.SUN_BLESSED,
      PARTY_ACHIEVEMENTS.THE_DRAKES_COMMAND,
      PARTY_ACHIEVEMENTS.THE_DRAKES_TREASURE,
      PARTY_ACHIEVEMENTS.THE_POISONS_SOURCE,
      PARTY_ACHIEVEMENTS.THE_SCEPTER_AND_THE_VOICE,
      PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND,
      PARTY_ACHIEVEMENTS.THE_VOICES_TREASURE,
      PARTY_ACHIEVEMENTS.THROUGH_THE_NEST,
      PARTY_ACHIEVEMENTS.THROUGH_THE_RUINS,
      PARTY_ACHIEVEMENTS.THROUGH_THE_TRENCH,
      PARTY_ACHIEVEMENTS.TREMORS,
      PARTY_ACHIEVEMENTS.WATER_STAFF
    ]
  ],
  [ExpansionConstants.FORGOTTEN_CIRCLES,
    [
      PARTY_ACHIEVEMENTS.A_STRONGBOX,
      PARTY_ACHIEVEMENTS.ACCOMPLICES,
      PARTY_ACHIEVEMENTS.ANGELS_OF_DEATH,
      PARTY_ACHIEVEMENTS.BEAUTY_IN_FREEDOM,
      PARTY_ACHIEVEMENTS.CUSTODIANS,
      PARTY_ACHIEVEMENTS.DIAMARAS_AID,
      PARTY_ACHIEVEMENTS.DIMENSIONAL_EQUILIBRIUM,
      PARTY_ACHIEVEMENTS.GUARD_DETAIL,
      PARTY_ACHIEVEMENTS.HUNTED_PREY,
      PARTY_ACHIEVEMENTS.HUNTING_THE_HUNTER,
      PARTY_ACHIEVEMENTS.NORTHERN_EXPEDITION,
      PARTY_ACHIEVEMENTS.OPPORTUNISTS,
      PARTY_ACHIEVEMENTS.SABOTEURS,
      PARTY_ACHIEVEMENTS.XANGROTHS_AID,
    ]
  ]
];

class PartyComponent extends GameComponent {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getStateFromGame(game) {
    return {
      partyAchievements: game.partyAchievements || {},
      name: game.name || "",
      partyLocation: game.partyLocation || "",
      reputation: game.reputation || 0,
      partyNotes: game.partyNotes || "",
    };
  }

  increaseReputation() {
    this.setStateAndUpdateGame((state) => {
      return {reputation: Math.min(20, state.reputation + 1)};
    });
  }

  decreaseReputation() {
    this.setStateAndUpdateGame((state) => {
      return {reputation: Math.max(-20, state.reputation - 1)};
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setStateAndUpdateGame({
      [name]: value
    });
  }

  toggleAchievement(achievement) {
    this.setStateAndUpdateGame((state) => {
      let partyAchievementsCopy = Object.assign({}, state.partyAchievements);

      if (partyAchievementsCopy[achievement] === "true") {
        partyAchievementsCopy[achievement] = "lost";
      }
      else if (partyAchievementsCopy[achievement] === "lost") {
        partyAchievementsCopy[achievement] = null;
      }
      else {
        partyAchievementsCopy[achievement] = "true"
      }
      return {
        partyAchievements: partyAchievementsCopy
      };
    });
  }

  render() {
    let shopPriceModifier = 0;

    if (this.state.reputation >= 19) {
      shopPriceModifier = -5;
    }
    else if (this.state.reputation >= 15) {
      shopPriceModifier = -4;
    }
    else if (this.state.reputation >= 11) {
      shopPriceModifier = -3;
    }
    else if (this.state.reputation >= 7) {
      shopPriceModifier = -2;
    }
    else if (this.state.reputation >= 3) {
      shopPriceModifier = -1;
    }
    else if (this.state.reputation >= -2) {
      shopPriceModifier = 0;
    }
    else if (this.state.reputation >= -6) {
      shopPriceModifier = 1;
    }
    else if (this.state.reputation >= -10) {
      shopPriceModifier = 2;
    }
    else if (this.state.reputation >= -14) {
      shopPriceModifier = 3;
    }
    else if (this.state.reputation >= -18) {
      shopPriceModifier = 4;
    }
    else if (this.state.reputation >= -20) {
      shopPriceModifier = 5;
    }
    else {
      shopPriceModifier = 0;
    }

    let achievementHtml = [];
    for (let [expIndex, [title, expAchievements]] of possiblePartyAchievements.entries()) {
      let achievementColumns = [];
      for (let i=0; i<expAchievements.length; i++) {
        let achievement = expAchievements[i];

        let buttonStyle = "";
        if (this.state.partyAchievements) {
          if (this.state.partyAchievements[achievement] === "true") {
            buttonStyle = "btn-scoundrel";
          }
          else if (this.state.partyAchievements[achievement] === "lost") {
            buttonStyle = "btn-lightning";
          }
        }

        achievementColumns.push(<Col xs={12} md={6} lg={4} key={i}><Button className={buttonStyle} block onClick={() => this.toggleAchievement(achievement)}>{achievement}</Button></Col>)
      }
      achievementHtml.push(
        <Row className="achievements-container" key={expIndex}>
          <Col lg={12}><h2>{title}</h2></Col>
          {achievementColumns}
        </Row>);
    }

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <Form>
                <FormGroup controlId="partyName">
                  <ControlLabel>Party Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Mercenaries need a catchy name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId="partyLocation">
                  <ControlLabel>Current Location</ControlLabel>
                  <FormControl
                    type="text"
                    name="partyLocation"
                    value={this.state.partyLocation}
                    placeholder="Where are your intrepid adventurers?"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col xs={12} md={8}>
              <Well bsSize="large" className="reputation-well">
                <Row>
                  <Col xs={4} md={4}>
                    <Button className="btn-scoundrel" block onClick={()=>this.increaseReputation()}><Glyphicon glyph="plus" /></Button>
                    <Button className="btn-lightning" block onClick={()=>this.decreaseReputation()}><Glyphicon glyph="minus" /></Button>
                  </Col>
                  <Col xs={4} md={4} className="text-center">
                    <Row>
                      <Col xs={12} md={12}>
                        <span className="reputation-header">Reputation</span>
                      </Col>
                      <Col xs={12} md={12} className="reputation-label">
                        <Label className="label-brute">{this.state.reputation || 0}</Label>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={4} md={4} className="text-center">
                    <Row>
                      <Col xs={12} md={12}>
                        <span className="reputation-header">Shop Price Modifier</span>
                      </Col>
                      <Col xs={12} md={12} className="reputation-label">
                        <Label className="label-brute">{shopPriceModifier}</Label>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Well>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <ControlLabel>Party Achievements</ControlLabel>
            </Col>
          </Row>
          <Row className="party-achievements-key">
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-scoundrel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement Unlocked
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement Locked
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-lightning">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement Lost
            </Col>
          </Row>
          {achievementHtml}
          <Row>
            <Col xs={12} md={12}>
              <Form>
                <FormGroup controlId="partyNotes">
                  <ControlLabel>Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="partyNotes"
                    value={this.state.partyNotes}
                    onChange={this.handleInputChange}
                    placeholder="Use this text area to enter any information that you would like to keep"
                    className="party-text-area"
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PartyComponent;
