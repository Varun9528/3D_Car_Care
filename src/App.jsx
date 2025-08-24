import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, MapPin, ExternalLink, QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import carImage from "../public/3d.png";

const LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/3dcarcare_indore/?igsh=ZnB3NzJ2anhtdXdw#", icon: <Instagram className="w-5 h-5" />, sub: "@3dcarcare_indore" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61576901308010", icon: <Facebook className="w-5 h-5" />, sub: "Follow us" },
  { label: "Location", href: "https://share.google/ywe4tnShvhGJny36t", icon: <MapPin className="w-5 h-5" />, sub: "3D Car Care Indore" }
];

function GlitchText({ text, className = "" }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <span className="relative z-10">{text}</span>
      <span aria-hidden className="absolute inset-0 -translate-x-[2px] -translate-y-[1px] text-green-400 mix-blend-screen opacity-70 animate-[glitch_2.8s_infinite]">{text}</span>
      <span aria-hidden className="absolute inset-0 translate-x-[2px] translate-y-[1px] text-emerald-300 mix-blend-screen opacity-70 animate-[glitch_3.2s_infinite]">{text}</span>
      <style>{`@keyframes glitch {
        0%{clip-path: inset(0 0 0 0)}
        20%{clip-path: inset(20% 0 60% 0)}
        40%{clip-path: inset(40% 0 30% 0)}
        60%{clip-path: inset(10% 0 80% 0)}
        80%{clip-path: inset(60% 0 20% 0)}
        100%{clip-path: inset(0 0 0 0)} }`}</style>
    </div>
  );
}

