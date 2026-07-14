/* ============================================================
   LE MEETING POINT — Logique du parcours
   ============================================================ */

const STEPS = ["Accueil", "Ressentir", "Créer", "Chercher", "Expliquer"];
const KEY = "meetingpoint.v1";

/* --- État sauvegardé --- */
const state = load();
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || defaults(); }
  catch { return defaults(); }
}
function defaults() {
  return {
    step: 0, maxStep: 0, prof: false,
    intention: "",
    favs: [], finalists: [], choice: null,
    creation: { type: null, ytid: null, fileName: null },
    fiche: { plus: "", hesite: "", pourquoi: "", ajoute: "", params: [] },
  };
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

/* --- Sélecteurs courts --- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ============================================================
   NAVIGATION
   ============================================================ */
function buildStepper() {
  const nav = $("#stepper");
  nav.innerHTML = "";
  STEPS.forEach((label, i) => {
    const b = document.createElement("button");
    b.textContent = (i === 0 ? "🏠 " : i + ". ") + label;
    b.addEventListener("click", () => { if (i <= state.maxStep) goto(i); });
    nav.appendChild(b);
  });
}

function goto(n) {
  state.step = n;
  state.maxStep = Math.max(state.maxStep, n);
  save();
  render();
  if (n === 2 || n === 3) refreshCreation();
  if (n === 3 && state.prof) renderProfStatus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  $$(".step").forEach((s) => (s.hidden = +s.dataset.step !== state.step));
  $$("#stepper button").forEach((b, i) => {
    b.classList.toggle("active", i === state.step);
    b.classList.toggle("done", i < state.step);
  });
  const pct = (state.step / (STEPS.length - 1)) * 100;
  $("#progress-bar").style.width = pct + "%";
}

/* ============================================================
   ÉTAPE 1 — Expérience
   ============================================================ */
const EXP = {
  triste: { cls: "mood-triste", code: "A2", sky: "#5b7699", wx: "wx-rain",
    cap: "La même image… <b>triste.</b>",
    txt: "La tristesse s'installe : l'image devient un adieu, un souvenir qui serre le cœur. 💧" },
  joyeuse: { cls: "mood-joyeuse", code: "C4", sky: "#8fc7e8", wx: "wx-sun",
    cap: "La même image… <b>joyeuse.</b>",
    txt: "Tout s'illumine : la même image respire l'attente heureuse. ☀️" },
  inquiétante: { cls: "mood-inquietante", code: "B7", sky: "#3a2740", wx: "wx-storm",
    cap: "La même image… <b>inquiétante.</b>",
    txt: "Une tension monte : et si un danger approchait derrière la vitre ? 😨" },
};
$$(".exp-btn").forEach((b) =>
  b.addEventListener("click", async () => {
    const m = EXP[b.dataset.mood];
    const scene = $("#exp-scene");
    scene.classList.remove("mood-triste", "mood-joyeuse", "mood-inquietante");
    scene.classList.add(m.cls);
    // teinte pilotée en JS (fiable, prioritaire sur le CSS)
    const sky = scene.querySelector(".sky");
    if (sky) sky.style.fill = m.sky;
    scene.querySelectorAll(".wx").forEach((w) =>
      (w.style.opacity = w.classList.contains(m.wx) ? "1" : "0")
    );
    $("#exp-caption").innerHTML = m.cap;
    $("#exp-result").textContent = m.txt;
    $$(".exp-btn").forEach((x) => x.classList.toggle("on", x === b));
    // joue un court extrait libre correspondant (si disponible)
    const e = CORPUS.find((x) => x.code === m.code);
    if (e) {
      stopPlay();
      let src = e.src;
      try { const blob = await IDB.get(m.code); if (blob) src = URL.createObjectURL(blob); } catch (_) {}
      player.src = src;
      player.currentTime = 0;
      player.play().catch(() => {}); // silencieux si l'audio n'est pas encore en ligne
    }
  })
);

/* ============================================================
   ÉTAPE 2 — Intention
   ============================================================ */
const intentionInput = $("#intention");
intentionInput.value = state.intention;
intentionInput.addEventListener("input", () => { state.intention = intentionInput.value; save(); });

/* ============================================================
   ÉTAPE 3 — Corpus
   ============================================================ */
const player = $("#player");
let playingCode = null;

function buildLegend() {
  const box = $("#famille-legend");
  box.innerHTML = "";
  Object.entries(FAMILLES).forEach(([k, f]) => {
    const el = document.createElement("span");
    el.className = "lg";
    el.innerHTML = `<span class="dot" style="background:${f.couleur}"></span>${k} · ${f.nom}`;
    box.appendChild(el);
  });
}

function buildCorpus() {
  const grid = $("#corpus-grid");
  grid.innerHTML = "";
  CORPUS.forEach((e) => {
    const fam = FAMILLES[e.famille];
    const card = document.createElement("div");
    card.className = "track";
    card.dataset.code = e.code;
    if (state.prof) card.style.borderTopColor = fam.couleur;
    card.innerHTML = `
      <div class="track-code">${e.code}</div>
      <div class="track-reveal"></div>
      <button class="play" title="Écouter">▶</button>
      <div class="track-actions">
        <button class="mark fav" data-role="fav" title="Coup de cœur">♡</button>
        <button class="mark final" data-role="final" title="Finaliste">⭐</button>
        <button class="mark choice" data-role="choice" title="Mon choix">🏆</button>
      </div>
      <div class="track-missing" hidden>extrait à ajouter</div>`;

    card.querySelector(".play").addEventListener("click", () => togglePlay(e, card));
    card.querySelectorAll(".mark").forEach((btn) =>
      btn.addEventListener("click", () => toggleMark(e.code, btn.dataset.role))
    );
    grid.appendChild(card);
  });
  refreshCorpusUI();
}

async function togglePlay(e, card) {
  if (playingCode === e.code) { stopPlay(); return; }
  stopPlay();
  let src = e.src;
  try {
    const blob = await IDB.get(e.code);      // musique importée par le prof (prioritaire)
    if (blob) src = URL.createObjectURL(blob);
  } catch (_) {}
  player.src = src;
  player.play().then(() => {
    playingCode = e.code;
    card.classList.add("playing");
    card.querySelector(".play").textContent = "⏸";
  }).catch(() => {
    // fichier absent
    card.querySelector(".track-missing").hidden = false;
    card.querySelector(".play").textContent = "▶";
  });
}
function stopPlay() {
  player.pause();
  const prev = playingCode;
  playingCode = null;
  if (!prev) return;
  const c = document.querySelector(`.track[data-code="${prev}"]`);
  if (c) { c.classList.remove("playing"); c.querySelector(".play").textContent = "▶"; }
}
player.addEventListener("ended", stopPlay);

function toggleMark(code, role) {
  if (role === "fav") {
    toggleIn(state.favs, code);
  } else if (role === "final") {
    if (state.finalists.includes(code)) {
      state.finalists = state.finalists.filter((c) => c !== code);
    } else {
      if (state.finalists.length >= 2) {
        alert("Tu ne peux garder que 2 finalistes. Retire-en un d'abord.");
        return;
      }
      state.finalists.push(code);
    }
  } else if (role === "choice") {
    state.choice = state.choice === code ? null : code;
  }
  save();
  refreshCorpusUI();
  refreshFiche();
}
function toggleIn(arr, v) {
  const i = arr.indexOf(v);
  if (i >= 0) arr.splice(i, 1); else arr.push(v);
}

function refreshCorpusUI() {
  $$(".track").forEach((card) => {
    const code = card.dataset.code;
    card.querySelector(".fav").classList.toggle("on", state.favs.includes(code));
    card.querySelector(".final").classList.toggle("on", state.finalists.includes(code));
    card.querySelector(".choice").classList.toggle("on", state.choice === code);
    const rev = card.querySelector(".track-reveal");
    if (state.prof) {
      const e = CORPUS.find((x) => x.code === code);
      rev.textContent = e.compositeur + " — " + e.oeuvre;
      card.style.borderTopColor = FAMILLES[e.famille].couleur;
    } else {
      rev.textContent = "";
      card.style.borderTopColor = "";
    }
  });
  $("#count-fav").textContent = state.favs.length;
  $("#count-final").textContent = state.finalists.length;
  $("#count-choice").textContent = state.choice || "—";
}

/* ============================================================
   ÉTAPE 4 — Fiche
   ============================================================ */
const fMap = { plus: "#q-plus", hesite: "#q-hesite", pourquoi: "#q-pourquoi", ajoute: "#q-ajoute" };
Object.entries(fMap).forEach(([key, sel]) => {
  const el = $(sel);
  el.value = state.fiche[key] || "";
  el.addEventListener("input", () => { state.fiche[key] = el.value; save(); });
});

$$("#param-chips .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    toggleIn(state.fiche.params, chip.dataset.p);
    chip.classList.toggle("on");
    save();
  });
});

