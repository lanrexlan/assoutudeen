import { describe, expect, it } from "vitest";
import { withoutHashtags } from "@/lib/lectures";

/**
 * These titles come from Facebook posts, tags and all. Stripping them is a
 * display decision, so it has to be conservative: better to leave a stray tag
 * showing than to cut words out of a real lecture title.
 */

describe("withoutHashtags", () => {
  it("removes a trailing wall of tags", () => {
    expect(
      withoutHashtags(
        "SOLUTION TO ASTHMA Speaker: Imam Engr. Tirmidhi Abd'waasi #propheticmedicines #SunnahHealing #assoutudeen",
      ),
    ).toBe("SOLUTION TO ASTHMA Speaker: Imam Engr. Tirmidhi Abd'waasi");
  });

  it("removes a single trailing tag", () => {
    expect(withoutHashtags("Benefits of black seed #sunnah")).toBe(
      "Benefits of black seed",
    );
  });

  it("leaves a title that has no tags alone", () => {
    expect(withoutHashtags("Prophetic and Medicinal benefits of Garlic (At-thaom).")).toBe(
      "Prophetic and Medicinal benefits of Garlic (At-thaom).",
    );
  });

  it("keeps a hashtag that is doing work mid-sentence", () => {
    // Cutting from the first tag would lose the rest of the sentence.
    expect(withoutHashtags("Episode #3 of the series on fiqh")).toBe(
      "Episode #3 of the series on fiqh",
    );
  });

  it("leaves Arabic titles untouched", () => {
    const arabic = "دور المسلمين في تأسيس الثقافة الإسلامية";
    expect(withoutHashtags(arabic)).toBe(arabic);
  });

  it("trims the whitespace the tags leave behind", () => {
    expect(withoutHashtags("A talk   #one #two  ")).toBe("A talk");
  });
});
