# 📋 Quick Deployment Reference Card

## 🔗 Important URLs

### GitHub Repository
```
https://github.com/davizzrobo/URK23CS1305_WEB_TECH_EXP9
```

### MongoDB Atlas
```
https://www.mongodb.com/cloud/atlas
```

### Render Hosting
```
https://render.com
```

---

## ⚙️ Configuration Commands

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Test Locally
```bash
cd /home/david/HTML/WEB_TECH_EXP/WEB_TECH_EXP_9
cd server
npm install
npm start
# Visit: http://localhost:3000
```

### Git Commands
```bash
cd /home/david/HTML/WEB_TECH_EXP/WEB_TECH_EXP_9
git add .
git commit -m "Update message"
git push origin main
```

---

## 🎯 Render Configuration

### Build Command
```bash
cd server && npm install
```

### Start Command
```bash
cd server && node app.js
```

### Environment Variables
| Variable | Example Value |
|----------|---------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/news_portal` |
| `JWT_SECRET` | `your_64_character_random_string` |
| `NODE_ENV` | `production` |

---

## 📊 MongoDB Connection String Format

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**Replace:**
- `<username>` → Your database username
- `<password>` → Your database password  
- `<cluster>` → Your cluster name
- `<database>` → `news_portal`

**Example:**
```
mongodb+srv://newsadmin:MyPass123@cluster0.ab1cd.mongodb.net/news_portal?retryWrites=true&w=majority
```

---

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access: 0.0.0.0/0 added
- [ ] Connection string obtained
- [ ] JWT secret generated
- [ ] Render account created
- [ ] Environment variables ready

---

## 🧪 Testing Endpoints

### Health Check
```
https://your-app.onrender.com/api/health
```

### Register User
```bash
POST https://your-app.onrender.com/api/register
Content-Type: application/json

{
  "full_name": "Test User",
  "email": "test@example.com",
  "username": "testuser",
  "password": "test123",
  "confirm_password": "test123"
}
```

### Login
```bash
POST https://your-app.onrender.com/api/login
Content-Type: application/json

{
  "identifier": "testuser",
  "password": "test123"
}
```

---

## 🚨 Common Issues & Fixes

### Issue: Build Failed
**Fix:** Check build command is `cd server && npm install`

### Issue: Start Failed  
**Fix:** Check start command is `cd server && node app.js`

### Issue: Can't Connect to MongoDB
**Fix:** 
- Verify connection string
- Check password (no special chars like @, #, etc.)
- Ensure IP 0.0.0.0/0 is whitelisted

### Issue: JWT Errors
**Fix:** Ensure JWT_SECRET is set in environment variables

### Issue: App is Slow
**Reason:** Free tier sleeps after 15 mins
**Fix:** Wait 30-60 seconds for first request

---

## 📁 Project Structure

```
URK23CS1305_WEB_TECH_EXP9/
├── .github/workflows/deploy.yml    # CI/CD
├── client/                         # Frontend
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── add-news.html
├── server/                         # Backend
│   ├── app.js
│   ├── package.json
│   ├── models/
│   ├── routes/
│   └── middleware/
├── .gitignore
├── README.md
├── DEPLOYMENT.md
└── RENDER_DEPLOYMENT_GUIDE.md
```

---

## 🎓 For E-Record

**Include:**
1. GitHub URL
2. Live Render URL
3. Screenshots (landing, register, login, dashboard, admin panel)
4. Code snippets (User model, Auth routes)
5. MongoDB collection screenshots
6. Architecture diagram

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **Mongoose Docs:** https://mongoosejs.com/

---

**Last Updated:** 6 November 2025