function refreshFiche() {
  $("#fiche-choice").textContent = state.choice || "—";
  // pré-remplir le finaliste écarté
  const other = state.finalists.filter((c) => c !== state.choice);
  if (other.length && !$("#q-hesite").value) {
    $("#q-hesite").value = other.join(", ");
    state.fiche.hesite = other.join(", ");
  }
  // bouton révéler (mode prof uniquement)
  const revealBtn = $("#reveal-choice");
  revealBtn.hidden = !(state.prof && state.choice);
  applyChoiceName();
  // restaurer les chips
  $$("#param-chips .chip").forEach((c) =>
    c.classList.toggle("on", state.fiche.params.includes(c.dataset.p))
  );
}
function applyChoiceName() {
  const nameEl = $("#fiche-choice-name");
  nameEl.textContent = "";
  if (state.prof && state.choice && state._revealChoice) {
    const e = CORPUS.find((x) => x.code === state.choice);
    if (e) nameEl.textContent = "→ " + e.compositeur + ", " + e.oeuvre;
  }
}
$("#reveal-choice").addEventListener("click", () => { state._revealChoice = true; applyChoiceName(); });

/* ============================================================
   MODE PROFESSEUR
   ============================================================ */
$("#prof-toggle").addEventListener("click", () => {
  if (!state.prof) {
    const code = prompt("Mode professeur — entrez le code d'accès :", "");
    if (code === null) return;
    if (code.trim().toLowerCase() !== "prof") { alert("Code incorrect."); return; }
  }
  state.prof = !state.prof;
  state._revealChoice = false;
  save();
  applyProf();
});
function applyProf() {
  $("#prof-toggle").classList.toggle("on", state.prof);
  $("#prof-toggle").textContent = state.prof ? "👩‍🏫 Mode prof : ON" : "👩‍🏫 Mode prof";
  $("#famille-legend").hidden = !state.prof;
  $("#prof-audio").hidden = !state.prof;
  refreshCorpusUI();
  refreshFiche();
  if (state.prof) renderProfStatus();
}

