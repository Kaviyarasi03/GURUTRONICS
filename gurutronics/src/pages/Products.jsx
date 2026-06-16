import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {  useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import productBg from "../assets/product_bg.png";
import h10 from "../assets/h10.png";
import h11 from "../assets/h11.png";
import h12 from "../assets/h12.png";
import h13 from "../assets/h13.png";
import h14 from "../assets/h14.png";

/* ─────────── Tiny SVG Icon System ─────────── */
const Icon = ({ name, size = 22, className = "" }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  };
  const icons = {
    search: <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
    cart: <svg {...common}><path d="M3 4h2l2 10h11l2-6H7" /><circle cx="10" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>,
    grid: <svg {...common}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></svg>,
    list: <svg {...common}><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" /></svg>,
    laptop: <svg {...common}><rect x="5" y="5" width="14" height="10" rx="1.5" /><path d="M3 19h18" /></svg>,
    cpu: <svg {...common}><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" /></svg>,
    game: <svg {...common}><path d="M7 9h10a4 4 0 0 1 4 4l-1 3a2 2 0 0 1-3 1l-3-3h-4l-3 3a2 2 0 0 1-3-1l-1-3a4 4 0 0 1 4-4Z" /></svg>,
    camera: <svg {...common}><path d="M4 8h4l2-2h4l2 2h4v11H4V8Z" /><circle cx="12" cy="13.5" r="3" /></svg>,
    sun: <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>,
    truck: <svg {...common}><path d="M3 7h11v9H3z" /><path d="M14 10h3l4 4v2h-7" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></svg>,
    heart: <svg {...common}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    star: <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    filter: <svg {...common}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    x: <svg {...common}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    chevronDown: <svg {...common}><polyline points="6 9 12 15 18 9" /></svg>,
    check: <svg {...common}><polyline points="20 6 9 20 4 15" /></svg>,
    chevronLeft: <svg {...common}><polyline points="15 18 9 12 15 6" /></svg>,
    menu: <svg {...common}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  };
  return icons[name] || icons.grid;
};

/* ─────────── Animation Hook ─────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────── Stagger Reveal Hook ─────────── */
function useStaggerReveal(deps = []) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll("[data-stagger]");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "none";
      const timer = setTimeout(() => {
        el.style.transition = `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 30);
      return () => clearTimeout(timer);
    });
  }, deps);
  return containerRef;
}

/* ─────────── Magnetic Button ─────────── */
function MagneticButton({ children, className, onClick, disabled, style }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const pull = 0.25;
    ref.current.style.transform = `translate(${x * pull}px, ${y * pull}px) scale(1.04)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0) scale(1)";
  };
  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}

/* ─────────── Cursor Glow ─────────── */
function CursorGlow() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    const animate = () => {
      if (ref.current) {
        ref.current.style.left = pos.current.x + "px";
        ref.current.style.top = pos.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        width: 340,
        height: 340,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(219,161,58,0.07) 0%, transparent 70%)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
        display: window.innerWidth < 768 ? "none" : "block",
      }}
    />
  );
}

/* ─────────── Floating Particles ─────────── */
function Particles({ count = 18 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.1,
    })), [count]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: var(--op); }
          50% { transform: translateY(-40px) scale(1.2); opacity: calc(var(--op) * 0.6); }
          100% { transform: translateY(0) scale(1); opacity: var(--op); }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#dba13a",
            "--op": p.opacity,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── Counter Animation ─────────── */
function AnimatedCounter({ target, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

/* ─────────── Toast Notification ─────────── */
function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 10000,
        background: "linear-gradient(135deg, #1a0d03, #2d1505)",
        color: "#f7ead8",
        border: "1px solid #dba13a",
        borderRadius: 16,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: "none",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      <span style={{ color: "#dba13a", fontSize: 18 }}>✓</span>
      {message}
    </div>
  );
}

