// ===== 118-element data (Z,symbol,name,period,group,block) =====
const RAW_DATA = `1,H,Hydrogen,1,1,s
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
118,Og,Oganesson,7,18,p`;

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

  // drag support for reaction circles
  cell.draggable = true;
  cell.dataset.symbol = el.sym;
  cell.dataset.name = el.name;

  cell.addEventListener("dragstart", () => {
    cell.classList.add("dragging");
    speak(`Dragging ${el.name} (${el.sym})`);
  });

  cell.addEventListener("dragend", () => {
    cell.classList.remove("dragging");
  });

  cell.addEventListener("mouseenter", () => {
    speak(`${el.name}. Symbol ${el.sym}.`);
  });

  cell.addEventListener("mouseleave", () => {
    window.speechSynthesis.cancel();
  });

  cell.addEventListener("click", () => {
    handleReactantClick(el);
    openModal(el);
  });

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

// ===== MODAL + CANVAS (element) =====
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
  baseAngles = [];
  shells.forEach((shell) => {
    const step = (2 * Math.PI) / shell.count;
    for (let i = 0; i < shell.count; i++) baseAngles.push(i * step);
  });

  const cfg = prettyConfig(shells);
  const valence = el.e <= 2 ? el.e : el.e % 8 || 8;

  titleEl.textContent = `${el.name} (${el.sym}) Z=${el.z}`;
  line1El.innerHTML = `Electrons ${el.e} Shells ${cfg}`;
  line2El.innerHTML = `Period ${el.period} Group ${el.group} Block ${el.block.toUpperCase()}-block`;

  let bondMsg;
  if (valence === 1) bondMsg = "Tends to lose 1 electron, forms ionic bonds.";
  else if (valence >= 2 && valence <= 4) bondMsg = "Commonly forms covalent bonds.";
  else if (valence === 7) bondMsg = "Tends to gain 1 electron to complete octet.";
  else bondMsg = "Relatively less reactive / more stable.";

  line3El.innerHTML = `Valence e⁻ ${valence} ${bondMsg}`;

  backdrop.classList.remove("hidden");
  if (animId) cancelAnimationFrame(animId);
  animateAtom(0);

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

function drawOrbit(cx, cy, r) {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(56,189,248,0.7)";
  ctx.lineWidth = 1.3;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.stroke();
}

function animateAtom(frame) {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const t = frame * 0.002;

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
    animId = requestAnimationFrame((f) => animateAtom(f + 1));
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

  animId = requestAnimationFrame((f) => animateAtom(f + 1));
}
animateAtom(0);

// ===== REACTION SYSTEM (click + drag) =====
let reactLeft = null;
let reactRight = null;

const reactLeftSlot = document.getElementById("react-left");
const reactRightSlot = document.getElementById("react-right");
const reactRunBtn = document.getElementById("react-run-btn");

const reactionDefs = {
  'H H': 'H₂ - Simple covalent single bond.',
  'Na Cl': 'NaCl - Ionic bond (Na⁺ + Cl⁻).',
  'H O': 'H₂O - Polar covalent, bent shape (104.5°).',
  'C H': 'CH₄ - Tetrahedral covalent (sp³, 109.5°).',
  'H Cl': 'HCl - Polar covalent bond.',
  'C O': 'CO₂ - Linear, two double bonds (180°).',

  // NEW BASIC REACTIONS (ADD THESE)
  'Mg O': '2Mg + O₂ → 2MgO - Metal + Oxygen → Oxide (ionic).',
  'Fe HCl': 'Fe + 2HCl → FeCl₂ + H₂ - Metal displacement.',
  'Zn HCl': 'Zn + 2HCl → ZnCl₂ + H₂ - Single displacement.',
  'Ca O': '2Ca + O₂ → 2CaO - Alkaline earth oxide.',
  'Al O': '4Al + 3O₂ → 2Al₂O₃ - Amphoteric oxide.',
  'N H': 'NH₃ - Trigonal pyramidal (3 bonds, 1 lone pair).',
  'P H': 'PH₃ - Similar to NH₃ but less polar.',
  'S H': 'H₂S - Bent, like H₂O.',
  'C C': 'C₂H₆ - C-C single bond (ethane skeleton).',
  'Na H2O': '2Na + 2H₂O → 2NaOH + H₂ - Violent alkali reaction.',
  'K H2O': '2K + 2H₂O → 2KOH + H₂ - Even more reactive.',
  'Cu O': '2Cu + O₂ → 2CuO - Transition metal oxide.',

  // NOBLE GAS REACTIONS → NO STABLE COMPOUND
  'He He': 'No stable compound: both atoms are noble gases with filled shells.',
  'He Ne': 'No stable compound: noble gases are largely inert.',
  'He Ar': 'No stable compound: noble gases are largely inert.',
  'He Kr': 'No stable compound: noble gases are largely inert.',
  'He Xe': 'No stable compound: noble gases are largely inert.',
  'He Rn': 'No stable compound: noble gases are largely inert.',
  'He Og': 'No stable compound: noble gases are largely inert.',
  'Ne Ne': 'No stable compound: noble gases have complete octets.',
  'Ne Ar': 'No stable compound: noble gases have complete octets.',
  'Ne Kr': 'No stable compound: noble gases have complete octets.',
  'Ne Xe': 'No stable compound: noble gases have complete octets.',
  'Ne Rn': 'No stable compound: noble gases have complete octets.',
  'Ne Og': 'No stable compound: noble gases have complete octets.',
  'Ar Ar': 'No stable compound: noble gases have complete octets.',
  'Ar Kr': 'No stable compound: noble gases have complete octets.',
  'Ar Xe': 'No stable compound: noble gases have complete octets.',
  'Ar Rn': 'No stable compound: noble gases have complete octets.',
  'Ar Og': 'No stable compound: noble gases have complete octets.',
  'Kr Kr': 'No stable compound: noble gases have complete octets.',
  'Kr Xe': 'No stable compound: noble gases have complete octets.',
  'Kr Rn': 'No stable compound: noble gases have complete octets.',
  'Kr Og': 'No stable compound: noble gases have complete octets.',
  'Xe Xe': 'No stable compound: noble gases have complete octets.',
  'Xe Rn': 'No stable compound: noble gases have complete octets.',
  'Xe Og': 'No stable compound: noble gases have complete octets.',
  'Rn Rn': 'No stable compound: noble gases have complete octets.',
  'Rn Og': 'No stable compound: noble gases have complete octets.',
  'Og Og': 'No stable compound: noble gases have complete octets.',

  'default': 'Potential compound formation based on electronegativity difference.'
};

