import {GLOBAL_ACHIEVEMENTS} from './Achievements';
import {PARTY_ACHIEVEMENTS} from './Party';

export const KICKSTARTER_PREFIX = 801;
export const SOLO_PREFIX = 901;

export const FC_START = 96;
export const FC_END = 115;
export const FC_CHALLENGE = 701;

const base_scenarios = [
  {}, // dummy scenario 0, just to make indexing by scenario number easier - eg. scenarios[1] refers to scenario number 1
  // 1-95 Base campaign
  {
    title: "Black Barrow",
    treasures: [7],
  },
  {
    title: "Barrow Lair",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.FIRST_STEPS],
    treasures: [67],
  },
  {
    title: "Inox Encampment",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    treasures: [65],
  },
  {
    title: "Crypt of the Damned",
    treasures: [38, 46],
  },
  {
    // 5
    title: "Ruinous Crypt",
    treasures: [4, 28],
  },
  {
    title: "Decaying Crypt",
    treasures: [50],
  },
  {
    title: "Vibrant Grotto",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT, GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
  },
  {
    title: "Gloomhaven Warehouse",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_DEAD_INVADE],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.JEKSERAHS_PLANS],
    treasures: [51],
  },
  {
    title: "Diamond Mine",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
  },
  {
    // 10
    title: "Plane of Elemental Power",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    treasures: [11],
  },
  {
    title: "Gloomhaven Square A",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.END_OF_THE_INVASION],
    treasures: [5],
  },
  {
    title: "Gloomhaven Square B",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.END_OF_THE_INVASION],
    treasures: [34],
  },
  {
    title: "Temple of the Seer",
    treasures: [10],
  },
  {
    title: "Frozen Hollow",
    treasures: [26],
  },
  {
    // 15
    title: "Shrine of Strength",
  },
  {
    title: "Mountain Pass",
    treasures: [1],
  },
  {
    title: "Lost Island",
    treasures: [71],
  },
  {
    title: "Abandoned Sewers",
    treasures: [63],
  },
  {
    title: "Forgotten Crypt",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT],
    treasures: [17],
  },
  {
    // 20
    title: "Necromancer's Sanctum",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    treasures: [60],
  },
  {
    title: "Infernal Throne",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    treasures: [15],
  },
  {
    // note this scenario requires special handling because the party needs EITHER ONE of these achievements as a prerequisite
    title: "Temple of the Elements",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND, PARTY_ACHIEVEMENTS.FOLLOWING_CLUES],
    onlyOneAchievementRequired: true,
    treasures: [21],
  },
  {
    title: "Deep Ruins",
    treasures: [39, 72],
  },
  {
    title: "Echo Chamber",
    treasures: [70],
  },
  {
    // 25
    title: "Icecrag Ascent",
    treasures: [58],
  },
  {
    // note this scenario requires special handling because the party needs EITHER ONE of these achievements as a prerequisite
    title: "Ancient Cistern",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THROUGH_THE_RUINS],
    onlyOneAchievementRequired: true,
    treasures: [66],
  },
  {
    title: "Ruinous Rift",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.ARTIFACT_LOST],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.STONEBREAKERS_CENSER],
  },
  {
    title: "Outer Ritual Chamber",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.DARK_BOUNTY],
    treasures: [32],
  },
  {
    title: "Sanctuary of Gloom",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.AN_INVITATION],
    treasures: [41],
  },
  {
    // 30
    title: "Shrine of the Depths",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND],
  },
  {
    title: "Plane of Night",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT, GLOBAL_ACHIEVEMENTS.ARTIFACT_RECOVERED],
    treasures: [69],
  },
  {
    title: "Decrepit Wood",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND],
  },
  {
    // note this scenario requires special handling because the party needs EITHER ONE of these achievements as a prerequisite
    title: "Savvas Armory",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND, PARTY_ACHIEVEMENTS.THE_DRAKES_COMMAND],
    onlyOneAchievementRequired: true,
  },
  {
    title: "Scorched Summit",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_DRAKE_AIDED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_DRAKES_COMMAND],
    treasures: [23],
  },
  {
    // 35
    title: "Gloomhaven Battlements A",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND],
    treasures: [61],
  },
  {
    title: "Gloomhaven Battlements B",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_RIFT_NEUTRALIZED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND],
    treasures: [2],
  },
  {
    title: "Doom Trench",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    treasures: [49],
  },
  {
    title: "Slave Pens",
    treasures: [29],
  },
  {
    title: "Treacherous Divide",
    treasures: [73],
  },
  {
    // 40
    title: "Ancient Defense Network",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND, PARTY_ACHIEVEMENTS.THE_VOICES_TREASURE],
    treasures: [47],
  },
  {
    title: "Timeworn Tomb",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND],
    treasures: [24],
  },
  {
    title: "Realm of the Voice",
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.THE_VOICE_FREED],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_SCEPTER_AND_THE_VOICE],
    treasures: [30, 55],
  },
  {
    title: "Drake Nest",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT],
    treasures: [35],
  },
  {
    title: "Tribal Assault",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.REDTHORNS_AID],
  },
  {
    // 45
    title: "Rebel Swamp",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC],
    treasures: [74],
  },
  {
    title: "Nightmare Peak",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.ACROSS_THE_DIVIDE],
    treasures: [48],
  },
  {
    title: "Lair of the Unseeing Eye",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THROUGH_THE_TRENCH],
    treasures: [57, 18],
  },
  {
    title: "Shadow Weald",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.REDTHORNS_AID],
    treasures: [64],
  },
  {
    title: "Rebel's Stand",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC],
    treasures: [44],
  },
  {
    // 50
    title: "Ghost Fortress",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.CITY_RULE_DEMONIC],
    globalAchievementsRequiredIncomplete: [GLOBAL_ACHIEVEMENTS.ANNIHILATION_OF_THE_ORDER],
  },
  {
    title: "The Void",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_1, GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_2, GLOBAL_ACHIEVEMENTS.END_OF_CORRUPTION_3],
    treasures: [56],
  },
  {
    title: "Noxious Cellar",
  },
  {
    title: "Crypt Basement",
    treasures: [31],
  },
  {
    title: "Palace of Ice",
    treasures: [25],
  },
  {
    // 55
    title: "Foggy Thicket",
  },
  {
    title: "Bandit's Wood",
    treasures: [45],
  },
  {
    title: "Investigation",
    treasures: [3, 22],
  },
  {
    title: "Bloody Shack",
  },
  {
    title: "Forgotten Grove",
  },
  {
    // 60
    title: "Alchemy Lab",
  },
  {
    title: "Fading Lighthouse",
  },
  {
    title: "Pit of Souls",
    treasures: [59],
  },
  {
    title: "Magma Pit",
    treasures: [12],
  },
  {
    title: "Underwater Lagoon",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    treasures: [9],
  },
  {
    // 65
    title: "Sulfur Mine",
  },
  {
    title: "Clockwork Cove",
    treasures: [16, 36],
  },
  {
    title: "Arcane Library",
    treasures: [14],
  },
  {
    title: "Toxic Moor",
    treasures: [33],
  },
  {
    title: "Well of the Unfortunate",
  },
  {
    // 70
    title: "Chained Isle",
    treasures: [6],
  },
  {
    title: "Windswept Highlands",
  },
  {
    title: "Oozing Grove",
  },
  {
    title: "Rockslide Ridge",
  },
  {
    title: "Merchant Ship",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.HIGH_SEA_ESCORT],
    treasures: [20],
  },
  {
    // 75
    title: "Overgrown Graveyard",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.GRAVE_JOB],
    treasures: [53],
  },
  {
    title: "Harrower Mine",
    treasures: [75],
  },
  {
    title: "Vault of Secrets",
  },
  {
    title: "Sacrifice Pit",
  },
  {
    title: "Lost Temple",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.FISHS_AID],
    treasures: [52],
  },
  {
    // 80
    title: "Vigil Keep",
  },
  {
    title: "Temple of the Eclipse",
    treasures: [68],
  },
  {
    title: "Burning Mountain",
    treasures: [62],
  },
  {
    title: "Shadows Within",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.BAD_BUSINESS],
  },
  {
    title: "Crystalline Cave",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.TREMORS],
    treasures: [42],
  },
  {
    // 85
    title: "Sun Temple",
  },
  {
    title: "Harried Village",
  },
  {
    title: "Corrupted Cove",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THE_POISONS_SOURCE],
    treasures: [40],
  },
  {
    title: "Plane of Water",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.WATER_BREATHING],
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.WATER_STAFF],
    treasures: [8, 37],
  },
  {
    title: "Syndicate Hideout",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.SIN_RA],
    treasures: [13, 27, 43],
  },
  {
    // 90
    title: "Demonic Rift",
    treasures: [19],
  },
  {
    title: "Wild Melee",
  },
  {
    title: "Back Alley Brawl",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.DEBT_COLLECTION],
  },
  {
    title: "Sunken Vessel",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.A_MAP_TO_TREASURE],
    treasures: [54],
  },
  {
    title: "Vermling Nest",
  },
  {
    // 95
    title: "Payment Due",
    partyAchievementsRequired: [PARTY_ACHIEVEMENTS.THROUGH_THE_NEST],
  },
  // 96 - 115 Forgotten Circles
  {
    title: "Unexpected Visitors",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.END_OF_GLOOM],
    treasures: [91],
  },
  {
    title: "Lore Untold",
    treasures: [97],
  },
  {
    title: "Past in Flames",
    treasures: [79],
  },
  {
    title: "Aftershocks",
    treasures: [95],
  },
  {
    // 100
    title: "Shifting Gears",
    treasures: [76, 85],
  },
  {
    title: "Shrouded Crypt",
    treasures: [93],
  },
  {
    title: "Bazaar of Knowledge",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [77, 86],
  },
  {
    title: "Where It Is Needed",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [81],
  },
  {
    title: "A Gaping Wound",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [87],
  },
  {
    // 105
    title: "Monstrosities of a Cult",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    partyAchievementsRequiredIncomplete: [PARTY_ACHIEVEMENTS.HUNTING_THE_HUNTER],
    treasures: [83, 88],
  },
  {
    title: "Intricate Work",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
  },
  {
    title: "Mechanical Genius",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [78, 90],
  },
  {
    title: "Prologue to the End",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
  },
  {
    title: "Epilogue of a War",
    globalAchievementsRequired: [GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_1, GLOBAL_ACHIEVEMENTS.KNOWLEDGE_IS_POWER_2],
    treasures: [80, 94],
  },
  {
    // 110
    title: "A Circular Solution",
    treasures: [84],
  },
  {
    title: "The Shackles Loosen",
    treasures: [82, 92],
  },
  {
    title: "The Bottom of It",
  },
  {
    title: "The Lost Thread",
  },
  {
    title: "Ink Not Yet Dry",
  },
  {
    // 115
    title: "Future Uncertain",
    treasures: [96],
  },
];

