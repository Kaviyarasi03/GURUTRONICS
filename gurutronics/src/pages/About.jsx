import React from "react";
import Header from "../components/Header";

import aboutShowroom from "../assets/about_bg.png";
import customer1 from "../assets/customer1.png";
import customer2 from "../assets/customer2.png";
import customer3 from "../assets/customer3.png";
import customer4 from "../assets/customer4.png";
import founder from "../assets/founder.png";
import mapImg from "../assets/map.png";
import h11 from "../assets/h11.png";
import logo from "../assets/logo_home.png";

const customers = [
  { name: "Mr. Karthik", image: customer1 },
  { name: "Mr. Senthil", image: customer2 },
  { name: "Mr. Praveen", image: customer3 },
  { name: "Mr. Vignesh", image: customer4 },
  { name: "Founder Arun Kumar", image: founder },
];

const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.qty, 0);
};

const inputClass =
  "w-full rounded-2xl border border-[#dba13a]/25 bg-[#090602]/80 px-5 py-4 text-white outline-none placeholder:text-[#987b4d] transition-all duration-500 focus:-translate-y-1 focus:border-[#dba13a] focus:bg-[#140d05] focus:shadow-[0_0_35px_rgba(219,161,58,.25)]";

const Icon = ({ name, size = 32, className = "" }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const icons = {
    target: (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
        <path d="m18 6 3-3" />
      </svg>
    ),
    eye: (
      <svg {...common}>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    phone: (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    map: (
      <svg {...common}>
        <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    clock: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
    ),
    whatsapp: (
      <svg {...common}>
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8.5c.4 3 2.2 4.8 5.2 5.7l1.1-1.1" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
    zap: (
      <svg {...common}>
        <path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" />
      </svg>
    ),
    cpu: (
      <svg {...common}>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  };

  return icons[name] || icons.shield;
};

export default function About() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = () => {
    const { name, email, phone, message } = formData;
    if (!name || !phone || !message) return;

    const subject = `Gurutronics Enquiry from ${name}`;
    const body = `
Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

Message:
${message}
`;

    window.location.href = `mailto:kaviyarasi1603@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsApp = () => {
    const { name, email, phone, message } = formData;
    if (!name || !phone || !message) return;

    const whatsappMessage = `
Hello Gurutronics,

I have an enquiry.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

Message:
${message}
`;

    window.open(
      `https://wa.me/917401726784?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020201] text-white">
      <style>{`
        @keyframes introLeft {
          from { opacity: 0; transform: translateX(-90px) rotateY(-18deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }

        @keyframes introRight {
          from { opacity: 0; transform: translateX(90px) rotateY(18deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }

        @keyframes rise {
          from { opacity: 0; transform: translateY(65px) scale(.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(120%); opacity: 0; }
        }

        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .85; transform: scale(1.12); }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 90px 90px; }
        }

        .intro-left { animation: introLeft 1s cubic-bezier(.16,1,.3,1) both; }
        .intro-right { animation: introRight 1s cubic-bezier(.16,1,.3,1) both; }
        .rise { animation: rise .95s cubic-bezier(.16,1,.3,1) both; }

        .delay-1 { animation-delay: .15s; }
        .delay-2 { animation-delay: .3s; }
        .delay-3 { animation-delay: .45s; }
        .delay-4 { animation-delay: .6s; }

        .gold-title {
          background: linear-gradient(90deg, #fff7c8, #dba13a, #7b430b, #fff7c8);
          background-size: 230% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .cyber-grid {
          background-image:
            linear-gradient(rgba(219,161,58,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(219,161,58,.08) 1px, transparent 1px);
          background-size: 90px 90px;
          animation: gridMove 18s linear infinite;
        }

        .float { animation: float 5s ease-in-out infinite; }
        .pulse { animation: pulse 5s ease-in-out infinite; }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        .premium-border {
          position: relative;
          overflow: hidden;
        }

        .premium-border::before {
          content: "";
          position: absolute;
          inset: -60%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(219,161,58,.95),
            transparent,
            rgba(255,230,150,.7),
            transparent
          );
          animation: rotateGlow 8s linear infinite;
        }

        .premium-inner {
          position: relative;
          z-index: 1;
        }

        .scan-line::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 45%;
          background: linear-gradient(to bottom, transparent, rgba(219,161,58,.16), transparent);
          animation: scan 4s ease-in-out infinite;
          pointer-events: none;
        }

        .cut-card {
          clip-path: polygon(0 0, 100% 0, 100% 86%, 88% 100%, 0 100%);
        }

        .hero-tilt {
          transform: perspective(1000px) rotateY(-7deg) rotateX(4deg);
          transition: .7s ease;
        }

        .hero-tilt:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
        }
      `}</style>

      <Header cartCount={getCartCount()} />

      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-45" />
      <div className="pointer-events-none absolute left-[-180px] top-28 h-[520px] w-[520px] rounded-full bg-[#dba13a]/20 blur-[160px] pulse" />
      <div className="pointer-events-none absolute right-[-220px] top-[760px] h-[600px] w-[600px] rounded-full bg-[#7b430b]/25 blur-[180px] pulse" />

      <section className="relative px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-14 lg:min-h-[650px] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="intro-left">
            <div className="mb-6 flex w-fit items-center gap-3 rounded-full border border-[#dba13a]/35 bg-black/50 px-5 py-3 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#dba13a] shadow-[0_0_20px_#dba13a]" />
              <p className="text-xs font-black uppercase tracking-[5px] text-[#dba13a]">
                Chennai Tech Hub
              </p>
            </div>

            <h1 className="font-serif text-5xl font-black leading-[1.02] sm:text-7xl lg:text-[90px]">
              Future
              <br />
              <span className="gold-title">Ready Tech</span>
            </h1>

            <p className="mt-8 max-w-[650px] text-[17px] leading-9 text-[#eadcc2]">
              Gurutronics is your premium technology destination for computer
              components, CCTV systems, solar solutions, and professional
              technical services built on trust and quality.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <HeroMetric value="01" label="Quality" />
              <HeroMetric value="02" label="Trust" />
              <HeroMetric value="03" label="Support" />
            </div>
          </div>

          <div className="intro-right delay-2">
            <div className="relative">
              <div className="absolute -left-8 top-10 z-20 hidden rounded-[30px] border border-[#dba13a]/35 bg-black/75 p-5 shadow-[0_0_40px_rgba(219,161,58,.22)] backdrop-blur-xl sm:block float">
                <Icon name="cpu" className="text-[#dba13a]" />
                <h3 className="mt-2 font-serif text-2xl font-black text-[#dba13a]">
                  Pro Service
                </h3>
              </div>

              <div className="absolute -right-3 bottom-12 z-20 rounded-[30px] border border-[#dba13a]/35 bg-black/75 p-5 shadow-[0_0_40px_rgba(219,161,58,.22)] backdrop-blur-xl float">
                <Icon name="zap" className="text-[#dba13a]" />
                <h3 className="mt-2 font-serif text-2xl font-black text-[#dba13a]">
                  Smart Tech
                </h3>
              </div>

              <div className="premium-border hero-tilt rounded-[48px] p-[3px] shadow-[0_45px_140px_rgba(0,0,0,.85)]">
                <div className="premium-inner rounded-[45px] bg-[#050301] p-4">
                  <div className="scan-line relative overflow-hidden rounded-[36px]">
                    <img
                      src={aboutShowroom}
                      alt="Gurutronics showroom"
                      className="h-[360px] w-full rounded-[36px] object-cover sm:h-[480px] lg:h-[560px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-[#dba13a]/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceMarquee />

      <section className="relative mx-auto max-w-[1450px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <MissionCard
            icon="target"
            title="Our Mission"
            text="To deliver high-quality technology products and reliable services with honesty, dedication, and expert support for every customer."
          />
          <MissionCard
            icon="eye"
            title="Our Vision"
            text="To become Chennai’s most trusted technology brand by combining premium products, strong service, and long-term customer relationships."
          />
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-full skew-y-[-3deg] bg-[#0f0803]" />
        <div className="relative mx-auto max-w-[1450px]">
          <SectionHead small="Customer Trust" title="Why Choose" highlight="Gurutronics?" />

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rise cut-card border border-[#dba13a]/25 bg-black/45 p-8 backdrop-blur-xl">
              <h3 className="font-serif text-4xl font-black text-[#dba13a]">
                Not Just Products.
                <br />
                Real Tech Support.
              </h3>
              <p className="mt-6 text-[17px] leading-9 text-[#eadcc2]">
                We help customers choose the right products, install reliable
                systems, and receive proper service support whenever needed.
              </p>

              <div className="mt-8 space-y-5">
                <TimelineItem number="01" text="Premium product selection" />
                <TimelineItem number="02" text="Honest technical guidance" />
                <TimelineItem number="03" text="Long-term customer support" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
              {customers.map((item, index) => (
                <CustomerCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-4 py-16 sm:px-6 lg:px-10">
        <SectionHead small="Reach Us" title="Contact" highlight="Gurutronics" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.15fr_0.95fr]">
          <ContactDetails />
          <MessageForm
            formData={formData}
            handleChange={handleChange}
            handleSendMessage={handleSendMessage}
            handleWhatsApp={handleWhatsApp}
          />
           
          <LocationPanel />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="premium-border mx-auto max-w-[1450px] rounded-[45px] p-[2px]">
          <div className="premium-inner rounded-[43px] bg-[#080501] p-8">
            <div className="grid grid-cols-1 items-center gap-8 text-center lg:grid-cols-[0.35fr_1.3fr_0.35fr] lg:text-left">
              <div className="mx-auto rounded-full border border-[#dba13a]/35 bg-black/60 p-5 float">
                <img src={h11} alt="Security" className="h-24 w-24 object-contain" />
              </div>

              <div>
                <p className="text-lg leading-9 text-[#eadcc2]">
                  At Gurutronics, we are committed to quality, trust, and
                  excellence in everything we do.
                </p>
                <h3 className="mt-4 font-serif text-3xl font-black text-[#dba13a] sm:text-4xl">
                  Thank you for choosing us as your trusted technology partner!
                </h3>
              </div>

              <div className="mx-auto rounded-[30px] border border-[#dba13a]/35 bg-black/60 p-5 transition duration-500 hover:scale-110">
                <img src={logo} alt="Gurutronics Logo" className="h-24 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroMetric({ value, label }) {
  return (
    <div className="group rounded-[26px] border border-[#dba13a]/25 bg-black/55 p-5 backdrop-blur transition duration-500 hover:-translate-y-3 hover:border-[#dba13a] hover:bg-[#dba13a] hover:text-black">
      <h3 className="font-serif text-3xl font-black text-[#dba13a] group-hover:text-black">
        {value}
      </h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-[3px] text-[#cdbb9f] group-hover:text-black">
        {label}
      </p>
    </div>
  );
}

function ServiceMarquee() {
  const items = [
    "Computer Components",
    "CCTV Systems",
    "Solar Solutions",
    "Tech Support",
    "Premium Service",
    "Trusted Quality",
  ];

  return (
    <section className="overflow-hidden border-y border-[#dba13a]/25 bg-[#dba13a] py-4 text-black">
      <div className="marquee-track">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-10 px-5">
            {items.map((item) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap font-serif text-2xl font-black uppercase tracking-[4px]"
              >
                {item} ✦
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Marquee Strip ── */
function MarqueeStrip() {
  const items = ["Laptop Spares", "Computer Parts", "Gaming Zone", "CCTV Cameras", "Solar Panels", "Accessories", "Networking", "Expert Services"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "linear-gradient(90deg, #f5c363, #c98218)", padding: "14px 0", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 32px", fontWeight: 900, fontSize: 13, color: "#1d1005", textTransform: "uppercase", letterSpacing: "0.15em", whiteSpace: "nowrap" }}>
            <Icon name="zap" size={14} /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MissionCard({ icon, title, text }) {
  return (
    <article className="rise group cut-card border border-[#dba13a]/25 bg-[#080501] p-8 transition duration-700 hover:-translate-y-4 hover:border-[#dba13a] hover:shadow-[0_40px_100px_rgba(219,161,58,.18)]">
      <div className="flex flex-col gap-7 sm:flex-row">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[28px] border border-[#dba13a]/40 bg-[#140d05] text-[#dba13a] transition duration-700 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#dba13a] group-hover:text-black">
          <Icon name={icon} size={50} />
        </div>
        <div>
          <h2 className="font-serif text-4xl font-black text-[#dba13a]">
            {title}
          </h2>
          <p className="mt-5 text-[17px] leading-9 text-[#eadcc2]">{text}</p>
        </div>
      </div>
    </article>
  );
}

function SectionHead({ small, title, highlight }) {
  return (
    <div className="rise text-center">
      <p className="mx-auto mb-5 w-fit rounded-full border border-[#dba13a]/30 bg-black/40 px-6 py-2 text-xs font-black uppercase tracking-[5px] text-[#dba13a]">
        {small}
      </p>
      <h2 className="font-serif text-4xl font-black sm:text-5xl lg:text-6xl">
        {title} <span className="gold-title">{highlight}</span>
      </h2>
    </div>
  );
}

function TimelineItem({ number, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dba13a] font-black text-black">
        {number}
      </div>
      <p className="text-[#eadcc2]">{text}</p>
    </div>
  );
}

function CustomerCard({ item, index }) {
  return (
    <div
      className="rise group"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="relative overflow-hidden rounded-[32px] border border-[#dba13a]/25 bg-black/50 p-3 transition duration-700 hover:-translate-y-5 hover:rotate-2 hover:border-[#dba13a] hover:shadow-[0_25px_70px_rgba(219,161,58,.18)]">
        <img
          src={item.image}
          alt={item.name}
          className="h-[165px] w-full rounded-[24px] object-cover transition duration-700 group-hover:scale-125"
        />
        <div className="absolute inset-x-3 bottom-3 rounded-b-[24px] bg-black/75 p-3 text-center backdrop-blur">
          <h3 className="text-sm font-black text-[#dba13a]">{item.name}</h3>
        </div>
      </div>
    </div>
  );
}

function ContactDetails() {
  return (
    <Panel>
      <h3 className="font-serif text-3xl font-black text-[#dba13a]">
        Contact Details
      </h3>
      <p className="mt-2 text-sm text-[#cdbb9f]">Reach us anytime</p>

      <div className="mt-8 space-y-5">
        <ContactRow icon="phone" text="9361670331" />
        <ContactRow icon="phone" text="6385183586" />
        <ContactRow icon="mail" text="gurutronicschennai@gmail.com" />
        <ContactRow icon="map" text="Chennai, Tamil Nadu, India" />
      </div>

      <div className="mt-8 rounded-[28px] border border-[#dba13a]/25 bg-[#120a04] p-5">
        <div className="flex gap-4">
          <Icon name="clock" className="shrink-0 text-[#dba13a]" />
          <div>
            <h4 className="font-black text-[#dba13a]">Business Hours</h4>
            <p className="mt-2 text-sm text-[#eadcc2]">
              Mon - Sat: 9:00 AM - 8:00 PM
            </p>
            <p className="text-sm text-[#eadcc2]">
              Sunday: 10:00 AM - 5:00 PM
            </p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function MessageForm({
  formData,
  handleChange,
  handleSendMessage,
  handleWhatsApp,
}) {
  return (
    <Panel>
      <h3 className="text-center font-serif text-3xl font-black text-[#dba13a]">
        Send Message
      </h3>
      <p className="mt-2 text-center text-sm text-[#cdbb9f]">
        Tell us what you need
      </p>

      <form className="mt-7 space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your Name *" />
        <input name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="Your Email *" />
        <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Your Phone *" />
        <textarea name="message" value={formData.message} onChange={handleChange} className={`${inputClass} min-h-[125px] resize-none`} placeholder="Your Message *" />

        <button
          type="button"
          onClick={handleSendMessage}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#dba13a] px-6 py-4 font-black text-black transition duration-500 hover:-translate-y-2 hover:bg-white"
        >
          <Icon name="mail" size={20} /> Send Message
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#dba13a] px-6 py-4 font-black text-[#dba13a] transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black"
        >
          <Icon name="whatsapp" size={20} /> Chat on WhatsApp
        </button>
      </form>
    </Panel>
  );
}

function LocationPanel() {
  return (
    <Panel>
      <h3 className="text-center font-serif text-3xl font-black text-[#dba13a]">
        Our Location
      </h3>

      <div className="scan-line relative mt-7 overflow-hidden rounded-[30px] border border-[#dba13a]/25">
        <img
          src={mapImg}
          alt="Gurutronics location map"
          className="h-[310px] w-full object-cover transition duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/35">
          <div className="rounded-[28px] bg-black/75 p-5 text-center backdrop-blur">
            <Icon name="map" className="mx-auto text-[#dba13a]" />
            <h4 className="mt-2 font-black">Gurutronics</h4>
            <p className="text-sm text-[#eadcc2]">Chennai, Tamil Nadu</p>
          </div>
        </div>
      </div>

      <a
        href="https://www.google.com/maps/search/?api=1&query=Chennai+Tamil+Nadu+India"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#dba13a] px-6 py-4 font-black text-[#dba13a] transition duration-500 hover:-translate-y-2 hover:bg-[#dba13a] hover:text-black"
      >
        <Icon name="map" size={20} /> Get Directions
      </a>
    </Panel>
  );
}

function Panel({ children }) {
  return (
    <div className="rise group relative overflow-hidden rounded-[38px] border border-[#dba13a]/25 bg-[#070401]/90 p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)] transition duration-700 hover:-translate-y-4 hover:border-[#dba13a] hover:shadow-[0_35px_110px_rgba(219,161,58,.18)]">
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#dba13a]/10 blur-3xl transition duration-700 group-hover:bg-[#dba13a]/20" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ContactRow({ icon, text }) {
  return (
    <p className="flex items-start gap-4 rounded-2xl border border-transparent p-2 text-[#eadcc2] transition duration-500 hover:translate-x-2 hover:border-[#dba13a]/20 hover:bg-[#dba13a]/5 hover:text-[#dba13a]">
      <Icon name={icon} size={23} className="shrink-0 text-[#dba13a]" />
      <span className="break-words">{text}</span>
    </p>
  );
}