(function () {
    var STORAGE_KEY = "site_theme";
    function getTheme() {
        try {
            var m = document.cookie.match(new RegExp("(?:^|;\\s*)" + STORAGE_KEY + "=([^;]+)"));
            if (m) return decodeURIComponent(m[1]);
        } catch (e) {}
        try {
            var t = localStorage.getItem(STORAGE_KEY);
            if (t) return t;
        } catch (e) {}
        return "dark";
    }
    var theme = getTheme();
    document.documentElement.setAttribute("data-theme", theme);
})();
