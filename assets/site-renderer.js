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
        // Mobile-only Discord link in mobile navigation menu dropdown
        navHtml +=
            '<a href="' + S.discordUrl + '" target="_blank" class="discord-btn desktop-hide"' +
            i18nAttr("nav.DISCORD") + '>DISCORD</a>';

        var discordHtml =
            '<a href="' + S.discordUrl + '" target="_blank" class="discord-btn mobile-hide"' +
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
        var token = localStorage.getItem("fer_token");
        var username = localStorage.getItem("fer_username");
        var profileHtml = "";

        if (token && username) {
            var initials = username.charAt(0).toUpperCase();
            var hash = 0;
            for (var i = 0; i < username.length; i++) {
                hash = username.charCodeAt(i) + ((hash << 5) - hash);
            }
            var colors = [
                "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b",
                "#ef4444", "#06b6d4", "#14b8a6", "#a855f7", "#f43f5e"
            ];
            var avatarBg = colors[Math.abs(hash) % colors.length];

            var lang = (window.I18N && typeof window.I18N.getLang === "function") ? window.I18N.getLang() : "en";
            profileHtml =
                '<div class="header-user" id="header-user">' +
                '<div class="header-user-avatar" style="background-color: ' + avatarBg + '">' + initials + '</div>' +
                '<span class="header-username">' + username + '</span>' +
                '<div class="header-user-dropdown">' +
                '<button type="button" id="header-settings-btn">' + (lang === "ru" ? "Настройки" : "Settings") + '</button>' +
                '<button type="button" id="header-logout-btn">' + (lang === "ru" ? "Выйти" : "Log Out") + '</button>' +
                '</div>' +
                '</div>';
        } else {
            var currentPage = encodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
            var label = (window.I18N && typeof window.I18N.translate === "function")
                ? window.I18N.translate("common.signInOrSignUp")
                : "Sign In / Sign Up";
            profileHtml =
                '<a href="login.html?redirect=' + currentPage + '" class="header-signin-btn" data-i18n="common.signInOrSignUp">' + label + '</a>';
        }

        var themeToggleHtml =
            '<button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">' +
            '<span class="theme-icon-container">' +
            '<svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>' +
            '<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>' +
            '</span>' +
            '</button>';

        header.innerHTML =
            '<div class="container header-inner">' +
            '<div class="header-left">' +
            '<a href="index.html" class="brand" aria-label="Far East Russia home">' +
            '<img src="imgs/FER-ICON.png" alt="FER logo">' +
            "<span>Far East Russia</span>" +
            "</a>" +
            '<nav class="nav" id="nav-menu" aria-label="Primary">' +
            navHtml +
            "</nav>" +
            '</div>' +
            '<div class="header-right">' +
            profileHtml +
            discordHtml +
            langSwitchHtml +
            themeToggleHtml +
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

        /* Theme toggle handler */
        var themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", function () {
                var current = document.documentElement.getAttribute("data-theme") || "dark";
                var next = current === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", next);
                
                try {
                    localStorage.setItem("site_theme", next);
                } catch (e) {}
                try {
                    var d = new Date();
                    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
                    document.cookie = "site_theme=" + encodeURIComponent(next) +
                        "; expires=" + d.toUTCString() +
                        "; path=/; SameSite=Lax";
                } catch (e) {}
            });
        }

        /* Logout handler */
        var logoutBtn = document.getElementById("header-logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("fer_token");
                localStorage.removeItem("fer_username");
                window.location.reload();
            });
        }

        /* Settings Modal & logic */
        var lang = (window.I18N && typeof window.I18N.getLang === "function") ? window.I18N.getLang() : "en";
        var settingsBtn = document.getElementById("header-settings-btn");
        if (settingsBtn && !document.getElementById("settings-modal")) {
            var modalHtml = 
                '<div class="settings-modal" id="settings-modal">' +
                '<div class="settings-modal-content">' +
                '<div class="settings-modal-header">' +
                '<h2 id="settings-modal-title">' + (lang === "ru" ? "Настройки аккаунта" : "Account Settings") + '</h2>' +
                '<button class="settings-modal-close" id="settings-modal-close">&times;</button>' +
                '</div>' +
                '<div class="settings-modal-body">' +
                
                // Change password
                '<div class="settings-section">' +
                '<h3>' + (lang === "ru" ? "Смена пароля" : "Change Password") + '</h3>' +
                '<form id="settings-password-form">' +
                '<div class="form-row" style="margin-bottom: 12px;">' +
                '<label style="display: block; font-size: 13px; margin-bottom: 4px; font-weight: 500;">' + (lang === "ru" ? "Текущий пароль" : "Current Password") + '</label>' +
                '<input type="password" id="settings-current-password" required placeholder="' + (lang === "ru" ? "Введите текущий пароль" : "Enter current password") + '" style="width:100%; padding:8px; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text); box-sizing:border-box;">' +
                '</div>' +
                '<div class="form-row" style="margin-bottom: 12px;">' +
                '<label style="display: block; font-size: 13px; margin-bottom: 4px; font-weight: 500;">' + (lang === "ru" ? "Новый пароль" : "New Password") + '</label>' +
                '<input type="password" id="settings-new-password" required placeholder="' + (lang === "ru" ? "Минимум 6 символов" : "Min 6 characters") + '" style="width:100%; padding:8px; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text); box-sizing:border-box;">' +
                '</div>' +
                '<div class="form-row" style="margin-top: 16px; display:flex; align-items:center; gap:8px;">' +
                '<button type="submit" class="button button-primary" style="padding: 8px 16px; font-size: 13px;">' + (lang === "ru" ? "Обновить" : "Update Password") + '</button>' +
                '<span class="settings-status-msg" id="settings-password-status" style="font-size: 12px; font-weight: 600;"></span>' +
                '</div>' +
                '</form>' +
                '</div>' +
                
                '<hr class="settings-divider">' +
                
                // Email & 2FA
                '<div class="settings-section">' +
                '<h3>' + (lang === "ru" ? "Email и двухфакторная аутентификация (2FA)" : "Email & Two-Factor Authentication (2FA)") + '</h3>' +
                '<div class="form-row" style="margin-bottom: 12px;">' +
                '<label style="display: block; font-size: 13px; margin-bottom: 4px; font-weight: 500;">' + (lang === "ru" ? "Привязанный Email" : "Linked Email") + '</label>' +
                '<div style="display: flex; gap: 8px;">' +
                '<input type="email" id="settings-email" placeholder="' + (lang === "ru" ? "Email не привязан" : "No email linked") + '" style="flex:1; padding:8px; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text); box-sizing:border-box;">' +
                '<button type="button" id="settings-email-btn" class="button" style="padding: 8px 16px; font-size: 13px; white-space:nowrap;">' + (lang === "ru" ? "Сохранить" : "Link Email") + '</button>' +
                '</div>' +
                '<span class="settings-status-msg" id="settings-email-status" style="margin-top: 6px; font-size: 12px; font-weight: 600; display: block;"></span>' +
                '</div>' +
                
                '<div id="settings-2fa-section" style="display: none; margin-top: 16px;">' +
                '<div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">' +
                '<div>' +
                '<h4 style="margin: 0; font-size: 14px; color: var(--text-bright);">' + (lang === "ru" ? "Двухфакторная аутентификация (2FA)" : "Two-Factor Authentication (2FA)") + '</h4>' +
                '<p style="margin: 4px 0 0 0; font-size: 12px; color: var(--muted);">' + (lang === "ru" ? "Код подтверждения при входе." : "Code required when signing in.") + '</p>' +
                '</div>' +
                '<label class="switch-container">' +
                '<input type="checkbox" id="settings-2fa-toggle">' +
                '<span class="switch-slider"></span>' +
                '</label>' +
                '</div>' +
                '<span class="settings-status-msg" id="settings-2fa-status" style="margin-top: 8px; display: block; font-size: 12px; font-weight: 600;"></span>' +
                
                // Inline verify 2FA box
                '<div id="settings-2fa-verify-container" style="display: none; margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: var(--radius); box-sizing:border-box;">' +
                '<p style="margin: 0 0 8px 0; font-size: 12px;">' + (lang === "ru" ? "Введите 16-значный код подтверждения:" : "Enter the 16-character verification code:") + '</p>' +
                '<div style="display: flex; gap: 8px;">' +
                '<input type="text" id="settings-2fa-verify-input" placeholder="XXXX-XXXX-XXXX-XXXX" style="flex:1; padding:6px 10px; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text); text-transform: uppercase; font-family: monospace; font-size: 13px; letter-spacing: 1px; box-sizing:border-box;">' +
                '<button type="button" id="settings-2fa-verify-btn" class="button button-primary" style="padding: 6px 12px; font-size: 12px;">' + (lang === "ru" ? "Да" : "Confirm") + '</button>' +
                '<button type="button" id="settings-2fa-verify-cancel-btn" class="button" style="padding: 6px 12px; font-size: 12px;">' + (lang === "ru" ? "Нет" : "Cancel") + '</button>' +
                '</div>' +
                '</div>' +
                
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
                
            var modalDiv = document.createElement("div");
            modalDiv.innerHTML = modalHtml;
            document.body.appendChild(modalDiv.firstChild);

            var settingsModal = document.getElementById("settings-modal");
            var closeBtn = document.getElementById("settings-modal-close");
            
            settingsBtn.addEventListener("click", function () {
                settingsModal.classList.add("active");
                loadSettings();
            });
            
            if (closeBtn) {
                closeBtn.addEventListener("click", function () {
                    settingsModal.classList.remove("active");
                });
            }
            
            settingsModal.addEventListener("click", function (e) {
                if (e.target === settingsModal) {
                    settingsModal.classList.remove("active");
                }
            });

            var AUTH_API_URL = "https://auth-worker.fareastrussia.workers.dev";

            function loadSettings() {
                var emailInput = document.getElementById("settings-email");
                var emailStatus = document.getElementById("settings-email-status");
                var twoFactorSection = document.getElementById("settings-2fa-section");
                var twoFactorToggle = document.getElementById("settings-2fa-toggle");
                var twoFactorStatus = document.getElementById("settings-2fa-status");
                var verifyContainer = document.getElementById("settings-2fa-verify-container");
                var verifyInput = document.getElementById("settings-2fa-verify-input");
                
                emailStatus.className = "settings-status-msg";
                emailStatus.textContent = "";
                twoFactorStatus.className = "settings-status-msg";
                twoFactorStatus.textContent = "";
                verifyContainer.style.display = "none";
                verifyInput.value = "";

                fetch(AUTH_API_URL + "/api/settings", {
                    headers: { "Authorization": "Bearer " + token }
                })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    if (data.success) {
                        emailInput.value = data.email || "";
                        if (data.email) {
                            twoFactorSection.style.display = "block";
                            twoFactorToggle.checked = data.two_factor_enabled;
                        } else {
                            twoFactorSection.style.display = "none";
                            twoFactorToggle.checked = false;
                        }
                    }
                })
                .catch(function () {
                    emailStatus.textContent = lang === "ru" ? "Ошибка загрузки настроек" : "Failed to load settings";
                    emailStatus.className = "settings-status-msg error";
                });
            }

            var passwordForm = document.getElementById("settings-password-form");
            if (passwordForm) {
                passwordForm.addEventListener("submit", function (ev) {
                    ev.preventDefault();
                    var currentPassword = document.getElementById("settings-current-password").value;
                    var newPassword = document.getElementById("settings-new-password").value;
                    var status = document.getElementById("settings-password-status");
                    
                    status.className = "settings-status-msg";
                    status.textContent = lang === "ru" ? "Обновление..." : "Updating...";
                    status.style.display = "inline";

                    fetch(AUTH_API_URL + "/api/settings/change-password", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({
                            current_password: currentPassword,
                            new_password: newPassword
                        })
                    })
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        if (data.error) {
                            status.textContent = data.error;
                            status.className = "settings-status-msg error";
                        } else {
                            status.textContent = lang === "ru" ? "Пароль изменен!" : "Password changed successfully!";
                            status.className = "settings-status-msg success";
                            passwordForm.reset();
                        }
                    })
                    .catch(function (err) {
                        status.textContent = err.message;
                        status.className = "settings-status-msg error";
                    });
                });
            }

            var emailBtn = document.getElementById("settings-email-btn");
            if (emailBtn) {
                emailBtn.addEventListener("click", function () {
                    var emailInput = document.getElementById("settings-email");
                    var emailVal = emailInput.value.trim();
                    var status = document.getElementById("settings-email-status");
                    var twoFactorSection = document.getElementById("settings-2fa-section");
                    var twoFactorToggle = document.getElementById("settings-2fa-toggle");
                    
                    status.className = "settings-status-msg";
                    status.textContent = lang === "ru" ? "Сохранение..." : "Saving...";
                    status.style.display = "block";

                    fetch(AUTH_API_URL + "/api/settings/update-email", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({ email: emailVal })
                    })
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        if (data.error) {
                            status.textContent = data.error;
                            status.className = "settings-status-msg error";
                        } else {
                            status.textContent = emailVal 
                                ? (lang === "ru" ? "Email сохранен!" : "Email saved successfully!")
                                : (lang === "ru" ? "Email удален!" : "Email removed successfully!");
                            status.className = "settings-status-msg success";
                            
                            if (emailVal) {
                                twoFactorSection.style.display = "block";
                                twoFactorToggle.checked = false;
                            } else {
                                twoFactorSection.style.display = "none";
                                twoFactorToggle.checked = false;
                            }
                        }
                    })
                    .catch(function (err) {
                        status.textContent = err.message;
                        status.className = "settings-status-msg error";
                    });
                });
            }

            var twoFactorToggle = document.getElementById("settings-2fa-toggle");
            if (twoFactorToggle) {
                twoFactorToggle.addEventListener("change", function () {
                    var status = document.getElementById("settings-2fa-status");
                    var verifyContainer = document.getElementById("settings-2fa-verify-container");
                    var verifyInput = document.getElementById("settings-2fa-verify-input");
                    var isChecked = twoFactorToggle.checked;
                    
                    status.className = "settings-status-msg";
                    status.textContent = "";
                    verifyContainer.style.display = "none";
                    verifyInput.value = "";

                    if (isChecked) {
                        twoFactorToggle.checked = false;
                        status.textContent = lang === "ru" ? "Запрос кода..." : "Requesting code...";
                        status.className = "settings-status-msg";
                        status.style.display = "block";

                        fetch(AUTH_API_URL + "/api/settings/request-2fa", {
                            method: "POST",
                            headers: { "Authorization": "Bearer " + token }
                        })
                        .then(function (r) { return r.json(); })
                        .then(function (data) {
                            if (data.error) {
                                status.textContent = data.error;
                                status.className = "settings-status-msg error";
                            } else {
                                status.textContent = lang === "ru" ? "Код подтверждения отправлен на ваш email!" : "Verification code sent to your email!";
                                status.className = "settings-status-msg success";
                                verifyContainer.style.display = "block";
                            }
                        })
                        .catch(function (err) {
                            status.textContent = err.message;
                            status.className = "settings-status-msg error";
                        });
                    } else {
                        status.textContent = lang === "ru" ? "Отключение..." : "Disabling...";
                        status.style.display = "block";

                        fetch(AUTH_API_URL + "/api/settings/disable-2fa", {
                            method: "POST",
                            headers: { "Authorization": "Bearer " + token }
                        })
                        .then(function (r) { return r.json(); })
                        .then(function (data) {
                            if (data.error) {
                                status.textContent = data.error;
                                status.className = "settings-status-msg error";
                                twoFactorToggle.checked = true;
                            } else {
                                status.textContent = lang === "ru" ? "Двухфакторная аутентификация отключена." : "2FA disabled successfully.";
                                status.className = "settings-status-msg success";
                            }
                        })
                        .catch(function (err) {
                            status.textContent = err.message;
                            status.className = "settings-status-msg error";
                            twoFactorToggle.checked = true;
                        });
                    }
                });
            }

            var verifyBtn = document.getElementById("settings-2fa-verify-btn");
            var verifyCancelBtn = document.getElementById("settings-2fa-verify-cancel-btn");
            if (verifyBtn) {
                verifyBtn.addEventListener("click", function () {
                    var verifyInput = document.getElementById("settings-2fa-verify-input");
                    var codeVal = verifyInput.value.trim();
                    var status = document.getElementById("settings-2fa-status");
                    var verifyContainer = document.getElementById("settings-2fa-verify-container");
                    var twoFactorToggle = document.getElementById("settings-2fa-toggle");
                    
                    if (!codeVal) return;

                    fetch(AUTH_API_URL + "/api/settings/enable-2fa", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({ code: codeVal })
                    })
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            status.textContent = lang === "ru" ? "Двухфакторная аутентификация включена!" : "2FA enabled successfully!";
                            status.className = "settings-status-msg success";
                            verifyContainer.style.display = "none";
                            twoFactorToggle.checked = true;
                        }
                    })
                    .catch(function (err) {
                        alert(err.message);
                    });
                });
            }

            if (verifyCancelBtn) {
                verifyCancelBtn.addEventListener("click", function () {
                    document.getElementById("settings-2fa-verify-container").style.display = "none";
                    document.getElementById("settings-2fa-status").style.display = "none";
                    document.getElementById("settings-2fa-toggle").checked = false;
                });
            }
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
        var tierClass = function (i) {
            return i === 0 ? 'gold-text' : i === 1 ? 'silver-text' : i === 2 ? 'bronze-text' : 'white-text';
        };
        if (S.supporters.donations && S.supporters.donations.length) {
            html += "<strong" + i18nAttr("supporters.donations") + ">Donations:</strong>";
            var donationPill = function (d, i) {
                return '<span class="supporter-name-wrap ' + tierClass(i) + '">' +
                    d.name +
                    '<span class="amount">' + d.amount + ' &lt;3</span>' +
                    '</span>';
            };
            /* three pills per row, left-aligned, natural widths */
            for (var di = 0; di < S.supporters.donations.length; di += 3) {
                html += '<div class="supporter-row supporter-row-group">';
                S.supporters.donations.slice(di, di + 3).forEach(function (d, j) {
                    html += donationPill(d, di + j);
                });
                html += '</div>';
            }
        }
        if (S.supporters.showcase && S.supporters.showcase.length) {
            html += "<strong" + i18nAttr("supporters.showcase") + ">Showcase:</strong>";
            S.supporters.showcase.forEach(function (s) {
                var textAttr = s.i18nKey ? i18nAttr(s.i18nKey) : "";
                html +=
                    '<div class="supporter-row">' +
                    '<span class="supporter-name-wrap white-text">' + s.name + '</span>' +
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

    /* ========== Download count (Modsfire via Cloudflare Worker) ========== */
    var DL_API = "https://fer-api-worker.fareastrussia.workers.dev/api/downloads";
    var dlCache = {};
    var dlPending = {};

    function modsfireSlug(url) {
        if (!url) return null;
        var m = String(url).match(/modsfire\.com\/([A-Za-z0-9]+)/);
        return m ? m[1] : null;
    }

    function fetchDownloadCount(slug) {
        if (dlCache[slug] !== undefined) return Promise.resolve(dlCache[slug]);
        if (dlPending[slug]) return dlPending[slug];
        dlPending[slug] = fetch(DL_API + "?id=" + encodeURIComponent(slug))
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var n = (data && typeof data.downloads === "number") ? data.downloads : null;
                dlCache[slug] = n;
                return n;
            })
            .catch(function () { dlCache[slug] = null; return null; });
        return dlPending[slug];
    }

    function sumDownloads(releases) {
        var slugs = (releases || [])
            .map(function (v) { return modsfireSlug(v && v.links && v.links.primary); })
            .filter(Boolean);
        if (!slugs.length) return Promise.resolve(0);
        return Promise.all(slugs.map(fetchDownloadCount)).then(function (counts) {
            return counts.reduce(function (s, n) { return s + (typeof n === "number" ? n : 0); }, 0);
        });
    }

    window.FERDownloads = {
        slugOf: modsfireSlug,
        fetch: fetchDownloadCount,
        sumReleases: sumDownloads
    };

    function attachDownloadCount(metaEl, primaryUrl) {
        var slug = modsfireSlug(primaryUrl);
        if (!slug) return;
        var sep = document.createTextNode(metaEl.textContent ? " • " : "");
        var span = document.createElement("span");
        span.className = "download-count";
        span.textContent = "↓ …";
        metaEl.appendChild(sep);
        metaEl.appendChild(span);
        fetchDownloadCount(slug).then(function (n) {
            if (n === null) {
                metaEl.removeChild(sep);
                metaEl.removeChild(span);
            } else {
                span.textContent = "↓ " + n.toLocaleString() + " downloads";
            }
        });
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
        if (v.links && v.links.primary) attachDownloadCount(meta, v.links.primary);
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

    /* ========== Star Ratings System ========== */
    function initRatings() {
        var commentsEl = document.getElementById("comments-section");
        if (!commentsEl) return;

        var pageId = commentsEl.getAttribute("data-page-id");
        var taglineEl = document.getElementById("page-tagline");
        if (!taglineEl || !pageId) return;

        // Create ratings container
        var ratingContainer = document.createElement("div");
        ratingContainer.id = "page-rating-container";
        ratingContainer.className = "rating-container";
        taglineEl.parentNode.insertBefore(ratingContainer, taglineEl.nextSibling);

        var token = localStorage.getItem("fer_token");
        var lang = (window.I18N && typeof window.I18N.getLang === "function") ? window.I18N.getLang() : "en";
        var headers = {};
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }

        // Fetch initial ratings
        fetch("https://auth-worker.fareastrussia.workers.dev/api/ratings?mod_id=" + pageId, {
            headers: headers
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                renderRatingsWidget(ratingContainer, pageId, data.average, data.count, data.user_rating, token, lang);
            }
        })
        .catch(function (err) {
            console.error("Failed to load ratings:", err);
        });
    }

    function renderRatingsWidget(container, pageId, average, count, userRating, token, lang) {
        container.innerHTML = "";

        // Text display
        var ratingText = document.createElement("span");
        ratingText.className = "rating-text";
        ratingText.textContent = average > 0 ? average.toFixed(1) : (lang === "ru" ? "Нет оценок" : "No ratings");
        container.appendChild(ratingText);

        // Stars container
        var starsDiv = document.createElement("div");
        starsDiv.className = "rating-stars";
        if (token) {
            starsDiv.className += " interactive";
        }
        
        var starSvg = '<svg class="rating-star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

        // Render 5 stars
        for (var i = 1; i <= 5; i++) {
            var starWrapper = document.createElement("span");
            starWrapper.className = "rating-star-wrapper";
            starWrapper.setAttribute("data-star", i);

            // Determine star type
            var effectiveRating = userRating !== null ? userRating : average;
            if (effectiveRating >= i) {
                // Fully filled star
                starWrapper.innerHTML = starSvg.replace('class="rating-star"', 'class="rating-star filled"');
            } else if (effectiveRating > i - 1 && effectiveRating < i) {
                // Half-filled star
                var emptyStar = starSvg.replace('class="rating-star"', 'class="rating-star empty"');
                var filledHalfStar = starSvg.replace('class="rating-star"', 'class="rating-star filled half" style="position: absolute; top: 0; left: 0; clip-path: inset(0 50% 0 0);"');
                starWrapper.innerHTML = emptyStar + filledHalfStar;
            } else {
                // Empty star
                starWrapper.innerHTML = starSvg.replace('class="rating-star"', 'class="rating-star empty"');
            }

            // Bind click and hover actions if logged in
            if (token) {
                starWrapper.addEventListener("click", (function (starIndex) {
                    return function () {
                        submitRating(container, pageId, starIndex, token, lang);
                    };
                })(i));

                starWrapper.addEventListener("mouseenter", (function (starIndex) {
                    return function () {
                        highlightStars(starsDiv, starIndex);
                    };
                })(i));
            }

            starsDiv.appendChild(starWrapper);
        }

        if (token) {
            starsDiv.addEventListener("mouseleave", function () {
                resetStars(starsDiv, userRating !== null ? userRating : average);
            });
        }

        container.appendChild(starsDiv);

        // Count display
        var countSpan = document.createElement("span");
        countSpan.className = "rating-count";
        countSpan.textContent = "(" + getVotesText(count, lang) + ")";
        container.appendChild(countSpan);

        // Status display
        var statusSpan = document.createElement("span");
        statusSpan.className = "rating-status";
        if (!token) {
            statusSpan.textContent = lang === "ru" ? "Войдите, чтобы оценить" : "Sign in to rate";
        } else if (userRating !== null) {
            statusSpan.textContent = (lang === "ru" ? "Ваша оценка: " : "Your rating: ") + userRating;
            statusSpan.className += " success";
        }
        container.appendChild(statusSpan);
    }

    function getVotesText(count, lang) {
        if (lang === "ru") {
            var lastDigit = count % 10;
            var lastTwo = count % 100;
            if (lastTwo >= 11 && lastTwo <= 19) {
                return count + " голосов";
            }
            if (lastDigit === 1) {
                return count + " голос";
            }
            if (lastDigit >= 2 && lastDigit <= 4) {
                return count + " голоса";
            }
            return count + " голосов";
        } else {
            return count === 1 ? "1 vote" : count + " votes";
        }
    }

    function highlightStars(starsDiv, hoverIndex) {
        var wrappers = starsDiv.querySelectorAll(".rating-star-wrapper");
        for (var i = 0; i < wrappers.length; i++) {
            var idx = i + 1;
            var starSvg = wrappers[i].querySelector(".rating-star.filled:not(.half)");
            var emptySvg = wrappers[i].querySelector(".rating-star.empty");
            var halfSvg = wrappers[i].querySelector(".rating-star.half");
            
            if (idx <= hoverIndex) {
                if (emptySvg) emptySvg.style.color = "#fbbf24";
                if (halfSvg) {
                    halfSvg.style.clipPath = "none"; // show full fill
                    halfSvg.style.display = "";
                }
            } else {
                if (emptySvg) emptySvg.style.color = "";
                if (starSvg) starSvg.style.color = "rgba(255,255,255,0.15)";
                if (halfSvg) halfSvg.style.display = "none";
            }
        }
    }

    function resetStars(starsDiv, baseRating) {
        var wrappers = starsDiv.querySelectorAll(".rating-star-wrapper");
        var starSvgTemplate = '<svg class="rating-star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        
        for (var i = 0; i < wrappers.length; i++) {
            var idx = i + 1;
            var starWrapper = wrappers[i];
            
            if (baseRating >= idx) {
                starWrapper.innerHTML = starSvgTemplate.replace('class="rating-star"', 'class="rating-star filled"');
            } else if (baseRating > idx - 1 && baseRating < idx) {
                var emptyStar = starSvgTemplate.replace('class="rating-star"', 'class="rating-star empty"');
                var filledHalfStar = starSvgTemplate.replace('class="rating-star"', 'class="rating-star filled half" style="position: absolute; top: 0; left: 0; clip-path: inset(0 50% 0 0);"');
                starWrapper.innerHTML = emptyStar + filledHalfStar;
            } else {
                starWrapper.innerHTML = starSvgTemplate.replace('class="rating-star"', 'class="rating-star empty"');
            }
        }
    }

    function submitRating(container, pageId, rating, token, lang) {
        var statusSpan = container.querySelector(".rating-status");
        if (statusSpan) {
            statusSpan.textContent = lang === "ru" ? "Сохранение..." : "Saving...";
            statusSpan.className = "rating-status";
        }

        fetch("https://auth-worker.fareastrussia.workers.dev/api/ratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                mod_id: pageId,
                rating: rating
            })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                renderRatingsWidget(container, pageId, data.average, data.count, data.user_rating, token, lang);
                var status = container.querySelector(".rating-status");
                if (status) {
                    status.textContent = lang === "ru" ? "Оценка сохранена!" : "Rating saved!";
                    status.className = "rating-status success";
                    setTimeout(function () {
                        status.textContent = (lang === "ru" ? "Ваша оценка: " : "Your rating: ") + rating;
                    }, 2000);
                }
            } else {
                var status = container.querySelector(".rating-status");
                if (status) {
                    status.textContent = data.error || (lang === "ru" ? "Ошибка" : "Error");
                    status.className = "rating-status error";
                }
            }
        })
        .catch(function (err) {
            var status = container.querySelector(".rating-status");
            if (status) {
                status.textContent = err.message;
                status.className = "rating-status error";
            }
        });
    }

    // Initialize on load
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRatings);
    } else {
        initRatings();
    }
})();
