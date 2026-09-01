/* ==========================================================
   Far East Russia – i18n (EN / RU)
   ----------------------------------------------------------
   - Stores all translatable strings for the site
   - Shows a language picker on first visit
   - Renders an EN | RU switch in the top-right of the header
   - Applies translations to elements with data-i18n /
     data-i18n-html / data-i18n-attr attributes
   ========================================================== */

(function () {
  var STORAGE_KEY = "site_lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = ["en", "ru"];

  /* ---------- Dictionaries ---------- */
  var dict = {
    en: {
      /* meta */
      "meta.title": "Far East Russia – ETS2 Map Mod",
      "meta.description":
        "Far East Russia is a free fan-made ETS2 map mod: 5,900+ km of roads across Yakutia and Chukotka, built by hand from real-world references.",
      "meta.titleAddonsRcs": "Addons & Road Connections • Far East Russia",
      "meta.descriptionAddonsRcs":
        "All addons and Road Connections (RCs) for Far East Russia in one place. Extend the map across Siberia.",
      "addonsRcsPage.h1": "Addons & Road Connections",
      "addonsRcsPage.lead":
        "Everything that extends FER lives here: regional addons that grow the map, and Road Connections that plug it into other big map mods.",

      /* nav */
      "nav.HOME": "HOME",
      "nav.FER": "FER",
      "nav.MAP": "MAP",
      "nav.COMBOMAP": "COMBO MAP",
      "nav.ADDONS": "ADDONS",
      "nav.RCS": "RCS",
      "nav.ADDONS_RCS": "ADDONS/RCS",
      "nav.GALLERY": "GALLERY",
      "nav.VERSIONS": "VERSIONS",
      "nav.LOADORDER": "LOAD ORDER",
      "nav.SUPPORT": "SUPPORT",
      "nav.DISCORD": "DISCORD",
      "nav.VK": "VK",

      /* footer */
      "footer.Home": "Home",
      "footer.FER": "FER",
      "footer.Map": "Map",
      "footer.Gallery": "Gallery",
      "footer.Versions": "Versions",
      "footer.Load Order": "Load Order",
      "footer.Support": "Support",
      "footer.copy": "Far East Russia · ETS2 Map Mod",
      "footer.made": "Built by aduskaaa & the community",
      "footer.Privacy & Policy": "Privacy & Policy",

      /* closing cta (index) */
      "cta.h2": "Ready to drive east?",
      "cta.lead": "Grab the latest release, set your load order, and don't forget fuel cans. See you on the Kolyma.",

      /* page eyebrows */
      "eyebrow.fer": "The core map",
      "eyebrow.rc": "Road connection",
      "eyebrow.addon": "Regional addon",
      "eyebrow.extensions": "Extensions",
      "eyebrow.changelog": "Changelog",
      "eyebrow.support": "Keep it alive",

      /* hero */
      "hero.eyebrow": "Free & fan-made ETS2 map mod",
      "hero.h1": "Drive where the maps end.",
      "hero.p":
        "FER is a free map mod for Euro Truck Simulator 2 that covers Yakutia and the far north-east with 5,900+ km of roads. I build every city and dirt track by hand from satellite images, photos and dashcam footage. Fair warning: some of these roads are rough. That's kind of the point.",
      "hero.cta_download": "Download FER",
      "hero.cta_explore": "Explore RCs",
      "hero.cta_support": "Support",

      /* ticker */
      "ticker.km": "km of roads",
      "ticker.cities": "cities & settlements",
      "ticker.ver": "ETS2 ready",
      "ticker.price": "0€",
      "ticker.free": "free, no paywalls",
      "hero.badge1": "Still growing",
      "hero.badge2": "Runs on mid-range PCs",
      "hero.badge3": "ETS2 1.60 ready",

      /* features */
      "features.eyebrow": "The map",
      "features.h2": "What's Inside",
      "features.lead":
        "No two drives here feel the same. One day you're cruising a wide federal highway, the next you're fording a river with a full trailer.",
      "features.c1.title": "Real Cities, Small Towns",
      "features.c1.text":
        "Every location starts as a blank map and a pile of references: satellite shots, panoramas, photos people send me from the region. Road layouts, signs, buildings — if it's there in real life, I try to get it right in game.",
      "features.c2.title": "Roads With Character",
      "features.c2.text":
        "Winter roads that never melt, mountain passes, river ferries, and long lonely stretches between settlements. If you want a relaxing cruise, stick to the federal highways.",
      "features.c3.title": "It Runs Well",
      "features.c3.text":
        "I test every release on a mid-range PC before publishing. Sectors are optimized, so even big convoys stay smooth, in singleplayer and multiplayer both.",

      /* author note (index) */
      "about.eyebrow": "From the author",
      "about.h2": "A Few Words From the Author",
      "about.text":
        "Hi, I'm aduskaaa, the person behind FER. This started because I got tired of hauling freight through crowded European highways and wanted to drive somewhere properly empty instead. Now the map covers most of Yakutia and is creeping toward Chukotka, and the list of things I still want to add keeps getting longer. Everything here is free. If you enjoy the map, or something breaks, come say hi on Discord. I read everything.",

      /* map */
      "map.eyebrow": "Coverage",
      "map.h2": "Where the Map Goes",
      "map.lead":
        "Rough outline of the covered area below. For streets, cities and road names, open the interactive map.",
      "map.open": "Open Interactive Map",
      "map.alt": "Preview of the Far East Russia map region",
      "map.caption": "Coverage sketch from the latest build.",
      "map.stat1": "of driveable roads",
      "map.stat2": "detailed cities and settlements",
      "map.stat3": "ETS2 version supported",

      /* addons */
      "addons.h2": "Addons",
      "addons.lead":
        "Expand your Far East Russia experience with additional content and regions.",
      "addons.chukotka.title": "Chukotka Addon",
      "addons.chukotka.desc":
        "Explore the Chukotsky Autonomous Okrug — the easternmost edge of Russia. New cities, Arctic terrain, and remote routes through one of the most isolated regions on Earth.",
      "addons.west.title": "West Yacutia Addon",
      "addons.west.desc":
        "Explore the Western Yacutia — Go to explore interesting area behind Lena river.",
      "addons.sakha.title": "Sakha Addon",
      "addons.sakha.desc": "Explore the Oymyakon area – the coldest place on Earth.",
      "addons.openPage": "Open Page",
      "addons.openPage.truckymods": "Open Page - Truckymods.io",
      "addons.openPage.nachorio": "Open Page - Nachoriosmods.es",
      "addons.download": "Download",
      "addons.downloadTrucky": "Download",

      /* rcs */
      "rcs.h2": "Road Connections (RCs)",
      "rcs.lead":
        "RCs link FER with other map mods so routes stay continuous instead of dead-ending at the border. Only install the ones for maps you actually use.",
      "rcs.ferOtgr.title": "FER – OTGR",
      "rcs.ferOtgr.desc":
        "Connects Far East Russia with Off The Grid Russia, unlocking continuous routes across Siberia's vast interior.",
      "rcs.ferChukotka.title": "FER – Chukotka",
      "rcs.ferChukotka.desc":
        "Bridges FER and the Chukotka Addon for uninterrupted access to Russia's northeastern frontier.",
      "rcs.ferTst.title": "FER – TST",
      "rcs.ferTst.desc":
        "Connects FER with the Trans-Siberian Truckway for the ultimate cross-Russia long-haul route.",
      "rcs.openPage": "Open Page",
      "rcs.download": "Download",

      /* supporters */
      "supporters.eyebrow": "Credits",
      "supporters.h2": "Supporters",
      "supporters.lead": "Big thanks to everyone who keeps this project going.",
      "supporters.donations": "Donations:",
      "supporters.showcase": "Showcase:",
      "supporters.seeHow": "See How to Support",
      "supporters.joinDiscord": "Join Discord",
      "supporters.showcase.bogdac":
        "Created many awesome videos from this map & included it in combos",
      "supporters.showcase.gmc":
        "Sharing news from Far East Russia on their Discord and featuring it in map combos",
      "supporters.showcase.semir": "Streams from Far East Russia",
      "supporters.showcase.vikingo": "Made V2 showcase",

      /* faq */
      "faq.h2": "FAQ",
      "faq.q1": "Where do I download the main FER map?",
      "faq.a1":
        "Use the dedicated <a href='fer.html'>FER page</a> for downloads and install guide.",
      "faq.q2": "Are Road Connections (RCs) required?",
      "faq.a2":
        "No. RCs are optional connectors to other maps. Only install the ones for maps you actually use.",
      "faq.q3": "What is the correct load order?",
      "faq.a3":
        "Place RCs above the main maps, with FER below them. Check the Load Order section on any download page for the exact order.",
      "faq.q4": "Is FER compatible with ProMods or other map mods?",
      "faq.a4":
        "FER is meant to run standalone or with its official RCs (OTGR, TST, Chukotka). Mixing it with other big map mods usually ends in tears, so I can't promise it'll work.",
      "faq.q5": "How often is FER updated?",
      "faq.a5":
        "Every few weeks or so, whenever a chunk of work is done. Sometimes it's bug fixes, sometimes a whole new area.",
      "faq.q6": "I found a bug or visual glitch. How do I report it?",
      "faq.a6":
        "Join the <a href='https://discord.gg/SSWDJMauxz' target='_blank'>Discord server</a> and report it in the bug reports channel.",

      /* picker */
      "picker.title": "Choose your language",
      "picker.subtitle":
        "You can change it later via the EN | RU switch in the top-right corner.",
      "picker.btn_en": "English",
      "picker.btn_ru": "Русский",

      /* shared section headings */
      "common.latestRelease": "Latest Release",
      "common.quickStats": "Quick Stats",
      "common.downloads": "Downloads",
      "common.aboutTheMap": "About the Map",
      "common.aboutThisAddon": "About This Addon",
      "common.aboutThisRc": "About This Road Connection",
      "common.requirements": "Requirements",
      "common.whatsIncluded": "What's Included",
      "common.installationGuide": "Installation Guide",
      "common.loadOrder": "Load Order",
      "common.officialLink": "Official Link",
      "common.loadOrderHint":
        "Place mods in your ETS2 Mod Manager in this priority (top = highest priority):",
      "common.loadOrderHintShort":
        "Place mods in this priority (top = highest):",
      "common.allReleases": "All Releases",
      "common.discussion": "Discussion",
      "common.signIn": "Sign In",
      "common.signUp": "Sign Up",
      "common.signInOrSignUp": "Sign In / Sign Up",
      "common.signOut": "Log Out",
      "common.username": "Username",
      "common.password": "Password",
      "common.confirmPassword": "Confirm Password",
      "common.dontHaveAccount": "Don't have an account?",
      "common.alreadyHaveAccount": "Already have an account?",
      "common.submit": "Submit",
      "common.submitting": "Submitting...",
      "common.signedInAs": "Signed in as ",
      "common.notes": "Notes",
      "common.mapCoverage": "Map Coverage",
      "common.mapCoveragePreviewAlt": "Map coverage preview",
      "common.download": "Download",
      "common.mirror": "Mirror",

      /* discord widget */
      "discord.channelName": "#latest-announcements",
      "discord.liveFeed": "LIVE FEED",
      "discord.connecting": "Connecting to Discord feed...",
      "discord.join": "Join Our Discord",
      "discord.error": "Failed to load latest updates. <br>Join our server directly on Discord to stay tuned!",

      /* fer.html – map coverage bullet list */
      "fer.coverage1": "5,900+ km of driveable roads across the Far Eastern Federal District",
      "fer.coverage2": "50+ detailed cities, towns, and remote settlements",
      "fer.coverage3": "River ferry crossings connecting isolated regions",
      "fer.coverage4": "Federal highways, regional roads, and unnamed dirt tracks",
      "fer.coverage5": "Continuous expansion with every release",

      /* addon notes */
      "addonNotes.requiresFer": "Requires Far East Russia to function",
      "addonNotes.requiresChukotkaRc": "Requires FER – Chukotka RC for the road connection",
      "addonNotes.placeAbove": "Place the addon above Far East Russia in the Mod Manager",
      "addonNotes.report": "Report issues via",

      /* rc notes */
      "rcNotes.placeAbove": "Place the RC above both main maps in the Mod Manager",
      "rcNotes.onlyInstall.otgr": "Only install if you use both FER and OTGR",
      "rcNotes.onlyInstall.chukotka": "Only install if you use both FER and the Chukotka Addon",
      "rcNotes.onlyInstall.tst": "Only install if you use both FER and TST",
      "rcNotes.syncedReleases": "Updated in sync with major FER releases",
      "rcNotes.report": "Report issues via",

      /* support page */
      "supportPage.h1": "Support FER",
      "supportPage.lead":
        "FER is free and will stay free. It's one person building roads in the hours left over after work, and a community keeping it alive with feedback, photos and donations. Here's how you can help.",
      "supportPage.joinDiscord": "Join Discord",
      "supportPage.donatePaypal": "Donate via PayPal",
      "supportPage.donatePatreon": "Support on Patreon",
      "supportPage.waysH2": "Ways to Support",
      "supportPage.waysLead": "Pick whatever suits you. Or don't, and just drive.",
      "supportPage.way1.title": "Chip In Financially",
      "supportPage.way1.text":
        "Mapping takes time, and time is the one thing this project runs out of fastest. Donations literally buy hours of development. Patreon or PayPal, whichever you prefer. And if you can't chip in, that's fine too. Playing and reporting bugs helps just as much. Find me on <a href='https://www.patreon.com/c/Far_East_Russia' target='_blank' style='color:var(--text-bright)'>Patreon</a> or <a href='https://paypal.me/aduskaaaa' target='_blank' style='color:var(--text-bright)'>PayPal</a>.",
      "supportPage.way2.title": "Send Reference Material",
      "supportPage.way2.text":
        "Live in Yakutia or somewhere out east? Your photos and dashcam clips are gold. Real streets, real signs, real bus stops, that's what makes cities here recognizable. Drop them in the <a href='https://discord.gg/SSWDJMauxz' target='_blank' style='color:var(--text-bright)'>Discord</a>.",
      "supportPage.way3.title": "Spread the Word",
      "supportPage.way3.text":
        "Stream a convoy, post screenshots, make a video, tell a friend. Word of mouth is the only marketing this map has ever had, and it works.",
      "supportPage.whereH2": "Where Your Support Goes",
      "supportPage.whereLead":
        "<strong>Development time.</strong> More hours at the editor means new cities and roads sooner. Simple as that.",

      /* gallery page */
      "galleryPage.h1": "Gallery",
      "galleryPage.lead":
        "Screenshots from testers and community drivers exploring the Far East. Click any image to view it full-size.",

      /* versions page */
      "versionsPage.h1": "Versions",
      "versionsPage.lead":
        "Every public release of FER, the RCs and the addons, newest first. Handy if you're after a changelog or an older build.",
      "versionsPage.ferReleases": "FER Releases",
      "versionsPage.addons": "Addons",

      "loadorderPage.title": "Load Order • Far East Russia",
      "loadorderPage.metaDesc": "Correct load order for Far East Russia, RCs and addons in ETS2 Mod Manager.",
      "loadorderPage.eyebrow": "Setup",
      "loadorderPage.h1": "Load Order",
      "loadorderPage.lead": "Place mods in your ETS2 Mod Manager in this priority — top = highest priority. Higher entries override lower ones.",
      "loadorderPage.tip": "Tip: If you don't use a map, skip its RC. Only enable RCs for maps you actually have.",

      /* interactive map */
      "mapPage.pageTitle": "Interactive Map • Far East Russia",
      "mapPage.metaDesc": "High-precision interactive map viewer for the Far East Russia ETS2 map mod.",
      "mapPage.eyebrow": "Explore",
      "mapPage.h1": "Interactive Map",
      "mapPage.lead": "High-precision map viewer for Far East Russia. Pan, zoom, inspect road sectors, toggle terrain background, and view community street view captures.",
      "mapPage.title": "INTERACTIVE MAP",
      "mapPage.subtitle": "Far East Russia • Map Version 1",
      "mapPage.loading": "SYNCHRONIZING MAP SECTORS...",
      "mapPage.coords": "Map Coordinates",
      "mapPage.approxDisclaimer": "Approximate location",
      "mapPage.copy": "Copy to Clipboard",
      "mapPage.copied": "COPIED!",
      "mapPage.userPhotos": "User Photos",
      "mapPage.roadNames": "Road Names",
      "mapPage.background": "Background Image",
      "mapPage.streetView": "Street View",
      "mapPage.rightClickHint": "Right-click to get coordinates",
      "mapPage.svTitle": "Far East Russia Street View",
      "mapPage.datasetVersion": "Version",
      "mapPage.version1": "Web Map Version 1",
      "mapPage.version2": "Web Map Version 2",
      "mapPage.subtitleV1": "Far East Russia • Map Version 1",
      "mapPage.subtitleV2": "Far East Russia • Map Version 2",
      "mapPage.fullscreen": "Fullscreen",
      "mapPage.exitFullscreen": "Exit Fullscreen",
      "mapPage.aboutTitle": "About the Map Viewer",
      "mapPage.aboutText": "This interactive map is generated directly from in-game ETS2 map sectors and calibrated against real-world WGS84 coordinates. It includes the official ETS2 Global Background Map terrain layer, road sectors, prefab intersections, city hubs, and community Street View captures.",
      "mapPage.controlsTitle": "Controls & Shortcuts",
      "mapPage.ctrlPan": "Left-click + drag to pan around the map",
      "mapPage.ctrlZoom": "Mouse wheel or trackpad pinch to zoom in and out",
      "mapPage.ctrlCoords": "Right-click anywhere to inspect and copy precise coordinates",
      "mapPage.ctrlSv": "Click any blue Street View line to launch high-res road photos",
      "mapPage.legendTitle": "Legend",
      "mapPage.tierRoads": "Roads",
      "mapPage.tierSecret": "Secret Tracks",
      "mapPage.tierFerry": "Ferry Crossing",
      "mapPage.tierStreetview": "Street View"
    },

    ru: {
      "meta.titleAddonsRcs": "Дополнения и Дорожные соединения • Far East Russia",
      "meta.descriptionAddonsRcs":
        "Все дополнения и Дорожные соединения (RCs) для Far East Russia в одном месте. Расширьте карту по Сибири.",
      "addonsRcsPage.h1": "Дополнения и Дорожные соединения",
      "addonsRcsPage.lead":
        "Здесь живёт всё, что расширяет FER: региональные дополнения, которые растят карту, и Дорожные соединения, которые подключают её к другим крупным модам.",
      "meta.title": "Far East Russia – мод карты для ETS2",
      "meta.description":
        "Far East Russia — бесплатный фанатский мод карты для ETS2: более 5 900 км дорог по Якутии и Чукотке, построенных вручную по реальным данным.",

      "nav.HOME": "ГЛАВНАЯ",
      "nav.FER": "FER",
      "nav.MAP": "КАРТА",
      "nav.COMBOMAP": "КАРТА КОМБО",
      "nav.ADDONS": "ДОПОЛНЕНИЯ",
      "nav.RCS": "RCS",
      "nav.ADDONS_RCS": "ДОПОЛНЕНИЯ/RCS",
      "nav.GALLERY": "ГАЛЕРЕЯ",
      "nav.VERSIONS": "ВЕРСИИ",
      "nav.LOADORDER": "ПОРЯДОК ЗАГРУЗКИ",
      "nav.SUPPORT": "ПОДДЕРЖКА",
      "nav.DISCORD": "DISCORD",
      "nav.VK": "VK",

      "footer.Home": "Главная",
      "footer.FER": "FER",
      "footer.Map": "Карта",
      "footer.Gallery": "Галерея",
      "footer.Versions": "Версии",
      "footer.Load Order": "Порядок загрузки",
      "footer.Support": "Поддержка",
      "footer.copy": "Far East Russia · мод карты для ETS2",
      "footer.made": "Сделано aduskaaa и сообществом",
      "footer.Privacy & Policy": "Privacy & Policy",

      "hero.eyebrow": "Бесплатный фанатский мод карты для ETS2",
      "hero.h1": "Езжайте туда, где заканчиваются карты.",
      "hero.p":
        "FER — бесплатный мод карты для Euro Truck Simulator 2, покрывающий Якутию и северо-восток более чем 5 900 км дорог. Каждый город и каждую грунтовку я строю вручную по спутниковым снимкам, фотографиям и видео с регистраторов. Честно предупреждаю: часть дорог здесь тяжёлая. В этом и смысл.",
      "hero.cta_download": "Скачать FER",
      "hero.cta_explore": "Изучить RCs",
      "hero.cta_support": "Поддержать",

      "ticker.km": "км дорог",
      "ticker.cities": "городов и посёлков",
      "ticker.ver": "готов к ETS2",
      "ticker.price": "0₽",
      "ticker.free": "бесплатно, без пейволлов",

      "features.eyebrow": "Карта",
      "features.h2": "Что внутри",
      "features.lead":
        "Здесь не бывает двух одинаковых поездок. Сегодня ты летишь по широкой федеральной трассе, а завтра лезешь через брод с полным прицепом.",
      "features.c1.title": "Настоящие города и посёлки",
      "features.c1.text":
        "Каждая локация начинается с чистой карты и стопки референсов: спутниковые снимки, панорамы, фото, которые присылают люди из региона. Геометрия дорог, указатели, здания — если это есть в реальности, я стараюсь перенести это в игру.",
      "features.c2.title": "Дороги с характером",
      "features.c2.text":
        "Зимники, которые не тают даже летом, горные перевалы, речные паромы и долгие перегоны без единого населённого пункта. Хотите спокойную езду — держитесь федеральных трасс.",
      "features.c3.title": "Работает быстро",
      "features.c3.text":
        "Перед публикацией я тестирую каждый релиз на среднем ПК. Секторы оптимизированы, так что даже большие конвои идут плавно. И в одиночной игре, и в мультиплеере.",

      "about.eyebrow": "От автора",
      "about.h2": "Пара слов от автора",
      "about.text":
        "Привет! Я aduskaaa, человек за FER. Всё началось с того, что мне надоело возить грузы по забитым европейским трассам, и захотелось ехать туда, где по-настоящему пусто. Сейчас карта покрывает почти всю Якутию и потихоньку ползёт к Чукотке, а список того, что хочется добавить, только растёт. Всё здесь бесплатно. Если карта нравится или что-то сломалось — заходите в Discord, я читаю всё.",

      "map.eyebrow": "Охват",
      "map.h2": "Куда идёт карта",
      "map.lead":
        "Ниже примерный охват региона. Улицы, города и названия дорог смотрите на интерактивной карте.",
      "map.open": "Открыть интерактивную карту",
      "map.alt": "Превью региона карты Far East Russia",
      "map.caption": "Схема охвата из последней сборки.",
      "map.stat1": "проезжих дорог",
      "map.stat2": "детализированных городов и поселений",
      "map.stat3": "поддерживаемая версия ETS2",

      "addons.h2": "Дополнения",
      "addons.lead":
        "Расширьте свой опыт Far East Russia дополнительным контентом и регионами.",
      "addons.chukotka.title": "Chukotka Addon",
      "addons.chukotka.desc":
        "Исследуйте Чукотский автономный округ — самую восточную окраину России. Новые города, арктическая местность и удалённые маршруты через один из самых изолированных регионов на Земле.",
      "addons.west.title": "West Yacutia Addon",
      "addons.west.desc":
        "Исследуйте Западную Якутию — отправляйтесь изучать интересную область за рекой Лена.",
      "addons.sakha.title": "Sakha Addon",
      "addons.sakha.desc": "Исследуйте район Оймякона — самое холодное место на Земле.",
      "addons.openPage": "Открыть страницу",
      "addons.openPage.truckymods": "Открыть страницу - Truckymods.io",
      "addons.openPage.nachorio": "Открыть страницу - Nachoriosmods.es",
      "addons.download": "Скачать",
      "addons.downloadTrucky": "Скачать",

      "rcs.h2": "Дорожные соединения (RCs)",
      "rcs.lead":
        "RCs связывают FER с другими модами карт, чтобы маршруты не обрывались на границе. Устанавливайте только те, что нужны для карт, в которых вы реально играете.",
      "rcs.ferOtgr.title": "FER – OTGR",
      "rcs.ferOtgr.desc":
        "Соединяет Far East Russia с Off The Grid Russia, открывая непрерывные маршруты по обширной внутренней Сибири.",
      "rcs.ferChukotka.title": "FER – Chukotka",
      "rcs.ferChukotka.desc":
        "Соединяет FER и Chukotka Addon для непрерывного доступа к северо-восточной окраине России.",
      "rcs.ferTst.title": "FER – TST",
      "rcs.ferTst.desc":
        "Соединяет FER с Trans-Siberian Truckway для лучшего трансроссийского дальнобойного маршрута.",
      "rcs.openPage": "Открыть страницу",
      "rcs.download": "Скачать",

      "supporters.eyebrow": "Благодарности",
      "supporters.h2": "Поддержавшие",
      "supporters.lead": "Огромная благодарность всем, кто поддерживает этот проект.",
      "supporters.donations": "Пожертвования:",
      "supporters.showcase": "Витрина:",
      "supporters.seeHow": "Узнать, как поддержать",
      "supporters.joinDiscord": "Присоединиться к Discord",
      "supporters.showcase.bogdac":
        "Создал множество классных видео по этой карте и включил её в свои комбо",
      "supporters.showcase.gmc":
        "Делятся новостями о Far East Russia в своём Discord и включают её в комбо карт",
      "supporters.showcase.semir": "Стримы по Far East Russia",
      "supporters.showcase.vikingo": "Сделал шоукейс версии V2",

      "faq.h2": "FAQ",
      "faq.q1": "Где скачать основную карту FER?",
      "faq.a1":
        "Воспользуйтесь специальной <a href='fer.html'>страницей FER</a> для скачивания и руководства по установке.",
      "faq.q2": "Обязательны ли Дорожные соединения (RCs)?",
      "faq.a2":
        "Нет. RCs — это опциональные коннекторы к другим картам. Устанавливайте только те, которые соответствуют картам, которые вы фактически используете.",
      "faq.q3": "Какой правильный порядок загрузки?",
      "faq.a3":
        "Размещайте RCs выше основных карт, а FER ниже них. Точный порядок смотрите в разделе Load Order на любой странице загрузки.",
      "faq.q4": "Совместим ли FER с ProMods или другими модами карт?",
      "faq.a4":
        "FER рассчитан на самостоятельную игру или официальные RCs (OTGR, TST, Chukotka). Смешивать его с другими крупными картами обычно заканчивается слёзками, так что работать это не обещаю.",
      "faq.q5": "Как часто обновляется FER?",
      "faq.a5":
        "Раз в несколько недель, примерно, когда готов очередной кусок работы. Иногда это фиксы, иногда целый новый район.",
      "faq.q6": "Я нашёл баг или визуальный глюк. Как сообщить?",
      "faq.a6":
        "Присоединяйтесь к <a href='https://discord.gg/SSWDJMauxz' target='_blank'>серверу Discord</a> и сообщите об этом в канале для отчётов о багах.",

      "picker.title": "Выберите язык",
      "picker.subtitle":
        "Вы можете изменить его позже с помощью переключателя EN | RU в правом верхнем углу.",
      "picker.btn_en": "English",
      "picker.btn_ru": "Русский",

      "common.latestRelease": "Последний релиз",
      "common.quickStats": "Краткая статистика",
      "common.downloads": "Загрузки",
      "common.aboutTheMap": "О карте",
      "common.aboutThisAddon": "Об этом дополнении",
      "common.aboutThisRc": "Об этом Дорожном соединении",
      "common.requirements": "Требования",
      "common.whatsIncluded": "Что включено",
      "common.installationGuide": "Руководство по установке",
      "common.loadOrder": "Порядок загрузки",
      "common.officialLink": "Официальная ссылка",
      "common.loadOrderHint":
        "Размещайте моды в Mod Manager ETS2 в этом приоритете (верх = высший приоритет):",
      "common.loadOrderHintShort":
        "Размещайте моды в этом приоритете (верх = высший):",
      "common.allReleases": "Все релизы",
      "common.discussion": "Обсуждение",
      "common.signIn": "Войти",
      "common.signUp": "Регистрация",
      "common.signInOrSignUp": "Вход / Регистрация",
      "common.signOut": "Выйти",
      "common.username": "Имя пользователя",
      "common.password": "Пароль",
      "common.confirmPassword": "Подтвердите пароль",
      "common.dontHaveAccount": "Нет аккаунта?",
      "common.alreadyHaveAccount": "Уже есть аккаунт?",
      "common.submit": "Отправить",
      "common.submitting": "Отправка...",
      "common.signedInAs": "Вы вошли как ",
      "common.notes": "Примечания",
      "common.mapCoverage": "Охват карты",
      "common.mapCoveragePreviewAlt": "Превью охвата карты",
      "common.download": "Скачать",
      "common.mirror": "Зеркало",

      /* discord widget */
      "discord.channelName": "#последние-объявления",
      "discord.liveFeed": "НОВОСТИ",
      "discord.connecting": "Подключение к Discord...",
      "discord.join": "Войти в Discord",
      "discord.error": "Не удалось загрузить обновления. <br>Присоединяйтесь к нашему серверу напрямую в Discord!",

      "fer.coverage1": "Более 5 900 км проезжих дорог Дальневосточного федерального округа",
      "fer.coverage2": "Более 50 детализированных городов, посёлков и удалённых поселений",
      "fer.coverage3": "Речные паромные переправы, связывающие изолированные регионы",
      "fer.coverage4": "Федеральные трассы, региональные дороги и безымянные грунтовки",
      "fer.coverage5": "Постоянное расширение с каждым релизом",

      "addonNotes.requiresFer": "Для работы требуется Far East Russia",
      "addonNotes.requiresChukotkaRc": "Требуется FER – Chukotka RC для дорожного соединения",
      "addonNotes.placeAbove": "Разместите дополнение выше Far East Russia в Mod Manager",
      "addonNotes.report": "Сообщайте о проблемах через",

      "rcNotes.placeAbove": "Разместите RC выше обеих основных карт в Mod Manager",
      "rcNotes.onlyInstall.otgr": "Устанавливайте, только если используете и FER, и OTGR",
      "rcNotes.onlyInstall.chukotka": "Устанавливайте, только если используете и FER, и Chukotka Addon",
      "rcNotes.onlyInstall.tst": "Устанавливайте, только если используете и FER, и TST",
      "rcNotes.syncedReleases": "Обновляется синхронно с крупными релизами FER",
      "rcNotes.report": "Сообщайте о проблемах через",

      "cta.h2": "Готовы поехать на восток?",
      "cta.lead": "Забирайте последний релиз, расставьте порядок загрузки и не забудьте канистры. Увидимся на Колыме.",

      "eyebrow.fer": "Основная карта",
      "eyebrow.rc": "Дорожное соединение",
      "eyebrow.addon": "Региональное дополнение",
      "eyebrow.extensions": "Расширения",
      "eyebrow.changelog": "История версий",
      "eyebrow.support": "Поддержите жизнь проекта",

      "supportPage.h1": "Поддержать FER",
      "supportPage.lead":
        "FER бесплатный и таким останется. Это один человек, который строит дороги в часы, оставшиеся после работы, и сообщество, которое кормит проект фидбеком, фото и донатами. Вот как можно помочь.",
      "supportPage.joinDiscord": "Присоединиться к Discord",
      "supportPage.donatePaypal": "Поддержать через PayPal",
      "supportPage.donatePatreon": "Поддержать на Patreon",
      "supportPage.waysH2": "Способы поддержки",
      "supportPage.waysLead": "Выбирайте, что ближе. Или не выбирайте и просто катайтесь.",
      "supportPage.way1.title": "Подкинуть деньжат",
      "supportPage.way1.text":
        "Маппинг отнимает время, а времени этому проекту не хватает больше всего. Донаты буквально покупают часы разработки. Patreon или PayPal, как вам удобнее. Если не получается — ничего страшного. Играть и сообщать о багах не менее полезно. Я на <a href='https://www.patreon.com/c/Far_East_Russia' target='_blank' style='color:var(--text-bright)'>Patreon</a> и <a href='https://paypal.me/aduskaaaa' target='_blank' style='color:var(--text-bright)'>PayPal</a>.",
      "supportPage.way2.title": "Прислать референсы",
      "supportPage.way2.text":
        "Живёте в Якутии или где-то на востоке? Ваши фото и видео с регистраторов — золото. Настоящие улицы, настоящие знаки, настоящие остановки — именно это делает города узнаваемыми. Кидайте в <a href='https://discord.gg/SSWDJMauxz' target='_blank' style='color:var(--text-bright)'>Discord</a>.",
      "supportPage.way3.title": "Рассказать о проекте",
      "supportPage.way3.text":
        "Стримьте конвой, постите скриншоты, снимите видео, расскажите другу. Сарафанное радио — единственный маркетинг, который у этой карты когда-либо был. И он работает.",
      "supportPage.whereH2": "Куда идёт ваша поддержка",
      "supportPage.whereLead":
        "<strong>Время разработки.</strong> Больше часов в редакторе — быстрее новые города и дороги. Всё просто.",

      "galleryPage.h1": "Галерея",
      "galleryPage.lead":
        "Скриншоты от тестеров и водителей сообщества, исследующих Дальний Восток. Кликните на изображение, чтобы открыть в полном размере.",

      "versionsPage.h1": "Версии",
      "versionsPage.lead":
        "Все публичные релизы FER, RCs и дополнений, от новых к старым. Пригодится, если ищете changelog или старую сборку.",
      "versionsPage.ferReleases": "Релизы FER",
      "versionsPage.addons": "Дополнения",

      "loadorderPage.title": "Порядок загрузки • Far East Russia",
      "loadorderPage.metaDesc": "Правильный порядок загрузки для Far East Russia, RC и аддонов в Mod Manager ETS2.",
      "loadorderPage.eyebrow": "Установка",
      "loadorderPage.h1": "Порядок загрузки",
      "loadorderPage.lead": "Разместите моды в Mod Manager ETS2 в этом приоритете — сверху = высший приоритет. Верхние записи перекрывают нижние.",
      "loadorderPage.tip": "Совет: Если не используете карту — пропустите её RC. Включайте только RC для карт, которые у вас есть.",

      "mapPage.pageTitle": "Интерактивная карта • Far East Russia",
      "mapPage.metaDesc": "Высокоточная интерактивная карта для модификации Far East Russia ETS2.",
      "mapPage.eyebrow": "Просмотр",
      "mapPage.h1": "Интерактивная карта",
      "mapPage.lead": "Высокоточная интерактивная карта Far East Russia. Масштабируйте, изучайте сектора дорог, переключайте фон рельефа и открывайте панорамы Street View.",
      "mapPage.title": "ИНТЕРАКТИВНАЯ КАРТА",
      "mapPage.subtitle": "Far East Russia • Версия карты 1",
      "mapPage.loading": "СИНХРОНИЗАЦИЯ СЕКТОРОВ КАРТЫ...",
      "mapPage.coords": "Координаты карты",
      "mapPage.approxDisclaimer": "Приблизительное местоположение",
      "mapPage.copy": "Скопировать в буфер",
      "mapPage.copied": "СКОПИРОВАНО!",
      "mapPage.userPhotos": "Фото пользователей",
      "mapPage.roadNames": "Названия дорог",
      "mapPage.background": "Фоновое изображение",
      "mapPage.streetView": "Street View",
      "mapPage.rightClickHint": "ПКМ для получения координат",
      "mapPage.svTitle": "Far East Russia Street View",
      "mapPage.datasetVersion": "Версия набора данных",
      "mapPage.version1": "Web Map Версия 1",
      "mapPage.version2": "Web Map Версия 2",
      "mapPage.subtitleV1": "Far East Russia • Версия карты 1",
      "mapPage.subtitleV2": "Far East Russia • Версия карты 2",
      "mapPage.fullscreen": "На весь экран",
      "mapPage.exitFullscreen": "Свернуть",
      "mapPage.aboutTitle": "О карте",
      "mapPage.aboutText": "Интерактивная карта построена на основе игровых секторов ETS2 и откалибрована по реальным координатам WGS84. Включает официальный рельеф ETS2 Global Background Map, дорожные сектора, развязки, населённые пункты и панорамы Street View сообщества.",
      "mapPage.controlsTitle": "Управление и подсказки",
      "mapPage.ctrlPan": "ЛКМ + перетаскивание для перемещения по карте",
      "mapPage.ctrlZoom": "Колесо мыши или жест на тачпаде для приближения и отдаления",
      "mapPage.ctrlCoords": "ПКМ в любой точке для просмотра и копирования точных координат",
      "mapPage.ctrlSv": "Клик по синей линии Street View открывает дорожные панорамы",
      "mapPage.legendTitle": "Легенда",
      "mapPage.tierRoads": "Дороги",
      "mapPage.tierSecret": "Секретные дороги",
      "mapPage.tierFerry": "Паромная переправа",
      "mapPage.tierStreetview": "Street View"
    }
  };

  /* ---------- Flag SVGs (inline, no emoji font dependency) ---------- */
  var FLAG_SVG = {
    en:
      '<svg class="flag-svg" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="60" height="30" fill="#012169"/>' +
      '<path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/>' +
      '<path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="2"/>' +
      '<path d="M30 0V30M0 15H60" stroke="#fff" stroke-width="10"/>' +
      '<path d="M30 0V30M0 15H60" stroke="#C8102E" stroke-width="6"/>' +
      '</svg>',
    ru:
      '<svg class="flag-svg" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="30" height="20" fill="#fff"/>' +
      '<rect y="6.667" width="30" height="6.666" fill="#0039A6"/>' +
      '<rect y="13.333" width="30" height="6.667" fill="#D52B1E"/>' +
      '</svg>'
  };

  function flagSvg(lang) {
    return FLAG_SVG[lang] || "";
  }

  /* ---------- City name translations (interactive map) ----------
     Keys are the EN/transliterated names as stored in fer-geojson.js.
     Values are Russian Cyrillic. Used by localizeCity(name). */
  var CITY_NAMES_RU = {
    "Kyubeme": "Кюбюме",
    "Oymyacon": "Оймякон",
    "Tomtor": "Томтор",
    "Agayakan": "Агаякан",
    "Ust-Nera": "Усть-Нера",
    "Markha": "Марха",
    "Khandyga": "Хандыга",
    "Nizhniy Bestiakh": "Нижний Бестях",
    "Teply Klyuch": "Тёплый Ключ",
    "Megino-Aldan": "Мегино-Алдан",
    "Uolba": "Уолба",
    "Srednekolymsk": "Среднеколымск",
    "Ugolnye": "Угольные",
    "Zyryanka": "Зырянка",
    "Chersky": "Черский",
    "Andryushkino": "Андрюшкино",
    "Argakhtakh": "Аргахтах",
    "Nalimsk": "Налимск",
    "Pobeda": "Победа",
    "Sasyr": "Сасыр",
    "Kolymskoye": "Колымское",
    "Ust-Kuyga": "Усть-Куйга",
    "Khonuu": "Хонуу",
    "Kuberganya": "Кубергеня",
    "Belaya Gora": "Белая Гора",
    "Suturuokha": "Сутуруоха",
    "Tiksi": "Тикси",
    "Nayba": "Найба",
    "Khaiyr": "Хайыр",
    "Vlasovo": "Власово",
    "Kular": "Кулар",
    "Severny": "Северный",
    "Aby": "Абый",
    "Dyosku": "Дёску",
    "Syagannakh": "Сяганнах",
    "Deputatsky": "Депутатский",
    "Uyandi": "Уянди",
    "Dzhebariki-Khaya": "Джебарики-Хая",
    "Bedemyo": "Бедёмо",
    "Bilibino": "Билибино",
    "Anyuysk": "Анюйск",
    "Keperveyem": "Кепервеем",
    "Aliskerovo": "Алискерово",
    "Russia": "Россия"
  };

  function localizeCity(name) {
    if (!name) return name;
    if (effectiveLang() === "ru" && CITY_NAMES_RU[name]) return CITY_NAMES_RU[name];
    return name;
  }

  /* ---------- Storage (cookie + localStorage fallback) ----------
     Cookies persist across pages even when localStorage is sandboxed
     per-file (Firefox privacy.file_unique_origin on file:// URLs).
     We read from cookie first, then localStorage; write to both. */
  function lsGet() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function lsSet(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* ignore */ }
  }
  function cookieGet() {
    try {
      var m = document.cookie.match(new RegExp("(?:^|;\\s*)" + STORAGE_KEY + "=([^;]+)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }
  function cookieSet(v) {
    try {
      var d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000); /* 1 year */
      document.cookie = STORAGE_KEY + "=" + encodeURIComponent(v) +
        "; expires=" + d.toUTCString() +
        "; path=/; SameSite=Lax";
    } catch (e) { /* ignore */ }
  }

  function getLang() {
    var l = cookieGet() || lsGet();
    return SUPPORTED.indexOf(l) >= 0 ? l : null;
  }
  function effectiveLang() {
    return getLang() || DEFAULT_LANG;
  }
  function setLang(l) {
    if (SUPPORTED.indexOf(l) < 0) return;
    cookieSet(l);
    lsSet(l);
    apply();
  }
  function t(key) {
    var l = effectiveLang();
    var v = (dict[l] && dict[l][key]);
    if (v == null && l !== DEFAULT_LANG) v = dict[DEFAULT_LANG] && dict[DEFAULT_LANG][key];
    return v == null ? key : v;
  }

  /* localize(obj, "field") returns obj["field_<lang>"] || obj["field"]
     Used by inline page scripts to pick the correct language variant
     of a field on a site-data object. */
  function localize(obj, field) {
    if (!obj) return undefined;
    var l = effectiveLang();
    if (l === DEFAULT_LANG) return obj[field];
    var v = obj[field + "_" + l];
    return v != null ? v : obj[field];
  }

  function onChange(cb) {
    window.addEventListener("i18n-langchange", cb);
  }

  function apply() {
    var lang = effectiveLang();
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (el.tagName === "TITLE") {
        document.title = t(key);
      } else {
        el.textContent = t(key);
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      spec.split(",").forEach(function (pair) {
        var p = pair.split(":");
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });

    document.querySelectorAll(".lang-switch button[data-lang], .lang-switch-mobile button[data-lang]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    try {
      window.dispatchEvent(new Event("i18n-langchange"));
    } catch (e) {
      var ev = document.createEvent("Event");
      ev.initEvent("i18n-langchange", false, false);
      window.dispatchEvent(ev);
    }
  }

  function showPicker() {
    if (document.getElementById("lang-picker")) return;
    var overlay = document.createElement("div");
    overlay.id = "lang-picker";
    overlay.className = "lang-picker-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="lang-picker-modal">' +
      '<h2>Choose your language<br><span class="lang-picker-subhead">Выберите язык</span></h2>' +
      '<p>Select your preferred language. You can change it later via the EN | RU switch in the top-right corner.</p>' +
      '<p class="lang-picker-ru">Выберите язык. Вы сможете изменить его позже с помощью переключателя EN | RU в правом верхнем углу.</p>' +
      '<div class="lang-picker-buttons">' +
      '<button data-lang="en"><span class="flag">' + flagSvg("en") + '</span> English</button>' +
      '<button data-lang="ru"><span class="flag">' + flagSvg("ru") + '</span> Русский</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelectorAll("button[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        setLang(b.getAttribute("data-lang"));
        overlay.remove();
      });
    });
  }

  window.I18N = {
    getLang: getLang,
    effectiveLang: effectiveLang,
    setLang: setLang,
    t: t,
    localize: localize,
    localizeCity: localizeCity,
    onChange: onChange,
    apply: apply,
    showPicker: showPicker,
    flagSvg: flagSvg,
    SUPPORTED: SUPPORTED,
    DEFAULT_LANG: DEFAULT_LANG
  };

  function init() {
    if (!getLang()) showPicker();
    apply();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
