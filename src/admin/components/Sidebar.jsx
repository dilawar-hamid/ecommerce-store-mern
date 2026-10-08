import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "fas fa-tachometer-alt",
  },
  {
    to: "/addcat",
    label: "Add Category",
    icon: "fas fa-folder-plus",
  },
  {
    to: "/showcat",
    label: "Show Category",
    icon: "fas fa-list",
  },
  {
    to: "/addpro",
    label: "Add Products",
    icon: "fas fa-plus-square",
  },
  {
    to: "/showpro",
    label: "Show Products",
    icon: "fas fa-boxes",
  },
  {
    to: "/orders",
    label: "Orders",
    icon: "fas fa-shopping-cart",
  },
  {
    to: "/",
    label: "Back To Home",
    icon: "fas fa-home",
  },
];

export default function Sidebar({ collapsed, mobileOpen, onToggle }) {
  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
        collapsed ? "toggled" : ""
      } ${mobileOpen ? "mobile-open" : ""}`}
      id="accordionSidebar"
    >
      {/* Sidebar Brand */}
      <NavLink
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/dashboard"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-layer-group" />
        </div>

        <div className="sidebar-brand-text mx-3">
          Admin <sup>2</sup>
        </div>
      </NavLink>

      <hr className="sidebar-divider my-0" />

      {/* Menu Items */}
      {menuItems.map((item) => (
        <li className="nav-item" key={item.to}>
          <NavLink
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to={item.to}
            onClick={onToggle}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        </li>
      ))}

      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggle */}
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          type="button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        />
      </div>
    </ul>
  );
}
