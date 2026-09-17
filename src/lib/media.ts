// Banner kategori (dari admin dashboard) disimpan sebagai URL Cloudinary tanpa Content-Type di
// sisi frontend, jadi tipe media ditebak dari ekstensi file di URL.
const VIDEO_EXT_RE = /\.(mp4|webm|mov|m4v|og[gv])(\?|#|$)/i;

export function isVideoUrl(url?: string | null): boolean {
  return !!url && VIDEO_EXT_RE.test(url);
}
