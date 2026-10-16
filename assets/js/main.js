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
      house: "The House", practice: "Practice", offDuty: "Off duty",
      parcours: "Experience", education: "Education", skills: "Tools",
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
      house: "La Maison", practice: "Savoir-faire", offDuty: "Hors du bureau",
      parcours: "Parcours", education: "Formation", skills: "Outils",
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

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) document.documentElement.classList.add("fx");

  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.en) : v);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = (url) => `href="${esc(url)}" target="_blank" rel="noopener"`;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = (x) => 1 - Math.pow(1 - x, 3);

  /* ── Templates ──────────────────────────────────────────── */
  function header(u) {
    const links = ["collection", "house", "parcours", "contact"].map((k) => `<a href="#${k}">${esc(u.nav[k])}</a>`);
    const langs = ["en", "fr"].map((l) =>
      `<button type="button" data-lang="${l}" aria-pressed="${lang === l}">${l.toUpperCase()}</button>`).join("");
    return `
      <nav class="h-left" aria-label="Main">${links.slice(0, 3).join("")}</nav>
      <button type="button" class="h-menu" aria-expanded="false" aria-controls="menu">${esc(u.menu)}</button>
      <div class="h-right"><div class="langs" role="group" aria-label="${esc(u.lang)}">${langs}</div>${links[3]}</div>
      <a class="lockup" href="#top" aria-label="${esc(S.person.name)}, Paris"><span class="lk-name">RUIHANG WANG</span><span class="lk-city">PARIS</span></a>
      <div class="menu" id="menu" hidden>
        <nav aria-label="Main">${links.join("")}</nav>
        <div class="langs" role="group" aria-label="${esc(u.lang)}">${langs}</div>
      </div>`;
  }

  function hero(u) {
    return `
      <div class="frame-img" style="background-image:url(assets/img/iena.jpg)" role="img" aria-label="Paris"></div>
      <div class="veil"></div>
      <div class="hero-foot">
        <p>${esc(t(S.roles))}</p>
        <a class="u" href="#collection">${esc(u.discover)}</a>
      </div>`;
  }

  function collection(u) {
    let i = 0;
    const rows = S.projects.map((p) => {
      const thumb = p.work.prints ? p.work.prints[0].src : "";
      return `<li data-reveal="rise" style="--i:${i++}"><a href="#work-${esc(p.id)}" data-thumb="${esc(thumb)}" data-text="${p.work.text ? esc(t(p.work.text).join(" ")) : ""}">
        <span class="ix-title">${esc(p.title)}</span><span class="ix-stack">${esc(p.stack.split(",").slice(0, 3).join(","))}</span><span class="ix-year">${esc(p.year)}</span></a></li>`;
    }).join("");
    const soon = S.upcoming.map((x) => `<li class="soon" data-reveal="rise" style="--i:${i++}"><span class="ix-title">${esc(t(x))}</span><span class="ix-stack">${esc(u.coming)}</span><span class="ix-year"></span></li>`).join("");
    return `
      <div class="bar"><h2>${esc(u.collection)}</h2><p>${esc(u.count(S.projects.length, S.upcoming.length))}</p></div>
      <ul class="index">${rows}${soon}</ul>
      <div class="ix-float" aria-hidden="true"></div>`;
  }

  function rooms(u) {
    const n = S.projects.length;
    return S.projects.map((p, i) => {
      const w = p.work;
      const wall = w.prints
        ? `<div class="prints prints-${w.prints.length}">${w.prints.map((pr, k) =>
            `<span class="mask" data-reveal="mask" style="--i:${k}"><span class="mask-in"><img src="${esc(pr.src)}" alt="${esc(t(pr.alt))}" width="${pr.w}" height="${pr.h}" decoding="async"></span></span>`).join("")}</div>`
        : `<p class="text-work" data-reveal="lines">${t(w.text).map((l, k) => `<span class="line"><span style="--i:${k}">${esc(l)}</span></span>`).join("")}</p>`;
      const prev = i > 0 ? `<a href="#work-${esc(S.projects[i - 1].id)}">${esc(u.prev)}</a>` : `<span></span>`;
      const next = i < n - 1 ? `<a href="#work-${esc(S.projects[i + 1].id)}">${esc(u.next)}</a>` : `<span></span>`;
      return `
      <article class="room" id="work-${esc(p.id)}">
        <div class="wall">${wall}</div>
        <div class="panel">
          <p class="room-no">${esc(u.room(i + 1, n))}</p>
          <div class="panel-body" data-reveal="fade">
            <h3>${esc(p.title)}</h3>
            <p class="year">${esc(p.year)}</p>
            <p class="summary">${esc(t(p.summary))}</p>
            <dl class="numbers">${p.numbers.map((x) => `<div><dt>${esc(t(x.l))}</dt><dd>${esc(x.n)}</dd></div>`).join("")}</dl>
            <p class="tech">${esc(p.stack)}</p>
            <p class="links">${p.links.map((l) => `<a class="u" ${ext(l.url)}>${esc(t(l.label))}</a>`).join("")}</p>
          </div>
          <p class="room-nav">${prev}${next}</p>
        </div>
      </article>`;
    }).join("");
  }

  function house(u) {
    const h = S.house;
    return `
      <figure class="portrait"><span class="mask" data-reveal="mask"><span class="mask-in"><img src="assets/img/portrait.jpg" alt="${esc(S.person.name)}" width="1254" height="1254" decoding="async"></span></span></figure>
      <div class="house-text">
        <h2 class="kicker">${esc(u.house)}</h2>
        <p class="statement" data-reveal="fade">${esc(t(h.statement))}</p>
        <div data-reveal="fade">${t(h.body).map((p) => `<p class="body">${esc(p)}</p>`).join("")}</div>
        <h3 class="kicker sub-k">${esc(u.practice)}</h3>
        <dl class="practice">${h.practice.map((f, i) => `<div data-reveal="rise" style="--i:${i}"><dt>${esc(t(f.k))}</dt><dd>${esc(t(f.v))}</dd></div>`).join("")}</dl>
        <dl class="facts">${h.facts.map((f) => `<div><dt>${esc(t(f.k))}</dt><dd>${esc(t(f.v))}</dd></div>`).join("")}</dl>
        <h3 class="kicker sub-k">${esc(u.offDuty)}</h3>
        <p class="off" data-reveal="fade">${esc(t(h.offDuty))}</p>
      </div>`;
  }

  function parcours(u) {
    return `
      <div class="bar"><h2>${esc(u.parcours)}</h2></div>
      <ol class="xp">${S.experience.map((e, i) => `
        <li data-reveal="rise" style="--i:${i}"><span class="xp-when">${esc(t(e.when))}</span>
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

  function contact(u) {
    const p = S.person;
    const rows = [
      `<a ${ext(p.linkedin)}>LinkedIn</a>`,
      `<a ${ext(p.github)}>GitHub</a>`,
      `<a href="mailto:${esc(p.email)}">${esc(u.email)}</a>`,
    ];
    if (p.cv) rows.push(`<a href="${esc(p.cv)}" download>${esc(u.cv)}</a>`);
    return `
      <div class="window frame" role="img" aria-label="Paris"><div class="frame-img" style="background-image:url(assets/img/fenetre.jpg)"></div></div>
      <div class="contact-box">
        <h2 class="kicker">${esc(u.contact)}</h2>
        <ul>${rows.map((r, i) => `<li data-reveal="rise" style="--i:${i}">${r}</li>`).join("")}</ul>
        <p class="mail">${esc(p.email)}</p>
      </div>`;
  }

  /* ── Render ─────────────────────────────────────────────── */
  function render(instant) {
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
    wireReveals(instant);
    measure();
    update();
  }

  /* ── Reveals: images open like a curtain, text rises ────── */
  let io;
  function wireReveals(instant) {
    const els = $$("[data-reveal]");
    if (reduce || instant || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.01 });
    els.forEach((el) => io.observe(el));
  }

  /* ── Scroll-linked motion ───────────────────────────────── */
  let vh = innerHeight, ratio = 7.6, frames = [], lenis = null;
  function measure() {
    vh = innerHeight;
    const name = $(".lk-name");
    if (name) {
      const probe = name.cloneNode(true);
      probe.style.cssText = "position:absolute;visibility:hidden;font-size:100px;white-space:nowrap;letter-spacing:-0.035em";
      document.body.appendChild(probe);
      ratio = probe.offsetWidth / 100 || ratio;
      probe.remove();
    }
    frames = $$(".frame").map((el) => {
      const stack = el.closest(".stack");
      const next = stack && el.nextElementSibling ? el.nextElementSibling : null;
      return { el, img: el.querySelector(".frame-img"), veil: el.querySelector(".veil"), next };
    });
  }

  function update() {
    const y = lenis ? lenis.scroll : scrollY;
    const head = $("#header"), lock = $(".lockup");
    if (lock) {
      const mobile = innerWidth <= 900;
      const big = Math.min(innerWidth * (mobile ? 0.9 : 0.86), 1500) / ratio;
      const small = mobile ? 20 : 24;
      const q = ease(clamp(y / (vh * 0.42), 0, 1));
      const fs = big + (small - big) * q;
      const top = (mobile ? 56 : 62) + ((mobile ? 13 : 13) - (mobile ? 56 : 62)) * q;
      lock.style.setProperty("--fs", fs.toFixed(2) + "px");
      lock.style.setProperty("--ty", top.toFixed(1) + "px");
      head.classList.toggle("compact", q > 0.98);
    }
    if (head) head.classList.toggle("solid", y > vh - 64);

    if (reduce) return;
    frames.forEach((f) => {
      const r = f.el.getBoundingClientRect();
      if (r.bottom < -40 || r.top > vh + 40) return;
      const enter = clamp(r.top / vh, 0, 1);              // 1 below the fold → 0 at the top
      let cover = 0;
      if (f.next) cover = clamp(1 - f.next.getBoundingClientRect().top / vh, 0, 1);
      const leave = f.next ? cover : clamp(-r.top / vh, 0, 1);
      if (f.img) f.img.style.transform = `translate3d(0, ${(enter * 7 - leave * 7).toFixed(2)}%, 0)`;
      if (f.veil) f.veil.style.opacity = (cover * 0.55).toFixed(3);
    });
  }

  function startScroll() {
    if (!reduce && window.Lenis) {
      lenis = new window.Lenis({ duration: 1.25, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)), smoothWheel: true });
      lenis.on("scroll", update);
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    } else {
      let ticking = false;
      addEventListener("scroll", () => {
        if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
      }, { passive: true });
    }
    addEventListener("resize", () => { measure(); update(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); update(); });
  }

  /* ── Index: a print follows the cursor (pointer devices) ── */
  function wireIndex() {
    const float = $(".ix-float");
    if (!float || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const list = $(".index");
    list.addEventListener("pointermove", (e) => {
      const a = e.target.closest("a[data-thumb]");
      if (!a) { float.classList.remove("on"); return; }
      if (float.dataset.for !== a.getAttribute("href")) {
        float.dataset.for = a.getAttribute("href");
        float.innerHTML = a.dataset.thumb ? `<img src="${a.dataset.thumb}" alt="">` : `<p>${a.dataset.text}</p>`;
      }
      const r = list.parentElement.getBoundingClientRect(), lr = list.getBoundingClientRect();
      const x = lr.right - r.left - 428 - float.offsetWidth - 32;
      float.style.transform = `translate(${x}px, ${e.clientY - r.top - float.offsetHeight / 2}px)`;
      float.classList.add("on");
    });
    list.addEventListener("pointerleave", () => float.classList.remove("on"));
  }

  /* ── Events ─────────────────────────────────────────────── */
  document.addEventListener("click", (e) => {
    const l = e.target.closest("[data-lang]");
    if (l) {
      lang = l.dataset.lang;
      try { localStorage.setItem("lang", lang); } catch (err) { /* ignore */ }
      const wasOpen = $(".h-menu") && $(".h-menu").getAttribute("aria-expanded") === "true";
      render(true);
      if (wasOpen) toggleMenu(true);
      const again = document.querySelector(`.h-right [data-lang="${lang}"]`);
      if (again && again.offsetParent) again.focus();
      return;
    }
    const m = e.target.closest(".h-menu");
    if (m) { toggleMenu(m.getAttribute("aria-expanded") !== "true"); return; }
    const a = e.target.closest('a[href^="#"]');
    if (a) {
      const id = a.getAttribute("href");
      const target = id === "#top" ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      toggleMenu(false);
      if (lenis) lenis.scrollTo(target, { offset: id === "#top" ? 0 : -64, duration: 1.6 });
      else if (target === 0) scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", id === "#top" ? location.pathname + location.search : id);
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  function toggleMenu(open) {
    const b = $(".h-menu"), menu = $("#menu");
    if (!b || !menu) return;
    b.setAttribute("aria-expanded", String(open));
    b.textContent = open ? UI[lang].close : UI[lang].menu;
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }

  render(false);
  startScroll();
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("ready")));
})();
