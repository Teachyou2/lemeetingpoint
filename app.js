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
  triste: "La même image devient un adieu, un souvenir qui serre le cœur. 💧",
  joyeuse: "Soudain, c'est l'attente heureuse de quelqu'un qu'on aime. ☀️",
  inquiétante: "Et là… on sent qu'un danger approche derrière la vitre. 😨",
};
$$(".exp-btn").forEach((b) =>
  b.addEventListener("click", () => {
    $("#exp-result").textContent = EXP[b.dataset.mood];
    $$(".exp-btn").forEach((x) => (x.style.borderColor = ""));
    b.style.borderColor = "var(--accent)";
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

function togglePlay(e, card) {
  if (playingCode === e.code) { stopPlay(); return; }
  stopPlay();
  player.src = e.src;
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
  refreshCorpusUI();
  refreshFiche();
}

/* ============================================================
   BOUTONS "data-goto" + reset
   ============================================================ */
$$("[data-goto]").forEach((b) => b.addEventListener("click", () => goto(+b.dataset.goto)));
$("#reset-btn").addEventListener("click", () => {
  if (confirm("Effacer toutes tes réponses et recommencer ?")) {
    localStorage.removeItem(KEY);
    location.reload();
  }
});

/* ============================================================
   INITIALISATION
   ============================================================ */
buildStepper();
buildLegend();
buildCorpus();
refreshFiche();
applyProf();
render();
