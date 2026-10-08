import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import "../styles/admin-theme.css";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDesktop = () => setCollapsed((value) => !value)
  const toggleMobile = () => setMobileOpen((value) => !value)

  return (
    <div id="wrapper" className={mobileOpen ? 'mobile-sidebar-open' : ''}>
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => { if (window.innerWidth < 768) setMobileOpen(false); else toggleDesktop() }} />
      {mobileOpen && <button className="sidebar-overlay d-md-none" type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar onMobileToggle={toggleMobile} />
          <main className="container-fluid dashboard-main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
