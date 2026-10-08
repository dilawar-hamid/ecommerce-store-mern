# React SB Admin 2 Dashboard

This project converts the useful visual shell from the supplied StartBootstrap SB Admin 2 template into React components.

## Included
- React Router layout with `Outlet`
- Reusable `DashboardLayout`
- React `Sidebar` with Dashboard + Orders menus
- Responsive mobile sidebar toggle
- React `Topbar` with search, alerts, messages and profile dropdowns
- Dashboard and Orders pages
- SB Admin 2 CSS and local Font Awesome assets copied from the supplied template
- No jQuery or Bootstrap JavaScript dependency

## Run

```bash
npm install
npm run dev
```

## Structure

```text
src/
  components/
    Sidebar.jsx
    Topbar.jsx
  layouts/
    DashboardLayout.jsx
  pages/
    Dashboard.jsx
    Orders.jsx
    NotFound.jsx
  styles/
    sb-admin-2.css
  App.jsx
  App.css
  index.css
  main.jsx
```

Add future dashboard pages under `src/pages` and register them inside `src/App.jsx`. The page will automatically render inside the layout through React Router's `Outlet`.
