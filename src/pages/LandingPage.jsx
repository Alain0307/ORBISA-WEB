import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe, Zap, TrendingUp, Search, MessageCircle, Rocket,
  CheckCircle, Star, ChevronDown, ArrowRight, Shield,
  BarChart2, Smartphone, Code, Monitor, Menu, X,
  Users, ChevronRight, Layers, Cpu, Lock
} from "lucide-react";

// ─── Paleta Orbisa Tech ───────────────────────────────────────────────
const C = {
  navy:   "#0B1120",
  dark:   "#0D1525",
  mid:    "#1E2D4A",
  blue:   "#2563EB",
  bright: "#3B82F6",
  light:  "#60A5FA",
  white:  "#F8FAFC",
  gray:   "#94A3B8",
};

// ─── Liquid Glass mixin ───────────────────────────────────────────────
// Genera el estilo inline para el efecto liquid glass
const glass = (opacity = 0.08, blur = 18, border = 0.18) => ({
  background: `rgba(30, 45, 74, ${opacity})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: `1px solid rgba(96, 165, 250, ${border})`,
  boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(96,165,250,0.12), inset 0 -1px 0 rgba(0,0,0,0.1)`,
});

const glassHover = {
  background: "rgba(37, 99, 235, 0.12)",
  backdropFilter: "blur(20px) saturate(200%)",
  WebkitBackdropFilter: "blur(20px) saturate(200%)",
  border: "1px solid rgba(96, 165, 250, 0.35)",
  boxShadow: "0 16px 48px rgba(37,99,235,0.2), inset 0 1px 0 rgba(96,165,250,0.2), inset 0 -1px 0 rgba(0,0,0,0.15)",
};

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

