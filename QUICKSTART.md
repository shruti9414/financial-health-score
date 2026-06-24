# ⚡ Quick Start (5 minutes)

**Skip detailed setup? Here's the quick version:**

---

## **1️⃣ Setup MySQL Database (1 min)**

```bash
# Open MySQL Command Line
mysql -u root -p

# Paste this:
```

```sql
CREATE DATABASE IF NOT EXISTS financial_health_score;
USE financial_health_score;

-- [Paste entire contents of database/schema.sql here]
-- Or run: source financial-health-score\database\schema.sql
```

---

## **2️⃣ Frontend (2 min)**

```bash
cd C:\Users\Admin\Documents\financial-health-score\fhs-frontend
npm install
npm run dev
```

✓ Open http://localhost:5173

---

## **3️⃣ Backend (2 min)**

```bash
cd C:\Users\Admin\Documents\financial-health-score\fhs-backend
npm install
npm run dev
```

✓ Open http://localhost:3000/api/health

---

## **✅ Done!**

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api
- Database: financial_health_score (MySQL)

**If stuck**, read detailed setup in `SETUP_GUIDE.md`

---

## **🔗 Git Setup (When Ready)**

```bash
cd C:\Users\Admin\Documents\financial-health-score

git init
git add .
git commit -m "Initial commit: Financial Health Score Platform"

# Add your GitHub repo:
git remote add origin <your-github-url>
git push -u origin main
```

---

**Ready to code!** 🚀