/* ─────────── Product Data ─────────── */
const PRODUCTS = [
  { id: 1, tag: "BESTSELLER", category: "Computer Parts", subcategory: "RAM", brand: "Corsair", name: "Corsair 16GB DDR4 3200MHz Desktop RAM", price: 4299, oldPrice: 4999, rating: 4.8, reviews: 128, inStock: true, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=800&auto=format&fit=crop" },
  { id: 2, category: "Computer Parts", subcategory: "SSD", brand: "Samsung", name: "Samsung 1TB SATA SSD", price: 6299, oldPrice: 7299, rating: 4.6, reviews: 91, inStock: true, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop" },
  { id: 3, category: "Computer Parts", subcategory: "HDD", brand: "Seagate", name: "Seagate Barracuda 2TB Desktop HDD", price: 5499, oldPrice: 6299, rating: 4.4, reviews: 76, inStock: true, image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?q=80&w=800&auto=format&fit=crop" },
  { id: 4, category: "Computer Parts", subcategory: "Cabinet", brand: "Ant Esports", name: "Ant Esports Gaming Cabinet RGB", price: 3799, oldPrice: 4599, rating: 4.3, reviews: 62, inStock: true, image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?q=80&w=800&auto=format&fit=crop" },
  { id: 5, category: "Computer Parts", subcategory: "Processor", brand: "Intel", name: "Intel Core i5 12400F Processor", price: 13999, oldPrice: 15999, rating: 4.7, reviews: 98, inStock: true, image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=800&auto=format&fit=crop" },
  { id: 6, category: "Laptop Spares", subcategory: "Laptop Battery", brand: "HP", name: "HP Original Laptop Replacement Battery", price: 3499, oldPrice: 4299, rating: 4.1, reviews: 48, inStock: true, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop" },
  { id: 7, category: "Laptop Spares", subcategory: "Laptop Charger", brand: "Dell", name: "Dell 65W Original Laptop Charger", price: 2299, oldPrice: 2799, rating: 4.3, reviews: 63, inStock: true, image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800&auto=format&fit=crop" },
  { id: 8, category: "Laptop Spares", subcategory: "Laptop Keyboard", brand: "Lenovo", name: "Lenovo Laptop Keyboard Replacement", price: 1899, oldPrice: 2399, rating: 4.2, reviews: 42, inStock: true, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop" },
  { id: 9, category: "Laptop Spares", subcategory: "Laptop Screen", brand: "Acer", name: "Acer 15.6 Inch Laptop LED Screen", price: 4999, oldPrice: 5799, rating: 4.4, reviews: 58, inStock: false, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" },
  { id: 10, category: "Laptop Spares", subcategory: "Cooling Fan", brand: "Asus", name: "Asus Laptop Internal Cooling Fan", price: 1299, oldPrice: 1799, rating: 4.0, reviews: 33, inStock: true, image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=800&auto=format&fit=crop" },
  { id: 11, tag: "TRENDING", category: "Gaming Zone", subcategory: "Gaming Mouse", brand: "Razer", name: "Razer DeathAdder Gaming Mouse", price: 3999, oldPrice: 4599, rating: 4.7, reviews: 111, inStock: true, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop" },
  { id: 12, category: "Gaming Zone", subcategory: "Gaming Keyboard", brand: "ASUS", name: "ASUS TUF Mechanical Gaming Keyboard", price: 5499, oldPrice: 6499, rating: 4.6, reviews: 88, inStock: true, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop" },
  { id: 13, category: "Gaming Zone", subcategory: "Gaming Headset", brand: "HyperX", name: "HyperX RGB Gaming Headset", price: 4999, oldPrice: 5899, rating: 4.6, reviews: 86, inStock: true, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop" },
  { id: 14, category: "Gaming Zone", subcategory: "Game Controller", brand: "Redgear", name: "Redgear Wireless Game Controller", price: 1899, oldPrice: 2399, rating: 4.2, reviews: 71, inStock: true, image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=800&auto=format&fit=crop" },
  { id: 15, category: "Gaming Zone", subcategory: "RGB Accessories", brand: "Zebronics", name: "Zebronics RGB Gaming Light Strip", price: 999, oldPrice: 1499, rating: 4.1, reviews: 40, inStock: true, image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800&auto=format&fit=crop" },
  { id: 16, category: "CCTV Cameras", subcategory: "Bullet Camera", brand: "CP PLUS", name: "CP PLUS 2MP Full HD Bullet Camera", price: 2999, oldPrice: 3499, rating: 4.3, reviews: 89, inStock: true, image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=800&auto=format&fit=crop" },
  { id: 17, category: "CCTV Cameras", subcategory: "Dome Camera", brand: "Hikvision", name: "Hikvision 5MP Dome Security Camera", price: 4199, oldPrice: 4899, rating: 4.6, reviews: 84, inStock: true, image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop" },
  { id: 18, category: "CCTV Cameras", subcategory: "Wireless CCTV", brand: "TP-Link", name: "TP-Link Tapo Wireless CCTV Camera", price: 2499, oldPrice: 2999, rating: 4.5, reviews: 65, inStock: true, image: "https://images.unsplash.com/photo-1580667893727-6a58d5947f2d?q=80&w=800&auto=format&fit=crop" },
  { id: 19, category: "CCTV Cameras", subcategory: "Night Vision Camera", brand: "Dahua", name: "Dahua Night Vision Security Camera", price: 3599, oldPrice: 4299, rating: 4.4, reviews: 57, inStock: true, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop" },
  { id: 20, category: "CCTV Cameras", subcategory: "DVR", brand: "CP PLUS", name: "CP PLUS 4 Channel DVR Recorder", price: 5199, oldPrice: 5999, rating: 4.2, reviews: 45, inStock: false, image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop" },
  { id: 21, category: "Solar Panels", subcategory: "Mono Panels", brand: "Loom Solar", name: "Loom Solar 180 Watt Mono Panel", price: 8999, oldPrice: 10500, rating: 4.5, reviews: 54, inStock: true, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" },
  { id: 22, category: "Solar Panels", subcategory: "Poly Panels", brand: "Adani Solar", name: "Adani 200W Polycrystalline Solar Panel", price: 11999, oldPrice: 13599, rating: 4.5, reviews: 67, inStock: true, image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=800&auto=format&fit=crop" },
  { id: 23, category: "Solar Panels", subcategory: "Solar Battery", brand: "Exide", name: "Exide Solar Tubular Battery", price: 14999, oldPrice: 16999, rating: 4.4, reviews: 72, inStock: true, image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=800&auto=format&fit=crop" },
  { id: 24, category: "Solar Panels", subcategory: "Solar Inverter", brand: "Microtek", name: "Microtek Solar Hybrid Inverter", price: 9999, oldPrice: 11499, rating: 4.2, reviews: 41, inStock: true, image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop" },
  { id: 25, category: "Solar Panels", subcategory: "Solar Controller", brand: "Luminous", name: "Luminous Solar Charge Controller", price: 1999, oldPrice: 2599, rating: 4.1, reviews: 37, inStock: true, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" },
  { id: 26, category: "Accessories", subcategory: "Headphones", brand: "Sony", name: "Sony Wireless Noise Cancelling Headphones", price: 21999, oldPrice: 24999, rating: 4.9, reviews: 143, inStock: true, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
  { id: 27, category: "Accessories", subcategory: "Bluetooth Speaker", brand: "Boat", name: "Boat Portable Bluetooth Speaker", price: 1499, oldPrice: 1999, rating: 4.1, reviews: 77, inStock: true, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop" },
  { id: 28, category: "Accessories", subcategory: "Keyboard", brand: "Logitech", name: "Logitech Wireless Keyboard", price: 1899, oldPrice: 2399, rating: 4.4, reviews: 73, inStock: true, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop" },
  { id: 29, category: "Accessories", subcategory: "Mouse", brand: "HP", name: "HP Wireless Optical Mouse", price: 799, oldPrice: 1199, rating: 4.0, reviews: 35, inStock: true, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop" },
  { id: 30, category: "Accessories", subcategory: "USB Hub", brand: "Portronics", name: "Portronics 4 Port USB Hub", price: 699, oldPrice: 999, rating: 4.2, reviews: 44, inStock: true, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=800&auto=format&fit=crop" },
  { id: 31, category: "Networking", subcategory: "WiFi Router", brand: "TP-Link", name: "TP-Link Dual Band WiFi Router", price: 2499, oldPrice: 2999, rating: 4.2, reviews: 61, inStock: true, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?q=80&w=800&auto=format&fit=crop" },
  { id: 32, category: "Networking", subcategory: "LAN Cable", brand: "D-Link", name: "D-Link CAT6 LAN Cable 20 Meter", price: 499, oldPrice: 799, rating: 4.1, reviews: 28, inStock: true, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" },
  { id: 33, category: "Networking", subcategory: "Network Switch", brand: "Netgear", name: "Netgear 8 Port Gigabit Switch", price: 3199, oldPrice: 3799, rating: 4.2, reviews: 44, inStock: true, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
  { id: 34, category: "Networking", subcategory: "Access Point", brand: "Ubiquiti", name: "Ubiquiti UniFi Wireless Access Point", price: 8999, oldPrice: 10499, rating: 4.7, reviews: 52, inStock: true, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" },
  { id: 35, category: "Networking", subcategory: "Range Extender", brand: "TP-Link", name: "TP-Link WiFi Range Extender", price: 1799, oldPrice: 2299, rating: 4.3, reviews: 50, inStock: true, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?q=80&w=800&auto=format&fit=crop" },
  { id: 36, tag: "HOT", category: "Computer Parts", subcategory: "RAM", brand: "Kingston", name: "Kingston Fury Beast 32GB DDR5 RAM", price: 9999, oldPrice: 10999, rating: 4.7, reviews: 119, inStock: true, image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=800&auto=format&fit=crop" },
  { id: 37, category: "Laptop Spares", subcategory: "Laptop Charger", brand: "Lenovo", name: "Lenovo 65W Slim Laptop Charger", price: 2199, oldPrice: 2699, rating: 4.2, reviews: 49, inStock: true, image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800&auto=format&fit=crop" },
  { id: 38, category: "Gaming Zone", subcategory: "Gaming Mouse", brand: "Logitech", name: "Logitech G102 Lightsync Gaming Mouse", price: 1699, oldPrice: 2199, rating: 4.5, reviews: 96, inStock: true, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop" },
  { id: 39, category: "CCTV Cameras", subcategory: "NVR", brand: "Hikvision", name: "Hikvision 8 Channel NVR Recorder", price: 6999, oldPrice: 7999, rating: 4.3, reviews: 39, inStock: true, image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop" },
  { id: 40, category: "Solar Panels", subcategory: "Solar Wires", brand: "Polycab", name: "Polycab Solar DC Cable 30 Meter", price: 1599, oldPrice: 1999, rating: 4.0, reviews: 24, inStock: true, image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop" },
  { id: 41, category: "Accessories", subcategory: "Webcam", brand: "Logitech", name: "Logitech HD USB Webcam", price: 2999, oldPrice: 3599, rating: 4.4, reviews: 68, inStock: true, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop" },
  { id: 42, category: "Networking", subcategory: "Modem", brand: "D-Link", name: "D-Link Broadband WiFi Modem", price: 2299, oldPrice: 2799, rating: 4.1, reviews: 31, inStock: false, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?q=80&w=800&auto=format&fit=crop" },
  { id: 43, category: "Computer Parts", subcategory: "Motherboard", brand: "MSI", name: "MSI B550M PRO-VDH WiFi Motherboard", price: 8699, oldPrice: 9999, rating: 4.7, reviews: 96, inStock: true, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
  { id: 44, category: "Computer Parts", subcategory: "SSD", brand: "WD", name: "WD Blue 1TB NVMe SSD", price: 6799, oldPrice: 7499, rating: 4.6, reviews: 112, inStock: true, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop" },
  { id: 45, category: "Laptop Spares", subcategory: "Laptop Hinges", brand: "Dell", name: "Dell Laptop Hinges Replacement Set", price: 999, oldPrice: 1499, rating: 4.0, reviews: 27, inStock: true, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop" },
  { id: 46, category: "Gaming Zone", subcategory: "Gaming Chair", brand: "Green Soul", name: "Green Soul Ergonomic Gaming Chair", price: 12999, oldPrice: 14999, rating: 4.5, reviews: 79, inStock: true, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop" },
  { id: 47, category: "CCTV Cameras", subcategory: "Bullet Camera", brand: "Dahua", name: "Dahua 4MP Outdoor Bullet Camera", price: 3899, oldPrice: 4599, rating: 4.4, reviews: 51, inStock: true, image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=800&auto=format&fit=crop" },
  { id: 48, category: "Solar Panels", subcategory: "Solar Inverter", brand: "Luminous", name: "Luminous 1100VA Solar Inverter", price: 8499, oldPrice: 9999, rating: 4.3, reviews: 45, inStock: true, image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop" },
  { id: 49, category: "Accessories", subcategory: "Mouse", brand: "Dell", name: "Dell Silent Wireless Mouse", price: 899, oldPrice: 1299, rating: 4.1, reviews: 43, inStock: true, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop" },
  { id: 50, category: "Networking", subcategory: "Network Switch", brand: "TP-Link", name: "TP-Link 5 Port Network Switch", price: 1199, oldPrice: 1599, rating: 4.2, reviews: 36, inStock: true, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" },
  { id: 71, category: "Computer Parts", subcategory: "Processor", brand: "AMD", name: "AMD Ryzen 5 7600X Processor", price: 21999, oldPrice: 23999, rating: 4.8, reviews: 115, inStock: true, image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=800&auto=format&fit=crop" },
  { id: 88, category: "Gaming Zone", subcategory: "Game Controller", brand: "Sony", name: "Sony DualSense Wireless Controller", price: 5999, oldPrice: 6999, rating: 4.9, reviews: 145, inStock: true, image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=800&auto=format&fit=crop" },
  { id: 100, category: "Computer Parts", subcategory: "Processor", brand: "Intel", name: "Intel Core i7 13700K Processor", price: 36999, oldPrice: 38999, rating: 4.9, reviews: 158, inStock: true, image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=800&auto=format&fit=crop" },
  { id: 104, category: "Computer Parts", subcategory: "Processor", brand: "AMD", name: "AMD Ryzen 9 7900X Processor", price: 42999, oldPrice: 45999, rating: 4.9, reviews: 169, inStock: true, image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=800&auto=format&fit=crop" },
  { id: 114, category: "Gaming Zone", subcategory: "Game Controller", brand: "Xbox", name: "Xbox Wireless Gaming Controller", price: 6499, oldPrice: 7299, rating: 4.9, reviews: 151, inStock: true, image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=800&auto=format&fit=crop" },
  { id: 142, category: "Computer Parts", subcategory: "Processor", brand: "Intel", name: "Intel Core i9 14900K Processor", price: 58999, oldPrice: 61999, rating: 5.0, reviews: 188, inStock: true, image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORY_UI = [
  { name: "Laptop Spares", icon: "laptop", subcategories: ["Laptop Battery", "Laptop Charger", "Laptop Keyboard", "Laptop Screen", "Laptop Hinges", "Cooling Fan"] },
  { name: "Computer Parts", icon: "cpu", subcategories: ["RAM", "SSD", "HDD", "Cabinet", "Motherboard", "Processor"] },
  { name: "Gaming Zone", icon: "game", subcategories: ["Gaming Mouse", "Gaming Keyboard", "Gaming Headset", "Gaming Chair", "Game Controller", "RGB Accessories"] },
  { name: "CCTV Cameras", icon: "camera", subcategories: ["Bullet Camera", "Dome Camera", "Wireless CCTV", "Night Vision Camera", "DVR", "NVR"] },
  { name: "Solar Panels", icon: "sun", subcategories: ["Mono Panels", "Poly Panels", "Solar Battery", "Solar Inverter", "Solar Controller", "Solar Wires"] },
  { name: "Accessories", icon: "cart", subcategories: ["Headphones", "Bluetooth Speaker", "Keyboard", "Mouse", "USB Hub", "Webcam"] },
  { name: "Networking", icon: "cpu", subcategories: ["WiFi Router", "LAN Cable", "Network Switch", "Access Point", "Modem", "Range Extender"] },
];

const BRANDS = ["Corsair", "MSI", "WD", "Intel", "CP PLUS", "TP-Link", "HP", "Dell", "Lenovo", "Asus", "Samsung", "Sony", "Logitech", "Boat", "Hikvision", "Dahua", "Netgear", "Razer", "AMD"];

const trustItems = [
  { title: "Premium Quality", sub: "Only Original Products", image: h10, icon: "star" },
  { title: "Secure Payments", sub: "100% Safe & Secure", image: h11, icon: "check" },
  { title: "Fast Delivery", sub: "Quick & Reliable", image: h12, icon: "truck" },
  { title: "Easy Returns", sub: "Hassle Free Returns", image: h14, icon: "heart" },
  { title: "24/7 Support", sub: "Always Here to Help", image: h13, icon: "sun" },
];

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;
const discount = (price, old) => Math.round(((old - price) / old) * 100);

/* ─────────── Main Export ─────────── */
export default function Products() {
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = decodeURIComponent(searchParams.get("category") || "All");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availability, setAvailability] = useState("all");
  const [maxPrice, setMaxPrice] = useState(70000);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart.reduce((t, i) => t + i.qty, 0);
    } catch { return 0; }
  };
  const [cartCount, setCartCount] = useState(getCartCount());
  const itemsPerPage = 9;

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2800);
  };

  const categoryCounts = useMemo(() =>
    PRODUCTS.reduce((acc, item) => { acc[item.category] = (acc[item.category] || 0) + 1; return acc; }, {}), []);

  const brandCounts = useMemo(() =>
    PRODUCTS.reduce((acc, item) => { acc[item.brand] = (acc[item.brand] || 0) + 1; return acc; }, {}), []);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory?.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "All") result = result.filter(i => i.category === selectedCategory);
    if (selectedSubCategory !== "All") result = result.filter(i => i.subcategory === selectedSubCategory);
    if (selectedBrands.length > 0) result = result.filter(i => selectedBrands.includes(i.brand));
    if (availability === "in") result = result.filter(i => i.inStock);
    if (availability === "out") result = result.filter(i => !i.inStock);
    result = result.filter(i => i.price <= Number(maxPrice));
    if (sortBy === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high-low") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest") result.sort((a, b) => b.id - a.id);
    if (sortBy === "popularity") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [search, selectedCategory, selectedSubCategory, selectedBrands, availability, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page]);

  const addToCart = (product) => {
    if (!product.inStock) return;
    try {
      const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = oldCart.find(item => item.id === product.id);
      const updatedCart = existing
        ? oldCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...oldCart, { id: product.id, name: product.name, price: formatPrice(product.price), numericPrice: product.price, image: product.image, brand: product.brand, category: product.category, qty: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(updatedCart.reduce((t, i) => t + i.qty, 0));
      showToast(`${product.name.split(" ").slice(0, 3).join(" ")} added to cart!`);
    } catch {}
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleBrand = (brand) => {
    setPage(1);
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(x => x !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setSearch(""); setSelectedCategory("All"); setSelectedSubCategory("All");
    setSelectedBrands([]); setAvailability("all"); setMaxPrice(70000); setSortBy("popularity"); setPage(1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes heroSlideIn {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroSlideRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatDash {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(0.8deg); }
          66% { transform: translateY(-8px) rotate(-0.5deg); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes countBadge {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes slideFilterIn {
          from { opacity: 0; max-height: 0; transform: translateY(-8px); }
          to { opacity: 1; max-height: 800px; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes trustSlide {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(40px,-20px) scale(1.1); }
          75% { transform: translate(-20px,30px) scale(0.9); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-50px,25px) scale(1.15); }
          70% { transform: translate(30px,-15px) scale(0.85); }
        }
        @keyframes tagPop {
          0% { transform: scale(0) rotate(-10deg); }
          70% { transform: scale(1.15) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes wishPop {
          0% { transform: scale(1); }
          40% { transform: scale(1.5) rotate(10deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes progressFill {
          from { width: 0; }
          to { width: var(--fill); }
        }
        @keyframes sidebarIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(219,161,58,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(219,161,58,0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hero-left { animation: heroSlideIn 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-right { animation: heroSlideRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .float-dash { animation: floatDash 6s ease-in-out infinite; }
        .sidebar-in { animation: sidebarIn 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .slide-down { animation: slideDown 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-in { animation: fadeIn 0.3s ease both; }

        .scan-container::after {
          content: "";
          position: absolute;
          inset-inline: 0;
          top: 0;
          height: 35%;
          background: linear-gradient(to bottom, transparent, rgba(219,161,58,0.22), transparent);
          animation: scanLine 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }

        .gold-shimmer {
          background: linear-gradient(90deg, #dba13a, #f5cc6b, #dba13a, #c68117);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }

        .product-card {
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .product-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 24px 70px rgba(219,161,58,0.18), 0 8px 24px rgba(0,0,0,0.1);
          border-color: #dba13a;
        }
        .product-card:hover .card-img {
          transform: scale(1.08) translateY(-4px);
        }
        .card-img {
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          object-fit: contain;
          width: 100%;
        }
        .product-card:hover .cart-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .cart-btn {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, color 0.3s ease;
        }
        .product-card:hover .product-overlay {
          opacity: 1;
        }
        .product-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .filter-pill {
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .filter-pill:hover {
          transform: translateX(4px);
        }
        .filter-pill.active {
          transform: translateX(6px);
        }

        .category-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .category-btn::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 0;
          background: #dba13a;
          transition: width 0.4s ease;
        }
        .category-btn:hover::after,
        .category-btn.active::after {
          width: 100%;
        }

        .page-btn {
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .page-btn:hover:not(:disabled) {
          transform: scale(1.12);
        }
        .page-btn.active {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .trust-item {
          transition: all 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .trust-item:hover {
          transform: translateY(-6px);
          border-color: #dba13a;
          background: rgba(219,161,58,0.06);
        }

        .sort-select {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .sort-select:focus {
          border-color: #dba13a;
          box-shadow: 0 0 0 3px rgba(219,161,58,0.15);
          outline: none;
        }

        .wish-btn {
          transition: all 0.3s ease;
        }
        .wish-btn.liked {
          animation: wishPop 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .wish-btn:hover { transform: scale(1.2); }

        .tag-badge {
          animation: tagPop 0.5s cubic-bezier(0.22,1,0.36,1) 0.3s both;
        }

        .discount-badge {
          background: linear-gradient(135deg, #16a34a, #15803d);
        }

        .range-custom {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: linear-gradient(to right, #dba13a var(--progress, 50%), rgba(255,255,255,0.15) var(--progress, 50%));
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
        }
        .range-custom::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #dba13a;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(219,161,58,0.5);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .range-custom::-webkit-slider-thumb:hover { transform: scale(1.25); }
        .range-custom::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: #dba13a; border: 2px solid #fff; cursor: pointer;
        }

        .sidebar-overlay {
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            z-index: 999;
            animation: fadeIn 0.3s ease;
          }
          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
            overflow-y: auto;
            max-height: 100vh;
          }
          .sidebar-wrapper.open {
            transform: translateX(0);
          }
          .sidebar-wrapper .sidebar-content {
            border-radius: 0 20px 20px 0;
            min-height: 100vh;
            height: auto;
            max-height: 100vh;
            overflow-y: auto;
          }
          .product-card .cart-btn {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .sidebar-wrapper .sidebar-content {
            width: 290px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <CursorGlow />
      <Toast visible={toast.visible} message={toast.message} />

      <main style={{ minHeight: "100vh", width: "100%", overflowX: "hidden", background: "#fffaf3", color: "#2a1909", fontFamily: "'Inter', sans-serif" }}>
        <Header cartCount={cartCount} />
        <Hero />

        {/* Mobile Filter Toggle */}
        <div style={{ padding: "12px 16px", background: "#fffaf3", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5cfb6" }} className="mobile-filter-toggle">
          <span style={{ fontSize: 14, fontWeight: 600, color: "#6b573f" }}>
            {filteredProducts.length} products found
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "#1a0d03", color: "#dba13a", border: "1px solid #dba13a", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            <Icon name="filter" size={16} /> Categories
            {(selectedBrands.length + (selectedCategory !== "All" ? 1 : 0)) > 0 && (
              <span style={{ background: "#dba13a", color: "#1a0d03", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>
                {selectedBrands.length + (selectedCategory !== "All" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <section style={{ margin: "0 auto", display: "flex", width: "100%", maxWidth: 1380, flexDirection: "row", position: "relative" }}>
          {/* Sidebar Overlay for mobile */}
          {sidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          )}

          <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-content" style={{
              width: 290,
              flexShrink: 0,
              background: "linear-gradient(180deg, #261606 0%, #120a04 100%)",
              color: "#f7ead8",
              padding: "28px 22px",
              minHeight: "50vh",
              height: "auto",
              maxHeight: "500vh",
              overflowY: "auto",
              borderRight: "1px solid rgba(219,161,58,.12)",
              scrollbarWidth: "thin",
              scrollbarColor: "#dba13a #120a04",
              transition: "all .4s ease"
            }}>
              {/* Close button for mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: window.innerWidth < 1024 ? "flex" : "none",
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "none",
                  border: "none",
                  color: "#dba13a",
                  cursor: "pointer",
                  padding: 4,
                  zIndex: 10
                }}
              >
                <Icon name="x" size={24} />
              </button>

              <SidebarContent
                search={search}
                setSearch={(v) => { setSearch(v); setPage(1); }}
                selectedCategory={selectedCategory}
                setSelectedCategory={(v) => { setSelectedCategory(v); setPage(1); }}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                categoryCounts={categoryCounts}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                brandCounts={brandCounts}
                availability={availability}
                setAvailability={(v) => { setAvailability(v); setPage(1); }}
                maxPrice={maxPrice}
                setMaxPrice={(v) => { setMaxPrice(v); setPage(1); }}
                clearFilters={clearFilters}
                onCategorySelect={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
              />
            </div>
          </div>

          <ProductArea
            totalProducts={filteredProducts.length}
            products={visibleProducts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        </section>

        <TrustStrip />
      </main>
    </>
  );
}

function Hero() {
  const categories = ["CCTV", "Solar", "Gaming", "Hardware"];

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-[#020201] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(45px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(219,161,58,0.12); }
          50% { box-shadow: 0 0 55px rgba(219,161,58,0.32); }
        }

        @keyframes moveBg {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-20px,20px,0) scale(1.08); }
        }

        .hero-fade-up {
          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-float {
          animation: float 7s ease-in-out infinite;
        }

        .hero-float-delay {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        .hero-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .hero-shimmer {
          background-size: 220% auto;
          animation: shimmer 4s linear infinite;
        }

        .hero-bg-move {
          animation: moveBg 14s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(219,161,58,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(219,161,58,0.12),transparent_35%)] hero-bg-move" />

      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#dba13a]/40"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            animation: `float ${5 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1380px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-center lg:text-left">
          <p className="hero-fade-up mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-[#dba13a] sm:mb-5 sm:text-xs sm:tracking-[0.45em]">
            Premium Catalogue
          </p>

          <h1
            className="hero-fade-up font-serif text-[48px] font-black leading-[0.95] sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.1s" }}
          >
            Explore <br />
            <span className="hero-shimmer bg-gradient-to-r from-[#b87416] via-[#fff1b8] to-[#b87416] bg-clip-text text-transparent">
              Products
            </span>
          </h1>

          <p
            className="hero-fade-up mx-auto mt-6 max-w-xl text-[15px] leading-7 text-[#eadcc2] sm:mt-7 sm:text-[17px] sm:leading-8 lg:mx-0"
            style={{ animationDelay: "0.2s" }}
          >
            Discover CCTV systems, solar products, gaming accessories, computer
            hardware, laptop spares and premium electronics.
          </p>

          <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-4 sm:mt-12 sm:gap-5 lg:mx-0">
            {[
              ["150+", "Products"],
              ["40+", "Brands"],
            ].map(([value, label], i) => (
              <div
                key={label}
                className="hero-fade-up group relative overflow-hidden rounded-[24px] border border-[#dba13a]/20 bg-white/[0.04] p-5 text-center backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:border-[#dba13a]/50 sm:rounded-[30px] sm:p-6"
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,161,58,0.18),transparent_70%)] opacity-0 transition duration-700 group-hover:opacity-100" />

                <h3 className="relative font-serif text-4xl font-black text-[#dba13a] sm:text-5xl">
                  {value}
                </h3>

                <p className="relative mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a07c50] sm:text-[11px] sm:tracking-[0.3em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid h-auto grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-4 sm:gap-4 lg:h-[560px]">
          <div className="hero-float hero-glow group relative col-span-2 h-[230px] overflow-hidden rounded-[28px] border border-[#dba13a]/25 bg-white/[0.05] sm:row-span-2 sm:h-auto sm:rounded-[36px]">
            <img
              src={productBg}
              alt="Products"
              className="h-full w-full object-cover opacity-80 transition duration-[4000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#dba13a] sm:text-xs sm:tracking-[0.35em]">
                Featured
              </p>
              <h3 className="mt-2 font-serif text-3xl font-black sm:text-4xl">
                Electronics
              </h3>
            </div>
          </div>

          <div className="hero-fade-up col-span-2 rounded-[24px] border border-[#dba13a]/20 bg-[#dba13a] p-5 text-[#160b03] sm:row-span-1 sm:rounded-[32px] sm:p-7">
            <h3 className="font-serif text-2xl font-black sm:text-3xl">
              Live Stock
            </h3>
            <p className="mt-2 text-xs font-bold opacity-80 sm:text-sm">
              Updated product catalogue
            </p>
          </div>

          {categories.map((item, i) => (
            <div
              key={item}
              className="hero-fade-up group flex min-h-[90px] items-center justify-center rounded-[24px] border border-[#dba13a]/20 bg-white/[0.05] p-4 text-center backdrop-blur transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:bg-[#dba13a] hover:text-[#160b03] sm:min-h-0 sm:rounded-[32px] sm:p-5"
              style={{ animationDelay: `${0.45 + i * 0.1}s` }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.25em]">
                {item}
              </span>
            </div>
          ))}

          <div className="hero-float-delay hero-glow group relative col-span-2 h-[230px] overflow-hidden rounded-[28px] border border-[#dba13a]/25 bg-white/[0.05] sm:row-span-2 sm:h-auto sm:rounded-[36px]">
            <img
              src={productBg}
              alt="Catalogue"
              className="h-full w-full object-cover opacity-75 transition duration-[4000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#dba13a] sm:text-xs sm:tracking-[0.35em]">
                Categories
              </p>
              <h3 className="mt-2 font-serif text-3xl font-black sm:text-4xl">
                All Products
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Sidebar Content ─────────── */
function SidebarContent({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  categoryCounts,
  selectedBrands,
  toggleBrand,
  brandCounts,
  availability,
  setAvailability,
  maxPrice,
  setMaxPrice,
  clearFilters,
  onCategorySelect,
}) {
  const priceProgress = ((maxPrice - 500) / (70000 - 500)) * 100;

  return (
    <>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#dba13a", pointerEvents: "none" }}>
          <Icon name="search" size={17} />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ width: "100%", borderRadius: 12, border: `1px solid ${search ? "#dba13a" : "#674110"}`, background: "#120a04", padding: "12px 12px 12px 40px", fontSize: 13, color: "#f7ead8", outline: "none", transition: "border-color 0.3s, box-shadow 0.3s", fontFamily: "inherit" }}
          onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(219,161,58,0.2)"; e.target.style.borderColor = "#dba13a"; }}
          onBlur={(e) => { e.target.style.boxShadow = "none"; e.target.style.borderColor = search ? "#dba13a" : "#674110"; }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#dba13a", cursor: "pointer", padding: 4 }}>
            <Icon name="x" size={14} />
          </button>
        )}
      </div>

      {/* Active filters chips */}
      {(selectedBrands.length > 0 || selectedCategory !== "All") && (
        <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {selectedCategory !== "All" && (
            <span style={{ background: "rgba(219,161,58,0.15)", border: "1px solid rgba(219,161,58,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#dba13a", display: "flex", alignItems: "center", gap: 6 }}>
              {selectedCategory}
              <button onClick={() => { setSelectedCategory("All"); onCategorySelect?.(); }} style={{ background: "none", border: "none", color: "#dba13a", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
            </span>
          )}
          {selectedBrands.map(b => (
            <span key={b} style={{ background: "rgba(219,161,58,0.15)", border: "1px solid rgba(219,161,58,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#dba13a", display: "flex", alignItems: "center", gap: 6 }}>
              {b}
              <button onClick={() => { toggleBrand(b); onCategorySelect?.(); }} style={{ background: "none", border: "none", color: "#dba13a", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
            </span>
          ))}
        </div>
      )}

      {/* Categories header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#e0a43a", margin: 0 }}>Categories</h3>
        <button onClick={() => { clearFilters(); onCategorySelect?.(); }} style={{ fontSize: 12, fontWeight: 700, color: "#dba13a", background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6, transition: "background 0.2s", fontFamily: "inherit" }}
          onMouseEnter={(e) => e.target.style.background = "rgba(219,161,58,0.1)"}
          onMouseLeave={(e) => e.target.style.background = "none"}>
          Clear all
        </button>
      </div>

      <button
        onClick={() => { setSelectedCategory("All"); setSelectedSubCategory("All"); onCategorySelect?.(); }}
        className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
        style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 16, background: "none", border: "none", color: selectedCategory === "All" ? "#dba13a" : "#f7ead8", cursor: "pointer", padding: "6px 0", fontWeight: selectedCategory === "All" ? 700 : 400, fontFamily: "inherit" }}
      >
        <span>All Products</span>
        <span style={{ fontWeight: 700, color: "#dba13a" }}>({PRODUCTS.length})</span>
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CATEGORY_UI.map((cat) => (
          <div key={cat.name}>
            <button
              onClick={() => { setSelectedCategory(cat.name); setSelectedSubCategory("All"); onCategorySelect?.(); }}
              className={`category-btn ${selectedCategory === cat.name ? "active" : ""}`}
              style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", fontSize: 13, background: "none", border: "none", color: selectedCategory === cat.name ? "#dba13a" : "#f7ead8", cursor: "pointer", padding: "8px 0", fontWeight: selectedCategory === cat.name ? 700 : 400, fontFamily: "inherit" }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#dba13a" }}><Icon name={cat.icon} size={16} /></span>
                {cat.name}
              </span>
              <span style={{ fontWeight: 700, color: "#dba13a" }}>({categoryCounts[cat.name] || 0})</span>
            </button>

            {selectedCategory === cat.name && (
              <div style={{ marginLeft: 28, marginTop: 8, display: "flex", flexDirection: "column", gap: 8, animation: "slideFilterIn 0.35s ease both", overflow: "hidden" }}>
                <button
                  onClick={() => { setSelectedSubCategory("All"); onCategorySelect?.(); }}
                  style={{ textAlign: "left", fontSize: 12, background: "none", border: "none", cursor: "pointer", padding: "3px 0", color: selectedSubCategory === "All" ? "#dba13a" : "#cbb28f", fontWeight: selectedSubCategory === "All" ? 700 : 400, fontFamily: "inherit", transition: "color 0.2s" }}
                >
                  • All {cat.name}
                </button>
                {cat.subcategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => { setSelectedSubCategory(sub); onCategorySelect?.(); }}
                    style={{ textAlign: "left", fontSize: 12, background: "none", border: "none", cursor: "pointer", padding: "3px 0", color: selectedSubCategory === sub ? "#dba13a" : "#cbb28f", fontWeight: selectedSubCategory === sub ? 700 : 400, fontFamily: "inherit", transition: "color 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => e.target.style.transform = "translateX(4px)"}
                    onMouseLeave={(e) => e.target.style.transform = "translateX(0)"}
                  >
                    • {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ margin: "24px 0", borderTop: "1px solid #51330f" }} />

      {/* Price filter */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#e0a43a", margin: "0 0 16px" }}>Filter by Price</h3>
      <input
        type="range" min="500" max="70000" step="500"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="range-custom"
        style={{ width: "100%", "--progress": `${priceProgress}%` }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13, fontWeight: 700 }}>
        <span>₹500</span>
        <span style={{ color: "#dba13a" }}>{formatPrice(Number(maxPrice))}</span>
      </div>

      <div style={{ margin: "24px 0", borderTop: "1px solid #51330f" }} />

      {/* Brands */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#e0a43a", margin: "0 0 16px" }}>Brand</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {BRANDS.map(brand => (
          <label key={brand} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#dba13a"}
            onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => { toggleBrand(brand); onCategorySelect?.(); }}
                style={{ accentColor: "#dba13a", width: 14, height: 14 }} />
              {brand}
            </span>
            <span style={{ color: "#dba13a", fontSize: 12 }}>({brandCounts[brand] || 0})</span>
          </label>
        ))}
      </div>

      <div style={{ margin: "24px 0", borderTop: "1px solid #51330f" }} />

      {/* Availability */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#e0a43a", margin: "0 0 16px" }}>Availability</h3>
      {[["all", "All Products"], ["in", "In Stock"], ["out", "Out of Stock"]].map(([val, label]) => (
        <label key={val} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, cursor: "pointer", marginBottom: 12 }}>
          <input type="radio" name="avail" checked={availability === val} onChange={() => { setAvailability(val); onCategorySelect?.(); }} style={{ accentColor: "#dba13a" }} />
          {label}
          {val === "in" && <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />}
        </label>
      ))}

      {/* Free delivery card */}
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 16, borderRadius: 16, border: "1px solid #9b681f", padding: 16, background: "rgba(219,161,58,0.05)", animation: "glowPulse 3s ease-in-out infinite" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e2a33a", display: "grid", placeItems: "center", color: "#241306", flexShrink: 0 }}>
          <Icon name="truck" size={28} />
        </div>
        <div>
          <h4 style={{ fontWeight: 700, color: "#e8b251", margin: "0 0 4px", fontSize: 14 }}>Free Delivery</h4>
          <p style={{ fontSize: 12, color: "#dbcab1", margin: 0 }}>On all orders above ₹999</p>
        </div>
      </div>
    </>
  );
}

/* ─────────── Product Area ─────────── */
function ProductArea({
  totalProducts,
  products,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  page,
  setPage,
  totalPages,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const gridRef = useStaggerReveal([products]);

  return (
    <section style={{ flex: 1, minWidth: 0, padding: "24px 24px 24px 32px" }}>
      {/* Toolbar */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {[["grid", "grid"], ["list", "list"]].map(([mode, icon]) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "1px solid #e5cfb6",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                background: viewMode === mode ? "#c68117" : "#fff",
                color: viewMode === mode ? "#fff" : "#a36b20",
                transition: "all 0.3s ease",
              }}
            >
              <Icon name={icon} size={20} />
            </button>
          ))}

          <span style={{ fontSize: 13, fontWeight: 600, color: "#6b573f" }}>
            Showing{" "}
            <strong style={{ color: "#2a1909" }}>{products.length}</strong> of{" "}
            <strong style={{ color: "#2a1909" }}>{totalProducts}</strong>{" "}
            products
          </span>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
          style={{
            borderRadius: 10,
            border: "1px solid #e5cfb6",
            background: "#fff",
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: "#6b573f",
            cursor: "pointer",
            fontFamily: "inherit",
            minWidth: 200,
          }}
        >
          <option value="popularity">Sort by: Popularity</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div
          style={{
            borderRadius: 20,
            border: "2px dashed #e5cfb6",
            background: "#fff",
            padding: 64,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>
            No products found
          </h3>
          <p style={{ color: "#7b5b39", margin: 0 }}>
            Try adjusting your filters or search keyword.
          </p>
        </div>
      ) : (
        <div
          ref={gridRef}
          style={
            viewMode === "grid"
              ? {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 24,
                  alignItems: "stretch",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }
          }
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-stagger
              style={{
                height: "100%",
              }}
            >
              <ProductCard
                product={product}
                viewMode={viewMode}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="page-btn"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid #e3ccb0",
              background: "#fff",
              fontSize: 18,
              fontWeight: 700,
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.4 : 1,
            }}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`page-btn ${page === n ? "active" : ""}`}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: page === n ? "2px solid #c68117" : "1px solid #e3ccb0",
                background: page === n ? "#c68117" : "#fff",
                color: page === n ? "#fff" : "#6d4a24",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {n}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="page-btn"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid #e3ccb0",
              background: "#fff",
              fontSize: 18,
              fontWeight: 700,
              cursor: page === totalPages ? "not-allowed" : "pointer",
              opacity: page === totalPages ? 0.4 : 1,
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

/* ─────────── Product Card ─────────── */
function ProductCard({ product, viewMode, addToCart, wishlist, toggleWishlist }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWished = wishlist.includes(product.id);
  const disc = discount(product.price, product.oldPrice);
  const stars = Math.round(product.rating);

  const cardStyle = viewMode === "grid"
    ? { 
        position: "relative", 
        borderRadius: 20, 
        border: "1px solid #e5cfb6", 
        background: "#fff", 
        padding: "16px 16px 20px", 
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }
    : { 
        position: "relative", 
        display: "flex", 
        gap: 20, 
        borderRadius: 20, 
        border: "1px solid #e5cfb6", 
        background: "#fff", 
        padding: 20, 
        overflow: "hidden",
        height: "100%",
      };

  return (
    <article className="product-card" style={cardStyle}>
      {/* Tag badge */}
      {product.tag && (
        <span className="tag-badge" style={{
          position: "absolute", top: 12, left: 12, zIndex: 10,
          background: product.tag === "HOT" ? "linear-gradient(135deg, #dc2626, #991b1b)" : product.tag === "TRENDING" ? "linear-gradient(135deg, #7c3aed, #5b21b6)" : "linear-gradient(135deg, #c68117, #9a5f0f)",
          color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.05em"
        }}>
          {product.tag}
        </span>
      )}

      {/* Discount badge */}
      {disc > 0 && (
        <span className="discount-badge" style={{ 
          position: "absolute", 
          top: product.tag ? 44 : 12, 
          left: 12, 
          zIndex: 10, 
          color: "#fff", 
          borderRadius: 8, 
          padding: "3px 10px", 
          fontSize: 10, 
          fontWeight: 800 
        }}>
          -{disc}%
        </span>
      )}

      {/* Wishlist */}
      <button
        className={`wish-btn ${isWished ? "liked" : ""}`}
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
        style={{ 
          position: "absolute", 
          top: 12, 
          right: 12, 
          zIndex: 10, 
          width: 32, 
          height: 32, 
          borderRadius: "50%", 
          border: "1px solid #e5cfb6", 
          background: "rgba(255,255,255,0.95)", 
          display: "grid", 
          placeItems: "center", 
          cursor: "pointer", 
          color: isWished ? "#ef4444" : "#9b8a76",
          transition: "all 0.3s ease",
        }}
      >
        <Icon name="heart" size={14} />
      </button>

      {/* Image */}
      <div style={viewMode === "grid"
        ? { 
            height: 160, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginBottom: 12, 
            overflow: "hidden",
            marginTop: product.tag ? 20 : 0,
            paddingTop: 8,
          }
        : { 
            width: 160, 
            flexShrink: 0, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            overflow: "hidden",
            padding: 8,
          }
      }>
        {!imageLoaded && (
          <div style={{ width: "80%", height: 120, borderRadius: 12, background: "linear-gradient(90deg, #f0e8dc 25%, #e8ddd1 50%, #f0e8dc 75%)", backgroundSize: "200% auto", animation: "shimmer 1.5s linear infinite" }} />
        )}
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          onLoad={() => setImageLoaded(true)}
          style={{ 
            width: "100%", 
            height: viewMode === "grid" ? 140 : 140, 
            objectFit: "contain", 
            display: imageLoaded ? "block" : "none",
          }}
        />
      </div>

      {/* Info - Flex grow to push button to bottom */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9b8a76", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {product.subcategory || product.category}
          </p>
          
          <h3 style={{ 
            fontSize: 14, 
            fontWeight: 700, 
            lineHeight: 1.4, 
            color: "#2a1909", 
            margin: "0 0 4px", 
            overflow: "hidden", 
            display: "-webkit-box", 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: "vertical",
            minHeight: "40px",
          }}>
            {product.name}
          </h3>
          
          <p style={{ fontSize: 12, fontWeight: 600, color: "#7b5b39", margin: "0 0 8px" }}>{product.brand}</p>

          {/* Stock indicator */}
          <p style={{ 
            fontSize: 11, 
            fontWeight: 700, 
            margin: "0 0 10px", 
            color: product.inStock ? "#16a34a" : "#dc2626", 
            display: "flex", 
            alignItems: "center", 
            gap: 5 
          }}>
            <span style={{ 
              width: 6, 
              height: 6, 
              borderRadius: "50%", 
              background: product.inStock ? "#16a34a" : "#dc2626", 
              display: "inline-block" 
            }} />
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Prices */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#2d1907" }}>{formatPrice(product.price)}</span>
            <span style={{ fontSize: 12, color: "#a38d72", textDecoration: "line-through" }}>{formatPrice(product.oldPrice)}</span>
          </div>

          {/* Stars */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 1 }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ fontSize: 13, color: s <= stars ? "#c57b13" : "#d9cbbf" }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 11, color: "#958776" }}>({product.reviews})</span>
          </div>
        </div>

        {/* Cart button - Always visible on mobile, appears on hover on desktop */}
        <MagneticButton
          className="cart-btn"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          style={{ 
            width: "100%", 
            borderRadius: 12, 
            border: "1px solid #c59354", 
            padding: "10px 0", 
            fontSize: 11, 
            fontWeight: 800, 
            color: "#8f5c22", 
            background: product.inStock ? "transparent" : "#f5f0eb",
            cursor: product.inStock ? "pointer" : "not-allowed", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 6, 
            letterSpacing: "0.06em",
            transition: "all 0.3s ease",
            marginTop: "auto",
          }}
          onMouseEnter={(e) => { 
            if (product.inStock) { 
              e.currentTarget.style.background = "#c59354"; 
              e.currentTarget.style.color = "#fff"; 
            }
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = product.inStock ? "transparent" : "#f5f0eb"; 
            e.currentTarget.style.color = product.inStock ? "#8f5c22" : "#999"; 
          }}
        >
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
          <Icon name="cart" size={14} />
        </MagneticButton>
      </div>
    </article>
  );
}

/* ─────────── Trust Strip ─────────── */
function TrustStrip() {
  const [ref, inView] = useInView(0.2);

  return (
    <section ref={ref} style={{ background: "#160d05", padding: "40px 32px" }}>
      <div style={{ margin: "0 auto", maxWidth: 1380, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, color: "#f3dfbf" }}>
        {trustItems.map((item, i) => (
          <div
            key={item.title}
            className="trust-item"
            style={{
              display: "flex", alignItems: "center", gap: 16, borderRadius: 16, border: "1px solid #6f4816", padding: 16,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
            }}
          >
            <img src={item.image} alt={item.title} style={{ width: 42, height: 42, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: 700, color: "#e4ad4d", margin: "0 0 4px", fontSize: 14 }}>{item.title}</h4>
              <p style={{ fontSize: 12, color: "#e7d4b9", margin: 0 }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}