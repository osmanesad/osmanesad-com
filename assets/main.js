let currentLang = "tr";

const CONTENT = {
  tr: {
    // Nav
    "nav-home": "Ana sayfa",
    "nav-writing": "Yazılar",
    "nav-art": "Çizimler",
    "nav-code": "Kod",
    "nav-about": "Hakkında",

    // Hero
    "hero-title": "Osman Esad",
    "hero-subtitle": "kurucu · tasarımcı · geliştirici · yayıncı",
    "hero-text":
      "Kahve, kitap ve kültür etrafında DASE markasını kurarken; yazılım araçları, çizimler ve kişisel yazılar üretiyorum. Bu sayfa, tüm işlerin toplandığı sade bir harita.",
    "hero-btn-writing": "Yazılara git",
    "hero-btn-art": "Çizimlere bak",
    "hero-btn-contact": "E-posta",
    "hero-currently-title": "Şu anda",
    "hero-currently-writing-label": "Yazıyorum",
    "hero-currently-art-label": "Çiziyorum",
    "hero-currently-code-label": "Kod yazıyorum",

    // Home sections
    "home-writing-title": "Yazılar",
    "home-writing-desc":
      "Süreç, araçlar ve gündelik hayat üzerine denemeler ve kısa notlar.",
    "home-writing-button": "Tüm yazıları gör",
    "home-art-title": "Çizimler",
    "home-art-desc":
      "Dijital ve geleneksel medyada eskizler, deneyler ve serbest çalışmalar.",
    "home-art-button": "Çizim arşivi",
    "home-code-title": "Kod projeleri",
    "home-code-desc":
      "Stok takibi, otomasyon ve günlük işler için küçük araçlar ve deneyler.",
    "home-code-button": "Projelere bak",

    // Home about
    "about-home-title": "Kısaca",
    "about-home-body":
      "Kitap, kafe ve kırtasiye alanlarında operasyon ve müşteri deneyimi tarafında çalıştım; aynı zamanda yazılım ve tasarım üretmeye devam ettim. Şu anda bu birikimi DASE markası altında birleştiriyorum.",
    "about-home-meta":
      "İstanbul’da yaşıyorum. Odaklandığım alanlar: kahve & kültür, stok yönetimi, küçük yazılım araçları ve görsel işler.",

    // Writing page
    "writing-kicker": "Yazılar",
    "writing-title": "Seçilmiş yazılar",
    "writing-subtitle":
      "Medium’da yayımladığım bazı denemeler ve kısa metinler.",
    "writing-item1-title": "Yol",
    "writing-item1-meta": "deneme · Medium",
    "writing-item1-desc":
      "Yön arayışı, mesafe ve kendi yolunu kurmak üzerine kişisel bir metin.",
    "writing-item1-link": "Medium’da oku",
    "writing-item2-title": "Bağlantı",
    "writing-item2-meta": "deneme · Medium",
    "writing-item2-desc":
      "İnsanlar, yerler ve eşyalar arasındaki bağların nasıl kurulduğuna dair kısa bir gözlem.",
    "writing-item2-link": "Medium’da oku",
    "writing-item3-title": "Makine",
    "writing-item3-meta": "deneme · Medium",
    "writing-item3-desc":
      "Makine fikrinden yola çıkarak sistemler, araçlar ve insan arasındaki ilişkiye bakan bir metin.",
    "writing-item3-link": "Medium’da oku",

    // Art page
    "art-kicker": "Çizimler",
    "art-title": "Seçilmiş görseller",
    "art-subtitle":
      "Dijital ve geleneksel tekniklerle yaptığım bazı çalışmalar.",
    "art-item1-title": "Art 1",
    "art-item1-meta": "pastel · renkli",
    "art-item1-desc":
      "Yoğun renkler ve katmanlı doku ile yapılmış, kaotik bir portre kompozisyonu.",
    "art-item2-title": "Art 2",
    "art-item2-meta": "dijital eskiz",
    "art-item2-desc":
      "Kuleler ve kubbelerden oluşan, şehir silueti tadında mimari bir eskiz.",
    "art-item3-title": "Art 3",
    "art-item3-meta": "metin + çizim",
    "art-item3-desc":
      "El yazısı katmanlarıyla kaplanmış, figür ve metni iç içe geçiren deneysel bir çalışma.",
    "art-cta-link": "Daha fazlası için ArtStation",

    // Code page
    "code-kicker": "Kod",
    "code-title": "Seçilmiş projeler",
    "code-subtitle":
      "Stok takibi, otomasyon ve günlük işler için geliştirdiğim bazı küçük araçlar.",
    "code-item1-title": "fastStock",
    "code-item1-meta": "Swift · iOS",
    "code-item1-desc":
      "Ürün stoklarını hızlıca takip etmek için tasarladığım, Swift ile geliştirilmiş bir iOS uygulaması.",
    "code-item1-link": "GitHub reposu",
    "code-item2-title": "Kitap Stok Takip",
    "code-item2-meta": "Python · CLI",
    "code-item2-desc":
      "Kitap mağazaları için stok ve hareket takibini kolaylaştıran basit bir Python aracı.",
    "code-item2-link": "GitHub reposu",
    "code-item3-title": "Google Drive API denemeleri",
    "code-item3-meta": "Python · API",
    "code-item3-desc":
      "Google Drive API ile dosya listeleme ve otomasyonlar üzerine gerçekleştirdiğim test ve denemeler.",
    "code-item3-link": "GitHub reposu",

    // About page
    "about-kicker": "Hakkında",
    "about-title": "Osman Esad",
    "about-subtitle":
      "Kahve, kitap ve yazılım ekseninde çalışan; aynı anda hem dükkan işi hem kod hem de görsel üretim yapan hibrit bir profil.",
    "about-block1":
      "Kitap-kırtasiye ve kafe sektörlerinde satış, kasa ve operasyon tarafında uzun yıllar çalıştım. Aynı dönemde yazılım ve tasarım öğrenip küçük araçlar, arayüzler ve projeler geliştirdim.",
    "about-block2":
      "DASE, İstanbul’da kurduğum kahve, kitap ve kültür odaklı bir marka. Seçili kahveler, kitaplar, kırtasiye ve küçük sanat objeleri etrafında bir alan kurarken; ileride workshop ve etkinliklerle de genişlemeyi hedefliyorum.",
    "about-block3":
      "Teknik tarafta Swift, Python, JavaScript ve temel web teknolojileri ile çalışıyorum. Aynı zamanda çizimler, eskizler ve kişisel yazılar üreterek süreci de görünür kılmaya çalışıyorum.",
    "about-contact-link": "E-posta ile iletişim",

    // Footer
    "footer-left": "© 2026 · Osman Esad Hoşbak"
  },

  en: {
    // Nav
    "nav-home": "Home",
    "nav-writing": "Writing",
    "nav-art": "Art",
    "nav-code": "Code",
    "nav-about": "About",

    // Hero
    "hero-title": "Osman Esad",
    "hero-subtitle": "founder · designer · developer · publisher",
    "hero-text":
      "Building DASE around coffee, books and culture while making small software tools, drawings and personal notes. This page is a quiet index of that work.",
    "hero-btn-writing": "View writing",
    "hero-btn-art": "View art",
    "hero-btn-contact": "Email",
    "hero-currently-title": "Currently",
    "hero-currently-writing-label": "Writing",
    "hero-currently-art-label": "Drawing",
    "hero-currently-code-label": "Coding",

    // Home sections
    "home-writing-title": "Writing",
    "home-writing-desc":
      "Essays and short notes on process, tools and everyday work.",
    "home-writing-button": "See all writing",
    "home-art-title": "Art",
    "home-art-desc":
      "Sketches, experiments and free-form visual work in digital and traditional media.",
    "home-art-button": "Browse archive",
    "home-code-title": "Code projects",
    "home-code-desc":
      "Small tools and experiments for stock tracking, automation and daily tasks.",
    "home-code-button": "View projects",

    // Home about
    "about-home-title": "In short",
    "about-home-body":
      "I’ve worked in bookshops, stationery and cafés on the operations and customer side, while learning design and software in parallel. Now I’m combining that experience under the DASE brand.",
    "about-home-meta":
      "Based in Istanbul. Focused on coffee & culture, inventory systems, small software tools and visual work.",

    // Writing page
    "writing-kicker": "Writing",
    "writing-title": "Selected pieces",
    "writing-subtitle":
      "A few essays and short texts published on Medium. Currently available in Turkish.",
    "writing-item1-title": "Yol (The Road)",
    "writing-item1-meta": "essay · Medium",
    "writing-item1-desc":
      "A personal piece about searching for direction and building your own path.",
    "writing-item1-link": "Read on Medium (TR)",
    "writing-item2-title": "Bağlantı (Connection)",
    "writing-item2-meta": "essay · Medium",
    "writing-item2-desc":
      "Observations on how connections are formed between people, places and objects.",
    "writing-item2-link": "Read on Medium (TR)",
    "writing-item3-title": "Makine (Machine)",
    "writing-item3-meta": "essay · Medium",
    "writing-item3-desc":
      "Thinking about systems, tools and humans through the idea of the machine.",
    "writing-item3-link": "Read on Medium (TR)",

    // Art page
    "art-kicker": "Art",
    "art-title": "Selected visuals",
    "art-subtitle":
      "A few pieces made with digital and traditional techniques. More work lives on ArtStation.",
    "art-item1-title": "Art 1",
    "art-item1-meta": "pastel · color",
    "art-item1-desc":
      "A chaotic portrait composition built with dense color and layered texture.",
    "art-item2-title": "Art 2",
    "art-item2-meta": "digital sketch",
    "art-item2-desc":
      "An architectural sketch of towers and domes forming a city-like silhouette.",
    "art-item3-title": "Art 3",
    "art-item3-meta": "text + drawing",
    "art-item3-desc":
      "An experimental piece that weaves handwritten text and a figure into one surface.",
    "art-cta-link": "See more on ArtStation",

    // Code page
    "code-kicker": "Code",
    "code-title": "Selected projects",
    "code-subtitle":
      "A small collection of tools for stock tracking, automation and everyday work.",
    "code-item1-title": "fastStock",
    "code-item1-meta": "Swift · iOS",
    "code-item1-desc":
      "An iOS app built with Swift to keep track of product stock quickly and clearly.",
    "code-item1-link": "GitHub repo",
    "code-item2-title": "Kitap Stok Takip",
    "code-item2-meta": "Python · CLI",
    "code-item2-desc":
      "A simple Python tool that helps bookshops track inventory and movements.",
    "code-item2-link": "GitHub repo",
    "code-item3-title": "Google Drive API experiments",
    "code-item3-meta": "Python · API",
    "code-item3-desc":
      "Tests and experiments using the Google Drive API for listing files and automations.",
    "code-item3-link": "GitHub repo",

    // About page
    "about-kicker": "About",
    "about-title": "Osman Esad",
    "about-subtitle":
      "Working at the intersection of coffee, books and software — running a shop, writing code and making visual work at the same time.",
    "about-block1":
      "I’ve spent years working in bookstores, stationery shops and cafés on sales, cashier and operations. In parallel I learned design and software, building small tools, interfaces and projects.",
    "about-block2":
      "DASE is a brand I’m building in Istanbul around coffee, books and culture. It brings together selected coffees, books, stationery and small art objects, and will eventually host workshops and events.",
    "about-block3":
      "On the technical side I work with Swift, Python, JavaScript and core web technologies. I also keep a sketchbook of drawings and personal writing to document the process.",
    "about-contact-link": "Contact via email",

    // Footer
    "footer-left": "© 2026 · Osman Esad Hoşbak"
  }
};

