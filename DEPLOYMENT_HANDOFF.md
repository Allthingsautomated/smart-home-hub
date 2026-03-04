# Deployment Handoff Document
## All Things Automated - Smart Home Hub

**Last Updated:** March 3, 2026  
**Project Status:** Production Ready  
**Current Version:** 4899c010

---

## 1. HOSTING INFRASTRUCTURE

### Provider
- **Platform:** Manus (Built-in Web Hosting)
- **Project ID:** U4y5WwD76ScYJ9NXSmKRFU
- **Project Name:** smart-home-hub

### Environment Names
- **Production:** `itsallthingsautomated.com` (primary) + `www.itsallthingsautomated.com`
- **Preview:** `smarthub-agdkvns5.manus.space` (auto-generated Manus domain)
- **Development:** Local dev server on `localhost:3000` (dev only)

### Deployment Model
- Manus handles all infrastructure (no external hosting provider)
- Automatic SSL/TLS certificates managed by Manus
- CDN and edge caching included
- Auto-scaling based on traffic

---

## 2. GIT INTEGRATION

### GitHub Repository
- **Repository URL:** `https://github.com/Allthingsautomated/smart-home-hub.git`
- **Access:** Connected via `user_github` remote with authenticated token
- **Production Branch:** `main`
- **Deploy Trigger Mode:** Manual (via Manus UI Publish button after checkpoint creation)

### Current Deployment Status
- **Last Deployed Commit:** `4899c010`
- **Commit Message:** "Implemented mobile hamburger menu navigation for all pages..."
- **Sync Status:** All branches synchronized (origin/main ↔ user_github/main ↔ local main)

### Deployment Workflow
1. Make code changes locally or in Manus editor
2. Create checkpoint via `webdev_save_checkpoint` (creates git commit)
3. Click "Publish" button in Manus Management UI
4. Manus automatically builds, tests, and deploys to production

---

## 3. BUILD & RUNTIME CONFIGURATION

### Package Manager
- **Manager:** pnpm v10.4.1
- **Install Command:** `pnpm install`
- **Lock File:** `pnpm-lock.yaml`

### Build Commands
```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Output: dist/ directory with compiled client + server bundles
```

### Start Command (Production)
```bash
NODE_ENV=production node dist/index.js
```

### Runtime Versions
- **Node.js:** v22.13.0 (LTS)
- **TypeScript:** 5.9.3
- **React:** 19
- **Tailwind CSS:** 4
- **tRPC:** 11
- **Express:** 4
- **Drizzle ORM:** 0.44.5

### Project Structure
```
smart-home-hub/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable UI components
│   │   ├── lib/        # tRPC client setup
│   │   └── App.tsx     # Main app routing
│   └── public/         # Static assets
├── server/             # Express backend (tRPC)
│   ├── _core/          # Framework plumbing (OAuth, context, etc.)
│   ├── db.ts           # Database query helpers
│   ├── routers.ts      # tRPC procedure definitions
│   └── storage.ts      # S3 file storage helpers
├── drizzle/            # Database schema & migrations
│   ├── schema.ts       # Table definitions
│   └── migrations/     # Migration files
├── shared/             # Shared types & constants
└── package.json        # Dependencies & scripts
```

### Working Directory
- **Monorepo:** No (single project)
- **Build Root:** `/home/ubuntu/smart-home-hub`
- **Client Build Output:** `dist/client/` (served at `/`)
- **Server Build Output:** `dist/index.js` (Node.js entry point)

---

## 4. ENVIRONMENT VARIABLES

### Required Production Variables
All variables are **automatically injected by Manus** — no manual configuration needed.

#### Database & Core
- `DATABASE_URL` — MySQL/TiDB connection string (managed by Manus)
- `NODE_ENV` — Set to `production` automatically

#### Authentication (Manus OAuth)
- `VITE_APP_ID` — OAuth application ID
- `JWT_SECRET` — Session cookie signing secret
- `OAUTH_SERVER_URL` — Manus OAuth backend URL
- `VITE_OAUTH_PORTAL_URL` — Manus login portal URL (frontend)
- `OWNER_OPEN_ID` — Project owner's OpenID
- `OWNER_NAME` — Project owner's name

