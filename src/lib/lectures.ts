/**
 * Recorded lectures published on the foundation's Facebook page.
 *
 * Generated from the page's own video export, then cleaned: the boilerplate
 * page name, the duration stamp and the "Boost / Create ad" chrome are
 * stripped, and each entry keeps only its topic and lecturer. Titles are
 * reproduced as published, Arabic included.
 *
 * These are links, not embeds. Facebook's player would load third-party
 * scripts and cookies on every page view, which the performance budget and the
 * cookie policy both rule out — so each lecture opens on Facebook instead.
 */

export type LectureCategory =
  | "tafsir"
  | "medicine"
  | "fiqh"
  | "seminar"
  | "halqah"
  | "empowerment"
  | "reminder";

export type Lecture = {
  id: string;
  category: LectureCategory;
  /** Which run of the series this is, where the page said so. */
  series: string;
  title: string;
  lecturer: string;
  url: string;
};

export const LECTURE_CATEGORIES: {
  key: LectureCategory;
  label: string;
  blurb: string;
}[] = [
  {
    key: "tafsir",
    label: "Tafsir",
    blurb: "The weekly Friday session, working through the Qur'an surah by surah.",
  },
  {
    key: "medicine",
    label: "Prophetic medicine",
    blurb: "The fortnightly Saturday class on the remedies of the Sunnah.",
  },
  {
    key: "fiqh",
    label: "Fiqh class",
    blurb: "The Sunday evening class on the fiqh of everyday worship and dealings.",
  },
  {
    key: "seminar",
    label: "Monthly Fiqh Seminar",
    blurb:
      "Business transactions and interpersonal relations, taught on the last Sunday of the month by Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore.",
  },
  {
    key: "halqah",
    label: "Weekly halqah",
    blurb: "History, creed and character, taught in the evening circle.",
  },
  {
    key: "empowerment",
    label: "Empowerment programme",
    blurb: "Recordings from the empowerment gatherings.",
  },
  {
    key: "reminder",
    label: "Reminders",
    blurb: "Shorter talks, question-and-answer sessions and seasonal reminders.",
  },
];