// electronegativity (for tug of war)
const EN = {
  H: 2.2,
  C: 2.55,
  N: 3.04,
  O: 3.44,
  F: 3.98,
  Cl: 3.16,
  Br: 2.96,
  I: 2.66,
  Na: 0.93,
  K: 0.82,
  Ca: 1.0,
  Mg: 1.31,
  S: 2.58,
  P: 2.19,
};

function handleReactantClick(el) {
  if (!reactLeft) {
    reactLeft = el;
    reactLeftSlot.textContent = el.sym;
  } else if (!reactRight) {
    reactRight = el;
    reactRightSlot.textContent = el.sym;
  } else {
    reactLeft = el;
    reactRight = null;
    reactLeftSlot.textContent = el.sym;
    reactRightSlot.textContent = "?";
  }
}

function setActiveSlot(slot) {
  reactLeftSlot.classList.remove("active-slot");
  reactRightSlot.classList.remove("active-slot");
  if (slot) slot.classList.add("active-slot");
}

[reactLeftSlot, reactRightSlot].forEach((slot, index) => {
  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
    setActiveSlot(slot);
  });

  slot.addEventListener("dragleave", () => {
    slot.classList.remove("active-slot");
  });

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    slot.classList.remove("active-slot");

    const draggingCell = document.querySelector(".cell.dragging");
    if (!draggingCell) return;

    const sym = draggingCell.dataset.symbol;
    const name = draggingCell.dataset.name;
    const element = elements.find((el) => el.sym === sym);
    if (!element) return;

    if (index === 0) {
      reactLeft = element;
      reactLeftSlot.textContent = sym;
    } else {
      reactRight = element;
      reactRightSlot.textContent = sym;
    }

    speak(`${name} dropped in ${index === 0 ? "left" : "right"} circle.`);
  });
});

reactLeftSlot.addEventListener("click", () => {
  reactLeft = null;
  reactLeftSlot.textContent = "?";
});
reactRightSlot.addEventListener("click", () => {
  reactRight = null;
  reactRightSlot.textContent = "?";
});

if (reactRunBtn) {
  reactRunBtn.addEventListener("click", () => {
    if (!reactLeft || !reactRight) {
      speak("Select two elements by clicking or dragging them into the circles.");
      return;
    }
    showChemicalReaction(reactLeft.sym, reactRight.sym);
  });
}

// ===== REACTION MODAL DRAWING + ANIMATION =====
const reactionBackdrop = document.getElementById("reaction-backdrop");
const reactionClose = document.getElementById("reaction-close");
const reactionTitle = document.getElementById("reaction-title");
const reactionInfo = document.getElementById("reaction-info");
const reactionCanvas = document.getElementById("reaction-canvas");
const reactionCtx = reactionCanvas.getContext("2d");

let reactionAnimId = null;

function showChemicalReaction(sym1, sym2) {
  const key1 = `${sym1} ${sym2}`;
  const key2 = `${sym2} ${sym1}`;

  const nobleSet = new Set(["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"]);
  let infoText;

  if (nobleSet.has(sym1) || nobleSet.has(sym2)) {
    infoText =
      reactionDefs[key1] ||
      reactionDefs[key2] ||
      "No stable compound: noble gases are chemically inert under normal conditions.";
  } else {
    infoText = reactionDefs[key1] || reactionDefs[key2] || reactionDefs["default"];
  }

  const speech = `${sym1} plus ${sym2}. ${infoText}`;
  speak(speech);

  reactionTitle.textContent = `${sym1} + ${sym2} →`;
  reactionInfo.textContent = `${sym1} + ${sym2}: ${infoText}`;

  reactionBackdrop.classList.remove("hidden");
  startReactionAnimation(sym1, sym2, infoText);
}



function drawReactionAtom(ctx, x, y, label, color = "#facc15", r = 28) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.shadowColor = "#fef3c7";
  ctx.shadowBlur = 18;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 20px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
}

