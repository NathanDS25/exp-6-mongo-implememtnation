# MongoDB Atlas Quick Reference Card

## ⚡ 3-Minute Setup

### 1️⃣ Create Account
- Visit: https://www.mongodb.com/cloud/atlas
- Click "Start free"
- Sign up

### 2️⃣ Create Cluster
- Click "Create Cluster"
- Select FREE (M0)
- Choose your region
- Click "Create"
- ⏳ Wait 2-5 minutes

### 3️⃣ Add Database User
- Left menu → "Database Access"
- Click "Add New Database User"
- Username: `contactmanager`
- Password: Create strong password (SAVE IT!)
- Privileges: "Read and write to any database"
- Click "Add User"

### 4️⃣ Whitelist IP
- Left menu → "Network Access"
- Click "Add IP Address"
- Select "Allow access from anywhere"
- Click "Confirm"

### 5️⃣ Get Connection String
- Click "Clusters"
- Click "Connect" on your cluster
- Select "Connect your application"
- Copy the connection string

### 6️⃣ Update .env
```
PORT=5000
MONGODB_URI=mongodb+srv://contactmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contact-manager?retryWrites=true&w=majority
```

Replace:
- `YOUR_PASSWORD` → Your actual password
- `cluster0.xxxxx` → Your cluster name

### 7️⃣ Run Backend
```bash
cd server
npm start
```

---

## Connection String Template

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://contactmanager:MyP@ss123@cluster0.abc123.mongodb.net/contact-manager?retryWrites=true&w=majority
```

---

## Special Characters in Password

If your password has special characters:
- `@` becomes `%40`
- `#` becomes `%23`
- `:` becomes `%3A`
- `!` becomes `%21`

**Example:** Password `My@Pass#1` → `My%40Pass%231`

---

## Common Issues

| Error | Fix |
|-------|-----|
| "Cannot connect" | Check IP is whitelisted |
| "Auth failed" | Check username/password |
| "Connection timeout" | Wait for cluster to start |
| "Invalid connection" | Verify connection string format |

---

## Verify Connection Works

```bash
cd server
npm start
```

Look for: `✓ Connected to MongoDB successfully`

---

## View Your Data

1. MongoDB Atlas dashboard
2. Click "Clusters"
3. Click "Browse Collections"
4. See your contacts!

---

## Lost Your Password?

❌ Can't recover original password

✅ Solution:
1. MongoDB Atlas → Database Access
2. Find your user
3. Click the "..." menu
4. Select "Edit Password"
5. Create new password

---

## Questions?

See **MONGODB_ATLAS_SETUP.md** for detailed step-by-step guide
