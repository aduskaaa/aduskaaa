/* ==========================================================
   Far East Russia – Site Renderer
   ----------------------------------------------------------
   Auto-renders shared components from site-data.js:
   • Header with nav + mobile hamburger menu + lang switch
   • Footer with links + copyright year
   • Load order list
   • Shared makeVersionItem() for download pages

   When window.I18N is loaded, rendered elements receive
   data-i18n attributes so I18N.apply() can localise them.
   ========================================================== */

(function () {
    var S = window.SITE;
    if (!S) return;

    function i18nAttr(key, type) {
        if (!key || !window.I18N) return "";
        var attr = type === "html" ? "data-i18n-html" : "data-i18n";
        return ' ' + attr + '="' + key + '"';
    }

    /* ========== HEADER + NAV + LANG SWITCH ========== */
    var header = document.getElementById("site-header");
    if (header) {
        var navHtml = S.nav
            .map(function (l) {
                var key = l.i18nKey || ("nav." + l.label);
                return '<a href="' + l.href + '"' + i18nAttr(key) + '>' + l.label + "</a>";
            })
            .join("");
        navHtml +=
            '<a href="' + S.discordUrl + '" target="_blank" class="discord-btn"' +
            i18nAttr("nav.DISCORD") + '>DISCORD</a>';

        var langSwitchHtml = "";
        if (window.I18N) {
            var enFlag = window.I18N.flagSvg ? window.I18N.flagSvg("en") : "";
            var ruFlag = window.I18N.flagSvg ? window.I18N.flagSvg("ru") : "";
            langSwitchHtml =
                '<div class="lang-switch" role="group" aria-label="Language switch">' +
                '<button type="button" data-lang="en" aria-label="English">' +
                '<span class="flag">' + enFlag + '</span> EN</button>' +
                '<span class="sep">|</span>' +
                '<button type="button" data-lang="ru" aria-label="Русский">' +
                '<span class="flag">' + ruFlag + '</span> RU</button>' +
                '</div>';
        }

        header.innerHTML =
            '<div class="container header-inner">' +
            '<a href="index.html" class="brand" aria-label="Far East Russia home">' +
            '<img src="imgs/FER-ICON.png" alt="FER logo">' +
            "<span>Far East Russia</span>" +
            "</a>" +
            '<div class="header-right">' +
            '<nav class="nav" id="nav-menu" aria-label="Primary">' +
            navHtml +
            "</nav>" +
            langSwitchHtml +
            '<button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">' +
            "<span></span><span></span><span></span>" +
            "</button>" +
            "</div>" +
            "</div>";

        /* Hamburger toggle */
        var btn = document.getElementById("hamburger");
        var menu = document.getElementById("nav-menu");
        if (btn && menu) {
            btn.addEventListener("click", function () {
                var open = menu.classList.toggle("nav-open");
                btn.classList.toggle("open", open);
                btn.setAttribute("aria-expanded", open);
            });
            menu.querySelectorAll("a").forEach(function (a) {
                a.addEventListener("click", function () {
                    menu.classList.remove("nav-open");
                    btn.classList.remove("open");
                    btn.setAttribute("aria-expanded", "false");
                });
            });
        }

        /* Language switch handlers */
        if (window.I18N) {
            header.querySelectorAll(".lang-switch button[data-lang]").forEach(function (b) {
                b.addEventListener("click", function () {
                    window.I18N.setLang(b.getAttribute("data-lang"));
                });
            });
        }
    }

    /* ========== FOOTER ========== */
    var footer = document.getElementById("site-footer");
    if (footer) {
        var linksHtml = S.footer
            .map(function (l) {
                var key = l.i18nKey || ("footer." + l.label);
                return '<a href="' + l.href + '"' + i18nAttr(key) + '>' + l.label + "</a>";
            })
            .join("");
        footer.innerHTML =
            '<div class="container footer-inner">' +
            "<div>&copy; " + new Date().getFullYear() + " " +
            '<span' + i18nAttr("footer.copy") + ">Far East Russia &middot; ETS2 Map Mod</span>" +
            "</div>" +
            '<div class="footer-links">' + linksHtml + "</div>" +
            "</div>";
    }

    /* ========== LOAD ORDER ========== */
    var loEl = document.getElementById("load-order");
    if (loEl && S.loadOrder) {
        function renderLoadOrder() {
            loEl.innerHTML = "";
            var arr = (window.I18N && window.I18N.localize)
                ? window.I18N.localize(S, "loadOrder")
                : S.loadOrder;
            var ol = document.createElement("ol");
            ol.className = "load-order-list";
            arr.forEach(function (item) {
                var li = document.createElement("li");
                li.textContent = item;
                ol.appendChild(li);
            });
            loEl.appendChild(ol);
        }
        renderLoadOrder();
        if (window.I18N && window.I18N.onChange) window.I18N.onChange(renderLoadOrder);
    }

    /* ========== SUPPORTERS (index page) ========== */
    var supEl = document.getElementById("supporters-data");
    if (supEl && S.supporters) {
        var html = "";
        if (S.supporters.donations && S.supporters.donations.length) {
            html += "<strong" + i18nAttr("supporters.donations") + ">Donations:</strong>";
            S.supporters.donations.forEach(function (d) {
                html +=
                    '<div class="supporter-row">' +
                    '<div class="glow-text">' + d.name + "</div>" +
                    "<span>" + d.amount + " &lt;3</span>" +
                    "</div>";
            });
        }
        if (S.supporters.showcase && S.supporters.showcase.length) {
            html += "<strong" + i18nAttr("supporters.showcase") + ">Showcase:</strong>";
            S.supporters.showcase.forEach(function (s) {
                var textAttr = s.i18nKey ? i18nAttr(s.i18nKey) : "";
                html +=
                    '<div class="supporter-row">' +
                    '<div class="glow-text">' + s.name + "</div>" +
                    "<span" + textAttr + ">" + s.text + " &lt;3</span>" +
                    "</div>";
            });
        }
        supEl.innerHTML = html;
    }

    /* ========== FAQ ========== */
    var faqEl = document.getElementById("faq-data");
    if (faqEl && S.faq) {
        S.faq.forEach(function (item, i) {
            var details = document.createElement("details");
            var summary = document.createElement("summary");
            summary.textContent = item.q;
            if (window.I18N) summary.setAttribute("data-i18n", item.qKey || ("faq.q" + (i + 1)));
            var p = document.createElement("p");
            p.innerHTML = item.a;
            if (window.I18N) p.setAttribute("data-i18n-html", item.aKey || ("faq.a" + (i + 1)));
            details.appendChild(summary);
            details.appendChild(p);
            faqEl.appendChild(details);
        });
    }

    /* ========== PAYPAL LINKS ========== */
    var ppLinks = document.querySelectorAll('a[href*="paypal.me"]');
    if (ppLinks.length && S.paypalUrl) {
        ppLinks.forEach(function (a) { a.href = S.paypalUrl; });
    }

    /* ========== INDEX PAGE STATS ========== */
    var idxStats = document.getElementById("index-map-stats");
    if (idxStats && S.pages && S.pages.fer && S.pages.fer.stats) {
        var statsHtml = "";
        S.pages.fer.stats.slice(0, 2).forEach(function (s, i) {
            var key = s.i18nKey || ("map.stat" + (i + 1));
            statsHtml += '<div class="stat"><strong>' + s.value + '</strong> ' +
                '<span' + i18nAttr(key) + '>' + s.label + '</span>' +
                '</div>';
        });
        idxStats.innerHTML = statsHtml;
    }

    /* ========== SHARED makeVersionItem ========== */
    window.makeVersionItem = function (v, label) {
        var div = document.createElement("div");
        div.className = "version-item";
        var title = document.createElement("div");
        title.innerHTML = "<strong>" + label + " " + (v.version || "") + "</strong>";
        var meta = document.createElement("div");
        meta.className = "version-meta";
        var parts = [v.date || ""];
        if (v.game) parts.push(v.game);
        if (v.size) parts.push(v.size);
        if (v.requires && v.requires.length) parts.push(v.requires.join(", "));
        meta.textContent = parts.filter(Boolean).join(" • ");
        var notes = document.createElement("div");
        notes.className = "version-notes";
        notes.textContent = v.notes || "";
        var actions = document.createElement("div");
        actions.className = "version-actions";
        if (v.links && v.links.primary) {
            var dl = document.createElement("a");
            dl.className = "button button-primary";
            dl.href = v.links.primary;
            dl.textContent = "Download";
            actions.appendChild(dl);
        }
        if (v.links && v.links.mirror1) {
            var m1 = document.createElement("a");
            m1.className = "button button-secondary";
            m1.href = v.links.mirror1;
            m1.textContent = "Mirror";
            actions.appendChild(m1);
        }
        div.appendChild(title);
        div.appendChild(meta);
        div.appendChild(notes);
        div.appendChild(actions);
        return div;
    };

    /* ========== Re-apply translations after rendering ========== */
    if (window.I18N && typeof window.I18N.apply === "function") {
        window.I18N.apply();
    }
})();
