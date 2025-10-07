/* Global releases registry for FER and RCs. Add new entries by appending to arrays below. */
window.RELEASES = {
  fer: [
    {
      version: "Alpha 26",
      date: "2025-10-20",
      size: "104MB",
      game: "ETS2 1.56",
      notes: "Rebuilded 98K-006, Added Nalimsk, Andryushkino, Argakhtakh, Sasyr, Pobeda. Rebuilded Chersky, Srednekolymsk, Zyryanka and Ugolnye. Removed Batagay, Sangar, Segyan-Kyuyol",
      links: {
        primary: "",
        changelog: ""
      }
    },
  ],
  rcs: {
    otgr: [
      {
        version: "v2",
        date: "2025-10-01",
        requires: ["FER Alpha 26", "ETS2 1.56", "OTGR current"],
        notes: "updated version of FER–OTGR connector.",
        links: { primary: "#", changelog: "#" }
      }
    ],
    chukotka: [
      {
        version: "v1",
        date: "2025-10-01",
        requires: ["FER Alpha 26", "ETS2 1.56", "Chukotka current"],
        notes: "firts release of  FER–Chukotka connector.",
        links: { primary: "#", changelog: "#" }
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
