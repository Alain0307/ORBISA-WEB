import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe, Zap, TrendingUp, Search, MessageCircle, Rocket,
  CheckCircle, Star, ChevronDown, ArrowRight, Shield,
  BarChart2, Smartphone, Code, Monitor, Menu, X,
  Users, ChevronRight, Layers, Cpu, Lock
} from "lucide-react";
 
const C = {
  white:   "#FFFFFF",
  offwhite:"#F4F7FF",
  light:   "#EBF0FF",
  blue:    "#1565FF",
  bright:  "#1A6BFF",
  electric:"#0057FF",
  dark:    "#0A1628",
  navy:    "#0D1B2A",
  gray:    "#4A5568",
  lightgray:"#94A3B8",
  border:  "#DBEAFE",
};
 
const card = (hover = false) => ({
  background: "#FFFFFF",
  border: `1px solid ${hover ? C.blue : "#E2EAFF"}`,
  boxShadow: hover
    ? "0 20px 60px rgba(21,101,255,0.15), 0 4px 16px rgba(21,101,255,0.1)"
    : "0 4px 24px rgba(21,101,255,0.07), 0 1px 4px rgba(0,0,0,0.04)",
});
 

const WaveDown = ({ fill = C.offwhite }) => (
  <div style={{ lineHeight: 0, marginTop: -2 }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
    </svg>
  </div>
);
 
const WaveUp = ({ fill = C.white }) => (
  <div style={{ lineHeight: 0, marginBottom: -2 }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
      <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill={fill} />
    </svg>
  </div>
);
 
// ─── Contador animado ─────────────────────────────────────────────────
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};
 
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
 
const Badge = ({ children }) => (
  <span
    className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4"
    style={{ color: C.blue, background: C.light, border: `1px solid ${C.border}` }}
  >
    {children}
  </span>
);
 
// ─── NAVBAR ───────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
 
  const links = [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Precios",   href: "#planes"    },
    { label: "Opiniones", href: "#testimonios"},
  ];
 
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.98)",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(21,101,255,0.08)" : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo-removebg-preview.png" alt="OrbisaTech" style={{ height: "90px", width: "auto" }}  />
        </a>
 
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-bold transition-colors duration-200 hover:text-blue-600"
              style={{ color: C.gray }}
            >{l.label}</a>
          ))}
        </div>
 
        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(21,101,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white"
          style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, boxShadow: "0 4px 14px rgba(21,101,255,0.3)" }}
        >
          <MessageCircle size={15} /> Cotizar gratis
        </motion.a>
 
        <button className="md:hidden" style={{ color: C.dark }} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
 
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-6"
            style={{ background: C.white, borderTop: `1px solid ${C.border}` }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-base font-bold border-b"
                style={{ color: C.dark, borderColor: C.border }}
              >{l.label}</a>
            ))}
            <a href="#contacto"
              className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-black"
              style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})` }}
            >
              <MessageCircle size={16} /> Cotizar gratis
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
 
// ─── HERO ─────────────────────────────────────────────────────────────
const Hero = () => {
  const slides = [
    { label: "Landing page",    badge: "Alta conversión", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" },
    { label: "E-commerce",      badge: "+32% conversión", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80" },
    { label: "Web corporativa", badge: "+27% ventas",     img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80" },
    { label: "Dashboard SaaS",  badge: "Mejor UX",        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80" },
  ];
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []);
 
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: C.white }}
    >
      {/* Fondo con forma azul ondulada en esquina */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none overflow-hidden">
        <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "100%" }} preserveAspectRatio="xMaxYMid slice">
          <path d="M200,0 C350,0 800,0 800,0 L800,900 C800,900 350,900 200,900 C100,750 -50,600 80,450 C-50,300 100,150 200,0 Z"
            fill={`url(#heroGrad)`} opacity="0.08" />
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={C.blue} />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(21,101,255,0.08) 0%, transparent 70%)` }} />
      </div>
 
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(rgba(21,101,255,0.12) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.5,
      }} />
 
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black mb-8"
            style={{ background: C.light, border: `1px solid ${C.border}`, color: C.blue }}
          >
            <Rocket size={13} /> Entrega en 5–8 días · Desde $6,500 MXN · Pago único
          </motion.div>
 
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] mb-6" style={{ color: C.dark }}>
            Soluciones digitales para{" "}
            <span style={{ color: C.blue }}>
              hacer crecer
            </span>{" "}
            tu negocio.
          </h1>
 
          <p className="text-xl mb-10 leading-relaxed" style={{ color: C.gray }}>
            En OrbisaTech desarrollamos presencias digitales de alto impacto para negocios que quieren crecer. Tecnología moderna, diseño estratégico y resultados medibles desde el día uno.
          </p>
 
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <motion.a href="#contacto"
              whileHover={{ scale: 1.04, boxShadow: "0 10px 36px rgba(21,101,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white"
              style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, boxShadow: "0 4px 24px rgba(21,101,255,0.3)" }}
            >
              <MessageCircle size={18} /> Cotizar por WhatsApp
            </motion.a>
            <motion.a href="#planes" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-black"
              style={{ background: C.white, border: `2px solid ${C.blue}`, color: C.blue, boxShadow: "0 4px 16px rgba(21,101,255,0.1)" }}
            >
              Ver planes y precios <ChevronRight size={18} />
            </motion.a>
          </div>
 
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: 240, suffix: "%", label: "Más tráfico orgánico" },
              { value: 180, suffix: "%", label: "Tasa de conversión"   },
              { value: 50,  suffix: "+", label: "Proyectos entregados" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-2xl" style={{ background: C.light, border: `1px solid ${C.border}` }}>
                <div className="text-3xl font-black" style={{ color: C.blue }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs mt-1 font-bold" style={{ color: C.gray }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
 
        {/* Right — slideshow */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.2 }}>
          <div className="relative p-2 rounded-[2rem]"
            style={{ background: C.white, border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(21,101,255,0.15)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={cur}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.5 }}
                className="rounded-[1.6rem] overflow-hidden relative"
              >
                <img src={slides[cur].img} alt={slides[cur].label} className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 50%)" }} />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-black px-3 py-1 rounded-full mb-2 inline-block text-white"
                      style={{ background: C.blue }}>Proyecto real</span>
                    <p className="text-xl font-black text-white">{slides[cur].label}</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl text-sm font-black text-white"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                    {slides[cur].badge}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-3 pb-1">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCur(i)} className="rounded-full transition-all"
                  style={{ width: i === cur ? 24 : 8, height: 8, background: i === cur ? C.blue : C.border }} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
 
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ color: C.blue }}>
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};
 
const Features = () => {
  const [open, setOpen] = useState(null);

  const features = [
    {
      icon: <Search size={22} />,
      title: "Posicionamiento en Google",
      desc: "Implementamos SEO técnico desde la estructura. Tu sitio empieza a aparecer en búsquedas relevantes desde el primer día de publicación.",
      extra: "Trabajamos el SEO on-page, velocidad de carga, estructura de URLs, metaetiquetas y datos estructurados. Tu sitio queda listo para competir en Google desde el día del lanzamiento, sin necesidad de pagar publicidad.",
    },
    {
      icon: <Shield size={22} />,
      title: "Imagen que genera confianza",
      desc: "Diseñamos cada detalle para proyectar profesionalismo. Un visitante que confía en tu marca es un cliente que pregunta y compra.",
      extra: "Cuidamos tipografía, paleta de color, jerarquía visual y consistencia de marca en cada sección. El objetivo es que cualquier visitante perciba credibilidad desde los primeros segundos en tu sitio.",
    },
    {
      icon: <MessageCircle size={22} />,
      title: "Captación directa por WhatsApp",
      desc: "Integramos botones, formularios y CTAs estratégicos para que cada visita tenga un camino claro hacia tu línea de contacto.",
      extra: "Ubicamos los puntos de contacto estratégicamente a lo largo del sitio. Botón flotante de WhatsApp, formularios en secciones clave y llamadas a la acción redactadas para convertir, no solo informar.",
    },
    {
      icon: <Zap size={22} />,
      title: "Velocidad certificada",
      desc: "Sitios que cargan en menos de 3 segundos con Core Web Vitals optimizados. Más velocidad significa mejor posición y más conversiones.",
      extra: "Optimizamos imágenes, lazy loading, compresión de assets y caché del servidor. Apuntamos a un score de 90+ en Google PageSpeed tanto en móvil como en desktop.",
    },
    {
      icon: <Smartphone size={22} />,
      title: "Mobile-first desde el diseño",
      desc: "Más del 70% del tráfico viene de celulares. Cada sección está pensada para que la experiencia móvil sea impecable y fluida.",
      extra: "No adaptamos el diseño de escritorio al móvil — lo construimos al revés. Primero diseñamos para pantallas pequeñas y después escalamos, garantizando que la experiencia en celular sea perfecta.",
    },
    {
      icon: <BarChart2 size={22} />,
      title: "Métricas y analítica integrada",
      desc: "Conectamos Google Analytics y Meta Pixel para que tengas datos reales de comportamiento, tráfico y conversión desde el lanzamiento.",
      extra: "Configuramos eventos personalizados, embudos de conversión y reportes automáticos. Así puedes tomar decisiones basadas en datos reales, no en suposiciones.",
    },
  ];

  return (
    <>
      <WaveDown fill={C.offwhite} />
      <section className="py-20 px-6" style={{ background: C.offwhite }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge>Lo que incluye tu sitio</Badge>
              <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4" style={{ color: C.dark }}>
                Tecnología que trabaja{" "}
                <span style={{ color: C.blue }}>por ti las 24 horas</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: C.gray }}>
                Cada proyecto incluye todo lo que un negocio moderno necesita para competir en internet sin depender de agencias externas o costos mensuales.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  onClick={() => setOpen(open === i ? null : i)}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-3xl transition-all duration-300 cursor-pointer"
                  style={{
                    ...card(),
                    border: open === i ? `1.5px solid ${C.blue}` : undefined,
                    boxShadow: open === i ? `0 8px 32px rgba(21,101,255,0.15)` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: C.light, color: C.blue }}>
                      {f.icon}
                    </div>
                    <motion.div
                      animate={{ rotate: open === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} style={{ color: C.blue }} />
                    </motion.div>
                  </div>

                  <h3 className="text-lg font-black mb-2" style={{ color: C.dark }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.gray }}>{f.desc}</p>

                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                          <p className="text-sm leading-relaxed" style={{ color: C.dark }}>{f.extra}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <p className="text-sm mb-4 font-bold" style={{ color: C.gray }}>Desde $6,500 MXN · Entrega en 5–8 días · Sin mensualidades</p>
              <motion.a href="#contacto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black text-white"
                style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, boxShadow: "0 4px 24px rgba(21,101,255,0.3)" }}
              >
                <MessageCircle size={18} /> Cotizar ahora
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>
      <WaveUp fill={C.offwhite} />
    </>
  );
};



// ─── DIFERENCIADORES ─────────────────────────────────────────────────
const Differentiators = () => {
  const items = [
    { title: "Jóvenes, actualizados\ny sin miedo al cambio.",       highlight: "sin miedo al cambio." },
    { title: "Analizamos tu problema\ndesde todos los ángulos.",    highlight: "todos los ángulos." },
    { title: "Entregamos en tiempo.\nSiempre.",                     highlight: "Siempre." },
    { title: "Precio justo.\nSin letra chica.",                     highlight: "Sin letra chica." },
    { title: "Tu proyecto,\nnuestra prioridad.",                    highlight: "nuestra prioridad." },
    { title: "No solo entregamos.\nResolvemos.",                    highlight: "Resolvemos." },
  ];

  return (
    <section className="py-28 px-6" style={{ background: C.dark }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <Badge>¿Por qué ORBISA?</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: C.white }}>
              Lo que nos hace{" "}
              <span style={{ color: C.blue }}>diferentes.</span>
            </h2>
          </div>
        </FadeIn>

        <div>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ x: 12 }}
                className="flex items-baseline gap-8 py-8 transition-all duration-300 cursor-default"
                style={{ borderBottom: `1px solid rgba(21,101,255,0.12)` }}
              >
                <span className="font-black text-sm flex-shrink-0"
                  style={{ color: C.blue, opacity: 0.4, minWidth: 28 }}>
                  {item.num}
                </span>
                <h3 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: C.white }}>
                  {item.title.split(item.highlight)[0]}
                  <span style={{ color: C.blue }}>{item.highlight}</span>
                </h3>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
 
// ─── PROYECTOS ────────────────────────────────────────────────────────
const Projects = () => {
  const items = [
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
      tags: ["Landing Page", "CRO", "SEO"],
      title: "Plataforma de servicios B2B",
      desc: "Rediseño completo orientado a generación de leads. Reducimos la fricción de contacto y aumentamos las solicitudes mensuales.",
      stats: [{ v: "+41%", l: "Leads" }, { v: "+18%", l: "Retención" }, { v: "+27%", l: "Checkout" }],
    },
    {
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
      tags: ["E-commerce", "Mobile UI", "Producto"],
      title: "Tienda en línea de alto rendimiento",
      desc: "E-commerce con experiencia mobile-first, integración de pagos y dashboard de métricas en tiempo real.",
      stats: [{ v: "+32%", l: "Ventas" }, { v: "-40%", l: "Rebote" }, { v: "98/100", l: "Performance" }],
    },
  ];
 
  return (
    <section id="proyectos" className="py-28 px-6" style={{ background: C.white }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge>Proyectos realizados</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: C.dark }}>
              Resultados reales,{" "}
              <span style={{ color: C.blue }}>no solo diseño</span>
            </h2>
          </div>
        </FadeIn>
 
        <div className="flex flex-col gap-8">
          {items.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl overflow-hidden transition-all duration-300"
                style={card()}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(21,101,255,0.15),transparent)" }} />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full font-black"
                          style={{ background: C.light, color: C.blue, border: `1px solid ${C.border}` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black mb-3" style={{ color: C.dark }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: C.gray }}>{p.desc}</p>
                    <div className="flex gap-8">
                      {p.stats.map(s => (
                        <div key={s.l}>
                          <div className="text-2xl font-black" style={{ color: C.blue }}>{s.v}</div>
                          <div className="text-xs mt-0.5 font-bold" style={{ color: C.gray }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
 
        <FadeIn delay={0.15}>
          <div className="mt-12 text-center">
            <p className="text-sm mb-4 font-bold" style={{ color: C.gray }}>Cotiza gratis · Sin compromiso · Respuesta en minutos</p>
            <motion.a href="#contacto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-black text-white"
              style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, boxShadow: "0 4px 24px rgba(21,101,255,0.3)" }}
            >
              <MessageCircle size={18} /> Quiero resultados como estos
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
 
// ─── PLANES ───────────────────────────────────────────────────────────
const Plans = () => {
  const [tab, setTab] = useState("landing");
 
  const allPlans = {
    landing: [
      { name: "Esencial",    price: "$6,500",  popular: false, desc: "Ideal para lanzar tu presencia digital rápido y con fuerza.", features: ["1 página de alta conversión", "Diseño responsive mobile-first", "Botón WhatsApp + formulario", "SEO técnico base", "Entrega en 5–8 días hábiles", "Una ronda de ajustes incluida"] },
      { name: "Crecimiento", price: "$13,900", popular: true,  desc: "Para negocios que quieren posicionarse y generar leads consistentes.", features: ["Todo del plan Esencial", "Landing + página de gracias", "20 artículos SEO redactados", "Google Analytics + Meta Pixel", "Dominio .com/.mx primer año gratis", "Dos rondas de ajustes"] },
      { name: "Pro",         price: "$21,900", popular: false, desc: "Presencia digital completa para liderar tu sector.", features: ["Todo del plan Crecimiento", "Hasta 4 secciones avanzadas", "Blog por categorías para autoridad", "Datos estructurados Schema.org", "Core Web Vitals certificados", "Tres rondas de ajustes"] },
    ],
    web: [
      { name: "Esencial",    price: "$6,500",  popular: false, desc: "Tu empresa en internet con todo lo esencial.", features: ["Hasta 4 páginas", "Diseño responsive", "WhatsApp + formulario", "SEO técnico base", "Entrega en 5–8 días", "Una ronda de ajustes"] },
      { name: "Crecimiento", price: "$13,900", popular: true,  desc: "Más páginas, más tráfico, más contactos mensuales.", features: ["Todo del Esencial", "Hasta 7 páginas + blog", "20 artículos SEO", "4 correos corporativos", "Analytics + Meta Pixel", "Dos rondas de ajustes"] },
      { name: "Pro",         price: "$21,900", popular: false, desc: "El sitio más completo del mercado para tu industria.", features: ["Todo del Crecimiento", "Hasta 12 secciones", "Blog avanzado + categorías", "Correos ilimitados", "Velocidad ultra optimizada", "Tres rondas de ajustes"] },
    ],
    ecommerce: [
      { name: "Esencial",    price: "$18,500", popular: false, desc: "Tu primera tienda online lista para vender.", features: ["Hasta 50 productos", "Pasarela de pago integrada", "Carrito y checkout optimizados", "SEO base por producto", "Entrega en 7–10 días", "Una ronda de ajustes"] },
      { name: "Crecimiento", price: "$28,900", popular: true,  desc: "Escala tus ventas con herramientas de crecimiento.", features: ["Hasta 200 productos", "Múltiples métodos de pago", "Blog + email marketing", "Analytics avanzado", "Dominio + correos", "Dos rondas de ajustes"] },
      { name: "Pro",         price: "$44,900", popular: false, desc: "E-commerce de alto rendimiento sin límites.", features: ["Productos ilimitados", "Integraciones a medida", "Dashboard de reportes", "SEO avanzado por categoría", "Core Web Vitals certificado", "Tres rondas de ajustes"] },
    ],
  };
 
  const tabs = [
    { key: "landing",   label: "Landing Page" },
    { key: "web",       label: "Página Web"   },
    { key: "ecommerce", label: "E-commerce"   },
  ];
 
  return (
    <>
      <WaveDown fill={C.offwhite} />
      <section id="planes" className="py-20 px-6" style={{ background: C.offwhite }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge>Planes</Badge>
              <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4" style={{ color: C.dark }}>
                Inversión clara,{" "}
                <span style={{ color: C.blue }}>resultados concretos</span>
              </h2>
              <p className="text-lg" style={{ color: C.gray }}>Pago único, sin mensualidades ni sorpresas.</p>
            </div>
 
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-1 p-1 rounded-2xl" style={{ background: C.light, border: `1px solid ${C.border}` }}>
                {tabs.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className="px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300"
                    style={tab === t.key
                      ? { background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, color: "white", boxShadow: "0 4px 16px rgba(21,101,255,0.3)" }
                      : { background: "transparent", color: C.gray }
                    }
                  >{t.label}</button>
                ))}
              </div>
            </div>
          </FadeIn>
 
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {allPlans[tab].map((plan) => (
                <motion.div key={plan.name} whileHover={{ y: -6 }}
                  className="rounded-3xl p-8 flex flex-col relative transition-all duration-300"
                  style={plan.popular
                    ? { background: `linear-gradient(160deg, ${C.blue} 0%, #1A6BFF 100%)`, boxShadow: "0 24px 64px rgba(21,101,255,0.35)" }
                    : card()
                  }
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-black text-white"
                      style={{ background: C.dark, boxShadow: "0 4px 16px rgba(10,22,40,0.3)" }}>
                      Más popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-black mb-1" style={{ color: plan.popular ? "white" : C.dark }}>{plan.name}</h3>
                    <div className="text-4xl font-black mb-2" style={{ color: plan.popular ? "white" : C.blue }}>
                      {plan.price}<span className="text-base font-bold" style={{ color: plan.popular ? "rgba(255,255,255,0.7)" : C.gray }}> / único</span>
                    </div>
                    <p className="text-sm" style={{ color: plan.popular ? "rgba(255,255,255,0.8)" : C.gray }}>{plan.desc}</p>
                  </div>
                  <ul className="flex-grow space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: plan.popular ? "rgba(255,255,255,0.9)" : C.gray }}>
                        <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: plan.popular ? "white" : C.blue }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.a href="#contacto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-black"
                    style={plan.popular
                      ? { background: "white", color: C.blue }
                      : { background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, color: "white", boxShadow: "0 4px 20px rgba(21,101,255,0.3)" }
                    }
                  >
                    <MessageCircle size={15} /> Cotizar por WhatsApp
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
 
          <FadeIn delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-sm mb-4 font-bold" style={{ color: C.gray }}>¿Necesitas algo específico? Armamos una propuesta a tu medida.</p>
              <motion.a href="#contacto" whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 text-sm font-black hover:underline transition-colors"
                style={{ color: C.blue }}
              >
                Solicitar cotización a medida <ArrowRight size={16} />
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>
      <WaveUp fill={C.offwhite} />
    </>
  );
};
 
