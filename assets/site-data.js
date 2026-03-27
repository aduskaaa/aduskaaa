/* ==========================================================
   Far East Russia – Shared Site Data
   ----------------------------------------------------------
   Central data store for content used across multiple pages.
   Edit nav links, footer, load order, descriptions etc. here.
   ========================================================== */

window.SITE = {

  /* ---------- Global links ---------- */
  discordUrl: "https://discord.gg/SSWDJMauxz",
  paypalUrl: "https://paypal.me/aduskaaaa",

  /* ---------- Navigation ---------- */
  nav: [
    { label: "HOME", href: "index.html" },
    { label: "FER", href: "fer.html" },
    { label: "MAP", href: "interactive-map.html" },
    { label: "ADDONS", href: "index.html#addons" },
    { label: "RCS", href: "index.html#rcs" },
    { label: "GALLERY", href: "gallery.html" },
    { label: "VERSIONS", href: "versions.html" },
    { label: "SUPPORT", href: "support.html" }
  ],

  /* ---------- Footer links ---------- */
  footer: [
    { label: "Home", href: "index.html" },
    { label: "FER", href: "fer.html" },
    { label: "Map", href: "interactive-map.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Versions", href: "versions.html" },
    { label: "StreetView", href: "streetview.html" },
    { label: "Support", href: "support.html" }
  ],

  /* ---------- Load Order (shared across FER, RC, addon pages) ---------- */
  loadOrder: [
    "Background map (recommended)",
    "FER – Chukotka RC",
    "FER – OTGR RC",
    "FER – TST RC",
    "Chukotka Addon Legacy Areas",
    "Far East Russia",
    "Trans-Siberian Truckway",
    "Off The Grid Russia"
  ],

  /* ---------- Page content ---------- */
  pages: {

    fer: {
      title: "Far East Russia (FER)",
      tagline: "The core ETS2 map expansion covering Russia's Far Eastern Federal District — from the frozen tundra of Yakutia to the Kolyma Highway.",
      description: "Far East Russia is a massive, hand-crafted map mod for Euro Truck Simulator 2 that brings the raw, untamed beauty of Russia's Far Eastern Federal District to life. Spanning thousands of kilometers of driveable roads, FER takes you through some of the most remote and extreme terrain on Earth — from the permafrost-covered highways of Yakutia to the legendary 'Road of Bones' along the Kolyma route. Every city, village, and roadside stop is built from scratch using satellite imagery and real-world reference photos, ensuring an authentic representation of this vast, sparsely populated region. The roads range from well-maintained federal highways to treacherous dirt tracks that test both your driving skill and your truck's durability. River crossings via ferry, seasonal road conditions, and realistic signage all contribute to an immersive experience that captures what it truly feels like to haul freight across one of the most isolated corners of the world. FER is optimized for performance and stability, making it suitable for both single-player hauling sessions and multiplayer convoys.",
      features: [
        { icon: "🗺️", title: "7,000+ km of Roads", text: "Federal highways, regional roads, and unnamed dirt tracks — all hand-crafted with realistic geometry and signage." },
        { icon: "🏘️", title: "40+ Cities & Settlements", text: "From major cities like Yakutsk to tiny remote villages accessible only by unpaved roads or river ferry." },
        { icon: "⛴️", title: "River Ferries", text: "Cross mighty Siberian rivers aboard realistic ferry services — some routes are only accessible by water." },
        { icon: "🏔️", title: "Extreme Terrain", text: "Winter roads but in summer, mountain passes, river fords, and seasonal conditions create challenging driving experiences." },
        { icon: "⚡", title: "Optimized Performance", text: "Carefully optimized assets and map sectors ensure smooth performance even on mid-range hardware." },
        { icon: "🔄", title: "Regular Updates", text: "Active development with new cities, roads, and improvements added in every release." }
      ],
      stats: [
        { value: "7,000+", label: "km of driveable roads" },
        { value: "40+", label: "cities & settlements" },
        { value: "V1", label: "SOON" },
        { value: "1.58", label: "ETS2 version supported" }
      ],
      installSteps: [
        "Download the latest FER release from the download section below.",
        "Place the <code>.scs</code> file in your ETS2 mod folder (<code>Documents/Euro Truck Simulator 2/mod</code>).",
        "Enable the mod in ETS2's Mod Manager.",
        "Follow the load order shown below — place FER and any RCs/addons in the correct priority.",
        "Start a new profile or load an existing one and drive east!"
      ]
    },

    ferOtgr: {
      title: "FER – OTGR Road Connection",
      tagline: "Seamlessly connect Far East Russia with Off The Grid Russia and unlock vast new routes across Siberia.",
      description: "The FER – OTGR Road Connection is an essential bridge mod that links two of the most ambitious Russian map projects for Euro Truck Simulator 2: Far East Russia (FER) and Off The Grid Russia (OTGR). Without this connector, the two maps exist as separate islands — with it, you gain access to continuous routes stretching thousands of kilometers across Siberia's remote interior. The road connection carefully aligns terrain, road geometry, and map sectors between both mods, ensuring seamless transitions without visual glitches or terrain gaps. Whether you're planning a cross-Siberian convoy or just want to haul freight between Yakutia and the OTGR region, this RC makes it possible. The connector is lightweight, adds minimal file size, and is updated alongside major FER releases to maintain compatibility.",
      requirements: [
        "Far East Russia (latest version)",
        "Off The Grid Russia (latest version)",
        "ETS2 1.57 or newer"
      ]
    },

    ferChukotka: {
      title: "FER – Chukotka Road Connection",
      tagline: "Bridge Far East Russia and the Chukotka region for uninterrupted eastern exploration.",
      description: "The FER – Chukotka Road Connection links the Far East Russia core map with the Chukotka addon region, creating a continuous road network that extends deep into Russia's northeastern frontier. The Chukotka peninsula — famous for being the easternmost point of the Eurasian continent — is one of the most remote and least populated areas on Earth. This connector ensures that the transition between FER's Yakutian roads and Chukotka's frozen highways is smooth and geographically accurate. Road alignments, terrain elevation, and vegetation zones all blend naturally across the connection point. Install this RC alongside both FER and the Chukotka Addon to unlock the full eastern expansion.",
      requirements: [
        "Far East Russia (latest version)",
        "Chukotka Addon (latest version)",
        "ETS2 1.57 or newer"
      ]
    },

    ferTst: {
      title: "FER – TST Road Connection",
      tagline: "Connect Far East Russia with the Trans-Siberian Truckway for the ultimate cross-Russia route.",
      description: "The FER – TST Road Connection is the gateway to one of the longest continuous trucking routes in ETS2 modding. By linking Far East Russia with the Trans-Siberian Truckway (TST), this connector lets you drive from the heart of Siberia all the way to the Russian Far East without interruption. The Trans-Siberian Truckway covers the legendary federal highway system that spans Russia from west to east, and this RC picks up where TST ends, continuing the journey into FER's Yakutian territory. The connection is carefully calibrated to match road widths, terrain textures, and elevation data at the boundary, providing a seamless driving experience across both maps. This is a must-have for players who want the ultimate long-haul experience across Russia.",
      requirements: [
        "Far East Russia (latest version)",
        "Trans-Siberian Truckway (latest version)",
        "ETS2 1.57 or newer"
      ]
    },

    chukotkaAddon: {
      title: "Chukotka Addon Legacy Areas",
      tagline: "Explore the Chukotsky Autonomous Okrug — the easternmost edge of Russia and the entire Eurasian continent.",
      description: "The Chukotka Addon is a legacy expansion for Far East Russia that adds the Chukotsky Autonomous Okrug region to your ETS2 world. Chukotka is one of the most extreme and isolated places on the planet — a land of permafrost tundra, volcanic mountains, and Arctic coastline where temperatures can plunge below -50°C. This addon brings nothing from this, horrible landscape to ETS2 with horrible cities, remote outposts, and roads that are always the same even the most experienced virtual truckers will feel boredom. The region features unique shit types not found elsewhere in FER, including coastal shitty roads, frozen river crossings, and shitty mountain passes with shitty views. Every settlement is built using i have no fckin idea what reference materials to capture the authentic character of this rarely-depicted corner of Russia.",
      features: [
        { icon: "🏘️", title: "Settlements", text: "settlements in horrible quality." },
        { icon: "🛣️", title: "Same road", text: "tbh, its all the same road." },
        { icon: "🔗", title: "Seamless Integration", text: "Works with FER and the Chukotka RC for a continuous map experience." }
      ],
      requirements: [
        "Far East Russia (latest version)",
        "Trans-Siberian Truckway (latest version)",
        "FER – Chukotka RC (for road connection)",
        "ETS2 1.57 or newer"
      ]
    }
  },

  /* ---------- FAQ ---------- */
  faq: [
    {
      q: "Where do I download the main FER map?",
      a: "Use the dedicated <a href='fer.html'>FER page</a> for downloads and install guide."
    },
    {
      q: "Are Road Connections (RCs) required?",
      a: "No. RCs are optional connectors to other maps. Only install the ones for maps you actually use."
    },
    {
      q: "What is the correct load order?",
      a: "Place RCs above the main maps, with FER below them. Check the Load Order section on any download page for the exact order."
    },
    {
      q: "Is FER compatible with ProMods or other map mods?",
      a: "FER is designed for standalone use or with its official RCs (OTGR, TST, Chukotka). Compatibility with other major map mods is not guaranteed."
    },
    {
      q: "How often is FER updated?",
      a: "FER receives regular updates — typically every few weeks — adding new roads, cities, and bug fixes."
    },
    {
      q: "I found a bug or visual glitch. How do I report it?",
      a: "Join the <a href='https://discord.gg/SSWDJMauxz' target='_blank'>Discord server</a> and report it in the bug reports channel."
    }
  ],

  /* ---------- Supporters ---------- */
  supporters: {
    donations: [
      { name: "laur1sxd", amount: "40,42 EUR" },
      { name: "Artie", amount: "4,11 EUR" },
      { name: "Delby", amount: "3,51 EUR" }
    ],
    showcase: [
      { name: "Bogdac", text: "Created many awesome videos from this map & included it in combos" },
      { name: "GMC Community", text: "Sharing news from Far East Russia on their Discord and featuring it in map combos" },
      { name: "Semir Gaming", text: "Streams from far east russia" }
    ]
  }
};
