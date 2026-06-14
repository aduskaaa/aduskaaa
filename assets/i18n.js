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
        "Far East Russia is a high-quality ETS2 map expansion focusing on Russia's Far East. Explore vast roads, realistic cities, and challenging routes.",

      /* nav */
      "nav.HOME": "HOME",
      "nav.FER": "FER",
      "nav.MAP": "MAP",
      "nav.ADDONS": "ADDONS",
      "nav.RCS": "RCS",
      "nav.GALLERY": "GALLERY",
      "nav.VERSIONS": "VERSIONS",
      "nav.SUPPORT": "SUPPORT",
      "nav.DISCORD": "DISCORD",

      /* footer */
      "footer.Home": "Home",
      "footer.FER": "FER",
      "footer.Map": "Map",
      "footer.Gallery": "Gallery",
      "footer.Versions": "Versions",
      "footer.Support": "Support",
      "footer.copy": "Far East Russia · ETS2 Map Mod",

      /* hero */
      "hero.h1": "Explore Russia's Far East in ETS2",
      "hero.p":
        "Drive thousands of kilometers through rugged landscapes, frozen tundra, and remote highways across Yakutia and beyond. Every road, city, and settlement is hand-crafted from real-world reference data — delivering an authentic Far Eastern experience built for immersion and performance.",
      "hero.cta_download": "Download FER",
      "hero.cta_explore": "Explore RCs",
      "hero.cta_support": "Support",
      "hero.badge1": "Actively Maintained",
      "hero.badge2": "Optimized",
      "hero.badge3": "1.59 Ready",

      /* features */
      "features.h2": "Key Features",
      "features.lead":
        "Built for immersion and stability, whether you're hauling across cities or tackling remote wilderness routes.",
      "features.c1.title": "Authentic Cities & Towns",
      "features.c1.text":
        "Hand-crafted locations inspired by satellite imagery and photos from the region. Every city is rebuilt from scratch with attention to realistic road geometry, signage, and local architecture.",
      "features.c2.title": "Challenging Roads",
      "features.c2.text":
        "From coastal highways and river crossings to tight mountain passes and frozen dirt tracks — the terrain is as diverse as the real Far East.",
      "features.c3.title": "Performance Focus",
      "features.c3.text":
        "Carefully optimized map sectors and assets ensure smooth framerates even on mid-range hardware. Stable in both single-player and multiplayer convoys.",

      /* map */
      "map.h2": "Map Coverage Preview",
      "map.lead":
        "A glimpse into the vast region covered by FER. Explore the full road network in high detail.",
      "map.open": "Open Interactive Map",
      "map.alt": "Preview of the Far East Russia map region",
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
        "Road Connections link FER with other map mods, creating continuous routes across Siberia. Choose a connector below to learn more and download.",
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
        "FER is designed for standalone use or with its official RCs (OTGR, TST, Chukotka). Compatibility with other major map mods is not guaranteed.",
      "faq.q5": "How often is FER updated?",
      "faq.a5":
        "FER receives regular updates — typically every few weeks — adding new roads, cities, and bug fixes.",
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

      /* fer.html – map coverage bullet list */
      "fer.coverage1": "7,000+ km of driveable roads across the Far Eastern Federal District",
      "fer.coverage2": "40+ detailed cities, towns, and remote settlements",
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
      "supportPage.h1": "Support the Far East Russia Project",
      "supportPage.lead":
        "Every kilometer of road, every city block, and every bug fix is fuelled by the community. FER is a passion project built in spare time — your support keeps the map expanding east and helps maintain quality with every update.",
      "supportPage.joinDiscord": "Join Discord",
      "supportPage.donatePaypal": "Donate via PayPal",
      "supportPage.waysH2": "Ways to Support",
      "supportPage.way1.title": "Financial Support",
      "supportPage.way1.text":
        "Donations help fund development time and tools. Every contribution, no matter the size, makes a real difference. Donate via <a href='https://paypal.me/aduskaaaa' target='_blank' style='color:var(--text-bright)'>PayPal</a> or scan the QR code on the PayPal page.",
      "supportPage.way2.title": "Provide Reference Material",
      "supportPage.way2.text":
        "Share photos, dashcam footage, and local knowledge from Yakutia and Russia's Far East. Real-world reference data is invaluable for creating authentic cities and roads. Upload via <a href='https://discord.gg/SSWDJMauxz' target='_blank' style='color:var(--text-bright)'>Discord</a>.",
      "supportPage.way3.title": "Spread the Word",
      "supportPage.way3.text":
        "Stream your hauls, make YouTube videos, post on mod forums, or recommend FER to friends. More visibility means more testers, more feedback, and a better map for everyone.",
      "supportPage.whereH2": "Where Your Support Goes",
      "supportPage.whereLead":
        "<strong>Development time</strong> — More hours spent mapping means faster progress on new cities and roads.",

      /* gallery page */
      "galleryPage.h1": "Gallery",
      "galleryPage.lead":
        "Screenshots from testers and community drivers exploring the Far East. Click any image to view it full-size.",

      /* versions page */
      "versionsPage.h1": "Versions",
      "versionsPage.lead":
        "Complete release history for FER, all Road Connections, and Addons. Every version ever published is listed here.",
      "versionsPage.ferReleases": "FER Releases",
      "versionsPage.addons": "Addons",

      /* interactive map */
      "mapPage.title": "INTERACTIVE MAP",
      "mapPage.subtitle": "Far East Russia • Map Version 1",
      "mapPage.loading": "SYNCHRONIZING MAP SECTORS...",
      "mapPage.coords": "Map Coordinates",
      "mapPage.copy": "Copy to Clipboard",
      "mapPage.copied": "COPIED!",
      "mapPage.userPhotos": "User Photos",
      "mapPage.roadNames": "Road Names",
      "mapPage.background": "Background Image",
      "mapPage.streetView": "Street View",
      "mapPage.rightClickHint": "Right-click to get coordinates",
      "mapPage.svTitle": "Far East Russia Street View"
    },

    ru: {
      "meta.title": "Far East Russia – мод карты для ETS2",
      "meta.description":
        "Far East Russia — высококачественное расширение карты для ETS2, посвящённое Дальнему Востоку России. Обширные дороги, реалистичные города и сложные маршруты.",

      "nav.HOME": "ГЛАВНАЯ",
      "nav.FER": "FER",
      "nav.MAP": "КАРТА",
      "nav.ADDONS": "ДОПОЛНЕНИЯ",
      "nav.RCS": "RCS",
      "nav.GALLERY": "ГАЛЕРЕЯ",
      "nav.VERSIONS": "ВЕРСИИ",
      "nav.SUPPORT": "ПОДДЕРЖКА",
      "nav.DISCORD": "DISCORD",

      "footer.Home": "Главная",
      "footer.FER": "FER",
      "footer.Map": "Карта",
      "footer.Gallery": "Галерея",
      "footer.Versions": "Версии",
      "footer.Support": "Поддержка",
      "footer.copy": "Far East Russia · мод карты для ETS2",

      "hero.h1": "Исследуйте Дальний Восток России в ETS2",
      "hero.p":
        "Проедьте тысячи километров по суровым ландшафтам, замёрзшей тундре и удалённым шоссе через Якутию и за её пределы. Каждая дорога, город и поселение созданы вручную на основе реальных данных — обеспечивая аутентичный опыт Дальнего Востока с упором на погружение и производительность.",
      "hero.cta_download": "Скачать FER",
      "hero.cta_explore": "Изучить RCs",
      "hero.cta_support": "Поддержать",
      "hero.badge1": "Активно поддерживается",
      "hero.badge2": "Оптимизировано",
      "hero.badge3": "Готов для 1.59",

      "features.h2": "Ключевые особенности",
      "features.lead":
        "Создано для погружения и стабильности — будь то перевозки между городами или удалённые маршруты в дикой природе.",
      "features.c1.title": "Аутентичные города и посёлки",
      "features.c1.text":
        "Локации, созданные вручную на основе спутниковых снимков и фотографий региона. Каждый город построен с нуля с вниманием к реалистичной геометрии дорог, указателям и местной архитектуре.",
      "features.c2.title": "Сложные дороги",
      "features.c2.text":
        "От прибрежных шоссе и речных переправ до узких горных перевалов и замёрзших грунтовок — местность так же разнообразна, как и настоящий Дальний Восток.",
      "features.c3.title": "Упор на производительность",
      "features.c3.text":
        "Тщательно оптимизированные секторы карты и ассеты обеспечивают плавную частоту кадров даже на оборудовании среднего класса. Стабильно как в одиночной игре, так и в мультиплеерных конвоях.",

      "map.h2": "Обзор охвата карты",
      "map.lead":
        "Взгляд на огромный регион, охваченный FER. Изучите полную дорожную сеть в высокой детализации.",
      "map.open": "Открыть интерактивную карту",
      "map.alt": "Превью региона карты Far East Russia",
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

      "rcs.h2": "Road Connections (RCs)",
      "rcs.lead":
        "Road Connections связывают FER с другими модами карт, создавая непрерывные маршруты по Сибири. Выберите коннектор ниже, чтобы узнать больше и скачать.",
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

      "faq.h2": "FAQ",
      "faq.q1": "Где скачать основную карту FER?",
      "faq.a1":
        "Воспользуйтесь специальной <a href='fer.html'>страницей FER</a> для скачивания и руководства по установке.",
      "faq.q2": "Обязательны ли Road Connections (RCs)?",
      "faq.a2":
        "Нет. RCs — это опциональные коннекторы к другим картам. Устанавливайте только те, которые соответствуют картам, которые вы фактически используете.",
      "faq.q3": "Какой правильный порядок загрузки?",
      "faq.a3":
        "Размещайте RCs выше основных карт, а FER ниже них. Точный порядок смотрите в разделе Load Order на любой странице загрузки.",
      "faq.q4": "Совместим ли FER с ProMods или другими модами карт?",
      "faq.a4":
        "FER создан для самостоятельного использования или с официальными RCs (OTGR, TST, Chukotka). Совместимость с другими крупными модами карт не гарантируется.",
      "faq.q5": "Как часто обновляется FER?",
      "faq.a5":
        "FER получает регулярные обновления — обычно каждые несколько недель — добавляющие новые дороги, города и исправления ошибок.",
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
      "common.aboutThisRc": "Об этом Road Connection",
      "common.requirements": "Требования",
      "common.whatsIncluded": "Что включено",
      "common.installationGuide": "Руководство по установке",
      "common.loadOrder": "Порядок загрузки",
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

      "fer.coverage1": "Более 7 000 км проезжих дорог Дальневосточного федерального округа",
      "fer.coverage2": "Более 40 детализированных городов, посёлков и удалённых поселений",
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

      "supportPage.h1": "Поддержите проект Far East Russia",
      "supportPage.lead":
        "Каждый километр дороги, каждый городской квартал и каждое исправление багов держится на сообществе. FER — это проект, созданный в свободное время с любовью, и ваша поддержка помогает карте расширяться на восток и сохранять качество с каждым обновлением.",
      "supportPage.joinDiscord": "Присоединиться к Discord",
      "supportPage.donatePaypal": "Поддержать через PayPal",
      "supportPage.waysH2": "Способы поддержки",
      "supportPage.way1.title": "Финансовая поддержка",
      "supportPage.way1.text":
        "Пожертвования помогают финансировать время разработки и инструменты. Каждый вклад, независимо от размера, имеет значение. Поддержите через <a href='https://paypal.me/aduskaaaa' target='_blank' style='color:var(--text-bright)'>PayPal</a> или отсканируйте QR-код на странице PayPal.",
      "supportPage.way2.title": "Предоставить справочные материалы",
      "supportPage.way2.text":
        "Делитесь фотографиями, видеозаписями с регистраторов и местными знаниями о Якутии и Дальнем Востоке России. Реальные справочные данные неоценимы для создания аутентичных городов и дорог. Загружайте через <a href='https://discord.gg/SSWDJMauxz' target='_blank' style='color:var(--text-bright)'>Discord</a>.",
      "supportPage.way3.title": "Расскажите о проекте",
      "supportPage.way3.text":
        "Стримьте свои поездки, снимайте видео на YouTube, пишите на форумах модов или рекомендуйте FER друзьям. Больше внимания означает больше тестеров, больше отзывов и лучшую карту для всех.",
      "supportPage.whereH2": "Куда идёт ваша поддержка",
      "supportPage.whereLead":
        "<strong>Время разработки</strong> — больше часов на маппинг означает более быстрый прогресс с новыми городами и дорогами.",

      "galleryPage.h1": "Галерея",
      "galleryPage.lead":
        "Скриншоты от тестеров и водителей сообщества, исследующих Дальний Восток. Кликните на изображение, чтобы открыть в полном размере.",

      "versionsPage.h1": "Версии",
      "versionsPage.lead":
        "Полная история релизов FER, всех Road Connections и дополнений. Здесь перечислены все когда-либо опубликованные версии.",
      "versionsPage.ferReleases": "Релизы FER",
      "versionsPage.addons": "Дополнения",

      "mapPage.title": "ИНТЕРАКТИВНАЯ КАРТА",
      "mapPage.subtitle": "Far East Russia • Версия карты 1",
      "mapPage.loading": "СИНХРОНИЗАЦИЯ СЕКТОРОВ КАРТЫ...",
      "mapPage.coords": "Координаты карты",
      "mapPage.copy": "Скопировать в буфер",
      "mapPage.copied": "СКОПИРОВАНО!",
      "mapPage.userPhotos": "Фото пользователей",
      "mapPage.roadNames": "Названия дорог",
      "mapPage.background": "Фоновое изображение",
      "mapPage.streetView": "Street View",
      "mapPage.rightClickHint": "ПКМ для получения координат",
      "mapPage.svTitle": "Far East Russia Street View"
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

    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (b) {
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
