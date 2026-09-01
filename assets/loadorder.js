/* ==========================================================
   Far East Russia – Load Order (single source of truth)
   ----------------------------------------------------------
   EASY EDIT: All mods, links, and priorities are defined here!
   - Top entry = highest priority in ETS2 Mod Manager (priority 66 down to 01)
   - Links: Enter the official URL (empty string "" if none)
   - To add / remove / reorder, edit MOD_LINKS below.

   This file auto-renders into any element with id="load-order"
   (e.g. loadorder.html, fer.html, etc.) and reacts to EN|RU switch.
   ========================================================== */

var MOD_LINKS = {
  "ETS2 Global Background Map": "https://www.leobmods.net/mod?id=ets2-global-background-map",
  "Ural Map - Russian Federation Extended RC": "https://truckymods.io/euro-truck-simulator-2/map-patches/ural-map-russian-federation-extended-rc-193806",
  "Off the Grid Russia - Northern Open Spaces Connector": "https://mods.to/dTJc6a47f4d3235e5",
  "4 in 1 Northern Open Spaces Connector": "https://mods.to/yKDf6a440f415952a",
  "hmaomap1.0": "https://mods.to/4M2L6a14b1fd4426e",
  "Northern_Open_Spaces_v13.11_1.60": "https://mods.to/KYWo6a439a0e4ad2b",
  "Abkh Map v.1.8": "https://truckymods.io/euro-truck-simulator-2/maps/abkhazia-map-675817",
  "RTC TGS RC v.2.1": "https://truckymods.io/euro-truck-simulator-2/maps/road-to-caucasus-promods-the-great-steppe-road-connector",
  "RTC PRMDS RC v.1.9": "https://truckymods.io/euro-truck-simulator-2/maps/road-to-caucasus-promods-road-connector",
  "RTC RusMap RC v.2.1": "https://truckymods.io/euro-truck-simulator-2/maps/road-to-caucasus-rusmap-road-connector",
  "RTC v.2.8": "https://truckymods.io/euro-truck-simulator-2/maps/road-to-caucasus",
  "Ural - Sibir map rc": "https://truckymods.io/euro-truck-simulator-2/maps/ural-sibir-map-rc-400655",
  "uralmap_18": "https://truckymods.io/euro-truck-simulator-2/maps/ural-map",
  "RusCentryMap - Kirov Map - SibirMap RC": "https://modsfire.com/57d8eG4Z83I9k4m",
  "ulmap10": "https://modsfire.com/467RjehGE552nvH",
  "Donbass RCs for Donbass Priority FIXRestore": "https://lyonzyileonid5.website.yandexcloud.net/mods/DonbassRcsFix.html",
  "PM_RM_Roex_PCher_PRus_RC_Donbass": "https://sharemods.com/of4ckrwdugcf/PM_RM_Roex_PCher_PRus_RC_Donbass.scs.html",
  "Project Chernozemye - Project Russia Official RC": "https://drive.google.com/file/d/1wHjHhJWQ037r7X7TZntWBqknO1azq5Yh/view?usp=sharing",
  "Project Chernozemye - DonbassMap Official RC": "https://truckymods.io/euro-truck-simulator-2/maps/tambovmap",
  "ProjectRussia5.7.1a": "https://truckymods.io/euro-truck-simulator-2/maps/project-russia",
  "Project Chernozemye 2.1.3": "https://truckymods.io/euro-truck-simulator-2/maps/tambovmap",
  "rfex_connector_sibirmap": "https://sharemods.com/luvojanobrio/rfex_connector_sibirmap.scs.html",
  "rfex_connector_nnmap": "https://sharemods.com/9whowtzj9lwg/rfex_connector_nnmap.scs.html",
  "rfex": "https://sharemods.com/5s64bfzx3iq5/rfex.scs.html",
  "M12_NNmap_rc": "https://truckymods.io/euro-truck-simulator-2/maps/rc-nnmap-x-m12-856608",
  "nnmap130": "https://sharemods.com/dbutxetvwwbj/nnmap130.scs.html",
  "M12_Sibirmap_rc": "https://modsfire.com/zZ0dQ3T76i3d3iN",
  "M12_vostok_V.3.0": "https://sharemods.com/oj0gdljkcah5/M12_vostok_V.3.0.rar.html",
  "KirovMap_17_FREE": "https://sharemods.com/xvgia5x2iqqs/KirovMap_17_FREE.scs.html",
  "cnx-pm-eu-v283-rm-v258-roex-v52": "https://soramods.pl/mods/?mod=ProMods+RusMap+Roextended+Connector+%28ProMods+priority+version%29",
  "RusMap-def_v2.58": "https://sharemods.com/6rhxs13k3h86/RusMap_v2.58.zip.html",
  "RusMap-map_v2.58": "https://sharemods.com/6rhxs13k3h86/RusMap_v2.58.zip.html",
  "RusMap-model_v2.58": "https://sharemods.com/6rhxs13k3h86/RusMap_v2.58.zip.html",
  "Gukovo_map-v-1.2.2 (Donbass Version)": "https://soramods.pl/mods/?mod=Gukovo+map",
  "db_SRfix_159U": "https://wdfiles.ru/1v7hv",
  "Donbass_Map-ROEX_RC": "https://sharemods.com/p9zq6q8juoug/Donbass_Map-ROEX_RC.scs.html",
  "donbassmap_159": "https://truckymods.io/euro-truck-simulator-2/maps/donbass-map-461295",
  "db_model159": "https://truckymods.io/euro-truck-simulator-2/maps/donbass-map-461295",
  "RusCentryMap_1.8.1": "https://modsfire.com/RQ8D8qUf9VR6Oht",
  "promods-eu-v283": "https://promods.net/setup.php?game=ets",
  "FER CHKTLA RC": "https://fareastrussia.com/",
  "FER TST RC": "https://fareastrussia.com/",
  "FER OTGR RC": "https://fareastrussia.com/",
  "FER Chukotka ADDON legacy areas": "https://fareastrussia.com/",
  "Far East Russia V2": "https://fareastrussia.com/",
  "otgr_defmap": "https://truckymods.io/euro-truck-simulator-2/maps/off-the-grid-russia",
  "otgr_assets": "https://truckymods.io/euro-truck-simulator-2/maps/off-the-grid-russia",
  "russiaeastaddon": "https://truckymods.io/euro-truck-simulator-2/maps/russia-east-add-on-761395",
  "Trans-Siberia_Altai_Map_RC": "https://mods.to/H6s36a4ab06149b2e/",
  "Trans-Siberia SibirMap Paid RC": "https://mods.to/J4mR6a6f6d080c76e/",
  "Trans-Siberian Truckway": "https://mods.to/7vpB6a6f6c889f964/",
  "ROEX52SR131": "https://roextended.ro/forum/viewtopic.php?f=16&t=2817",
  "ROEX52core": "https://roextended.ro/forum/viewtopic.php?f=16&t=2815",
  "ROEX52main1": "https://roextended.ro/forum/viewtopic.php?f=16&t=2815",
  "ROEX52main2": "https://roextended.ro/forum/viewtopic.php?f=16&t=2815",
  "ROEX52main3": "https://roextended.ro/forum/viewtopic.php?f=16&t=2815",
  "ROEX52main4": "https://roextended.ro/forum/viewtopic.php?f=16&t=2815",
  "SRmod_v13": "https://sharemods.com/d16vw6x8lp8c/SRmod_v13.scs.html",
  "VolgaMap-SibirMap-SV-RC": "https://modsfire.com/6fKn9iEV0t7RmTq",
  "VolgaMap-PmTGS-RC": "https://modsfire.com/Fqf3N59x9jzwbST",
  "VolgaMap_1_5_3": "https://modsfire.com/G12ePei48hEB16S",
  "Altai_Map_1.7.2": "https://truckymods.io/euro-truck-simulator-2/maps/altai-map-334944",
  "ETS2_SIBIRMAP_v2.12.2sv_160": "https://boosty.to/sibirmap/posts/4e2755f4-b720-4e8f-82db-11918fcfd6de",
  "promods-tgs-v162": "https://promods.net/setup.php?game=tgs"
};

