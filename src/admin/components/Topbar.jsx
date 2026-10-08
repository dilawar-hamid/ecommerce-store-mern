import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Topbar({ onMobileToggle }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const location = useLocation()
  const title = location.pathname === '/orders' ? 'Orders' : 'Dashboard'

  const closeOthers = (type) => {
    if (type !== 'profile') setProfileOpen(false)
    if (type !== 'alerts') setAlertsOpen(false)
    if (type !== 'messages') setMessagesOpen(false)
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" type="button" onClick={onMobileToggle} aria-label="Open menu">
        <i className="fa fa-bars" />
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input className="form-control bg-light border-0 small" placeholder={`Search ${title.toLowerCase()}...`} aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit"><i className="fas fa-search fa-sm" /></button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow mx-1">
          <button className="nav-link dropdown-toggle topbar-icon-button" type="button" onClick={() => { closeOthers('alerts'); setAlertsOpen(!alertsOpen) }} aria-expanded={alertsOpen}>
            <i className="fas fa-bell fa-fw" />
            <span className="badge badge-danger badge-counter">3+</span>
          </button>
          {alertsOpen && (
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in show topbar-dropdown">
              <h6 className="dropdown-header">Alerts Center</h6>
              <div className="dropdown-item d-flex align-items-center"><div className="mr-3"><div className="icon-circle bg-primary"><i className="fas fa-file-alt text-white" /></div></div><span>New dashboard report is ready.</span></div>
              <div className="dropdown-item d-flex align-items-center"><div className="mr-3"><div className="icon-circle bg-success"><i className="fas fa-check text-white" /></div></div><span>Your order was updated.</span></div>
              <div className="dropdown-item text-center small text-gray-500">Show All Alerts</div>
            </div>
          )}
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <button className="nav-link dropdown-toggle topbar-icon-button" type="button" onClick={() => { closeOthers('messages'); setMessagesOpen(!messagesOpen) }} aria-expanded={messagesOpen}>
            <i className="fas fa-envelope fa-fw" />
            <span className="badge badge-danger badge-counter">7</span>
          </button>
          {messagesOpen && (
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in show topbar-dropdown">
              <h6 className="dropdown-header">Message Center</h6>
              <div className="dropdown-item"><div className="font-weight-bold">You have 7 new messages.</div><div className="small text-gray-500">Click to open your inbox.</div></div>
              <div className="dropdown-item text-center small text-gray-500">Read More Messages</div>
            </div>
          )}
        </li>

        <div className="topbar-divider d-none d-sm-block" />

        <li className="nav-item dropdown no-arrow">
          <button className="nav-link dropdown-toggle topbar-profile-button" type="button" onClick={() => { closeOthers('profile'); setProfileOpen(!profileOpen) }} aria-expanded={profileOpen}>
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin User</span>
            <img className="img-profile rounded-circle" src="/vendor/fontawesome-free/webfonts/fa-solid-900.woff2" alt="" style={{ display: 'none' }} />
            <span className="profile-avatar"><i className="fas fa-user" /></span>
          </button>
          {profileOpen && (
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in show topbar-dropdown">
              <button className="dropdown-item" type="button"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />Profile</button>
              <button className="dropdown-item" type="button"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />Settings</button>
              <button className="dropdown-item" type="button"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />Activity Log</button>
              <div className="dropdown-divider" />
              <button className="dropdown-item" type="button"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />Logout</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}
