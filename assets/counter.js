// Simple global download counter using CountAPI (no backend required)
// Namespace and keys are public; do not store secrets here.
(function(){
  var API = 'https://api.countapi.xyz';
  var NAMESPACE = 'fer-web';

  function getCount(key){
    return fetch(API + '/get/' + encodeURIComponent(NAMESPACE) + '/' + encodeURIComponent(key), { cache: 'no-store' })
      .then(function(r){ return r.json(); })
      .then(function(j){ return (j && typeof j.value === 'number') ? j.value : 0; })
      .catch(function(){ return 0; });
  }

  function incrementCount(key){
    return fetch(API + '/hit/' + encodeURIComponent(NAMESPACE) + '/' + encodeURIComponent(key), { cache: 'no-store' })
      .then(function(r){ return r.json(); })
      .then(function(j){ return (j && typeof j.value === 'number') ? j.value : null; })
      .catch(function(){ return null; });
  }

  function ensureBadge(container){
    var badge = container.querySelector('.dl-counter');
    if (!badge){
      badge = document.createElement('span');
      badge.className = 'dl-counter';
      badge.style.cssText = 'margin-left:10px; padding:4px 8px; border-radius:999px; border:1px solid var(--border); background:rgba(255,255,255,.05); color:var(--muted); font-size:12px;';
      container.appendChild(badge);
    }
    return badge;
  }

  function renderCount(badge, value){
    badge.textContent = 'Downloads: ' + value;
  }

  function findHeadingContainer(){
    // Prefer the first h2 inside the main card/section labelled Latest Release
    var heading = document.querySelector('#download h2, .card h2, h2');
    if (!heading) return null;
    return heading.parentElement || heading;
  }

  function attachClickHandler(key, badge){
    document.addEventListener('click', function(e){
      var a = e.target;
      if (a && a.tagName === 'A'){
        // Only count primary download buttons created in version sections
        var isDownloadButton = a.classList.contains('button') && a.classList.contains('button-primary') && (a.closest('#download') || a.closest('#releases'));
        if (isDownloadButton){
          e.preventDefault();
          var href = a.getAttribute('href');
          // Increment, update badge, then navigate
          incrementCount(key).then(function(newValue){ if (newValue != null) renderCount(badge, newValue); }).finally(function(){
            setTimeout(function(){ window.location.href = href; }, 120);
          });
        }
      }
    }, true);
  }

  window.initDownloadCounter = function(key){
    var container = findHeadingContainer();
    if (!container) return;
    var badge = ensureBadge(container);
    getCount(key).then(function(value){ renderCount(badge, value); });
    // Refresh periodically to simulate real-time updates
    setInterval(function(){ getCount(key).then(function(value){ renderCount(badge, value); }); }, 15000);
    attachClickHandler(key, badge);
  };
})();


