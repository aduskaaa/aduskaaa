/* ==========================================================
   Far East Russia – Site Renderer
   ----------------------------------------------------------
   Auto-renders shared components from site-data.js:
   • Header with nav + mobile hamburger menu
   • Footer with links + copyright year
   • Load order list
   • Shared makeVersionItem() for download pages
   ========================================================== */

(function () {
    var S = window.SITE;
    if (!S) return;

    /* ========== HEADER + NAV ========== */
    var header = document.getElementById("site-header");
    if (header) {
        var navHtml = S.nav
            .map(function (l) {
                return '<a href="' + l.href + '">' + l.label + "</a>";
            })
            .join("");
        navHtml +=
            '<a href="' + S.discordUrl + '" target="_blank" class="discord-btn">DISCORD</a>';

        header.innerHTML =
            '<div class="container header-inner">' +
            '<a href="index.html" class="brand" aria-label="Far East Russia home">' +
            '<img src="imgs/FER-ICON.png" alt="FER logo">' +
            "<span>Far East Russia</span>" +
            "</a>" +
            '<button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">' +
            "<span></span><span></span><span></span>" +
            "</button>" +
            '<nav class="nav" id="nav-menu" aria-label="Primary">' +
            navHtml +
            "</nav>" +
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
            /* close on link click (mobile) */
            menu.querySelectorAll("a").forEach(function (a) {
                a.addEventListener("click", function () {
                    menu.classList.remove("nav-open");
                    btn.classList.remove("open");
                    btn.setAttribute("aria-expanded", "false");
                });
            });
        }
    }

    /* ========== FOOTER ========== */
    var footer = document.getElementById("site-footer");
    if (footer) {
        var linksHtml = S.footer
            .map(function (l) {
                return '<a href="' + l.href + '">' + l.label + "</a>";
            })
            .join("");
        footer.innerHTML =
            '<div class="container footer-inner">' +
            "<div>&copy; " + new Date().getFullYear() + " Far East Russia &middot; ETS2 Map Mod</div>" +
            '<div class="footer-links">' + linksHtml + "</div>" +
            "</div>";
    }

    /* ========== LOAD ORDER ========== */
    var loEl = document.getElementById("load-order");
    if (loEl && S.loadOrder) {
        var ol = document.createElement("ol");
        ol.className = "load-order-list";
        S.loadOrder.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            ol.appendChild(li);
        });
        loEl.appendChild(ol);
    }

    /* ========== SUPPORTERS (index page) ========== */
    var supEl = document.getElementById("supporters-data");
    if (supEl && S.supporters) {
        var html = "";
        if (S.supporters.donations && S.supporters.donations.length) {
            html += "<strong>Donations:</strong>";
            S.supporters.donations.forEach(function (d) {
                html +=
                    '<div class="supporter-row">' +
                    '<div class="glow-text">' + d.name + "</div>" +
                    "<span>" + d.amount + " &lt;3</span>" +
                    "</div>";
            });
        }
        if (S.supporters.showcase && S.supporters.showcase.length) {
            html += "<strong>Showcase:</strong>";
            S.supporters.showcase.forEach(function (s) {
                html +=
                    '<div class="supporter-row">' +
                    '<div class="glow-text">' + s.name + "</div>" +
                    "<span>" + s.text + " &lt;3</span>" +
                    "</div>";
            });
        }
        supEl.innerHTML = html;
    }

    /* ========== FAQ ========== */
    var faqEl = document.getElementById("faq-data");
    if (faqEl && S.faq) {
        S.faq.forEach(function (item) {
            var details = document.createElement("details");
            var summary = document.createElement("summary");
            summary.textContent = item.q;
            var p = document.createElement("p");
            p.innerHTML = item.a;
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
        S.pages.fer.stats.slice(0, 2).forEach(function (s) {
            statsHtml += '<div class="stat"><strong>' + s.value + '</strong> ' + s.label + '</div>';
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
})();