function drawStaticReaction(sym1, sym2, infoText) {
  const ctx = reactionCtx;
  const w = reactionCanvas.width;
  const h = reactionCanvas.height;
  const cx = w / 2;
  const cy = h / 2;

  ctx.clearRect(0, 0, w, h);
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) / 2);
  grad.addColorStop(0, "#020617");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const leftX = cx - 120;
  const rightX = cx + 120;

  drawReactionAtom(ctx, leftX, cy, sym1, "#22c55e", 30);
  drawReactionAtom(ctx, rightX, cy, sym2, "#60a5fa", 30);

  const dashed = infoText.includes("Ionic");

  ctx.strokeStyle = dashed ? "#f97316" : "#38bdf8";
  ctx.lineWidth = 4;
  
  ctx.beginPath();
  ctx.moveTo(leftX + 35, cy);
  ctx.lineTo(rightX - 35, cy);
  ctx.stroke();
  
  if (!dashed && infoText.includes("double")) {
    ctx.beginPath();
    ctx.moveTo(leftX + 35, cy + 8);
    ctx.lineTo(rightX - 35, cy + 8);
    ctx.stroke();
  }
}

function startReactionAnimation(sym1, sym2, infoText) {
  if (reactionAnimId) cancelAnimationFrame(reactionAnimId);

  const ctx = reactionCtx;
  const w = reactionCanvas.width;
  const h = reactionCanvas.height;
  const cx = w / 2;
  const cy = h / 2;

  const leftStartX = cx - 220;
  const rightStartX = cx + 220;
  const leftEndX = cx - 120;
  const rightEndX = cx + 120;

  const totalFrames = 200;

  const isIonic = infoText.includes("Ionic");
  const isDouble = infoText.includes("double");
  const en1 = EN[sym1] || 2.0;
  const en2 = EN[sym2] || 2.0;
  const highENRight = en2 > en1;
  const enDiff = Math.abs(en1 - en2);

  const getValence = (sym) => {
    const e = elements.find((el) => el.sym === sym);
    if (!e) return 0;
    const z = e.z;
    if (z <= 2) return z;
    const mod = z % 8;
    return mod === 0 ? 8 : mod;
  };

  const valLeft0 = getValence(sym1);
  const valRight0 = getValence(sym2);

  function drawBackground() {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) / 2);
    grad.addColorStop(0, "#020617");
    grad.addColorStop(1, "#020617");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawLewisDots(x, y, valence, chargeShift = 0) {
    const total = Math.max(0, Math.min(8, valence + chargeShift));
    const r = 36;
    const positions = [
      0,
      Math.PI / 2,
      Math.PI,
      (3 * Math.PI) / 2,
      Math.PI / 4,
      (3 * Math.PI) / 4,
      (5 * Math.PI) / 4,
      (7 * Math.PI) / 4,
    ];
    ctx.fillStyle = "#e5e7eb";
    for (let i = 0; i < total; i++) {
      const a = positions[i];
      const dx = Math.cos(a) * r;
      const dy = Math.sin(a) * r;
      ctx.beginPath();
      ctx.arc(x + dx, y + dy, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function frameFn(frame) {
    const t = frame / totalFrames;

    ctx.clearRect(0, 0, w, h);
    drawBackground();

    const tAtoms = Math.min(1, t / 0.4);
    const easeAtoms =
      tAtoms < 0.5 ? 2 * tAtoms * tAtoms : -1 + (4 - 2 * tAtoms) * tAtoms;

    const leftX = leftStartX + (leftEndX - leftStartX) * easeAtoms;
    const rightX = rightStartX + (rightEndX - rightStartX) * easeAtoms;

    drawReactionAtom(ctx, leftX, cy, sym1, "#22c55e", 30);
    drawReactionAtom(ctx, rightX, cy, sym2, "#60a5fa", 30);

    const midX = (leftX + rightX) / 2;

    const electronPhase = Math.min(1, Math.max(0, (t - 0.2) / 0.4));
    const sharedPairs = isDouble ? 2 : 1;

    for (let pair = 0; pair < sharedPairs; pair++) {
      const baseOffset = (pair - (sharedPairs - 1) / 2) * 10;

      let bias = 0;
      if (!isIonic && enDiff > 0.3) {
        const tugPhase = Math.min(1, Math.max(0, (t - 0.6) / 0.3));
        const maxShift = 0.25 + 0.15 * Math.min(enDiff, 1.0);
        bias = maxShift * tugPhase * (highENRight ? 1 : -1);
      }

      if (isIonic) {
        const travel = electronPhase;
        const fromX = highENRight ? leftX : rightX;
        const toX = highENRight ? rightX : leftX;
        const ex = fromX + (toX - fromX) * travel;
        const ey = cy - 28 + baseOffset;
        ctx.beginPath();
        ctx.fillStyle = "#facc15";
        ctx.shadowColor = "#fde68a";
        ctx.shadowBlur = 10;
        ctx.arc(ex, ey, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        const shared = midX;
        const ex =
          shared +
          bias * (highENRight ? rightX - midX : midX - leftX) * electronPhase;
        const wiggle = Math.sin(frame * 0.2 + pair) * 3;
        const ey = cy - 28 + baseOffset + wiggle;
        ctx.beginPath();
        ctx.fillStyle = "#facc15";
        ctx.shadowColor = "#fde68a";
        ctx.shadowBlur = 10;
        ctx.arc(ex, ey, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

        // nobel-gas / no-bond case: only red cross, no line
    const noBond = infoText.toLowerCase().includes("no stable compound");

    const x1 = leftX + 35;
    const x2 = rightX - 35;
    const xMid = (x1 + x2) / 2;

    // NORMAL BOND (solid line only)
    if (t > 0.5 && !noBond) {
      const bondPhase = Math.min(1, (t - 0.5) / 0.4);
      const drawTo = x1 + (x2 - x1) * bondPhase;

      // solid line, no dash
      ctx.setLineDash([]);             // <- force remove dash
      ctx.strokeStyle = isIonic ? "#f97316" : "#38bdf8";
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(x1, cy);
      ctx.lineTo(drawTo, cy);
      ctx.stroke();

      if (!isIonic && isDouble) {
        ctx.beginPath();
        ctx.moveTo(x1, cy + 8);
        ctx.lineTo(drawTo, cy + 8);
        ctx.stroke();
      }
    }

    // NO-BOND CASE (e.g. noble gases) → red cross at center
    if (t > 0.5 && noBond) {
      ctx.setLineDash([]);             // <- just in case
      const size = 14;
      ctx.strokeStyle = "#f97373";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(xMid - size, cy - size);
      ctx.lineTo(xMid + size, cy + size);
      ctx.moveTo(xMid - size, cy + size);
      ctx.lineTo(xMid + size, cy - size);
      ctx.stroke();
    }


    // special: show red cross for no-bond cases (e.g., noble gases)
    if (t > 0.5 && noBond) {
      const size = 14; // cross half-length
      ctx.strokeStyle = "#f97373";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(xMid - size, cy - size);
      ctx.lineTo(xMid + size, cy + size);
      ctx.moveTo(xMid - size, cy + size);
      ctx.lineTo(xMid + size, cy - size);
      ctx.stroke();
    }


    // special: show red cross for no-bond cases (e.g., noble gases)
    if (t > 0.5 && noBond) {
      const size = 14; // cross half-length
      ctx.strokeStyle = "#f97373";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(xMid - size, cy - size);
      ctx.lineTo(xMid + size, cy + size);
      ctx.moveTo(xMid - size, cy + size);
      ctx.lineTo(xMid + size, cy - size);
      ctx.stroke();
    }





    if (t > 0.8) {
      const ldPhase = Math.min(1, (t - 0.8) / 0.2);

      let leftShift = 0;
      let rightShift = 0;

      if (isIonic) {
        const delta = Math.round(2 * ldPhase);
        if (highENRight) {
          leftShift = -delta;
          rightShift = +delta;
        } else {
          leftShift = +delta;
          rightShift = -delta;
        }
      } else if (enDiff > 0.3) {
        const delta = ldPhase >= 1 ? 1 : 0;
        if (highENRight) rightShift = delta;
        else leftShift = delta;
      }

      drawLewisDots(leftX, cy, valLeft0, leftShift);
      drawLewisDots(rightX, cy, valRight0, rightShift);
    }

    if (frame < totalFrames) {
      reactionAnimId = requestAnimationFrame(() => frameFn(frame + 1));
    } else {
      drawStaticReaction(sym1, sym2, infoText);
    }
  }

  frameFn(0);
}

reactionBackdrop.addEventListener("click", (e) => {
  if (e.target === reactionBackdrop) reactionBackdrop.classList.add("hidden");
});
reactionClose.addEventListener("click", () => {
  reactionBackdrop.classList.add("hidden");
});

// ===== NEW CHEMICAL BONDING MODAL (ADVANCED) =====
const bondingBtn = document.getElementById("bonding-btn");
const bondingModal = document.getElementById("bonding-modal");
const bondingClose = document.getElementById("bonding-close");
const lessonsDiv = document.getElementById("bonding-lessons");
const bondingCanvas = document.getElementById("bonding-canvas");
const bondingCtx = bondingCanvas ? bondingCanvas.getContext("2d") : null;
const bondingInfo = document.getElementById("bonding-info");

// ===== COPY YOUR EXISTING app.js COMPLETELY TILL bondingLessons array =====
// ... (sab kuch same rahega - voice, reactions, CH4, NH3, H2O etc.)

// ===== HYBRIDISATION LESSONS ADD HERE (bondingLessons array ke END mein) =====
const bondingLessons = [
  {
    id: "intro",
    title: "Octet Rule & Types",
    desc: "Ionic, covalent, coordinate, metallic",
    info: "Atoms try to get 8 valence electrons (duplet for H, He). Ionic: transfer. Covalent: sharing. Coordinate: lone pair donation. Metallic: electron sea.",
  },
  {
    id: "h2",
    title: "H₂ – Simple Covalent",
    desc: "H–H (single bond)",
    info: "Two H atoms share one pair of electrons to form a single covalent bond.",
  },
  {
    id: "hcl",
    title: "HCl – Polar Covalent",
    desc: "H–Cl (polar)",
    info: "H and Cl share a pair; Cl is more electronegative so bond is polar.",
  },
  {
    id: "h2o",
    title: "H₂O – Bent",
    desc: "2 bond pairs, 2 lone pairs",
    info: "O forms two sigma bonds with H and keeps two lone pairs; bent shape (~104.5°).",
  },
  {
    id: "nh3",
    title: "NH₃ – Trigonal pyramidal",
    desc: "3 bond pairs, 1 lone pair",
    info: "N makes three bonds with H and has one lone pair.",
  },
  {
    id: "ch4",
    title: "CH₄ – sp³ Tetrahedral",
    desc: "4 bond pairs",
    info: "C forms four equivalent sp³ bonds with H; tetrahedral, 109.5°.",
  },
  {
    id: "co2",
    title: "CO₂ – Linear",
    desc: "O=C=O",
    info: "C forms two double bonds with O; linear, 180°.",
  },
  {
    id: "ionic",
    title: "NaCl – Ionic",
    desc: "Na⁺ + Cl⁻ lattice",
    info: "Na loses 1e⁻, Cl gains 1e⁻ to form ions; strong lattice.",
  },
  {
    id: "coord",
    title: "NH₄⁺ – Coordinate",
    desc: "NH₃ + H⁺ → NH₄⁺",
    info: "Lone pair on N donated to H⁺ to form coordinate bond.",
  },
  {
    id: "metallic",
    title: "Cu – Metallic",
    desc: "Delocalised electrons",
    info: "Positive Cu ions in a sea of electrons.",
  },

  // ===== NEW HYBRIDISATION LESSONS =====
  {
    id: "sp",
    title: "sp Hybridisation",
    desc: "Linear 180° (BeCl₂)",
    info: "1s + 1p → 2 sp orbitals. Linear geometry, bond angle 180°."
  },
  {
    id: "sp2",
    title: "sp² Hybridisation",
    desc: "Trigonal 120° (BF₃)",
    info: "1s + 2p → 3 sp² orbitals. Planar triangle, bond angle 120°."
  },
  {
    id: "sp3",
    title: "sp³ Hybridisation",
    desc: "Tetrahedral 109.5° (CH₄)",
    info: "1s + 3p → 4 sp³ orbitals. Perfect tetrahedron for CH₄."
  },
  {
    id: "dsp2",
    title: "dsp² Hybridisation",
    desc: "Square planar (Ni(CN)₄²⁻)",
    info: "1d + 1s + 2p → 4 dsp² orbitals. Square planar complex."
  },
  {
    id: "sp3d",
    title: "sp³d Hybridisation",
    desc: "Trigonal bipyramidal (PCl₅)",
    info: "1s + 3p + 1d → 5 sp³d orbitals. 3 equatorial + 2 axial."
  },
  {
    id: "d2sp3",
    title: "d²sp³ Hybridisation",
    desc: "Octahedral (SF₆)",
    info: "2d + 1s + 3p → 6 d²sp³ orbitals. Perfect octahedron."
  }
];

// ===== UPDATE drawLessonFrame FUNCTION (add this case) =====
function drawHybridOrbitals(ctx, cx, cy, type, frame) {
  const t = frame * 0.015;
  const pulse = 1 + 0.1 * Math.sin(t);

  if (type === "sp") {
    // BeCl2: linear
    const beX = cx;
    const beY = cy;
    const clLeftX  = cx - 140;
    const clRightX = cx + 140;

    bAtom(ctx, beX, beY, "Be", "#fbbf24", 22 * pulse);
    bAtom(ctx, clLeftX,  beY, "Cl", "#22c55e", 26 * pulse);
    bAtom(ctx, clRightX, beY, "Cl", "#22c55e", 26 * pulse);

    // bond lines
    bBondLine(ctx, beX - 22, beY, clLeftX  + 26, beY, 1);
    bBondLine(ctx, beX + 22, beY, clRightX - 26, beY, 1);

  } else if (type === "sp2") {
    // BF3: trigonal planar
    const bX = cx;
    const bY = cy - 10;
    bAtom(ctx, bX, bY, "B", "#f97316", 24 * pulse);

    const r = 90;
    for (let i = 0; i < 3; i++) {
      const ang = (i * 2 * Math.PI) / 3;
      const fx = bX + r * Math.cos(ang);
      const fy = bY + r * Math.sin(ang);
      bAtom(ctx, fx, fy, "F", "#60a5fa", 24 * pulse);
      bBondLine(ctx, bX, bY, fx, fy, 1);
    }

  } else if (type === "sp3") {
    // CH4: tetrahedral projection
    const cX = cx;
    const cY = cy;
    bAtom(ctx, cX, cY, "C", "#f97316", 28 * pulse);

    const positions = [
      { x: cX, y: cY - 85 },
      { x: cX + 70, y: cY + 35 },
      { x: cX - 70, y: cY + 35 },
      { x: cX, y: cY + 95 },
    ];
    positions.forEach((p) => {
      bAtom(ctx, p.x, p.y, "H", "#fbbf24", 20 * pulse);
      bBondLine(ctx, cX, cY, p.x, p.y, 1);
    });

  } else if (type === "dsp2") {
    // Ni(CN)4^2-: square planar
    const niX = cx;
    const niY = cy;
    const d = 80;
    bAtom(ctx, niX, niY, "Ni", "#facc15", 28 * pulse);

    const ligands = [
      { x: niX - d, y: niY - d },
      { x: niX + d, y: niY - d },
      { x: niX - d, y: niY + d },
      { x: niX + d, y: niY + d },
    ];
    ligands.forEach((p) => {
      bAtom(ctx, p.x, p.y, "CN", "#22c55e", 22 * pulse);
      bBondLine(ctx, niX, niY, p.x, p.y, 1);
    });

  } else if (type === "sp3d") {
    // PCl5: trigonal bipyramidal
    const pX = cx;
    const pY = cy;
    bAtom(ctx, pX, pY, "P", "#fbbf24", 26 * pulse);

    // axial
    const topY = pY - 100;
    const bottomY = pY + 100;
    bAtom(ctx, pX, topY, "Cl", "#22c55e", 22 * pulse);
    bAtom(ctx, pX, bottomY, "Cl", "#22c55e", 22 * pulse);
    bBondLine(ctx, pX, pY, pX, topY, 1);
    bBondLine(ctx, pX, pY, pX, bottomY, 1);

    // equatorial
    const rEq = 85;
    for (let i = 0; i < 3; i++) {
      const ang = (i * 2 * Math.PI) / 3;
      const ex = pX + rEq * Math.cos(ang);
      const ey = pY + 25 * Math.sin(ang);
      bAtom(ctx, ex, ey, "Cl", "#22c55e", 22 * pulse);
      bBondLine(ctx, pX, pY, ex, ey, 1);
    }

  } else if (type === "d2sp3") {
    // SF6: octahedral
    const sX = cx;
    const sY = cy;
    bAtom(ctx, sX, sY, "S", "#fbbf24", 28 * pulse);

    const r1 = 95;
    const r2 = 95;
    const pts = [
      { x: sX, y: sY - r1 },
      { x: sX, y: sY + r1 },
      { x: sX - r2, y: sY },
      { x: sX + r2, y: sY },
      { x: sX - r2 * 0.7, y: sY - r2 * 0.7 },
      { x: sX + r2 * 0.7, y: sY + r2 * 0.7 },
    ];
    pts.forEach((p) => {
      bAtom(ctx, p.x, p.y, "F", "#60a5fa", 22 * pulse);
      bBondLine(ctx, sX, sY, p.x, p.y, 1);
    });
  }
}



// ===== BAQI SAB SAME RAHEGA =====
// Voice search, reactions, atom modal - NOTHING CHANGES!


let bondingAnimId = null;

function showBondingModal() {
  bondingModal.classList.remove("hidden");
  lessonsDiv.innerHTML = bondingLessons
    .map(
      (lesson) =>
        `<button class="lesson-btn" data-lesson="${lesson.id}">
           ${lesson.title}<br/><small>${lesson.desc}</small>
         </button>`
    )
    .join("");

  document.querySelectorAll(".lesson-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget;
      const lessonId = target.dataset.lesson;
      document
        .querySelectorAll(".lesson-btn")
        .forEach((b) => b.classList.remove("active"));
      target.classList.add("active");
      showBondingDemo(lessonId);
    });
  });

  resizeBondingCanvas();
  const first = document.querySelector('.lesson-btn[data-lesson="intro"]');
  if (first) first.classList.add("active");
  showBondingDemo("intro");
}

function resizeBondingCanvas() {
  if (!bondingCanvas || !bondingCtx) return;
  bondingCanvas.width = bondingCanvas.offsetWidth;
  bondingCanvas.height = bondingCanvas.offsetHeight;
}

function showBondingDemo(lessonId) {
  const lesson = bondingLessons.find((l) => l.id === lessonId);
  if (!lesson || !bondingCtx) return;

  if (bondingInfo) bondingInfo.textContent = lesson.info;
  speak(`${lesson.title}: ${lesson.desc}. ${lesson.info}`);

  if (bondingAnimId) cancelAnimationFrame(bondingAnimId);
  bondingAnimId = requestAnimationFrame((f) => drawLessonFrame(lessonId, f));
}

function bondingBackground(ctx, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) / 2);
  grad.addColorStop(0, "#020617");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function bAtom(ctx, x, y, label, color = "#facc15", r = 28) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.shadowColor = "#fef3c7";
  ctx.shadowBlur = 18;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 20px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
}

function bElectronPair(ctx, x, y, angleRad, distance) {
  const dx = Math.cos(angleRad) * distance;
  const dy = Math.sin(angleRad) * distance;
  const r = 3;
  ctx.fillStyle = "#e5e7eb";
  ctx.beginPath();
  ctx.arc(x + dx - 4, y + dy, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + dx + 4, y + dy, r, 0, 2 * Math.PI);
  ctx.fill();
}

function bBondLine(ctx, x1, y1, x2, y2, count = 1, color = "#e5e7eb") {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  const offset = 4;   // yahi spacing double lines ke beech
  for (let i = 0; i < count; i++) {
    const t = (i - (count - 1) / 2) * offset;
    ctx.beginPath();
    ctx.moveTo(x1, y1 + t);
    ctx.lineTo(x2, y2 + t);
    ctx.stroke();
  }
}



function drawLessonFrame(lessonId, frame) {
  const ctx = bondingCtx;
  const w = bondingCanvas.width;
  const h = bondingCanvas.height;
  const cx = w / 2;
  const cy = h / 2;

  ctx.clearRect(0, 0, w, h);
  bondingBackground(ctx, w, h);

  const t = frame * 0.02;
  const pulse = 1 + 0.05 * Math.sin(t);

  // ===== BASIC LESSONS =====
  if (lessonId === "intro") {
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "18px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Octet rule → 8 valence electrons (H/He duplet).", cx, cy - 40);
    ctx.fillText(
      "Ionic: transfer | Covalent: sharing | Metallic: electron sea",
      cx,
      cy
    );
    ctx.fillText("Coordinate: lone pair donation (NH₄⁺).", cx, cy + 40);
  }

  if (lessonId === "h2") {
    const leftX = cx - 80;
    const rightX = cx + 80;
    bAtom(ctx, leftX, cy, "H", "#fbbf24", 24 * pulse);
    bAtom(ctx, rightX, cy, "H", "#fbbf24", 24 * pulse);
    bBondLine(ctx, leftX + 24, cy, rightX - 24, cy, 1);
    bElectronPair(ctx, leftX, cy, Math.PI / 2, 40);
    bElectronPair(ctx, rightX, cy, -Math.PI / 2, 40);
  }

  if (lessonId === "hcl") {
    const leftX = cx - 80;
    const rightX = cx + 80;
    bAtom(ctx, leftX, cy, "H", "#fbbf24", 24 * pulse);
    bAtom(ctx, rightX, cy, "Cl", "#22c55e", 30 * pulse);
    bBondLine(ctx, leftX + 24, cy, rightX - 30, cy, 1, "#f97316");
    bElectronPair(ctx, rightX, cy, Math.PI / 2, 40);
    bElectronPair(ctx, rightX, cy, (3 * Math.PI) / 4, 40);
    bElectronPair(ctx, rightX, cy, Math.PI / 4, 40);
  }

  if (lessonId === "hcl") {
  const leftX = cx - 80;
  const rightX = cx + 80;

  // time-based shift for polarity animation
  const shift = 6 * Math.sin(t);   // t = frame * 0.02 upar defined hai

  // H thoda left-right oscillate
  const hX = leftX + shift;
  const hY = cy;

  // Cl almost fixed
  const clX = rightX;
  const clY = cy;

  // atoms
  bAtom(ctx, hX,  hY,  "H",  "#fbbf24", 24 * pulse);
  bAtom(ctx, clX, clY, "Cl", "#22c55e", 30 * pulse);

  // covalent bond line – orange, thoda thick
  bBondLine(ctx, hX + 24, hY, clX - 30, clY, 1, "#f97316");

  // Cl par 3 lone pairs
  bElectronPair(ctx, clX, clY, Math.PI / 2,        40);
  bElectronPair(ctx, clX, clY, (3 * Math.PI) / 4,  40);
  bElectronPair(ctx, clX, clY, Math.PI / 4,        40);

  // polarity arrow H → Cl (δ+ → δ−)
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.lineDashOffset = -frame * 2;
  ctx.beginPath();
  ctx.moveTo(hX + 10, hY - 28);
  ctx.lineTo(clX - 10, clY - 28);
  ctx.stroke();
  ctx.setLineDash([]);

  // delta symbols
  ctx.fillStyle = "#fbbf24";
  ctx.font = "14px system-ui";
  ctx.fillText("δ⁺", hX - 10, hY - 32);
  ctx.fillText("δ⁻", clX + 14, clY - 32);
}


  if (lessonId === "nh3") {
    const nX = cx;
    const nY = cy - 10;
    const r = 95;
    const angleStep = (2 * Math.PI) / 3;
    bAtom(ctx, nX, nY, "N", "#22c55e", 30 * pulse);
    for (let i = 0; i < 3; i++) {
      const a = Math.PI / 2 + i * angleStep;
      const hx = nX + r * Math.cos(a);
      const hy = nY + r * Math.sin(a);
      bAtom(ctx, hx, hy, "H", "#fbbf24", 22 * pulse);
      bBondLine(
        ctx,
        nX + 20 * Math.cos(a),
        nY + 20 * Math.sin(a),
        hx - 20 * Math.cos(a),
        hy - 20 * Math.sin(a),
        1
      );
    }
    bElectronPair(ctx, nX, nY, -Math.PI / 2, 40);
  }

  if (lessonId === "ch4") {
    const cX = cx;
    const cY = cy;
    bAtom(ctx, cX, cY, "C", "#f97316", 30 * pulse);
    const positions = [
      { x: cX, y: cY - 90 },
      { x: cX + 80, y: cY + 40 },
      { x: cX - 80, y: cY + 40 },
      { x: cX, y: cY + 100 },
    ];
    positions.forEach((p) => {
      bAtom(ctx, p.x, p.y, "H", "#fbbf24", 22 * pulse);
      bBondLine(ctx, cX, cY, p.x, p.y, 1);
    });
  }

  if (lessonId === "co2") {
  const leftX = cx - 120;
  const rightX = cx + 120;
  const cX = cx;
  const cY = cy;

  // atoms
  bAtom(ctx, leftX,  cY, "O", "#60a5fa", 28 * pulse);
  bAtom(ctx, cX,     cY, "C", "#f97316", 30 * pulse);
  bAtom(ctx, rightX, cY, "O", "#60a5fa", 28 * pulse);

  // clean double bonds: 2 parallel lines each side
  const gapO = 32;   // kitna andar se start
  const gapC = 26;

  // LEFT O = C
  bBondLine(ctx, leftX  + gapO, cY, cX - gapC, cY, 2);

  // RIGHT C = O
  bBondLine(ctx, cX + gapC, cY, rightX - gapO, cY, 2);
}



  if (lessonId === "ionic") {
    const leftX = cx - 90;
    const rightX = cx + 90;
    bAtom(ctx, leftX, cy, "Na", "#22c55e", 28 * pulse);
    bAtom(ctx, rightX, cy, "Cl", "#60a5fa", 30 * pulse);
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.lineDashOffset = -frame * 3;
    ctx.beginPath();
    ctx.moveTo(leftX + 35, cy - 20);
    ctx.lineTo(rightX - 35, cy - 20);
    ctx.stroke();
    ctx.setLineDash([]);
    bElectronPair(ctx, rightX, cy + 10, Math.PI / 2, 38);
    bElectronPair(ctx, rightX, cy + 10, (3 * Math.PI) / 4, 38);
    bElectronPair(ctx, rightX, cy + 10, Math.PI / 4, 38);
  }

  if (lessonId === "coord") {
  const nX = cx - 40;
  const nY = cy;

  // NH3 core (N + 3 H)
  bAtom(ctx, nX, nY, "N", "#22c55e", 30 * pulse);
  const r = 75;
  const angleStep = (2 * Math.PI) / 3;
  for (let i = 0; i < 3; i++) {
    const a = Math.PI / 2 + i * angleStep;
    const hx = nX + r * Math.cos(a);
    const hy = nY + r * Math.sin(a);
    bAtom(ctx, hx, hy, "H", "#fbbf24", 20 * pulse);
    bBondLine(ctx, nX, nY, hx, hy, 1);
  }

  // incoming H+ (NH4+ formation animation)
  const hStartX = cx + 130;
  const hEndX   = cx + 20;
  const hY      = cy;

  const tNorm = Math.min(1, frame * 0.02);   // 0 → 1 smooth
  const hX    = hStartX + (hEndX - hStartX) * tNorm;

  bAtom(ctx, hX, hY, "H⁺", "#fbbf24", 22 * pulse);

  // lone pair on N donating
  bElectronPair(ctx, nX, nY, 0, 40);

  // dotted coordinate bond arrow N → H+
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 6]);
  ctx.lineDashOffset = -frame * 3;
  ctx.beginPath();
  ctx.moveTo(nX + 45, nY);
  ctx.lineTo(hX - 25, hY);
  ctx.stroke();
  ctx.setLineDash([]);
}


  if (lessonId === "metallic") {
    const rows = 3;
    const cols = 7;
    const startX = cx - 180;
    const startY = cy - 70;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = startX + j * 60;
        const y = startY + i * 60;
        bAtom(ctx, x, y, "Cu⁺", "#f97316", 20);
      }
    }
    for (let k = 0; k < 30; k++) {
      const ex = cx - 200 + ((k * 40 + frame * 4) % 400);
      const ey = cy - 80 + (k % 6) * 25;
      ctx.beginPath();
      ctx.fillStyle = "#38bdf8";
      ctx.arc(ex, ey, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // ===== HYBRIDISATION CASES =====
  const hybridTypes = ["sp", "sp2", "sp3", "dsp2", "sp3d", "d2sp3"];
  if (hybridTypes.includes(lessonId)) {
    const cx2 = cx;
    const cy2 = cy + 10;
    drawHybridOrbitals(ctx, cx2, cy2, lessonId, frame);

    ctx.fillStyle = "#facc15";
    ctx.font = "bold 18px system-ui";
    ctx.textAlign = "center";
    if (lessonId === "sp") ctx.fillText("180°", cx2, cy2 + 130);
    else if (lessonId === "sp2") ctx.fillText("120°", cx2, cy2 + 130);
    else if (lessonId === "sp3") ctx.fillText("109.5°", cx2, cy2 + 130);
    else if (lessonId === "dsp2") ctx.fillText("90° (square planar)", cx2, cy2 + 130);
    else if (lessonId === "sp3d") ctx.fillText("90° / 120°", cx2, cy2 + 130);
    else if (lessonId === "d2sp3") ctx.fillText("90° (octahedral)", cx2, cy2 + 130);
  }

  bondingAnimId = requestAnimationFrame((f) => drawLessonFrame(lessonId, f + 1));
}


if (bondingBtn) bondingBtn.addEventListener("click", showBondingModal);

if (bondingClose)
  bondingClose.addEventListener("click", () => {
    bondingModal.classList.add("hidden");
    if (bondingAnimId) cancelAnimationFrame(bondingAnimId);
  });

if (bondingModal)
  bondingModal.addEventListener("click", (e) => {
    if (e.target === bondingModal) {
      bondingModal.classList.add("hidden");
      if (bondingAnimId) cancelAnimationFrame(bondingAnimId);
    }
  });

window.addEventListener("resize", resizeBondingCanvas);

// ===== VOICE SEARCH =====
const voiceBtn = document.getElementById("voice-search-btn");
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (Recognition) {
  recognition = new Recognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener('result', e => {
  const transcript = e.results[0][0].transcript.trim().toLowerCase();
  
  // NEW: Reaction query detection
  if (transcript.includes('reaction') || transcript.includes('plus') || transcript.includes('+')) {
    speak('Drag elements to reaction circles to see chemical reactions!');
    return;
  }
  
  const found = elements.find(el => 
    el.name.toLowerCase().includes(transcript) || 
    el.sym.toLowerCase() === transcript
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
      // ignore double start
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
        headers: { "Content-Type": "application/json" },
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


