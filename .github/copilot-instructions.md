# Copilot Instructions for Website (Next.js)

## Project Overview

- **Framework:** Next.js (React-based, SSR/SSG)
- **Hosting:** Vercel (auto-deploy on push), previously Firebase
- **Content:** Blog posts in `_posts/` (Markdown), site data in `data/` (JSON)

## Key Structure & Patterns

- **Pages:** `pages/` (Next.js routing, dynamic blog: `pages/blog/[slug].js`)
- **Components:** `components/` (atomic, grouped by feature, e.g., `Blog/`, `Navbar/`, `Section/`)
- **Styling:** SASS modules in `stylesheets/` and global styles in `globals.sass`
- **Assets:** `public/` for static files, `assets/` for design/source files
- **Data:** All site content (about, blog, projects, etc.) in `data/*.json` and `_posts/*.md`
- **Lib:** `lib/api.js` for data fetching/processing
- **Utils:** `utils/` for helpers (JSX, SASS, constants)

## Developer Workflows

- **Install:** `yarn install`
- **Dev server:** `yarn start` (or `yarn dev` if available)
- **Build:** `yarn build`
- **Deploy:** Push to `master` auto-deploys to Vercel
- **Blog post:** Add Markdown to `_posts/`, update `data/blog.json` if needed

## Project-Specific Conventions

- **Component Naming:** PascalCase for React components, grouped by feature
- **Data Flow:** Data loaded from JSON/Markdown, passed as props to components
- **Blog Routing:** Slugs auto-generated from `_posts/*.md` filenames
- **No Redux/MobX:** State is local/component-level or via props
- **SASS Modules:** Use `.module.sass` for component styles, import as needed
- **Image Handling:** Use Next.js `<Image>` or custom `ImageWithFallback.jsx`
- **Meta/SEO:** Managed via `components/Util/MetaGenerator.jsx`

## Integration Points

- **External:** GitHub stats, YouTube/Twitch embeds, Vercel/Firebase hosting
- **Custom Animations:** In `components/Animations/` and `assets/arrowAnimation/`
- **Resume:** Structured in `data/resume/`

## Examples

- **Add a new blog post:**
  1. Create `my-new-post.md` in `_posts/`
  2. (If needed) Add entry to `data/blog.json`
  3. Access at `/blog/my-new-post`
- **Add a new skill/project:** Update `data/personalSkills.json` or `data/projects.json`

## References

- See `README.md` for setup and links to video walkthroughs
- For design assets, check `assets/` and `public/`
- For custom logic, see `lib/api.js` and `components/Util/`

---
