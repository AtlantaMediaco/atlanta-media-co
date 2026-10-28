/* Atlanta Media Co. — shared header, footer and interactions */
const SITE = {
  booking: "https://order.atlantamediaco.com/order/atlmediaco/media",
  email: "info@atlantamediaco.com",
  reviewsUrl: "https://maps.google.com/?cid=7793355568307794385",
  instagram: "https://www.instagram.com/atlantamediaco/", youtube: "#", linkedin: "#"
};
const A = p => p;
const reels = [
  {v:"1220726892?h=99ef95a2b0", t:"Listing Reel", p:"Canton, GA"},
  {v:"1220726658?h=82b7152c0a", t:"Listing Reel", p:"Dallas, GA"},
  {v:"1220726660?h=635c3bccbf", t:"Listing Reel", p:"Newnan, GA"},
  {v:"1220726661?h=e0585fde30", t:"Listing Reel", p:"Fayetteville, GA"},
  {v:"1220726659?h=17b8637ea1", t:"Listing Reel", p:"Ball Ground, GA"}
];

(function(){
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => [...el.querySelectorAll(s)];
  const here = location.pathname.split("/").pop().replace(/\.html$/, "") || "index";

  /* ---------- header ---------- */
  const work = `<a href="listing-photography">Listing Photography</a><a href="editorial-photography">Editorial Photography</a><a href="cinematic-video">Cinematic Video</a>`;
  document.body.insertAdjacentHTML("afterbegin", `
  <header class="hdr" id="hdr">
    <a class="wm" href="/" aria-label="Atlanta Media Co. home"><b>ATLANTA</b><small>MEDIA CO.</small></a>
    <nav class="nav" aria-label="Main">
      <div class="dd"><button type="button">Our Work</button><div class="dd-menu">${work}</div></div>
      <a href="/#services">Services</a>
      <a href="guarantee">Our Guarantee</a>
      <a href="client-care">Client Care</a>
      <a href="/#reviews">Reviews</a>
    </nav>
    <div class="hdr-r">
      <a class="btn" href="${SITE.booking}">Book a Shoot</a>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>
  <nav class="mnav" id="mnav" aria-label="Mobile">
    <details><summary>Our Work</summary>${work}</details>
    <a href="/#services">Services</a>
    <a href="guarantee">Our Guarantee</a>
    <a href="client-care">Client Care</a>
    <a href="/#reviews">Reviews</a>
    <a class="btn btn-solid" href="${SITE.booking}">Book a Shoot</a>
  </nav>`);

  /* ---------- footer ---------- */
  const ig = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>`;
  const yt = `<svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/></svg>`;
  const li = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.8v.1M12 16v-3.2c0-1.4 1-2.3 2.2-2.3s2 .9 2 2.3V16M12 10.5V16"/></svg>`;
  const has = u => u && u !== "#";
  const soc = [["instagram", "Instagram", ig], ["youtube", "YouTube", yt], ["linkedin", "LinkedIn", li]]
    .filter(([k]) => has(SITE[k])).map(([k, n, svg]) => `<a href="${SITE[k]}" aria-label="${n}">${svg}</a>`).join("");
  const socials = soc ? `<div><h4>Follow</h4><div class="socials">${soc}</div></div>` : "";
  document.body.insertAdjacentHTML("beforeend", `
  <section class="news">
    <span class="eyebrow">Stay in the loop</span>
    <h2 class="h-lg">Get on <em>the list</em></h2>
    <p>New work and listing-marketing tips from Victor, straight to your inbox.</p>
    <form id="newsForm">
      <input type="email" placeholder="Email address" aria-label="Email address" required>
      <button aria-label="Subscribe">&rarr;</button>
    </form>
  </section>
  <footer class="foot">
    <div class="foot-grid">
      <div class="foot-card">
        <h2>Ready for your<br>next listing?</h2>
        <a class="btn btn-ink" href="${SITE.booking}">Book a Shoot</a>
        <a class="em" href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
      <div class="foot-cols">
        <div><h4>Studio</h4><a href="${SITE.booking}">Book a Shoot</a><a href="client-care">Client Care</a><a href="guarantee">Our Guarantee</a><a href="${SITE.reviewsUrl}">Google Reviews</a><a href="mailto:${SITE.email}">Contact</a></div>
        <div><h4>Our Work</h4>${work}</div>
        ${socials}
      </div>
    </div>
    <div class="foot-base"><span>© ${new Date().getFullYear()} Atlanta Media Co.</span><span>Real estate photo &amp; video · Atlanta, GA</span></div>
  </footer>
  <a class="totop" id="totop" href="#top" aria-label="Back to top">&uarr;<span>Back to top</span></a>`);

  /* ---------- social links + newsletter ---------- */
  if (!socials) $(".foot-cols").classList.add("two");
  $$("[data-ig]").forEach(a => { if (has(SITE.instagram)) { a.href = SITE.instagram; a.target = "_blank"; a.rel = "noopener"; } else a.closest(".btns").remove(); });
  $("#newsForm").addEventListener("submit", e => {
    e.preventDefault();
    const v = $("#newsForm input").value.trim();
    location.href = `mailto:${SITE.email}?subject=Add me to your list&body=Please add ${encodeURIComponent(v)} to your updates.`;
  });

  /* ---------- header behavior ---------- */
  const hdr = $("#hdr"), mnav = $("#mnav"), burger = $("#burger"), totop = $("#totop");
  const setH = () => document.documentElement.style.setProperty("--hdr-h", hdr.offsetHeight + "px");
  setH(); addEventListener("resize", setH);
  const onScroll = () => { hdr.classList.toggle("solid", scrollY > 40); totop.classList.toggle("show", scrollY > 900); };
  onScroll(); addEventListener("scroll", onScroll, {passive:true});
  burger.addEventListener("click", () => {
    const o = !mnav.classList.contains("open");
    mnav.classList.toggle("open", o); hdr.classList.toggle("open", o); burger.setAttribute("aria-expanded", o);
  });
  $$("a", mnav).forEach(a => a.addEventListener("click", () => { mnav.classList.remove("open"); hdr.classList.remove("open"); }));
  totop.addEventListener("click", e => { e.preventDefault(); scrollTo({top:0, behavior:"smooth"}); });

  /* ---------- marquee ---------- */
  $$(".mq").forEach(m => m.innerHTML += m.innerHTML);

  /* ---------- iPhone reels: three phones, all playing ---------- */
  const SV = {
    sig:`<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>`,
    wifi:`<svg viewBox="0 0 16 12"><path d="M8 11.4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.3 6.7a6.7 6.7 0 019.4 0l-1.4 1.4a4.7 4.7 0 00-6.6 0zM.8 4.2a10.3 10.3 0 0114.4 0l-1.4 1.4a8.3 8.3 0 00-11.6 0z"/></svg>`,
    batt:`<svg viewBox="0 0 27 12"><rect x=".6" y=".6" width="22.8" height="10.8" rx="3.2" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.2"/><rect x="2.4" y="2.4" width="19.2" height="7.2" rx="1.8"/><path d="M24.8 4.2v3.6c.8-.3 1.4-1 1.4-1.8s-.6-1.5-1.4-1.8z" fill-opacity=".45"/></svg>`,
    cam:`<svg viewBox="0 0 24 24"><rect x="3" y="6.5" width="18" height="13.5" rx="4"/><path d="M8.5 6.5l1.4-2.5h4.2l1.4 2.5"/><circle cx="12" cy="13.2" r="3.4"/></svg>`,
    heart:`<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.6-9C1 8.4 2.9 5 6.3 5c2.1 0 3.7 1.2 4.4 2.6h2.6C14 6.2 15.6 5 17.7 5c3.4 0 5.3 3.4 3.9 6.5-2.1 4.4-9.6 9-9.6 9z"/></svg>`,
    cmt:`<svg viewBox="0 0 24 24"><path d="M20.5 11.6c0 4.4-3.8 7.9-8.5 7.9-1.3 0-2.6-.3-3.7-.8L3.5 20l1.4-3.9a7.6 7.6 0 01-1.4-4.5C3.5 7.2 7.3 3.7 12 3.7s8.5 3.5 8.5 7.9z"/></svg>`,
    send:`<svg viewBox="0 0 24 24"><path d="M21 3.5L10.2 13.8M21 3.5l-6.8 17-4-6.7-6.7-4z"/></svg>`,
    dots:`<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1" fill="#fff"/><circle cx="12" cy="12" r="1" fill="#fff"/><circle cx="19" cy="12" r="1" fill="#fff"/></svg>`,
    note:`<svg viewBox="0 0 24 24"><path d="M9 17.5V5.5l11-2.2v11.4"/><circle cx="6.5" cy="17.5" r="2.7"/><circle cx="17.5" cy="14.7" r="2.7"/></svg>`,
    home:`<svg viewBox="0 0 24 24"><path d="M3.5 10.5L12 3.5l8.5 7V20.5h-5.5v-6h-6v6H3.5z"/></svg>`,
    search:`<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>`,
    reels:`<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3.5 8.5h17M9 3.3l2.6 5.2M14.6 3.3l2.6 5.2M10.4 11.6v5.2l4.4-2.6z"/></svg>`,
    plus:`<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M12 8v8M8 12h8"/></svg>`
  };
  $$("[data-iphones]").forEach(box => {
    box.innerHTML = box.dataset.iphones.split(",").map(n => {
      const r = reels[+n];
      return `<div class="iphone"><i class="sb ac"></i><i class="sb v1"></i><i class="sb v2"></i><i class="sb pw"></i>
        <div class="bezel"><div class="scr">
          <iframe src="https://player.vimeo.com/video/${r.v}&background=1&autoplay=1&loop=1&muted=1&autopause=0" allow="autoplay; fullscreen" title="${r.t}"></iframe>
          <div class="island"></div>
          <div class="sbar"><span>9:41</span><span class="ic">${SV.sig}${SV.wifi}${SV.batt}</span></div>
          <div class="hind"></div>
        </div></div></div>`;
    }).join("");
    if (!box.classList.contains("stack")) return;
    /* one in front, two behind */
    const phones = $$(".iphone", box);
    let front = 1;
    const wrap = box.parentElement;
    wrap.insertAdjacentHTML("beforeend", `<button class="ph-arrow l" aria-label="Previous reel">&larr;</button><button class="ph-arrow r" aria-label="Next reel">&rarr;</button>`);
    wrap.insertAdjacentHTML("afterend", `<div class="stack-dots">${phones.map(() => "<i></i>").join("")}</div><p class="stack-cap"></p>`);
    const cap = wrap.nextElementSibling.nextElementSibling, ids = box.dataset.iphones.split(",").map(Number);
    const dots = $$("i", wrap.nextElementSibling);
    const place = () => {
      phones.forEach((p, k) => {
        const d = (k - front + phones.length) % phones.length;
        p.classList.remove("pos-l", "pos-c", "pos-r");
        p.classList.add(d === 0 ? "pos-c" : d === 1 ? "pos-r" : "pos-l");
      });
      dots.forEach((d, k) => d.classList.toggle("on", k === front));
      const r = reels[ids[front]]; cap.innerHTML = `<b>${r.t}</b> · ${r.p}`;
    };
    place();
    const go = n => { front = (n + phones.length) % phones.length; place(); };
    $(".ph-arrow.l", wrap).onclick = () => go(front - 1);
    $(".ph-arrow.r", wrap).onclick = () => go(front + 1);
    phones.forEach((p, k) => p.addEventListener("click", () => { if (k !== front) go(k); }));
    let x0 = null;
    box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive:true});
    box.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(front + (dx < 0 ? 1 : -1)); x0 = null; });
  });

  /* ---------- gallery + lightbox ---------- */
  const gal = $("[data-gallery]");
  if (gal) {
    const [prefix, count] = gal.dataset.gallery.split(":");
    const files = Array.from({length:+count}, (_, k) => `${prefix}-${String(k+1).padStart(2,"0")}.jpg`);
    gal.innerHTML = files.map((f, k) => `<a href="${A(f)}" data-k="${k}"><img src="${A("thumbs/" + f)}" alt="" loading="lazy"></a>`).join("");
    document.body.insertAdjacentHTML("beforeend", `<div class="lb" id="lb" role="dialog" aria-label="Photo viewer"><img alt=""><button class="x" aria-label="Close">&times;</button><button class="pv" aria-label="Previous">&larr;</button><button class="nx" aria-label="Next">&rarr;</button><div class="ct"></div></div>`);
    const lb = $("#lb"), img = $("img", lb), ct = $(".ct", lb);
    let k = 0;
    const show = n => { k = (n + files.length) % files.length; img.src = A(files[k]); ct.textContent = `${k+1} / ${files.length}`; lb.classList.add("open"); };
    gal.addEventListener("click", e => { const a = e.target.closest("a"); if (!a) return; e.preventDefault(); show(+a.dataset.k); });
    $(".x", lb).onclick = () => lb.classList.remove("open");
    $(".pv", lb).onclick = () => show(k - 1);
    $(".nx", lb).onclick = () => show(k + 1);
    lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("open"); });
    addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") lb.classList.remove("open"); if (e.key === "ArrowLeft") show(k - 1); if (e.key === "ArrowRight") show(k + 1); });
  }

  /* ---------- active subnav ---------- */
  $$(".subnav a").forEach(a => { if (a.getAttribute("href") === here) a.classList.add("on"); });

  /* ---------- loading screen, then the homepage headline fades in ---------- */
  if ($(".hero.intro")) {
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const l = document.createElement("div");
    l.className = "loader";
    l.innerHTML = `<div class="lname">Atlanta Media Co.</div><div class="lbar"><i></i></div><div class="lnum">000</div>`;
    document.body.appendChild(l);
    const bar = $("i", l), num = $(".lnum", l), start = performance.now(), dur = reduce ? 200 : 1300;
    const finish = () => { if (l.classList.contains("done")) return; l.classList.add("done"); document.body.classList.add("reveal-now"); setTimeout(() => l.remove(), 1200); };
    const step = t => {
      const k = Math.min(1, (t - start) / dur);
      num.textContent = String(Math.round(k * 100)).padStart(3, "0"); bar.style.transform = `scaleX(${k})`;
      if (k < 1) requestAnimationFrame(step); else setTimeout(finish, 180);
    };
    requestAnimationFrame(step);
    l.addEventListener("click", finish);
  } else document.body.classList.add("reveal-now");

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), {rootMargin:"0px 0px -8% 0px"});
  $$(".rv").forEach(el => io.observe(el));
})();
