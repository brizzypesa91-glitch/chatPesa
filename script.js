/* =========================================================
   LUGHAPAY - KISWAHILI CONVERSATION ENGINE
   Version 2.0

   - Hakuna API
   - Hakuna API key
   - Hakuna AI service
   - Pure JavaScript
   - Context-aware conversation
   - Kila chat partner ana personality yake
   - Kila partner ana opening tofauti
   - Bot anakumbuka jina/location/work/topic
   - Replies zinafuata mazungumzo
   ========================================================= */


/* =========================================================
   1. ACCOUNT / BALANCE
   ========================================================= */

let salio = parseInt(localStorage.getItem("user_salio")) || 0;
let totalWithdrawn =
  parseInt(localStorage.getItem("user_withdrawn")) || 0;


/* =========================================================
   2. CHAT VARIABLES
   ========================================================= */

let currentSelectedMzungu = null;

let currentDurationMinutes = 1;

let currentRewardAmount = 0;

let chatTimerInterval = null;

let secondsRemaining = 0;

let totalSeconds = 0;


/* =========================================================
   3. CHAT MEMORY
   ========================================================= */

let conversation = null;


/* =========================================================
   4. 30 CHAT PARTNERS
   ========================================================= */

const wazunguData = [

  {
    id: 1,
    name: "Henry",
    age: 25,
    country: "United Kingdom",
    flag: "🇬🇧",
    bio: "Anajifunza Kiswahili kwa ajili ya safari yake ya Zanzibar.",
    style: "friendly",
    interests: ["safari", "chakula", "Tanzania"],
    openings: [
      "Habari  Mimi ni Henry. Nimekuwa nikijifunza Kiswahili hivi karibuni. Siku yako imeanzaje?",
      "Hujambo! Mimi naitwa Henry. Nafurahi kupata mtu wa kuzungumza naye kwa Kiswahili  Unatokea wapi?",
      "Mambo!  Mimi ni Henry. Bado najifunza Kiswahili, kwa hiyo ningependa sana kuzungumza nawe."
    ]
  },

  {
    id: 2,
    name: "Sarah",
    age: 28,
    country: "United States",
    flag: "🇺🇸",
    bio: "Anapenda utamaduni, muziki na maisha ya Tanzania.",
    style: "social",
    interests: ["muziki", "utamaduni", "chakula"],
    openings: [
      "Mambo!  Mimi ni Sarah. Leo nimekuja kujifunza Kiswahili na kuongea kidogo. Unaendeleaje?",
      "Habari yako? Mimi ni Sarah  Niambie, siku yako iko vipi?",
      "Hey  Naitwa Sarah. Nimefurahi kuwa hapa. Wewe huwa unapenda kufanya nini ukiwa free?"
    ]
  },

  {
    id: 3,
    name: "Oliver",
    age: 31,
    country: "Canada",
    flag: "🇨🇦",
    bio: "Anataka kuboresha Kiswahili chake kupitia mazungumzo.",
    style: "curious",
    interests: ["lugha", "safari", "kazi"],
    openings: [
      "Hujambo  Mimi ni Oliver. Kiswahili changu bado hakijawa kizuri sana, lakini najitahidi. Unaendeleaje?",
      "Habari! Naitwa Oliver. Ningependa kujifunza Kiswahili kupitia mazungumzo ya kawaida. Unaitwa nani?",
      "Mambo  Mimi ni Oliver. Niambie kitu kimoja kuhusu wewe."
    ]
  },

  {
    id: 4,
    name: "Emma",
    age: 24,
    country: "Germany",
    flag: "🇩🇪",
    bio: "Anapenda Tanzania, nature na wildlife.",
    style: "nature",
    interests: ["nature", "wildlife", "safari"],
    openings: [
      "Habari  Mimi ni Emma. Nimekuwa nikisoma kuhusu Tanzania sana. Unaishi sehemu gani?",
      "Hujambo! Mimi naitwa Emma. Tanzania inanivutia sana. Leo unaendeleaje?",
      "Mambo!  Ningependa kujua zaidi kuhusu maisha ya Tanzania. Wewe unatokea wapi?"
    ]
  },

  {
    id: 5,
    name: "Lucas",
    age: 29,
    country: "France",
    flag: "🇫🇷",
    bio: "Anajifunza Kiswahili kwa ajili ya biashara na safari.",
    style: "business",
    interests: ["biashara", "safari", "kazi"],
    openings: [
      "Habari yako? Mimi ni Lucas  Nimeanza kujifunza Kiswahili kwa sababu napenda Tanzania. Unafanya kazi gani?",
      "Mambo! Naitwa Lucas. Ningependa kuzoea mazungumzo ya kawaida ya Kiswahili. Unaendeleaje?",
      "Hujambo  Mimi ni Lucas. Wewe ni mtu wa biashara au unasoma?"
    ]
  },

  {
    id: 6,
    name: "Sophia",
    age: 26,
    country: "Australia",
    flag: "🇦🇺",
    bio: "Anapenda Bongo Flava na utamaduni wa Tanzania.",
    style: "music",
    interests: ["muziki", "Bongo Flava", "utamaduni"],
    openings: [
      "Mambo! 🎵 Mimi ni Sophia. Nimekuwa nikisikiliza muziki wa Tanzania hivi karibuni. Wewe unapenda muziki?",
      "Habari  Naitwa Sophia. Leo ningependa tuzungumzie vitu vya kawaida. Unapenda kufanya nini?",
      "Hujambo! Mimi ni Sophia. Nimefurahi kukuona hapa  Siku yako imekuwaje?"
    ]
  },

  {
    id: 7,
    name: "Liam",
    age: 30,
    country: "Netherlands",
    flag: "🇳🇱",
    bio: "Anatamani kutembelea Arusha na kujifunza Kiswahili.",
    style: "travel",
    interests: ["Arusha", "safari", "technology"],
    openings: [
      "Hujambo! Mimi ni Liam  Nimekuwa nikijifunza Kiswahili kwa ajili ya safari yangu Tanzania. Unaishi wapi?",
      "Habari yako? Naitwa Liam. Ningependa sana kujua maisha ya kila siku Tanzania yakoje.",
      "Mambo!  Mimi ni Liam. Nimepanga kutembelea Tanzania siku moja. Leo unaendeleaje?"
    ]
  },

  {
    id: 8,
    name: "Ava",
    age: 23,
    country: "Sweden",
    flag: "🇸🇪",
    bio: "Anapenda kujifunza lugha mpya.",
    style: "language",
    interests: ["lugha", "shule", "muziki"],
    openings: [
      "Habari  Mimi ni Ava. Napenda sana kujifunza lugha mpya. Kiswahili ni lugha yangu mpya sasa!",
      "Hujambo! Naitwa Ava. Unaweza kunifundisha neno moja la Kiswahili leo? ",
      "Mambo! Mimi ni Ava  Wewe ulianza kujifunza mambo gani mapya hivi karibuni?"
    ]
  },

  {
    id: 9,
    name: "Noah",
    age: 27,
    country: "Norway",
    flag: "🇳🇴",
    bio: "Anafanya kazi ya kujitolea Tanzania.",
    style: "helpful",
    interests: ["kazi", "community", "Tanzania"],
    openings: [
      "Habari! Mimi ni Noah  Nafanya kazi ya kujitolea na ninajifunza Kiswahili. Unaishi wapi?",
      "Hujambo. Naitwa Noah. Ningependa kujifunza maneno ambayo watu hutumia kila siku.",
      "Mambo  Mimi ni Noah. Unaendeleaje leo?"
    ]
  },

  {
    id: 10,
    name: "Mia",
    age: 22,
    country: "Denmark",
    flag: "🇩🇰",
    bio: "Anapenda chakula na mazungumzo ya kawaida.",
    style: "food",
    interests: ["chakula", "kupika", "safari"],
    openings: [
      "Mambo!  Mimi ni Mia. Nina swali moja muhimu: unapenda chakula gani?",
      "Habari  Naitwa Mia. Nimekuwa nikisikia mengi kuhusu chakula cha Tanzania. Wewe unapenda kula nini?",
      "Hujambo! Mimi ni Mia. Leo nimekuja kwa mazungumzo mafupi ya Kiswahili."
    ]
  },

  {
    id: 11,
    name: "Ethan",
    age: 33,
    country: "Switzerland",
    flag: "🇨🇭",
    bio: "Anapanga kupanda Kilimanjaro.",
    style: "adventure",
    interests: ["Kilimanjaro", "safari", "sports"],
    openings: [
      "Habari  Mimi ni Ethan. Nimepanga kuja Tanzania kwa ajili ya Kilimanjaro. Unaishi wapi?",
      "Mambo! Naitwa Ethan. Mimi napenda sana adventure. Wewe unapenda kusafiri?",
      "Hujambo! Mimi ni Ethan. Unaendeleaje? Natumaini siku yako iko vizuri."
    ]
  },

  {
    id: 12,
    name: "Isabella",
    age: 27,
    country: "Italy",
    flag: "🇮🇹",
    bio: "Anataka kuwasiliana vizuri na marafiki wa Tanzania.",
    style: "friendly",
    interests: ["marafiki", "chakula", "lugha"],
    openings: [
      "Hujambo  Mimi ni Isabella. Nimefurahi kupata mtu wa kuongea naye. Unaitwa nani?",
      "Habari yako? Mimi naitwa Isabella. Leo unaendeleaje?",
      "Mambo  Ningependa kujifunza Kiswahili cha mazungumzo ya kawaida. Ukoje?"
    ]
  },

  {
    id: 13,
    name: "James",
    age: 35,
    country: "United States",
    flag: "🇺🇸",
    bio: "Anavutiwa na muundo wa lugha ya Kiswahili.",
    style: "academic",
    interests: ["lugha", "elimu", "historia"],
    openings: [
      "Habari. Mimi ni James. Ninavutiwa sana na lugha ya Kiswahili. Wewe umejifunza lugha gani nyingine?",
      "Hujambo  Naitwa James. Ningependa kuelewa zaidi kuhusu matumizi ya Kiswahili cha kila siku.",
      "Mambo! Mimi ni James. Unaendeleaje leo?"
    ]
  },

  {
    id: 14,
    name: "Charlotte",
    age: 26,
    country: "United Kingdom",
    flag: "🇬🇧",
    bio: "Anapenda misemo na nahau za Kiswahili.",
    style: "playful",
    interests: ["misemo", "lugha", "muziki"],
    openings: [
      "Mambo!  Mimi ni Charlotte. Nimekuwa nikijifunza misemo ya Kiswahili. Unajua msemo mzuri?",
      "Habari  Naitwa Charlotte. Leo unaendeleaje?",
      "Hujambo! Mimi ni Charlotte. Nataka tuongee kama marafiki wa kawaida."
    ]
  },

  {
    id: 15,
    name: "Benjamin",
    age: 32,
    country: "Canada",
    flag: "🇨🇦",
    bio: "Anataka kuzungumza Kiswahili kwa ufasaha.",
    style: "learner",
    interests: ["lugha", "kazi", "safari"],
    openings: [
      "Habari  Mimi ni Benjamin. Lengo langu ni kuweza kuzungumza Kiswahili vizuri. Unaishi wapi?",
      "Hujambo! Naitwa Benjamin. Unaweza kuongea Kiswahili vizuri?",
      "Mambo! Mimi ni Benjamin. Nimefurahi kuongea nawe leo."
    ]
  },

  {
    id: 16,
    name: "Amelia",
    age: 21,
    country: "New Zealand",
    flag: "🇳🇿",
    bio: "Anapenda safari na tamaduni za Afrika.",
    style: "culture",
    interests: ["utamaduni", "safari", "chakula"],
    openings: [
      "Habari  Mimi ni Amelia. Napenda sana kujifunza kuhusu tamaduni mbalimbali. Unaishi wapi?",
      "Mambo! Naitwa Amelia. Ni kitu gani unapenda zaidi kuhusu Tanzania?",
      "Hujambo  Siku yako imeanzaje?"
    ]
  },

  {
    id: 17,
    name: "Alexander",
    age: 34,
    country: "Belgium",
    flag: "🇧🇪",
    bio: "Anataka kujifunza mazungumzo ya kila siku.",
    style: "casual",
    interests: ["maisha", "kazi", "marafiki"],
    openings: [
      "Mambo! Mimi ni Alexander  Leo nataka tuongee kawaida tu. Unaendeleaje?",
      "Habari yako? Naitwa Alexander. Wewe ni mtu wa aina gani ukiwa na marafiki?",
      "Hujambo  Nimefurahi kuongea nawe. Uko salama?"
    ]
  },

  {
    id: 18,
    name: "Harper",
    age: 25,
    country: "Ireland",
    flag: "🇮🇪",
    bio: "Anapenda historia na maeneo ya pwani.",
    style: "history",
    interests: ["historia", "Zanzibar", "utamaduni"],
    openings: [
      "Habari  Mimi ni Harper. Zanzibar inanivutia sana. Umewahi kwenda huko?",
      "Mambo! Naitwa Harper. Ningependa kujua zaidi kuhusu Tanzania.",
      "Hujambo! Leo unaendeleaje?"
    ]
  },

  {
    id: 19,
    name: "Daniel",
    age: 28,
    country: "Spain",
    flag: "🇪🇸",
    bio: "Anajiandaa kwa ziara ya kikazi Tanzania.",
    style: "professional",
    interests: ["kazi", "biashara", "safari"],
    openings: [
      "Habari yako? Mimi ni Daniel. Najiandaa kuja Tanzania kwa kazi. Unafanya kazi gani?",
      "Hujambo  Naitwa Daniel. Ningependa kujifunza Kiswahili cha kutumia kazini.",
      "Mambo! Mimi ni Daniel. Unaendeleaje leo?"
    ]
  },

  {
    id: 20,
    name: "Evelyn",
    age: 29,
    country: "Finland",
    flag: "🇫🇮",
    bio: "Anasoma lugha na jamii.",
    style: "academic",
    interests: ["elimu", "lugha", "jamii"],
    openings: [
      "Habari  Mimi ni Evelyn. Napenda kujifunza kuhusu lugha na watu. Wewe unasoma au unafanya kazi?",
      "Hujambo! Naitwa Evelyn. Leo ningependa kusikia kuhusu maisha yako ya kawaida.",
      "Mambo  Unaendeleaje?"
    ]
  },

  {
    id: 21,
    name: "Matthew",
    age: 31,
    country: "Austria",
    flag: "🇦🇹",
    bio: "Anataka kuwasiliana vizuri na wenyeji.",
    style: "traveler",
    interests: ["safari", "Tanzania", "chakula"],
    openings: [
      "Hujambo! Mimi ni Matthew  Nataka kujifunza jinsi watu wanavyoongea Kiswahili kila siku.",
      "Habari yako? Naitwa Matthew. Unaishi mji gani?",
      "Mambo!  Siku yako imekuwaje?"
    ]
  },

  {
    id: 22,
    name: "Abigail",
    age: 24,
    country: "Portugal",
    flag: "🇵🇹",
    bio: "Anapenda kujifunza salamu na maneno mepesi.",
    style: "beginner",
    interests: ["lugha", "chakula", "marafiki"],
    openings: [
      "Habari  Mimi ni Abigail. Bado ni beginner kabisa kwenye Kiswahili  Unaendeleaje?",
      "Mambo! Naitwa Abigail. Unaweza kunisaidia kujifunza Kiswahili kidogo?",
      "Hujambo  Leo nataka kufanya mazoezi ya Kiswahili."
    ]
  },

  {
    id: 23,
    name: "Henry Jr",
    age: 27,
    country: "United Kingdom",
    flag: "🇬🇧",
    bio: "Anajifunza Kiswahili kwa ajili ya project.",
    style: "technology",
    interests: ["technology", "kazi", "elimu"],
    openings: [
      "Mambo! Mimi ni Henry Jr.  Nafanya project inayohusisha Tanzania. Wewe unafanya kazi gani?",
      "Habari! Naitwa Henry Jr. Ningependa kujua zaidi kuhusu kazi za vijana Tanzania.",
      "Hujambo  Unaendeleaje leo?"
    ]
  },

  {
    id: 24,
    name: "Emily",
    age: 30,
    country: "United States",
    flag: "🇺🇸",
    bio: "Anavutiwa na maisha ya Waswahili.",
    style: "culture",
    interests: ["utamaduni", "familia", "chakula"],
    openings: [
      "Habari  Mimi ni Emily. Ninapenda sana kujua jinsi maisha ya kila siku yalivyo Tanzania.",
      "Mambo! Naitwa Emily. Familia ni muhimu sana kwangu. Wewe unaishi na familia yako?",
      "Hujambo! Unaendeleaje?"
    ]
  },

  {
    id: 25,
    name: "Jackson",
    age: 26,
    country: "Australia",
    flag: "🇦🇺",
    bio: "Ni mwanamuziki anayejifunza Kiswahili.",
    style: "music",
    interests: ["muziki", "Bongo Flava", "creative"],
    openings: [
      "Mambo! 🎵 Mimi ni Jackson. Mimi ni mwanamuziki na napenda sana muziki wa Tanzania.",
      "Habari  Naitwa Jackson. Wewe unasikiliza muziki wa aina gani?",
      "Hujambo! Leo nataka kujua muziki unaoupenda."
    ]
  },

  {
    id: 26,
    name: "Ella",
    age: 23,
    country: "Germany",
    flag: "🇩🇪",
    bio: "Anajiandaa kwa safari ya kujitolea.",
    style: "volunteer",
    interests: ["community", "Tanzania", "travel"],
    openings: [
      "Habari  Mimi ni Ella. Najiandaa kuja Tanzania kwa kazi ya kujitolea. Unaishi wapi?",
      "Mambo! Naitwa Ella. Ningependa kujua zaidi kuhusu maisha ya kawaida Tanzania.",
      "Hujambo  Unaendeleaje leo?"
    ]
  },

  {
    id: 27,
    name: "Sebastian",
    age: 32,
    country: "Switzerland",
    flag: "🇨🇭",
    bio: "Anapenda jinsi Kiswahili kinavyosikika.",
    style: "language",
    interests: ["lugha", "muziki", "culture"],
    openings: [
      "Hujambo  Mimi ni Sebastian. Napenda sana jinsi Kiswahili kinavyosikika.",
      "Habari! Naitwa Sebastian. Unaitwa nani?",
      "Mambo  Leo unaendeleaje?"
    ]
  },

  {
    id: 28,
    name: "Aria",
    age: 25,
    country: "Norway",
    flag: "🇳🇴",
    bio: "Anataka kujua zaidi kuhusu Zanzibar.",
    style: "travel",
    interests: ["Zanzibar", "beach", "travel"],
    openings: [
      "Habari  Mimi ni Aria. Zanzibar ni sehemu ninayotamani sana kutembelea.",
      "Mambo! Naitwa Aria. Umewahi kwenda Zanzibar?",
      "Hujambo Unaishi wapi?"
    ]
  },

  {
    id: 29,
    name: "Jack",
    age: 29,
    country: "Canada",
    flag: "🇨🇦",
    bio: "Anajifunza maneno ya pongezi na shukrani.",
    style: "friendly",
    interests: ["marafiki", "lugha", "chakula"],
    openings: [
      "Mambo!  Mimi ni Jack. Nimefurahi sana kupata mtu wa kuongea naye.",
      "Habari yako? Naitwa Jack. Uko salama?",
      "Hujambo  Leo unaendeleaje?"
    ]
  },

  {
    id: 30,
    name: "Scarlett",
    age: 27,
    country: "France",
    flag: "🇫🇷",
    bio: "Anapanga kutembelea mbuga za wanyama Tanzania.",
    style: "wildlife",
    interests: ["wildlife", "safari", "nature"],
    openings: [
      "Habari  Mimi ni Scarlett. Nimekuwa nikitamani kutembelea mbuga za wanyama Tanzania.",
      "Mambo! Naitwa Scarlett. Wewe unapenda safari?",
      "Hujambo  Nimefurahi kuongea nawe leo."
    ]
  }

];


