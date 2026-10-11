# Farooj Almasi — Backend setup handoff

The two apps are built and pushed. They currently run on a **placeholder Firebase
config**, so they load but cannot store or receive orders yet. To go live you need to
create **one new Firebase project for Farooj Almasi** (separate from Al-Bahr — the two
companies keep separate databases) and give me (or paste in) its config.

Repos:
- Customer app: `sabidb/Farooj-Almasi--customer-app` (this repo)
- Admin app: `sabidb/farooj-Almasi-admin`

---

## ⚠️ Read first: the order flow needs the Blaze plan

The customer order flow ("customer orders → branch receives") goes through a Cloud
Function (`submitOrder`). There is **no** direct-database fallback — this is how the
original Al-Bahr app works too. Cloud Functions require Firebase's **Blaze
(pay-as-you-go) plan** (billing enabled). In practice this is near-free at small volume
(generous free allotment), but a card must be on file.

- **Exact replica (recommended):** enable Blaze, deploy the functions → full flow works.
- **Free-tier alternative:** I can rewrite `saveOrder` to write orders straight to
  Firestore under security rules (no functions). This stays on the free Spark plan but
  **diverges from the Al-Bahr replica** and loses the server-side order-number /
  anti-tamper logic. Tell me if you want this instead.

---

## Step 1 — Create the Firebase project

1. Go to <https://console.firebase.google.com> → **Add project**.
2. Name it e.g. `farooj-almasi` (the id it generates is your **PROJECT_ID** — note it).
3. Finish the wizard (Analytics optional).

## Step 2 — Register a Web app and copy the config

1. Project **Overview** → the **`</>`** (Web) icon → register an app (any nickname).
2. Copy the `firebaseConfig` object it shows. **Send me these 6 values** (or paste them
   into `src/lib/fb.ts` and the admin `index.html` — search `TODO(Farooj Almasi)`):

   | Key | Looks like |
   |-----|------------|
   | `apiKey` | `AIzaSy…` |
   | `authDomain` | `farooj-almasi.firebaseapp.com` |
   | `projectId` | `farooj-almasi` |
   | `storageBucket` | `farooj-almasi.firebasestorage.app` |
   | `messagingSenderId` | `6638…` (12 digits) |
   | `appId` | `1:6638…:web:…` |

## Step 3 — Enable the services

1. **Build → Authentication → Get started → Email/Password → Enable.**
2. **Build → Firestore Database → Create database** (production mode, region
   **me-west1 / me-central1** — pick one Middle-East region and keep it consistent).
3. **Build → Storage → Get started** (same region).

## Step 4 — (Optional) App Check / reCAPTCHA v3

1. Register a reCAPTCHA v3 site key at <https://www.google.com/recaptcha/admin> for your
   app's domain. **Send me the site key** (or paste it where `REPLACE_WITH_ALMASI_RECAPTCHA_SITE_KEY`
   appears). App Check "fails open" if left unset, so this is not blocking.

## Step 5 — Deploy rules, indexes, and functions

From the customer repo, with the Firebase CLI logged in and the project selected
(`firebase use <PROJECT_ID>`):

```bash
npm install
npm run deploy:rules        # firestore rules + indexes + storage rules
npm run deploy:functions    # requires the Blaze plan (Step ⚠️)
```

The admin repo shares the same `firestore.rules` — keep them in sync.

## Step 6 — Create the owner account

Follow `../farooj-Almasi-admin/FIREBASE_SETUP.md` (or the copy in the admin repo):
create the owner Auth user, add their `users/<uid>` role doc with `role: "owner"`, publish
rules, then log into the admin app and add branch managers from **Settings → Staff**.

## Step 7 — Add real data

Everything launches **empty**. From the admin app, add your real **branches** and **menu
items** (and promo codes / loyalty rewards if you want them). They appear in the customer
app automatically.

---

### What to send me to finish wiring it up

1. The 6 `firebaseConfig` values (Step 2).
2. (Optional) the reCAPTCHA v3 site key (Step 4).
3. Which path you want for orders: **Blaze + functions** (exact replica) or **free-tier
   direct writes** (I rewrite `saveOrder`).

I'll paste the keys into both apps, push, and confirm the order flow end-to-end.
