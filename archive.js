import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "###############################";
const SUPABASE_ANON_KEY = "###############################";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function fmtDate(iso) {
  if(!iso) return '';
  try{
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('tr-TR', { year:'numeric', month:'long', day:'numeric' });
  } catch { return iso; }
}

let POSTS=[];
const listEl=document.getElementById('list');
const qEl=document.getElementById('q');
const countEl=document.getElementById('countLine');
const timelineEl=document.getElementById('timeline');

function buildTimeline(posts){
  if(!timelineEl) return;

  const years = [...new Set(
    posts.map(p => (p.date || '').slice(0,4)).filter(Boolean)
  )];

  timelineEl.innerHTML = '';

  years.forEach(year => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = year;

    btn.addEventListener('click', () => {
      const target = document.querySelector(`[data-year-anchor="${year}"]`);
      if(target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    timelineEl.appendChild(btn);
  });
}

function render(items){
  listEl.innerHTML='';

  // Her yıl için sadece ilk görülen elemana anchor koyuyoruz (scroll bununla garanti çalışır)
  const anchoredYears = new Set();

  items.forEach(p=>{
    const year = (p.date || '').slice(0,4);

    const li=document.createElement('li');
    li.className='archiveItem';

    if(year && !anchoredYears.has(year)){
      li.setAttribute('data-year-anchor', year);
      anchoredYears.add(year);
    }

    li.innerHTML=`
      <a href="index.html#${p.id}">
        <div class="t">${p.title}</div>
      </a>
      <div class="e">${p.excerpt || ''}</div>
      <div class="d">${fmtDate(p.date)}</div>
    `;
    listEl.appendChild(li);
  });

  countEl.textContent = items.length + ' yazı · yeni → eski';
}

function applyFilter(){
  const q=(qEl.value||'').trim().toLowerCase();
  if(!q) return render(POSTS);
  const filtered=POSTS.filter(p => (p.title||'').toLowerCase().includes(q));
  render(filtered);
}

document.getElementById('clear').addEventListener('click',()=>{ qEl.value=''; applyFilter(); qEl.focus(); });
qEl.addEventListener('input', applyFilter);

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();
}

async function loadArchive() {
  try {
    countEl.textContent = "Yükleniyor…";

    const { data, error } = await supabase
      .from("posts")
      .select("id,title,date,content_html,status")
      .eq("status", "published")
      .order("date", { ascending: false });

    if (error) throw error;

    POSTS = (data || []).map(p => ({
      id: p.id,
      title: p.title,
      date: p.date,
      excerpt: stripHtml(p.content_html).slice(0, 160) // kısa özet
    }));

    buildTimeline(POSTS);
    render(POSTS);
  } catch (e) {
    console.error(e);
    countEl.textContent = "Arşiv yüklenemedi (Supabase hatası).";
  }
}

loadArchive();


  // --- Scroll to top (Archive) ---
const toTopBtn = document.getElementById('toTop');
if(toTopBtn){
  const toggle = () => {
    toTopBtn.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