/* =========================================================
   5. NORMALIZE KISWAHILI
   ========================================================= */

function cleanText(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

}


/* =========================================================
   6. KEYWORD HELPER
   ========================================================= */

function containsAny(text, words) {

  return words.some(word => text.includes(word));

}


/* =========================================================
   7. CREATE NEW CONVERSATION
   ========================================================= */

function createConversation(partner) {

  return {

    partnerId: partner.id,

    userName: null,

    location: null,

    occupation: null,

    business: null,

    hobby: null,

    music: null,

    food: null,

    lastIntent: null,

    lastQuestion: null,

    topic: "opening",

    messageCount: 0,

    usedOpening: false,

    usedReplies: [],

    partner: partner

  };

}


/* =========================================================
   8. RESET CONVERSATION
   ========================================================= */

function resetConversation(partner) {

  conversation =
    createConversation(partner);

}


/* =========================================================
   9. DETECT INTENT
   ========================================================= */

function detectIntent(rawText) {

  const text = cleanText(rawText);


  /* NAME */

  if (
    containsAny(text, [
      "naitwa",
      "jina langu",
      "jina ni",
      "mimi ni"
    ])
  ) {

    return "name";

  }


  /* GREETING */

  if (
    containsAny(text, [
      "habari",
      "hujambo",
      "mambo",
      "mambo vipi",
      "shikamoo",
      "za leo",
      "hello",
      "hi",
      "hey"
    ])
  ) {

    return "greeting";

  }


  /* HOW ARE YOU */

  if (
    containsAny(text, [
      "unaendeleaje",
      "unaendelea vipi",
      "ukoje",
      "hali yako",
      "mambo yako",
      "vipi hali"
    ])
  ) {

    return "how_are_you";

  }


  /* GOOD */

  if (
    containsAny(text, [
      "niko vizuri",
      "nipo vizuri",
      "niko poa",
      "nipo poa",
      "niko salama",
      "nipo salama",
      "uko salama",
      "salama kabisa",
      "salama",
      "poa",
      "poa sana",
      "fresh",
      "freshi",
      "mzima",
      "niko mzima",
      "sijambo",
      "sijambo kabisa",
      "mambo safi",
      "safi kabisa"
    ])
  ) {

    return "good";

  }


  /* BAD */

  if (
    containsAny(text, [
      "siko vizuri",
      "sipo vizuri",
      "sijisikii vizuri",
      "nimechoka",
      "nina huzuni",
      "sina furaha",
      "nimekasirika"
    ])
  ) {

    return "bad";

  }


  /* LOCATION */

  if (
    containsAny(text, [
      "ninaishi",
      "naishi",
      "ninatoka",
      "natokea",
      "nipo arusha",
      "nipo dar",
      "nipo mwanza",
      "nipo dodoma",
      "nipo moshi",
      "nipo zanzibar",
      "nipo tanga",
      "nipo mbeya",
      "nipo tanzania"
    ])
  ) {

    return "location";

  }


  /* WORK */

  if (
    containsAny(text, [
      "nafanya kazi",
      "nipo kazini",
      "kazi yangu",
      "nafanya",
      "nimeajiriwa",
      "mimi ni developer",
      "mimi ni programmer",
      "mimi ni mwalimu",
      "mimi ni dereva",
      "mimi ni mwanafunzi"
    ])
  ) {

    return "work";

  }


  /* BUSINESS */

  if (
    containsAny(text, [
      "biashara",
      "nina biashara",
      "nafanya biashara",
      "ninauza",
      "nauza",
      "duka langu",
      "shop yangu",
      "mfanyabiashara"
    ])
  ) {

    return "business";

  }


  /* SCHOOL */

  if (
    containsAny(text, [
      "nasoma",
      "ninasoma",
      "mwanafunzi",
      "chuo",
      "shule",
      "kozi",
      "course",
      "masomo"
    ])
  ) {

    return "school";

  }


  /* FOOD */

  if (
    containsAny(text, [
      "chakula",
      "kula",
      "ugali",
      "wali",
      "pilau",
      "nyama",
      "samaki",
      "chipsi",
      "kupika"
    ])
  ) {

    return "food";

  }


  /* MUSIC */

  if (
    containsAny(text, [
      "muziki",
      "wimbo",
      "nyimbo",
      "bongo flava",
      "msanii",
      "kuimba"
    ])
  ) {

    return "music";

  }


  /* TRAVEL */

  if (
    containsAny(text, [
      "safari",
      "kusafiri",
      "nimesafiri",
      "kutembelea",
      "nitatembelea",
      "likizo",
      "zanzibar",
      "kilimanjaro"
    ])
  ) {

    return "travel";

  }


  /* HOBBY */

  if (
    containsAny(text, [
      "hobby",
      "burudani",
      "muda wa ziada",
      "wakati wa ziada",
      "napenda kufanya",
      "hufanya nini",
      "nifanye nini"
    ])
  ) {

    return "hobby";

  }


  /* FAMILY */

  if (
    containsAny(text, [
      "familia",
      "mama",
      "baba",
      "ndugu",
      "dada",
      "kaka",
      "watoto"
    ])
  ) {

    return "family";

  }


  /* THANKS */

  if (
    containsAny(text, [
      "asante",
      "nashukuru",
      "shukrani",
      "ahsante"
    ])
  ) {

    return "thanks";

  }


  /* GOODBYE */

  if (
    containsAny(text, [
      "kwaheri",
      "tutaonana",
      "baadaye",
      "bye",
      "naondoka"
    ])
  ) {

    return "goodbye";

  }


  /* RECIPROCAL */

  if (
    containsAny(text, [
      "wewe je",
      "na wewe",
      "vipi wewe"
    ])
  ) {

    return "reciprocal";

  }


  /* YES */

  if (
    [
      "ndio",
      "ndiyo",
      "naam",
      "sawa",
      "ok",
      "okay"
    ].includes(text)
  ) {

    return "yes";

  }


  /* NO */

  if (
    [
      "hapana",
      "sio",
      "si kweli"
    ].includes(text)
  ) {

    return "no";

  }


  return "general";

}