/* ============================================================
   BOUTONS "data-goto" + reset
   ============================================================ */
$$("[data-goto]").forEach((b) => b.addEventListener("click", () => goto(+b.dataset.goto)));
$("#reset-btn").addEventListener("click", async () => {
  if (confirm("Effacer toutes tes réponses et recommencer ?")) {
    localStorage.removeItem(KEY);
    try { await IDB.del(CREATION_KEY); } catch (_) {} // efface la création de l'élève, garde les musiques du prof
    location.reload();
  }
});

/* ============================================================
   STOCKAGE LOCAL DES FICHIERS (IndexedDB)
   Sert : (1) aux musiques importées par le prof,
          (2) à la création vidéo/image de l'élève.
   ============================================================ */
const IDB = (function () {
  let dbp;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open("meetingpoint", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("audio");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function tx(mode, fn) {
    const db = await open();
    return new Promise((res, rej) => {
      const t = db.transaction("audio", mode);
      const store = t.objectStore("audio");
      const rq = fn(store);
      t.oncomplete = () => res(rq && rq.result);
      t.onerror = () => rej(t.error);
    });
  }
  return {
    put: (k, v) => tx("readwrite", (s) => s.put(v, k)),
    get: (k) => tx("readonly", (s) => s.get(k)),
    del: (k) => tx("readwrite", (s) => s.delete(k)),
    keys: () => tx("readonly", (s) => s.getAllKeys()),
  };
})();

/* ============================================================
   CRÉATION DE L'ÉLÈVE (vidéo / image / YouTube)
   ============================================================ */
const CREATION_KEY = "__creation__";

function ytId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

// Onglets fichier / YouTube
$$(".cl-tab").forEach((tab) =>
  tab.addEventListener("click", () => {
    $$(".cl-tab").forEach((t) => t.classList.toggle("on", t === tab));
    $$(".cl-pane").forEach((p) => (p.hidden = p.dataset.pane !== tab.dataset.cl));
  })
);

// Upload d'un fichier
$("#creation-file").addEventListener("change", async (ev) => {
  const f = ev.target.files[0];
  if (!f) return;
  await IDB.put(CREATION_KEY, f);
  state.creation = {
    type: f.type.startsWith("image") ? "image" : "file",
    ytid: null,
    fileName: f.name,
  };
  save();
  refreshCreation();
});

// Lien YouTube
$("#creation-yt-btn").addEventListener("click", () => {
  const id = ytId($("#creation-yt").value);
  if (!id) {
    alert("Lien YouTube non reconnu. Colle une adresse comme https://youtu.be/xxxxxxxxxxx");
    return;
  }
  state.creation = { type: "youtube", ytid: id, fileName: null };
  save();
  refreshCreation();
});

async function creationBlobURL() {
  const b = await IDB.get(CREATION_KEY);
  return b ? URL.createObjectURL(b) : null;
}

function creationEmptyHTML(stage) {
  return stage
    ? `<div class="stage-empty">Tu n'as pas encore chargé ta création.
       <button class="linklike" data-goto="2">← Retourne à l'étape 2 pour l'ajouter</button></div>`
    : "";
}

async function renderCreationInto(container, stage) {
  if (!container) return;
  const c = state.creation || {};
  if (!c.type) { container.innerHTML = creationEmptyHTML(stage); wireGoto(container); return; }

  if (c.type === "youtube") {
    container.innerHTML =
      `<div class="cr-frame"><iframe src="https://www.youtube-nocookie.com/embed/${c.ytid}${stage ? "?mute=1" : ""}"
        allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` +
      (stage ? `<p class="cr-note">Astuce : mets la vidéo en sourdine, puis écoute une musique par-dessus.</p>` : "");
    return;
  }
  const url = await creationBlobURL();
  if (!url) { container.innerHTML = creationEmptyHTML(stage); wireGoto(container); return; }
  if (c.type === "image") {
    container.innerHTML = `<img class="cr-media" src="${url}" alt="ma création" />`;
  } else {
    container.innerHTML =
      `<video class="cr-media" src="${url}" ${stage ? "muted loop" : ""} controls playsinline></video>` +
      (stage ? `<p class="cr-note">🔇 Vidéo en sourdine — lance-la, puis écoute une musique par-dessus.</p>` : "");
  }
}
function wireGoto(container) {
  container.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => goto(+b.dataset.goto))
  );
}
function refreshCreation() {
  renderCreationInto($("#creation-preview"), false);
  renderCreationInto($("#creation-stage"), true);
}

