(function () {
  const COMMENTS_API_URL = "https://comments-worker.fareastrussia.workers.dev";
  const AUTH_API_URL = "https://auth-worker.fareastrussia.workers.dev";

  const msgs = {
    en: {
      title: "Discussion",
      placeholderComment: "Write a comment...",
      emptyComments: "No comments yet. Be the first to share your thoughts!",
      errorFetch: "Failed to load comments.",
      errorPost: "Failed to post comment. Please try again.",
      justNow: "just now",
      minute: "1 minute ago",
      minutes: "minutes ago",
      hour: "1 hour ago",
      hours: "hours ago",
      day: "1 day ago",
      days: "days ago"
    },
    ru: {
      title: "Обсуждение",
      placeholderComment: "Написать комментарий...",
      emptyComments: "Комментариев пока нет. Будьте первым, кто поделится своими мыслями!",
      errorFetch: "Не удалось загрузить комментарии.",
      errorPost: "Не удалось отправить комментарий. Пожалуйста, проверьте введённые данные.",
      justNow: "только что",
      minute: "1 минуту назад",
      minutes: "минут назад",
      hour: "1 час назад",
      hours: "часов назад",
      day: "1 день назад",
      days: "дней назад"
    }
  };

  function getLocale() {
    if (window.I18N && window.I18N.locale) {
      return window.I18N.locale === "ru" ? "ru" : "en";
    }
    return "en";
  }

  function translate(key, fallback) {
    if (window.I18N && typeof window.I18N.translate === "function") {
      return window.I18N.translate(key);
    }
    return fallback;
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, (tag) => {
      const chars = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      };
      return chars[tag] || tag;
    });
  }

  function formatTime(isoString, lang) {
    const t = msgs[lang];
    const diffMs = new Date() - new Date(isoString);
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return t.justNow;
    if (diffMin === 1) return t.minute;
    if (diffMin < 60) return `${diffMin} ${t.minutes}`;
    if (diffHour === 1) return t.hour;
    if (diffHour < 24) return `${diffHour} ${t.hours}`;
    if (diffDay === 1) return t.day;
    if (diffDay < 30) return `${diffDay} ${t.days}`;

    const dateObj = new Date(isoString);
    return dateObj.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b",
      "#ef4444", "#06b6d4", "#14b8a6", "#a855f7", "#f43f5e"
    ];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  function renderWidget(container, pageId, lang) {
    const t = msgs[lang];
    container.innerHTML = `
      <div class="comments-widget">
        <h3 class="comments-heading">${t.title} (<span id="comments-count">0</span>)</h3>
        
        <div id="auth-panel" class="auth-panel"></div>
        
        <div id="comments-list-wrapper" class="comments-list-wrapper">
          <div id="comments-list" class="comments-list"></div>
        </div>
      </div>
    `;
  }

  async function loadComments(pageId, lang) {
    const listContainer = document.getElementById("comments-list");
    const countSpan = document.getElementById("comments-count");
    if (!listContainer) return;

    const t = msgs[lang];

    try {
      const res = await fetch(`${COMMENTS_API_URL}/api/comments?page_id=${encodeURIComponent(pageId)}`);
      if (!res.ok) throw new Error();

      const comments = await res.json();
      countSpan.textContent = comments.length;

      if (comments.length === 0) {
        listContainer.innerHTML = `<div class="comments-empty">${t.emptyComments}</div>`;
        return;
      }

      // Group comments by hierarchy (top-level vs replies)
      const parentComments = [];
      const repliesMap = {};

      comments.forEach(c => {
        if (c.parent_id) {
          if (!repliesMap[c.parent_id]) {
            repliesMap[c.parent_id] = [];
          }
          repliesMap[c.parent_id].push(c);
        } else {
          parentComments.push(c);
        }
      });

      // Sort replies by creation time ASC (oldest replies first)
      for (const parentId in repliesMap) {
        repliesMap[parentId].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }

      const isLoggedIn = !!localStorage.getItem("fer_token");
      const isAdmin = localStorage.getItem("fer_username") === "Aduskaaa";

      listContainer.innerHTML = parentComments
        .map((c) => {
          const initials = c.name.charAt(0).toUpperCase();
          const avatarBg = getAvatarColor(c.name);
          const replies = repliesMap[c.id] || [];

          // Render replies HTML
          const repliesHtml = replies.length > 0 
            ? `
              <div class="comment-replies">
                ${replies.map(r => {
                  const rInitials = r.name.charAt(0).toUpperCase();
                  const rAvatarBg = getAvatarColor(r.name);
                  
                  const replyDeleteHtml = isAdmin
                    ? `
                      <div class="reply-footer" style="margin-top: 4px;">
                        <button type="button" class="delete-btn" data-comment-id="${r.id}" style="color: var(--danger); background: none; border: none; font-size: 11px; font-weight: 600; cursor: pointer; padding: 2px 4px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                          <svg style="width: 12px; height: 12px; vertical-align: middle;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>${lang === "ru" ? "Удалить" : "Delete"}</span>
                        </button>
                      </div>
                    `
                    : "";

                  return `
                    <div class="reply-item" id="comment-${r.id}">
                      <div class="comment-avatar" style="background-color: ${rAvatarBg}; width: 32px; height: 32px; font-size: 13px;">${escapeHTML(rInitials)}</div>
                      <div class="comment-content">
                        <div class="comment-header">
                          <span class="comment-author" style="font-size: 13px;">${escapeHTML(r.name)}</span>
                          <span class="comment-time" style="font-size: 11px;" title="${escapeHTML(r.created_at)}">${formatTime(r.created_at, lang)}</span>
                        </div>
                        <div class="comment-body" style="font-size: 13px;">${escapeHTML(r.comment).replace(/\n/g, "<br>")}</div>
                        ${replyDeleteHtml}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            `
            : "";

          // Delete button (only if user is admin)
          const deleteButtonHtml = isAdmin
            ? `
              <button type="button" class="delete-btn" data-comment-id="${c.id}" style="color: var(--danger); background: none; border: none; font-size: 12px; font-weight: 600; cursor: pointer; padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                <svg style="width: 14px; height: 14px; vertical-align: middle;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>${lang === "ru" ? "Удалить" : "Delete"}</span>
              </button>
            `
            : "";

          // Reply button (only if user is logged in)
          const replyButtonHtml = isLoggedIn
            ? `
              <div class="comment-footer" style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
                <button type="button" class="reply-btn" data-comment-id="${c.id}">
                  <svg style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <span>${lang === "ru" ? "Ответить" : "Reply"}</span>
                </button>
                ${deleteButtonHtml}
              </div>
            `
            : (isAdmin ? `
              <div class="comment-footer" style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
                ${deleteButtonHtml}
              </div>
            ` : "");

          return `
            <div class="comment-group" id="comment-group-${c.id}" style="margin-bottom: 8px;">
              <div class="comment-item" id="comment-${c.id}">
                <div class="comment-avatar" style="background-color: ${avatarBg}">${escapeHTML(initials)}</div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-author">${escapeHTML(c.name)}</span>
                    <span class="comment-time" title="${escapeHTML(c.created_at)}">${formatTime(c.created_at, lang)}</span>
                  </div>
                  <div class="comment-body">${escapeHTML(c.comment).replace(/\n/g, "<br>")}</div>
                  ${replyButtonHtml}
                </div>
              </div>
              <div id="reply-form-container-${c.id}"></div>
              ${repliesHtml}
            </div>
          `;
        })
        .join("");

      // Bind Reply click handlers
      listContainer.querySelectorAll(".reply-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const parentId = btn.getAttribute("data-comment-id");
          const formContainer = document.getElementById(`reply-form-container-${parentId}`);
          if (!formContainer) return;

          // Toggle if already open
          if (formContainer.innerHTML !== "") {
            formContainer.innerHTML = "";
            return;
          }

          // Close other reply forms
          listContainer.querySelectorAll("[id^=reply-form-container-]").forEach(container => {
            container.innerHTML = "";
          });

          // Render reply form
          formContainer.innerHTML = `
            <div class="reply-form-container">
              <form id="reply-form-${parentId}" class="comment-form" style="margin-top: 10px;">
                <input type="text" id="reply-hp-${parentId}" name="hp" style="display: none !important;" tabindex="-1" autocomplete="off">
                <div class="comment-form-grid">
                  <div class="form-row">
                    <textarea id="reply-text-${parentId}" name="comment" required placeholder="${lang === 'ru' ? 'Напишите ваш ответ...' : 'Write your reply...'}" rows="2" maxlength="1000" style="font-size: 13px; padding: 10px;"></textarea>
                  </div>
                  <div class="form-row form-actions" style="margin-top: 8px; display: flex; gap: 8px; align-items: center;">
                    <button type="submit" id="reply-submit-${parentId}" class="button button-primary" style="padding: 6px 12px; font-size: 12px;">${lang === 'ru' ? 'Ответить' : 'Reply'}</button>
                    <button type="button" class="reply-cancel-btn button" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid var(--border); color: var(--muted);">${lang === 'ru' ? 'Отмена' : 'Cancel'}</button>
                    <span id="reply-error-${parentId}" class="comment-error-msg" style="display: none; font-size: 12px;"></span>
                  </div>
                </div>
              </form>
            </div>
          `;

          // Cancel reply button
          formContainer.querySelector(".reply-cancel-btn").addEventListener("click", () => {
            formContainer.innerHTML = "";
          });

          // Submit reply
          const replyForm = document.getElementById(`reply-form-${parentId}`);
          replyForm.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            const submitBtn = document.getElementById(`reply-submit-${parentId}`);
            const errorSpan = document.getElementById(`reply-error-${parentId}`);
            const replyText = document.getElementById(`reply-text-${parentId}`).value;
            const honeyPot = document.getElementById(`reply-hp-${parentId}`).value;
            const token = localStorage.getItem("fer_token");

            errorSpan.style.display = "none";
            submitBtn.disabled = true;
            submitBtn.textContent = lang === "ru" ? "Отправка..." : "Submitting...";

            try {
              const res = await fetch(`${COMMENTS_API_URL}/api/comments`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  page_id: pageId,
                  comment: replyText,
                  honey_pot: honeyPot,
                  parent_id: parentId
                }),
              });

              const data = await res.json();
              if (!res.ok) {
                throw new Error(data.error || "Failed to post reply");
              }

              await loadComments(pageId, lang);
            } catch (err) {
              errorSpan.textContent = err.message;
              errorSpan.style.display = "inline";
              submitBtn.disabled = false;
              submitBtn.textContent = lang === "ru" ? "Ответить" : "Reply";
            }
          });
        });
      });

      // Bind Delete click handlers
      if (isAdmin) {
        listContainer.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const commentId = btn.getAttribute("data-comment-id");
            const confirmMsg = lang === "ru"
              ? "Вы уверены, что хотите удалить этот комментарий?"
              : "Are you sure you want to delete this comment?";
            
            if (!confirm(confirmMsg)) return;

            const token = localStorage.getItem("fer_token");
            try {
              const res = await fetch(`${COMMENTS_API_URL}/api/comments?id=${commentId}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              });

              const data = await res.json();
              if (!res.ok) {
                throw new Error(data.error || "Failed to delete comment");
              }

              await loadComments(pageId, lang);
            } catch (err) {
              alert(err.message);
            }
          });
        });
      }
    } catch (e) {
      listContainer.innerHTML = `<div class="comments-error">${t.errorFetch}</div>`;
    }
  }

  function updateAuthUI(pageId, lang) {
    const authPanel = document.getElementById("auth-panel");
    if (!authPanel) return;

    const token = localStorage.getItem("fer_token");
    const username = localStorage.getItem("fer_username");

    if (token && username) {
      authPanel.innerHTML = `
        <form id="comment-form" class="comment-form">
          <input type="text" id="comment-hp" name="hp" style="display: none !important;" tabindex="-1" autocomplete="off">
          <div class="comment-form-grid">
            <div class="form-row">
              <textarea id="comment-text" name="comment" required placeholder="${translate("common.writeCommentHint", "Write your comment...")}" rows="3" maxlength="1000"></textarea>
            </div>
            <div class="form-row form-actions">
              <button type="submit" id="comment-submit" class="button button-primary">${translate("common.submit", "Submit")}</button>
              <span id="comment-error" class="comment-error-msg" style="display: none;"></span>
            </div>
          </div>
        </form>
      `;

      bindCommentSubmit(pageId, lang);
    } else {
      const currentPage = encodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
      const signinText = lang === "ru" ? "войдите в аккаунт" : "sign in";
      const promptText = lang === "ru"
        ? `Пожалуйста, <a href="login.html?redirect=${currentPage}" class="comments-signin-link">${signinText}</a>, чтобы оставить комментарий.`
        : `Please <a href="login.html?redirect=${currentPage}" class="comments-signin-link">${signinText}</a> to post a comment.`;

      authPanel.innerHTML = `
        <div class="comments-auth-prompt">
          <p>${promptText}</p>
        </div>
      `;
    }
  }

  function bindCommentSubmit(pageId, lang) {
    const form = document.getElementById("comment-form");
    const submitBtn = document.getElementById("comment-submit");
    const errorSpan = document.getElementById("comment-error");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const comment = document.getElementById("comment-text").value;
      const honeyPot = document.getElementById("comment-hp").value;
      const token = localStorage.getItem("fer_token");

      errorSpan.style.display = "none";
      submitBtn.disabled = true;
      submitBtn.textContent = translate("common.submitting", "Submitting...");

      try {
        const res = await fetch(`${COMMENTS_API_URL}/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            page_id: pageId,
            comment: comment,
            honey_pot: honeyPot,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to post comment");
        }

        form.reset();
        await loadComments(pageId, lang);
      } catch (err) {
        errorSpan.textContent = err.message;
        errorSpan.style.display = "inline";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = translate("common.submit", "Submit");
      }
    });
  }

  function onTabClick(e) {
    const clickedBtn = e.currentTarget;
    const tabName = clickedBtn.getAttribute("data-tab");
    if (!tabName) return;

    const container = clickedBtn.closest(".card");
    if (!container) return;

    container.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    clickedBtn.classList.add("active");

    container.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    const targetContent = container.querySelector(`#tab-${tabName}`);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  }

  function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((btn) => {
      btn.removeEventListener("click", onTabClick);
      btn.addEventListener("click", onTabClick);
    });
  }

  async function initComments() {
    initTabs();

    const container = document.getElementById("comments-section");
    if (!container) return;

    const pageId = container.getAttribute("data-page-id");
    if (!pageId) return;

    const lang = getLocale();
    renderWidget(container, pageId, lang);
    updateAuthUI(pageId, lang);
    await loadComments(pageId, lang);

    const observer = new MutationObserver(async () => {
      const currentLang = getLocale();
      if (currentLang !== lang) {
        observer.disconnect();
        await initComments();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComments);
  } else {
    initComments();
  }
})();
