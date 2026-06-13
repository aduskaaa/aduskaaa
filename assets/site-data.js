/* ==========================================================
   Far East Russia – Shared Site Data
   ----------------------------------------------------------
   Central data store for content used across multiple pages.
   Edit nav links, footer, load order, descriptions etc. here.

   For i18n, fields with a parallel "_ru" suffix hold the
   Russian variant. Inline page scripts pick the active
   variant via window.I18N.localize(obj, "field").
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
    "Sakha Addon",
    "West Yacutia Addon",
    "Chukotka Addon Legacy Areas",
    "Far East Russia",
    "Trans-Siberian Truckway",
    "Off The Grid Russia"
  ],
  loadOrder_ru: [
    "Фоновая карта (рекомендуется)",
    "FER – Chukotka RC",
    "FER – OTGR RC",
    "FER – TST RC",
    "Sakha Addon",
    "West Yacutia Addon",
    "Chukotka Addon Legacy Areas",
    "Far East Russia",
    "Trans-Siberian Truckway",
    "Off The Grid Russia"
  ],

  /* ---------- Page content ---------- */
  pages: {

    fer: {
      title: "Far East Russia (FER)",
      title_ru: "Far East Russia (FER)",
      tagline: "The core ETS2 map expansion covering Russia's Far Eastern Federal District — from the frozen tundra of Yakutia to the Kolyma Highway.",
      tagline_ru: "Основное расширение карты для ETS2, охватывающее Дальневосточный федеральный округ России — от замёрзшей тундры Якутии до трассы Колыма.",
      description: "Far East Russia is a massive, hand-crafted map mod for Euro Truck Simulator 2 that brings the raw, untamed beauty of Russia's Far Eastern Federal District to life. Spanning thousands of kilometers of driveable roads, FER takes you through some of the most remote and extreme terrain on Earth — from the permafrost-covered highways of Yakutia to the legendary 'Road of Bones' along the Kolyma route. Every city, village, and roadside stop is built from scratch using satellite imagery and real-world reference photos, ensuring an authentic representation of this vast, sparsely populated region. The roads range from well-maintained federal highways to treacherous dirt tracks that test both your driving skill and your truck's durability. River crossings via ferry, seasonal road conditions, and realistic signage all contribute to an immersive experience that captures what it truly feels like to haul freight across one of the most isolated corners of the world. FER is optimized for performance and stability, making it suitable for both single-player hauling sessions and multiplayer convoys.",
      description_ru: "Far East Russia — масштабный мод карты для Euro Truck Simulator 2, созданный вручную, который оживляет суровую, нетронутую красоту Дальневосточного федерального округа России. Простираясь на тысячи километров проезжих дорог, FER проведёт вас через одну из самых удалённых и экстремальных территорий на Земле — от шоссе Якутии, покрытых вечной мерзлотой, до легендарной «Дороги костей» вдоль Колымы. Каждый город, посёлок и придорожная стоянка построены с нуля на основе спутниковых снимков и реальных фотографий, обеспечивая аутентичное воспроизведение этого обширного и малонаселённого региона. Дороги варьируются от ухоженных федеральных трасс до коварных грунтовок, которые проверят и ваше водительское мастерство, и прочность грузовика. Речные переправы на паромах, сезонные условия дорог и реалистичные указатели создают эффект погружения, передающий ощущение перевозки грузов в одном из самых изолированных уголков мира. FER оптимизирован для производительности и стабильности, что делает его подходящим как для одиночных рейсов, так и для мультиплеерных конвоев.",
      features: [
        { icon: "🗺️", title: "7,000+ km of Roads", text: "Federal highways, regional roads, and unnamed dirt tracks — all hand-crafted with realistic geometry and signage." },
        { icon: "🏘️", title: "40+ Cities & Settlements", text: "From major cities like Yakutsk to tiny remote villages accessible only by unpaved roads or river ferry." },
        { icon: "⛴️", title: "River Ferries", text: "Cross mighty Siberian rivers aboard realistic ferry services — some routes are only accessible by water." },
        { icon: "🏔️", title: "Extreme Terrain", text: "Winter roads but in summer, mountain passes, river fords, and seasonal conditions create challenging driving experiences." },
        { icon: "⚡", title: "Optimized Performance", text: "Carefully optimized assets and map sectors ensure smooth performance even on mid-range hardware." },
        { icon: "🔄", title: "Regular Updates", text: "Active development with new cities, roads, and improvements added in every release." }
      ],
      features_ru: [
        { icon: "🗺️", title: "Более 7 000 км дорог", text: "Федеральные трассы, региональные дороги и безымянные грунтовки — все созданы вручную с реалистичной геометрией и указателями." },
        { icon: "🏘️", title: "Более 40 городов и поселений", text: "От крупных городов вроде Якутска до маленьких удалённых деревень, доступных только по грунтовкам или речным паромам." },
        { icon: "⛴️", title: "Речные паромы", text: "Пересекайте могучие сибирские реки на реалистичных паромах — некоторые маршруты доступны только по воде." },
        { icon: "🏔️", title: "Экстремальная местность", text: "Зимники, действующие летом, горные перевалы, броды и сезонные условия создают сложный опыт вождения." },
        { icon: "⚡", title: "Оптимизированная производительность", text: "Тщательно оптимизированные ассеты и секторы карты обеспечивают плавную работу даже на оборудовании среднего класса." },
        { icon: "🔄", title: "Регулярные обновления", text: "Активная разработка с новыми городами, дорогами и улучшениями в каждом релизе." }
      ],
      stats: [
        { value: "7,000+", label: "km of driveable roads" },
        { value: "40+", label: "cities & settlements" },
        { value: "1.58/59", label: "ETS2 version supported" }
      ],
      stats_ru: [
        { value: "7 000+", label: "км проезжих дорог" },
        { value: "40+", label: "городов и поселений" },
        { value: "1.58/59", label: "поддерживаемая версия ETS2" }
      ],
      installSteps: [
        "Download the latest FER release from the download section below.",
        "Place the <code>.scs</code> file in your ETS2 mod folder (<code>Documents/Euro Truck Simulator 2/mod</code>).",
        "Enable the mod in ETS2's Mod Manager.",
        "Follow the load order shown below — place FER and any RCs/addons in the correct priority.",
        "Start a new profile or load an existing one and drive east!"
      ],
      installSteps_ru: [
        "Скачайте последний релиз FER в разделе загрузки ниже.",
        "Поместите файл <code>.scs</code> в папку модов ETS2 (<code>Documents/Euro Truck Simulator 2/mod</code>).",
        "Включите мод в Mod Manager ETS2.",
        "Следуйте порядку загрузки, показанному ниже — расставьте FER и все RCs/дополнения в правильном приоритете.",
        "Создайте новый профиль или загрузите существующий и поезжайте на восток!"
      ]
    },

    ferOtgr: {
      title: "FER – OTGR Road Connection",
      title_ru: "FER – OTGR Road Connection",
      tagline: "Seamlessly connect Far East Russia with Off The Grid Russia and unlock vast new routes across Siberia.",
      tagline_ru: "Бесшовное соединение Far East Russia с Off The Grid Russia, открывающее новые маршруты по Сибири.",
      description: "The FER – OTGR Road Connection is an essential bridge mod that links two of the most ambitious Russian map projects for Euro Truck Simulator 2: Far East Russia (FER) and Off The Grid Russia (OTGR). Without this connector, the two maps exist as separate islands — with it, you gain access to continuous routes stretching thousands of kilometers across Siberia's remote interior. The road connection carefully aligns terrain, road geometry, and map sectors between both mods, ensuring seamless transitions without visual glitches or terrain gaps. Whether you're planning a cross-Siberian convoy or just want to haul freight between Yakutia and the OTGR region, this RC makes it possible. The connector is lightweight, adds minimal file size, and is updated alongside major FER releases to maintain compatibility.",
      description_ru: "FER – OTGR Road Connection — это важный мост-мод, связывающий два самых амбициозных русских мода карт для Euro Truck Simulator 2: Far East Russia (FER) и Off The Grid Russia (OTGR). Без этого коннектора обе карты существуют как отдельные острова — с ним вы получаете непрерывные маршруты длиной в тысячи километров по удалённой внутренней Сибири. Road Connection аккуратно выравнивает местность, геометрию дорог и секторы карты между обоими модами, обеспечивая плавные переходы без визуальных глюков и разрывов рельефа. Планируете ли вы транссибирский конвой или просто хотите перевозить грузы между Якутией и регионом OTGR — этот RC делает это возможным. Коннектор лёгкий, добавляет минимум объёма и обновляется одновременно с крупными релизами FER для сохранения совместимости.",
      requirements: [
        "Far East Russia (latest version)",
        "Off The Grid Russia (latest version)",
        "ETS2 1.57 or newer"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Off The Grid Russia (последняя версия)",
        "ETS2 1.57 или новее"
      ]
    },

    ferChukotka: {
      title: "FER – Chukotka Road Connection",
      title_ru: "FER – Chukotka Road Connection",
      tagline: "Bridge Far East Russia and the Chukotka region for uninterrupted eastern exploration.",
      tagline_ru: "Соедините Far East Russia с регионом Чукотки для непрерывного исследования востока.",
      description: "The FER – Chukotka Road Connection links the Far East Russia core map with the Chukotka addon region, creating a continuous road network that extends deep into Russia's northeastern frontier. The Chukotka peninsula — famous for being the easternmost point of the Eurasian continent — is one of the most remote and least populated areas on Earth. This connector ensures that the transition between FER's Yakutian roads and Chukotka's frozen highways is smooth and geographically accurate. Road alignments, terrain elevation, and vegetation zones all blend naturally across the connection point. Install this RC alongside both FER and the Chukotka Addon to unlock the full eastern expansion.",
      description_ru: "FER – Chukotka Road Connection связывает основную карту Far East Russia с регионом дополнения Chukotka, создавая непрерывную дорожную сеть, уходящую глубоко в северо-восточные рубежи России. Полуостров Чукотка — известный как самая восточная точка Евразийского континента — один из самых удалённых и малонаселённых районов на Земле. Этот коннектор обеспечивает плавный и географически точный переход между якутскими дорогами FER и замёрзшими шоссе Чукотки. Выравнивание дорог, рельеф и зоны растительности естественно сливаются в точке соединения. Установите этот RC вместе с FER и Chukotka Addon, чтобы открыть полное восточное расширение.",
      requirements: [
        "Far East Russia (latest version)",
        "Chukotka Addon (latest version)",
        "ETS2 1.57 or newer"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Chukotka Addon (последняя версия)",
        "ETS2 1.57 или новее"
      ]
    },

    ferTst: {
      title: "FER – TST Road Connection",
      title_ru: "FER – TST Road Connection",
      tagline: "Connect Far East Russia with the Trans-Siberian Truckway for the ultimate cross-Russia route.",
      tagline_ru: "Соедините Far East Russia с Trans-Siberian Truckway для лучшего трансроссийского маршрута.",
      description: "The FER – TST Road Connection is the gateway to one of the longest continuous trucking routes in ETS2 modding. By linking Far East Russia with the Trans-Siberian Truckway (TST), this connector lets you drive from the heart of Siberia all the way to the Russian Far East without interruption. The Trans-Siberian Truckway covers the legendary federal highway system that spans Russia from west to east, and this RC picks up where TST ends, continuing the journey into FER's Yakutian territory. The connection is carefully calibrated to match road widths, terrain textures, and elevation data at the boundary, providing a seamless driving experience across both maps. This is a must-have for players who want the ultimate long-haul experience across Russia.",
      description_ru: "FER – TST Road Connection — это путь к одному из самых длинных непрерывных дальнобойных маршрутов в моддинге ETS2. Связывая Far East Russia с Trans-Siberian Truckway (TST), этот коннектор позволяет ехать из самого сердца Сибири до Дальнего Востока России без перерывов. Trans-Siberian Truckway охватывает легендарную систему федеральных трасс, простирающуюся через Россию с запада на восток, и этот RC подхватывает там, где заканчивается TST, продолжая путь в якутские территории FER. Соединение тщательно откалибровано для совпадения ширины дорог, текстур местности и данных высот на границе, обеспечивая плавный опыт вождения по обеим картам. Обязательно для игроков, желающих испытать максимальные дальнобойные перевозки через всю Россию.",
      requirements: [
        "Far East Russia (latest version)",
        "Trans-Siberian Truckway (latest version)",
        "ETS2 1.57 or newer"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Trans-Siberian Truckway (последняя версия)",
        "ETS2 1.57 или новее"
      ]
    },

    chukotkaAddon: {
      title: "Chukotka Addon Legacy Areas",
      title_ru: "Chukotka Addon Legacy Areas",
      tagline: "Explore the Chukotsky Autonomous Okrug — the easternmost edge of Russia and the entire Eurasian continent.",
      tagline_ru: "Исследуйте Чукотский автономный округ — самую восточную окраину России и всего Евразийского континента.",
      description: "The Chukotka Addon is a legacy expansion for Far East Russia that adds the Chukotsky Autonomous Okrug region to your ETS2 world. Chukotka is one of the most extreme and isolated places on the planet — a land of permafrost tundra, volcanic mountains, and Arctic coastline where temperatures can plunge below -50°C. This addon brings nothing from this, horrible landscape to ETS2 with horrible cities, remote outposts, and roads that are always the same even the most experienced virtual truckers will feel boredom. The region features unique shit types not found elsewhere in FER, including coastal shitty roads, frozen river crossings, and shitty mountain passes with shitty views. Every settlement is built using i have no fckin idea what reference materials to capture the authentic character of this rarely-depicted corner of Russia.",
      description_ru: "Chukotka Addon — это устаревшее расширение для Far East Russia, добавляющее регион Чукотского автономного округа в ваш мир ETS2. Чукотка — одно из самых экстремальных и изолированных мест на планете: земля вечной мерзлоты, вулканических гор и арктического побережья, где температура может опускаться ниже -50°C. Это дополнение приносит ничего из этого ужасного ландшафта в ETS2 с ужасными городами, удалёнными аванпостами и дорогами, которые всегда одинаковы — даже самые опытные виртуальные дальнобойщики ощутят скуку. В регионе есть уникальные хреновые виды, не встречающиеся в остальном FER, включая прибрежные хреновые дороги, замёрзшие речные переправы и хреновые горные перевалы с хреновыми видами. Каждое поселение построено с использованием хз каких справочных материалов, чтобы передать аутентичный характер этого редко изображаемого уголка России.",
      features: [
        { icon: "🏘️", title: "Settlements", text: "settlements in horrible quality." },
        { icon: "🛣️", title: "Same road", text: "tbh, its all the same road." },
        { icon: "🔗", title: "Seamless Integration", text: "Works with FER and the Chukotka RC for a continuous map experience." }
      ],
      features_ru: [
        { icon: "🏘️", title: "Поселения", text: "поселения ужасного качества." },
        { icon: "🛣️", title: "Одна и та же дорога", text: "если честно, это всё одна и та же дорога." },
        { icon: "🔗", title: "Бесшовная интеграция", text: "Работает с FER и Chukotka RC для непрерывного опыта карты." }
      ],
      requirements: [
        "Far East Russia (latest version)",
        "Trans-Siberian Truckway (latest version)",
        "FER – Chukotka RC (for road connection)",
        "ETS2 1.57 or newer"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Trans-Siberian Truckway (последняя версия)",
        "FER – Chukotka RC (для дорожного соединения)",
        "ETS2 1.57 или новее"
      ]
    },

    westYacutiaAddon: {
      title: "West Yacutia Addon",
      title_ru: "West Yacutia Addon",
      tagline: "Explore Western Yakutia — Journey beyond the Lena River into the heart of the taiga.",
      tagline_ru: "Исследуйте Западную Якутию — путешествие за реку Лена в сердце тайги.",
      description: "The West Yacutia Addon expands the Far East Russia map westward, crossing the mighty Lena River into the rugged interior of Western Yakutia. This region is defined by the A-331 'Vilyuy' Federal Highway, a vital lifeline cutting through dense taiga and vast marshlands. Experience meticulously crafted settlements and industrial hubs that reflect the reality of Siberian life. From technical muddy tracks to scenic river crossings, this addon adds a new layer of challenge and immersion, built with high-fidelity reference materials to ensure every kilometer feels authentic to the Siberian wilderness.",
      description_ru: "West Yacutia Addon расширяет карту Far East Russia на запад, пересекая могучую реку Лена и уходя в суровые недра Западной Якутии. Этот регион определяет федеральная трасса А-331 «Вилюй» — жизненно важная артерия, прорезающая плотную тайгу и обширные болота. Ощутите тщательно проработанные поселения и промышленные узлы, отражающие реальность сибирской жизни. От технических грязевых треков до живописных речных переправ — это дополнение добавляет новый уровень сложности и погружения, построенный на основе высококачественных справочных материалов, чтобы каждый километр ощущался аутентично сибирской глуши.",
      features: [
        { icon: "🏘️", title: "Detailed Settlements", text: "High-quality recreations of remote towns and industrial hubs." },
        { icon: "🛣️", title: "A-331 Highway", text: "Drive the iconic Vilyuy highway with realistic geometry and terrain." },
        { icon: "🔗", title: "Seamless Integration", text: "Full compatibility with FER and the West Yacutia RC." }
      ],
      features_ru: [
        { icon: "🏘️", title: "Детализированные поселения", text: "Высококачественные реконструкции удалённых посёлков и промышленных узлов." },
        { icon: "🛣️", title: "Трасса А-331", text: "Проедьте по знаменитой трассе «Вилюй» с реалистичной геометрией и рельефом." },
        { icon: "🔗", title: "Бесшовная интеграция", text: "Полная совместимость с FER и West Yacutia RC." }
      ],
      requirements: [
        "Far East Russia (latest version)",
        "ETS2 1.59 or newer"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "ETS2 1.59 или новее"
      ]
    },

    sakhaAddon: {
      title: "Sakha Addon",
      title_ru: "Sakha Addon",
      tagline: "Venture to Oymyakon — Experience the 'Pole of Cold' in the depths of Siberia.",
      tagline_ru: "Отправьтесь в Оймякон — почувствуйте «Полюс холода» в глубинах Сибири.",
      description: "The Sakha Addon brings the legendary Oymyakon region to Euro Truck Simulator 2, allowing drivers to venture into the coldest inhabited place on Earth. This expansion focuses on the extreme isolation of the Oymyakonsky District, featuring the treacherous roads that branch off the main Kolyma Highway. Navigate through permafrost valleys and remote outposts where the environment is as challenging as the cargo. With hand-placed vegetation, unique architectural assets, and terrain modeled after real-world satellite data, the Sakha Addon offers an unparalleled journey into one of the most hostile yet beautiful environments in Russia.",
      description_ru: "Sakha Addon привносит легендарный регион Оймякон в Euro Truck Simulator 2, позволяя водителям отправиться в самое холодное обитаемое место на Земле. Это расширение сосредоточено на экстремальной изоляции Оймяконского района и включает коварные дороги, ответвляющиеся от главной трассы Колыма. Двигайтесь через долины вечной мерзлоты и удалённые аванпосты, где окружение так же сложно, как и груз. Благодаря вручную размещённой растительности, уникальным архитектурным ассетам и рельефу, смоделированному по реальным спутниковым данным, Sakha Addon предлагает беспрецедентное путешествие в одну из самых суровых и прекрасных сред России.",
      features: [
        { icon: "❄️", title: "Pole of Cold", text: "Explore the world-famous Oymyakon area and its surrounding wilderness." },
        { icon: "🏔️", title: "Extreme Isolation", text: "Tackle remote routes far from the main federal highways." },
        { icon: "🔗", title: "Map Compatibility", text: "Designed to work perfectly with the core Far East Russia map." }
      ],
      features_ru: [
        { icon: "❄️", title: "Полюс холода", text: "Исследуйте всемирно известный район Оймякона и окружающую дикую природу." },
        { icon: "🏔️", title: "Экстремальная изоляция", text: "Преодолевайте удалённые маршруты вдали от основных федеральных трасс." },
        { icon: "🔗", title: "Совместимость карты", text: "Разработано для идеальной работы с основной картой Far East Russia." }
      ],
      requirements: [
        "Far East Russia (latest version)",
        "ETS2 1.58 or newer"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "ETS2 1.58 или новее"
      ]
    }
  },

  /* ---------- Supporters ---------- */
  supporters: {
    donations: [
      { name: "laur1sxd", amount: "40,42 EUR" },
      { name: "Mr JP", amount: "13,62 EUR" },
      { name: "Artie", amount: "4,11 EUR" },
      { name: "Delby", amount: "3,51 EUR" },
      { name: "Xiguawangzi3399", amount: "3,48 EUR" },
      { name: "Killermix", amount: "0.82 EUR" }
    ],
    showcase: [
      { name: "Bogdac", text: "Created many awesome videos from this map & included it in combos", i18nKey: "supporters.showcase.bogdac" },
      { name: "GMC Community", text: "Sharing news from Far East Russia on their Discord and featuring it in map combos", i18nKey: "supporters.showcase.gmc" },
      { name: "Semir Gaming", text: "Streams from far east russia", i18nKey: "supporters.showcase.semir" }
    ]
  }
};
