import React from "react";
import { AiOutlineHeart, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

const sidemenu = () => {
  return (
    <aside className="sidemenu-root">
      <div className="sidemenu-header">
        <img src="" alt="Project logo" className="sidemenu-logo-img" />
        <h2 className="sidemenu-logo-title">Mucicart</h2>
      </div>

      <nav className="sidemenu-nav" aria-label="Main Navigation">
        <ul className="sidemenu-nav-list">
          <li>
            <button className="sidemenu-nav-btn active">
              <AiOutlineHome className="sidemenu-nav-icon" size={18} />
              {/* Home icon */}
              <span>Home</span>
            </button>
          </li>

          <li>
            <button className="sidemenu-nav-btn active">
              <AiOutlineSearch className="sidemenu-nav-icon" size={18} />
              <span>Search</span>
            </button>
          </li>

          <li>
            <button className="sidemenu-nav-btn active">
              <AiOutlineHeart className="sidemenu-nav-icon" size={18} />
              <span>My Favoutites</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default sidemenu;