/* =========================================================
   10. EXTRACT NAME
   ========================================================= */

function extractName(text) {

  const match = text.match(
    /(?:naitwa|jina langu ni|jina ni|mimi ni)\s+([a-zA-ZÀ-ÿ]+)/
  );


  if (!match) {

    return null;

  }


  return (
    match[1].charAt(0).toUpperCase() +
    match[1].slice(1)
  );

}


/* =========================================================
   11. EXTRACT LOCATION
   ========================================================= */

function extractLocation(text) {

  const match = text.match(
    /(?:ninaishi|naishi|ninatoka|natokea)\s+(.+)/i
  );


  if (match) {

    return match[1].trim();

  }


  const cities = [
    "arusha",
    "dar es salaam",
    "dar",
    "mwanza",
    "dodoma",
    "moshi",
    "zanzibar",
    "tanga",
    "mbeya",
    "morogoro",
    "tabora",
    "ir inga"
  ];


  for (const city of cities) {

    if (
      cleanText(text).includes(city)
    ) {

      return city
        .replace(/\b\w/g, c => c.toUpperCase());

    }

  }


  return null;

}


/* =========================================================
   12. REMEMBER INFORMATION
   ========================================================= */

function rememberInformation(text, intent) {

  const name =
    extractName(text);


  if (
    name &&
    (
      conversation.lastQuestion === "name" ||
      intent === "name"
    )
  ) {

    conversation.userName =
      name;

  }


  const location =
    extractLocation(text);


  if (location) {

    conversation.location =
      location;

  }


  if (intent === "work") {

    conversation.occupation =
      text;

  }


  if (intent === "business") {

    conversation.business =
      text;

  }


  if (intent === "food") {

    conversation.food =
      text;

  }


  if (intent === "music") {

    conversation.music =
      text;

  }


  if (intent === "hobby") {

    conversation.hobby =
      text;

  }

}


