import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import heroBg from "../assets/home-hero.png";
import h1 from "../assets/h1.png";
import h2 from "../assets/h2.png";
import h3 from "../assets/h3.png";
import h4 from "../assets/h4.png";
import h5 from "../assets/h5.png";
import h6 from "../assets/h6.png";
import h7 from "../assets/h7.png";
import h8 from "../assets/h8.png";
import h9 from "../assets/h9.png";
import h10 from "../assets/h10.png";
import h11 from "../assets/h11.png";
import h12 from "../assets/h12.png";
import h13 from "../assets/h13.png";

const Icon = ({ name, size = 24, className = "" }) => {
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
  };

  const icons = {
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
    cart: (
      <svg {...common}>
        <path d="M3 4h2l2 10h11l2-6H7" />
        <circle cx="10" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
    ),
    award: (
      <svg {...common}>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12-1.5 9 5-3 5 3-1.5-9" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
    truck: (
      <svg {...common}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h3l4 4v2h-7" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
      </svg>
    ),
    headset: (
      <svg {...common}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 1Z" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 1Z" />
      </svg>
    ),
  };

  return icons[name] || icons.award;
};

const categories = [
  {
    name: "Laptop Spares",
    image: h1,
    link: "/products?category=Laptop%20Spares#products-section",
  },
  {
    name: "Computer Parts",
    image: h2,
    link: "/products?category=Computer%20Parts#products-section",
  },
  {
    name: "Gaming Zone",
    image: h3,
    link: "/products?category=Gaming%20Zone#products-section",
  },
  {
    name: "CCTV Cameras",
    image: h4,
    link: "/products?category=CCTV%20Cameras#products-section",
  },
  {
    name: "Solar Panels",
    image: h5,
    link: "/products?category=Solar%20Panels#products-section",
  },
];

const prebuildPCs = [
  {
    id: 1,
    title: "Gaming PC",
    use: "gaming",
    price: "₹82,990",
    image:
      "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?q=80&w=900&auto=format&fit=crop",
    link: "/prebuild?type=gaming",
  },
  {
    id: 2,
    title: "Editing PC",
    use: "editing",
    price: "₹96,500",
    image:
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=900&auto=format&fit=crop",
    link: "/prebuild?type=editing",
  },
  {
    id: 3,
    title: "Study PC",
    use: "studies",
    price: "₹39,990",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=900&auto=format&fit=crop",
    link: "/prebuild?type=studies",
  },
  {
    id: 4,
    title: "Office PC",
    use: "office",
    price: "₹45,990",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop",
    link: "/prebuild?type=office",
  },
];

const products = [
  {
    id: 1,
    name: "Corsair 16GB DDR4 3200MHz Desktop RAM",
    price: "₹4,299",
    numericPrice: 4299,
    image:
      "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "MSI B550M PRO-VDH WiFi Motherboard",
    price: "₹8,699",
    numericPrice: 8699,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "WD Blue 1TB NVMe SSD",
    price: "₹6,799",
    numericPrice: 6799,
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "ZOTAC RTX 3060 Twin Edge Graphics Card",
    price: "₹28,999",
    numericPrice: 28999,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Intel Core i5 12400F Processor",
    price: "₹13,999",
    numericPrice: 13999,
    image:
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?q=80&w=800&auto=format&fit=crop",
  },
];

const services = [
  { title: "Computer Repair", desc: "Professional repair & maintenance services.", image: h6 },
  { title: "CCTV Installation", desc: "Security camera installation services.", image: h7 },
  { title: "Solar Installation", desc: "Solar power plant installation & support.", image: h8 },
  { title: "Desktop Service", desc: "Desktop setup & support services.", image: h9 },
];

const trust = [
  { title: "Premium Quality", desc: "Only Original Products", image: h10 },
  { title: "Secure Payments", desc: "100% Safe & Secure", image: h11 },
  { title: "Fast Delivery", desc: "Quick & Reliable", image: h12 },
  { title: "24/7 Support", desc: "Always Here to Help", image: h13 },
];

const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + item.qty, 0);
  } catch {
    return 0;
  }
};