// ─── PROCESO ──────────────────────────────────────────────────────────
const Process = () => {
  const steps = [
    { num: "01", icon: <Search size={20} />,  title: "Diagnóstico estratégico",           desc: "Analizamos tu negocio, tu competencia y tus objetivos antes de diseñar una sola pantalla." },
    { num: "02", icon: <Monitor size={20} />, title: "Diseño UX/UI orientado a metas",    desc: "Prototipamos la experiencia visual alineada con tu marca y con el camino que debe seguir tu cliente." },
    { num: "03", icon: <Code size={20} />,    title: "Desarrollo con tecnología moderna", desc: "Código limpio, rápido y escalable. Construimos con las herramientas que mejor se adaptan a tu proyecto." },
    { num: "04", icon: <Rocket size={20} />,  title: "Lanzamiento y seguimiento",         desc: "Publicamos, verificamos el rendimiento y te entregamos las herramientas para medir y escalar." },
  ];
 
  return (
    <section className="py-28 px-6" style={{ background: C.white }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge>Proceso</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: C.dark }}>
              De la idea al sitio publicado{" "}
              <span style={{ color: C.blue }}>en menos de 2 semanas</span>
            </h2>
          </div>
        </FadeIn>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5 }}
                className="relative p-7 rounded-3xl h-full transition-all duration-300"
                style={card()}
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-px z-10"
                    style={{ background: `linear-gradient(90deg, ${C.blue}, transparent)` }} />
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})`, color: "white" }}>
                    {s.icon}
                  </div>
                  <span className="text-2xl font-black" style={{ color: C.border }}>{s.num}</span>
                </div>
                <h3 className="text-base font-black mb-2" style={{ color: C.dark }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.gray }}>{s.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
 
        <FadeIn>
          <div className="text-center p-10 rounded-3xl"
            style={{ background: `linear-gradient(135deg, ${C.blue} 0%, #1A6BFF 100%)`, boxShadow: "0 24px 64px rgba(21,101,255,0.3)" }}>
            <p className="text-sm mb-2 font-bold text-blue-100">SEO incluido · Pago único · Sin compromiso</p>
            <h3 className="text-2xl font-black mb-6 text-white">¿Listo para arrancar?</h3>
            <motion.a href="#contacto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black"
              style={{ background: "white", color: C.blue, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
            >
              <MessageCircle size={18} /> Hablemos
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
 
// ─── TESTIMONIOS ──────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    { name: "María G.",   role: "Directora Comercial, Retail",         initials: "MG", text: "OrbisaTech entendió exactamente lo que necesitábamos. El sitio carga rapidísimo y desde el lanzamiento el equipo de ventas notó un cambio real en la calidad de los contactos que llegan." },
    { name: "Carlos R.",  role: "Fundador, Servicios B2B",             initials: "CR", text: "Llevábamos años con una página que nadie visitaba. Tres semanas después del nuevo sitio ya teníamos leads por WhatsApp todas las semanas. El diseño transmite justo lo que somos." },
    { name: "Andrea L.",  role: "Marketing Manager, Sector Educativo", initials: "AL", text: "Necesitábamos explicar mejor nuestra propuesta de valor. El resultado fue inmediato: más solicitudes de información y una percepción de marca completamente distinta." },
    { name: "Jorge P.",   role: "Director General, Industria",         initials: "JP", text: "Valoro mucho que el proceso fue claro desde el primer día. No solo entregaron a tiempo, también nos ayudaron a estructurar el mensaje para que el sitio realmente vendiera." },
    { name: "Sofía V.",   role: "Coordinación Comercial, Consultoría", initials: "SV", text: "Nuestro sitio anterior se veía del 2015. Con el rediseño de OrbisaTech pasamos a recibir contactos de empresas más grandes y calificadas. La diferencia es notable." },
    { name: "Ricardo T.", role: "Fundador, E-commerce",                initials: "RT", text: "Lo que me convenció fue que no solo piensan en que se vea bonito, sino en que convierta. Redujeron la fricción en el checkout y eso se tradujo directo en ventas." },
  ];
 
  return (
    <>
      <WaveDown fill={C.offwhite} />
      <section id="testimonios" className="py-20 px-6" style={{ background: C.offwhite }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge>Testimonios</Badge>
              <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: C.dark }}>
                Negocios que ya{" "}
                <span style={{ color: C.blue }}>crecen con nosotros</span>
              </h2>
            </div>
          </FadeIn>
 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div whileHover={{ y: -5 }}
                  className="p-7 rounded-3xl flex flex-col h-full transition-all duration-300"
                  style={card()}
                >
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={C.blue} style={{ color: C.blue }} />)}
                  </div>
                  <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: C.gray }}>"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.bright})` }}>
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: C.dark }}>{r.name}</p>
                      <p className="text-xs" style={{ color: C.lightgray }}>{r.role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <WaveUp fill={C.offwhite} />
    </>
  );
};
 
