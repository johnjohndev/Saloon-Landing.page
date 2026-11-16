/* ==========================================================
   VIVI COIFFEUR — main.js

   ÍNDICE
   1. Menu mobile
   2. Cabeçalho ao rolar + botão "voltar ao topo"
   3. Link ativo no menu
   4. Animação de entrada das seções
   5. Abas da Formação
   6. Carrossel de depoimentos
   7. Horários: dia de hoje + aberto/fechado
   8. Contadores das conquistas
   9. Placeholder das imagens que ainda não existem
   10. Galeria: abrir foto em destaque
   ========================================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initScrollState();
  initActiveLink();
  initReveal();
  initTabs();
  initCarousel();
  initHours();
  initCounters();
  initImagePlaceholders();
  initLightbox();

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
});

/* ---------- 1. Menu mobile ---------- */
function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("menu");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!document.body.classList.contains("menu-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) setOpen(false);
  });
}

/* ---------- 2. Cabeçalho ao rolar ---------- */
function initScrollState() {
  const header = document.querySelector(".header");
  const toTop = document.querySelector(".to-top");

  const update = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (toTop) toTop.classList.toggle("is-visible", y > window.innerHeight);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ---------- 3. Link ativo no menu ---------- */
function initActiveLink() {
  const links = document.querySelectorAll(".nav__link");
  if (!links.length || !("IntersectionObserver" in window)) return;

  const map = new Map();
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) map.set(section, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        map.get(entry.target).classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  map.forEach((_, section) => observer.observe(section));
}

/* ---------- 4. Animação de entrada ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- 5. Abas da Formação ---------- */
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tabs__btn");
    const panels = tabs.querySelectorAll(".tabs__panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");

        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", String(active));
        });

        panels.forEach((p) => {
          const active = p.id === targetId;
          p.classList.toggle("is-active", active);
          p.hidden = !active;
        });
      });
    });
  });
}

/* ---------- 6. Carrossel de depoimentos ---------- */
function initCarousel() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const dotsBox = carousel.querySelector(".carousel__dots");
    const slides = Array.from(track.children);
    if (!slides.length || !dotsBox) return;

    const dots = slides.map((slide, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Depoimento ${i + 1}`);
      dot.addEventListener("click", () => {
        track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
      });
      dotsBox.appendChild(dot);
      return dot;
    });

    const setActive = (index) => {
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    };
    setActive(0);

    let ticking = false;
    track.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const step = slides[0].offsetWidth + 14;
          setActive(Math.min(slides.length - 1, Math.round(track.scrollLeft / step)));
          ticking = false;
        });
      },
      { passive: true }
    );
  });
}

/* ---------- 7. Horários ----------
   Para alterar os horários, edite a tabela abaixo
   (e o texto correspondente no index.html).
   Índice = dia da semana (0 = domingo). null = fechado. */
const HORARIOS = [
  null,      // domingo
  null,      // segunda
  [10, 18],  // terça
  [10, 19],  // quarta
  [9, 19],   // quinta
  [9, 19],   // sexta
  [9, 18],   // sábado
];

function initHours() {
  const list = document.getElementById("hours");
  const status = document.getElementById("status-aberto");
  if (!list || !status) return;

  // Usa sempre o horário de Brasília, onde quer que o visitante esteja
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;

  const today = list.querySelector(`[data-day="${day}"]`);
  if (today) today.classList.add("is-today");

  const range = HORARIOS[day];
  const open = Boolean(range) && hour >= range[0] && hour < range[1];

  status.textContent = open ? "Aberto agora" : "Fechado agora";
  status.classList.add(open ? "is-open" : "is-closed");
}

/* ---------- 8. Contadores ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!counters.length || reduce || !("IntersectionObserver" in window)) return;

  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const tick = (t) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------- 9. Placeholder das imagens ----------
   Se o arquivo ainda não está em images/, mostra um bloco
   com o nome que a foto deve ter. Quando a foto existir,
   ela aparece normalmente e nada precisa ser alterado. */
function initImagePlaceholders() {
  document.querySelectorAll("img[data-placeholder]").forEach((img) => {
    const swap = () => {
      const box = document.createElement("div");
      box.className = "img-placeholder";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", img.alt);
      box.innerHTML = `<span>Foto aqui<code>images/${img.dataset.placeholder}</code></span>`;
      img.replaceWith(box);
    };

    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener("error", swap, { once: true });
  });
}

/* ---------- 10. Galeria: abrir foto em destaque ---------- */
function initLightbox() {
  const box = document.getElementById("lightbox");
  const gallery = document.querySelector("[data-gallery]");
  if (!box || !gallery) return;

  const big = box.querySelector("img");
  const close = () => { box.hidden = true; big.removeAttribute("src"); };

  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return; // placeholders não abrem
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    box.hidden = false;
  });

  box.addEventListener("click", (e) => {
    if (e.target !== big) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !box.hidden) close();
  });
}