const extra_scenarios = [
  {
    symbol: "Challenge",
    title: "Tower to the Stars",
    treasures: [89],
  }
];

const kickstarter_scenarios = [
  {
    symbol: "K1",
    title: "Just Another Night",
  },
  {
    symbol: "K2",
    title: "A Quatryl Scorned",
  },
  {
    symbol: "K3",
    title: "Unreliable Medicine",
  },
  {
    symbol: "K4",
    title: "Unlikely Allies",
  },
  {
    symbol: "K5",
    title: "The Sun Spire",
  },
  {
    symbol: "K6",
    title: "A Ship in a Storm",
  },
  {
    symbol: "K7",
    title: "Arrival in Chains",
  },
  {
    symbol: "K8",
    title: "The Doctor's Lab",
  },
  {
    symbol: "K9",
    title: "Skewed Perspective",
  },
  {
    symbol: "K10",
    title: "Panic Room",
  },
];

const solo_scenarios = [
  {
    symbol: "S1",
    title: "Return to the Black Barrow",
    icon: "classBrute",
  },
  {
    symbol: "S2",
    title: "An Unfortunate Intrusion",
    icon: "classTinkerer",
  },
  {
    symbol: "S3",
    title: "Corrupted Laboratory",
    icon: "classSpellweaver",
  },
  {
    symbol: "S4",
    title: "Armory Heist",
    icon: "classScoundrel",
  },
  {
    symbol: "S5",
    title: "Stone Defense",
    icon: "classCragheart",
  },
  {
    symbol: "S6",
    title: "Rodent Liberation",
    icon: "classMindthief",
  },
  {
    symbol: "S7",
    title: "Caravan Escort",
    icon: "classSun",
  },
  {
    symbol: "S8",
    title: "Unnatural Insults",
    icon: "classLightning",
  },
  {
    symbol: "S9",
    title: "Storage Fees",
    icon: "class3Spears",
  },
  {
    symbol: "S10",
    title: "Plane of the Wild Beasts",
    icon: "classCircles",
  },
  {
    symbol: "S11",
    title: "Harvesting the Night",
    icon: "classEclipse",
  },
  {
    symbol: "S12",
    title: "Plagued Crypt",
    icon: "classCthulhu",
  },
  {
    symbol: "S13",
    title: "Battle of the Bards",
    icon: "classMusic",
  },
  {
    symbol: "S14",
    title: "Corrupted Hunt",
    icon: "classAngryface",
  },
  {
    symbol: "S15",
    title: "Aftermath",
    icon: "classSaw",
  },
  {
    symbol: "S16",
    title: "Elemental Secrets",
    icon: "classTriangles",
  },
  {
    symbol: "S17",
    title: "The Caged Bear",
    icon: "classTwomini",
  },
  {
    symbol: "S18",
    title: "Forecast of the Inevitable",
    icon: "classEye",
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