// ─── FadeIn wrapper ───────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── Badge ────────────────────────────────────────────────────────────
const Badge = ({ children }) => (
  <span
    className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4"
    style={{ color: C.light, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.28)" }}
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
      style={scrolled ? { ...glass(0.12, 24, 0.22), borderTop: "none", borderLeft: "none", borderRight: "none" } : { background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#2563EB,#60A5FA)", boxShadow: "0 4px 14px rgba(37,99,235,0.45)" }}
          >
            <Globe size={18} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight" style={{ color: C.white }}>
            Orbisa<span style={{ color: C.bright }}>Tech</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-semibold transition-colors duration-200 hover:text-blue-400"
              style={{ color: C.gray }}
            >{l.label}</a>
          ))}
        </div>

        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow: "0 4px 18px rgba(37,99,235,0.4)" }}
        >
          <MessageCircle size={15} /> Cotizar gratis
        </motion.a>

        <button className="md:hidden" style={{ color: C.white }} onClick={() => setOpen(!open)}>
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
            style={glass(0.18, 24, 0.2)}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-base font-semibold border-b"
                style={{ color: C.light, borderColor: "rgba(37,99,235,0.15)" }}
              >{l.label}</a>
            ))}
            <a href="#contacto"
              className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold"
              style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)" }}
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
    { label: "Landing page", badge: "Alta conversión",    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" },
    { label: "E-commerce",   badge: "+32% conversión",    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80" },
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
      style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0D1B35 55%, #0B1120 100%)` }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />

      {/* Orbes */}
      <motion.div animate={{ scale:[1,1.18,1], opacity:[0.2,0.32,0.2] }} transition={{ duration:8, repeat:Infinity }}
        className="absolute top-16 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 68%)" }} />
      <motion.div animate={{ scale:[1,1.12,1], opacity:[0.1,0.18,0.1] }} transition={{ duration:11, repeat:Infinity, delay:3 }}
        className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 68%)" }} />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left */}
        <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.85 }}>
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-8"
            style={{ background:"rgba(37,99,235,0.13)", border:"1px solid rgba(37,99,235,0.32)", color:C.light }}
          >
            <Rocket size={13} /> Entrega en 5–8 días · Desde $6,500 MXN · Pago único
          </motion.div>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] mb-6" style={{ color:C.white }}>
            Sitios web que{" "}
            <span style={{ color:"transparent", WebkitTextFillColor:"transparent", backgroundImage:"linear-gradient(90deg,#3B82F6,#60A5FA,#93C5FD)", WebkitBackgroundClip:"text", backgroundClip:"text" }}>
              convierten visitas
            </span>{" "}
            en clientes reales.
          </h1>

          <p className="text-xl mb-10 leading-relaxed" style={{ color:C.gray }}>
            En OrbisaTech desarrollamos presencias digitales de alto impacto para negocios que quieren crecer. Tecnología moderna, diseño estratégico y resultados medibles desde el día uno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <motion.a href="#contacto" whileHover={{ scale:1.04, boxShadow:"0 10px 36px rgba(37,99,235,0.55)" }} whileTap={{ scale:0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow:"0 4px 24px rgba(37,99,235,0.38)" }}
            >
              <MessageCircle size={18} /> Cotizar por WhatsApp
            </motion.a>
            <motion.a href="#planes" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold"
              style={{ ...glass(0.07, 16, 0.25), color:C.light }}
            >
              Ver planes y precios <ChevronRight size={18} />
            </motion.a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value:240, suffix:"%", label:"Más tráfico orgánico" },
              { value:180, suffix:"%", label:"Tasa de conversión"   },
              { value:50,  suffix:"+", label:"Proyectos entregados" },
            ].map((s,i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black" style={{ color:C.bright }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs mt-1 font-semibold" style={{ color:C.gray }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — slideshow */}
        <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.85, delay:0.2 }}>
          {/* Liquid glass frame */}
          <div className="relative p-2 rounded-[2rem]" style={glass(0.1, 20, 0.22)}>
            <AnimatePresence mode="wait">
              <motion.div key={cur}
                initial={{ opacity:0, scale:0.96, y:16 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.96, y:-16 }}
                transition={{ duration:0.5 }}
                className="rounded-[1.6rem] overflow-hidden relative"
              >
                <img src={slides[cur].img} alt={slides[cur].label} className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(11,17,32,0.88) 0%, transparent 50%)" }} />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block"
                      style={{ background:"rgba(37,99,235,0.75)", color:"white" }}>Proyecto real</span>
                    <p className="text-xl font-black text-white">{slides[cur].label}</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl text-sm font-bold" style={glass(0.35, 16, 0.3)}>
                    <span style={{ color:C.light }}>{slides[cur].badge}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-3 pb-1">
              {slides.map((_,i) => (
                <button key={i} onClick={() => setCur(i)} className="rounded-full transition-all"
                  style={{ width: i===cur ? 24 : 8, height:8, background: i===cur ? C.blue : "rgba(37,99,235,0.3)" }} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2, repeat:Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ color:C.gray }}>
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

// ─── FEATURES ─────────────────────────────────────────────────────────
const Features = () => {
  const features = [
    { icon:<Search size={22}/>,      title:"Posicionamiento en Google",       desc:"Implementamos SEO técnico desde la estructura. Tu sitio empieza a aparecer en búsquedas relevantes desde el primer día de publicación." },
    { icon:<Shield size={22}/>,      title:"Imagen que genera confianza",      desc:"Diseñamos cada detalle para proyectar profesionalismo. Un visitante que confía en tu marca es un cliente que pregunta y compra." },
    { icon:<MessageCircle size={22}/>,title:"Captación directa por WhatsApp",  desc:"Integramos botones, formularios y CTAs estratégicos para que cada visita tenga un camino claro hacia tu línea de contacto." },
    { icon:<Zap size={22}/>,         title:"Velocidad certificada",            desc:"Sitios que cargan en menos de 3 segundos con Core Web Vitals optimizados. Más velocidad significa mejor posición y más conversiones." },
    { icon:<Smartphone size={22}/>,  title:"Mobile-first desde el diseño",    desc:"Más del 70% del tráfico viene de celulares. Cada sección está pensada para que la experiencia móvil sea impecable y fluida." },
    { icon:<BarChart2 size={22}/>,   title:"Métricas y analítica integrada",   desc:"Conectamos Google Analytics y Meta Pixel para que tengas datos reales de comportamiento, tráfico y conversión desde el lanzamiento." },
  ];

  return (
    <section className="py-28 px-6" style={{ background:C.dark }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge>Lo que incluye tu sitio</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4" style={{ color:C.white }}>
              Tecnología que trabaja{" "}
              <span style={{ color:C.bright }}>por ti las 24 horas</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:C.gray }}>
              Cada proyecto incluye todo lo que un negocio moderno necesita para competir en internet sin depender de agencias externas o costos mensuales.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {features.map((f,i) => (
            <FadeIn key={i} delay={i*0.08}>
              <motion.div
                whileHover={{ y:-6, ...glassHover }}
                className="p-7 rounded-3xl h-full transition-all duration-300 cursor-default"
                style={glass(0.08, 16, 0.14)}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background:"linear-gradient(135deg,rgba(37,99,235,0.28),rgba(96,165,250,0.15))", color:C.bright }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color:C.white }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:C.gray }}>{f.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center">
            <p className="text-sm mb-4 font-semibold" style={{ color:C.gray }}>Desde $6,500 MXN · Entrega en 5–8 días · Sin mensualidades</p>
            <motion.a href="#contacto" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow:"0 4px 24px rgba(37,99,235,0.4)" }}
            >
              <MessageCircle size={18} /> Cotizar ahora
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── PROYECTOS ────────────────────────────────────────────────────────
const Projects = () => {
  const items = [
    {
      img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
      tags:["Landing Page","CRO","SEO"],
      title:"Plataforma de servicios B2B",
      desc:"Rediseño completo orientado a generación de leads. Reducimos la fricción de contacto y aumentamos las solicitudes mensuales.",
      stats:[{v:"+41%",l:"Leads"},{v:"+18%",l:"Retención"},{v:"+27%",l:"Checkout"}],
    },
    {
      img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
      tags:["E-commerce","Mobile UI","Producto"],
      title:"Tienda en línea de alto rendimiento",
      desc:"E-commerce con experiencia mobile-first, integración de pagos y dashboard de métricas en tiempo real.",
      stats:[{v:"+32%",l:"Ventas"},{v:"-40%",l:"Rebote"},{v:"98/100",l:"Performance"}],
    },
  ];

  return (
    <section id="proyectos" className="py-28 px-6" style={{ background:C.navy }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge>Proyectos realizados</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color:C.white }}>
              Resultados reales,{" "}
              <span style={{ color:C.bright }}>no solo diseño</span>
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-8">
          {items.map((p,i) => (
            <FadeIn key={i} delay={i*0.1}>
              <motion.div
                whileHover={{ y:-4 }}
                className="rounded-3xl overflow-hidden relative transition-all duration-300"
                style={glass(0.09, 18, 0.18)}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(11,17,32,0.4),transparent)" }} />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full font-bold"
                          style={glass(0.15, 12, 0.25)}>
                          <span style={{ color:C.light }}>{t}</span>
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black mb-3" style={{ color:C.white }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-8" style={{ color:C.gray }}>{p.desc}</p>
                    <div className="flex gap-8">
                      {p.stats.map(s => (
                        <div key={s.l}>
                          <div className="text-2xl font-black" style={{ color:C.bright }}>{s.v}</div>
                          <div className="text-xs mt-0.5" style={{ color:C.gray }}>{s.l}</div>
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
            <p className="text-sm mb-4" style={{ color:C.gray }}>Cotiza gratis · Sin compromiso · Respuesta en minutos</p>
            <motion.a href="#contacto" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow:"0 4px 24px rgba(37,99,235,0.4)" }}
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
    landing:[
      { name:"Esencial",    price:"$6,500",  popular:false, desc:"Ideal para lanzar tu presencia digital rápido y con fuerza.", features:["1 página de alta conversión","Diseño responsive mobile-first","Botón WhatsApp + formulario","SEO técnico base","Entrega en 5–8 días hábiles","Una ronda de ajustes incluida"] },
      { name:"Crecimiento", price:"$13,900", popular:true,  desc:"Para negocios que quieren posicionarse y generar leads consistentes.", features:["Todo del plan Esencial","Landing + página de gracias","20 artículos SEO redactados","Google Analytics + Meta Pixel","Dominio .com/.mx primer año gratis","Dos rondas de ajustes"] },
      { name:"Pro",         price:"$21,900", popular:false, desc:"Presencia digital completa para liderar tu sector.", features:["Todo del plan Crecimiento","Hasta 4 secciones avanzadas","Blog por categorías para autoridad","Datos estructurados Schema.org","Core Web Vitals certificados","Tres rondas de ajustes"] },
    ],
    web:[
      { name:"Esencial",    price:"$6,500",  popular:false, desc:"Tu empresa en internet con todo lo esencial.", features:["Hasta 4 páginas","Diseño responsive","WhatsApp + formulario","SEO técnico base","Entrega en 5–8 días","Una ronda de ajustes"] },
      { name:"Crecimiento", price:"$13,900", popular:true,  desc:"Más páginas, más tráfico, más contactos mensuales.", features:["Todo del Esencial","Hasta 7 páginas + blog","20 artículos SEO","4 correos corporativos","Analytics + Meta Pixel","Dos rondas de ajustes"] },
      { name:"Pro",         price:"$21,900", popular:false, desc:"El sitio más completo del mercado para tu industria.", features:["Todo del Crecimiento","Hasta 12 secciones","Blog avanzado + categorías","Correos ilimitados","Velocidad ultra optimizada","Tres rondas de ajustes"] },
    ],
    ecommerce:[
      { name:"Esencial",    price:"$18,500", popular:false, desc:"Tu primera tienda online lista para vender.", features:["Hasta 50 productos","Pasarela de pago integrada","Carrito y checkout optimizados","SEO base por producto","Entrega en 7–10 días","Una ronda de ajustes"] },
      { name:"Crecimiento", price:"$28,900", popular:true,  desc:"Escala tus ventas con herramientas de crecimiento.", features:["Hasta 200 productos","Múltiples métodos de pago","Blog + email marketing","Analytics avanzado","Dominio + correos","Dos rondas de ajustes"] },
      { name:"Pro",         price:"$44,900", popular:false, desc:"E-commerce de alto rendimiento sin límites.", features:["Productos ilimitados","Integraciones a medida","Dashboard de reportes","SEO avanzado por categoría","Core Web Vitals certificado","Tres rondas de ajustes"] },
    ],
  };

  const tabs = [
    { key:"landing",   label:"Landing Page" },
    { key:"web",       label:"Página Web"   },
    { key:"ecommerce", label:"E-commerce"   },
  ];

  return (
    <section id="planes" className="py-28 px-6" style={{ background:C.dark }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge>Planes</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4" style={{ color:C.white }}>
              Inversión clara,{" "}
              <span style={{ color:C.bright }}>resultados concretos</span>
            </h2>
            <p className="text-lg" style={{ color:C.gray }}>Pago único, sin mensualidades ni sorpresas.</p>
          </div>

          {/* Tabs — liquid glass */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-1 p-1 rounded-2xl" style={glass(0.1, 16, 0.2)}>
              {tabs.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                  style={tab===t.key
                    ? { background:"linear-gradient(135deg,#2563EB,#3B82F6)", color:"white", boxShadow:"0 4px 16px rgba(37,99,235,0.35)" }
                    : { background:"transparent", color:C.gray }
                  }
                >{t.label}</button>
              ))}
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}
            transition={{ duration:0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {allPlans[tab].map((plan) => (
              <motion.div key={plan.name} whileHover={{ y:-6 }}
                className="rounded-3xl p-8 flex flex-col relative transition-all duration-300"
                style={plan.popular
                  ? { ...glass(0.16, 20, 0.45), boxShadow:"0 24px 64px rgba(37,99,235,0.22), inset 0 1px 0 rgba(96,165,250,0.22)" }
                  : glass(0.08, 16, 0.14)
                }
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-black text-white"
                    style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow:"0 4px 16px rgba(37,99,235,0.45)" }}>
                    Más popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-1" style={{ color:C.white }}>{plan.name}</h3>
                  <div className="text-4xl font-black mb-2" style={{ color:plan.popular ? C.bright : C.white }}>
                    {plan.price}<span className="text-base font-semibold" style={{ color:C.gray }}> / único</span>
                  </div>
                  <p className="text-sm" style={{ color:C.gray }}>{plan.desc}</p>
                </div>
                <ul className="flex-grow space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color:C.gray }}>
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color:C.bright }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a href="#contacto" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold"
                  style={plan.popular
                    ? { background:"linear-gradient(135deg,#2563EB,#3B82F6)", color:"white", boxShadow:"0 4px 20px rgba(37,99,235,0.38)" }
                    : { ...glass(0.12, 12, 0.22), color:C.light }
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
            <p className="text-sm mb-4" style={{ color:C.gray }}>¿Necesitas algo específico? Armamos una propuesta a tu medida.</p>
            <motion.a href="#contacto" whileHover={{ scale:1.04 }}
              className="inline-flex items-center gap-2 text-sm font-bold hover:text-blue-300 transition-colors"
              style={{ color:C.light }}
            >
              Solicitar cotización a medida <ArrowRight size={16} />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── PROCESO ──────────────────────────────────────────────────────────
const Process = () => {
  const steps = [
    { num:"01", icon:<Search size={20}/>,   title:"Diagnóstico estratégico", desc:"Analizamos tu negocio, tu competencia y tus objetivos antes de diseñar una sola pantalla." },
    { num:"02", icon:<Monitor size={20}/>,  title:"Diseño UX/UI orientado a metas", desc:"Prototipamos la experiencia visual alineada con tu marca y con el camino que debe seguir tu cliente." },
    { num:"03", icon:<Code size={20}/>,     title:"Desarrollo con tecnología moderna", desc:"Código limpio, rápido y escalable. Construimos con las herramientas que mejor se adaptan a tu proyecto." },
    { num:"04", icon:<Rocket size={20}/>,   title:"Lanzamiento y seguimiento", desc:"Publicamos, verificamos el rendimiento y te entregamos las herramientas para medir y escalar." },
  ];

  return (
    <section className="py-28 px-6" style={{ background:C.navy }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge>Proceso</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color:C.white }}>
              De la idea al sitio publicado{" "}
              <span style={{ color:C.bright }}>en menos de 2 semanas</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s,i) => (
            <FadeIn key={i} delay={i*0.1}>
              <motion.div whileHover={{ y:-5, ...glassHover }}
                className="relative p-7 rounded-3xl h-full transition-all duration-300"
                style={glass(0.08, 16, 0.14)}
              >
                {i < steps.length-1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-px z-10"
                    style={{ background:"linear-gradient(90deg,rgba(37,99,235,0.5),transparent)" }} />
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", color:"white" }}>
                    {s.icon}
                  </div>
                  <span className="text-2xl font-black" style={{ color:"rgba(37,99,235,0.28)" }}>{s.num}</span>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color:C.white }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:C.gray }}>{s.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center p-10 rounded-3xl" style={glass(0.1, 18, 0.2)}>
            <p className="text-sm mb-2 font-semibold" style={{ color:C.gray }}>SEO incluido · Pago único · Sin compromiso</p>
            <h3 className="text-2xl font-black mb-6" style={{ color:C.white }}>¿Listo para arrancar?</h3>
            <motion.a href="#contacto" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white"
              style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow:"0 4px 24px rgba(37,99,235,0.42)" }}
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
    { name:"María G.",  role:"Directora Comercial, Retail",         initials:"MG", text:"OrbisaTech entendió exactamente lo que necesitábamos. El sitio carga rapidísimo y desde el lanzamiento el equipo de ventas notó un cambio real en la calidad de los contactos que llegan." },
    { name:"Carlos R.", role:"Fundador, Servicios B2B",             initials:"CR", text:"Llevábamos años con una página que nadie visitaba. Tres semanas después del nuevo sitio ya teníamos leads por WhatsApp todas las semanas. El diseño transmite justo lo que somos." },
    { name:"Andrea L.", role:"Marketing Manager, Sector Educativo", initials:"AL", text:"Necesitábamos explicar mejor nuestra propuesta de valor. El resultado fue inmediato: más solicitudes de información y una percepción de marca completamente distinta." },
    { name:"Jorge P.",  role:"Director General, Industria",         initials:"JP", text:"Valoro mucho que el proceso fue claro desde el primer día. No solo entregaron a tiempo, también nos ayudaron a estructurar el mensaje para que el sitio realmente vendiera." },
    { name:"Sofía V.",  role:"Coordinación Comercial, Consultoría", initials:"SV", text:"Nuestro sitio anterior se veía del 2015. Con el rediseño de OrbisaTech pasamos a recibir contactos de empresas más grandes y calificadas. La diferencia es notable." },
    { name:"Ricardo T.",role:"Fundador, E-commerce",                initials:"RT", text:"Lo que me convenció fue que no solo piensan en que se vea bonito, sino en que convierta. Redujeron la fricción en el checkout y eso se tradujo directo en ventas." },
  ];

  return (
    <section id="testimonios" className="py-28 px-6" style={{ background:C.dark }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge>Testimonios</Badge>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color:C.white }}>
              Negocios que ya{" "}
              <span style={{ color:C.bright }}>crecen con nosotros</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r,i) => (
            <FadeIn key={i} delay={i*0.07}>
              <motion.div whileHover={{ y:-5, ...glassHover }}
                className="p-7 rounded-3xl flex flex-col h-full transition-all duration-300"
                style={glass(0.08, 16, 0.13)}
              >
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#2563EB" style={{ color:C.blue }} />)}
                </div>
                <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color:C.gray }}>"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)" }}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color:C.white }}>{r.name}</p>
                    <p className="text-xs" style={{ color:C.gray }}>{r.role}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA FINAL ────────────────────────────────────────────────────────