/* ============================================================
   IMPORT DES MUSIQUES PAR LE PROFESSEUR
   ============================================================ */
let profFiles = []; // { file, code, name }

function guessCode(name) {
  const m = name.match(/(?:^|[^A-Za-z])([A-Ha-h])[\s._-]?0?([1-9][0-9]?)/);
  if (m) {
    const code = m[1].toUpperCase() + m[2];
    if (CORPUS.some((e) => e.code === code)) return code;
  }
  return "";
}
function extFromType(t) {
  return { "audio/mpeg": "mp3", "audio/mp3": "mp3", "audio/ogg": "ogg",
    "audio/wav": "wav", "audio/x-wav": "wav", "audio/mp4": "m4a", "audio/aac": "aac",
    "audio/flac": "flac" }[t] || "mp3";
}

$("#prof-audio-files").addEventListener("change", async (ev) => {
  for (const f of ev.target.files) {
    const code = guessCode(f.name);
    profFiles.push({ file: f, code, name: f.name });
    if (code) await IDB.put(code, f);
  }
  ev.target.value = "";
  renderProfList();
  renderProfStatus();
});

function codeOptions(selected) {
  return CORPUS.map((e) =>
    `<option value="${e.code}" ${e.code === selected ? "selected" : ""}>${e.code}</option>`
  ).join("");
}

