# 🚀 Complete Deployment Guide

## ✅ Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create Free MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free" or "Try Free"
3. Sign up with Google/Email
4. Choose "Create a deployment" → **M0 FREE** tier
5. Select cloud provider: **AWS**
6. Region: Choose closest to you (e.g., Mumbai for India)
7. Cluster Name: `NewsPortalCluster` (or any name)
8. Click "Create Deployment"

### 1.2 Create Database User
1. In the modal that appears:
   - Username: `newsadmin` (save this!)
   - Password: Click "Autogenerate Secure Password" (SAVE THIS!)
   - Click "Create Database User"

### 1.3 Set Network Access
1. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
2. Click "Add Entry"
3. Click "Finish and Close"

### 1.4 Get Connection String
1. Click "Connect" button on your cluster
2. Choose "Drivers"
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string:
```
mongodb+srv://newsadmin:<password>@newsportalcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. Replace `<password>` with your actual password
6. Add database name: Change `/?retryWrites` to `/news_portal?retryWrites`

**Final connection string example:**
```
mongodb+srv://newsadmin:MySecurePass123@newsportalcluster.ab1cd.mongodb.net/news_portal?retryWrites=true&w=majority
```

---

## ✅ Step 2: Generate JWT Secret

Run this command in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Copy the output** - this is your JWT_SECRET
Example output:
```
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t
```

---

## ✅ Step 3: Deploy to Render (10 minutes)

### 3.1 Create Render Account
1. Go to https://render.com
2. Sign up with **GitHub** (recommended)
3. Authorize Render to access your repositories

### 3.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Click **"Next"**

### 3.3 Connect Repository
1. Find: `URK23CS1305_WEB_TECH_EXP9`
2. Click **"Connect"**

### 3.4 Configure Service

Fill in these details:

**Name:** `news-portal-exp9` (or any unique name)

**Region:** `Singapore` (closest to India) or `Frankfurt`

**Branch:** `main`

**Root Directory:** (leave empty)

**Runtime:** `Node`

**Build Command:**
```bash
cd server && npm install
```

**Start Command:**
```bash
cd server && node app.js
```

**Instance Type:** `Free`

### 3.5 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these 3 variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string from Step 1.4 |
| `JWT_SECRET` | Your generated secret from Step 2 |
| `NODE_ENV` | `production` |

**Example:**
```
MONGODB_URI = mongodb+srv://newsadmin:MySecurePass123@newsportalcluster.ab1cd.mongodb.net/news_portal?retryWrites=true&w=majority

JWT_SECRET = 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08

NODE_ENV = production
```

### 3.6 Deploy!
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Watch the build logs for any errors

---

## ✅ Step 4: Verify Deployment

### 4.1 Check Build Logs
You should see:
```
Environment Check:
PORT: 3000
NODE_ENV: production
MONGODB_URI: Loaded ✓
JWT_SECRET: Loaded ✓
---
🚀 Server is running on port 3000
✅ MongoDB connected successfully
```

### 4.2 Get Your Live URL
At the top of Render dashboard:
```
https://news-portal-exp9.onrender.com
```

### 4.3 Test Your Application
1. Open your Render URL in browser
2. You should see the landing page
3. Click **"Register"** and create an account
4. Login with your credentials
5. Click **"Add News"** and add a test article
6. View it in the dashboard!

---

## ✅ Step 5: Update README with Live URL

1. Edit `README.md` on GitHub
2. Add your live URL:
```markdown
## 🌐 Live Demo

**Application:** https://news-portal-exp9.onrender.com
```
3. Commit changes

---

## 🎯 Important Notes

### Free Tier Limitations
- ⏱️ Server sleeps after 15 minutes of inactivity
- 🐌 First request takes 30-60 seconds to wake up
- 💾 750 hours/month free (sufficient for testing)
- ⚡ Perfect for college projects and demos

### Wake Up Your App
If app is sleeping, just visit the URL and wait 30-60 seconds.

### Custom Domain (Optional)
- Go to Render Settings
- Add custom domain
- Update DNS records

---

## 🔧 Troubleshooting

### Build Failed
**Check:**
- Build command is correct: `cd server && npm install`
- Start command is correct: `cd server && node app.js`
- package.json exists in server folder

### Can't Connect to Database
**Check:**
- MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Connection string password is correct (no special characters issues)
- Database name is included in connection string

### Environment Variables Not Working
**Check:**
- All 3 variables are added in Render dashboard
- No extra spaces in values
- MONGODB_URI includes `/news_portal` database name

### App Deployed But Shows Error
**Check Render logs:**
1. Go to Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for error messages

---

## 📊 Monitoring

### View Logs
- Render Dashboard → Your Service → Logs
- Real-time logs of your application
- Check for errors and debugging

### Check Database
- MongoDB Atlas → Database → Browse Collections
- View `users` and `news` collections
- See all your data

---

## 🎓 For E-Record Submission

Include these in your PDF:

1. **GitHub Repository URL:**
   ```
   https://github.com/davizzrobo/URK23CS1305_WEB_TECH_EXP9
   ```

2. **Live Deployment URL:**
   ```
   https://your-app-name.onrender.com
   ```

3. **Screenshots:**
   - Landing page
   - Registration form
   - Login page
   - Dashboard with news
   - Add news panel
   - MongoDB Atlas collections
   - Render deployment dashboard

4. **Architecture Diagram:**
   ```
   Client (Browser) 
      ↓
   Express Server (Render)
      ↓
   MongoDB Atlas (Cloud)
   ```

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] JWT secret generated
- [ ] GitHub repository pushed
- [ ] Render account created
- [ ] Web service configured
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Live URL tested
- [ ] Test account created
- [ ] Test news added
- [ ] Screenshots taken
- [ ] README updated with live URL

---

## 🎉 Success!

Your Multi-Language News Portal is now live on the internet!

**Share your project:**
- GitHub: Share repository link
- Live Demo: Share Render URL
- LinkedIn: Post about your project

**Next Steps:**
- Add more news articles
- Test all features
- Prepare E-Record documentation
- Take screenshots for submission

---

## 📞 Need Help?

If deployment fails:
1. Check Render build logs
2. Verify environment variables
3. Test MongoDB connection string locally
4. Check GitHub repository structure

Common issues are usually:
- Wrong environment variables
- MongoDB connection string errors
- Build/start commands incorrect

---

**Congratulations on deploying your full-stack application! 🚀**