/* =========================================================
   13. SHORT NAME RESPONSE
   ========================================================= */

function isPossibleNameAnswer(text) {

  const clean =
    cleanText(text);


  if (
    clean.split(" ").length === 1 &&
    /^[a-zA-ZÀ-ÿ]+$/.test(text.trim())
  ) {

    return true;

  }


  return false;

}


/* =========================================================
   14. CONTEXT RESPONSE ENGINE
   ========================================================= */

function generateReply(rawText) {

  const text =
    cleanText(rawText);


  let intent =
    detectIntent(rawText);


  /* -----------------------------------------
     NAME CONTEXT
     ----------------------------------------- */

  if (
    conversation.lastQuestion === "name" &&
    (
      intent === "general" ||
      isPossibleNameAnswer(rawText)
    )
  ) {

    const possibleName =
      extractName(rawText);


    if (possibleName) {

      conversation.userName =
        possibleName;

    }
    else if (
      isPossibleNameAnswer(rawText)
    ) {

      conversation.userName =
        rawText.trim()
          .charAt(0)
          .toUpperCase() +
        rawText.trim().slice(1);

    }


    conversation.lastQuestion =
      "location";


    conversation.topic =
      "getting_to_know";


    return choose([
      `Nafurahi kukufahamu${conversation.userName ? " " + conversation.userName : ""}  Unaishi wapi?`,
      `Nice kukufahamu${conversation.userName ? " " + conversation.userName : ""}  Unatokea mji gani?`,
      `Nimefurahi kukufahamu  Wewe unaishi sehemu gani?`
    ]);

  }


  /* -----------------------------------------
     LOCATION CONTEXT
     ----------------------------------------- */

  if (
    conversation.lastQuestion === "location" &&
    intent === "general"
  ) {

    const location =
      extractLocation(rawText);


    if (location) {

      conversation.location =
        location;

      intent =
        "location";

    }

  }


  /* -----------------------------------------
     GOOD MOOD
     ----------------------------------------- */

  if (intent === "good") {

    conversation.lastQuestion =
      "day";


    return choose([
      "Nimefurahi kusikia hivyo  Leo siku yako imekuwaje?",
      "Vizuri sana!  Umefanya nini leo?",
      "Safi kabisa  Leo umejishughulisha na nini?",
      "Nimefurahi uko salama. Leo mambo yako yameendaje?"
    ]);

  }


  /* -----------------------------------------
     GREETING
     ----------------------------------------- */

  if (intent === "greeting") {

    conversation.lastQuestion =
      "how_are_you";


    return choose([
      "Salama kabisa  Na wewe unaendeleaje?",
      "Poa kabisa!  Wewe ukoje?",
      "Niko vizuri, asante  Na upande wako ukoje?",
      "Nipo salama kabisa. Wewe unaendeleaje leo?"
    ]);

  }


  /* -----------------------------------------
     HOW ARE YOU
     ----------------------------------------- */

  if (intent === "how_are_you") {

    conversation.lastQuestion =
      "how_are_you";


    return choose([
      "Niko salama kabisa  Na wewe je?",
      "Mimi niko vizuri sana, asante. Wewe unaendeleaje?",
      "Niko poa kabisa  Leo nimefurahi kupata nafasi ya kuongea nawe."
    ]);

  }


  /* -----------------------------------------
     NAME
     ----------------------------------------- */

  if (intent === "name") {

    const name =
      extractName(rawText);


    if (name) {

      conversation.userName =
        name;

    }


    conversation.lastQuestion =
      "location";


    return choose([
      `Nafurahi kukufahamu${name ? " " + name : ""}  Unaishi wapi?`,
      `Nice kukufahamu${name ? " " + name : ""}! Unaishi mji gani?`,
      `Nimefurahi kukufahamu  Unatokea wapi?`
    ]);

  }


  /* -----------------------------------------
     LOCATION
     ----------------------------------------- */

  if (intent === "location") {

    const location =
      extractLocation(rawText);


    if (location) {

      conversation.location =
        location;

    }


    conversation.lastQuestion =
      "work";


    return choose([
      `Oooh, ${conversation.location || "huko"}  Unaifanya kazi gani?`,
      `Aah, nimekupata. ${conversation.location || "Huko"} kunaonekana pazuri. Unafanya kazi au unasoma?`,
      `Nice!  Wewe ni mtu wa kazi gani au unasoma?`
    ]);

  }


  /* -----------------------------------------
     WORK
     ----------------------------------------- */

  if (intent === "work") {

    conversation.occupation =
      rawText;


    conversation.lastQuestion =
      "work_followup";


    return choose([
      "Aah, hiyo ni interesting  Umeanza kufanya kazi hiyo muda gani?",
      "Vizuri sana! Unaifurahia kazi yako?",
      "Nice  Ni kitu gani unapenda zaidi kwenye kazi yako?",
      "Hiyo ni kazi nzuri. Kawaida siku yako ya kazi huwa inakuwaje?"
    ]);

  }


  /* -----------------------------------------
     BUSINESS
     ----------------------------------------- */

  if (intent === "business") {

    conversation.business =
      rawText;


    conversation.lastQuestion =
      "business_followup";


    return choose([
      "Oooh, una biashara  Unauza bidhaa au huduma gani?",
      "Hiyo ni nzuri sana. Uliianza biashara yako lini?",
      "Nice!  Biashara yako iko online au una duka?",
      "Hongera  Unafanya biashara hiyo mwenyewe au una watu wanaokusaidia?"
    ]);

  }


  /* -----------------------------------------
     SCHOOL
     ----------------------------------------- */

  if (intent === "school") {

    conversation.lastQuestion =
      "school_followup";


    return choose([
      "Vizuri  Unasoma kozi gani?",
      "Aah, mwanafunzi. Unafurahia masomo yako?",
      "Nice! Unasoma mwaka wa ngapi?",
      "Ni somo gani unalolipenda zaidi?"
    ]);

  }


  /* -----------------------------------------
     FOOD
     ----------------------------------------- */

  if (intent === "food") {

    conversation.food =
      rawText;


    conversation.lastQuestion =
      "food_followup";


    return choose([
      "Mmmh  Chakula ni topic nzuri! Wewe unapenda kula nini zaidi?",
      "Nice! Unapendelea chakula cha nyumbani au kula hotelini?",
      "Mimi ningependa kujua  Ni chakula gani huwezi kukataa?",
      "Kama ungechagua chakula kimoja leo, ungechagua nini?"
    ]);

  }


  /* -----------------------------------------
     MUSIC
     ----------------------------------------- */

  if (intent === "music") {

    conversation.music =
      rawText;


    conversation.lastQuestion =
      "music_followup";


    return choose([
      "Oh nice! 🎵 Unapenda msanii gani zaidi?",
      "Muziki ni topic nzuri  Unapenda Bongo Flava au aina nyingine?",
      "Nice 🎵 Kuna wimbo unaousikiliza sana siku hizi?",
      "Unapenda kusikiliza muziki ukiwa unafanya nini?"
    ]);

  }


  /* -----------------------------------------
     TRAVEL
     ----------------------------------------- */

  if (intent === "travel") {

    conversation.topic =
      "travel";


    conversation.lastQuestion =
      "travel_followup";


    return choose([
      "Safari ni nzuri sana  Ni sehemu gani ungependa kutembelea zaidi?",
      "Nice! Umewahi kutembelea sehemu gani iliyokuvutia sana?",
      "Kama ungepewa nafasi ya kusafiri leo, ungeenda wapi?",
      "Unapenda zaidi safari za mjini au sehemu za asili?"
    ]);

  }


  /* -----------------------------------------
     HOBBY
     ----------------------------------------- */

  if (intent === "hobby") {

    conversation.hobby =
      rawText;


    conversation.lastQuestion =
      "hobby_followup";


    return choose([
      "Nice  Ukiwa free unapenda kufanya nini zaidi?",
      "Hiyo ni nzuri. Burudani yako kubwa ni ipi?",
      "Unapenda michezo, muziki au kitu kingine?",
      "Ni kitu gani huwa kinakufurahisha ukiwa na muda wa ziada?"
    ]);

  }


  /* -----------------------------------------
     FAMILY
     ----------------------------------------- */

  if (intent === "family") {

    conversation.topic =
      "family";


    conversation.lastQuestion =
      "family_followup";


    return choose([
      "Familia ni muhimu sana  Una ndugu wengi?",
      "Aah, nimekupata. Unaishi na familia yako?",
      "Nice  Familia yako inaishi karibu nawe?",
      "Unaishi na familia au unaishi peke yako?"
    ]);

  }


  /* -----------------------------------------
     THANKS
     ----------------------------------------- */

  if (intent === "thanks") {

    return choose([
      "Karibu sana 😊 Nimefurahia mazungumzo yetu.",
      "Usijali kabisa!  Nami nafurahia kuongea nawe.",
      "Karibu  Ni vizuri kuzungumza pamoja."
    ]);

  }


  /* -----------------------------------------
     GOODBYE
     ----------------------------------------- */

  if (intent === "goodbye") {

    conversation.lastQuestion =
      null;


    return choose([
      "Sawa  Tutaongea tena baadaye.",
      "Kwaheri kwa sasa! Nimefurahia kuzungumza nawe.",
      "Sawa rafiki yangu  Tutaonana tena."
    ]);

  }


  /* -----------------------------------------
     RECIPROCAL
     ----------------------------------------- */

  if (intent === "reciprocal") {

    return choose([
      "Mimi niko salama kabisa  Nimefurahia kuongea nawe.",
      "Mimi niko vizuri  Asante kwa kuuliza.",
      "Niko poa kabisa. Leo nimefurahi kupata mazungumzo mazuri."
    ]);

  }


  /* -----------------------------------------
     YES
     ----------------------------------------- */

  if (intent === "yes") {

    return choose([
      "Vizuri  Endelea kuniambia zaidi.",
      "Sawa kabisa  Nimekupata.",
      "Nice! Hebu tuendelee na hilo."
    ]);

  }


  /* -----------------------------------------
     NO
     ----------------------------------------- */

  if (intent === "no") {

    return choose([
      "Sawa  Hakuna shida. Tuongee kuhusu jambo lingine.",
      "Nimeelewa. Hebu tubadilishe topic kidogo ",
      "Sawa kabisa. Kuna jambo lingine ungependa tuzungumzia?"
    ]);

  }


  /* -----------------------------------------
     GENERAL - CONTEXT BASED
     ----------------------------------------- */

  if (
    conversation.lastQuestion === "day"
  ) {

    conversation.lastQuestion =
      "activity";


    return choose([
      "Nice  Umefanya nini leo?",
      "Siku nzuri basi. Umejishughulisha na nini?",
      "Vizuri sana. Leo umekuwa busy na nini?"
    ]);

  }


  if (
    conversation.lastQuestion === "work_followup"
  ) {

    conversation.lastQuestion =
      "hobby";


    return choose([
      "Nimekupata  Ukiwa umeondoka kazini unapenda kufanya nini?",
      "Nice. Na ukiwa free baada ya kazi huwa unapenda kufanya nini?",
      "Kazi ni sehemu moja ya maisha  Vipi kuhusu burudani yako?"
    ]);

  }


  if (
    conversation.lastQuestion === "business_followup"
  ) {

    conversation.lastQuestion =
      "business_next";


    return choose([
      "Hiyo ni nzuri  Wateja wako wengi wanapatikana wapi?",
      "Interesting! Unafurahia zaidi kuuza online au ana kwa ana?",
      "Biashara hiyo inaonekana interesting. Changamoto kubwa unayokutana nayo ni ipi?"
    ]);

  }


  if (
    conversation.lastQuestion === "school_followup"
  ) {

    return choose([
      "Nice  Ungependa kufanya kazi gani baada ya kumaliza?",
      "Vizuri sana. Unapenda zaidi theory au practical?",
      "Masomo ni muhimu  Una mpango gani baada ya kumaliza?"
    ]);

  }


  if (
    conversation.lastQuestion === "food_followup"
  ) {

    return choose([
      "Mmmh  Hicho kinaonekana kitamu. Unapenda kupika pia?",
      "Nice! Unakula zaidi nyumbani au hotelini?",
      "Sasa nimepata picha ya chakula unachopenda "
    ]);

  }


  if (
    conversation.lastQuestion === "music_followup"
  ) {

    return choose([
      "Nice 🎵 Unasikiliza muziki mara nyingi?",
      "Huyo ni msanii mzuri. Kuna wimbo wake unaoupenda zaidi?",
      "Muziki una nafasi kubwa kwenye maisha yako au ni burudani tu?"
    ]);

  }


  if (
    conversation.lastQuestion === "travel_followup"
  ) {

    return choose([
      "Hiyo sehemu lazima iwe nzuri  Ungependa kwenda na nani?",
      "Nice! Ukienda huko ungependa kufanya nini kwanza?",
      "Safari nzuri huwa inaacha kumbukumbu. Umeshawahi kuwa na safari ya kukumbuka?"
    ]);

  }


  if (
    conversation.lastQuestion === "hobby_followup"
  ) {

    return choose([
      "Nice  Umeanza hobby hiyo lini?",
      "Hiyo ni nzuri. Unafanya mara nyingi?",
      "Interesting  Kuna hobby nyingine ungependa kujifunza?"
    ]);

  }


  if (
    conversation.lastQuestion === "family_followup"
  ) {

    return choose([
      "Familia kubwa huwa na stories nyingi  Wewe unaishi karibu nao?",
      "Nice  Huwa mnatumia muda pamoja mara nyingi?",
      "Familia ni muhimu. Ni kitu gani unapenda zaidi kuhusu familia yako?"
    ]);

  }


  /* -----------------------------------------
     PERSONALITY BASED GENERAL REPLIES
     ----------------------------------------- */

  const personalityReplies = {

    music: [
      "Interesting  Mimi napenda sana kusikia watu wanavyopenda muziki. Wewe unasikiliza nini siku hizi?",
      "Hiyo ni topic nzuri 🎵 Hebu niambie zaidi."
    ],

    travel: [
      "Interesting  Mimi napenda sana kusikia kuhusu sehemu ambazo watu wamewahi kutembelea. Wewe unapenda safari?",
      "Hilo linanivutia 😄 Ni sehemu gani ungependa kutembelea?"
    ],

    business: [
      "Aah, nimekupata  Biashara ni topic interesting. Uliianzaje?",
      "Nice!  Inaonekana una uzoefu kwenye hilo. Unalifurahia?"
    ],

    technology: [
      "Oh, technology! 💻 Hilo linanivutia. Unafanya nini zaidi kwenye technology?",
      "Nice  Wewe unapenda technology kwa sababu gani?"
    ],

    food: [
      "Mmmh 😄 Sasa tumeingia kwenye topic nzuri. Wewe unapenda chakula gani?",
      "Chakula ni topic yangu nzuri pia  Unapenda kupika?"
    ],

    culture: [
      "Hilo ni jambo zuri  Ningependa kujua zaidi kuhusu mtazamo wako.",
      "Interesting sana. Wewe unaipenda zaidi sehemu gani ya utamaduni?"
    ],

    academic: [
      "Interesting  Napenda sana mazungumzo ya kujifunza. Wewe unapenda kujifunza kuhusu nini?",
      "Hilo ni jambo zuri. Ungependa kujifunza kitu gani kipya?"
    ],

    wildlife: [
      "Wow  Mimi pia ningependa kujua zaidi kuhusu safari za wildlife. Umewahi kwenda safari?",
      "Nature ni nzuri sana 😊 Unapenda wanyama gani?"
    ]

  };


  const style =
    conversation.partner.style;


  if (
    personalityReplies[style]
  ) {

    return choose(
      personalityReplies[style]
    );

  }


  /* -----------------------------------------
     SMART FALLBACK
     ----------------------------------------- */

  const fallbackReplies = [

    "Aah, nimekupata  Hebu niambie zaidi kuhusu hilo.",
    "Interesting!  Hilo limefanya nitake kujua zaidi.",
    "Nimekusikia  Unaweza kunieleza zaidi?",
    "Sawa, nimeelewa. Na wewe unaonaje kuhusu hilo?",
    "Aah okay 😊 Endelea, nakusikiliza.",
    "Hilo ni interesting. Ni muda gani umehusika na hilo?",
    "Nimekupata  Na kwa upande wako, unalipendeaje?"
  ];


  return choose(
    fallbackReplies
  );

}