#### Manus Built-in APIs
- `BUILT_IN_FORGE_API_URL` — Manus API gateway (LLM, storage, notifications, etc.)
- `BUILT_IN_FORGE_API_KEY` — Bearer token for server-side API access
- `VITE_FRONTEND_FORGE_API_KEY` — Bearer token for frontend API access
- `VITE_FRONTEND_FORGE_API_URL` — Frontend-accessible API URL

#### Analytics (Optional)
- `VITE_ANALYTICS_ENDPOINT` — Analytics service endpoint
- `VITE_ANALYTICS_WEBSITE_ID` — Website ID for analytics tracking

#### App Branding (Optional)
- `VITE_APP_TITLE` — Website title (default: "All Things Automated")
- `VITE_APP_LOGO` — Logo URL (default: current logo)

### Optional Variables
- None currently required beyond the above

### Secrets Management
- **Storage:** Manus Secrets Manager (encrypted at rest)
- **Access:** Server-side code only (never exposed to client)
- **Rotation:** Can be updated via Manus Management UI → Settings → Secrets
- **No `.env` files:** All env vars injected at runtime

---

## 5. DOMAIN & DNS CONFIGURATION

### Production Domains
| Domain | Type | Status | SSL | Purpose |
|--------|------|--------|-----|---------|
| `itsallthingsautomated.com` | Custom | Active | Auto | Primary production domain |
| `www.itsallthingsautomated.com` | Custom | Active | Auto | WWW alias (redirects to primary) |
| `smarthub-agdkvns5.manus.space` | Manus | Active | Auto | Preview/fallback domain |

### DNS Configuration
- **DNS Provider:** Currently using custom domain registrar
- **Required DNS Records:**
  - `A` record: `itsallthingsautomated.com` → Manus IP (provided by Manus)
  - `CNAME` record: `www.itsallthingsautomated.com` → `itsallthingsautomated.com`
  - OR `A` record for `www` pointing to same Manus IP

