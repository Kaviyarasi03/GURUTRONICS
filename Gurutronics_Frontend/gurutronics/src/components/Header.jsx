import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo_homePage.png";

const Icon = ({ name, size = 24 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    cart: (
      <svg {...common}>
        <path d="M3 4h2l2 10h11l2-6H7" />
        <circle cx="10" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
    ),
    menu: (
      <svg {...common}>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg {...common}>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    ),
  };

  return icons[name];
};

export default function Header({ cartCount = 0 }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    ["Home", "/"],
    ["Products", "/products"],
    ["Services", "/services"],
    ["About Us", "/about"],
  ];

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b border-[#3a260f] bg-[#120a04]/95 shadow-[0_6px_24px_rgba(0,0,0,0.45)] lg:backdrop-blur-md">
      <div className="absolute left-0 top-0 hidden h-[2px] w-[220px] bg-gradient-to-r from-transparent via-[#ffbf3f] to-transparent lg:block lg:animate-headerLine" />

      <div className="pointer-events-none absolute left-[8%] top-4 hidden h-16 w-16 rounded-full bg-[#e3a538]/15 blur-2xl lg:block" />
      <div className="pointer-events-none absolute right-[15%] top-8 hidden h-20 w-20 rounded-full bg-[#ffbf3f]/10 blur-2xl lg:block" />

      <div className="relative mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-4 sm:h-[82px] sm:px-6 lg:h-[90px] lg:px-10">
        <Link to="/" className="group relative flex shrink-0 items-center">
          <span className="absolute inset-0 hidden rounded-full bg-[#e3a538]/20 blur-xl transition-all duration-500 group-hover:scale-110 lg:block" />

          <img
            src={logo}
            alt="Gurutronics"
            className="relative h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[62px] lg:h-[72px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-[#e3a538]/35 bg-gradient-to-r from-[#1a1007]/95 via-[#2a1808]/90 to-[#1a1007]/95 p-2 shadow-[0_0_22px_rgba(227,165,56,0.16)] lg:flex">
          {navItems.map(([label, path]) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`group relative overflow-hidden rounded-full px-[24px] py-[10px] text-[15px] font-semibold tracking-wide transition-transform duration-300 hover:-translate-y-1 hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ffbf3f] to-[#e3a538] text-black shadow-[0_0_18px_rgba(227,165,56,0.45)]"
                    : "text-[#f3dfb8]/80 hover:bg-[#3a220c]/80 hover:text-[#ffbf3f]"
                }`}
              >
                {!isActive && (
                  <span className="absolute inset-0 hidden -translate-x-full bg-gradient-to-r from-transparent via-[#ffbf3f]/30 to-transparent transition-transform duration-500 group-hover:translate-x-full lg:block" />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#e3a538]/30 bg-[#120a04]/95 text-[#ffbf3f] shadow-[0_6px_20px_rgba(0,0,0,.4)] transition-transform duration-300 hover:scale-105 hover:bg-[#e3a538] hover:text-black lg:h-auto lg:w-auto lg:gap-4 lg:rounded-full lg:px-5 lg:py-3"
          >
            <Icon name="cart" size={22} />

            <div className="hidden flex-col lg:flex">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#dba13a]">
                Shopping
              </span>
              <span className="text-sm font-bold text-[#fff2c8]">Cart</span>
            </div>

            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#ffbf3f] to-[#e3a538] px-1 text-[11px] font-black text-black shadow-[0_0_12px_rgba(227,165,56,.55)] lg:static lg:h-8 lg:min-w-8 lg:px-2 lg:text-xs">
              {cartCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#5a3a18] text-[#e3a538] transition-colors duration-300 hover:bg-[#e3a538] hover:text-[#120a04] lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#3a260f] bg-[#120a04] px-4 py-4 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2">
            {navItems.map(([label, path]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors duration-300 ${
                  location.pathname === path
                    ? "bg-[#e3a538] text-[#120a04]"
                    : "bg-[#1f1208] text-[#e6d6bd] hover:bg-[#e3a538] hover:text-[#120a04]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}