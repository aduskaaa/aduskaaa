/* ==========================================================
   Far East Russia (FER) – Versions Registry
   ----------------------------------------------------------
   This file defines all FER, RC, and Addon releases globally.
   Add new entries by appending to arrays below.
   ========================================================== */

window.RELEASES = {
  fer: [
    {
      version: "V1",
      date: "2026-04-21",
      size: "65.7MB",
      game: "ETS2 1.58/1.59",
      notes: "Removed a lot of obsolete roads, Added: Deputatsky, Uolba, Uyandi, Belaya Gora, Bilibino, Anuisk, Suturuokha, Kolymskoye, Keperveyem, Added roads: 77K-003 (Anuisk -> Bilibino), 77K-004 (Bilibino -> Keperveyem), part of 77K-001 towards Pevek, Moved: 98N-002 to better position, part of river and avtodoroga indigir together with 98K-023 to better position, Expanded: 98K-023 by around 350km, 98K-006 by like 10km, P-504 more towards Nizhniy Bestiakh. Changed: properties of some Off-Road parts on 98K-006 scenery around road 98K-006 from Pobeda to Ugolnye, changed some offroads to not be that hard to pass and confusing",
      links: {
        primary: "https://modsfire.com/40IN0V42z79DryW",
        mirror1: "",
        changelog: ""
      }
    },
    {
      version: "LEGACY VERSIONS BELOW",
      date: "2026-03-17",
      size: "",
      game: "",
      notes: "",
      links: {
        primary: "",
        mirror1: "",
        changelog: ""
      }
    },
    {
      version: "Alpha 30 Fix 2",
      date: "2026-03-07",
      size: "89.26MB",
      game: "ETS2 1.57/58",
      notes: "Fixed models conflicting with Silesia",
      links: {
        primary: "https://modsfire.com/yUK582sifPu6mm0",
        mirror1: "",
        changelog: ""
      }
    },
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
        version: "v4.1",
        date: "2026-04-21",
        requires: ["FER V1", "ETS2 1.58/1.59", "OTGR current"],
        notes: "Updated version of FER–OTGR connector.",
        links: {
          primary: "https://modsfire.com/RgZ2jWAtV5t7VTN",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "LEGACY VERSIONS BELOW",
        date: "2026-03-17",
        size: "",
        game: "",
        notes: "",
        links: {
          primary: "",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "v2",
        date: "2026-01-29",
        requires: ["FER Alpha 30", "ETS2 1.57/58", "OTGR current"],
        notes: "Updated version of FER–OTGR connector.",
        links: {
          primary: "https://modsfire.com/n4CW056z12Y8Pn4",
          mirror1: "",
          changelog: ""
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
          changelog: ""
        }
      }
    ],

    chukotka: [
      {
        version: "LA v1",
        date: "2026-04-21",
        game: "ETS2 1.58/1.59",
        notes: "",
        links: {
          primary: "https://modsfire.com/lkOVR745zK0XW77",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "LEGACY VERSIONS BELOW",
        date: "2026-03-17",
        game: "",
        notes: "",
        links: {
          primary: "",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "v2",
        date: "2025-12-13",
        requires: ["FER Alpha 29/30", "ETS2 1.56/1.57", "Chukotka current"],
        notes: "Second release of FER–Chukotka connector.",
        links: {
          primary: "https://modsfire.com/N57658b0RbX9ak6",
          mirror1: "",
          changelog: ""
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
          changelog: ""
        }
      }
    ],

    tst: [
      {
        version: "v4",
        date: "2026-04-21",
        requires: ["FER V1", "ETS2 1.58/1.59", "TST current"],
        notes: "Connects Far East Russia and Trans-Siberian Truckway.",
        links: {
          primary: "https://modsfire.com/C4j04dUx4cBh3IF",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "LEGACY VERSIONS BELOW",
        date: "2026-03-17",
        size: "",
        game: "",
        notes: "",
        links: {
          primary: "",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "v3",
        date: "2026-01-29",
        requires: ["FER Alpha 30", "ETS2 1.57", "TST current"],
        notes: "Connects Far East Russia and Trans-Siberian Truckway.",
        links: {
          primary: "https://modsfire.com/vHSZ68e6IWJyGVq",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "v2",
        date: "2025-12-13",
        requires: ["FER Alpha 28", "ETS2 1.57", "TST current"],
        notes: "Second release of FER–TST connector.",
        links: {
          primary: "https://modsfire.com/W7wV8Ygqfd1xaU9",
          mirror1: "",
          changelog: ""
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
          changelog: ""
        }
      }
    ]
  },

  addons: {
    chukotka: [
      {
        version: "LA v1",
        date: "2026-04-21",
        requires: ["FER V1", "ETS2 1.58/1.59", "FER - CHKTLA RC"],
        notes: "Addon for Chukotka region. Contains Legacy areas.",
        links: {
          primary: "https://modsfire.com/QBJLwa7DpEC6NCN",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "LEGACY VERSIONS BELOW",
        date: "2026-03-17",
        requires: [""],
        notes: "",
        links: {
          primary: "",
          mirror1: "",
          changelog: ""
        }
      },
      {
        version: "v1",
        date: "2025-12-13",
        requires: ["FER Alpha 28/29", "ETS2 1.57", "FER - Chukotka RC"],
        notes: "Addon for Chukotka region. Contains new cities, roads, and other content.",
        links: {
          primary: "https://modsfire.com/QBJLwa7DpEC6NCN",
          mirror1: "",
          changelog: ""
        }
      }
    ],
    westYacutia: [
      {
        version: "v1",
        date: "Estimated release: end of May 2026",
        requires: ["FER v1", "ETS2 1.59", "FER - West Yacutia RC"],
        notes: "Addon for West Yacutia region. Contains new cities, roads, and other content.",
        links: {
          primary: "",
          mirror1: "",
          changelog: ""
        }
      }
    ],
    sakhaAddon: [
      {
        version: "v1",
        date: "2026-04-06",
        requires: ["FER Alpha 30 FIX 2 / V1", "ETS2 1.58"],
        notes: "Addon for Sakha region. Contains new cities, roads, and other content.",
        links: {
          primary: "https://truckymods.io/euro-truck-simulator-2/maps/sakha-add-on-337044",
          mirror1: "",
          changelog: ""
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
