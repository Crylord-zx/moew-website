// ==========================================================
// Templates fetched from external sites (Youware, Lovable, Vercel,
// Jashnova, Google-Drive-shared source zips) and staged in
// extracted-templates/imported/<slug>/ — each is its own self-contained
// static build, namespaced under /imported/<slug>/ so multiple different
// Vite/Next builds' asset paths never collide.
//
// Each starts preview-only (editable:false hides the Customize button and
// skips the customize-form route). Flipped to true one at a time as each
// gets hand-patched to accept injected window.__PAGE_DATA__ — see
// TEMPLATE-INTEGRATION.md's Format 2 for what that patch involves.
// hona-tha-pyaar deliberately stays editable:false forever — it bundles a
// full copyrighted commercial song (Atif Aslam & Hadiqa Kiani, from the
// film Bol) as both an MP3 and synced lyrics; user decision, don't change.
// Shared between site-server.js (public gallery) and admin-server.js
// (visibility toggle + category assignment + the editable ones' snapshot
// pipeline) so there's one source of truth for the list.
// ==========================================================
const IMPORTED_TEMPLATES = [
  { slug: 'unlock-love-letter', title: 'Unlock Your Love Letter', category: 'valentine', editable: false },
  { slug: 'here-to-you-my-love', title: "Here's to You, My Love", category: 'valentine', editable: false },
  { slug: 'locked-letter-in-blue', title: 'Locked Letter in Blue', category: 'valentine', editable: false },
  { slug: 'little-locked-garden', title: 'Little Locked Garden', category: 'valentine', editable: false },
  { slug: 'you-have-mail', title: 'You Have Mail', category: 'valentine', editable: false },
  { slug: 'box-of-blooms', title: 'A Box of Blooms', category: 'valentine', editable: false },
  { slug: 'petal-space-for-us', title: 'Petal — A Little Space for Us', category: 'valentine', editable: false },
  { slug: 'little-something-for-you', title: 'A Little Something For You', category: 'valentine', editable: false },
  { slug: 'hona-tha-pyaar', title: 'Hona Tha Pyaar', category: 'valentine', editable: false },
  { slug: 'birthday-gift', title: 'Birthday Gift', category: 'birthday', editable: false },
  { slug: 'moonlight-bloom', title: 'Moonlight Bloom', category: 'anniversary', editable: false },
  { slug: 'jashnova-3d-romantic-birthday', title: '3D Romantic Birthday', category: 'birthday', editable: true },
  { slug: 'jashnova-birthday-love', title: 'Birthday Love', category: 'birthday', editable: false },
  { slug: 'second-birthday-version', title: 'Second Birthday Version', category: 'birthday', editable: false },
].map((t) => ({
  ...t,
  isImported: true,
  previewUrl: `/imported/${t.slug}/index.html`,
}));

const EDITABLE_IMPORTED_SLUGS = new Set(IMPORTED_TEMPLATES.filter((t) => t.editable).map((t) => t.slug));

module.exports = { IMPORTED_TEMPLATES, EDITABLE_IMPORTED_SLUGS };
