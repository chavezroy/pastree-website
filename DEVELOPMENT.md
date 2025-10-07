# Pastree Website Development Context

## Project Overview
**Pastree** is a modern React website for the Pastree clipboard manager browser extension. The website showcases the product features, provides download links, and offers support resources.

## Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS v4 (alpha/beta) - **CRITICAL: Uses new CSS-first approach**
- **Language**: TypeScript
- **Package Manager**: npm
- **PostCSS**: @tailwindcss/postcss v4

## Directory Structure
```
pastree-webdev/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Tailwind v4 configuration (CRITICAL FILE)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── icon.png            # Favicon (Next.js 13+ convention)
│   │   ├── about/              # About page
│   │   ├── support/            # Support pages
│   │   └── report-bug/         # Bug report page
│   └── components/             # React components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── HeroSection.tsx
│       ├── SupportHero.tsx
│       ├── SupportCategories.tsx
│       └── ... (other components)
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Dependencies and scripts
└── DEVELOPMENT.md              # This file
```

## Tailwind CSS v4 Configuration Approach

### ⚠️ CRITICAL: This project uses Tailwind v4, NOT v3!

**Key Differences:**
- ❌ **NO** `tailwind.config.js` file (deleted)
- ✅ **Uses** `@theme` block in `globals.css`
- ✅ **CSS custom properties** define colors and utilities
- ✅ **Auto-generates** utility classes from CSS variables

### Configuration Location
**File**: `src/app/globals.css`

**Structure**:
```css
@import "tailwindcss";

@theme {
  /* CSS custom properties define the theme */
  --color-pastree-orange: #ed8e5b;
  --color-pastree-orange-hover: #e77c43;
  --color-pastree-dark: #212529;
  --color-pastree-light: #f8f9fa;
  --color-pastree-purple: #907BA2;
  --color-pastree-purple-hover: #7e6d90;
  
  /* Background images/gradients */
  --background-image-hero-gradient: linear-gradient(261deg, #FFCF98 17.53%, #FFECE0 88.29%);
  --background-image-hero-support-gradient: linear-gradient(261deg, #FFCF98 17.53%, #FFECE0 88.29%);
  --background-image-orange-gradient: linear-gradient(135deg, #ed8e5b, #f4a261);
  --background-image-purple-gradient: linear-gradient(135deg, #ED8E5B 50%, #907BA2);
  
  /* Box shadows */
  --box-shadow-pastree: 0 12px 30px rgba(237, 142, 91, 0.15);
  --box-shadow-focus-orange: 0 0 0 3px rgba(237, 142, 91, 0.25);
  --box-shadow-focus-orange-strong: 0 0 0 4px rgba(237, 142, 91, 0.4);
}

/* Custom utilities that Tailwind can't handle */
.text-gradient { /* custom implementation */ }
.hover-shadow-pastree:hover { /* custom implementation */ }
.focus-glow-orange:focus { /* custom implementation */ }
.section-divider { /* custom implementation */ }
```

### How Tailwind v4 Works
1. **CSS Variables** in `@theme` block define the design system
2. **Tailwind auto-generates** utility classes from these variables:
   - `--color-pastree-orange` → `bg-pastree-orange`, `text-pastree-orange`, `border-pastree-orange`
   - `--background-image-hero-gradient` → `bg-hero-gradient`
   - `--box-shadow-pastree` → `shadow-pastree`
3. **Custom utilities** are defined manually in CSS

## Design System

### Colors
- **Primary Orange**: `#ed8e5b` (`pastree-orange`)
- **Orange Hover**: `#e77c43` (`pastree-orange-hover`)
- **Dark**: `#212529` (`pastree-dark`)
- **Light**: `#f8f9fa` (`pastree-light`)
- **Purple**: `#907BA2` (`pastree-purple`)
- **Purple Hover**: `#7e6d90` (`pastree-purple-hover`)

### Gradients
- **Hero**: `linear-gradient(261deg, #FFCF98 17.53%, #FFECE0 88.29%)`
- **Hero Support**: Same as hero (for support pages)
- **Orange**: `linear-gradient(135deg, #ed8e5b, #f4a261)`
- **Purple**: `linear-gradient(135deg, #ED8E5B 50%, #907BA2)`

### Custom Utilities
- **Text Gradients**: `.text-gradient`, `.text-gradient-purple`
- **Hover Effects**: `.hover-shadow-pastree`
- **Focus States**: `.focus-glow-orange`, `.focus-glow-orange-strong`
- **Section Dividers**: `.section-divider`

