import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://zefzcmrsdvtbliguqedi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_vGfAuyo4h18I-Pqmt25N0Q_OkEtlazb";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sidebar\'da gösterilecek maksimum yazı sayısı
const TOP_N = 7;

function getVisitorId() {
  const key = "visitor_id_v1";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function getSlugStable() {
  // Geçici: URL dosya adından slug (kendi sistemine göre düzenle)
  const path = location.pathname.split("/").pop() || "home";
  return path.replace(".html", "");
}

async function fetchLikes(slug) {
  const { data, error } = await supabase
    .from("post_likes")
    .select("likes_count")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data?.likes_count ?? 0;
}

async function likeOnce(slug) {
  const visitorId = getVisitorId();
  console.log("slug:", slug, "visitor:", visitorId);

  const { data, error } = await supabase.rpc("like_once", {
    p_slug: slug,
    p_visitor_id: visitorId,
  });
  if (error) throw error;
  return data;
}

async function init() {
  const slug = getSlugStable();

  const likeBtn = document.getElementById("likeBtn");
  const likeCountEl = document.getElementById("likeCount");
  if (!likeBtn || !likeCountEl) {
    console.warn("likeBtn/likeCount not found in DOM");
    return;
  }

  likeCountEl.textContent = await fetchLikes(slug);

  likeBtn.addEventListener("click", async () => {
    likeBtn.disabled = true;
    try {
      const newCount = await likeOnce(slug);
      likeCountEl.textContent = newCount;
    } catch (e) {
      console.error("Like failed:", e);
    } finally {
      likeBtn.disabled = false;
    }
  });
}

init();



// Theme + font size
const THEMES = {
  white:{bg:'#ffffff',text:'#111111',muted:'#5d2424',line:'#e7e7e7',chip:'#f4f4f4',chipText:'#111',shadow:'rgba(0,0,0,0.04)'},
  sepia:{bg:'#f6f1e5',text:'#1a1a1a',muted:'#6b5f55',line:'#e7ddcf',chip:'#efe6d7',chipText:'#1a1a1a',shadow:'rgba(0,0,0,0.04)'},
  gray:{bg:'#f1f1f1',text:'#111111',muted:'#6b6b6b',line:'#dedede',chip:'#e9e9e9',chipText:'#111',shadow:'rgba(0,0,0,0.04)'},
  dark:{bg:'#0e0f12',text:'#f3f4f6',muted:'#a1a1aa',line:'#22242a',chip:'#17181d',chipText:'#f3f4f6',shadow:'rgba(0,0,0,0.25)'}
};
const root = document.documentElement;

function applyTheme(name){
  const t = THEMES[name] || THEMES.white;
  root.style.setProperty('--bg', t.bg);
  root.style.setProperty('--text', t.text);
  root.style.setProperty('--muted', t.muted);
  root.style.setProperty('--line', t.line);
  root.style.setProperty('--chip', t.chip);
  root.style.setProperty('--chipText', t.chipText);
  root.style.setProperty('--shadow', t.shadow);

  document.querySelectorAll('.dot').forEach(d => d.setAttribute('aria-pressed','false'));
  const idMap={white:'t-white',sepia:'t-sepia',gray:'t-gray',dark:'t-dark'};
  const btn=document.getElementById(idMap[name]);
  if(btn) btn.setAttribute('aria-pressed','true');

  localStorage.setItem('read_theme', name);
}

const MIN=16, MAX=22;
function setFontSize(px){
  const clamped=Math.max(MIN, Math.min(MAX, px));
  root.style.setProperty('--fontSize', clamped + 'px');
  localStorage.setItem('read_font', String(clamped));
}

document.getElementById('decrease').addEventListener('click', () => {
  const current = parseInt(getComputedStyle(root).getPropertyValue('--fontSize')) || 18;
  setFontSize(current - 1);
});
document.getElementById('increase').addEventListener('click', () => {
  const current = parseInt(getComputedStyle(root).getPropertyValue('--fontSize')) || 18;
  setFontSize(current + 1);
});

document.getElementById('t-white').addEventListener('click', () => applyTheme('white'));
document.getElementById('t-sepia').addEventListener('click', () => applyTheme('sepia'));
document.getElementById('t-gray').addEventListener('click', () => applyTheme('gray'));
document.getElementById('t-dark').addEventListener('click', () => applyTheme('dark'));

applyTheme(localStorage.getItem('read_theme') || 'white');
setFontSize(parseInt(localStorage.getItem('read_font') || '18', 10));

// DOM
const postListEl=document.getElementById('postList');
const titleEl=document.getElementById('title');
const dateEl=document.getElementById('dateLine');
const contentEl=document.getElementById('content');

function fmtDate(iso){
  if(!iso) return '';
  try{
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('tr-TR', { year:'numeric', month:'long', day:'numeric' });
  } catch { return iso; }
}

// Like per post (local)
const likeBtn=document.getElementById('likeBtn');
const likeCountEl=document.getElementById('likeCount');
const Like={
  postId:null,
  keyLiked(){ return `liked_once_v1::${this.postId}`; },

  async fetchCount(){
    const { data, error } = await supabase
      .from("post_likes")
      .select("likes_count")
      .eq("slug", this.postId)
      .maybeSingle();
    if(error) throw error;
    return data?.likes_count ?? 0;
  },

  async render(){
    const liked=localStorage.getItem(this.keyLiked())==='1';
    likeBtn.classList.toggle('liked', liked);

    try{
      const count = await this.fetchCount();
      likeCountEl.textContent = String(count);
    }catch(e){
      console.warn("Like fetch failed:", e);
      // fallback (keeps UI stable if network fails)
      likeCountEl.textContent = likeCountEl.textContent || "0";
    }
  },

  setPost(id){
    this.postId=id;
    this.render();
  },

  async likeOnce(){
    const liked=localStorage.getItem(this.keyLiked())==='1';
    if(liked) return;

    try{
      const { data, error } = await supabase.rpc("increment_like", { p_slug: this.postId });
      if(error) throw error;
      likeCountEl.textContent = String(data);
      localStorage.setItem(this.keyLiked(), '1');
      likeBtn.classList.add('liked');
    }catch(e){
      console.warn("Like increment failed:", e);
    }
  }
};
likeBtn.addEventListener('click',()=>Like.likeOnce());

// Share current hash URL
const shareBtn=document.getElementById('shareBtn');
shareBtn.addEventListener('click', async () => {
  const url = window.location.href;
  const title = document.title + ' — ' + (titleEl.textContent || 'Yazı');
  try{
    if(navigator.share){ await navigator.share({ title, url }); }
    else{
      await navigator.clipboard.writeText(url);
      const original=shareBtn.innerHTML;
      shareBtn.textContent='Kopyalandı';
      setTimeout(()=>{shareBtn.innerHTML=original;},900);
    }
  } catch(e){}
});

// Data
let POSTS=[];

function renderSidebar(activeId){
  postListEl.innerHTML='';
  const top=POSTS.slice(0, TOP_N);
  top.forEach(p=>{
    const li=document.createElement('li');
    const a=document.createElement('a');
    a.className='postLink';
    a.href='#'+p.id;
    a.setAttribute('aria-current', p.id===activeId ? 'true' : 'false');
    a.innerHTML=`<div>${p.title}</div><span class="postMeta">${fmtDate(p.date)}</span>`;
    li.appendChild(a);
    postListEl.appendChild(li);
  });

  const li=document.createElement('li');
  const a=document.createElement('a');
  a.className='postLink';
  a.href='archive.html';
  a.innerHTML=`<div>→ Tümü / Arşiv</div><span class="postMeta">${POSTS.length} yazı</span>`;
  li.appendChild(a);
  postListEl.appendChild(li);
}

function setActivePost(id){
  const p = POSTS.find(x=>x.id===id) || POSTS[0];
  if(!p){ titleEl.textContent='Yazı bulunamadı'; contentEl.innerHTML=''; return; }
  titleEl.textContent=p.title;
  dateEl.textContent=fmtDate(p.date);
  contentEl.innerHTML=p.content || '';
  Like.setPost(p.id);
  renderSidebar(p.id);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

async function load(){
  // Supabase'ten sadece yayındaki (published) yazıları çek
  const { data, error } = await supabase
    .from('posts')
    .select('id,title,date,type,content_html,status')
    .eq('status', 'published')
    .order('date', { ascending: false });

  if (error) throw error;

  POSTS = (data || []).map(p => ({
    id: p.id,
    title: p.title,
    date: p.date,
    type: p.type,
    content: p.content_html
  }));

  const id = location.hash.replace('#','').trim() || (POSTS[0] && POSTS[0].id);
  renderSidebar(id);
  setActivePost(id);
}


window.addEventListener('hashchange', ()=>setActivePost(location.hash.replace('#','').trim()));

document.getElementById('randomBtn').addEventListener('click', ()=>{
  if(!POSTS.length) return;
  const pick=POSTS[Math.floor(Math.random()*POSTS.length)];
  location.hash=pick.id;
});

load().catch(err=>{
  titleEl.textContent='Yükleme hatası';
  contentEl.innerHTML='<p>Yazılar yüklenemedi. Lütfen tekrar deneyin.</p>';
  console.error(err);
});

// --- Scroll to top (Index) ---
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

// --- Mobile drawer: quick access to posts ---
const openPostsBtn = document.getElementById('openPosts');
const drawer = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const closeDrawerBtn = document.getElementById('closeDrawer');
const drawerList = document.getElementById('drawerList');

function openDrawer(){
  if(!drawer || !drawerBackdrop) return;
  drawer.hidden = false;
  drawerBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeDrawer(){
  if(!drawer || !drawerBackdrop) return;
  drawer.hidden = true;
  drawerBackdrop.hidden = true;
  document.body.style.overflow = '';
}

function renderDrawerList(activeId){
  if(!drawerList) return;
  drawerList.innerHTML = '';
  const top = POSTS.slice(0, TOP_N);
  top.forEach(p=>{
    const a = document.createElement('a');
    a.className = 'drawerLink';
    a.href = '#'+p.id;
    a.innerHTML = `<div>${p.title}</div><span class="drawerMeta">${fmtDate(p.date)}</span>`;
    a.addEventListener('click', () => closeDrawer());
    drawerList.appendChild(a);
  });
}

if(openPostsBtn){
  openPostsBtn.addEventListener('click', () => {
    renderDrawerList(location.hash.replace('#','').trim());
    openDrawer();
  });
}
if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
if(drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeDrawer(); });

// drawer listesini yazı değişince de güncel tut
const _origSetActivePost = setActivePost;
setActivePost = function(id){
  _origSetActivePost(id);
  renderDrawerList(id);
};

fetch("/version.txt")
  .then(r => r.text())
  .then(t => document.getElementById("betaBadge").textContent = t.trim())
  .catch(()=>{});

