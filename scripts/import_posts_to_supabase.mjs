/**
 * posts.json -> Supabase posts tablosuna TOPLU AKTARIM
 *
 * Çalıştırma:
 *   1) Proje klasöründe: npm i @supabase/supabase-js
 *   2) Bu dosyayı scripts/import_posts_to_supabase.mjs olarak kaydet
 *   3) posts.json dosyan proje kökünde olsun (./posts.json)
 *   4) ENV ile çalıştır:
 *        SUPABASE_URL="" \
 *        SUPABASE_SERVICE_ROLE_KEY="" \
 *        node scripts/import_posts_to_supabase.mjs
 *
 * ÖNEMLİ:
 * - SERVICE_ROLE_KEY çok güçlüdür. GitHub'a KESİNLİKLE koyma.
 * - Bu scripti sadece localde bir kere çalıştırıp işi bitir.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Eksik env! SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY zorunlu.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const POSTS_PATH = path.resolve(process.cwd(), "posts.json");

if (!fs.existsSync(POSTS_PATH)) {
  console.error("posts.json bulunamadı:", POSTS_PATH);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(POSTS_PATH, "utf8"));
const posts = Array.isArray(raw) ? raw : (raw.posts || []);

if (!Array.isArray(posts) || posts.length === 0) {
  console.error("posts.json içeriği boş ya da format beklenenden farklı.");
  process.exit(1);
}

function pickType(p) {
  return (p.type || "note").toString();
}

function pickStatus(p) {
  // Hepsini published basıyoruz:
  return "published";
}

function pickContentHtml(p) {
  // posts.json'ında "content" zaten HTML.
  return (p.content || p.content_html || "").toString();
}

const rows = posts.map((p) => ({
  id: String(p.id || "").trim(),
  title: String(p.title || "").trim(),
  date: String(p.date || "").slice(0, 10),
  type: pickType(p),
  content_html: pickContentHtml(p),
  status: pickStatus(p),
  updated_at: new Date().toISOString(),
}));

// Basit validasyon
const bad = rows.filter((r) => !r.id || !r.title || !r.date || !r.content_html);
if (bad.length) {
  console.error("Bazı kayıtlar eksik alan içeriyor. İlk 5 örnek:", bad.slice(0, 5));
  process.exit(1);
}

console.log("Aktarılacak kayıt sayısı:", rows.length);

const { error } = await supabase.from("posts").upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Upsert hatası:", error);
  process.exit(1);
}

console.log("✅ Aktarım tamamlandı:", rows.length);