export const LECTURES: Lecture[] = [
  {
    id: "1789492185709485",
    category: "tafsir",
    series: "",
    title:
      "Qosos 28: 30",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1789492185709485/",
  },
  {
    id: "1707737800551591",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 160",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1707737800551591/",
  },
  {
    id: "1719007116091326",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 185",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1719007116091326/",
  },
  {
    id: "1724780052180699",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 210",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1724780052180699/",
  },
  {
    id: "1731867648138606",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 213",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1731867648138606/",
  },
  {
    id: "1730886731570031",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 213",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1730886731570031/",
  },
  {
    id: "1737686120890092",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 221",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1737686120890092/",
  },
  {
    id: "1750754652916572",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 224---227",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1750754652916572/",
  },
  {
    id: "1659364018722303",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 36",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1659364018722303/",
  },
  {
    id: "1666999441292094",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 49",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1666999441292094/",
  },
  {
    id: "1672641737394531",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 60",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1672641737394531/",
  },
  {
    id: "1678757943449577",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 69",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1678757943449577/",
  },
  {
    id: "1684653936193311",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratul-Shuarau, QUR'AN 26 Verse 86",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1684653936193311/",
  },
  {
    id: "1639183907406981",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli Shuaraa, QUR'AN 26 Verse 22",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1639183907406981/",
  },
  {
    id: "1914087656583270",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Ankabut, QUR'AN 29 Verse 1- 4",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1914087656583270/",
  },
  {
    id: "1907221320603237",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 (Concluding Verses)",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1907221320603237/",
  },
  {
    id: "1789152765743427",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 Verse 30 - 34",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1789152765743427/",
  },
  {
    id: "1795440515114652",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 Verse 35-40",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1795440515114652/",
  },
  {
    id: "1801451664513537",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 Verse 40",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1801451664513537/",
  },
  {
    id: "1820599315932105",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 Verse 54",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1820599315932105/",
  },
  {
    id: "1827081215283915",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 Verse 55-56",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1827081215283915/",
  },
  {
    id: "1840363790622324",
    category: "tafsir",
    series: "Tafsir Class",
    title:
      "Suuratuli-Qosos, QUR'AN 28 Verse 60",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1840363790622324/",
  },
  {
    id: "1790039865654717",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "Prophetic and Medicinal benefits of Garlic (At-thaom).",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1790039865654717/",
  },
  {
    id: "1841289387196431",
    category: "medicine",
    series: "",
    title:
      "SOLUTION TO ASTHMA Speaker: Imam Engr. Tirmidhi Abd'waasi #propheticmedicines #SunnahHealing #assoutudeen #fypシ゚viralシ #makeitviral",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1841289387196431/",
  },
  {
    id: "1828463548479015",
    category: "medicine",
    series: "",
    title:
      "SOLUTIONS TO DIABETES",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1828463548479015/",
  },
  {
    id: "1744080420250662",
    category: "medicine",
    series: "",
    title:
      "Solutions to Snakebites and Scorpion Stings",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1744080420250662/",
  },
  {
    id: "1719781436013894",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "Spiritual and Medicinal benefits of Cress (Habatul Roshad).",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1719781436013894/",
  },
  {
    id: "1673467790645259",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "Spiritual and Medicinal benefits of Zam Zam water.",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1673467790645259/",
  },
  {
    id: "1646945786630793",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "TONIGHT'S PROPHETIC MEDICINE CLASS! Spiritual and Medical benefits of Habatul Saodaa ( Black seed)",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1646945786630793/",
  },
  {
    id: "1660339211958117",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "TONIGHT'S PROPHETIC MEDICINE CLASS! Spiritual and Medical benefits of Zaytun Oil ( Olive Oil)",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1660339211958117/",
  },
  {
    id: "1743980623593975",
    category: "medicine",
    series: "",
    title:
      "المخرج والوقاية من رخّص كل ذى حُمَة The Prophetic Guidance and Solutions to Treating Poisonous and Venomous Stings (Scorpion and Snake Bites)",
    lecturer: "Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1743980623593975/",
  },
  {
    id: "1841262010532502",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "المخرج والوقاية من مرض الرّبوْ The Prophetic Guidance & Solutions To Asthma.",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi #propheticmedicines #SunnahHealing #assoutudeen #fypシ゚viralシ #makeitviral",
    url: "https://www.facebook.com/apmfnigeria/videos/1841262010532502/",
  },
  {
    id: "1828037165188320",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "المخرج والوقاية من مرض بول السكرى The Prophetic Guidance & Solutions To Diabetes.",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1828037165188320/",
  },
  {
    id: "1908199357172100",
    category: "medicine",
    series: "Prophetic Medicine Class",
    title:
      "المخرج والوقاية من مرض تحت جنبى The Prophetic Guidance & Solutions To Pleurisy.",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1908199357172100/",
  },
  {
    id: "1731890208136350",
    category: "fiqh",
    series: "Fiqh Class",
    title:
      "IN PREPARATION FOR RAMADAN",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1731890208136350/",
  },
  {
    id: "1752679416057429",
    category: "fiqh",
    series: "Fiqh Class 7",
    title:
      "IN PREPARATION FOR RAMADAN (CONTINUATION)",
    lecturer: "🎙️: Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1752679416057429/",
  },
  {
    id: "1751734899485214",
    category: "fiqh",
    series: "Fiqh Class 6",
    title:
      "IN PREPARATION FOR RAMADAN (CONTINUATION)",
    lecturer: "🎙️: Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1751734899485214/",
  },
  {
    id: "1746039626721408",
    category: "fiqh",
    series: "Fiqh Class 5",
    title:
      "IN PREPARATION FOR RAMADAN (CONTINUATION)",
    lecturer: "🎙️: Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1746039626721408/",
  },
  {
    id: "1745087440149960",
    category: "fiqh",
    series: "Fiqh Class 4",
    title:
      "IN PREPARATION FOR RAMADAN (CONTINUATION)",
    lecturer: "🎙️: Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1745087440149960/",
  },
  {
    id: "1739357924056245",
    category: "fiqh",
    series: "Fiqh Class",
    title:
      "IN PREPARATION FOR RAMADAN (CONTINUATION)",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1739357924056245/",
  },
  {
    id: "1738610787464292",
    category: "fiqh",
    series: "Fiqh Class",
    title:
      "IN PREPARATION FOR RAMADAN (CONTINUATION)",
    lecturer: "🎙️: Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1738610787464292/",
  },
  {
    id: "1732836008041770",
    category: "seminar",
    series: "Monthly Fiqh Seminar (Episode 10)",
    title:
      "Islamic Jurisprudence on Business Transactions and Interpersonal Interactions. (Islamic Rulings On Making Choices During Transactions)",
    lecturer: "Fadheelatuli Usthadh As-Shaykh Dr. Yaaqub Abd'hammed Muhibullah Olore(Mufti, Mahad li Islaamiy, Ede.)",
    url: "https://www.facebook.com/apmfnigeria/videos/1732836008041770/",
  },
  {
    id: "1654670825858289",
    category: "seminar",
    series: "Monthly Fiqh Seminar (Episode 7)",
    title:
      "Islamic Jurisprudence on Business Transactions and Interpersonal Interactions. (Islamic Rulings On Making Choices During Transactions)",
    lecturer: "Fadheelatuli Usthadh As-Shaykh Dr. Yaaqub Abd'hammed Muhibullah Olore(Mufti, Mahad li Islaamiy, Ede.)",
    url: "https://www.facebook.com/apmfnigeria/videos/1654670825858289/",
  },
  {
    id: "1902240771101292",
    category: "seminar",
    series: "Monthly Fiqh Seminar (Episode 15)",
    title:
      "احكام وضع الجواءح في البيع ( Rulings on Calamities Occuring during Trade Transactions)",
    lecturer: "Fadheelatuli Usthadh As-Shaykh Dr. Yaaqub Abd'hammed Muhibullah Olore(Mufti, Mahad li Islaamiy, Ede.)",
    url: "https://www.facebook.com/apmfnigeria/videos/1902240771101292/",
  },
  {
    id: "1790922778899759",
    category: "seminar",
    series: "Monthly Fiqh Seminar (Episode 11)",
    title:
      "باب احكام التصرف فى البيع والإقالة ( Islamic Rulings on Changing & Returning an Already Bought Products in Business)",
    lecturer: "Fadheelatuli Usthadh As-Shaykh Dr. Yaaqub Abd'hammed Muhibullah Olore(Mufti, Mahad li Islaamiy, Ede.)",
    url: "https://www.facebook.com/apmfnigeria/videos/1790922778899759/",
  },
  {
    id: "1822398079085562",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "History Class خلافة امير المؤمنين عثمان بن عفان The Caliphacy of Uthman bn Affān (may Allah be pleased with him) Concluding Class",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1822398079085562/",
  },
  {
    id: "1829025651756138",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "History Class خلافة امير المؤمنين علي بن ابي طالب The Caliphacy of Ali bn Abi Toolib (may Allah be pleased with him)",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1829025651756138/",
  },
  {
    id: "1909124337079602",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "History Class من هو سعد بن أبي وقاص؟ WHO'S SAD BN ABI WAQĀS?",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1909124337079602/",
  },
  {
    id: "1915947416397294",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "History Class: من هو طلحة بن عبيد الله؟ WHO'S TALHAH BN UBAYDULLAH?",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1915947416397294/",
  },
  {
    id: "1914986209826748",
    category: "halqah",
    series: "Weekly Halqoh",
    title:
      "آثار ونتاءج عقوق الوالدين Effects and Results of Being Disobedient To Parents",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1914986209826748/",
  },
  {
    id: "1726421032016601",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "خلافة امير المؤمنين عمر بن الخطاب The Caliphacy of Umar Ibn Al-khattab (may Allah be pleased with him)",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1726421032016601/",
  },
  {
    id: "1797172244941479",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "خلافة امير المؤمنين عمر بن الخطاب The Caliphacy of Umar Ibn Al-khattab (may Allah be pleased with him) Continuation.",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1797172244941479/",
  },
  {
    id: "1842137557111614",
    category: "halqah",
    series: "Weekly Halqoh",
    title:
      "عيد الأضحى و ما يشتمل عليه (Ileya Festival and What it Entails)",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1842137557111614/",
  },
  {
    id: "1680456149946423",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "فى الدفاع عن الصحابة النّقد والرّدّ العلمى على من سبّ أصحاب الرسول وفرق بينهم بل توارى بتحليل المسائل الخلافية",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1680456149946423/",
  },
  {
    id: "1674301917228513",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "فى الدفاع عن الصحابة النّقد والرّدّ العلمى على من سبّ أصحاب الرسول وفرق بينهم بل توارى بتحليل المسائل الخلافية",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1674301917228513/",
  },
  {
    id: "1668031944522177",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "فى الدفاع عن الصحابة النّقد والرّدّ العلمى على من سبّ أصحاب الرسول وفرق بينهم بل توارى بتحليل المسائل الخلافية",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1668031944522177/",
  },
  {
    id: "1661296418529063",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "فى الدفاع عن الصحابة النّقد والرّدّ العلمى على من سبّ أصحاب الرسول وفرق بينهم بل توارى بتحليل المسائل الخلافية",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1661296418529063/",
  },
  {
    id: "1647923343199704",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "فى الدفاع عن الصحابة النّقد والرّدّ العلمى على من سبّ أصحاب الرسول وفرق بينهم بل توارى بتحليل المسائل الخلافية",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1647923343199704/",
  },
  {
    id: "1641175003874538",
    category: "halqah",
    series: "Weekly Halqah",
    title:
      "فى الدفاع عن الصحابة النّقد والرّدّ العلمى على من سبّ أصحاب الرسول وفرق بينهم بل توارى بتحليل المسائل الخلافية",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi Language: Arabic & Yoruba",
    url: "https://www.facebook.com/apmfnigeria/videos/1641175003874538/",
  },
  {
    id: "1655599912432047",
    category: "empowerment",
    series: "",
    title:
      "Avoiding Nigerian Correctional Centre (Prison); Way Forward As a Muslim Youth 👳🏻♂ Guest",
    lecturer: "Barr. Qaasim Odedeji",
    url: "https://www.facebook.com/apmfnigeria/videos/1655599912432047/",
  },
  {
    id: "1816708726321164",
    category: "empowerment",
    series: "",
    title:
      "الفرق بين اولياء الرّحمان واولياء الشيطان. Distinguishable Facts Between The Allies of Ar-rahman and The Allies of Devil. 👳🏻♂ Guest",
    lecturer: "FADHIOATULI - USTHADH MUNEERUDEEN AL-OKEEWIY",
    url: "https://www.facebook.com/apmfnigeria/videos/1816708726321164/",
  },
  {
    id: "1679971866661518",
    category: "reminder",
    series: "",
    title:
      "Be Responsible for your Actions, Inactions and always take full Responsibility. 🎙 Imam Engr. Tirmidhi Abd'waasi",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1679971866661518/",
  },
  {
    id: "1840372287288141",
    category: "reminder",
    series: "",
    title:
      "INSECURITY CHALLENGES; THE WAY FORWARD! Speaker: Imam Engr. Tirmidhi Abd'waasi",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1840372287288141/",
  },
  {
    id: "1802390764419627",
    category: "reminder",
    series: "",
    title:
      "MY SINCERE ADVICE TO KING DR SAHEED OSUPA. Speaker: Imam Engr. Tirmidhi Abd'waasi",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1802390764419627/",
  },
  {
    id: "1835726804419356",
    category: "reminder",
    series: "",
    title:
      "QUESTIONS AND ANSWERS SESSION Imam Engr. Tirmidhi Abd'waasi",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1835726804419356/",
  },
  {
    id: "1720315405960497",
    category: "reminder",
    series: "",
    title:
      "Resilience In The Face Of Adversity Guest",
    lecturer: "Imam Engr. Tirmidhi Abd’waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1720315405960497/",
  },
  {
    id: "1756340329024671",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 1.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1756340329024671/",
  },
  {
    id: "1758340315491339",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 14.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1758340315491339/",
  },
  {
    id: "1766585474666823",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 53.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1766585474666823/",
  },
  {
    id: "1767418414583529",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 59.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1767418414583529/",
  },
  {
    id: "1757317112260326",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 6.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1757317112260326/",
  },
  {
    id: "1768224747836229",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 61.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1768224747836229/",
  },
  {
    id: "1769061981085839",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 62.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1769061981085839/",
  },
  {
    id: "1769859011006136",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 64.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1769859011006136/",
  },
  {
    id: "1770715440920493",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 71.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1770715440920493/",
  },
  {
    id: "1771490484176322",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 81.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1771490484176322/",
  },
  {
    id: "1772315250760512",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 82.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1772315250760512/",
  },
  {
    id: "1773976577261046",
    category: "reminder",
    series: "",
    title:
      "Suuratu-Naml (Verses 87.....) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1773976577261046/",
  },
  {
    id: "1779409340051103",
    category: "reminder",
    series: "",
    title:
      "Suuratuli- Qosos (Verses 19-27) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1779409340051103/",
  },
  {
    id: "1780207503304620",
    category: "reminder",
    series: "",
    title:
      "Suuratuli- Qosos (Verses 27-32) 🎙",
    lecturer: "Imam Engr. Tirimidhi Abd'waasi 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1780207503304620/",
  },
  {
    id: "1773168007341903",
    category: "reminder",
    series: "",
    title:
      "THE LAST 10 DAYS OF RAMADAN AND IT MIDNIGHT 🎙 Guest",
    lecturer: "Usthadh Abdul-Lateef 🔌 Language: _Yoruba_",
    url: "https://www.facebook.com/apmfnigeria/videos/1773168007341903/",
  },
  {
    id: "1820638795928157",
    category: "reminder",
    series: "",
    title:
      "Why Wouldn't You Rely on Allah completely?!",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1820638795928157/",
  },
  {
    id: "1725620065430031",
    category: "reminder",
    series: "",
    title:
      "الاذكار والدّعوات للأمور العارضات Continuations on ( Special Invocations and supplications to do during Special Conditions). 🎙",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1725620065430031/",
  },
  {
    id: "1821519009173469",
    category: "reminder",
    series: "",
    title:
      "شرح الكباءر (الإشراك بالله) (Associating Partners with Allah) 🎙",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1821519009173469/",
  },
  {
    id: "1679610650030973",
    category: "reminder",
    series: "",
    title:
      "فضل حمد الله تعالى (Virtue of Praising Allāh) 🎙",
    lecturer: "Imam Engr. Tirmidhi Abd'waasi",
    url: "https://www.facebook.com/apmfnigeria/videos/1679610650030973/",
  },
  {
    id: "1750450489613655",
    category: "reminder",
    series: "",
    title:
      "فضل شهر الرّمضان Virtues of The Month of Ramadan. 🎙 Imam Engr. Tirmidhi Abd’waasi",
    lecturer: "",
    url: "https://www.facebook.com/apmfnigeria/videos/1750450489613655/",
  },
];

/** The foundation's Facebook page, where the full archive lives. */
export const FACEBOOK_PAGE = "https://www.facebook.com/apmfnigeria";

export const lecturesIn = (category: LectureCategory): Lecture[] =>
  LECTURES.filter((lecture) => lecture.category === category);