function applyLanguage(lang) {
  currentLang = lang;
  const dict = CONTENT[lang];
  if (!dict) return;

  Object.entries(dict).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Bazı elemanlarda HTML kullanıyoruz, çoğunda düz metin
    if (id.endsWith("link") || id === "hero-text") {
      el.firstChild
        ? (el.firstChild.textContent = text)
        : (el.textContent = text);
    } else {
      el.textContent = text;
    }
  });

  document.documentElement.lang = lang;

  // Dil butonlarının görünümü
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle(
      "is-active",
      btn.getAttribute("data-lang") === lang
    );
  });
}

// SPA page switching
const pageSections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav-links a[data-page]");

function setActivePage(pageName) {
  pageSections.forEach((sec) => {
    sec.classList.toggle("is-active", sec.id === "page-" + pageName);
  });

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("data-page");
    link.classList.toggle("is-active", linkPage === pageName);
  });

  window.location.hash = pageName;
}

document.addEventListener("DOMContentLoaded", () => {
  // Nav tıklama
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageName = link.getAttribute("data-page");
      if (pageName) setActivePage(pageName);
    });
  });

  // Home içindeki "data-page-link" butonları
  document.querySelectorAll("[data-page-link]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pageName = btn.getAttribute("data-page-link");
      if (pageName) setActivePage(pageName);
    });
  });

  // Dil butonları
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      applyLanguage(lang);
    });
  });

  // İlk yükleme: hash varsa o sayfa, yoksa home
  const hash = window.location.hash.replace("#", "");
  if (hash) setActivePage(hash);
  else setActivePage("home");

  // Varsayılan dil TR
  applyLanguage("tr");
});
