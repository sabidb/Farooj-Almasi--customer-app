// Phase 4 seed — promote the hardcoded BRANCHES list into the Firestore
// `branches` collection so the customer app can drop the fallback and the
// admin panel has real rows to edit.
//
// Idempotent: uses setDoc({ merge: true }) so re-running never clobbers
// changes made from the admin UI. Only fills in missing/new fields.
//
// Auth: same pattern as scripts/set-owner-role.mjs — Application Default
// Credentials in Cloud Shell (`gcloud auth application-default login` on
// a laptop) or GOOGLE_APPLICATION_CREDENTIALS pointing at a service account.

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import fs from 'node:fs';

const PROJECT_ID = 'farooj-almasii';

// Farooj Almasi launches with NO seeded branches — add real branches from the
// admin app (Settings → Branches). This template is here only if you ever want
// to bulk-seed from a script: fill in your real branches, each with a unique
// `id`, and run `npm run seed:branches`. Example row shape is shown below.
const SEED = [
  // {
  //   id: 'main',
  //   nameEn: 'Farooj Almasi (Main Branch)',
  //   nameAr: 'الفروج الماسي (الفرع الرئيسي)',
  //   whatsapp: '9665XXXXXXXX',
  //   phone: '05XXXXXXXX',
  //   lat: 0, lng: 0,
  //   active: true,
  //   prepMinutesPickup: 15,
  //   prepMinutesDelivery: 30,
  // },
];

const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (credsPath) {
  if (!fs.existsSync(credsPath)) {
    console.error(`No service-account file at ${credsPath}`);
    process.exit(1);
  }
  const serviceAccount = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
  initializeApp({ credential: cert(serviceAccount), projectId: PROJECT_ID });
  console.log(`Using service-account key from ${credsPath}`);
} else {
  try {
    initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID });
    console.log('Using Application Default Credentials.');
  } catch (e) {
    console.error('No credentials found. Either set GOOGLE_APPLICATION_CREDENTIALS');
    console.error('or run `gcloud auth application-default login` first.');
    console.error(e?.message || e);
    process.exit(1);
  }
}

const db = getFirestore();

let created = 0;
let merged = 0;
for (const b of SEED) {
  const ref = db.doc(`branches/${b.id}`);
  const snap = await ref.get();
  const payload = { ...b, updatedAt: FieldValue.serverTimestamp() };
  if (!snap.exists) payload.createdAt = FieldValue.serverTimestamp();
  await ref.set(payload, { merge: true });
  if (snap.exists) merged += 1; else created += 1;
  console.log(`${snap.exists ? '✎ merged  ' : '✓ created '} branches/${b.id}`);
}

console.log(`\nDone — ${created} created, ${merged} merged.`);
process.exit(0);
