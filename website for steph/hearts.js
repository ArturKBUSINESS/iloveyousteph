(function () {
  var container = document.querySelector(".hearts");
  if (!container) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function heartCount() {
    var w = window.innerWidth || 320;
    var c = 6;
    if (w >= 480) c = 9;
    if (w >= 768) c = 14;
    if (w >= 1200) c = 18;
    try {
      var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn && (conn.saveData === true || /2g/.test(conn.effectiveType || ""))) {
        c = Math.min(c, 4);
      }
    } catch (e) {}
    return c;
  }

  function spawn() {
    var symbols = ["♥", "♡"];
    var count = heartCount();
    var frag = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var el = document.createElement("span");
      el.className = "heart";
      el.textContent = symbols[i % symbols.length];
      el.style.left = Math.random() * 100 + "%";
      el.style.setProperty("--duration", 12 + Math.random() * 12 + "s");
      el.style.setProperty("--delay", Math.random() * 7 + "s");
      el.style.setProperty("--drift", (Math.random() * 56 - 28) + "px");
      el.style.setProperty("--spin", (Math.random() * 28 - 14) + "deg");
      el.style.setProperty("--peak-opacity", 0.28 + Math.random() * 0.28);
      frag.appendChild(el);
    }
    container.appendChild(frag);
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(
      function () {
        spawn();
      },
      { timeout: 1800 }
    );
  } else {
    setTimeout(spawn, 1);
  }
})();
