import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import GameComponent from './GameComponent';
import {GLOBAL_ACHIEVEMENTS} from '../constants/Achievements';
import ExpansionConstants from '../constants/ExpansionConstants';

const possibleAchievements = [
  [ExpansionConstants.BASE, [
    [
      GLOBAL_ACHIEVEMENTS.ANCIENT_TECHNOLOGY_1,
      GLOBAL_ACHIEVEMENTS.ANCIENT_TECHNOLOGY_2,
      GLOBAL_ACHIEVEMENTS.ANCIENT_TECHNOLOGY_3,
      GLOBAL_ACHIEVEMENTS.ANCIENT_TECHNOLOGY_4,
      GLOBAL_ACHIEVEMENTS.ANCIENT_TECHNOLOGY_5
    ],
    [
      GLOBAL_ACHIEVEMENTS.ARTIFACT_RECOVERED,
      GLOBAL_ACHIEVEMENTS.ARTIFACT_LOST,
      GLOBAL_ACHIEVEMENTS.ARTIFACT_CLEANSED,
    ],
    [
      GLOBAL_ACHIEVEMENTS.CITY_RULE_MILITARISTIC,
      GLOBAL_ACHIEVEMENTS.CITY_RULE_ECONOMIC,
      GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC,
    ],
    [
      GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_1,
      GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_2,
      GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_3,
    ],
    [
      GLOBAL_ACHIEVEMENTS.THE_DRAKE_SLAIN,
      GLOBAL_ACHIEVEMENTS.THE_DRAKE_AIDED,
    ],
    [
      GLOBAL_ACHIEVEMENTS.THE_VOICE_SILENCED,
      GLOBAL_ACHIEVEMENTS.THE_VOICE_FREED,
    ],
    [
      GLOBAL_ACHIEVEMENTS.ANNIHILATION_OF_THE_ORDER,
      GLOBAL_ACHIEVEMENTS.END_OF_THE_INVASION,
      GLOBAL_ACHIEVEMENTS.END_OF_GLOOM,
      GLOBAL_ACHIEVEMENTS.THE_DEAD_INVADE,
      GLOBAL_ACHIEVEMENTS.THE_EDGE_OF_DARKNESS,
      GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES,
      GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT,
      GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED,
      GLOBAL_ACHIEVEMENTS.WATER_BREATHING,
    ]
  ]],
  [ExpansionConstants.FORGOTTEN_CIRCLES, [
    [
      GLOBAL_ACHIEVEMENTS.THROUGH_THE_PORTAL,
      GLOBAL_ACHIEVEMENTS.SEVERED_TIES,
    ],
    [
      GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1,
      GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2,
      GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_3,
      GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_4,
    ],
    [
      GLOBAL_ACHIEVEMENTS.PERIL_ADVERTED_1,
      GLOBAL_ACHIEVEMENTS.PERIL_ADVERTED_2,
      GLOBAL_ACHIEVEMENTS.PERIL_ADVERTED_3,
      GLOBAL_ACHIEVEMENTS.PERIL_ADVERTED_4,
    ],
    [
      GLOBAL_ACHIEVEMENTS.PIECES_OF_AN_ARTIFACT_1,
      GLOBAL_ACHIEVEMENTS.PIECES_OF_AN_ARTIFACT_2,
      GLOBAL_ACHIEVEMENTS.PIECES_OF_AN_ARTIFACT_3,
      GLOBAL_ACHIEVEMENTS.MECHANICAL_SPLENDOR,
    ]
  ]]
];

class AchievementsComponent extends GameComponent {
  getStateFromGame(game) {
    return {
      globalAchievements: game.globalAchievements || {},
    };
  }

  toggleAchievement(achievement) {
    this.setStateAndUpdateGame((state) => {
      let globalAchievementsCopy = Object.assign({}, state.globalAchievements);

      if (globalAchievementsCopy[achievement]) {
        globalAchievementsCopy[achievement] = null;
      }
      else {
        // only one artifact achievement allowed
        if (achievement.startsWith("Artifact")) {
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.ARTIFACT_RECOVERED] = null;
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.ARTIFACT_CLEANSED] = null;
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.ARTIFACT_LOST] = null;
        }

        if (achievement.startsWith("The Drake")) {
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.THE_DRAKE_AIDED] = null;
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.THE_DRAKE_SLAIN] = null;
        }

        if (achievement.startsWith("City Rule")) {
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC] = null;
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.CITY_RULE_ECONOMIC] = null;
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.CITY_RULE_MILITARISTIC] = null;
        }

        if (achievement.startsWith("The Voice")) {
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.THE_VOICE_FREED] = null;
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.THE_VOICE_SILENCED] = null;
        }

        if (achievement.startsWith("The Demon Dethroned")) {
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.THE_RIFT_CLOSED] = null;
        }
        else if (achievement.startsWith("The Rift Closed")) {
          globalAchievementsCopy[GLOBAL_ACHIEVEMENTS.THE_DEMON_DETHRONED] = null;
        }

        globalAchievementsCopy[achievement] = "true"
      }

      return {
        globalAchievements: globalAchievementsCopy
      }
    });
  }

  render() {
    let achievementHtml = [];

    for (let [expIndex, [title, expAchievements]] of possibleAchievements.entries()) {
      achievementHtml.push(<h2 key={expIndex}>{title}</h2>);

      for (let i=0; i<expAchievements.length; i++) {
        let achievementButtons = [];

        for (let j=0; j<expAchievements[i].length; j++) {

          let achievement = expAchievements[i][j];
          let buttonStyle = "";

          if (this.state.globalAchievements && this.state.globalAchievements[achievement]) {
            buttonStyle = "btn-scoundrel";
          }

          achievementButtons.push(<Col xs={12} md={6} lg={4} key={j}><Button className={buttonStyle} block onClick={()=>this.toggleAchievement(achievement)}>{achievement}</Button></Col>)
        }

        let divider = null;
        if (i < expAchievements.length - 1) {
          divider = <hr />
        }

        achievementHtml.push(
          <div key={expIndex+'-'+i}>
            <Row>{achievementButtons}</Row>
            {divider}
          </div>
        );
      }
    }

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <p>Here you can track your campaign's <strong>global achievements</strong> by selecting the buttons below.</p>
              <p>You can toggle them from complete to incomplete. Some achievements are connected to each other and will automatically be lost when you mark another as complete.</p>
            </Col>
          </Row>
          <Row className="global-achievement-key">
            <Col xs={12} md={6} className="text-center">
              <Button className="btn-scoundrel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement complete
            </Col>
            <Col xs={12} md={6} className="text-center">
              <Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement incomplete (or lost)
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="achievements-container">
              <Row>
                {achievementHtml}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AchievementsComponent;