function Particles() {
  const dots = useMemo(() => new Array(25).fill(0).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    dur: 3 + Math.random() * 5
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          style={{ left: `${d.left}%`, top: `${d.top}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }}
          className="absolute h-[4px] w-[4px] rounded-full bg-green-400 blur-[1px] animate-float shadow-[0_0_6px_#22c55e]"
        />
      ))}
      <style>{`@keyframes float{
        0%{transform:translateY(0);opacity:.3}
        50%{transform:translateY(-12px);opacity:.9}
        100%{transform:translateY(0);opacity:.3}
      }`}</style>
    </div>
  );
}

function CarSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 240 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#00B140" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <g transform="translate(0,10)">
        <rect x="10" y="50" rx="14" ry="14" width="220" height="38" fill="url(#g1)" opacity="0.95" />
        <path d="M30 50 C50 30, 90 20, 140 30 C170 36, 200 46, 210 50 L210 70 L30 70 Z" fill="#071124" opacity="0.35" />
        <circle cx="60" cy="90" r="12" fill="#0f172a" />
        <circle cx="180" cy="90" r="12" fill="#0f172a" />
        <circle cx="60" cy="90" r="8" fill="#a3e635" />
        <circle cx="180" cy="90" r="8" fill="#a3e635" />
      </g>
    </svg>
  );
}

function CarImage({ className = "" }) {
  return (
    <img
      src={carImage}
      alt="3D Car Care Car"
      className={`w-full h-full object-contain drop-shadow-[0_0_25px_#00B140] ${className}`}
    />
  );
}


function LoadingSplash({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Car Running Animation */}
            <motion.div
              className="relative w-[400px] h-[180px] overflow-hidden"
              initial={{ x: "-150%" }}
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            >
              <CarImage className="w-full h-full" />
              {/* Light Trail */}
              <div className="absolute top-1/2 left-0 h-[4px] w-full -translate-y-1/2 bg-gradient-to-r from-[#00B140] via-green-400 to-transparent blur-md opacity-70" />
            </motion.div>

            {/* Branding */}
            <div className="text-center">
              <GlitchText
                text="3D CAR CARE"
                className="text-3xl font-extrabold tracking-[0.25em] text-green-400"
              />
              <p className="mt-2 text-sm text-white/70">
                Getting your experience ready…
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default function App() {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const qrUrl = "https://3d-car-care-app.vercel.app/";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) { console.error(e); }
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "3dcarcare_qr.png";
    link.click();
  };
  return (
    <div className="relative min-h-screen text-white">
      <LoadingSplash show={loading} />

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020b05] via-[#03120c] to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 animate-pulse" />
        <div className="absolute -top-24 -left-8 w-[60vmax] h-[60vmax] rounded-full bg-green-500/10 blur-[120px] animate-ping" />
        <div className="absolute -bottom-32 -right-16 w-[70vmax] h-[70vmax] rounded-full bg-emerald-400/10 blur-[120px] animate-ping" />
      </div>

      <Particles />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 md:py-16">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }} className="p-[3px] rounded-3xl bg-gradient-to-br from-green-500/60 to-emerald-400/60 shadow-[0_0_40px_rgba(34,197,94,.35)]">
              <div className="relative rounded-2xl overflow-hidden w-28 h-28 md:w-36 md:h-36 bg-black grid place-items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 grid place-items-center text-black font-extrabold">3D</div>
              </div>
            </motion.div>
            {/* rotating ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-green-400/30" />
          </div>

          <div className="text-center">
            <GlitchText text="3D CAR CARE" className="text-3xl md:text-5xl font-black tracking-[0.12em]" />
            <p className="mt-2 text-sm md:text-base text-white/70">Car Detailing · Repair · 3D Visuals</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Open Now</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {LINKS.map((l, i) => (
            <motion.a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ delay: i * 0.06 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#05120a]/80 to-[#0b1f14]/90 p-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,.45)] hover:shadow-[0_0_25px_rgba(34,197,94,.6)] transform transition-all duration-300 hover:-translate-y-1">
              <div className="relative z-10 flex items-center gap-3">
                <div className="grid place-items-center rounded-xl border border-white/10 bg-black/40 p-2 shadow-inner group-hover:scale-110 transition">
                  {l.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold tracking-wide">{l.label}</div>
                  <div className="text-xs text-white/60">{l.sub}</div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:text-green-400" />
              </div>
              <motion.div layoutId="glow" className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-green-400 to-emerald-500 blur-xl transition" />
            </motion.a>
          ))}
        </div>

        {/* About + QR */}
        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <h3 className="text-sm uppercase tracking-[0.25em] text-white/60">About</h3>
            <p className="mt-2 text-white/80 text-sm md:text-base">We provide premium car detailing, 3D visual previews, quick repairs and user reviews integrated from social platforms.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Detailing</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">3D Preview</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Pickup</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Reviews</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="text-sm uppercase tracking-[0.25em] text-white/60">Scan to connect</div>
              <QrCode className="w-5 h-5 text-white/60" />
            </div>
            <div className="mt-3 grid place-items-center">
              <div className="rounded-xl bg-black/60 p-3 border border-white/10">
                <QRCodeCanvas value={qrUrl} size={200} includeMargin={false} />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                onClick={handleCopy}
                className="rounded-xl border border-white/10 bg-gradient-to-r from-green-500/20 to-emerald-400/20 px-3 py-2 text-sm font-semibold"
              >
                {copied ? "Copied URL" : "Copy URL"}
              </button>

              <button
                onClick={handleDownload}
                className="rounded-xl border border-white/10 bg-gradient-to-r from-green-500/20 to-emerald-400/20 px-3 py-2 text-sm font-semibold"
              >
                Download QR
              </button>

              <a
                href={qrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-center"
              >
                Open Page
              </a>
            </div>
            <div className="pointer-events-none absolute -inset-1 opacity-20 blur-2xl bg-gradient-to-r from-green-500 via-emerald-400 to-green-500" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/50">
          <span>© 3D Car Care</span>
          <span>•</span>
          <span>Built with React · Tailwind · Motion</span>
        </div>
      </div>
    </div>
  );
}
