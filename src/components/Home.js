import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const versionHistory = [
  {
    versionNumber: "1.8",
    items: [
      "added content (scenarios, treasures, monsters) from Jaws of the Lion",
      "fixed startup problem if there is no saved game",
      "monster health tracker updates: campaign names and boss immunities",
      "minor code cleanup",
    ],
    date: "2020/10/18"
  },
  {
    versionNumber: "1.7",
    items: [
      "added missing achievement and scenario requirement from Base game",
      "added content (scenarios, treasures, achievements, monsters) from Forgotten Circles expansion",
      "fixed bug with prosperity changes not being saved",
      "refactored components, cleaned files structure",
      "added class icons to Solo scenarios",
    ],
    date: "2019/09/09"
  },
  {
    versionNumber: "1.6",
    items: [
      "local browser storage - your game will automatically return to the previous point when used in the same web browser",
    ],
    date: "2017/10/25"
  },
  {
    versionNumber: "1.5",
    items: [
      "many more monster health tracker updates, implementing new ways to apply and remove status tokens",
      "fixed some menu issues by consolidating top level items"
    ],
    date: "2017/07/11"
  },
  {
    versionNumber: "1.4",
    items: [
      "implemented new Dropbox load and save functionality",
    ],
    date: "2017/07/07"
  },
  {
    versionNumber: "1.3",
    items: [
      "added solo scenarios",
      "monster status tokens can now be tracked in the monster health tracker",
      "updated scenario select for monster health tracker to chooser instead of number input",
      "added ability to select individual monster types for monster health tracker",
      "can now designate monsters as summons/spawns for tracking loot drops",
      "better monster sorting on monster health tracker"
    ],
    date: "2017/07/07"
  },
  {
    versionNumber: "1.2",
    items: [
      "added Kickstarter scenarios",
      "added Kickstarter scenario treasures",
      "Google Analytics implemented"
    ],
    date: "2017/06/29"
  },
  {
    versionNumber: "1.1",
    items: [
      "added sanctuary donations tracker"
    ],
    date: "2017/06/10"
  },
  { 
    versionNumber: "1.0",
    items: [
      "the app has launched!",
      "various helper text added to guide users"
    ],
    date: "2017/04/26"
  },
  { 
    versionNumber: "0.9",
    items: [
      "basic features added",
      "version tracking enabled"
    ],
    date: "2017/04/23"
  },
];

class HomeComponent extends Component {

  makeVersionHistory(version) {
    let listItems = version.items.map((item, index) =>
      <li key={index}>{item}</li>
    );

    return (
      <div key={version.versionNumber}>
        <p><em>{version.date}</em> - Version: {version.versionNumber}</p>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  render() {
    let appHistory = versionHistory.map((version) =>
      this.makeVersionHistory(version)
    );

    return (
      <div className="container">
        <Grid className="home-container">
          <Row className="hidden-xs">
            <Col xs={12} md={12}>
              <div className="well">
                <p className="lead">Welcome to <strong><em>The Arcane Library</em></strong>, a companion app and set of utilities for the board game <strong>Gloomhaven</strong>. We hope you enjoy your stay!</p>
                <p><strong><em>The Arcane Library</em></strong> can track a variety of information about your Gloomhaven campaign, and also provides some <strong>standalone utilities</strong> that will work even when you're not tracking campaign progress.</p>
                <p>The <strong>Save</strong> and <strong>Load</strong> buttons at the top of the page allow you to save your progress in Gloomhaven to a file in your <strong>Dropbox</strong> account. The <strong>Import</strong> and <strong>Export</strong> buttons allow you to save your progress to a text file on your computer. Be sure to save often!</p>
                <p>If you need any help with the application, have any suggestions or requests, or have experienced any unexpected behaviour, please feel free to <strong><a href="https://boardgamegeek.com/user/FoxWithTwoTales">send me a message</a></strong> on BoardGameGeek.</p>
              </div>
            </Col>
          </Row>
          <Row className="visible-xs">
            <Col xs={12} md={12}>
              <div className="well">
                <p className="lead">Welcome to <strong><em>The Arcane Library</em></strong>, a companion app and set of utilities for the board game <strong>Gloomhaven</strong>. We hope you enjoy your stay!</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>Standalone Utilities <small className="hidden-xs">Direct links to useful pages</small></h3>
            </Col>
            <Col xs={12} md={6}>
              <Button href="/utilities/enhancementCalculator" bsSize="large" block className="btn-brute">Enhancement Calculator</Button>
            </Col>
            <Col xs={12} md={6}>
              <Button href="/utilities/scenarioLevel" bsSize="large" block className="btn-doomstalker">Scenario Level Calculator</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>Upcoming Features <small className="hidden-xs">What we're working on next...</small></h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <p>You can view the GitHub repository's list of bugs and new features here: <a href="https://github.com/zlorf/gloomhaven-thearcanelibrary/issues">Issues</a>. Feel free to comment or make requests.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>About this App <small className="hidden-xs">Who, what, where, why</small></h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <p>This app was originally made by John Tonkin, a software developer from Adelaide, Australia.</p>
              <ul>
                <li><a href="https://boardgamegeek.com/user/FoxWithTwoTales">BoardGameGeek profile</a></li>
                <li><a href="https://github.com/ninjawithkillmoon">GitHub profile</a></li>
                <li><a href="mailto:john.william.tonkin+thearcanelibrary@gmail.com">Email</a></li>
              </ul>
              <p>When Forgotten Circles expansion was released, Jacek Tomaszewski took over and added new content, refactoring and polishing things a bit on the way. It was version 1.7.</p>
              <ul>
                <li><a href="https://github.com/zlorf">GitHub profile</a></li>
              </ul>
              <p>The code is available open source on <a href="https://github.com/zlorf/gloomhaven-thearcanelibrary">GitHub</a>. It is built using the front-end JavaScript framework <a href="https://facebook.github.io/react/">React</a>.</p>
              <p>There is a Slack channel for development discussion. Message me for an invite if you would like to be involved.</p>
              <p>Feel free to contact me (via GitHub) regarding the app: bugs reports, feature requests, comments or offers of assistance all appreciated.</p>
              <p>None of this would be possible without the wonderful creation that is <strong><a href="https://boardgamegeek.com/boardgame/174430/gloomhaven">Gloomhaven</a></strong>, a board game by <strong><a href="https://boardgamegeek.com/boardgamedesigner/69802/isaac-childres">Isaac Childres</a></strong> at <strong><a href="http://www.cephalofair.com/">Cephalofair Games</a></strong>.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>App History <small className="hidden-xs">See what has changed here</small></h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              {appHistory}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default HomeComponent;