// ─── CTA FINAL ────────────────────────────────────────────────────────
const CtaFinal = () => (
  <section id="contacto" className="py-28 px-6 relative overflow-hidden"
    style={{ background: C.white }}>
    {/* Fondo ondulado azul */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
        <path d="M0,400 C300,300 600,500 900,380 C1200,260 1350,420 1440,350 L1440,600 L0,600 Z"
          fill={C.light} opacity="0.7" />
        <path d="M0,480 C400,380 800,520 1200,440 C1350,410 1420,460 1440,450 L1440,600 L0,600 Z"
          fill={C.border} opacity="0.5" />
      </svg>
    </div>
 
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <FadeIn>
        <div className="p-12 rounded-[2.5rem]"
          style={{ background: `linear-gradient(160deg, ${C.blue} 0%, #1A6BFF 100%)`, boxShadow: "0 32px 80px rgba(21,101,255,0.35)" }}>
          <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 text-blue-900"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            ¿Hablamos?
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-2 mb-6 leading-[1.05] text-white">
            Tu próximo cliente{" "}
            <span style={{ color: "#93C5FD" }}>ya está buscándote en Google</span>
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Agenda una asesoría gratuita con nuestro equipo y en menos de 30 minutos tendrás claridad sobre qué necesita tu negocio para crecer en internet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <motion.a href="https://wa.me/525574888598"
              whileHover={{ scale: 1.05, boxShadow: "0 14px 44px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg font-black"
              style={{ background: "white", color: C.blue, boxShadow: "0 6px 28px rgba(0,0,0,0.15)" }}
            >
              <MessageCircle size={22} /> Cotizar por WhatsApp
            </motion.a>
            <motion.a href="#proyectos" whileHover={{ scale: 1.04 }}
              className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-lg font-black text-white"
              style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.4)" }}
            >
              Ver proyectos <ArrowRight size={18} />
            </motion.a>
          </div>
          <p className="text-sm text-blue-200">Asesoría gratuita · Sin compromiso · Respuesta en minutos</p>
        </div>
      </FadeIn>
    </div>
  </section>
);
 
// ─── FOOTER ───────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-10 px-6" style={{ background: C.dark, borderTop: `4px solid ${C.blue}` }}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <img src="/logo-removebg-preview.png" alt="OrbisaTech" style={{ height: "70px", width: "auto" }}  className="brightness-0 invert" />
      <p className="text-sm" style={{ color: C.lightgray }}>© 2026 OrbisaTech. Todos los derechos reservados.</p>
      <div className="flex gap-6">
        <a href="#" className="text-sm font-bold hover:text-blue-400 transition-colors" style={{ color: C.lightgray }}>Términos</a>
        <a href="#" className="text-sm font-bold hover:text-blue-400 transition-colors" style={{ color: C.lightgray }}>FAQs</a>
      </div>
    </div>
  </footer>
);
 
// ─── EXPORT ───────────────────────────────────────────────────────────
const LandingPage = () => (
  <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
    <Navbar />
    <Hero />
    <Features />
     <Differentiators />
    <Projects />
    <Plans />
    <Process />
    <Testimonials />
    <CtaFinal />
    <Footer />
  </div>
);
 
export default LandingPage;