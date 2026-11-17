# Sampan Chinese Fast Food & Tandoori Corner - Demo Website

A demo restaurant website built with React + Vite + Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 Editing Restaurant Data

All restaurant information is in **one file**: `src/data/restaurant.js`

This includes:
- Restaurant name, address, phone, hours
- Menu items and prices
- Reviews
- Image paths
- Social links
- FAQ content
- Sample orders (for the demo dashboard)

## 🖼️ Replacing Images

1. Add your photos to `public/images/`
2. Update the image path in `src/data/restaurant.js`
3. Change `imageSource` from `"ai-sample"` to `"real"` to remove the "Sample image" tag

## 🔐 Demo Owner Login

- **Email:** `owner@demo.com`
- **Password:** `demo1234`

⚠️ This is a demo-only login. Not secure for production use.

## 🌐 Deploy on Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) and click "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Netlify auto-detects settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20
5. Click "Deploy site"

## 🛠️ Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Lucide React (icons)
- No backend needed

## 📱 Features

- Fully responsive (mobile-first)
- Menu with search, filters, and cart
- Demo checkout with fake payment
- Owner dashboard with order management
- Table booking with WhatsApp integration
- Google Maps embed
- Smooth animations (respects prefers-reduced-motion)
