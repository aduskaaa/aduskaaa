/* ==========================================================
   Far East Russia (FER) – Versions Registry
   ----------------------------------------------------------
   This file defines all FER, RC, and Addon releases globally.
   Add new entries by appending to arrays below.
   ========================================================== */

window.RELEASES = {
  fer: [
   {
      version: "Alpha 28",
      date: "2025-11-26", // ISO format YYYY-MM-DD
      size: "153.7MB",
      game: "ETS2 1.57",
      notes: "Added roads: 98K-020 and 98K-025, Added villages: Khair, Vlasovom Kular, Severny, Nayba and Dzhebariki-Khaya, Added cities: Tiksi. for now accesible by ferry from Yakutsk to Tiksi, fixed reported bugs. ",
      links: {
        primary: "https://sharemods.com/zb0rlc60hkhu/Far_East_Russia_Alpha_28.scs.html",
        changelog: ""
      }
    },
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
        requires: ["FER Alpha 26/27", "ETS2 1.56/1.57", "OTGR current"],
        notes: "Updated version of FER–OTGR connector.",
        links: { 
          primary: "https://sharemods.com/g4fxrvtccpcz/FER_-_OTGR_RC.zip.html", 
          changelog: "#" 
        }
      }
    ],
    chukotka: [
       {
        version: "v2",
        date: "2025-12-13",
        requires: ["FER Alpha 28", "ETS2 1.56/1.57", "Chukotka current"],
        notes: "Seccond release of FER–Chukotka connector.",
        links: {
          primary: "https://modsfire.com/N57658b0RbX9ak6",
          mirror1: "#",
          changelog: "#"
        }
      },
      {
        version: "v1",
        date: "2025-10-07",
        requires: ["FER Alpha 26/27", "ETS2 1.56/1.57", "Chukotka current"],
        notes: "First release of FER–Chukotka connector.",
        links: { 
          primary: "https://sharemods.com/ccicwzilxntg/FER_-_CHUCHOTKA_RC.zip.html", 
          changelog: "#" 
        }
      }
    ],
    tst: [
            {
        version: "v2",
        date: "2025-12-13",
        requires: ["FER Alpha 28", "ETS2 1.57", "TST current"],
        notes: "Seccond of FER–TST connector. Connects Far East Russia and Trans-Siberian Truckway.",
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
        notes: "First release of FER–TST connector. Connects Far East Russia and Trans-Siberian Truckway.",
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
          primary: "https://modsfire.com/5ECKRz17FV1122W",
          mirror1: "#",
          changelog: "#"
        }
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