/* =========================================================
   15. CHOOSE WITHOUT IMMEDIATE REPETITION
   ========================================================= */

function choose(options) {

  if (
    !Array.isArray(options) ||
    options.length === 0
  ) {

    return "";

  }


  const available =
    options.filter(
      item =>
        !conversation.usedReplies.includes(item)
    );


  let selected;


  if (
    available.length === 0
  ) {

    conversation.usedReplies =
      [];

    selected =
      options[
        Math.floor(
          Math.random() * options.length
        )
      ];

  }
  else {

    selected =
      available[
        Math.floor(
          Math.random() * available.length
        )
      ];

  }


  conversation.usedReplies.push(
    selected
  );


  /* Keep memory from becoming huge */

  if (
    conversation.usedReplies.length > 20
  ) {

    conversation.usedReplies.shift();

  }


  return selected;

}


/* =========================================================
   16. UPDATE BALANCE
   ========================================================= */

function updateSalioUI() {

  const salioDisplay =
    document.getElementById(
      "salioDisplay"
    );

  const withdrawnDisplay =
    document.getElementById(
      "totalWithdrawnDisplay"
    );

  const modalBalance =
    document.getElementById(
      "modalSalioText"
    );


  if (salioDisplay) {

    salioDisplay.innerText =
      `TZS ${salio.toLocaleString()}`;

  }


  if (withdrawnDisplay) {

    withdrawnDisplay.innerText =
      `TZS ${totalWithdrawn.toLocaleString()}`;

  }


  if (modalBalance) {

    modalBalance.innerText =
      `Salio: TZS ${salio.toLocaleString()}`;

  }


  localStorage.setItem(
    "user_salio",
    salio
  );


  localStorage.setItem(
    "user_withdrawn",
    totalWithdrawn
  );

}


