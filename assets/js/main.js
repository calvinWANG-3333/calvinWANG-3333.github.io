(function () {
  "use strict";
  const S = window.SITE;

  const UI = {
    en: {
      nav: { collection: "Collection", house: "The House", parcours: "Experience", contact: "Contact" },
      menu: "Menu", close: "Close", skip: "Skip to content",
      discover: "Discover the collection",
      collection: "Collection",
      count: (n, m) => `${n} works, ${m} to come`,
      coming: "Coming",
      room: (i, n) => `${String(i).padStart(2, "0")} / ${String(n).padStart(2, "0")}`,
      prev: "Previous", next: "Next",
      house: "The House", carnet: "Notebook",
      parcours: "Experience", education: "Education", skills: "Skills",
      contact: "Contact", email: "Email", cv: "CV",
      foot: "Independent portfolio. Project data is synthetic; not affiliated with any brand named here.",
      lang: "Language",
    },
    fr: {
      nav: { collection: "Collection", house: "La Maison", parcours: "Parcours", contact: "Contact" },
      menu: "Menu", close: "Fermer", skip: "Aller au contenu",
      discover: "Découvrir la collection",
      collection: "Collection",
      count: (n, m) => `${n} œuvres, ${m} à venir`,
      coming: "À venir",
      room: (i, n) => `${String(i).padStart(2, "0")} / ${String(n).padStart(2, "0")}`,
      prev: "Précédente", next: "Suivante",
      house: "La Maison", carnet: "Carnet",
      parcours: "Parcours", education: "Formation", skills: "Compétences",
      contact: "Contact", email: "E-mail", cv: "CV",
      foot: "Portfolio indépendant. Les données des projets sont synthétiques ; aucun lien avec les marques citées.",
      lang: "Langue",
    },
  };

  let lang = "en";
  try {
    const q = new URLSearchParams(location.search).get("lang");
    lang = q || localStorage.getItem("lang") || (navigator.language || "").slice(0, 2);
  } catch (e) { /* storage unavailable */ }
  if (lang !== "fr") lang = "en";

  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.en) : v);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = (url) => `href="${esc(url)}" target="_blank" rel="noopener"`;
  const $ = (sel) => document.querySelector(sel);

  /* ── Header ─────────────────────────────────────────────── */
  function header(u) {
    const links = ["collection", "house", "parcours", "contact"]
      .map((k) => `<a href="#${k}">${esc(u.nav[k])}</a>`);
    const langs = ["en", "fr"].map((l) =>
      `<button type="button" data-lang="${l}" aria-pressed="${lang === l}">${l.toUpperCase()}</button>`).join("");
    return `
      <nav class="h-left" aria-label="Main">${links.slice(0, 3).join("")}</nav>
      <button type="button" class="h-menu" aria-expanded="false" aria-controls="menu">${esc(u.menu)}</button>
      <a class="lockup" href="#top" aria-label="${esc(S.person.name)}, Paris">
        <span class="lk-name">RUIHANG WANG</span><span class="lk-city">PARIS</span>
      </a>
      <div class="h-right">
        <div class="langs" role="group" aria-label="${esc(u.lang)}">${langs}</div>
        ${links[3]}
      </div>
      <div class="menu" id="menu" hidden>
        <nav aria-label="Main">${links.join("")}</nav>
        <div class="langs" role="group" aria-label="${esc(u.lang)}">${langs}</div>
      </div>`;
  }

  /* ── Hero ───────────────────────────────────────────────── */
  function hero(u) {
    return `
      <div class="hero-img" role="img" aria-label="Paris"></div>
      <div class="hero-foot">
        <p>${esc(t(S.roles))}</p>
        <a class="u" href="#collection">${esc(u.discover)}</a>
      </div>`;
  }

  /* ── Collection index ───────────────────────────────────── */
  function collection(u) {
    const rows = S.projects.map((p) => {
      const thumb = p.work.prints ? p.work.prints[0].src : "";
      return `<li><a href="#work-${esc(p.id)}" data-thumb="${esc(thumb)}" data-text="${p.work.text ? esc(t(p.work.text).join(" ")) : ""}">
        <span class="ix-title">${esc(p.title)}</span><span class="ix-stack">${esc(p.stack.split(",").slice(0, 3).join(","))}</span><span class="ix-year">${esc(p.year)}</span>
      </a></li>`;
    }).join("");
    const soon = S.upcoming.map((x) => `<li class="soon"><span class="ix-title">${esc(t(x))}</span><span class="ix-stack">${esc(u.coming)}</span><span class="ix-year"></span></li>`).join("");
    return `
      <div class="bar"><h2>${esc(u.collection)}</h2><p>${esc(u.count(S.projects.length, S.upcoming.length))}</p></div>
      <ul class="index">${rows}${soon}</ul>
      <div class="ix-float" aria-hidden="true"></div>`;
  }

  /* ── Rooms: one work per screen ─────────────────────────── */
  function rooms(u) {
    const n = S.projects.length;
    return S.projects.map((p, i) => {
      const w = p.work;
      const wall = w.prints
        ? `<div class="prints prints-${w.prints.length}">${w.prints.map((pr) =>
            `<img src="${esc(pr.src)}" alt="${esc(t(pr.alt))}" width="${pr.w}" height="${pr.h}" loading="lazy">`).join("")}</div>`
        : `<p class="text-work">${t(w.text).map(esc).join("<br>")}</p>`;
      const prev = i > 0 ? `<a href="#work-${esc(S.projects[i - 1].id)}">${esc(u.prev)}</a>` : `<span></span>`;
      const next = i < n - 1 ? `<a href="#work-${esc(S.projects[i + 1].id)}">${esc(u.next)}</a>` : `<span></span>`;
      return `
      <article class="room" id="work-${esc(p.id)}">
        <div class="wall">${wall}</div>
        <div class="panel">
          <p class="room-no">${esc(u.room(i + 1, n))}</p>
          <div class="panel-body">
            <h3>${esc(p.title)}</h3>
            <p class="year">${esc(p.year)}</p>
            <p class="summary">${esc(t(p.summary))}</p>
            <dl class="numbers">${p.numbers.map((x) => `<div><dt>${esc(t(x.l))}</dt><dd>${esc(x.n)}</dd></div>`).join("")}</dl>
            <p class="stack">${esc(p.stack)}</p>
            <p class="links">${p.links.map((l) => `<a class="u" ${ext(l.url)}>${esc(t(l.label))}</a>`).join("")}</p>
          </div>
          <p class="room-nav">${prev}${next}</p>
        </div>
      </article>`;
    }).join("");
  }

  /* ── The House ──────────────────────────────────────────── */
  function house(u) {
    const h = S.house;
    return `
      <figure class="portrait"><img src="assets/img/portrait.jpg" alt="${esc(S.person.name)}" width="1000" height="1000" loading="lazy"></figure>
      <div class="house-text">
        <h2 class="kicker">${esc(u.house)}</h2>
        <p class="statement">${esc(t(h.statement))}</p>
        ${t(h.body).map((p) => `<p class="body">${esc(p)}</p>`).join("")}
        <dl class="facts">${h.facts.map((f) => `<div><dt>${esc(t(f.k))}</dt><dd>${esc(t(f.v))}</dd></div>`).join("")}</dl>
        <h3 class="kicker carnet-h">${esc(u.carnet)}</h3>
        <dl class="carnet">${h.carnet.map((f) => `<div><dt>${esc(t(f.k))}</dt><dd>${esc(t(f.v))}</dd></div>`).join("")}</dl>
      </div>`;
  }

  /* ── Experience ─────────────────────────────────────────── */
  function parcours(u) {
    return `
      <div class="bar"><h2>${esc(u.parcours)}</h2></div>
      <ol class="xp">${S.experience.map((e) => `
        <li><span class="xp-when">${esc(t(e.when))}</span>
          <div><h3>${esc(t(e.role))}</h3><p class="xp-org">${esc(e.org)}</p><p class="xp-note">${esc(t(e.note))}</p></div></li>`).join("")}
      </ol>
      <div class="cols">
        <div><h3 class="sub">${esc(u.education)}</h3>
          <ol class="xp xp-s">${S.education.map((e) => `
            <li><span class="xp-when">${esc(e.when)}</span><div><h3>${esc(t(e.degree))}</h3><p class="xp-org">${esc(e.school)}</p></div></li>`).join("")}
          </ol></div>
        <div><h3 class="sub">${esc(u.skills)}</h3>
          <dl class="skills">${S.skills.map((s) => `<div><dt>${esc(t(s.k))}</dt><dd>${esc(t(s.v))}</dd></div>`).join("")}</dl></div>
      </div>`;
  }

  /* ── Contact, on the dark wall of the window ────────────── */
  function contact(u) {
    const p = S.person;
    const rows = [
      `<a ${ext(p.linkedin)}>LinkedIn</a>`,
      `<a ${ext(p.github)}>GitHub</a>`,
      `<a href="mailto:${esc(p.email)}">${esc(u.email)}</a>`,
    ];
    if (p.cv) rows.push(`<a href="${esc(p.cv)}" download>${esc(u.cv)}</a>`);
    return `
      <div class="window" role="img" aria-label="Paris"></div>
      <div class="contact-box">
        <h2 class="kicker">${esc(u.contact)}</h2>
        <ul>${rows.map((r) => `<li>${r}</li>`).join("")}</ul>
        <p class="mail">${esc(p.email)}</p>
      </div>`;
  }

  function render() {
    const u = UI[lang];
    document.documentElement.lang = lang;
    $(".skip").textContent = u.skip;
    $("#header").innerHTML = header(u);
    $("#top").innerHTML = hero(u);
    $("#collection").innerHTML = collection(u);
    $("#rooms").innerHTML = rooms(u);
    $("#house").innerHTML = house(u);
    $("#parcours").innerHTML = parcours(u);
    $("#contact").innerHTML = contact(u);
    $("#foot").innerHTML = `<p>© ${new Date().getFullYear()} ${esc(S.person.name)}</p><p>${esc(u.foot)}</p>`;
    wireIndex();
    onScroll();
  }

  /* Index: a print follows the cursor over each row (pointer devices only) */
  function wireIndex() {
    const float = $(".ix-float");
    if (!float || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const list = $(".index");
    list.addEventListener("pointermove", (e) => {
      const a = e.target.closest("a[data-thumb]");
      if (!a) { float.classList.remove("on"); return; }
      if (float.dataset.for !== a.getAttribute("href")) {
        float.dataset.for = a.getAttribute("href");
        float.innerHTML = a.dataset.thumb
          ? `<img src="${a.dataset.thumb}" alt="">`
          : `<p>${a.dataset.text}</p>`;
      }
      const r = list.parentElement.getBoundingClientRect(), lr = list.getBoundingClientRect();
      const x = lr.right - r.left - 428 - float.offsetWidth - 32;
      float.style.transform = `translate(${x}px, ${e.clientY - r.top - float.offsetHeight / 2}px)`;
      float.classList.add("on");
    });
    list.addEventListener("pointerleave", () => float.classList.remove("on"));
  }

  /* Header: transparent over the photograph, a white band after it */
  function onScroll() {
    const h = $("#header"), hero = $("#top");
    if (!h || !hero) return;
    h.classList.toggle("compact", scrollY > 24);
    h.classList.toggle("solid", scrollY > hero.offsetHeight - h.offsetHeight);
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  document.addEventListener("click", (e) => {
    const l = e.target.closest("[data-lang]");
    if (l) {
      lang = l.dataset.lang;
      try { localStorage.setItem("lang", lang); } catch (err) { /* ignore */ }
      render();
      const again = document.querySelector(`.h-right [data-lang="${lang}"]`);
      if (again && again.offsetParent) again.focus();
      return;
    }
    const m = e.target.closest(".h-menu");
    if (m) { toggleMenu(m.getAttribute("aria-expanded") !== "true"); return; }
    if (e.target.closest(".menu a")) toggleMenu(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  function toggleMenu(open) {
    const b = $(".h-menu"), menu = $("#menu");
    if (!b || !menu) return;
    b.setAttribute("aria-expanded", String(open));
    b.textContent = open ? UI[lang].close : UI[lang].menu;
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }

  render();
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("ready")));
})();
