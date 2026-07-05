
This guide explains how to set `SANITY_PROJECT_HOST` so your Sanity token works with the server proxy.

## 1) Edit the env file
Open:
- `frontend/.env.local`

Add this line (value must be correct):
- `SANITY_PROJECT_HOST=<<<PUT_HOST_HERE>>>`

## 2) Get the correct host for your token
Sanity tokens are tied to a specific Sanity API host.

Do this:
1. Open your Sanity project dashboard: https://manage.sanity.io/
2. Go to **API tokens**
3. Open the token you’re using (or view token details)
4. Copy the **API host** value that matches your project

Common host formats look like:
- `https://<project-id>.api.sanity.io`

## 3) Restart the frontend dev server
From PowerShell/terminal, run from the project root:
```powershell
cd c:/Users/HP-PC/Desktop/kamzybee-enterprise/frontend
npm run dev
```

(Important: on Windows cmd/powershell, use a single command line like above—don’t chain with `&&` if your shell gives errors.)

## 4) Verify
- Reload the inventory page
- The `/api/sanity` requests should no longer return 500 Unauthorized

## 5) Where the fix was applied
- `frontend/src/sanity/server.ts` now supports:
  - `SANITY_PROJECT_HOST`
- The proxy endpoint is:
  - `frontend/src/app/api/sanity/route.ts`

---
If you paste the value you currently have in `frontend/.env.local` for Sanity, I can tell you if it looks correctly formatted.
