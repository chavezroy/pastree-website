# Pastree Website

A modern React website for Pastree, a clipboard manager browser extension. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern React Architecture**: Built with Next.js 15 and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: FAQ accordions, search functionality, modals
- **SEO Optimized**: Proper metadata, Open Graph, and Twitter cards
- **Performance**: Optimized images and smooth scrolling
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── report-bug/        # Bug reporting page
│   ├── support/           # Support/help center
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Landing page hero
│   ├── FeaturesSection.tsx # Features showcase
│   ├── DownloadSection.tsx # Download CTA
│   ├── FAQSection.tsx     # FAQ accordion
│   ├── SupportHero.tsx    # Support page hero
│   ├── SupportCategories.tsx # Support categories
│   ├── SupportArticles.tsx # Support articles
│   └── ContactSupport.tsx # Contact options
└── public/                # Static assets
    ├── icons/             # Extension icons
    ├── favicon.png        # Site favicon
    └── og-pastree.png     # Social media image
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chavezroy/pastree-website.git
cd pastree-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Pages

- **Homepage** (`/`) - Landing page with hero, features, download, and FAQ
- **Support** (`/support`) - Help center with search and articles
- **About** (`/about`) - Company information and mission
- **Report Bug** (`/report-bug`) - Bug reporting form

## 🎨 Design System

### Colors
- **Primary Orange**: `#ed8e5b` (Pastree Orange)
- **Dark**: `#212529` (Navigation/Footer)
- **Light**: `#f8f9fa` (Background)

### Typography
- **Font**: System font stack (San Francisco, Segoe UI, etc.)
- **Smooth scrolling** and **custom scrollbar**

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 📄 License

This project is part of the Pastree browser extension ecosystem.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Pastree** - Organize your clipboard, boost your productivity.