import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import productBg from "../assets/Service_bg.png";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import h10 from "../assets/h10.png";
import h11 from "../assets/h11.png";
import h12 from "../assets/h12.png";
import h13 from "../assets/h13.png";

const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.qty, 0);
};

const SERVICES = [
  {
    id: 1,
    title: "Computer Repair",
    label: "Repair Lab",
    short:
      "Professional repair and maintenance services for all types of computers and laptops.",
    icon: s1,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Hardware Repair",
      "Software Installation",
      "Virus & Malware Removal",
      "System Optimization",
    ],
  },
  {
    id: 2,
    title: "CCTV Installation",
    label: "Security Hub",
    short:
      "Complete CCTV installation and security solutions for homes, offices and industries.",
    icon: s2,
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=1200&auto=format&fit=crop",
    features: [
      "CCTV Installation",
      "Remote Monitoring",
      "Maintenance & Support",
      "AMC Services",
    ],
  },
  {
    id: 3,
    title: "Solar Installation",
    label: "Energy Studio",
    short:
      "Solar power system installation and maintenance for homes, businesses and industries.",
    icon: s3,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Solar Panel Installation",
      "System Maintenance",
      "Energy Consultation",
      "24/7 Support",
    ],
  },
  {
    id: 4,
    title: "Desktop Service",
    label: "Performance Desk",
    short:
      "Desktop setup, upgrade and support services for smooth performance.",
    icon: s4,
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Desktop Setup",
      "Hardware Upgrade",
      "Performance Tuning",
      "Technical Support",
    ],
  },
];

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
  };

  const icons = {
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
    phone: (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
    headset: (
      <svg {...common}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 1Z" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 1Z" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    ),
    close: (
      <svg {...common}>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    ),
    bolt: (
      <svg {...common}>
        <path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
  };

  return icons[name] || icons.check;
};

export default function Services() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = useMemo(() => {
    const q = search.toLowerCase();
    return SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.features.some((f) => f.toLowerCase().includes(q))
    );
  }, [search]);

  const openEnquiry = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020201] text-white">
      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(80px) scale(.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes leftIn {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes rightIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-24px) rotate(2deg); }
        }

        @keyframes mesh {
          0%,100% { transform: translate(0,0) scale(1); }
          35% { transform: translate(50px,-35px) scale(1.08); }
          70% { transform: translate(-35px,30px) scale(.96); }
        }

        @keyframes textFlow {
          0% { background-position: -220% center; }
          100% { background-position: 220% center; }
        }

        @keyframes borderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scan {
          0% { transform: translateY(-120%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(120%); opacity: 0; }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes pop {
          from { opacity: 0; transform: translateY(50px) scale(.88); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .rise { animation: rise .9s cubic-bezier(.16,1,.3,1) both; }
        .left-in { animation: leftIn .9s cubic-bezier(.16,1,.3,1) both; }
        .right-in { animation: rightIn .9s cubic-bezier(.16,1,.3,1) both; }
        .delay-1 { animation-delay: .15s; }
        .delay-2 { animation-delay: .3s; }
        .delay-3 { animation-delay: .45s; }

        .float { animation: float 5s ease-in-out infinite; }
        .mesh { animation: mesh 11s ease-in-out infinite; }
        .pop { animation: pop .45s cubic-bezier(.16,1,.3,1) both; }

        .gold {
          background: linear-gradient(90deg,#fff9cf,#e9bb5c,#dba13a,#8b4d0d,#fff9cf);
          background-size: 240% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: textFlow 4.5s linear infinite;
        }

        .glass {
          background: linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.02));
          backdrop-filter: blur(18px);
        }

        .ring {
          position: relative;
          overflow: hidden;
        }

        .ring::before {
          content: "";
          position: absolute;
          inset: -80%;
          background: conic-gradient(
            transparent,
            rgba(219,161,58,.95),
            transparent,
            rgba(255,243,190,.65),
            transparent
          );
          animation: borderSpin 8s linear infinite;
        }

        .inner {
          position: relative;
          z-index: 1;
        }

        .scan::after {
          content: "";
          position: absolute;
          inset-inline: 0;
          top: 0;
          height: 45%;
          background: linear-gradient(to bottom,transparent,rgba(219,161,58,.18),transparent);
          animation: scan 4s ease-in-out infinite;
          pointer-events: none;
        }

        .spot {
          background:
            radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(219,161,58,.20),transparent 30%),
            linear-gradient(145deg,rgba(15,9,4,.96),rgba(3,2,1,.98));
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        .clip-one { clip-path: polygon(0 0,100% 0,100% 88%,88% 100%,0 100%); }
        .clip-two { clip-path: polygon(10% 0,100% 0,100% 100%,0 100%,0 12%); }
        .clip-three { clip-path: polygon(0 0,88% 0,100% 12%,100% 100%,0 100%); }
      `}</style>

      <Header cartCount={getCartCount()} />

      <div className="pointer-events-none absolute -left-60 top-20 h-[600px] w-[600px] rounded-full bg-[#dba13a]/20 blur-[180px] mesh" />
      <div className="pointer-events-none absolute -right-64 top-[850px] h-[720px] w-[720px] rounded-full bg-[#7d430b]/25 blur-[210px] mesh" />

      <Hero onEnquire={() => openEnquiry(SERVICES[0])} />
      {/* <PremiumTicker /> */}
      <SearchConsole search={search} setSearch={setSearch} />
      <ServiceShowcase services={filteredServices} onEnquire={openEnquiry} />
      <Timeline />
      <SupportCTA onEnquire={() => openEnquiry(null)} />
      <Footer />
      <TrustStrip />

      {modalOpen && (
        <EnquiryModal
          service={selectedService}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
}

function Hero({ onEnquire }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020201] px-4 pb-14 pt-6 sm:px-6 lg:px-7">
      <div className="absolute inset-0">
        <img
          src={productBg}
          alt="Services"
          className="h-full w-full scale-110 object-cover opacity-[0.07]"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(219,161,58,.25),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(125,67,11,.32),transparent_36%),linear-gradient(135deg,#020201_0%,#100804_48%,#020201_100%)]" />

      <div className="absolute left-[-160px] top-20 h-[320px] w-[320px] rounded-full bg-[#dba13a]/20 blur-[120px]" />
      <div className="absolute right-[-180px] bottom-20 h-[360px] w-[360px] rounded-full bg-[#7d430b]/30 blur-[140px]" />

      <div className="relative mx-auto max-w-[1450px]">
        <div className="grid min-h-screen grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="left-in order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[30px] border border-[#dba13a]/25 bg-black/60 p-5 shadow-[0_35px_100px_rgba(0,0,0,.75)] backdrop-blur-2xl sm:rounded-[48px] sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dba13a] to-transparent" />
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#dba13a]/10 blur-3xl" />

              <div className="mb-5 rounded-2xl border border-[#dba13a]/15 bg-white/[0.03] px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#dba13a] sm:text-sm sm:tracking-[3px]">
                  &gt; Initializing Premium Service Engine...
                </p>
              </div>

              <h1 className="font-serif text-[46px] font-black leading-[0.95] sm:text-7xl lg:text-[96px]">
                Service
                <br />
                <span className="gold-text">Console</span>
              </h1>

              <p className="mt-6 max-w-[650px] text-[15px] leading-7 text-[#eadcc2] sm:text-[16px] sm:leading-8">
                Computer repair, CCTV installation, solar setup, desktop
                upgrades and technical support — handled through one premium
                service experience.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {[
                  ["01", "Repair"],
                  ["02", "CCTV"],
                  ["03", "Solar"],
                  ["04", "Desktop"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden rounded-[20px] border border-[#dba13a]/20 bg-white/[0.04] p-4 transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black sm:rounded-[24px]"
                  >
                    <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />

                    <h3 className="relative font-serif text-2xl font-black text-[#dba13a] transition duration-500 group-hover:text-black sm:text-3xl">
                      {num}
                    </h3>

                    <p className="relative mt-1 text-[10px] font-black uppercase tracking-[2px] text-[#d8c8b1] transition duration-500 group-hover:text-black sm:text-xs sm:tracking-[3px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  onClick={onEnquire}
                  className="w-full rounded-[18px] bg-[#dba13a] px-6 py-4 text-sm font-black text-black transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_25px_70px_rgba(219,161,58,.25)] sm:w-auto sm:px-8"
                >
                  RUN SERVICE REQUEST
                </button>

                <a
                  href="tel:+919876543210"
                  className="w-full rounded-[18px] border border-[#dba13a]/35 px-6 py-4 text-center text-sm font-black text-[#dba13a] transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black sm:w-auto sm:px-8"
                >
                  CALL SUPPORT
                </a>
              </div>
            </div>
          </div>

          <div className="right-in delay-2 order-1 lg:order-2">
            <div className="relative mx-auto h-[560px] w-full max-w-[380px] sm:h-[690px] sm:max-w-[620px] lg:h-[760px] lg:max-w-[660px]">
              <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dba13a]/10 sm:h-[520px] sm:w-[520px] lg:h-[580px] lg:w-[580px]" />

              <div className="float absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[55px] border border-dashed border-[#dba13a]/25 sm:h-[430px] sm:w-[430px] sm:rounded-[80px] lg:h-[490px] lg:w-[490px]" />

              <div className="ring absolute left-1/2 top-1/2 h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 rounded-full p-[2px] shadow-[0_40px_120px_rgba(0,0,0,.9)] sm:h-[350px] sm:w-[350px] lg:h-[390px] lg:w-[390px]">
                <div className="inner h-full w-full rounded-full bg-[#050301] p-3 sm:p-4">
                  <div className="scan relative h-full w-full overflow-hidden rounded-full">
                    <img
                      src={productBg}
                      alt="Services"
                      className="h-full w-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-[#dba13a]/20" />

                    <div className="absolute inset-x-5 bottom-8 text-center sm:bottom-10">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[3px] text-[#dba13a] sm:text-xs sm:tracking-[4px]">
                        Service Engine
                      </p>
                      <h3 className="mt-2 font-serif text-3xl font-black text-white sm:text-4xl">
                        Active
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <TerminalService
                className="left-0 top-4 sm:left-0 sm:top-10"
                icon={s1}
                title="Repair"
                command="hardware.fix()"
              />

              <TerminalService
                className="right-0 top-20 sm:right-0 sm:top-28"
                icon={s2}
                title="CCTV"
                command="security.mount()"
                gold
              />

              <TerminalService
                className="left-0 bottom-24 sm:left-6 sm:bottom-32"
                icon={s3}
                title="Solar"
                command="energy.start()"
                gold
              />

              <TerminalService
                className="right-0 bottom-4 sm:right-8 sm:bottom-8"
                icon={s4}
                title="Desktop"
                command="system.upgrade()"
              />

              <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 rounded-full border border-[#dba13a]/30 bg-[#dba13a] px-6 py-3 text-xs font-black uppercase tracking-[4px] text-black shadow-[0_0_45px_rgba(219,161,58,.35)] sm:block">
                Service OS Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalService({ className, icon, title, command, gold = false }) {
  return (
    <div
      className={`float absolute z-20 w-[145px] rounded-[20px] border border-[#dba13a]/30 p-3 shadow-[0_20px_70px_rgba(0,0,0,.75)] backdrop-blur-xl transition duration-700 hover:z-40 hover:-translate-y-3 hover:scale-105 sm:w-[210px] sm:rounded-[28px] sm:p-5 lg:w-[230px] lg:rounded-[30px] ${
        gold ? "bg-[#dba13a] text-black" : "bg-black/75 text-white"
      } ${className}`}
    >
      <img
        src={icon}
        alt={title}
        className="h-10 w-10 object-contain sm:h-14 sm:w-14"
      />

      <h3
        className={`mt-3 font-serif text-xl font-black sm:mt-4 sm:text-3xl ${
          gold ? "text-black" : "text-[#dba13a]"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 font-mono text-[9px] sm:mt-3 sm:text-xs ${
          gold ? "font-black text-black" : "text-[#eadcc2]"
        }`}
      >
        &gt; {command}
      </p>
    </div>
  );
}

// function PremiumTicker() {
//   const services = [
//     { title: "Computer Repair", icon: s1, pos: "left-[3%] top-[42%]" },
//     { title: "CCTV Installation", icon: s2, pos: "left-[28%] top-[2%]" },
//     { title: "Solar Installation", icon: s3, pos: "left-[58%] top-[62%]" },
//     { title: "Desktop Service", icon: s4, pos: "right-[3%] top-[28%]" },
//   ];

//   return (
//     <section className="relative overflow-hidden px-4 py-36 sm:px-6 lg:px-8">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,161,58,.14),transparent_46%)]" />

//       <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dba13a]/10" />
//       <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#dba13a]/20 animate-spin" />

//       <div className="relative mx-auto max-w-[1400px]">
//         <div className="mb-20 text-center">
//           <p className="text-xs font-black uppercase tracking-[6px] text-[#dba13a]">
//             Service Journey
//           </p>

//           <h2 className="mt-4 font-serif text-5xl font-black text-white sm:text-6xl">
//             Premium <span className="gold-text">Service Path</span>
//           </h2>

//           <p className="mx-auto mt-5 max-w-[650px] text-[#d8c8b1]">
//             A smooth service flow from enquiry to expert support.
//           </p>
//         </div>

//         <div className="relative h-[580px]">
//           <svg
//             className="absolute inset-0 h-full w-full"
//             viewBox="0 0 1200 580"
//             fill="none"
//           >
//             <path
//               d="M70 315 C250 40, 420 520, 600 295 S960 40, 1130 295"
//               stroke="url(#pathGradient)"
//               strokeWidth="5"
//               strokeLinecap="round"
//               strokeDasharray="18 18"
//               opacity="0.85"
//             />

//             <path
//               d="M70 315 C250 40, 420 520, 600 295 S960 40, 1130 295"
//               stroke="#fff0a8"
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeDasharray="90 950"
//               className="animate-[serviceMove_4.5s_linear_infinite]"
//               filter="url(#glow)"
//             />

//             <circle r="7" fill="#dba13a">
//               <animateMotion
//                 dur="6s"
//                 repeatCount="indefinite"
//                 path="M70 315 C250 40, 420 520, 600 295 S960 40, 1130 295"
//               />
//             </circle>

//             <defs>
//               <linearGradient id="pathGradient" x1="0" y1="0" x2="1200" y2="0">
//                 <stop stopColor="transparent" />
//                 <stop offset="0.5" stopColor="#dba13a" />
//                 <stop offset="1" stopColor="transparent" />
//               </linearGradient>

//               <filter id="glow">
//                 <feGaussianBlur stdDeviation="4" result="blur" />
//                 <feMerge>
//                   <feMergeNode in="blur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>
//           </svg>

//           <div className="absolute left-1/2 top-1/2 grid h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#dba13a]/35 bg-black/85 shadow-[0_0_100px_rgba(219,161,58,.32)] backdrop-blur-xl">
//             <div className="absolute inset-4 rounded-full border border-dashed border-[#dba13a]/35 animate-spin" />
//             <div className="absolute inset-9 rounded-full border border-[#dba13a]/20" />

//             <div className="relative text-center">
//               <h3 className="font-serif text-5xl font-black text-[#dba13a]">
//                 04
//               </h3>
//               <p className="mt-1 text-xs font-black uppercase tracking-[4px] text-[#eadcc2]">
//                 Premium Services
//               </p>
//             </div>
//           </div>

//           {services.map((item, index) => (
//             <div
//               key={item.title}
//               className={`absolute ${item.pos} hidden sm:block`}
//               style={{ animationDelay: `${index * 0.25}s` }}
//             >
//               <div className="group relative">
//                 <div className="absolute inset-0 rounded-full bg-[#dba13a]/25 blur-2xl transition duration-700 group-hover:bg-[#dba13a]/50" />

//                 <div className="relative grid h-[160px] w-[160px] place-items-center rounded-full border border-[#dba13a]/35 bg-black/85 shadow-[0_0_65px_rgba(219,161,58,.28)] backdrop-blur-xl transition duration-700 hover:scale-125 hover:bg-[#dba13a]">
//                   <div className="absolute inset-3 rounded-full border border-[#dba13a]/15" />

//                   <img
//                     src={item.icon}
//                     alt={item.title}
//                     className="relative h-16 w-16 object-contain transition duration-700 group-hover:scale-110"
//                   />
//                 </div>

//                 <div className="mt-5 rounded-full border border-[#dba13a]/25 bg-black/75 px-5 py-3 text-center backdrop-blur-xl transition duration-500 group-hover:bg-[#dba13a]">
//                   <h3 className="text-xs font-black uppercase tracking-[3px] text-[#dba13a] transition duration-500 group-hover:text-black">
//                     {item.title}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="grid grid-cols-1 gap-5 sm:hidden">
//             {services.map((item) => (
//               <div
//                 key={item.title}
//                 className="flex items-center gap-5 rounded-[28px] border border-[#dba13a]/25 bg-black/60 p-5"
//               >
//                 <img src={item.icon} alt={item.title} className="h-14 w-14" />
//                 <h3 className="font-serif text-2xl font-black text-[#dba13a]">
//                   {item.title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes serviceMove {
//           from {
//             stroke-dashoffset: 0;
//           }
//           to {
//             stroke-dashoffset: -1040;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

function SearchConsole({ search, setSearch }) {
  const quickSearch = ["Repair", "CCTV", "Solar", "Desktop", "Hardware"];

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dba13a]/10 blur-[100px] sm:h-[360px] sm:w-[360px]" />

      <div className="rise relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-[#dba13a]/25 bg-black/50 p-[2px] shadow-[0_30px_90px_rgba(0,0,0,.55)] backdrop-blur-xl sm:rounded-[48px]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dba13a] to-transparent" />

        <div className="relative grid grid-cols-1 gap-7 rounded-[26px] bg-[radial-gradient(circle_at_20%_20%,rgba(219,161,58,.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01))] p-4 sm:rounded-[46px] sm:p-7 lg:grid-cols-[1fr_470px] lg:items-center">
          <div>
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-[#dba13a]/30 bg-black/45 px-4 py-2 backdrop-blur sm:gap-3 sm:px-5">
              <span className="h-2 w-2 rounded-full bg-[#dba13a] shadow-[0_0_18px_#dba13a] sm:h-2.5 sm:w-2.5" />
              <p className="text-[9px] font-black uppercase tracking-[2px] text-[#dba13a] sm:text-xs sm:tracking-[5px]">
                Smart Service Finder
              </p>
            </div>

            <h2 className="font-serif text-[34px] font-black leading-tight sm:text-5xl lg:text-6xl">
              Search Your <span className="gold">Service Need</span>
            </h2>

            <p className="mt-4 max-w-[760px] text-sm leading-7 text-[#e8d7bd] sm:text-[15px] sm:leading-8">
              Find computer repair, CCTV installation, solar setup, desktop
              service, hardware repair, software support, and optimization
              instantly.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {quickSearch.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSearch(item)}
                  className="rounded-full border border-[#dba13a]/25 bg-black/40 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#dba13a] transition duration-500 hover:-translate-y-1 hover:bg-[#dba13a] hover:text-black sm:px-5 sm:text-xs sm:tracking-[3px]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[24px] border border-[#dba13a]/25 bg-black/65 p-2 shadow-[0_0_45px_rgba(219,161,58,.12)] backdrop-blur sm:rounded-[32px] sm:p-3">
              <Icon
                name="search"
                size={20}
                className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-[#dba13a] sm:left-8"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type service name..."
                className="w-full rounded-[18px] border border-[#dba13a]/20 bg-[#0c0703] py-4 pl-12 pr-20 text-sm text-white outline-none placeholder:text-[#9d8664] transition duration-500 focus:border-[#dba13a] focus:shadow-[0_0_40px_rgba(219,161,58,.25)] sm:rounded-[24px] sm:py-5 sm:pl-14 sm:pr-24 sm:text-base"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-[#dba13a]/30 px-2 py-1 text-[10px] font-black text-[#dba13a] transition hover:bg-[#dba13a] hover:text-black sm:right-8 sm:px-3 sm:text-xs"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                ["04", "Services"],
                ["Fast", "Search"],
                ["Pro", "Support"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-[18px] border border-[#dba13a]/20 bg-black/40 p-3 text-center backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black sm:rounded-[22px] sm:p-4"
                >
                  <h3 className="font-serif text-xl font-black text-[#dba13a] sm:text-2xl">
                    {num}
                  </h3>
                  <p className="mt-1 text-[8px] font-black uppercase tracking-[2px] text-[#cdbb9f] sm:text-[10px] sm:tracking-[3px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceShowcase({ services, onEnquire }) {
  if (services.length === 0) {
    return (
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-[1000px] rounded-[28px] bg-[#dba13a] p-8 text-center text-black sm:rounded-[50px] sm:p-14">
          <h3 className="font-serif text-3xl font-black sm:text-5xl">
            No services found
          </h3>
          <p className="mt-3 font-semibold">
            Try repair, CCTV, solar or desktop.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 sm:pb-32 sm:pt-12 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,161,58,.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative mx-auto h-auto max-w-[1100px] lg:h-[450px]">
          <svg
            className="absolute inset-0 hidden h-full w-full opacity-80 lg:block"
            viewBox="0 0 1100 900"
            fill="none"
          >
            <ellipse
              cx="550"
              cy="450"
              rx="430"
              ry="280"
              stroke="#dba13a"
              strokeWidth="2"
              strokeDasharray="14 14"
              opacity="0.35"
            />
            <ellipse
              cx="550"
              cy="450"
              rx="300"
              ry="190"
              stroke="#dba13a"
              strokeWidth="1"
              strokeDasharray="8 10"
              opacity="0.25"
            />
          </svg>

          <div className="mx-auto mb-8 grid h-[170px] w-[170px] place-items-center rounded-full border border-[#dba13a]/35 bg-black/80 text-center shadow-[0_0_90px_rgba(219,161,58,.25)] backdrop-blur-xl sm:h-[220px] sm:w-[220px] lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:h-[250px] lg:w-[250px] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <div className="absolute inset-4 rounded-full border border-dashed border-[#dba13a]/30 animate-spin" />
            <div className="relative">
              <h3 className="font-serif text-5xl font-black text-[#dba13a] sm:text-6xl">
                {services.length}
              </h3>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[3px] text-[#eadcc2] sm:text-xs sm:tracking-[4px]">
                Active Modules
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:block">
            {services.map((service, index) => {
              const positions = [
                "lg:left-0 lg:top-[28%]",
                "lg:right-0 lg:top-[28%]",
                "lg:left-[10%] lg:bottom-0",
                "lg:right-[10%] lg:bottom-0",
              ];

              return (
                <ServiceOrbitCard
                  key={service.id}
                  service={service}
                  index={index}
                  className={positions[index % positions.length]}
                  onEnquire={onEnquire}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceOrbitCard({ service, index, className, onEnquire }) {
  return (
    <article
      className={`rise group relative w-full overflow-hidden rounded-[28px] border border-[#dba13a]/25 bg-black/75 shadow-[0_30px_90px_rgba(0,0,0,.65)] backdrop-blur-xl transition duration-700 hover:z-40 hover:-translate-y-3 hover:border-[#dba13a] sm:rounded-[38px] lg:absolute lg:w-[340px] lg:rounded-[46px] lg:hover:-translate-y-6 ${className}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative h-[190px] overflow-hidden sm:h-[220px]">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-125"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-[#dba13a] px-3 py-1.5 text-[10px] font-black text-black sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
          0{service.id}
        </div>

        <div className="absolute bottom-4 right-4 grid h-16 w-16 place-items-center rounded-full border border-[#dba13a]/40 bg-black/80 backdrop-blur sm:bottom-5 sm:right-5 sm:h-20 sm:w-20">
          <img
            src={service.icon}
            alt={service.title}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[10px] font-black uppercase tracking-[3px] text-[#dba13a] sm:text-xs sm:tracking-[4px]">
          Premium Module
        </p>

        <h3 className="mt-2 font-serif text-2xl font-black text-white transition duration-500 group-hover:text-[#dba13a] sm:text-3xl">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#eadcc2]">
          {service.short}
        </p>

        <button
          onClick={() => onEnquire(service)}
          className="mt-5 w-full rounded-full bg-[#dba13a] px-6 py-3 text-sm font-black text-black transition duration-500 hover:bg-white sm:mt-6"
        >
          ENQUIRE NOW
        </button>
      </div>
    </article>
  );
}

function ServiceCard({ service, index, onEnquire }) {
  const shapes = [
    "lg:col-span-3 clip-one",
    "lg:col-span-3 rounded-[42px]",
    "lg:col-span-2 clip-two",
    "lg:col-span-4 clip-three",
  ];

  return (
    <article
      className={`rise group spot relative min-h-[auto] overflow-hidden rounded-[28px] border border-[#dba13a]/25 transition duration-700 hover:-translate-y-3 hover:border-[#dba13a] hover:shadow-[0_40px_120px_rgba(219,161,58,.18)] sm:rounded-[42px] lg:min-h-[520px] lg:hover:-translate-y-5 ${
        shapes[index % shapes.length]
      }`}
      style={{ animationDelay: `${index * 0.12}s` }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
      }}
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[230px] overflow-hidden sm:min-h-[260px]">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030201] via-black/25 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-[#dba13a]/35 bg-black/70 px-3 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#dba13a] backdrop-blur sm:left-5 sm:top-5 sm:px-4 sm:text-xs sm:tracking-[3px]">
            {service.label}
          </div>

          <div className="absolute bottom-4 right-4 grid h-20 w-20 place-items-center rounded-[24px] border border-[#dba13a]/55 bg-black/80 shadow-[0_0_45px_rgba(219,161,58,.35)] transition duration-700 group-hover:rotate-6 group-hover:scale-110 sm:bottom-5 sm:right-5 sm:h-24 sm:w-24 sm:rounded-[30px]">
            <img
              src={service.icon}
              alt={service.title}
              className="h-12 w-12 object-contain sm:h-16 sm:w-16"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center p-5 sm:p-7">
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#dba13a] sm:text-xs sm:tracking-[4px]">
            Service 0{service.id}
          </p>

          <h3 className="mt-3 font-serif text-3xl font-black text-white transition duration-500 group-hover:text-[#dba13a] sm:text-4xl">
            {service.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-[#d9c8ad]">
            {service.short}
          </p>

          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-[#eadcc2] sm:grid-cols-2 sm:gap-3">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-transparent p-2 transition duration-300 hover:border-[#dba13a]/25 hover:bg-[#dba13a]/5 hover:text-[#dba13a]"
              >
                <Icon
                  name="check"
                  size={16}
                  className="shrink-0 text-[#dba13a]"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onEnquire(service)}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-[18px] border border-[#dba13a]/60 px-6 py-4 text-sm font-black text-[#dba13a] transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black sm:w-fit sm:rounded-[20px] sm:px-7"
          >
            ENQUIRE NOW <Icon name="arrow" size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
function Timeline() {
  const steps = [
    ["01", "Choose Service", "Pick the service you need."],
    ["02", "Send Enquiry", "Share your issue or requirement."],
    ["03", "Expert Response", "Our team will contact and guide you."],
    ["04", "Service Done", "Get professional and reliable support."],
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center sm:mb-20">
          <p className="text-[10px] font-black uppercase tracking-[4px] text-[#dba13a] sm:text-xs sm:tracking-[6px]">
            Service Journey
          </p>

          <h2 className="mt-4 font-serif text-[34px] font-black leading-tight text-white sm:text-5xl lg:text-7xl">
            Your <span className="gold">Service Roadmap</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-[520px] lg:h-[800px] lg:max-w-none">
          <svg
            className="absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1200 800"
            fill="none"
          >
            <path
              d="M150 120 C350 120,350 320,550 320 S750 520,950 520"
              stroke="#dba13a"
              strokeWidth="4"
              strokeDasharray="16 16"
              fill="none"
            />
          </svg>

          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#dba13a]/40 to-transparent lg:hidden" />

          {steps.map(([num, title, text], index) => {
            const positions = [
              "lg:left-[8%] lg:top-[8%]",
              "lg:left-[35%] lg:top-[30%]",
              "lg:left-[58%] lg:top-[52%]",
              "lg:right-[8%] lg:top-[62%]",
            ];

            return (
              <div
                key={num}
                className={`relative mb-8 pl-20 lg:absolute lg:mb-0 lg:pl-0 ${positions[index]}`}
              >
                <div className="group w-full lg:w-[280px]">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full border border-[#dba13a]/35 bg-black shadow-[0_0_45px_rgba(219,161,58,.2)] transition duration-700 hover:scale-110 hover:bg-[#dba13a] sm:h-20 sm:w-20 lg:relative lg:h-[120px] lg:w-[120px]">
                    <span className="font-serif text-2xl font-black text-[#dba13a] group-hover:text-black sm:text-3xl lg:text-4xl">
                      {num}
                    </span>
                  </div>

                  <div className="rounded-[24px] border border-[#dba13a]/20 bg-black/60 p-5 backdrop-blur-xl sm:rounded-[30px] sm:p-6 lg:mt-6">
                    <h3 className="font-serif text-xl font-black text-[#dba13a] sm:text-2xl">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#eadcc2] sm:mt-3">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dba13a]/10 lg:block" />
        </div>
      </div>
    </section>
  );
}

function SupportCTA({ onEnquire }) {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <style>{`
        @keyframes helixMove {
          0%, 100% { transform: translateY(0) scale(1); opacity: .55; }
          50% { transform: translateY(-18px) scale(1.08); opacity: 1; }
        }

        @keyframes linePulse {
          0%, 100% { opacity: .2; }
          50% { opacity: .9; }
        }

        .helix-dot {
          animation: helixMove 4s ease-in-out infinite;
        }

        .helix-line {
          animation: linePulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,161,58,.16),transparent_48%)]" />

      <div className="relative mx-auto max-w-[1350px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rise text-center lg:text-left">
            <p className="text-[10px] font-black uppercase tracking-[4px] text-[#dba13a] sm:text-xs sm:tracking-[6px]">
              Support DNA
            </p>

            <h2 className="mt-4 font-serif text-[36px] font-black leading-tight text-white sm:mt-5 sm:text-5xl lg:text-7xl">
              Support Built
              <br />
              <span className="gold">Into Every Step.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-sm leading-7 text-[#d8c8b1] sm:mt-6 sm:text-[16px] sm:leading-8 lg:mx-0">
              Repair, CCTV installation, solar setup, desktop service and
              technical support — connected through one smooth service system.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
              <a
                href="tel:+919876543210"
                className="rounded-full border border-[#dba13a]/25 bg-black/50 px-6 py-3 text-sm font-black text-[#dba13a] backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black sm:text-base"
              >
                +91 98765 43210
              </a>

              <a
                href="tel:+919876543211"
                className="rounded-full border border-[#dba13a]/25 bg-black/50 px-6 py-3 text-sm font-black text-[#dba13a] backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black sm:text-base"
              >
                +91 98765 43211
              </a>
            </div>

            <button
              onClick={onEnquire}
              className="mt-8 w-full rounded-full bg-[#dba13a] px-8 py-4 text-sm font-black text-black transition duration-700 hover:-translate-y-2 hover:scale-105 hover:bg-white hover:shadow-[0_0_70px_rgba(219,161,58,.4)] sm:w-auto sm:px-10 sm:text-base lg:mt-9"
            >
              START SUPPORT REQUEST
            </button>
          </div>

          <div className="rise delay-1">
            <div className="relative mx-auto h-[500px] max-w-[360px] sm:h-[620px] sm:max-w-[520px]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#dba13a]/40 to-transparent" />

              {[
                ["Repair", "left-0 top-[4%] sm:left-[5%]"],
                ["CCTV", "right-0 top-[22%] sm:right-[5%]"],
                ["Solar", "left-0 top-[42%] sm:left-[5%]"],
                ["Desktop", "right-0 top-[62%] sm:right-[5%]"],
                ["Support", "left-0 top-[80%] sm:left-[5%]"],
              ].map(([label, pos], index) => (
                <div
                  key={label}
                  className={`absolute ${pos} helix-dot`}
                  style={{ animationDelay: `${index * 0.35}s` }}
                >
                  <div className="relative">
                    <div className="absolute top-1/2 hidden h-[2px] w-[160px] -translate-y-1/2 bg-gradient-to-r from-[#dba13a] to-transparent helix-line sm:block lg:w-[210px]" />

                    <div className="relative grid h-20 w-20 place-items-center rounded-full border border-[#dba13a]/30 bg-black/75 text-center shadow-[0_0_45px_rgba(219,161,58,.28)] backdrop-blur-xl sm:h-24 sm:w-24">
                      <span className="font-serif text-base font-black text-[#dba13a] sm:text-xl">
                        {label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute left-1/2 top-1/2 grid h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#dba13a] text-black shadow-[0_0_90px_rgba(219,161,58,.45)] sm:h-[180px] sm:w-[180px]">
                <div className="text-center">
                  <Icon name="headset" size={38} className="mx-auto sm:size-[46px]" />
                  <h3 className="mt-2 font-serif text-2xl font-black sm:mt-3 sm:text-3xl">
                    Help
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#3b260e]/70 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,161,58,.08),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-5 text-sm text-[#e7d8c2] sm:grid-cols-2 sm:gap-7 lg:grid-cols-5">
        <div className="rise rounded-[24px] border border-[#dba13a]/20 bg-black/35 p-5 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#dba13a] sm:rounded-[30px] sm:p-6">
          <h3 className="font-serif text-2xl font-black text-[#d79d36] sm:text-3xl">
            GURUTRONICS
          </h3>

          <p className="mt-4 leading-7">
            Your one-stop solution for tech products, expert services, and
            reliable solutions.
          </p>
        </div>

        <FooterCol
          title="Quick Links"
          items={["Home", "Products", "Services", "About Us", "Contact Us"]}
        />

        <FooterCol
          title="Categories"
          items={[
            "Laptop Spares",
            "Computer Parts",
            "Gaming Zone",
            "CCTV Cameras",
            "Solar Panels",
          ]}
        />

        <FooterCol
          title="Our Services"
          items={[
            "Computer Repair",
            "CCTV Installation",
            "Solar Installation",
            "Desktop Service",
          ]}
        />

        <div className="rise rounded-[24px] border border-[#dba13a]/20 bg-black/35 p-5 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#dba13a] sm:rounded-[30px] sm:p-6">
          <h4 className="mb-4 font-serif text-lg font-black text-[#dba13a] sm:mb-5 sm:text-xl">
            Contact Us
          </h4>

          <p>+91 98765 43210</p>
          <p className="mt-3 break-words">info@gurutronics.com</p>
          <p className="mt-3">Chennai, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="rise rounded-[24px] border border-[#dba13a]/20 bg-black/35 p-5 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#dba13a] sm:rounded-[30px] sm:p-6">
      <h4 className="mb-4 font-serif text-lg font-black text-[#dba13a] sm:mb-5 sm:text-xl">
        {title}
      </h4>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-pointer transition duration-300 hover:translate-x-2 hover:text-[#dba13a]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustStrip() {
  const trustItems = [
    ["Premium Quality", "Only Original Products", h10],
    ["Secure Payments", "100% Safe & Secure", h11],
    ["Fast Delivery", "Quick & Reliable", h12],
    ["24/7 Support", "Always Here to Help", h13],
  ];

  return (
    <section className="relative overflow-hidden bg-[#100904] px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(219,161,58,.08),transparent)]" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-4 text-[#f3dfbf] sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {trustItems.map(([title, sub, icon], index) => (
          <div
            key={title}
            className="rise group relative overflow-hidden rounded-[24px] border border-[#6f4816]/80 bg-black/35 p-4 backdrop-blur transition duration-700 hover:-translate-y-3 hover:border-[#dba13a] hover:bg-[#dba13a] hover:text-black sm:rounded-[30px] sm:p-5"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />

            <div className="relative flex items-center gap-4">
              <img
                src={icon}
                alt={title}
                className="h-12 w-12 object-contain transition duration-700 group-hover:scale-125 group-hover:rotate-6 sm:h-[50px] sm:w-[50px]"
              />

              <div>
                <h4 className="text-sm font-black text-[#e4ad4d] transition duration-500 group-hover:text-black sm:text-base">
                  {title}
                </h4>

                <p className="text-xs text-[#e7d4b9] transition duration-500 group-hover:text-black sm:text-sm">
                  {sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EnquiryModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/85 px-4 py-6 backdrop-blur-sm sm:py-8">
      <div className="pop ring w-full max-w-[580px] rounded-[28px] p-[2px] shadow-2xl sm:rounded-[42px]">
        <div className="inner relative overflow-hidden rounded-[26px] bg-[#100904] p-5 text-white sm:rounded-[40px] sm:p-8">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#dba13a]/15 blur-3xl" />

          <div className="relative mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[3px] text-[#dba13a] sm:text-xs sm:tracking-[5px]">
                Gurutronics Request
              </p>

              <h3 className="mt-2 font-serif text-2xl font-black text-[#dba13a] sm:text-3xl">
                Service Enquiry
              </h3>

              <p className="mt-1 text-sm text-[#d8c8b1]">
                {service?.title || "General Service Request"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 rounded-full border border-[#dba13a]/30 p-2 text-[#dba13a] transition duration-500 hover:rotate-90 hover:bg-[#dba13a] hover:text-black"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <form className="relative space-y-4">
            <ModalInput placeholder="Your Name *" />
            <ModalInput placeholder="Phone Number *" />
            <ModalInput placeholder="Email Address" />

            <textarea
              className="min-h-[110px] w-full resize-none rounded-[20px] border border-[#dba13a]/25 bg-black/45 px-4 py-3 text-sm text-white outline-none placeholder:text-[#9d8664] transition duration-300 focus:-translate-y-1 focus:border-[#dba13a] focus:shadow-[0_0_35px_rgba(219,161,58,.18)] sm:min-h-[120px] sm:rounded-[24px] sm:text-base"
              placeholder="Describe your service requirement"
            />

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-[20px] bg-[#dba13a] py-4 text-sm font-black text-black transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_0_50px_rgba(219,161,58,.35)] sm:rounded-[24px] sm:text-base"
            >
              SUBMIT ENQUIRY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ModalInput({ placeholder }) {
  return (
    <input
      className="w-full rounded-[20px] border border-[#dba13a]/25 bg-black/45 px-4 py-3 text-sm text-white outline-none placeholder:text-[#9d8664] transition duration-300 focus:-translate-y-1 focus:border-[#dba13a] focus:shadow-[0_0_35px_rgba(219,161,58,.18)] sm:rounded-[24px] sm:text-base"
      placeholder={placeholder}
    />
  );
}