/* ===================================================================
   Hero background video — upload, persistence, playback
   -------------------------------------------------------------------
   - Lets the user pick a custom background video (click or drag & drop).
   - Persists the chosen video in IndexedDB so it survives page reloads
     (blobs are too large for localStorage).
   - Falls back to the default source / gradient when none is set.
   =================================================================== */

(function () {
  "use strict";

  var hero        = document.querySelector(".hero");
  var video       = document.getElementById("heroVideo");
  var source      = document.getElementById("heroVideoSource");
  var toggle      = document.getElementById("bgToggle");
  var panel       = document.getElementById("bgPanel");
  var drop        = document.getElementById("bgDrop");
  var dropText    = document.getElementById("bgDropText");
  var fileInput   = document.getElementById("bgFile");
  var resetBtn    = document.getElementById("bgReset");

  var DEFAULT_SRC = source ? source.getAttribute("src") : "";
  var objectUrl   = null; // track so we can revoke and avoid leaks

  /* ---------- tiny IndexedDB helper (one store, one key) ---------- */
  var DB_NAME = "hima-hero", STORE = "media", KEY = "bgVideo";

  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!("indexedDB" in window)) return reject(new Error("no idb"));
      var req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = function () {
        req.result.createObjectStore(STORE);
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function idbSet(blob) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put(blob, KEY);
        tx.oncomplete = resolve;
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function idbGet() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readonly");
        var r = tx.objectStore(STORE).get(KEY);
        r.onsuccess = function () { resolve(r.result || null); };
        r.onerror = function () { reject(r.error); };
      });
    });
  }

  function idbClear() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(KEY);
        tx.oncomplete = resolve;
        tx.onerror = function () { reject(tx.error); };
      });
    }).catch(function () { /* ignore */ });
  }

  /* ---------- video source swapping ---------- */
  function applyBlob(blob) {
    if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
    objectUrl = URL.createObjectURL(blob);
    setSrc(objectUrl, blob.type || "video/mp4");
  }

  function setSrc(url, type) {
    source.setAttribute("src", url);
    if (type) source.setAttribute("type", type);
    video.load();
    playSafely();
  }

  function playSafely() {
    var p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () { /* autoplay blocked — fallback stays visible */ });
    }
  }

  /* Mark hero as "playing" so the gradient fallback fades out. */
  video.addEventListener("playing", function () { hero.classList.add("is-playing"); });
  video.addEventListener("emptied", function () { hero.classList.remove("is-playing"); });
  video.addEventListener("error", function () { hero.classList.remove("is-playing"); });

  /* ---------- handle a newly chosen file ---------- */
  function handleFile(file) {
    if (!file || !/^video\//.test(file.type)) {
      dropText.textContent = "Please choose a video file";
      return;
    }
    dropText.textContent = file.name;
    applyBlob(file);
    idbSet(file).catch(function () {
      dropText.textContent = "Loaded (couldn't save on this device)";
    });
  }

  /* ---------- UI wiring ---------- */
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = panel.hasAttribute("hidden");
      if (open) { panel.removeAttribute("hidden"); }
      else { panel.setAttribute("hidden", ""); }
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Close the panel when clicking outside of it.
  document.addEventListener("click", function (e) {
    if (!panel || panel.hasAttribute("hidden")) return;
    if (!e.target.closest("#bgControl")) {
      panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) handleFile(fileInput.files[0]);
    });
  }

  if (drop) {
    ["dragenter", "dragover"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.add("is-dragover");
      });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.remove("is-dragover");
      });
    });
    drop.addEventListener("drop", function (e) {
      var dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) handleFile(dt.files[0]);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      idbClear();
      if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
      dropText.textContent = "Click or drop a video here";
      if (DEFAULT_SRC) { setSrc(DEFAULT_SRC, "video/mp4"); }
      else { source.removeAttribute("src"); video.load(); }
    });
  }

  /* ---------- restore a saved video on load ---------- */
  idbGet().then(function (blob) {
    if (blob) {
      applyBlob(blob);
      if (dropText) dropText.textContent = "Saved video in use";
    } else {
      playSafely(); // try the default source
    }
  }).catch(function () { playSafely(); });
})();
