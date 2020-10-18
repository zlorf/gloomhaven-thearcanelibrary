import _ from 'underscore';
import ExpansionConstants from './ExpansionConstants';
import {GLOBAL_ACHIEVEMENTS} from './Achievements';
import {PARTY_ACHIEVEMENTS} from './Party';

const KICKSTARTER_PREFIX = 801;
const SOLO_PREFIX = 901;

const FC_START = 96;
const FC_END = 115;
const FC_CHALLENGE = 701;

// Monster decks taken from
// https://raw.githubusercontent.com/GinoGalotti/gloomycompanion/monster-stats/scenarios.js
// Updated for Forgotten Circles by Zlorf

const base_scenarios = [
  {}, // dummy scenario 0, just to make indexing by scenario number easier - eg. scenarios[1] refers to scenario number 1
  // 1-95 Base campaign
  {
    title: "Black Barrow",
    treasures: [7],
    monsters:
        [   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Living Bones"}
        ]
  },
  {
    title: "Barrow Lair",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.FIRST_STEPS],
    treasures: [67],
    monsters:
        [   {"name": "Bandit Archer"}
        ,   {"name": "Bandit Commander"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ]
  },
  {
    title: "Inox Encampment",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    treasures: [65],
    monsters:
        [   {"name": "Inox Guard"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Inox Shaman"}
        ]
  },
  {
    title: "Crypt of the Damned",
    treasures: [38, 46],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Cultist"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    // 5
    title: "Ruinous Crypt",
    treasures: [4, 28],
    monsters:
        [   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Frost Demon"}
        ]
  },
  {
    title: "Decaying Crypt",
    treasures: [50],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Vibrant Grotto",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT, GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    monsters:
        [   {"name": "Forest Imp"}
        ,   {"name": "Cave Bear"}
        ,   {"name": "Inox Shaman"}
        ,   {"name": "Earth Demon"}
        ]
  },
  {
    title: "Gloomhaven Warehouse",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_DEAD_INVADE],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.JEKSERAHS_PLANS],
    treasures: [51],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Inox Bodyguard"}
        ]
  },
  {
    title: "Diamond Mine",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Merciless Overseer"}
        ]
  },
  {
    // 10
    title: "Plane of Elemental Power",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    treasures: [11],
    monsters:
        [   {"name": "Flame Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Sun Demon"}
        ]
  },
  {
    title: "Gloomhaven Square A",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.END_OF_THE_INVASION],
    treasures: [5],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Captain of the Guard"}
        ]
  },
  {
    title: "Gloomhaven Square B",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.END_OF_THE_INVASION],
    treasures: [34],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Cultist"}
        ,   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Jekserah"}
        ]
  },
  {
    title: "Temple of the Seer",
    treasures: [10],
    monsters:
        [   {"name": "Stone Golem"}
        ,   {"name": "Cave Bear"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Spitting Drake"}
        ]
  },
  {
    title: "Frozen Hollow",
    treasures: [26],
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Frost Demon"}
        ]
  },
  {
    // 15
    title: "Shrine of Strength",
    monsters:
        [   {"name": "Stone Golem"}
        ,   {"name": "Savvas Icestorm"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Harrower Infester"}
        ]
  },
  {
    title: "Mountain Pass",
    treasures: [1],
    monsters:
        [   {"name": "Earth Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Inox Guard"}
        ,   {"name": "Inox Archer"}
        ]
  },
  {
    title: "Lost Island",
    treasures: [71],
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Cave Bear"}
        ]
  },
  {
    title: "Abandoned Sewers",
    treasures: [63],
    monsters:
        [   {"name": "Giant Viper"}
        ,   {"name": "Ooze"}
        ,   {"name": "Vermling Scout"}
        ]
  },
  {
    title: "Forgotten Crypt",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT],
    treasures: [17],
    monsters:
        [   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Living Corpse"}
        ]
  },
  {
    // 20
    title: "Necromancer's Sanctum",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    treasures: [60],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Cultist"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Jekserah"}
        ]
  },
  {
    title: "Infernal Throne",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    treasures: [15],
    monsters:
        [   {"name": "Sun Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Prime Demon"}
        ]
  },
  {
    // note this scenario requires special handling because the party needs EITHER ONE of these achievements as a prerequisite
    title: "Temple of the Elements",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND, PARTY_ACHIEVEMENTS.FOLLOWING_CLUES],
    onlyOneAchievementRequired: true,
    treasures: [21],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Cultist"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    title: "Deep Ruins",
    treasures: [39, 72],
    monsters:
        [   {"name": "Stone Golem"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Echo Chamber",
    treasures: [70],
    monsters:
        [   {"name": "Rending Drake"}
        ,   {"name": "Ooze"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    // 25
    title: "Icecrag Ascent",
    treasures: [58],
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Rending Drake"}
        ,   {"name": "Spitting Drake"}
        ]
  },
  {
    // note this scenario requires special handling because the party needs EITHER ONE of these achievements as a prerequisite
    title: "Ancient Cistern",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THROUGH_THE_RUINS],
    onlyOneAchievementRequired: true,
    treasures: [66],
    monsters:
        [   {"name": "Living Corpse"}
        ,   {"name": "Ooze"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    title: "Ruinous Rift",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.ARTIFACT_LOST],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.STONEBREAKERS_CENSER],
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Sun Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ]
  },
  {
    title: "Outer Ritual Chamber",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.DARK_BOUNTY],
    treasures: [32],
    monsters:
        [   {"name": "Living Corpse"}
        ,   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Sun Demon"}
        ]
  },
  {
    title: "Sanctuary of Gloom",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.AN_INVITATION],
    treasures: [41],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    // 30
    title: "Shrine of the Depths",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND],
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Lurker"}
        ,   {"name": "Deep Terror"}
        ]
  },
  {
    title: "Plane of Night",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT, GLOBAL_ACHIEVEMENTS.ARTIFACT_RECOVERED],
    treasures: [69],
    monsters:
        [   {"name": "Deep Terror"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    title: "Decrepit Wood",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND],
    monsters:
        [   {"name": "Harrower Infester"}
        ,   {"name": "Giant Viper"}
        ,   {"name": "Deep Terror"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    // note this scenario requires special handling because the party needs EITHER ONE of these achievements as a prerequisite
    title: "Savvas Armory",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND, PARTY_ACHIEVEMENTS.THE_DRAKES_COMMAND],
    onlyOneAchievementRequired: true,
    monsters:
        [   {"name": "Savvas Icestorm"}
        ,   {"name": "Savvas Lavaflow"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Earth Demon"}
        ]
  },
  {
    title: "Scorched Summit",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_DRAKE_AIDED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_DRAKES_COMMAND],
    treasures: [23],
    monsters:
        [   {"name": "Rending Drake"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Elder Drake"}
        ]
  },
  {
    // 35
    title: "Gloomhaven Battlements A",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND],
    treasures: [61],
    monsters:
        [   {"name": "Flame Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    title: "Gloomhaven Battlements B",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND],
    treasures: [2],
    monsters:
        [   {"name": "Flame Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "City Archer"}
        ,   {"name": "Prime Demon"}
        ]
  },
  {
    title: "Doom Trench",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    treasures: [49],
    monsters:
        [   {"name": "Lurker"}
        ,   {"name": "Deep Terror"}
        ,   {"name": "Harrower Infester"}
        ]
  },
  {
    title: "Slave Pens",
    treasures: [29],
    monsters:
        [   {"name": "Inox Guard"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Inox Shaman"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    title: "Treacherous Divide",
    treasures: [73],
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ]
  },
  {
    // 40
    title: "Ancient Defense Network",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND, PARTY_ACHIEVEMENTS.THE_VOICES_TREASURE],
    treasures: [47],
    monsters:
        [   {"name": "Living Corpse"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Cave Bear"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Forest Imp"}
        ]
  },
  {
    title: "Timeworn Tomb",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND],
    treasures: [24],
    monsters:
        [   {"name": "Ancient Artillery"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    title: "Realm of the Voice",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_VOICE_FREED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_SCEPTER_AND_THE_VOICE],
    treasures: [30, 55],
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Drake Nest",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT],
    treasures: [35],
    monsters:
        [   {"name": "Flame Demon"}
        ,   {"name": "Rending Drake"}
        ,   {"name": "Spitting Drake"}
        ]
  },
  {
    title: "Tribal Assault",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.REDTHORNS_AID],
    monsters:
        [   {"name": "Inox Guard"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Hound"}
        ,   {"name": "Inox Shaman"}
        ]
  },
  {
    // 45
    title: "Rebel Swamp",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC],
    treasures: [74],
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Hound"}
        ]
  },
  {
    title: "Nightmare Peak",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.ACROSS_THE_DIVIDE],
    treasures: [48],
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Savvas Icestorm"}
        ,   {"name": "Winged Horror"}
        ]
  },
  {
    title: "Lair of the Unseeing Eye",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THROUGH_THE_TRENCH],
    treasures: [57, 18],
    monsters:
        [   {"name": "Lurker"}
        ,   {"name": "Deep Terror"}
        ,   {"name": "Harrower Infester"}
        ,   {"name": "The Sightless Eye"}
        ]
  },
  {
    title: "Shadow Weald",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.REDTHORNS_AID],
    treasures: [64],
    monsters:
        [   {"name": "Forest Imp"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Harrower Infester"}
        ,   {"name": "Dark Rider"}
        ]
  },
  {
    title: "Rebel's Stand",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC],
    treasures: [44],
    monsters:
        [   {"name": "Giant Viper"}
        ,   {"name": "City Archer"}
        ,   {"name": "City Guard"}
        ,   {"name": "Ancient Artillery"}
        ]
  },
  {
    // 50
    title: "Ghost Fortress",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC],
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.ANNIHILATION_OF_THE_ORDER],
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Sun Demon"}
        ,   {"name": "Earth Demon"}
        ]
  },
  {
    title: "The Void",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_1, GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_2, GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_3],
    treasures: [56],
    monsters:
        [   {"name": "The Gloom"}
        ]
  },
  {
    title: "Noxious Cellar",
    monsters:
        [   {"name": "Spitting Drake"}
        ,   {"name": "Ooze"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Vermling Shaman"}
        ]
  },
  {
    title: "Crypt Basement",
    treasures: [31],
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Giant Viper"}
        ]
  },
  {
    title: "Palace of Ice",
    treasures: [25],
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Harrower Infester"}
        ]
  },
  {
    // 55
    title: "Foggy Thicket",
    monsters:
        [
          // TODO Show message that this is random, use deck tab instead
        ]
  },
  {
    title: "Bandit's Wood",
    treasures: [45],
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Rending Drake"}
        ,   {"name": "Bandit Guard"}
        ]
  },
  {
    title: "Investigation",
    treasures: [3, 22],
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Hound"}
        ]
  },
  {
    title: "Bloody Shack",
    monsters:
        [   {"name": "Earth Demon"}
        ,   {"name": "Harrower Infester"}
        ,   {"name": "Black Imp"}
        ,   {"name": "City Guard"}
        ]
  },
  {
    title: "Forgotten Grove",
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Hound"}
        ,   {"name": "Forest Imp"}
        ]
  },
  {
    // 60
    title: "Alchemy Lab",
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Giant Viper"}
        ,   {"name": "Hound"}
        ,   {"name": "Rending Drake"}
        ,   {"name": "Spitting Drake"}
        ]
  },
  {
    title: "Fading Lighthouse",
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Giant Viper"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Flame Demon"}
        ]
  },
  {
    title: "Pit of Souls",
    treasures: [59],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Magma Pit",
    treasures: [12],
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Inox Guard"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Flame Demon"}
        ]
  },
  {
    title: "Underwater Lagoon",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    treasures: [9],
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Forest Imp"}
        ,   {"name": "Rending Drake"}
        ]
  },
  {
    // 65
    title: "Sulfur Mine",
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Hound"}
        ,   {"name": "Inox Shaman"}
        ]
  },
  {
    title: "Clockwork Cove",
    treasures: [16, 36],
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    title: "Arcane Library",
    treasures: [14],
    monsters:
        [   {"name": "Forest Imp"}
        ,   {"name": "Cave Bear"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    title: "Toxic Moor",
    treasures: [33],
    monsters:
        [   {"name": "Rending Drake"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Giant Viper"}
        ,   {"name": "Living Corpse"}
        ]
  },
  {
    title: "Well of the Unfortunate",
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Forest Imp"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    // 70
    title: "Chained Isle",
    treasures: [6],
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Windswept Highlands",
    monsters:
        [   {"name": "Spitting Drake"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Sun Demon"}
        ]
  },
  {
    title: "Oozing Grove",
    monsters:
        [   {"name": "Ooze"}
        ,   {"name": "Forest Imp"}
        ,   {"name": "Giant Viper"}
        ]
  },
  {
    title: "Rockslide Ridge",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "Inox Guard"}
        ,   {"name": "Inox Shaman"}
        ]
  },
  {
    title: "Merchant Ship",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.HIGH_SEA_ESCORT],
    treasures: [20],
    monsters:
        [   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Lurker"}
        ,   {"name": "Deep Terror"}
        ]
  },
  {
    // 75
    title: "Overgrown Graveyard",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.GRAVE_JOB],
    treasures: [53],
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Harrower Mine",
    treasures: [75],
    monsters:
        [   {"name": "Giant Viper"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Harrower Infester"}
        ]
  },
  {
    title: "Vault of Secrets",
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Hound"}
        ]
  },
  {
    title: "Sacrifice Pit",
    monsters:
        [   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    title: "Lost Temple",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.FISHS_AID],
    treasures: [52],
    monsters:
        [   {"name": "Stone Golem"}
        ,   {"name": "Giant Viper"}
        ,   {"name": "The Betrayer"}
        ]
  },
  {
    // 80
    title: "Vigil Keep",
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "Hound"}
        ]
  },
  {
    title: "Temple of the Eclipse",
    treasures: [68],
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Sun Demon"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "The Colorless"}
        ]
  },
  {
    title: "Burning Mountain",
    treasures: [62],
    monsters:
        [   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    title: "Shadows Within",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.BAD_BUSINESS],
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Flame Demon"}
        ]
  },
  {
    title: "Crystalline Cave",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.TREMORS],
    treasures: [42],
    monsters:
        [   {"name": "Flame Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Earth Demon"}
        ]
  },
  {
    // 85
    title: "Sun Temple",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Sun Demon"}
        ]
  },
  {
    title: "Harried Village",
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Lurker"}
        ]
  },
  {
    title: "Corrupted Cove",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_POISONS_SOURCE],
    treasures: [40],
    monsters:
        [   {"name": "Lurker"}
        ,   {"name": "Deep Terror"}
        ,   {"name": "Ooze"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    title: "Plane of Water",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.WATER_STAFF],
    treasures: [8, 37],
    monsters:
        [   {"name": "Frost Demon"}
        ,   {"name": "Ooze"}
        ,   {"name": "Lurker"}
        ]
  },
  {
    title: "Syndicate Hideout",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.SIN_RA],
    treasures: [13, 27, 43],
    monsters:
        [   {"name": "Bandit Archer"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Cultist"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Giant Viper"}
        ]
  },
  {
    // 90
    title: "Demonic Rift",
    treasures: [19],
    monsters:
        [   {"name": "Earth Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Wild Melee",
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Hound"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Back Alley Brawl",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.DEBT_COLLECTION],
    monsters:
        [   {"name": "Bandit Guard"}
        ,   {"name": "City Guard"}
        ,   {"name": "Inox Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "City Archer"}
        ,   {"name": "Savvas Icestorm"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    title: "Sunken Vessel",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_MAP_TO_TREASURE],
    treasures: [54],
    monsters:
        [   {"name": "Lurker"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Vermling Nest",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Cave Bear"}
        ]
  },
  {
    // 95
    title: "Payment Due",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THROUGH_THE_NEST],
    monsters:
        [   {"name": "Deep Terror"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Savvas Lavaflow"}
        ]
  },
  // 96 - 115 Forgotten Circles
  {
    title: "Unexpected Visitors",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.END_OF_GLOOM],
    treasures: [91],
    monsters:
        [   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    title: "Lore Untold",
    treasures: [97],
    monsters:
        [   {"name": "Black Imp"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Aesther Scout"}
        ,   {"name": "Deep Terror"}
        ]
  },
  {
    title: "Past in Flames",
    treasures: [79],
    monsters:
        [   {"name": "Ancient Artillery"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Spitting Drake"}
        ]
  },
  {
    title: "Aftershocks",
    treasures: [95],
    monsters:
        [   {"name": "Deep Terror"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Cultist"}
        ,   {"name": "Valrath Savage"}
        ]
  },
  {
    // 100
    title: "Shifting Gears",
    treasures: [76, 85],
    monsters:
        [   {"name": "Stone Golem"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Ancient Artillery"}
        ]
  },
  {
    title: "Shrouded Crypt",
    treasures: [93],
    monsters:
        [   {"name": "Rending Drake"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Night Demon"}
        ]
  },
  {
    title: "Bazaar of Knowledge",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [77, 86],
    monsters:
        [
          // No monsters in the senario!
        ]
  },
  {
    title: "Where It Is Needed",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [81],
    monsters:
        [
          // TODO Show message that this is random, use deck tab instead
        ]
  },
  {
    title: "A Gaping Wound",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [87],
    monsters:
        [   {"name": "Lurker"}
        ,   {"name": "Sun Demon"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Harrower Infester"}
        ]
  },
  {
    // 105
    title: "Monstrosities of a Cult",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    partyAchievementsRequiredIncomplete: [PARTY_ACHIEVEMENTS.HUNTING_THE_HUNTER],
    treasures: [83, 88],
    monsters:
        [   {"name": "Bandit Guard"}
        ,   {"name": "Valrath Tracker"}
        ,   {"name": "Cave Bear"}
        ,   {"name": "Hound"}
        ]
  },
  {
    title: "Intricate Work",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    monsters:
        [   {"name": "Aesther Ashblade"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "Savvas Icestorm"}
        ,   {"name": "Savvas Lavaflow"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Frost Demon"}
        ]
  },
  {
    title: "Mechanical Genius",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [78, 90],
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Prologue to the End",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    monsters:
        [   {"name": "City Archer"}
        ,   {"name": "City Guard"}
        ,   {"name": "Valrath Savage"}
        ,   {"name": "Valrath Tracker"}
        ,   {"name": "Human Commander"}
        ,   {"name": "Valrath Commander"}
        ]
  },
  {
    title: "Epilogue of a War",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [80, 94],
    monsters:
        [   {"name": "City Archer"}
        ,   {"name": "City Guard"}
        ,   {"name": "Valrath Savage"}
        ,   {"name": "Valrath Tracker"}
        ]
  },
  {
    // 110
    title: "A Circular Solution",
    treasures: [84],
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Savvas Lavaflow"}
        ,   {"name": "Valrath Tracker"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Ooze"}
        ,   {"name": "Lurker"}
        ]
  },
  {
    title: "The Shackles Loosen",
    treasures: [82, 92],
    monsters:
        [   {"name": "Aesther Ashblade"}
        ,   {"name": "Aesther Scout"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Night Demon"}
        ,   {"name": "Harrower Infester"}
        ,   {"name": "Vermling Shaman"}
        ]
  },
  {
    title: "The Bottom of It",
    monsters:
        [   {"name": "Ancient Artillery"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Living Bones"}
        ]
  },
  {
    title: "The Lost Thread",
    monsters:
        [   {"name": "Stone Golem"}
        ,   {"name": "Deep Terror"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Living Corpse"}
        ,   {"name": "Living Spirit"}
        ]
  },
  {
    title: "Ink Not Yet Dry",
    monsters:
        [   {"name": "Aesther Ashblade"}
        ,   {"name": "Aesther Scout"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    // 115
    title: "Future Uncertain",
    treasures: [96],
    monsters:
        [   {"name": "Aesther Ashblade"}
        ,   {"name": "Aesther Scout"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Valrath Savage"}
        ,   {"name": "Valrath Tracker"}
        ,   {"name": "Manifestation of Corruption"}
        ]
  },
];

const extra_scenarios = [
  {
    symbol: "Challenge",
    title: "Tower to the Stars",
    treasures: [89],
    monsters:
        [   {"name": "Ancient Artillery"}
        ,   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Hound"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Deep Terror"}
        ,   {"name": "Harrower Infester"}
        ,   {"name": "Forest Imp"}
        ,   {"name": "Wind Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Aesther Ashblade"}
        ,   {"name": "Savvas Lavaflow"}
        ,   {"name": "Savvas Icestorm"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Flame Demon"}
        ]
  }
];

const kickstarter_scenarios = [
  {
    symbol: "K1",
    title: "Just Another Night",
    monsters:
        [   {"name": "Bandit Archer"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Inox Guard"}
        ,   {"name": "Inox Shaman"}
        ]
  },
  {
    symbol: "K2",
    title: "A Quatryl Scorned",
    monsters:
        [   {"name": "Bandit Archer"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Ancient Artillery"}
        ]
  },
  {
    symbol: "K3",
    title: "Unreliable Medicine",
    monsters:
        [   {"name": "Giant Viper"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ]
  },
  {
    symbol: "K4",
    title: "Unlikely Allies",
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Giant Viper"}
        ]
  },
  {
    symbol: "K5",
    title: "The Sun Spire",
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Sun Demon"}
        ,   {"name": "Black Imp"}
        ,   {"name": "Vermling Shaman"}
        ]
  },
  {
    symbol: "K6",
    title: "A Ship in a Storm",
    monsters:
        [   {"name": "Wind Demon"}
        ,   {"name": "Lurker"}
        ,   {"name": "Frost Demon"}
        ]
  },
  {
    symbol: "K7",
    title: "Arrival in Chains",
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Rending Drake"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    symbol: "K8",
    title: "The Doctor's Lab",
    monsters:
        [   {"name": "Living Bones"}
        ,   {"name": "Ancient Artillery"}
        ,   {"name": "Ooze"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    symbol: "K9",
    title: "Skewed Perspective",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Cultist"}
        ,   {"name": "Living Spirit"}
        ,   {"name": "Living Bones"}
        ]
  },
  {
    symbol: "K10",
    title: "Panic Room",
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Deep Terror"}
        ]
  },
];

const solo_scenarios = [
  {
    symbol: "S1",
    title: "Return to the Black Barrow",
    icon: "classBrute",
    monsters:
        [   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Living Bones"}
        ]
  },
  {
    symbol: "S2",
    title: "An Unfortunate Intrusion",
    icon: "classTinkerer",
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ]
  },
  {
    symbol: "S3",
    title: "Corrupted Laboratory",
    icon: "classSpellweaver",
    monsters:
        [   {"name": "Black Imp"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Stone Golem"}
        ]
  },
  {
    symbol: "S4",
    title: "Armory Heist",
    icon: "classScoundrel",
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Ancient Artillery"}
        ]
  },
  {
    symbol: "S5",
    title: "Stone Defense",
    icon: "classCragheart",
    monsters:
        [   {"name": "Cave Bear"}
        ,   {"name": "Ooze"}
        ,   {"name": "Sun Demon"}
        ]
  },
  {
    symbol: "S6",
    title: "Rodent Liberation",
    icon: "classMindthief",
    monsters:
        [   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Earth Demon"}
        ]
  },
  {
    symbol: "S7",
    title: "Caravan Escort",
    icon: "classSun",
    monsters:
        [   {"name": "City Guard"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "Inox Guard"}
        ,   {"name": "Inox Archer"}
        ,   {"name": "Inox Shaman"}
        ,   {"name": "Vermling Scout"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Cave Bear"}
        ]
  },
  {
    symbol: "S8",
    title: "Unnatural Insults",
    icon: "classLightning",
    monsters:
        [   {"name": "Living Corpse"}
        ,   {"name": "Living Bones"}
        ,   {"name": "Cultist"}
        ,   {"name": "Inox Shaman"}
        ]
  },
  {
    symbol: "S9",
    title: "Storage Fees",
    icon: "class3Spears",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Bandit Guard"}
        ,   {"name": "Bandit Archer"}
        ]
  },
  {
    symbol: "S10",
    title: "Plane of the Wild Beasts",
    icon: "classCircles",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Spitting Drake"}
        ,   {"name": "Cave Bear"}
        ]
  },
  {
    symbol: "S11",
    title: "Harvesting the Night",
    icon: "classEclipse",
    monsters:
        [   {"name": "Night Demon"}
        ,   {"name": "Deep Terror"}
        ]
  },
  {
    symbol: "S12",
    title: "Plagued Crypt",
    icon: "classCthulhu",
    monsters:
        [   {"name": "Giant Viper"}
        ,   {"name": "Black Imp"}
        ]
  },
  {
    symbol: "S13",
    title: "Battle of the Bards",
    icon: "classMusic",
    monsters:
        [   {"name": "Bandit  Guard"}
        ,   {"name": "Bandit Archer"}
        ,   {"name": "City Guard"}
        ,   {"name": "City Archer"}
        ,   {"name": "Stone Golem"}
        ,   {"name": "Vermling Shaman"}
        ]
  },
  {
    symbol: "S14",
    title: "Corrupted Hunt",
    icon: "classAngryface",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Flame Demon"}
        ,   {"name": "Giant Viper"}
        ,   {"name": "Spitting Drake"}
        ]
  },
  {
    symbol: "S15",
    title: "Aftermath",
    icon: "classSaw",
    monsters:
        [   {"name": "City Guard"}
        ]
  },
  {
    symbol: "S16",
    title: "Elemental Secrets",
    icon: "classTriangles",
    monsters:
        [   {"name": "Flame Demon"}
        ,   {"name": "Earth Demon"}
        ,   {"name": "Frost Demon"}
        ,   {"name": "Wind Demon"}
        ]
  },
  {
    symbol: "S17",
    title: "The Caged Bear",
    icon: "classTwomini",
    monsters:
        [   {"name": "Hound"}
        ,   {"name": "Forest Imp"}
        ,   {"name": "Rending Drake"}
        ,   {"name": "Vermling Shaman"}
        ,   {"name": "Cave Bear"}
        ]
  },
  {
    symbol: "S18",
    title: "Forecast of the Inevitable",
    icon: "classEye",
    monsters:
        [   {"name": "Earth Demon"}
        ,   {"name": "Valrath Savage"}
        ]
  },
];

export const SCENARIOS = Object.assign({}, base_scenarios);
SCENARIOS[FC_CHALLENGE] = extra_scenarios[0];
for (const [i, scenario] of kickstarter_scenarios.entries()) {
  SCENARIOS[KICKSTARTER_PREFIX + i] = scenario;
}
for (const [i, scenario] of solo_scenarios.entries()) {
  SCENARIOS[SOLO_PREFIX + i] = scenario;
}

export const RANGES = [
  _.range(1, FC_START),
  _.range(FC_START, FC_END + 1).concat([FC_CHALLENGE]),
  _.range(SOLO_PREFIX, SOLO_PREFIX + solo_scenarios.length),
  _.range(KICKSTARTER_PREFIX, KICKSTARTER_PREFIX + kickstarter_scenarios.length),
];
export const RANGE_TITLES = [
  ExpansionConstants.BASE,
  ExpansionConstants.FORGOTTEN_CIRCLES,
  ExpansionConstants.SOLO,
  ExpansionConstants.KICKSTARTER,
];
