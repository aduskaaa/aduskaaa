/* ==========================================================
   Far East Russia (FER) – Versions Registry
   ----------------------------------------------------------
   This file defines all FER, RC, and Addon releases globally.
   Add new entries by appending to arrays below.
   ========================================================== */

window.RELEASES = {
  fer: [
     {
      version: "Alpha 30 Fix 1",
      date: "2026-02-16",
      size: "89.96MB",
      game: "ETS2 1.57/58",
      notes: "Fixed ghost sector in germany",
      links: {
        primary: "https://modsfire.com/apCPL49RgCsztQk",
        mirror1: "",
        changelog: ""
      }
    },
    {
      version: "Alpha 30",
      date: "2026-01-29",
      size: "91.8MB",
      game: "ETS2 1.57/58",
      notes: "Added roads: part of 98K-023 and some unnamed roads, Added villages: Megino-Aldan and Bedemyo, expanded Markha. Fixed a lot of bugs.",
      links: {
        primary: "https://modsfire.com/J2wzR3sp32f060d",
        mirror1: "",
        changelog: ""
      }
    },
    {
      version: "Alpha 29",
      date: "2026-01-01",
      size: "155.3MB",
      game: "ETS2 1.57",
      notes: "Added roads: part of 98K-023, Added villages: Ust-Kyuga, Added cities: Markha. Fixed bugs.",
      links: {
        primary: "https://modsfire.com/5q6zb7q0E3M7cLW",
        mirror1: "",
        changelog: ""
      }
    },
    {
      version: "Alpha 28",
      date: "2025-11-26",
      size: "153.7MB",
      game: "ETS2 1.57",
      notes: "Added roads: 98K-020 and 98K-025, Added villages: Khair, Vlasovom Kular, Severny, Nayba and Dzhebariki-Khaya, Added cities: Tiksi. For now accessible by ferry from Yakutsk to Tiksi. Fixed reported bugs.",
      links: {
        primary: "https://modsfire.com/YNIRmTvZJD0gz7i",
        mirror1: "https://sharemods.com/zb0rlc60hkhu/Far_East_Russia_Alpha_28.scs.html",
        changelog: ""
      }
    },
    {
      version: "Alpha 27",
      date: "2025-10-26",
      size: "112.3MB",
      game: "ETS2 1.56",
      notes: "Rebuilded part of P-504, Added Teply Klyuch, Rebuilded Khandyga",
      links: {
        primary: "https://sharemods.com/yv7l5hyjgunv/Far_East_Russia_Alpha_27.scs.html",
        mirror1: "#",
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
        mirror1: "#",
        changelog: ""
      }
    }
  ],

  rcs: {
    otgr: [
      {
        version: "v2",
        date: "2026-01-29",
        requires: ["FER Alpha 30", "ETS2 1.57/58", "OTGR current"],
        notes: "Updated version of FER–OTGR connector.",
        links: {
          primary: "https://modsfire.com/n4CW056z12Y8Pn4",
          mirror1: "",
          changelog: "#"
        }
      },
      {
        version: "v1",
        date: "2025-10-07",
        requires: ["FER Alpha 26/27/28", "ETS2 1.56/1.57", "OTGR current"],
        notes: "Updated version of FER–OTGR connector.",
        links: {
          primary: "https://modsfire.com/88V9BM7EFz0aS9Z",
          mirror1: "https://sharemods.com/g4fxrvtccpcz/FER_-_OTGR_RC.zip.html",
          changelog: "#"
        }
      }
    ],

    chukotka: [
      {
        version: "v2",
        date: "2025-12-13",
        requires: ["FER Alpha 29/30", "ETS2 1.56/1.57", "Chukotka current"],
        notes: "Second release of FER–Chukotka connector.",
        links: {
          primary: "https://modsfire.com/N57658b0RbX9ak6",
          mirror1: "#",
          changelog: "#"
        }
      },
      {
        version: "v1",
        date: "2025-10-07",
        requires: ["FER Alpha 26/27/28", "ETS2 1.56/1.57", "Chukotka current"],
        notes: "First release of FER–Chukotka connector.",
        links: {
          primary: "https://modsfire.com/OzQDsG22UV1G9Fx",
          mirror1: "https://sharemods.com/ccicwzilxntg/FER_-_CHUCHOTKA_RC.zip.html",
          changelog: "#"
        }
      }
    ],

    tst: [
      {
        version: "v3",
        date: "2026-01-29",
        requires: ["FER Alpha 30", "ETS2 1.57", "TST current"],
        notes: "Connects Far East Russia and Trans-Siberian Truckway.",
        links: {
          primary: "https://modsfire.com/vHSZ68e6IWJyGVq",
          mirror1: "#",
          changelog: "#"
        }
      },
      {
        version: "v2",
        date: "2025-12-13",
        requires: ["FER Alpha 28", "ETS2 1.57", "TST current"],
        notes: "Second release of FER–TST connector.",
        links: {
          primary: "https://modsfire.com/W7wV8Ygqfd1xaU9",
          mirror1: "#",
          changelog: "#"
        }
      },
      {
        version: "v1",
        date: "2025-12-01",
        requires: ["FER Alpha 28", "ETS2 1.57", "TST current"],
        notes: "First release of FER–TST connector.",
        links: {
          primary: "https://modsfire.com/fq1cs35OetM2JHA",
          mirror1: "https://sharemods.com/vpuxnq84bvr3/FER_-_TST_RC.scs.html",
          changelog: "#"
        }
      }
    ]
  },

  addons: {
    chukotka: [
      {
        version: "v1",
        date: "2025-12-13",
        requires: ["FER Alpha 28/29", "ETS2 1.57", "FER - Chukotka RC"],
        notes: "Addon for Chukotka region. Contains new cities, roads, and other content.",
        links: {
          primary: "https://modsfire.com/QBJLwa7DpEC6NCN",
          mirror1: "#",
          changelog: "#"
        }
      }
    ]
  }
};

/* ==========================================================
   Force EVERYTHING to be string (prevents "/" being treated
   as division anywhere later)
   ========================================================== */
function forceStrings(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(forceStrings);
    return;
  }

  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        forceStrings(obj[key]);
      } else {
        obj[key] = String(obj[key]);
      }
    }
  }
}

forceStrings(window.RELEASES);

/* ==========================================================
   Sort FER releases automatically by date (latest first)
   ========================================================== */
if (Array.isArray(window.RELEASES.fer)) {
  window.RELEASES.fer.sort((a, b) => {
    if (a.date === "TBD") return 1;
    if (b.date === "TBD") return -1;
    return new Date(b.date) - new Date(a.date);
  });
}