export default function Home() {
  const [cartCount, setCartCount] = useState(getCartCount());

  const handleAddToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = oldCart.find((item) => item.id === product.id);

    const updatedCart = existing
      ? oldCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      : [...oldCart, { ...product, qty: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((total, item) => total + item.qty, 0));
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#120a04] text-white">
      <Header cartCount={cartCount} />
      <Hero />
      <CategoryStrip />
      <PrebuildPCSection />
      <FeaturedProducts onAddToCart={handleAddToCart} />
      <ServicesSection />
      <TrustStrip />
    </main>
  );
}



function Hero() {
  const cards = ["Laptop Spares", "Gaming Gear", "CCTV", "Solar"];

  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-black sm:min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,190,70,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,150,0,0.13),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,.18),rgba(18,7,2,.25),rgba(0,0,0,.42))]" />

      <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c363]/10 lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c363]/15 lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5c363]/15 blur-[90px] sm:h-[420px] sm:w-[420px]" />

      <div className="pointer-events-none absolute z-10 -left-40 top-[20%] hidden h-28 w-[130%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[#f5c363]/10 to-transparent blur-2xl lg:block" />
      <div className="pointer-events-none absolute z-10 -right-40 bottom-[20%] hidden h-28 w-[130%] rotate-[12deg] bg-gradient-to-r from-transparent via-[#c98218]/10 to-transparent blur-2xl lg:block" />

      {cards.map((text, i) => (
        <div
          key={text}
          className="absolute z-30 hidden rounded-3xl border border-[#f5c363]/25 bg-black/35 px-6 py-4 text-sm font-black text-[#f5c363] shadow-[0_0_24px_rgba(245,195,99,.18)] backdrop-blur-sm lg:block"
          style={{
            left: i === 0 ? "8%" : i === 1 ? "72%" : i === 2 ? "10%" : "76%",
            top: i === 0 ? "22%" : i === 1 ? "20%" : i === 2 ? "60%" : "62%",
          }}
        >
          {text}
        </div>
      ))}

      <div className="absolute left-0 top-0 z-20 h-1 w-full bg-gradient-to-r from-transparent via-[#f5c363] to-transparent opacity-50" />

      <div className="relative z-50 flex min-h-[86vh] flex-col items-center justify-center px-4 py-20 text-center sm:min-h-screen sm:px-6">
        <div className="mb-6 rounded-full border border-[#f5c363]/40 bg-black/40 px-5 py-3 text-[10px] font-black tracking-[0.28em] text-[#f5c363] shadow-[0_0_24px_rgba(245,195,99,0.2)] backdrop-blur-sm sm:px-7 sm:text-xs sm:tracking-[0.4em]">
          PREMIUM TECH WORLD
        </div>

        <div className="relative max-w-[950px]">
          <h1
            className="text-[38px] leading-[1] sm:text-[58px] lg:text-[84px]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "#faf7ef",
            }}
          >
            All Tech Solutions
            <br />
            <span className="italic text-[#dba13a]">in One Place</span>
          </h1>

          <p className="mt-5 text-base font-bold leading-7 text-[#ffe3a3] sm:text-2xl sm:leading-9">
            Laptop Spares • Gaming Gear • CCTV Solutions
          </p>

          <p className="mx-auto mt-3 max-w-[850px] text-sm leading-7 text-[#eadbc3] sm:text-lg sm:leading-8">
            Your one-stop destination for quality computer parts, solar products,
            repair services, and reliable tech support.
          </p>

          <div className="mx-auto mt-5 h-[3px] w-[70%] overflow-hidden rounded-full bg-[#f5c363]/10">
            <div className="h-full w-24 bg-gradient-to-r from-transparent via-[#f5c363] to-transparent" />
          </div>
        </div>

        <div className="relative z-50 mt-9 flex w-full max-w-sm flex-col gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:gap-5">
          <Link
            to="/products"
            className="rounded-2xl bg-[#f5c363] px-10 py-4 font-black text-black shadow-[0_0_28px_rgba(245,195,99,0.35)] transition-transform duration-300 hover:scale-105"
          >
            Shop Now
          </Link>

          <Link
            to="/services"
            className="rounded-2xl border border-[#f5c363] bg-black/30 px-10 py-4 font-black text-[#f5c363] backdrop-blur-sm transition-colors duration-300 hover:bg-[#f5c363] hover:text-black"
          >
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#120a04] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      {/* Background glow */}
      <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#dba13a]/20 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#c98218]/20 blur-[140px]" />

      <div
        className="relative mx-auto grid w-full max-w-[1400px] gap-5 rounded-[32px] border border-[#ead8bc]/40 bg-white/90 p-4 shadow-[0_40px_120px_rgba(0,0,0,.18)] backdrop-blur-sm sm:rounded-[40px] sm:p-6 md:p-8 xl:p-10"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        {categories.map((cat, index) => (
          <Link
            key={cat.name}
            to={cat.link}
            className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-[#dba13a]/15 bg-gradient-to-b from-[#fffdf8] to-[#f7ead4] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-[#c98218]/40 hover:shadow-[0_30px_80px_rgba(201,130,24,.18)] sm:min-h-[250px] sm:p-6 lg:rounded-[36px] lg:p-7"
          >
            <div className="absolute left-1/2 top-0 h-[120px] w-[120px] -translate-x-1/2 rounded-full bg-[#dba13a]/10 blur-[70px] opacity-0 transition duration-300 group-hover:opacity-100" />

            <span className="absolute right-4 top-2 text-[58px] font-black leading-none text-[#c98218]/10 transition duration-300 group-hover:text-[#c98218]/20 sm:text-[70px] lg:text-[80px]">
              0{index + 1}
            </span>

            <div
              className="relative mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-[#fffdf7] to-[#ebc98e] shadow-[0_20px_45px_rgba(201,130,24,.18)] transition duration-300 group-hover:scale-105"
              style={{
                width: "clamp(82px, 9vw, 110px)",
                height: "clamp(82px, 9vw, 110px)",
              }}
            >
              <div className="absolute inset-[-8px] rounded-full border border-[#c98218]/20" />

              <img
                src={cat.image}
                alt={cat.name}
                className="relative z-10 rounded-full object-cover transition duration-300 group-hover:scale-105"
                style={{
                  width: "clamp(58px, 7vw, 78px)",
                  height: "clamp(58px, 7vw, 78px)",
                }}
              />
            </div>

            <h3
              className="relative mt-6 text-center font-serif font-bold text-[#3b2610] transition duration-300 group-hover:text-[#b56b17]"
              style={{
                fontSize: "clamp(15px, 1.3vw, 18px)",
              }}
            >
              {cat.name}
            </h3>

            <div className="mx-auto mt-4 h-[2px] w-0 rounded-full bg-[#c98218] transition-all duration-300 group-hover:w-20" />
          </Link>
        ))}
      </div>
    </section>
  );
}
function PrebuildPCSection() {
  const [current, setCurrent] = useState(0);

  const bgColors = [
    "from-[#4b2a73] via-[#6d3fa3] to-[#b47cff]",
    "from-[#5c1f1f] via-[#9f3434] to-[#ff8a5c]",
    "from-[#073b36] via-[#0f766e] to-[#2dd4bf]",
    "from-[#4a2b05] via-[#a16207] to-[#fbbf24]",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === prebuildPCs.length - 1 ? 0 : prev + 1));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === prebuildPCs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? prebuildPCs.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden bg-[#fffaf3] px-4 py-14 sm:px-6 lg:px-10">
      <div className="absolute left-[-100px] top-20 h-80 w-80 rounded-full bg-[#dba13a]/20 blur-[120px] " />
      <div className="absolute right-[-120px] bottom-10 h-96 w-96 rounded-full bg-[#c98218]/15 blur-[130px] " />

      <div className="mx-auto max-w-[1380px]">
        <div className="mb-8 flex items-center gap-5">
          <h2 className="whitespace-nowrap font-serif text-4xl font-bold text-[#1f1208]">
            Prebuilt PCs
          </h2>
          <div className="h-px flex-1 bg-[#d8bd8c]" />
          <span className="text-[#c78925] animate-spin">✦</span>
        </div>

        <div
          className={`group relative overflow-hidden rounded-[42px] bg-gradient-to-r ${bgColors[current]} p-8 shadow-[0_35px_100px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-[1.01]`}
        >
          <div className="absolute inset-0 opacity-[0.13] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px] " />

          <div className="absolute right-[-120px] top-[-120px] h-[330px] w-[330px]  rounded-full bg-white/25 blur-[100px]" />
          <div className="absolute left-[-120px] bottom-[-120px] h-[300px] w-[300px]  rounded-full bg-white/15 blur-[90px]" />

          <div className="absolute left-8 top-6 z-20 flex flex-wrap gap-3">
            {["gaming", "editing", "studies", "office"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const index = prebuildPCs.findIndex((pc) => pc.use === item);
                  if (index !== -1) setCurrent(index);
                }}
                className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-500 hover:-translate-y-1 hover:scale-105 ${
                  prebuildPCs[current].use === item
                    ? "bg-white text-black shadow-xl"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/35"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-3xl text-white backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-black/45"
          >
            ‹
          </button>

          <Link
            to={prebuildPCs[current].link}
            className="relative z-10 flex min-h-[420px] flex-col items-center justify-between gap-8 pt-16 lg:flex-row"
          >
            <div className="w-full text-center lg:w-[45%] lg:pl-16 lg:text-left">
              <p className="text-lg font-semibold text-white/75 ">
                Just {prebuildPCs[current].price}
              </p>

              <h3 className="mt-3 text-5xl font-black text-white drop-shadow-[0_0_25px_rgba(0,0,0,0.45)] sm:text-6xl transition-all duration-300 group-hover:translate-x-2">
                {prebuildPCs[current].title}
              </h3>

              <p className="mt-5 max-w-[420px] text-white/75 transition-all duration-300 group-hover:translate-x-2">
                High performance setup crafted for {prebuildPCs[current].use}.
              </p>
            </div>

            <div className="relative flex w-full justify-center lg:w-[55%]">
              <div className="absolute inset-0 m-auto h-[300px] w-[300px]  rounded-full bg-white/25 blur-[85px]" />
              <div className="absolute inset-0 m-auto h-[360px] w-[360px] rounded-full border border-white/25 " />
              <div className="absolute inset-0 m-auto h-[440px] w-[440px] rounded-full border border-white/15 " />

              <img
                src={prebuildPCs[current].image}
                alt={prebuildPCs[current].title}
                className="relative h-[280px] w-full max-w-[500px] rounded-[32px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 sm:h-[340px]"
              />
            </div>
          </Link>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-3xl text-white backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-black/45"
          >
            ›
          </button>

          <div className="relative z-20 mt-6 flex justify-center gap-2">
            {prebuildPCs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  current === index ? "w-10 bg-white shadow-[0_0_18px_white]" : "w-2 bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ onAddToCart }) {
  return (
    <section className="relative overflow-hidden bg-[#fffaf3] px-4 pb-16 pt-14 text-[#27170a] sm:px-6 lg:px-10">
      <div className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#dba13a]/20 blur-[130px]" />
      <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#c98218]/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1380px]">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[5px] text-[#c78925]">
              Premium Collection
            </p>

            <h2 className="mt-3 font-serif text-4xl font-black sm:text-5xl">
              Featured <span className="text-[#c78925]">Products</span>
            </h2>

            <p className="mt-3 max-w-[620px] text-sm leading-7 text-[#6d563b]">
              Explore our selected premium computer accessories, CCTV products,
              gaming gear, and hardware essentials.
            </p>
          </div>

          <Link
            to="/products"
            className="group flex w-fit items-center gap-3 rounded-full border border-[#c59354]/40 bg-white px-6 py-3 text-sm font-black text-[#6b4014] shadow-sm transition duration-500 hover:-translate-y-1 hover:bg-[#c59354] hover:text-white"
          >
            View All Products
            <Icon
              name="arrow"
              size={18}
              className="transition duration-500 group-hover:translate-x-2"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((p, index) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-[32px] border border-[#e3ccb0] bg-white p-4 shadow-[0_12px_35px_rgba(90,50,15,.08)] transition duration-300 hover:-translate-y-2 hover:border-[#c59354]/60 hover:shadow-[0_30px_80px_rgba(90,50,15,.18)]"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_50%_0%,rgba(219,161,58,.14),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />

              <span className="absolute right-5 top-4 z-10 text-5xl font-black text-[#c78925]/10 transition duration-300 group-hover:scale-105 group-hover:text-[#c78925]/20">
                0{index + 1}
              </span>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#ffe2aa]/60 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

              <div className="relative overflow-hidden rounded-[24px] bg-[#fff6e8]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-105"
                />

              
              </div>

              <div className="relative pt-5">
                <h3 className="min-h-[48px] text-sm font-black leading-5 text-[#27170a] transition duration-500 group-hover:text-[#8f5c22]">
                  {p.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black text-[#8f5c22]">
                    {p.price}
                  </p>

                  <span className="rounded-full bg-[#fff1d8] px-3 py-1 text-[10px] font-black uppercase tracking-[2px] text-[#9b681f]">
                    In Stock
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(p)}
                  className="mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#c59354]/60 bg-white py-3 text-xs font-black uppercase tracking-[2px] text-[#8f5c22] transition duration-300 hover:-translate-y-1 hover:bg-[#c59354] hover:text-white hover:shadow-[0_18px_45px_rgba(201,130,24,.25)]"
                >
                  Add To Cart
                  <Icon name="cart" size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#160d05] px-4 py-12 sm:px-6 lg:px-10">
      <div className="absolute left-[-120px] top-10 h-80 w-80 rounded-full bg-[#dba13a]/15 blur-[120px]" />
      <div className="absolute right-[-100px] bottom-0 h-80 w-80 rounded-full bg-[#c98218]/15 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1380px]">
        <div className="mb-8 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="hidden sm:block" />

          <h2 className="font-serif text-4xl font-normal sm:text-5xl">
            Our Services
          </h2>

          <Link
            to="/services"
            className="rounded-2xl border border-[#c79031] px-8 py-4 text-sm font-black text-[#ddb15b] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-[#ddb15b] hover:text-[#120a04]"
          >
            View All Services
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative min-h-[260px] overflow-hidden rounded-[32px] border border-[#9b681f]/80 bg-gradient-to-br from-[#2a1909] to-[#100a05] p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute right-4 top-4 h-[90px] w-[90px] object-contain opacity-30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-12 group-hover:opacity-100"
              />

              <span className="text-6xl font-black text-[#dba13a]/10">
                0{index + 1}
              </span>

              <h3 className="relative mt-8 text-2xl font-black">
                {service.title}
              </h3>

              <p className="relative mt-3 text-sm leading-6 text-[#d3c5b5]">
                {service.desc}
              </p>

              <Link
                to="/services"
                className="relative mt-6 inline-flex rounded-xl border border-[#c89031] px-7 py-3 text-xs font-black uppercase text-[#d9a744] transition-all duration-300 hover:scale-105 hover:bg-[#c89031] hover:text-black"
              >
                Enquire Now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-[#160d05] px-4 pb-10 pt-4 sm:px-6 lg:px-10">
      <div className="absolute left-[-100px] top-[-40px] h-72 w-72 rounded-full bg-[#dba13a]/15 blur-[110px]" />
      <div className="absolute bottom-[-80px] right-[-100px] h-80 w-80 rounded-full bg-[#c98218]/15 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-4 rounded-[32px] border border-[#ead8bc]/40 bg-[#fffaf3] p-5 text-[#4a2b0c] shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:grid-cols-2 lg:grid-cols-4 lg:px-8 lg:py-7">
        {trust.map((item, index) => (
          <div
            key={item.title}
            className="group relative flex items-center gap-5 overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-[#fff0d4] hover:shadow-[0_20px_45px_rgba(201,130,24,0.18)] lg:border-r lg:border-[#dbc49d] lg:last:border-r-0"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

            <div className="relative grid h-[72px] w-[72px] shrink-0 place-items-center rounded-2xl bg-[#fff6e8] shadow-[0_12px_30px_rgba(201,130,24,0.12)] transition duration-300 group-hover:shadow-[0_18px_45px_rgba(201,130,24,0.22)]">
              <span className="absolute inset-[-7px] rounded-[22px] border border-[#c98218]/20" />
              <span className="absolute inset-[-13px] rounded-[26px] border border-[#c98218]/10" />

              <img
                src={item.image}
                alt={item.title}
                className="relative h-[56px] w-[56px] object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(201,130,24,0.45)]"
              />
            </div>

            <div className="relative min-w-0">
              <h4 className="font-black leading-5 transition-all duration-500 group-hover:text-[#b56b17]">
                {item.title}
              </h4>

              <p className="mt-1 text-sm font-medium leading-5 text-[#805c38]">
                {item.desc}
              </p>
            </div>

            <span className="absolute right-3 top-3 text-[#c98218]/20 transition-all duration-300 group-hover:scale-150">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}