// LOAD_ORDER is generated directly from the keys of MOD_LINKS in order
var LOAD_ORDER = Object.keys(MOD_LINKS);
var LOAD_ORDER_RU = Object.keys(MOD_LINKS);

// Expose globally
window.MOD_LINKS = MOD_LINKS;
window.LOAD_ORDER = LOAD_ORDER;
window.LOAD_ORDER_RU = LOAD_ORDER_RU;
window.SITE = window.SITE || {};
window.SITE.modLinks = MOD_LINKS;
window.SITE.loadOrder = LOAD_ORDER;
window.SITE.loadOrder_ru = LOAD_ORDER_RU;

function getModLink(name) {
  if (!name) return "";
  if (typeof name === "object" && name.link) return name.link;
  var str = typeof name === "string" ? name : (name.name || "");
  if (!str) return "";
  if (MOD_LINKS[str]) return MOD_LINKS[str];
  var trimmed = str.trim();
  if (MOD_LINKS[trimmed]) return MOD_LINKS[trimmed];
  var key = trimmed.toLowerCase();
  for (var k in MOD_LINKS) {
    if (k.toLowerCase() === key) return MOD_LINKS[k];
  }
  return "";
}

(function () {
  function getList() {
    if (window.I18N && typeof window.I18N.localize === "function") {
      var fake = { loadOrder: LOAD_ORDER, loadOrder_ru: LOAD_ORDER_RU };
      var localized = window.I18N.localize(fake, "loadOrder");
      if (Array.isArray(localized) && localized.length) return localized;
    }
    if (window.I18N && typeof window.I18N.effectiveLang === "function") {
      if (window.I18N.effectiveLang() === "ru") return LOAD_ORDER_RU;
    } else if (document.documentElement.getAttribute("lang") === "ru") {
      return LOAD_ORDER_RU;
    }
    return LOAD_ORDER;
  }

  function render() {
    var el = document.getElementById("load-order");
    if (!el) return;
    var list = getList();
    el.innerHTML = "";
    var ol = document.createElement("ol");
    ol.className = "load-order-list";

    var isRu = (window.I18N && typeof window.I18N.effectiveLang === "function" && window.I18N.effectiveLang() === "ru") || (document.documentElement.getAttribute("lang") === "ru");
    var linkLabel = (window.I18N && typeof window.I18N.t === "function") ? window.I18N.t("common.officialLink") : (isRu ? "Официальная ссылка" : "Official Link");
    if (!linkLabel || linkLabel === "common.officialLink") {
      linkLabel = isRu ? "Официальная ссылка" : "Official Link";
    }

    list.forEach(function (item) {
      var name = typeof item === "string" ? item : (item && item.name ? item.name : "");
      var link = getModLink(item);
      var li = document.createElement("li");

      if (link) {
        var wrap = document.createElement("div");
        wrap.className = "load-order-item-wrap";

        var nameSpan = document.createElement("span");
        nameSpan.className = "load-order-name";
        nameSpan.textContent = name;
        wrap.appendChild(nameSpan);

        var a = document.createElement("a");
        a.className = "load-order-link";
        a.href = link;
        if (!link.endsWith(".html") && !link.startsWith("#")) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        a.innerHTML = linkLabel + ' <span aria-hidden="true">↗</span>';
        wrap.appendChild(a);

        li.appendChild(wrap);
      } else {
        li.textContent = name;
      }

      ol.appendChild(li);
    });
    el.appendChild(ol);
  }

  // Render as soon as DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }

  // Re-render on language switch (EN|RU)
  if (window.I18N && typeof window.I18N.onChange === "function") {
    window.I18N.onChange(render);
  }
  window.addEventListener("i18n-langchange", render);

  // Re-render after window load
  window.addEventListener("load", render);

  // Expose for manual calls / debugging
  window.renderLoadOrder = render;
})();