### SSL/TLS
- **Certificate:** Automatically provisioned by Manus (Let's Encrypt)
- **Renewal:** Automatic (no manual action required)
- **Status:** Active and valid for all domains
- **HTTPS:** Enforced on all domains

### DNS Binding in Manus
1. Go to Management UI → Settings → Domains
2. Add custom domain `itsallthingsautomated.com`
3. Manus provides DNS target (IP or CNAME)
4. Update DNS registrar with provided records
5. Manus verifies DNS propagation (usually 5-30 minutes)
6. SSL certificate auto-provisioned

---

## 6. ACCESS & PERMISSIONS FOR CODEX/OPERATORS

### Required Manus Permissions
For Codex to deploy, view logs, and rollback, they need:

| Action | Required Permission | Scope |
|--------|-------------------|-------|
| **Trigger Deploy** | Publish/Deploy | Project |
| **View Logs** | View Logs/Analytics | Project |
| **Rollback** | Rollback Checkpoint | Project |
| **View Secrets** | View Secrets | Project (optional) |
| **Manage Domain** | Edit Domain Settings | Project (optional) |

### Access Methods Available

#### Option 1: Invite as Project Collaborator (Recommended)
1. Go to Manus Management UI → Settings → Collaborators
2. Invite Codex user by email
3. Grant role: **"Deployer"** or **"Admin"**
4. Codex accepts invitation and gets full access

#### Option 2: Scoped Deploy Token (If Available)
- **Status:** Check with Manus support if scoped deploy tokens are available
- **Scope:** Production deploy + logs + rollback only
- **Expiration:** Configurable (recommend 90-day rotation)
- **Revocation:** Can be revoked anytime in Settings

#### Option 3: API Access (For CI/CD Integration)
- **API Endpoint:** Manus provides REST API for deployments
- **Authentication:** Bearer token (scoped)
- **Capabilities:** Trigger deploy, check status, view logs
- **Setup:** Contact Manus support for API credentials

### Least Privilege Recommendation
- **Role:** "Deployer" (not Admin)
- **Permissions:** Deploy + Logs + Rollback only
- **No Access To:** Secrets, domain changes, billing, team management
- **Token Rotation:** Every 90 days

---

## 7. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All code changes committed and pushed to `main` branch
- [ ] Checkpoint created via `webdev_save_checkpoint`
- [ ] All tests passing (`pnpm test`)
- [ ] No TypeScript errors (`pnpm check`)
- [ ] Environment variables verified in Manus UI
- [ ] Database migrations applied (`pnpm db:push`)

### Deployment Steps
1. Open Manus Management UI
2. Navigate to latest checkpoint
3. Click "Publish" button
4. Manus builds, tests, and deploys automatically
5. Monitor deployment progress in Dashboard
6. Verify production URL loads correctly
7. Check logs for any errors

### Post-Deployment
- [ ] Production site loads without errors
- [ ] All pages accessible and responsive
- [ ] Forms submit successfully
- [ ] Database queries working
- [ ] OAuth login flow functional
- [ ] Analytics tracking active

### Rollback Procedure
If deployment fails or issues occur:
1. Go to Management UI → Dashboard → Checkpoints
2. Find previous stable checkpoint
3. Click "Rollback" button
4. Confirm rollback action
5. Manus redeploys previous version
6. Verify production restored

---

## 8. MONITORING & LOGS

### Available Logs
- **Build Logs:** Visible during deployment in Manus UI
- **Server Logs:** Real-time in Management UI → Logs
- **Browser Console:** Client-side errors visible in browser DevTools
- **Network Logs:** HTTP requests/responses in browser Network tab
- **Analytics:** Traffic and performance metrics in Dashboard

### Key Metrics to Monitor
- Page load time
- Error rate
- Database query performance
- OAuth login success rate
- Form submission completion rate

### Alert Thresholds (Recommended)
- Error rate > 5% → Investigate
- Page load time > 3s → Optimize
- Database query > 1s → Check indexes
- Failed logins > 10/hour → Check OAuth config

---

## 9. SUPPORT & ESCALATION

### Manus Support
- **Portal:** https://help.manus.im
- **Issues:** Deployment failures, environment variables, domain setup
- **Response Time:** Typically 24-48 hours

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Deploy fails with "Build error" | TypeScript errors in code | Run `pnpm check` locally, fix errors, create new checkpoint |
| Site shows 502 Bad Gateway | Server crashed or not starting | Check server logs, verify `NODE_ENV=production`, check database connection |
| Styles not loading | CSS build issue | Clear browser cache, verify Tailwind config, rebuild |
| Database connection fails | Wrong `DATABASE_URL` | Verify env var in Manus UI, check MySQL credentials |
| OAuth login redirects to wrong URL | Redirect URL mismatch | Verify `VITE_OAUTH_PORTAL_URL` in env vars |

---

## 10. HANDOFF SUMMARY FOR CODEX

**To Deploy This Project, Codex Needs:**

1. **Manus Account Access**
   - Email invited to project as "Deployer"
   - Accept invitation in Manus UI

2. **Knowledge of Deployment Workflow**
   - Code changes → Checkpoint → Publish button
   - Rollback via Dashboard → Checkpoints

3. **Access to This Document**
   - All build commands, env vars, and procedures documented above
   - Share this file with Codex team

4. **Emergency Contacts**
   - Manus Support: https://help.manus.im
   - Project Owner: Jorge Romero (office@allthingsautomated.org)

5. **No Additional Setup Required**
   - Manus handles: DNS, SSL, database, secrets, infrastructure
   - Codex only needs to: Click Publish button and monitor logs

---

## 11. QUICK REFERENCE

### Deploy Command (For Reference)
```bash
# Local development only (not used in production)
pnpm dev

# Build for production (done automatically by Manus)
pnpm build

# Start production server (done automatically by Manus)
NODE_ENV=production node dist/index.js
```

### Key Files for Codex
- `package.json` — Build scripts and dependencies
- `server/_core/env.ts` — Environment variable usage
- `drizzle/schema.ts` — Database schema
- `DEPLOYMENT_HANDOFF.md` — This file

### Useful Links
- **Production Site:** https://itsallthingsautomated.com
- **Manus Dashboard:** https://manus.im (after login)
- **GitHub Repo:** https://github.com/Allthingsautomated/smart-home-hub
- **Support:** https://help.manus.im

---

**Document prepared for: Codex Deployment Team**  
**Prepared by: Manus AI Agent**  
**Date: March 3, 2026**
