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
  vkUrl: "https://vk.ru/far_east_russia",
  paypalUrl: "https://paypal.me/aduskaaaa",

  /* ---------- Navigation ---------- */
  nav: [
    { label: "HOME", href: "index.html" },
    { label: "FER", href: "fer.html" },
    { label: "MAP", href: "interactive-map.html" },
    { label: "ADDONS/RCS", href: "addons-rcs.html", i18nKey: "nav.ADDONS_RCS" },
    { label: "GALLERY", href: "gallery.html" },
    { label: "VERSIONS", href: "versions.html" },
    { label: "LOAD ORDER", href: "loadorder.html", i18nKey: "nav.LOADORDER" },
    { label: "SUPPORT", href: "support.html" }
  ],

  /* ---------- Footer links ---------- */
  footer: [
    { label: "Home", href: "index.html" },
    { label: "FER", href: "fer.html" },
    { label: "Map", href: "interactive-map.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Versions", href: "versions.html" },
    { label: "Load Order", href: "loadorder.html" },
    { label: "Support", href: "support.html" },
    { label: "Privacy & Policy", href: "p&p.html" }
  ],

  /* ---------- Page content ---------- */
  pages: {

    fer: {
      title: "Far East Russia (FER)",
      title_ru: "Far East Russia (FER)",
      tagline: "The main map: Yakutia, the Kolyma Highway and everything in between. Built by one person, driven by thousands.",
      tagline_ru: "Главная карта: Якутия, трасса Колыма и всё между ними. Построена одним человеком, проехана тысячами.",
      description: "I started FER because I wanted to drive the Russian Far East in ETS2, and nobody had built it yet. What began as a couple of roads around Yakutsk has grown into a map with more than 5,900 km of drivable routes: federal highways like the R-504 Kolyma, regional roads, winter roads, and plenty of unnamed dirt tracks that will shake your truck apart if you rush them. There are 50+ cities and settlements, from Yakutsk down to villages you can only reach by ferry or a gravel road. Almost everything is modeled from real references, so the geometry and signage match reality as closely as I can get them. A few honest warnings: distances here are huge, fuel stations are rare, and the terrain does not care about your schedule. If that sounds like your kind of trucking, grab the latest release below and drive east. If you get stuck, the Discord server is the fastest way to reach me.",
      description_ru: "Я начал FER, потому что хотел прокатиться по Дальнему Востоку России в ETS2, а никто его ещё не построил. То, что начиналось с пары дорог вокруг Якутска, выросло в карту с более чем 5 900 км проезжаемых маршрутов: федеральные трассы вроде Р-504 «Колыма», региональные дороги, зимники и куча безымянных грунтовок, которые разнесут вашу машину по деталям, если торопиться. Здесь больше 50 городов и посёлков — от Якутска до деревень, куда можно добраться только паромом или по гравийке. Почти всё смоделировано по реальным материалам, так что геометрия дорог и знаки максимально близки к настоящим. Пара честных предупреждений: дистанции здесь огромные, заправки редкие, а местности плевать на ваш график. Если звучит как ваше — качайте последний релиз ниже и езжайте на восток. Застряли? Discord — самый быстрый способ меня достать.",
      features: [
        { icon: "", title: "5,900+ km of Roads", text: "Federal highways, regional roads and unnamed dirt tracks, all drawn by hand with real geometry and signage." },
        { icon: "", title: "50+ Cities & Settlements", text: "From Yakutsk down to villages you can only reach by gravel road or river ferry." },
        { icon: "", title: "River Ferries", text: "Cross the big Siberian rivers by ferry. Some places here are only reachable by water." },
        { icon: "", title: "Extreme Terrain", text: "Winter roads that never melt, mountain passes, fords. The map will test your patience, in a good way." },
        { icon: "", title: "Runs on Anything", text: "Optimized sectors keep things smooth even on mid-range hardware." },
        { icon: "", title: "Regular Updates", text: "New roads, cities and fixes land every few weeks. The map keeps creeping east." }
      ],
      features_ru: [
        { icon: "", title: "Более 5 900 км дорог", text: "Федеральные трассы, региональные дороги и безымянные грунтовки — все нарисованы вручную с реальной геометрией и знаками." },
        { icon: "", title: "Более 50 городов и поселений", text: "От Якутска до деревень, куда можно добраться только по гравийке или речным паромом." },
        { icon: "", title: "Речные паромы", text: "Переправляйтесь через большие сибирские реки паромом. Некоторые места доступны только по воде." },
        { icon: "", title: "Экстремальная местность", text: "Зимники, которые не тают, горные перевалы, броды. Карта проверит ваше терпение, но по-хорошему." },
        { icon: "", title: "Идёт на всём", text: "Оптимизированные секторы держат плавность даже на среднем железе." },
        { icon: "", title: "Регулярные обновления", text: "Новые дороги, города и фиксы выходят каждые несколько недель. Карта продолжает ползти на восток." }
      ],
      stats: [
        { value: "5,900+", label: "km of driveable roads" },
        { value: "50+", label: "cities & settlements" },
        { value: "1.60", label: "version supported" }
      ],
      stats_ru: [
        { value: "5 900+", label: "км проезжих дорог" },
        { value: "50+", label: "городов и поселений" },
        { value: "1.60", label: "поддерживаемая версия" }
      ],
      installSteps: [
        "Grab the latest release below.",
        "Drop the <code>.scs</code> / <code>.zip</code> file into your mod folder (<code>Documents/Euro Truck Simulator 2/mod</code>).",
        "Turn the mod on in ETS2's Mod Manager.",
        "Set the load order like shown below. RCs and addons go above FER.",
        "Load a profile and drive east. Mind the fuel."
      ],
      installSteps_ru: [
        "Скачайте последний релиз ниже.",
        "Закиньте файл <code>.scs</code> / <code>.zip</code> в папку модов (<code>Documents/Euro Truck Simulator 2/mod</code>).",
        "Включите мод в Mod Manager ETS2.",
        "Расставьте порядок загрузки, как показано ниже. RCs и дополнения ставятся выше FER.",
        "Загрузите профиль и езжайте на восток. Следите за топливом."
      ]
    },

    ferOtgr: {
      title: "FER – OTGR Road Connection",
      title_ru: "FER – OTGR Дорожное соединение",
      tagline: "Connects Far East Russia with Off The Grid Russia. One border, endless route.",
      tagline_ru: "Соединяет Far East Russia с Off The Grid Russia. Одна граница, бесконечный маршрут.",
      description: "OTGR is a great map, but on its own it stops right where FER begins, and the other way around. This road connection fixes that. It aligns the terrain, roads and sectors of both maps at the border, so you can haul freight from Yakutia deep into OTGR territory without gaps or visual glitches. The connector is small, it doesn't hurt performance, and I update it together with major FER releases so compatibility stays intact. Install it above both main maps in the Mod Manager, and only if you actually play both.",
      description_ru: "OTGR — отличная карта, но сама по себе она обрывается ровно там, где начинается FER, и наоборот. Это Дорожное соединение это чинит. Оно сводит рельеф, дороги и секторы обеих карт на границе, так что можно везти груз из Якутии в глубь территорий OTGR без дыр и визуальных глюков. Коннектор маленький, на производительность не влияет, и я обновляю его вместе с крупными релизами FER, чтобы совместимость не отваливалась. Ставится выше обеих основных карт в Mod Manager, и только если вы реально играете в обе.",
      requirements: [
        "Far East Russia (latest version)",
        "Off The Grid Russia (latest version)",
        "ETS2 1.58/1.59/1.60"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Off The Grid Russia (последняя версия)",
        "ETS2 1.58/1.59/1.60"
      ]
    },

    ferChukotka: {
      title: "FER – Chukotka Road Connection",
      title_ru: "FER – Chukotka Дорожное соединение",
      tagline: "The last leg east. Connect FER to Chukotka and keep driving until the road runs out.",
      tagline_ru: "Последний рывок на восток. Соедините FER с Чукоткой и езжайте, пока не кончится дорога.",
      description: "Chukotka is the eastern edge of the continent, and getting there should feel like it. This connector joins the FER core map with the Chukotka addon region, blending terrain elevation, road alignment and vegetation zones across the border so it feels like one continuous world rather than two mods glued together. You'll need both FER and the Chukotka Addon installed, with this RC placed above them in the load order. Once it's set up, you can drive from central Yakutia all the way to the Arctic coast.",
      description_ru: "Чукотка — восточный край континента, и дорога туда должна это ощущаться. Этот коннектор стыкует основную карту FER с регионом дополнения Chukotka, сводя рельеф, трассировку дорог и зоны растительности через границу так, что это ощущается как один непрерывный мир, а не два мода на клею. Нужны установленные FER и Chukotka Addon, а этот RC ставится выше них в порядке загрузки. Когда всё настроено, можно проехать из центральной Якутии прямо до арктического побережья.",
      requirements: [
        "Far East Russia (latest version)",
        "Chukotka Addon (latest version)",
        "ETS2 1.58/1.59/1.60"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Chukotka Addon (последняя версия)",
        "ETS2 1.58/1.59/1.60"
      ]
    },

    ferTst: {
      title: "FER – TST Road Connection",
      title_ru: "FER – TST Дорожное соединение",
      tagline: "Hook FER up to the Trans-Siberian Truckway and cross half a continent in one run.",
      tagline_ru: "Подключите FER к Trans-Siberian Truckway и проедьте полконтинента за один заход.",
      description: "Pairing TST with FER gives you one of the longest continuous routes available in ETS2 modding: from western Russia all the way to Yakutia, no teleporting, no profile switching. The connection point is calibrated so road widths, textures and elevation match on both sides of the border. If long-haul is your thing, start this one in the west and don't look back. Requires both maps installed, with this RC above them in the load order.",
      description_ru: "Связка TST и FER — один из самых длинных непрерывных маршрутов в моддинге ETS2: из западной России прямо до Якутии, без телепортов и смены профилей. Точка соединения откалибрована так, что ширина дорог, текстуры и высоты совпадают по обе стороны границы. Если дальнобой — ваше, стартуйте на западе и не оглядывайтесь. Нужны обе карты, а этот RC ставится выше них в порядке загрузки.",
      requirements: [
        "Far East Russia (latest version)",
        "Trans-Siberian Truckway (latest version)",
        "ETS2 1.58/1.59/1.60"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Trans-Siberian Truckway (последняя версия)",
        "ETS2 1.58/1.59/1.60"
      ]
    },

    chukotkaAddon: {
      title: "Chukotka Addon Legacy Areas",
      title_ru: "Chukotka Addon Legacy Areas",
      tagline: "The far north-east of Russia: permafrost, Arctic coastline and settlements you won't find on many maps.",
      tagline_ru: "Дальний северо-восток России: вечная мерзлота, арктическое побережье и посёлки, которые есть не на каждой карте.",
      description: "Chukotka is about as remote as it gets: temperatures below -50°C, towns cut off from the road network for most of the year, and landscapes that look like another planet. This addon brings that region into FER with its own custom assets: coastal dirt roads, frozen river crossings and a handful of isolated settlements modeled from real reference materials. Don't expect dense traffic or quick deliveries out here. Do expect the longest, loneliest stretches of road in the entire mod. Requires FER, and works best together with the FER – Chukotka RC.",
      description_ru: "Чукотка — это почти предел удалённости: температуры ниже -50°C, посёлки, отрезанные от дорожной сети на большую часть года, и пейзажи как с другой планеты. Это дополнение приносит регион в FER со своими уникальными ассетами: прибрежные грунтовки, переправы по замёрзшим рекам и горстка изолированных поселений, смоделированных по реальным материалам. Не ждите здесь плотного трафика и быстрых доставок. Ждите самые длинные и одинокие перегоны во всём моде. Требуется FER, а лучше всего работает вместе с FER – Chukotka RC.",
      features: [
        { icon: "", title: "Remote Settlements", text: "Northern towns and lonely coastal outposts, built from photos people actually took there." },
        { icon: "", title: "Nasty Routes", text: "Dirt roads, ice crossings and narrow passes. Your suspension will remember them." },
        { icon: "", title: "Plays Nice With FER", text: "Add the Chukotka RC on top and it all becomes one continuous map." }
      ],
      features_ru: [
        { icon: "", title: "Удалённые поселения", text: "Северные посёлки и одинокие прибрежные аванпосты по фото реальных людей." },
        { icon: "", title: "Вредные маршруты", text: "Грунтовки, ледовые переправы и узкие перевалы. Подвеска их запомнит." },
        { icon: "", title: "Дружит с FER", text: "Добавьте сверху Chukotka RC — и всё это станет одной непрерывной картой." }
      ],
      requirements: [
        "Far East Russia (latest version)",
        "Trans-Siberian Truckway (latest version)",
        "FER – Chukotka RC (for road connection)",
        "ETS2 1.58/1.59/1.60"
      ],
      requirements_ru: [
        "Far East Russia (последняя версия)",
        "Trans-Siberian Truckway (последняя версия)",
        "FER – Chukotka RC (для дорожного соединения)",
        "ETS2 1.58/1.59/1.60"
      ],
      stats: [
        { value: "1,100+", label: "km of driveable roads" },
        { value: "5", label: "cities & settlements" },
        { value: "1.58/1.59/1.60", label: "version supported" }
      ],
      stats_ru: [
        { value: "1 100+", label: "км проезжих дорог" },
        { value: "5", label: "городов и поселений" },
        { value: "1.58/1.59/1.60", label: "поддерживаемая версия" }
      ]
    },


  },

  /* ---------- Supporters ---------- */
  supporters: {
    donations: [
      { name: "laur1sxd", amount: "40,42 EUR", amount_ru: "4 042,00 ₽" },
      { name: "Mr JP", amount: "16,12 EUR", amount_ru: "1 612,00 ₽" },
      { name: "Artie", amount: "8,48 EUR", amount_ru: "848,00 ₽" },
      { name: "weskergood1234", amount: "10,24 EUR", amount_ru: "1 024,00 ₽"},
      { name: "Maxi", amount: "4,50 EUR", amount_ru: "450,00 ₽" },
      { name: "Delby", amount: "3,51 EUR", amount_ru: "351,00 ₽" },
      { name: "Xiguawangzi3399", amount: "3,48 EUR", amount_ru: "348,00 ₽" },
      { name: "Nachito", amount: "3,00 EUR", amount_ru: "300,00 ₽" },
      { name: "Killermix", amount: "0.40 EUR", amount_ru: "40,00 ₽" }
    ],
    showcase: [
      { name: "Bogdac", text: "Created many awesome videos from this map & included it in combos", i18nKey: "supporters.showcase.bogdac" },
      { name: "GMC Community", text: "Sharing news from Far East Russia on their Discord and featuring it in map combos", i18nKey: "supporters.showcase.gmc" },
      { name: "Semir Gaming", text: "Streams from far east russia", i18nKey: "supporters.showcase.semir" },
      { name: "Vikingo", text: "Made V2 showcase", i18nKey: "supporters.showcase.vikingo" }
    ]
  }
};
