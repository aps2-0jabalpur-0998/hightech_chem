// ===== 118-element data (Z,symbol,name,period,group,block) =====

const RAW_DATA = `
1,H,Hydrogen,1,1,s
2,He,Helium,1,18,s
3,Li,Lithium,2,1,s
4,Be,Beryllium,2,2,s
5,B,Boron,2,13,p
6,C,Carbon,2,14,p
7,N,Nitrogen,2,15,p
8,O,Oxygen,2,16,p
9,F,Fluorine,2,17,p
10,Ne,Neon,2,18,p
11,Na,Sodium,3,1,s
12,Mg,Magnesium,3,2,s
13,Al,Aluminium,3,13,p
14,Si,Silicon,3,14,p
15,P,Phosphorus,3,15,p
16,S,Sulfur,3,16,p
17,Cl,Chlorine,3,17,p
18,Ar,Argon,3,18,p
19,K,Potassium,4,1,s
20,Ca,Calcium,4,2,s
21,Sc,Scandium,4,3,d
22,Ti,Titanium,4,4,d
23,V,Vanadium,4,5,d
24,Cr,Chromium,4,6,d
25,Mn,Manganese,4,7,d
26,Fe,Iron,4,8,d
27,Co,Cobalt,4,9,d
28,Ni,Nickel,4,10,d
29,Cu,Copper,4,11,d
30,Zn,Zinc,4,12,d
31,Ga,Gallium,4,13,p
32,Ge,Germanium,4,14,p
33,As,Arsenic,4,15,p
34,Se,Selenium,4,16,p
35,Br,Bromine,4,17,p
36,Kr,Krypton,4,18,p
37,Rb,Rubidium,5,1,s
38,Sr,Strontium,5,2,s
39,Y,Yttrium,5,3,d
40,Zr,Zirconium,5,4,d
41,Nb,Niobium,5,5,d
42,Mo,Molybdenum,5,6,d
43,Tc,Technetium,5,7,d
44,Ru,Ruthenium,5,8,d
45,Rh,Rhodium,5,9,d
46,Pd,Palladium,5,10,d
47,Ag,Silver,5,11,d
48,Cd,Cadmium,5,12,d
49,In,Indium,5,13,p
50,Sn,Tin,5,14,p
51,Sb,Antimony,5,15,p
52,Te,Tellurium,5,16,p
53,I,Iodine,5,17,p
54,Xe,Xenon,5,18,p
55,Cs,Cesium,6,1,s
56,Ba,Barium,6,2,s
57,La,Lanthanum,6,3,f
58,Ce,Cerium,8,4,f
59,Pr,Praseodymium,8,5,f
60,Nd,Neodymium,8,6,f
61,Pm,Promethium,8,7,f
62,Sm,Samarium,8,8,f
63,Eu,Europium,8,9,f
64,Gd,Gadolinium,8,10,f
65,Tb,Terbium,8,11,f
66,Dy,Dysprosium,8,12,f
67,Ho,Holmium,8,13,f
68,Er,Erbium,8,14,f
69,Tm,Thulium,8,15,f
70,Yb,Ytterbium,8,16,f
71,Lu,Lutetium,8,17,f
72,Hf,Hafnium,6,4,d
73,Ta,Tantalum,6,5,d
74,W,Tungsten,6,6,d
75,Re,Rhenium,6,7,d
76,Os,Osmium,6,8,d
77,Ir,Iridium,6,9,d
78,Pt,Platinum,6,10,d
79,Au,Gold,6,11,d
80,Hg,Mercury,6,12,d
81,Tl,Thallium,6,13,p
82,Pb,Lead,6,14,p
83,Bi,Bismuth,6,15,p
84,Po,Polonium,6,16,p
85,At,Astatine,6,17,p
86,Rn,Radon,6,18,p
87,Fr,Francium,7,1,s
88,Ra,Radium,7,2,s
89,Ac,Actinium,7,3,f
90,Th,Thorium,9,4,f
91,Pa,Protactinium,9,5,f
92,U,Uranium,9,6,f
93,Np,Neptunium,9,7,f
94,Pu,Plutonium,9,8,f
95,Am,Americium,9,9,f
96,Cm,Curium,9,10,f
97,Bk,Berkelium,9,11,f
98,Cf,Californium,9,12,f
99,Es,Einsteinium,9,13,f
100,Fm,Fermium,9,14,f
101,Md,Mendelevium,9,15,f
102,No,Nobelium,9,16,f
103,Lr,Lawrencium,9,17,f
104,Rf,Rutherfordium,7,4,d
105,Db,Dubnium,7,5,d
106,Sg,Seaborgium,7,6,d
107,Bh,Bohrium,7,7,d
108,Hs,Hassium,7,8,d
109,Mt,Meitnerium,7,9,d
110,Ds,Darmstadtium,7,10,d
111,Rg,Roentgenium,7,11,d
112,Cn,Copernicium,7,12,d
113,Nh,Nihonium,7,13,p
114,Fl,Flerovium,7,14,p
115,Mc,Moscovium,7,15,p
116,Lv,Livermorium,7,16,p
117,Ts,Tennessine,7,17,p
118,Og,Oganesson,7,18,p
`;