function renderProfList() {
  const box = $("#prof-audio-list");
  if (!profFiles.length) { box.innerHTML = ""; return; }
  box.innerHTML = profFiles.map((it, i) =>
    `<div class="pa-row">
      <span class="pa-name" title="${it.name}">${it.name}</span>
      <select class="pa-select" data-i="${i}">
        <option value="">— code —</option>${codeOptions(it.code)}
      </select>
      <span class="pa-ok">${it.code ? "✓" : "à classer"}</span>
    </div>`
  ).join("");
  box.querySelectorAll(".pa-select").forEach((sel) =>
    sel.addEventListener("change", async () => {
      const i = +sel.dataset.i;
      const newCode = sel.value;
      const old = profFiles[i].code;
      if (old && old !== newCode) await IDB.del(old);
      profFiles[i].code = newCode;
      if (newCode) await IDB.put(newCode, profFiles[i].file);
      renderProfList();
      renderProfStatus();
    })
  );
}

async function renderProfStatus() {
  const box = $("#prof-audio-status");
  if (!box) return;
  let keys = [];
  try { keys = (await IDB.keys()).filter((k) => k !== CREATION_KEY); } catch (_) {}
  const fournis = Object.keys(AUDIO_FOURNIS);
  const withSound = new Set([...keys, ...fournis]);
  const total = CORPUS.length;
  box.innerHTML =
    `<p class="pa-count"><b>${withSound.size}/${total}</b> musiques ont un son ` +
    `(<b>${keys.length}</b> importées sur cet ordinateur, <b>${fournis.length}</b> déjà dans le site).</p>` +
    `<div class="pa-grid">` +
    CORPUS.map((e) => {
      const idb = keys.includes(e.code);
      const site = fournis.includes(e.code);
      const cls = idb ? "has-idb" : site ? "has-site" : "has-none";
      const tip = idb ? "importée ici" : site ? "dans le site" : "sans son";
      return `<span class="pa-chip ${cls}" title="${tip}">${e.code}</span>`;
    }).join("") +
    `</div>`;
}

function downloadBlob(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

$("#prof-audio-zip").addEventListener("click", async () => {
  const keys = (await IDB.keys()).filter((k) => k !== CREATION_KEY);
  if (!keys.length) { alert("Aucune musique importée sur cet ordinateur pour l'instant."); return; }
  const files = [];
  for (const code of keys) {
    const blob = await IDB.get(code);
    if (!blob) continue;
    const ext = extFromType(blob.type);
    files.push({ name: `audio/${code}.${ext}`, data: new Uint8Array(await blob.arrayBuffer()) });
  }
  const zip = await MPZip.makeZip(files);
  downloadBlob(zip, "audio.zip");
});

$("#prof-audio-clear").addEventListener("click", async () => {
  if (!confirm("Retirer toutes les musiques importées de CET ordinateur ? (le site n'est pas modifié)")) return;
  const keys = (await IDB.keys()).filter((k) => k !== CREATION_KEY);
  for (const k of keys) await IDB.del(k);
  profFiles = [];
  renderProfList();
  renderProfStatus();
});

/* ============================================================
   INITIALISATION
   ============================================================ */
buildStepper();
buildLegend();
buildCorpus();
refreshFiche();
refreshCreation();
applyProf();
render();