## Development Workflow

### Starting the Development Server
```bash
# Always run from pastree-webdev directory
cd pastree-webdev && npm run dev

# Server runs on: http://localhost:3000
```

### Important Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Directory navigation (CRITICAL)
cd pastree-webdev    # Always navigate to project directory first
```

### Shell Session Persistence
⚠️ **IMPORTANT**: Each terminal command starts a new shell session. Use:
```bash
cd pastree-webdev && npm run dev    # ✅ Correct
cd pastree-webdev                   # ❌ Won't persist
npm run dev                         # ❌ Wrong directory
```

## Common Issues & Solutions

### Issue: "Cannot apply unknown utility class"
**Cause**: CSS variable not defined in `@theme` block
**Solution**: Add variable to `@theme` block in `globals.css`

### Issue: Styles not applying
**Cause**: Missing `@import "tailwindcss"`
**Solution**: Ensure `globals.css` starts with `@import "tailwindcss"`

### Issue: Build fails with Tailwind errors
**Cause**: Using Tailwind v3 syntax in v4 project
**Solution**: 
- Remove any `tailwind.config.js` files
- Use `@theme` block instead of config file
- Define colors as CSS variables

### Issue: "no such file or directory" errors
**Cause**: Running commands from wrong directory
**Solution**: Always use `cd pastree-webdev && command`

### Issue: Port conflicts (3000, 3001)
**Cause**: Other Next.js servers running
**Solution**:
```bash
# Find processes using ports
lsof -i :3000
lsof -i :3001

# Kill specific processes
kill -9 [PID]

# Or kill all Next.js processes
pkill -f "next dev"
```

## File Conventions

### Favicon
- **Location**: `src/app/icon.png`
- **Format**: PNG (Next.js 13+ App Router convention)
- **Note**: Renamed from `favicon.png` to `icon.png`

### Component Structure
```typescript
'use client'; // Only if needed for client-side features

export default function ComponentName() {
  return (
    <section className="bg-pastree-light py-20">
      {/* Use Tailwind v4 classes */}
      <div className="bg-pastree-orange text-white">
        {/* Content */}
      </div>
    </section>
  );
}
```

### CSS Custom Properties
- **Colors**: `--color-pastree-[name]`
- **Gradients**: `--background-image-[name]-gradient`
- **Shadows**: `--box-shadow-[name]`

## Dependencies

### Key Packages
```json
{
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "critters": "^0.0.23"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "typescript": "^5",
    "eslint": "^9"
  }
}
```

### Critical Dependencies
- **`critters`**: Required for CSS optimization (was missing, now installed)
- **`@tailwindcss/postcss`**: Tailwind v4 PostCSS plugin
- **`tailwindcss`**: v4 (alpha/beta version)

## Git Workflow

### Branch Strategy
- **`main`**: Production-ready code
- **`develop`**: Development branch
- **`feature/*`**: Feature branches
- **`backup/*`**: Backup branches before major changes

### Commit Messages
```
feat: add support page with Tailwind v4 styling
fix: resolve bg-hero-support-gradient missing definition
docs: update development context
```

## Monitoring & Health Checks

### Build Validation
```bash
# Check if build succeeds
npm run build

# Validate CSS compilation
curl -s http://localhost:3000 | grep -o 'bg-pastree-orange' | head -3
```

### Style Validation
- All `bg-pastree-*` classes should render
- All `text-pastree-*` classes should render
- All `hover:*` states should work
- All gradients should display

## Troubleshooting Checklist

1. ✅ **Directory**: Am I in `pastree-webdev/`?
2. ✅ **Tailwind**: Using v4 syntax, not v3?
3. ✅ **CSS**: `@import "tailwindcss"` at top of `globals.css`?
4. ✅ **Variables**: All colors defined in `@theme` block?
5. ✅ **Server**: Running on correct port (3000)?
6. ✅ **Dependencies**: All packages installed (`npm install`)?

## Contact & Support

- **Repository**: https://github.com/chavezroy/pastree-website
- **Website**: https://pastr.ee
- **Issues**: Use GitHub issues for bugs and feature requests

---

**Last Updated**: January 7, 2025
**Tailwind Version**: v4 (alpha/beta)
**Next.js Version**: 15.5.4
**Status**: ✅ Working with all styles applied
