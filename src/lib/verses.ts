/**
 * The Qur'anic verses used across the site.
 *
 * SOURCED, NOT TYPED. The Arabic is the Uthmani text extracted verbatim from
 * the published `quran-json` dataset (v3.1.2, Tanzil-derived); the English is
 * that dataset's Saheeh International rendering. Nothing here was written from
 * memory — docs/09 is explicit that a mangled ayah costs more credibility than
 * a broken layout.
 *
 * To add a verse, extract it from the same dataset rather than retyping it, and
 * keep the diacritics exactly as they arrive.
 */

export type Verse = {
  /** Arabic, Uthmani script, diacritics intact. */
  arabic: string;
  /** English rendering of the meaning. */
  translation: string;
  /** Full citation, shown beneath every quotation. */
  source: string;
  /** Short internal label. */
  title: string;
};

export const VERSES = {
  tawbah105: {
    arabic:
      "وَقُلِ ٱعۡمَلُواْ فَسَيَرَى ٱللَّهُ عَمَلَكُمۡ وَرَسُولُهُۥ وَٱلۡمُؤۡمِنُونَۖ وَسَتُرَدُّونَ إِلَىٰ عَٰلِمِ ٱلۡغَيۡبِ وَٱلشَّهَٰدَةِ فَيُنَبِّئُكُم بِمَا كُنتُمۡ تَعۡمَلُونَ",
    translation:
      "And say, \"Do [as you will], for Allah will see your deeds, and [so, will] His Messenger and the believers. And you will be returned to the Knower of the unseen and the witnessed, and He will inform you of what you used to do.",
    source: "Qur'an, At-Tawbah 9:105",
    title: "Work, and it will be seen",
  },
  nahl68: {
    arabic:
      "وَأَوۡحَىٰ رَبُّكَ إِلَى ٱلنَّحۡلِ أَنِ ٱتَّخِذِي مِنَ ٱلۡجِبَالِ بُيُوتٗا وَمِنَ ٱلشَّجَرِ وَمِمَّا يَعۡرِشُونَ",
    translation:
      "And your Lord inspired to the bee, \"Take for yourself among the mountains, houses, and among the trees and [in] that which they construct.",
    source: "Qur'an, An-Nahl 16:68",
    title: "The bee",
  },
  nahl69: {
    arabic:
      "ثُمَّ كُلِي مِن كُلِّ ٱلثَّمَرَٰتِ فَٱسۡلُكِي سُبُلَ رَبِّكِ ذُلُلٗاۚ يَخۡرُجُ مِنۢ بُطُونِهَا شَرَابٞ مُّخۡتَلِفٌ أَلۡوَٰنُهُۥ فِيهِ شِفَآءٞ لِّلنَّاسِۚ إِنَّ فِي ذَٰلِكَ لَأٓيَةٗ لِّقَوۡمٖ يَتَفَكَّرُونَ",
    translation:
      "Then eat from all the fruits and follow the ways of your Lord laid down [for you].\" There emerges from their bellies a drink, varying in colors, in which there is healing for people. Indeed in that is a sign for a people who give thought.",
    source: "Qur'an, An-Nahl 16:69",
    title: "In it is healing for people",
  },
  shuara80: {
    arabic:
      "وَإِذَا مَرِضۡتُ فَهُوَ يَشۡفِينِ",
    translation:
      "And when I am ill, it is He who cures me.",
    source: "Qur'an, Ash-Shu'ara 26:80",
    title: "And when I am ill, He cures me",
  },
  isra82: {
    arabic:
      "وَنُنَزِّلُ مِنَ ٱلۡقُرۡءَانِ مَا هُوَ شِفَآءٞ وَرَحۡمَةٞ لِّلۡمُؤۡمِنِينَ وَلَا يَزِيدُ ٱلظَّـٰلِمِينَ إِلَّا خَسَارٗا",
    translation:
      "And We send down of the Qur'an that which is healing and mercy for the believers, but it does not increase the wrongdoers except in loss.",
    source: "Qur'an, Al-Isra 17:82",
    title: "Healing and mercy",
  },
  fatihah1: {
    arabic:
      "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    source: "Qur'an, Al-Fatihah 1:1",
    title: "In the name of Allah",
  },
  baqarah168: {
    arabic:
      "يَـٰٓأَيُّهَا ٱلنَّاسُ كُلُواْ مِمَّا فِي ٱلۡأَرۡضِ حَلَٰلٗا طَيِّبٗا وَلَا تَتَّبِعُواْ خُطُوَٰتِ ٱلشَّيۡطَٰنِۚ إِنَّهُۥ لَكُمۡ عَدُوّٞ مُّبِينٌ",
    translation:
      "O mankind, eat from whatever is on earth [that is] lawful and good and do not follow the footsteps of Satan. Indeed, he is to you a clear enemy.",
    source: "Qur'an, Al-Baqarah 2:168",
    title: "Lawful and good",
  },
  baqarah274: {
    arabic:
      "ٱلَّذِينَ يُنفِقُونَ أَمۡوَٰلَهُم بِٱلَّيۡلِ وَٱلنَّهَارِ سِرّٗا وَعَلَانِيَةٗ فَلَهُمۡ أَجۡرُهُمۡ عِندَ رَبِّهِمۡ وَلَا خَوۡفٌ عَلَيۡهِمۡ وَلَا هُمۡ يَحۡزَنُونَ",
    translation:
      "Those who spend their wealth [in Allah 's way] by night and by day, secretly and publicly - they will have their reward with their Lord. And no fear will there be concerning them, nor will they grieve.",
    source: "Qur'an, Al-Baqarah 2:274",
    title: "Those who spend by night and by day",
  },
} as const satisfies Record<string, Verse>;

/** Shown wherever the site quotes scripture, so the text source is checkable. */
export const VERSE_TEXT_SOURCE =
  "Arabic: Uthmani script, Tanzil-derived quran-json dataset. English rendering: Saheeh International.";