/* =========================================================
   17. RENDER WAZUNGU
   ========================================================= */

function renderWazungu() {

  const container =
    document.getElementById(
      "wazunguListContainer"
    );


  if (!container) {

    return;

  }


  container.innerHTML = "";


  wazunguData.forEach(
    partner => {

      const completed =
        localStorage.getItem(
          `chat_completed_${partner.id}`
        );


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "mzungu-card";


      card.innerHTML = `

        <div class="mzungu-header">

          <img
            src="https://i.pravatar.cc/100?img=${partner.id + 10}"
            class="avatar"
            alt="${partner.name}"
          >

          <div class="mzungu-info">

            <h4>
              ${partner.flag}
              ${partner.name},
              ${partner.age}
            </h4>

            <div class="meta">
              ${partner.country} • Online
            </div>

            <div class="price">
              Zawadi: TZS 5,000 - 150,000
            </div>

          </div>

        </div>

        <div class="mzungu-bio">
          ${partner.bio}
        </div>

        <button
          class="btn-chat ${completed ? "completed" : ""}"
          onclick="openTimeSelectModal(${partner.id})"
          ${completed ? "disabled" : ""}
        >

          ${
            completed
              ? "✓ Chat Imekamilika"
              : "Anza Chat"
          }

        </button>

      `;


      container.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   18. OPEN TIME MODAL
   ========================================================= */

function openTimeSelectModal(id) {

  currentSelectedMzungu =
    wazunguData.find(
      person =>
        person.id === id
    );


  if (
    !currentSelectedMzungu
  ) {

    return;

  }


  const name =
    document.getElementById(
      "modalProfileName"
    );


  const country =
    document.getElementById(
      "modalProfileCountry"
    );


  const avatar =
    document.getElementById(
      "modalAvatar"
    );


  if (name) {

    name.innerText =
      `${currentSelectedMzungu.name}, ${currentSelectedMzungu.age}`;

  }


  if (country) {

    country.innerText =
      `${currentSelectedMzungu.flag} ${currentSelectedMzungu.country}`;

  }


  if (avatar) {

    avatar.src =
      `https://i.pravatar.cc/100?img=${currentSelectedMzungu.id + 10}`;

  }


  const modal =
    document.getElementById(
      "timeSelectModal"
    );


  if (modal) {

    modal.style.display =
      "flex";

  }

}


/* =========================================================
   19. START CHAT
   ========================================================= */

function confirmStartChat(
  minutes,
  rewardAmount,
  labelText
) {

  if (
    !currentSelectedMzungu
  ) {

    return;

  }


  currentDurationMinutes =
    minutes;


  currentRewardAmount =
    rewardAmount;


  resetConversation(
    currentSelectedMzungu
  );


  closeModal(
    "timeSelectModal"
  );


  /* Chat header */

  const chatName =
    document.getElementById(
      "chatName"
    );


  const chatAvatar =
    document.getElementById(
      "chatAvatar"
    );


  if (chatName) {

    chatName.innerText =
      `${currentSelectedMzungu.flag} ${currentSelectedMzungu.name}`;

  }


  if (chatAvatar) {

    chatAvatar.src =
      `https://i.pravatar.cc/100?img=${currentSelectedMzungu.id + 10}`;

  }


  /* Messages */

  const messagesBox =
    document.getElementById(
      "chatMessages"
    );


  if (messagesBox) {

    messagesBox.innerHTML = "";

  }


  /* Open chat */

  const chatModal =
    document.getElementById(
      "chatRoomModal"
    );


  if (chatModal) {

    chatModal.style.display =
      "flex";

  }


  /* Opening */

  const openingList =
    currentSelectedMzungu.openings;


  const opening =
    openingList[
      Math.floor(
        Math.random() *
        openingList.length
      )
    ];


  conversation.lastQuestion =
    guessQuestionFromOpening(
      opening
    );


  setTimeout(() => {

    addBotMessage(
      opening
    );

  }, 500);


  /* Timer */

  totalSeconds =
    minutes * 60;


  secondsRemaining =
    totalSeconds;


  if (chatTimerInterval) {

    clearInterval(
      chatTimerInterval
    );

  }


  updateTimer();


  chatTimerInterval =
    setInterval(() => {

      secondsRemaining--;

      updateTimer();


      if (
        secondsRemaining <= 0
      ) {

        finishChatSession();

      }

    }, 1000);

}


/* =========================================================
   20. GUESS OPENING QUESTION
   ========================================================= */

function guessQuestionFromOpening(text) {

  const clean =
    cleanText(text);


  if (
    clean.includes("unaitwa nani")
  ) {

    return "name";

  }


  if (
    clean.includes("unaishi")
  ) {

    return "location";

  }


  if (
    clean.includes("unatokea")
  ) {

    return "location";

  }


  if (
    clean.includes("unaendeleaje")
  ) {

    return "how_are_you";

  }


  if (
    clean.includes("ukoje")
  ) {

    return "how_are_you";

  }


  if (
    clean.includes("unafanya kazi")
  ) {

    return "work";

  }


  if (
    clean.includes("unapenda muziki")
  ) {

    return "music";

  }


  if (
    clean.includes("unapenda chakula")
  ) {

    return "food";

  }


  if (
    clean.includes("unapenda kusafiri")
  ) {

    return "travel";

  }


  if (
    clean.includes("unasoma")
  ) {

    return "school";

  }


  if (
    clean.includes("unafanya nini")
  ) {

    return "hobby";

  }


  return null;

}


/* =========================================================
   21. ADD USER MESSAGE
   ========================================================= */

function addUserMessage(text) {

  const box =
    document.getElementById(
      "chatMessages"
    );


  if (!box) return;


  const message =
    document.createElement(
      "div"
    );


  message.className =
    "msg sent";


  message.innerText =
    text;


  box.appendChild(
    message
  );


  box.scrollTop =
    box.scrollHeight;

}


/* =========================================================
   22. ADD BOT MESSAGE
   ========================================================= */

function addBotMessage(text) {

  const box =
    document.getElementById(
      "chatMessages"
    );


  if (!box) return;


  const message =
    document.createElement(
      "div"
    );


  message.className =
    "msg received";


  message.innerText =
    text;


  box.appendChild(
    message
  );


  box.scrollTop =
    box.scrollHeight;

}


/* =========================================================
   23. SEND MESSAGE
   ========================================================= */

function sendMessage() {

  const input =
    document.getElementById(
      "chatInput"
    );


  if (!input) return;


  const text =
    input.value.trim();


  if (!text) {

    return;

  }


  if (!conversation) {

    return;

  }


  /* Show user message */

  addUserMessage(
    text
  );


  /* Clear input */

  input.value =
    "";


  /* Count */

  conversation.messageCount++;


  /* Understand */

  const intent =
    detectIntent(text);


  /* Remember */

  rememberInformation(
    text,
    intent
  );


  conversation.lastIntent =
    intent;


  /* Generate intelligent reply */

  const reply =
    generateReply(text);


  /* Human-like delay */

  const delay =
    900 +
    Math.floor(
      Math.random() * 1200
    );


  setTimeout(() => {

    addBotMessage(
      reply
    );

  }, delay);

}


/* =========================================================
   24. ENTER KEY
   ========================================================= */

function handleKeyPress(e) {

  if (
    e.key === "Enter"
  ) {

    e.preventDefault();

    sendMessage();

  }

}


/* =========================================================
   25. TIMER
   ========================================================= */

function updateTimer() {

  const timerText =
    document.getElementById(
      "timerText"
    );


  const progress =
    document.getElementById(
      "chatProgressBar"
    );


  if (!timerText) {

    return;

  }


  const hours =
    Math.floor(
      secondsRemaining / 3600
    );


  const minutes =
    Math.floor(
      (secondsRemaining % 3600) / 60
    );


  const seconds =
    secondsRemaining % 60;


  let formatted =
    `${minutes
      .toString()
      .padStart(2, "0")
    }:${
      seconds
        .toString()
        .padStart(2, "0")
    }`;


  if (hours > 0) {

    formatted =
      `${hours}:${formatted}`;

  }


  timerText.innerText =
    `Muda uliobaki: ${formatted}`;


  if (progress) {

    const percentage =
      totalSeconds > 0
        ? (
            (totalSeconds -
              secondsRemaining) /
            totalSeconds
          ) * 100
        : 0;


    progress.style.width =
      `${Math.min(
        100,
        Math.max(
          0,
          percentage
        )
      )}%`;

  }

}


/* =========================================================
   26. FINISH CHAT
   ========================================================= */

function finishChatSession() {

  if (chatTimerInterval) {

    clearInterval(
      chatTimerInterval
    );

    chatTimerInterval =
      null;

  }


  closeModal(
    "chatRoomModal"
  );


  /* Reward */

  salio +=
    currentRewardAmount;


  /* Mark partner completed */

  if (
    currentSelectedMzungu
  ) {

    localStorage.setItem(
      `chat_completed_${currentSelectedMzungu.id}`,
      "true"
    );

  }


  updateSalioUI();

  renderWazungu();


  const rewardText =
    document.getElementById(
      "rewardSubTitle"
    );


  if (rewardText) {

    rewardText.innerText =
      `Umepokea malipo yako ya TZS ${currentRewardAmount.toLocaleString()}.`;

  }


  const rewardModal =
    document.getElementById(
      "rewardModal"
    );


  if (rewardModal) {

    rewardModal.style.display =
      "flex";

  }

}


/* =========================================================
   27. MODALS
   ========================================================= */

function closeModal(id) {

  const modal =
    document.getElementById(
      id
    );


  if (modal) {

    modal.style.display =
      "none";

  }

}


/* =========================================================
   28. WITHDRAW
   ========================================================= */

function openWithdrawModal() {

  const modal =
    document.getElementById(
      "withdrawModal"
    );


  if (modal) {

    modal.style.display =
      "flex";

  }

}


function handleWithdrawSubmit(e) {

  e.preventDefault();


  const amountInput =
    document.getElementById(
      "withdrawAmount"
    );


  if (!amountInput) {

    return;

  }


  const amount =
    parseInt(
      amountInput.value
    );


  if (
    isNaN(amount) ||
    amount <= 0
  ) {

    alert(
      "Tafadhali weka kiasi sahihi."
    );

    return;

  }


  if (
    amount > salio
  ) {

    alert(
      "Kiasi hiki kinazidi salio lako la sasa."
    );

    return;

  }


  closeModal(
    "withdrawModal"
  );


  const errorModal =
    document.getElementById(
      "errorModal"
    );


  if (errorModal) {

    errorModal.style.display =
      "flex";

  }

}


/* =========================================================
   29. WHATSAPP
   ========================================================= */

function openWhatsAppSupport() {

  window.open(
    "https://wa.me/",
    "_blank"
  );

}


/*
   HTML yako inatumia openWhatsAppDirect()
   kwenye Customer Care button.
*/

function openWhatsAppDirect() {
  window.open(
    "https://wa.link/uqvu6x",
    "_blank"
  );
}


/* =========================================================
   30. PAYMENT NOTIFICATIONS
   ========================================================= */

const notificationsData = [

  {
    name: "Salma A. — Zanzibar",
    amount: "TZS 185,000",
    network: "HaloPesa"
  },

  {
    name: "Juma K. — Dar es Salaam",
    amount: "TZS 50,000",
    network: "M-Pesa"
  },

  {
    name: "Aisha M. — Arusha",
    amount: "TZS 300,000",
    network: "Tigo Pesa"
  },

  {
    name: "Baraka J. — Mwanza",
    amount: "TZS 120,000",
    network: "Airtel Money"
  },

  {
    name: "Zuhura H. — Tanga",
    amount: "TZS 75,000",
    network: "HaloPesa"
  },

  {
    name: "Kelvin P. — Mbeya",
    amount: "TZS 250,000",
    network: "M-Pesa"
  },

  {
    name: "Neema S. — Dodoma",
    amount: "TZS 95,000",
    network: "Tigo Pesa"
  }

];


let currentNotificationIndex =
  0;


/* =========================================================
   31. NOTIFICATION SOUND
   ========================================================= */

/* =========================================================
   31. LUGHAPAY NOTIFICATION SOUND
   ========================================================= */

function playNotificationSound() {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    const audio = new AudioContext();

    /*
       Kama browser imezuia audio mpaka user interaction,
       jaribu kuendelea baada ya interaction.
    */
    if (audio.state === "suspended") {
      audio.resume();
    }

    /* TONE YA KWANZA */
    const oscillator1 =
      audio.createOscillator();

    const gain1 =
      audio.createGain();

    oscillator1.type = "sine";

    oscillator1.frequency.setValueAtTime(
      660,
      audio.currentTime
    );

    oscillator1.frequency.exponentialRampToValueAtTime(
      880,
      audio.currentTime + 0.10
    );

    gain1.gain.setValueAtTime(
      0.16,
      audio.currentTime
    );

    gain1.gain.exponentialRampToValueAtTime(
      0.001,
      audio.currentTime + 0.35
    );

    oscillator1.connect(gain1);
    gain1.connect(audio.destination);

    oscillator1.start();

    oscillator1.stop(
      audio.currentTime + 0.35
    );


    /* TONE YA PILI - INAFANYA IWE KAMA NOTIFICATION */
    const oscillator2 =
      audio.createOscillator();

    const gain2 =
      audio.createGain();

    oscillator2.type = "sine";

    oscillator2.frequency.setValueAtTime(
      880,
      audio.currentTime + 0.08
    );

    oscillator2.frequency.exponentialRampToValueAtTime(
      1174.66,
      audio.currentTime + 0.18
    );

    gain2.gain.setValueAtTime(
      0.001,
      audio.currentTime
    );

    gain2.gain.linearRampToValueAtTime(
      0.13,
      audio.currentTime + 0.10
    );

    gain2.gain.exponentialRampToValueAtTime(
      0.001,
      audio.currentTime + 0.50
    );

    oscillator2.connect(gain2);
    gain2.connect(audio.destination);

    oscillator2.start(
      audio.currentTime + 0.08
    );

    oscillator2.stop(
      audio.currentTime + 0.50
    );


    /* Funga AudioContext baada ya sound */
    setTimeout(() => {

      if (audio.state !== "closed") {
        audio.close();
      }

    }, 700);

  }

  catch (error) {

    console.log(
      "Notification sound haijapatikana."
    );

  }

}


/* =========================================================
   32. SHOW NOTIFICATION
   ========================================================= */

function showNextNotification() {

  const notification =
    document.getElementById(
      "floatingNotif"
    );


  const title =
    document.getElementById(
      "notifTitle"
    );


  const description =
    document.getElementById(
      "notifDesc"
    );


  if (
    !notification ||
    !title ||
    !description
  ) {

    return;

  }


  const current =
    notificationsData[
      currentNotificationIndex
    ];


  title.textContent =
    current.name;


  description.innerHTML =
    `Ametoa <span>${current.amount}</span> kupitia ${current.network}`;


  notification.classList.add(
    "show"
  );


  playNotificationSound();


  setTimeout(() => {

    notification.classList.remove(
      "show"
    );

  }, 4000);


  currentNotificationIndex =
    (
      currentNotificationIndex + 1
    ) %
    notificationsData.length;

}


/* =========================================================
   33. CLOSE NOTIFICATION
   ========================================================= */

function closeNotification() {

  const notification =
    document.getElementById(
      "floatingNotif"
    );


  if (notification) {

    notification.classList.remove(
      "show"
    );

  }

}


/* =========================================================
   34. INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateSalioUI();

    renderWazungu();


    /* First notification */

    setTimeout(() => {

      showNextNotification();


      setInterval(
        showNextNotification,
        6000
      );

    }, 2000);

  }
);

// KODI YA KULAZIMISHA BUTTON ZA CUSTOMER CARE IFUNGUE WHATSAPP NA UJUMBE
document.addEventListener('DOMContentLoaded', () => {
  const customerCareBtns = document.querySelectorAll('.btn-customer-care');
  
  // Weka namba yako hapa chini (mfano: 2557XXXXXXXX)
  const phoneNumber = "+255667595067"; 
  const message = encodeURIComponent("Habari boss, naomba unielekeze kuhusu ChatPesa");

  customerCareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(`https://wa.me/255667595067?text=${message}`, '_blank');
    });
  });
});