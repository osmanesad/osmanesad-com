import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// TODO: burayı kendi Supabase bilgilerinizle doldurun
const SUPABASE_URL = "###############################";
const SUPABASE_ANON_KEY = "###############################";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// UI

const quill = new Quill("#editor", {
  theme: "snow",
  placeholder: "Yazını buraya yaz...",
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"]
    ]
  }
});


const $ = (id) => document.getElementById(id);
const elEmail = $("email");
const elPass = $("password");
const loginBtn = $("loginBtn");
const logoutBtn = $("logoutBtn");
const authStatus = $("authStatus");

const elId = $("id");
const elTitle = $("title");
const elDate = $("date");
const elType = $("type");
const elContent = $("content");

const saveDraftBtn = $("saveDraftBtn");
const publishBtn = $("publishBtn");
const unpublishBtn = $("unpublishBtn");
const deleteBtn = $("deleteBtn");

const msg = $("msg");
const postsList = $("postsList");

function setMsg(t) {
  msg.textContent = t || "";
}

function isValidId(s) {
  return /^[a-z0-9\-]+$/i.test(s) && s.length >= 2;
}

async function refreshAuthUI() {
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user;

  if (user) {
    authStatus.textContent = `Giriş: ${user.email}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    authStatus.textContent = "Giriş yapılmadı";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

async function login() {
  setMsg("");
  const email = elEmail.value.trim();
  const password = elPass.value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    setMsg("Giriş hatası: " + error.message);
    return;
  }
  elPass.value = "";
  await refreshAuthUI();
  await loadPosts();
  setMsg("Giriş başarılı.");
}

async function logout() {
  await supabase.auth.signOut();
  await refreshAuthUI();
  await loadPosts();
  setMsg("Çıkış yapıldı.");
}

function currentFormPost(statusOverride) {
  const id = elId.value.trim();
  const title = elTitle.value.trim();
  const date = elDate.value;
  const type = elType.value;
  const content_html = quill.root.innerHTML;

  if (!quill.getText().trim()) {
    throw new Error("İçerik boş olamaz.");
  }



  if (!isValidId(id)) throw new Error("id (slug) sadece harf/sayı/- içermeli.");
  if (!title) throw new Error("Başlık boş olamaz.");
  if (!date) throw new Error("Tarih seç.");
  if (!content_html.trim()) throw new Error("İçerik boş olamaz.");

  return {
    id,
    title,
    date,
    type,
    content_html,
    status: statusOverride ?? "draft",
    updated_at: new Date().toISOString(),
  };
}

async function upsertPost(statusOverride) {
  setMsg("");
  try {
    const post = currentFormPost(statusOverride);

    const { error } = await supabase
      .from("posts")
      .upsert(post, { onConflict: "id" });

    if (error) throw error;

    setMsg(statusOverride === "published" ? "Yayınlandı ✅" : "Taslak kaydedildi ✅");
    await loadPosts();
  } catch (e) {
    setMsg("Hata: " + (e?.message || e));
  }
}

async function setStatus(status) {
  setMsg("");
  try {
    const id = elId.value.trim();
    if (!isValidId(id)) throw new Error("Geçerli id (slug) gir.");

    const { error } = await supabase
      .from("posts")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;

    setMsg(status === "published" ? "Yayınlandı ✅" : "Taslağa alındı ✅");
    await loadPosts();
  } catch (e) {
    setMsg("Hata: " + (e?.message || e));
  }
}

async function deletePost() {
  setMsg("");
  try {
    const id = elId.value.trim();
    if (!isValidId(id)) throw new Error("Geçerli id (slug) gir.");

    if (!confirm(`Silinsin mi? (${id})`)) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw error;

    setMsg("Silindi ✅");
    await loadPosts();
  } catch (e) {
    setMsg("Hata: " + (e?.message || e));
  }
}

function fillForm(p) {
  elId.value = p.id ?? "";
  elTitle.value = p.title ?? "";
  elDate.value = (p.date ?? "").slice(0, 10);
  elType.value = p.type ?? "note";
  quill.root.innerHTML = p.content_html ?? "";

  setMsg(`Yüklendi: ${p.id} (${p.status})`);
}

async function loadPosts() {
  postsList.textContent = "Yükleniyor…";

  // Admin sayfasında hem draft hem published görmek istiyoruz.
  // RLS yalnızca admin email ile izin verdiği için, giriş yoksa hata alırsın (normal).
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,date,status,type,updated_at")
    .order("date", { ascending: false });

  if (error) {
    postsList.textContent = "Yazılar yüklenemedi (giriş gerekli olabilir).";
    console.warn(error);
    return;
  }

  if (!data || data.length === 0) {
    postsList.textContent = "Henüz yazı yok.";
    return;
  }

  postsList.innerHTML = data
    .map(
      (p) => `
      <div class="item">
        <div>
          <div><strong>${escapeHtml(p.title)}</strong> <span class="muted">(${p.status})</span></div>
          <div class="muted">${p.id} · ${String(p.date).slice(0, 10)} · ${p.type}</div>
        </div>
        <div>
          <button data-edit="${p.id}" class="ghost">Düzenle</button>
        </div>
      </div>
    `
    )
    .join("");

  postsList.querySelectorAll("button[data-edit]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-edit");
      const { data: row, error: e } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (e) return setMsg("Hata: " + e.message);
      fillForm(row);
    });
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Events
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
saveDraftBtn.addEventListener("click", () => upsertPost("draft"));
publishBtn.addEventListener("click", () => upsertPost("published"));
unpublishBtn.addEventListener("click", () => setStatus("draft"));
deleteBtn.addEventListener("click", deletePost);

// Init
await refreshAuthUI();
await loadPosts();