const elements = RAW_DATA.trim().split("\n").map((line) => {
  const [z, sym, name, period, group, block] = line.split(",");
  return {
    z: Number(z),
    sym,
    name,
    e: Number(z),
    period: Number(period),
    group: Number(group),
    block: block || "unknown",
  };
});

// ===== VOICE HANDLING =====

let allVoices = [];
let currentVoice = null;

function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  allVoices = window.speechSynthesis.getVoices() || [];

  const select = document.getElementById("voice-select");
  if (!select) return;

  const first = select.options[0];
  select.innerHTML = "";
  select.appendChild(first);

  allVoices.forEach((v, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${v.name} (${v.lang})`;
    if (v.default) opt.textContent += " [default]";
    select.appendChild(opt);
  });

  if (!currentVoice && allVoices.length > 0) {
    currentVoice = allVoices.find((v) => v.default) || allVoices[0];
  }
}

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("voice-select");
  if (select) {
    select.addEventListener("change", (e) => {
      const idx = Number(e.target.value);
      if (!Number.isNaN(idx) && allVoices[idx]) currentVoice = allVoices[idx];
      else currentVoice = null;
    });
  }
});

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.05;
  utter.volume = 1;
  if (currentVoice) utter.voice = currentVoice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// ===== TABLE RENDER =====

const tableDiv = document.getElementById("table");

elements.forEach((el) => {
  const cell = document.createElement("div");
  cell.className = `cell block-${el.block}`;
  cell.style.gridColumn = el.group;
  const row = el.period <= 7 ? el.period : el.period === 8 ? 8 : 9;
  cell.style.gridRow = row;

  const isAlkali = el.group === 1 && el.sym !== "H";
  const isAlkalineEarth = el.group === 2;
  const isTransition = el.group >= 3 && el.group <= 12 && el.block === "d";
  const isNobleGas = el.group === 18;
  const isHalogen = el.group === 17;
  const isLanthanoid = el.z >= 57 && el.z <= 71;
  const isActinoid = el.z >= 89 && el.z <= 103;

  cell.dataset.category = [
    isAlkali && "alkali",
    isAlkalineEarth && "alkaline-earth",
    isTransition && "transition",
    isNobleGas && "noble-gas",
    isHalogen && "halogen",
    isLanthanoid && "lanthanoid",
    isActinoid && "actinoid",
    el.block === "p" && "p-block",
  ]
    .filter(Boolean)
    .join(" ");

  const z = document.createElement("span");
  z.className = "z";
  z.textContent = el.z;

  const sym = document.createElement("span");
  sym.className = "symbol";
  sym.textContent = el.sym;

  const nameSpan = document.createElement("span");
  nameSpan.className = "name";
  nameSpan.textContent = el.name;

  const robo = document.createElement("div");
  robo.className = "robo-tooltip";
  robo.textContent = `${el.name} (${el.sym})`;

  const roboDot = document.createElement("div");
  roboDot.className = "robo-dot";

  cell.appendChild(z);
  cell.appendChild(sym);
  cell.appendChild(nameSpan);
  cell.appendChild(robo);
  cell.appendChild(roboDot);

  cell.addEventListener("mouseenter", () => {
    speak(`${el.name}. Symbol ${el.sym}.`);
  });
  cell.addEventListener("mouseleave", () => {
    window.speechSynthesis.cancel();
  });
  cell.addEventListener("click", () => openModal(el));

  tableDiv.appendChild(cell);
});

// ===== FILTERING =====

const filterSelect = document.getElementById("filter-select");

function applyFilter() {
  const value = filterSelect ? filterSelect.value : "all";
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (value === "all") {
      cell.style.display = "flex";
      return;
    }
    const cat = (cell.dataset.category || "").split(" ");
    cell.style.display = cat.includes(value) ? "flex" : "none";
  });
}

if (filterSelect) {
  filterSelect.addEventListener("change", applyFilter);
}

// ===== MODAL + CANVAS =====

const backdrop = document.getElementById("modal-backdrop");
const closeBtn = document.getElementById("modal-close");
const titleEl = document.getElementById("el-title");
const line1El = document.getElementById("el-line1");
const line2El = document.getElementById("el-line2");
const line3El = document.getElementById("el-line3");
const canvas = document.getElementById("atom-canvas");
const ctx = canvas.getContext("2d");

let currentElement = null;
let shells = null;
let baseAngles = null;
let animId = null;
let lastElementForChat = null;

function shellsFromElectrons(n) {
  const caps = [2, 8, 8, 18, 18, 32];
  const radii = [55, 90, 125, 160, 195, 225];
  const out = [];
  let left = n;
  for (let i = 0; i < caps.length && left > 0; i++) {
    const take = Math.min(caps[i], left);
    out.push({ r: radii[i], count: take });
    left -= take;
  }
  return out;
}

function prettyConfig(shells) {
  return shells.map((s) => s.count).join(", ");
}

function openModal(el) {
  currentElement = el;
  shells = shellsFromElectrons(el.e);

  // Equidistant base angles per shell
  baseAngles = [];
  shells.forEach((shell) => {
    const step = (2 * Math.PI) / shell.count;
    for (let i = 0; i < shell.count; i++) {
      baseAngles.push(i * step);
    }
  });

  const cfg = prettyConfig(shells);
  const valence = el.e <= 2 ? el.e : el.e % 8 || 8;

  titleEl.textContent = `${el.name} (${el.sym})  Z=${el.z}`;
  line1El.innerHTML = `<strong>Electrons</strong> ${el.e} &nbsp; <strong>Shells</strong> ${cfg}`;
  line2El.innerHTML = `<strong>Period</strong> ${el.period} &nbsp; <strong>Group</strong> ${el.group} &nbsp; <strong>Block</strong> ${el.block.toUpperCase()}-block`;

  let bondMsg;
  if (valence === 1) bondMsg = "Tends to lose 1 electron, forms ionic bonds.";
  else if (valence >= 2 && valence <= 4) bondMsg = "Commonly forms covalent bonds.";
  else if (valence === 7) bondMsg = "Tends to gain 1 electron to complete octet.";
  else bondMsg = "Relatively less reactive / more stable.";

  line3El.innerHTML = `<strong>Valence e⁻</strong> ${valence} &nbsp; ${bondMsg}`;

  backdrop.classList.remove("hidden");
  if (animId) cancelAnimationFrame(animId);
  animate(0);

  const detailSpeech = `${el.name}. Symbol ${el.sym}. Atomic number ${el.z}. ${el.e} electrons in shells ${cfg}. Period ${el.period}, group ${el.group}, ${el.block} block. Valence electrons ${valence}. ${bondMsg}`;
  speak(detailSpeech);

  lastElementForChat = `${el.name} (${el.sym}), Z = ${el.z}`;
}

function closeModal() {
  backdrop.classList.add("hidden");
  if (animId) cancelAnimationFrame(animId);
  window.speechSynthesis.cancel();
  currentElement = null;
}

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});

closeBtn.addEventListener("click", closeModal);

// ===== ANIMATION (slow + equidistant) =====

function drawOrbit(cx, cy, r) {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(56,189,248,0.7)";
  ctx.lineWidth = 1.3;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.stroke();
}

function animate(frame) {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;

  const t = frame * 0.002; // slow

  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220);
  grad.addColorStop(0, "#111827");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.beginPath();
  ctx.fillStyle = "#ef4444";
  ctx.shadowColor = "#f97373";
  ctx.shadowBlur = 18;
  ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
  ctx.fill();
  ctx.shadowBlur = 0;

  if (currentElement) {
    ctx.fillStyle = "#f9fafb";
    ctx.font = "bold 18px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentElement.sym, cx, cy);
  }

  if (!currentElement || !shells) {
    animId = requestAnimationFrame((f) => animate(f + 1));
    return;
  }

  let idx = 0;
  const trailLen = 5;

  shells.forEach((shell, si) => {
    const r = shell.r;
    drawOrbit(cx, cy, r);

    for (let j = 0; j < shell.count; j++) {
      const base = baseAngles[idx % baseAngles.length];
      const angle = base + t * (0.5 + 0.2 * si);

      const ex = cx + r * Math.cos(angle);
      const ey = cy + r * Math.sin(angle);

      for (let k = 1; k < trailLen; k++) {
        const decay = k / trailLen;
        const a2 = angle - 0.1 * (k + 1) * (0.2 + si * 0.1);
        const tx = cx + r * Math.cos(a2);
        const ty = cy + r * Math.sin(a2);
        ctx.beginPath();
        ctx.fillStyle = `rgba(253,244,215,${0.12 * (1 - decay)})`;
        ctx.arc(tx, ty, 4, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = "rgba(254,240,138,0.28)";
      ctx.arc(ex, ey, 10, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#fef9c3";
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 0.7;
      ctx.arc(ex, ey, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      idx++;
    }
  });

  animId = requestAnimationFrame((f) => animate(f + 1));
}

animate(0);

// ===== VOICE SEARCH =====

const voiceBtn = document.getElementById("voice-search-btn");
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (Recognition) {
  recognition = new Recognition();
  recognition.lang = "en-US" || "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("result", (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();

    const found = elements.find(
      (el) =>
        el.name.toLowerCase() === transcript || el.sym.toLowerCase() === transcript
    );

    if (found) {
      speak(`Opening ${found.name}.`);
      openModal(found);
    } else {
      speak(`Could not find element ${transcript}.`);
    }
  });
}

if (voiceBtn && recognition) {
  voiceBtn.addEventListener("click", () => {
    try {
      recognition.start();
      speak("Say the element name or symbol, for example hydrogen or H.");
    } catch {
      // ignore double start errors
    }
  });
}

// ===== AI CHATBOT INTEGRATION =====

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

function appendMessage(text, sender = "bot") {
  if (!chatWindow) return;
  const msg = document.createElement("div");
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

if (chatWindow) {
  appendMessage(
    "Hi! I am your AI chemistry tutor. Ask me about any element, periodic trend, or class 11 chemistry concept."
  );
}

if (chatForm && chatInput && chatWindow) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    chatInput.value = "";
    appendMessage("Thinking...", "bot");

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          element: lastElementForChat || null,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      const last = chatWindow.querySelector(".chat-msg.bot:last-child");
      if (last && last.textContent === "Thinking...") {
        chatWindow.removeChild(last);
      }

      appendMessage(data.reply || "Sorry, I could not answer that.", "bot");
    } catch (err) {
      const last = chatWindow.querySelector(".chat-msg.bot:last-child");
      if (last && last.textContent === "Thinking...") {
        chatWindow.removeChild(last);
      }
      appendMessage(
        "Error talking to AI tutor. Is the backend running on port 3000?",
        "bot"
      );
      console.error(err);
    }
  });
}
