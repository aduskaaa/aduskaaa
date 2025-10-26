/* ==========================================================
   Far East Russia (FER) – Versions Registry
   ----------------------------------------------------------
   This file defines all FER and RC releases globally.
   Add new entries by appending to arrays below.
   ========================================================== */

window.RELEASES = {
  fer: [
    {
      version: "Alpha 27",
      date: "2025-10-26", // ISO format YYYY-MM-DD
      size: "112.3MB",
      game: "ETS2 1.56",
      notes: "Rebuilded part of P-504, Added Teply Klyuch, Rebuilded Khandyga",
      links: {
        primary: "https://sharemods.com/yv7l5hyjgunv/Far_East_Russia_Alpha_27.scs.html",
        changelog: ""
      }
    },
    {
      version: "Alpha 26",
      date: "2025-10-07",
      size: "104MB",
      game: "ETS2 1.56",
      notes: "Rebuilded 98K-006, Added Nalimsk, Andryushkino, Argakhtakh, Sasyr, Pobeda. Rebuilded Chersky, Srednekolymsk, Zyryanka and Ugolnye. Removed Batagay, Sangar, Segyan-Kyuyol",
      links: {
        primary: "https://sharemods.com/ki9ea53j2b5r/Far_East_Russia_Alpha_26.scs.html",
        changelog: ""
      }
    },
  ],

  rcs: {
    otgr: [
      {
        version: "v1.2",
        date: "2025-10-07",
        requires: ["FER Alpha 26/27", "ETS2 1.56", "OTGR current"],
        notes: "Updated version of FER–OTGR connector.",
        links: { 
          primary: "https://sharemods.com/g4fxrvtccpcz/FER_-_OTGR_RC.zip.html", 
          changelog: "#" 
        }
      }
    ],
    chukotka: [
      {
        version: "v1",
        date: "2025-10-07",
        requires: ["FER Alpha 26/27", "ETS2 1.56", "Chukotka current"],
        notes: "First release of FER–Chukotka connector.",
        links: { 
          primary: "https://sharemods.com/ccicwzilxntg/FER_-_CHUCHOTKA_RC.zip.html", 
          changelog: "#" 
        }
      }
    ],
    tst: [
      {
        version: "Soon",
        date: "TBD",
        requires: ["ETS2 1.56"],
        notes: "Planned release.",
        links: { primary: "#", changelog: "#" }
      }
    ]
  }
};

/* ==========================================================
   Sort releases automatically by date (latest first)
   ========================================================== */
if (window.RELEASES.fer && Array.isArray(window.RELEASES.fer)) {
  window.RELEASES.fer.sort(function(a, b) {
    // invalid or TBD dates -> send to the end
    if (a.date === "TBD") return 1;
    if (b.date === "TBD") return -1;
    return new Date(b.date) - new Date(a.date);
  });
}