const CtaFinal = () => (
  <section id="contacto" className="py-28 px-6 relative overflow-hidden"
    style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #0D1B35 100%)` }}>
    <motion.div animate={{ scale:[1,1.22,1], opacity:[0.14,0.24,0.14] }} transition={{ duration:9, repeat:Infinity }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
      style={{ background:"radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)" }} />

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <FadeIn>
        {/* Liquid glass card */}
        <div className="p-12 rounded-[2.5rem]" style={glass(0.1, 24, 0.22)}>
          <Badge>¿Hablamos?</Badge>
          <h2 className="text-4xl md:text-6xl font-black mt-2 mb-6 leading-[1.05]" style={{ color:C.white }}>
            Tu próximo cliente{" "}
            <span style={{ color:C.bright }}>ya está buscándote en Google</span>
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color:C.gray }}>
            Agenda una asesoría gratuita con nuestro equipo y en menos de 30 minutos tendrás claridad sobre qué necesita tu negocio para crecer en internet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <motion.a href="https://wa.me/525500000000"
              whileHover={{ scale:1.05, boxShadow:"0 14px 44px rgba(37,99,235,0.58)" }}
              whileTap={{ scale:0.97 }}
              className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg font-black text-white"
              style={{ background:"linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow:"0 6px 28px rgba(37,99,235,0.42)" }}
            >
              <MessageCircle size={22} /> Cotizar por WhatsApp
            </motion.a>
            <motion.a href="#proyectos" whileHover={{ scale:1.04 }}
              className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold"
              style={{ ...glass(0.1, 16, 0.25), color:C.light }}
            >
              Ver proyectos <ArrowRight size={18} />
            </motion.a>
          </div>
          <p className="text-sm" style={{ color:C.gray }}>Asesoría gratuita · Sin compromiso · Respuesta en minutos</p>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── FOOTER ───────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-10 px-6" style={{ background:C.dark, borderTop:"1px solid rgba(37,99,235,0.1)" }}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background:"linear-gradient(135deg,#2563EB,#60A5FA)" }}>
          <Globe size={16} color="white" />
        </div>
        <span className="text-lg font-black" style={{ color:C.white }}>
          Orbisa<span style={{ color:C.bright }}>Tech</span>
        </span>
      </div>
      <p className="text-sm" style={{ color:C.gray }}>© 2026 OrbisaTech. Todos los derechos reservados.</p>
      <div className="flex gap-6">
        <a href="#" className="text-sm font-semibold hover:text-blue-400 transition-colors" style={{ color:C.gray }}>Términos</a>
        <a href="#" className="text-sm font-semibold hover:text-blue-400 transition-colors" style={{ color:C.gray }}>FAQs</a>
      </div>
    </div>
  </footer>
);

// ─── EXPORT ───────────────────────────────────────────────────────────
const LandingPage = () => (
  <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif" }}>
    <Navbar />
    <Hero />
    <Features />
    <Projects />
    <Plans />
    <Process />
    <Testimonials />
    <CtaFinal />
    <Footer />
  </div>
);

export default LandingPage;
