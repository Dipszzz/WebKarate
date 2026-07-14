import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

// Import Icons from React Icons (Font Awesome & Game Icons)
import {
  FaBars,
  FaTimes,
  FaInstagram,
  FaWhatsapp,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSearchPlus,
  FaQrcode,
  FaBullseye,
  FaAward,
  FaRegClock,
  FaHandshake
} from 'react-icons/fa';

import {
  GiShintoShrine,
  GiBlackBelt,
  GiGymBag,
  GiFist,
  GiHighKick,
  GiSwordsEmblem
} from 'react-icons/gi';

// Import local image assets generated for this Dojo site
import heroImg from './assets/logo.png';
import latihanImg from './assets/latihan.png';
// import trainingImg from './assets/training.png';
import medaliImg from './assets/medali.png';
import logo from './assets/logo.png';

// Global Animation Variants for Framer Motion
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};


const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function App() {
  // --- STATE MANAGEMENT ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [activeQrTab, setActiveQrTab] = useState('instagram');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    classRoom: '',
    phone: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Monitor scroll for changing navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HANDLERS ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Formatted text sent directly to WhatsApp contact person
    const waText = `Halo Kak, saya ingin mendaftar sebagai anggota baru Ekskul Karate SMK Letris Indonesia 2. Berikut data diri saya:

*Nama Lengkap:* ${formData.name}
*Kelas & Jurusan:* ${formData.classRoom}
*No. WhatsApp:* ${formData.phone}
*Alasan Bergabung:* ${formData.reason}

Mohon dipandu untuk proses seleksi/latihan perdana. Terima kasih!`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/6287780518535?text=${encodedText}`; // CP WA number updated

    // Simulating smooth submit effect before redirecting
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 850);
  };

  // --- DATA STRUCTURES ---
  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Filosofi', href: '#about' },
    { name: 'Video', href: '#promo-video' },
    { name: 'QR Code', href: '#qr-section' },
    { name: 'Jadwal', href: '#schedule' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Kontak', href: '#contact' },
  ];

  // 5 Dojo Kun / Bushido Values
  const karateValues = [
    {
      title: 'Disiplin',
      desc: 'Menghargai waktu, taat aturan sekolah, dan konsisten melatih diri di Dojo maupun luar.',
      icon: <FaRegClock className="text-karatePrimary text-3xl" />,
      borderColor: 'hover:border-karatePrimary'
    },
    {
      title: 'Kehormatan',
      desc: 'Menjaga marwah diri, menghormati guru, pelatih, sesama karateka, dan orang lain.',
      icon: <FaAward className="text-karatePrimary text-3xl" />,
      borderColor: 'hover:border-karatePrimary'
    },
    {
      title: 'Keberanian',
      desc: 'Berani menegakkan kebenaran, membela yang lemah, dan berani menghadapi kegagalan.',
      icon: <GiSwordsEmblem className="text-karatePrimary text-3xl" />,
      borderColor: 'hover:border-karatePrimary'
    },
    {
      title: 'Kekuatan',
      desc: 'Membina ketahanan fisik prima, kekuatan teknik pukulan, serta tendangan yang presisi.',
      icon: <GiHighKick className="text-karatePrimary text-3xl" />,
      borderColor: 'hover:border-karatePrimary'
    },
    {
      title: 'Sportivitas',
      desc: 'Menghargai keunggulan lawan tanding, jujur dalam bersikap, dan berjiwa ksatria.',
      icon: <FaHandshake className="text-karatePrimary text-3xl" />,
      borderColor: 'hover:border-karatePrimary'
    }
  ];

  // Dynamic QR Code Tab Data
  const qrTabs = {
    instagram: {
      title: 'Scan Instagram Official',
      desc: 'Ikuti Instagram official kami untuk konten ekskul karate terbaru, foto latihan, dan event khusus.',
      url: 'https://instagram.com/karate.letris2',
      color: '#E1306C',
      icon: <FaInstagram className="text-pink-500" size={24} />
    },
    whatsapp: {
      title: 'Scan WhatsApp CP Pendaftaran',
      desc: 'Hubungkan langsung ke pengurus ekskul kami untuk bertanya atau berkonsultasi seputar pendaftaran.',
      url: 'https://wa.me/6287780518535?text=Halo%20Kak,%20saya%20tertarik%20untuk%20bergabung%20dengan%20Ekskul%20Karate%20SMK%20Letris%202.',
      color: '#10B981',
      icon: <FaWhatsapp className="text-emerald-500" size={24} />
    }
  };

  // Schedule Data
  const scheduleSessions = [
    {
      day: 'Sabtu',
      time: '07:00 - 10:00 WIB',
      location: 'Lapangan Upacara SMK Letris Indonesia 2',
      focus: 'Fokus: Kihon (Gerakan Dasar), Pendalaman Kata (Seni Jurus) & Tanding Kumite'
    }
  ];

  // Course Materials Data
  const courseMaterials = [
    {
      title: 'Kihon (Gerakan Dasar)',
      desc: 'Melatih teknik pukulan (Tsuki), tendangan (Geri), tangkisan (Uke) secara disiplin dan presisi.',
      icon: <GiFist size={24} className="text-karatePrimary" />
    },
    {
      title: 'Kata (Seni Jurus)',
      desc: 'Mempelajari keindahan gerak rangkaian bela diri terstruktur (Heian 1-5, Tekki Shodan, dll).',
      icon: <GiBlackBelt size={24} className="text-karatePrimary" />
    },
    {
      title: 'Kumite (Tanding Bebas)',
      desc: 'Mengasah refleks, kontrol jarak, dan strategi tanding kompetisi karate resmi FORKI.',
      icon: <FaBullseye size={24} className="text-karatePrimary" />
    },
    {
      title: 'Bela Diri Praktis',
      desc: 'Membekali diri dengan teknik kuncian & kuncian jalanan darurat demi keselamatan pribadi.',
      icon: <GiGymBag size={24} className="text-karatePrimary" />
    }
  ];

  // Gallery Photos Data
  const galleryPhotos = [
    {
      id: 1,
      src: latihanImg,
      title: 'Tanding Sparring (Kumite)',
      category: 'Kompetisi'
    },
    {
      id: 2,
      src: latihanImg,
      title: 'Latihan Bersama di Dojo',
      category: 'Latihan Rutin'
    },
    {
      id: 3,
      src: medaliImg,
      title: 'Prestasi Kejuaraan Daerah',
      category: 'Medali & Penghargaan'
    }
  ];

  return (
    <div className="bg-karateBg text-karateWhite min-h-screen relative font-sans selection:bg-karatePrimary selection:text-karateWhite">
      {/* Background atmospheric blur lights - Premium subtle lighting */}
      <div className="hidden sm:block absolute top-0 right-1/4 w-[500px] h-[500px] bg-karatePrimary/3 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="hidden sm:block absolute top-[35%] left-1/4 w-[600px] h-[600px] bg-karateAccent/3 rounded-full blur-[180px] pointer-events-none -z-10"></div>
      <div className="hidden sm:block absolute bottom-[20%] right-1/3 w-[500px] h-[500px] bg-karatePrimary/3 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* ==================== 1. NAVBAR SECTION ==================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 py-3 md:py-0 md:h-20">

            {/* Logo Group */}
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-none">
              <img src={logo} alt="Excellence Knight Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain" />
              <div className="flex flex-col min-w-0">
                <span className="font-cinzel text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wider text-karateWhite leading-none truncate">
                  KARATE
                </span>
                <span className="font-sans text-[10px] sm:text-xs md:text-sm font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-600 truncate">
                  LETRIS 2
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-wrap items-center space-x-4 lg:space-x-6 xl:space-x-8 max-w-full shrink">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-sm font-medium text-karateGray hover:text-karateAccent transition-all duration-300 relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-karateAccent transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
              <a
                href="https://instagram.com/karate.letris2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Karate Letris 2"
                className="text-karateGray hover:text-karateAccent transition-colors duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://wa.me/6287780518535"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp CP Karate Letris 2"
                className="text-karateGray hover:text-karateAccent transition-colors duration-300"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="#register"
                className="px-4 py-2 rounded-lg bg-karatePrimary text-karateBg font-semibold font-sans text-sm hover:bg-karateSecondary transition-all duration-300 hover:shadow-soft-md transform hover:-translate-y-0.5"
              >
                Gabung Sekarang
              </a>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="#register"
                className="px-3 py-1.5 rounded bg-karatePrimary text-karateBg font-semibold font-sans text-xs hover:bg-karateSecondary transition-colors whitespace-nowrap"
              >
                Daftar
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-karateWhite hover:text-karateAccent focus:outline-none transition-all"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Slide Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-nav border-t border-slate-800 mt-2 overflow-hidden"
            >
              <div className="px-3 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-base font-medium text-karateGray hover:text-karateAccent hover:bg-slate-800/40 transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-6 px-3 py-4 border-t border-slate-800 mt-3">
                  <a
                    href="https://instagram.com/karate.letris2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-karateGray hover:text-karateAccent transition-colors flex items-center gap-2"
                  >
                    <FaInstagram size={18} />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a
                    href="https://wa.me/6287780518535"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-karateGray hover:text-karateAccent transition-colors flex items-center gap-2"
                  >
                    <FaWhatsapp size={18} />
                    <span className="text-sm">WhatsApp CP</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ==================== 2. HERO SECTION ==================== */}
        <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-karateSurface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Text Area */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 text-left space-y-6 flex flex-col justify-center"
              >
                {/* Logo Karate */}
                <motion.div variants={fadeUp} className="flex items-center gap-3 w-fit mx-auto lg:mx-0">
                  <div className="p-1 rounded-2xl bg-karatePrimary/10 border border-white/80 shadow-soft-sm flex items-center justify-center">                    <img src={logo} alt="Dojo Logo" className="w-14 h-14" />
                  </div>
                  <div className="flex flex-col">
                    <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-600 bg-clip-text text-transparent font-cinzel text-sm text-karateAccent font-bold tracking-widest leading-none">DOJO EXCELLENCE KNIGHT</span>
                    <span className="font-sans text-[10px] text-karateGray font-semibold tracking-wider">SMK LETRIS INDONESIA 2</span>
                  </div>
                </motion.div>

                {/* Judul Besar: EKSTRAKURIKULER KARATE */}
                <motion.h1
                  variants={fadeUp}
                  className="w-full text-2xl sm:text-5xl lg:text-5xl font-cinzel font-black tracking-wider leading-snug sm:leading-tight lg:leading-tight text-karateWhite break-words"
                >
                  EKSTRAKURIKULER <br />
                  <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">KARATE</span>
                </motion.h1>

                {/* Subjudul: Disiplin • Mental • Prestasi • Bela Diri */}
                <motion.p
                  variants={fadeUp}
                  className="text-karateAccent text-lg sm:text-xl font-semibold tracking-wide font-sans border-l-4 border-karatePrimary pl-4"
                >
                  Disiplin • Mental • Prestasi • Bela Diri
                </motion.p>

                {/* Sub-description text */}
                <motion.p
                  variants={fadeUp}
                  className="text-karateGray text-base sm:text-lg leading-relaxed max-w-xl font-light"
                >
                  Membangun ksatria muda berprestasi dan berkarakter luhur. Bergabunglah bersama kami untuk melatih ketangkasan fisik, membiasakan disiplin mental, serta mempelajari pertahanan diri sejati.
                </motion.p>

                {/* Dua Tombol: Follow Instagram & Hubungi Kami */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
                  <a
                    href="https://instagram.com/karate.letris2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-karatePrimary text-karateBg font-bold hover:bg-karateSecondary transition-all duration-300 hover:shadow-soft-md transform hover:-translate-y-1"
                  >
                    <FaInstagram className="text-karateBg" size={14} />
                    Follow Instagram
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-karateWhite font-semibold hover:border-karateAccent transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <FaWhatsapp className="text-emerald-500" size={18} />
                    Hubungi Kami
                  </a>
                </motion.div>
              </motion.div>

              {/* Graphic Banner Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="lg:col-span-5 relative flex justify-center items-center"
              >
                <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-md lg:max-w-none aspect-square rounded-3xl overflow-hidden glass-card p-2 border border-karateCard shadow-soft-lg relative group animate-glow-pulse">
                  <img
                    src={heroImg}
                    alt="Karate Action Kick Letris 2"
                    className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-750"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                  {/* Japanese Kanji Calligraphy overlay (空手道 - Karate-Do) */}
                  <div className="absolute top-4 right-4 bg-karateBg/80 backdrop-blur px-3 py-6 rounded-full border border-karateCard/80 pointer-events-none flex flex-col items-center justify-center">
                    <span className="font-cinzel text-lg text-karateAccent font-extrabold tracking-widest writing-mode-vertical py-1 select-none">空</span>
                    <span className="font-cinzel text-lg text-karateAccent font-extrabold tracking-widest writing-mode-vertical py-1 select-none">手</span>
                    <span className="font-cinzel text-lg text-karateAccent font-extrabold tracking-widest writing-mode-vertical py-1 select-none">道</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 3. ABOUT SECTION (PHILOSOPHY) ==================== */}
        <section id="about" className="py-24 relative overflow-hidden bg-karateBg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Title Block */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-karateAccent uppercase"
              >
                Filosofi & Nilai Karate
              </motion.h2>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-karateWhite"
              >
                Membentuk Karakter Kuat Berlandaskan <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">Filosofi Bushido</span>
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karateGray font-light text-base leading-relaxed"
              >
                Di Dojo Karate SMK Letris Indonesia 2, kami tidak hanya berlatih teknik beladiri praktis. Kami menanamkan lima prinsip kehormatan (Dojo Kun) agar menjadi insan tangguh jasmani dan rohani.
              </motion.p>
            </div>

            {/* 5 Cards Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-center"
            >
              {karateValues.map((val, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`glass-card p-6 rounded-2.5xl flex flex-col items-center text-center transition-all duration-300 border border-karateCard ${val.borderColor} group relative `}
                >
                  <div className="p-4 rounded-xl bg-karateSurface/80 mb-5 relative overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-karateCard">
                    {val.icon}
                    <div className="absolute inset-0 bg-karateAccent/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h4 className="text-lg font-sans font-bold text-karateWhite mb-3 group-hover:text-karateAccent transition-colors">
                    {val.title}
                  </h4>

                  <p className="text-sm font-sans text-karateGray leading-relaxed font-light">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Motivational Quote banner */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="mt-16 glass-card p-8 rounded-3xl border border-karateCard text-center relative overflow-hidden bg-gradient-to-r from-karateBg/60 to-karateSurface/60"
            >
              <p className="font-cinzel text-xl sm:text-2xl font-bold italic tracking-wide text-karateWhite relative z-10">
                "Kemenangan terbaik bukanlah mengalahkan lawan Anda, melainkan menaklukkan diri Anda sendiri."
              </p>
              <span className="block mt-2 text-xs text-karateAccent font-sans tracking-widest uppercase font-bold relative z-10 bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                — Gichin Funakoshi (Bapak Karate Modern)
              </span>
            </motion.div>

          </div>
        </section>

        {/* ==================== 4. PROMO VIDEO SECTION ==================== */}
        <section id="promo-video" className="py-24 relative overflow-hidden bg-karateSurface border-y border-karateCard">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

            {/* Title */}
            <div className="space-y-4 mb-12">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-karateAccent uppercase"
              >
                Video Promosi
              </motion.h2>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karatePrimary text-3xl sm:text-4xl font-sans font-bold"
              >
                Saksikan Semangat Juang Kami
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karateGray font-light text-base max-w-xl mx-auto"
              >
                Tonton cuplikan dokumentasi tanding Kumite dan peragaan Kata dari siswa berprestasi karate SMK Letris Indonesia 2.
              </motion.p>
            </div>

            {/* Video Container Frame */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="relative aspect-video w-full rounded-3xl overflow-hidden glass-card p-2 border border-karateCard shadow-soft-lg bg-karateBg/80 flex items-center justify-center group"
            >
              <a
                href="https://www.instagram.com/reel/DaxdtQdvEo8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-4 text-center group-hover:scale-105 transition-transform duration-300 w-full h-full"
              >
                <FaInstagram size={64} className="text-pink-500 group-hover:text-pink-400" />
                <div>
                  <p className="text-xl font-bold text-karateAccent">Follow Instagram</p>
                  <p className="text-sm text-karateGray mt-2">Lihat konten ekskul karate terbaru di Instagram official kami</p>
                </div>
              </a>
            </motion.div>

          </div>
        </section>

        {/* ==================== 5. INTERACTIVE QR CODE SECTION ==================== */}
        <section id="qr-section" className="py-24 relative overflow-hidden bg-karateBg border-b border-karateCard">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

            {/* Title */}
            <div className="space-y-4 mb-12">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-karateAccent uppercase"
              >
                Barcode Promosi (QR Code)
              </motion.h2>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-karatePrimary"
              >
                Pindai Barcode Akses Cepat
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karateGray font-light text-base max-w-xl mx-auto"
              >
                Pilih menu di bawah untuk memunculkan kode QR instan. Arahkan kamera HP Anda untuk langsung membuka link video promosi, WhatsApp CP, atau Instagram.
              </motion.p>
            </div>

            {/* Tab switchers */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-lg mx-auto">
              <button
                onClick={() => setActiveQrTab('instagram')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-sm font-bold transition-all duration-300 transform active:scale-95 ${activeQrTab === 'instagram'
                    ? 'bg-karatePrimary text-karateBg shadow-soft-md'
                    : 'bg-karateCard/40 hover:bg-karateCard text-karateGray border border-karateCard'
                  }`}
              >
                <FaInstagram size={16} />
                Instagram
              </button>
              <button
                onClick={() => setActiveQrTab('whatsapp')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-sm font-bold transition-all duration-300 transform active:scale-95 ${activeQrTab === 'whatsapp'
                    ? 'bg-karatePrimary text-karateBg shadow-soft-md'
                    : 'bg-karateCard/40 hover:bg-karateCard text-karateGray border border-karateCard'
                  }`}
              >
                <FaWhatsapp size={16} />
                WhatsApp CP
              </button>
            </div>

            {/* QR Card Container */}
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQrTab}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 sm:p-12 rounded-3xl border border-karateCard shadow-soft-lg flex flex-col md:flex-row gap-8 items-center text-left"
                >
                  {/* QR SVG */}
                  <div className="p-5 rounded-2xl bg-karateAccent border-4 border-karateCard relative shadow-soft-lg group flex-shrink-0">
                    <QRCodeSVG
                      value={qrTabs[activeQrTab].url}
                      size={180}
                      level="H"
                      bgColor="#F5F5F5"
                      fgColor="#0D0D0D"
                      includeMargin={true}
                      className="rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute -top-3 -right-3 p-2 rounded-full bg-karateAccent text-slate-900 border-2 border-slate-800 shadow-md">
                      <FaQrcode size={16} />
                    </div>
                  </div>

                  {/* QR descriptions */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-karateBg border border-karateCard">
                        {qrTabs[activeQrTab].icon}
                      </div>
                      <h4 className="text-xl font-sans font-bold text-karateWhite">
                        {qrTabs[activeQrTab].title}
                      </h4>
                    </div>

                    <p className="text-sm font-sans text-karateGray leading-relaxed font-light">
                      {qrTabs[activeQrTab].desc}
                    </p>

                    <div className="pt-2">
                      <a
                        href={qrTabs[activeQrTab].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-karateAccent hover:text-karateWhite transition-colors font-sans"
                        style={{ borderBottom: `1px dashed ${qrTabs[activeQrTab].color}` }}
                      >
                        Buka tautan secara langsung &rarr;
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ==================== 6. SCHEDULE SECTION ==================== */}
        <section id="schedule" className="py-24 relative overflow-hidden bg-karateSurface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-karateAccent uppercase"
              >
                Jadwal & Materi Latihan
              </motion.h2>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-karatePrimary"
              >
                Tempa Kedisiplinan Latihan Rutin
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karateGray font-light text-base"
              >
                Latihan reguler terjadwal dengan baik di bawah pengawasan pembina dan pelatih bersertifikasi FORKI.
              </motion.p>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: Schedule Cards */}
              <div className="lg:col-span-5 space-y-6">
                <h4 className="text-xl font-sans font-bold text-karateWhite pl-3 border-l-4 border-karatePrimary mb-4">
                  Jadwal Rutin
                </h4>

                {scheduleSessions.map((session, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInLeft}
                    className="glass-card p-6 rounded-2xl border border-karateCard flex items-start gap-4 relative overflow-hidden group hover:border-karateCard/80 transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-karatePrimary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-3 rounded-xl bg-karateSurface border border-karateCard text-karatePrimary">
                      <FaCalendarAlt size={22} className="text-karatePrimary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-sans font-extrabold text-karate">{session.day}</span>
                        <span className="flex items-center gap-1 text-xs text-karatePrimary font-medium">
                          <FaClock size={10} />
                          {session.time}
                        </span>
                      </div>
                      <p className="flex items-center gap-2 text-xs text-karateGray font-light">
                        <FaMapMarkerAlt size={12} className="text-karatePrimary" />
                        {session.location}
                      </p>
                      <p className="text-xs font-semibold text-karateAccent pt-1">{session.focus}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Material Curriculum Cards */}
              <div className="lg:col-span-7 space-y-6">
                <h4 className="text-xl font-sans font-bold text-karateWhite pl-3 border-l-4 border-karatePrimary mb-4">
                  Materi & Kurikulum Sabuk
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {courseMaterials.map((material, idx) => (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="glass-card p-6 rounded-2xl border border-karateCard flex flex-col hover:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-lg bg-karateSurface border border-karateCard w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                        {material.icon}
                      </div>
                      <h5 className="text-base font-sans font-bold text-karateWhite mb-2 group-hover:text-karateAccent transition-colors">
                        {material.title}
                      </h5>
                      <p className="text-xs font-sans text-karateGray leading-relaxed font-light flex-1">
                        {material.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== 7. GALLERY SECTION ==================== */}
        <section id="gallery" className="py-24 relative overflow-hidden bg-karateBg border-b border-karateCard">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-karateAccent uppercase"
              >
                Galeri Foto Kegiatan
              </motion.h2>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-karatePrimary"
              >
                Momen Kebersamaan & Prestasi
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karateGray font-light text-base"
              >
                Lihat cuplikan foto dari proses latihan tanding, kebersamaan di dojo, hingga piala kejuaraan yang didapatkan siswa Letris 2.
              </motion.p>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {galleryPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="relative aspect-square rounded-2xl overflow-hidden glass-card p-2 border border-karateCard shadow-soft-md group cursor-pointer"
                  onClick={() => setSelectedGalleryImg(photo)}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />

                    {/* Dark glass overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                      <div className="self-end p-3 rounded-lg bg-karatePrimary/20 border border-karatePrimary/40 text-karateWhite shadow-lg">
                        <FaSearchPlus size={18} />
                      </div>
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs text-karateAccent font-bold uppercase tracking-wider font-sans">
                          {photo.category}
                        </span>
                        <h4 className="text-lg font-sans font-bold text-karateWhite mt-1">
                          {photo.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================== 8. CONTACT & REGISTRATION SECTION ==================== */}
        <section id="contact" className="py-24 relative overflow-hidden bg-karateSurface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-karateAccent uppercase"
              >
                Pendaftaran & Kontak
              </motion.h2>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-karatePrimary"
              >
                Gabung Anggota Baru Sekarang
              </motion.h3>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-karateGray font-light text-base"
              >
                Hubungi kontak resmi pengurus Dojo Letris 2 atau isi formulir pendaftaran digital di bawah ini.
              </motion.p>
            </div>

            {/* Split layout: Contacts vs Registration Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                <h4 className="text-xl font-sans font-bold text-karateWhite pl-3 border-l-4 border-karatePrimary mb-6">
                  Kontak Dojo Letris 2
                </h4>

                {/* WhatsApp Chat Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-card p-6 rounded-2.5xl border border-karateCard flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-karateSurface border border-karateCard text-emerald-500 shadow-soft-sm">
                    <FaWhatsapp size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-karateAccent font-bold uppercase tracking-wider font-sans">WhatsApp CP (Kohai Fira)</span>
                    <p className="text-lg font-sans font-bold text-karateWhite">+62 877-8051-8535</p>
                    <p className="text-xs text-karateGray font-light">Layanan informasi Pendaftaran Anggota Baru (PAB)</p>
                  </div>
                </motion.div>

                {/* Instagram Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-card p-6 rounded-2.5xl border border-karateCard flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-karateSurface border border-karateCard text-pink-500 shadow-soft-sm">
                    <FaInstagram size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-karateAccent font-bold uppercase tracking-wider font-sans">Instagram Official</span>
                    <a
                      href="https://instagram.com/karate.letris2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-sans font-bold text-karateWhite hover:text-karateAccent block transition-colors"
                    >
                      @karate.letris2
                    </a>
                    <p className="text-xs text-karateGray font-light">DM untuk info agenda promosi terupdate</p>
                  </div>
                </motion.div>

                {/* School Address Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-card p-6 rounded-2.5xl border border-karateCard flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-karateSurface border border-karateCard text-karatePrimary shadow-soft-sm">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-karateAccent font-bold uppercase tracking-wider font-sans">Tempat Latihan (Dojo)</span>
                    <p className="text-sm font-sans font-bold text-karateWhite leading-normal">
                      SMK Letris Indonesia 2
                    </p>
                    <p className="text-xs text-karateGray font-light leading-relaxed">
                      Jl. Siliwangi No.1, Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten 15417
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Direct WA Form */}
              <div id="register" className="lg:col-span-7">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="glass-card p-8 sm:p-10 rounded-3xl border border-karateCard shadow-soft-lg space-y-6"
                >
                  <h4 className="text-xl font-sans font-bold text-karateText text-center">
                    Formulir Pendaftaran Online
                  </h4>

                  <form onSubmit={handleFormSubmit} className="space-y-5">

                    {/* Full Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-bold text-karateGray uppercase tracking-wider">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Ketik nama lengkap sesuai rapor..."
                        className="w-full px-4 py-3 bg-karateCard border border-karateCard rounded-xl font-sans text-sm text-karateText placeholder-karateGray focus:outline-none focus:border-karatePrimary focus:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all"
                      />
                    </div>

                    {/* Class & Major input */}
                    <div className="space-y-2">
                      <label htmlFor="classRoom" className="block text-xs font-bold text-karateGray uppercase tracking-wider">
                        Kelas & Jurusan
                      </label>
                      <input
                        type="text"
                        id="classRoom"
                        name="classRoom"
                        required
                        value={formData.classRoom}
                        onChange={handleFormChange}
                        placeholder="Contoh: X RPL 2, XI OTKP 1..."
                        className="w-full px-4 py-3 bg-karateCard border border-karateCard rounded-xl font-sans text-sm text-karateText placeholder-karateGray focus:outline-none focus:border-karatePrimary focus:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all"
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-bold text-karateGray uppercase tracking-wider">
                        Nomor WhatsApp Aktif
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Contoh: 0812XXXXXXXX..."
                        className="w-full px-4 py-3 bg-karateCard border border-karateCard rounded-xl font-sans text-sm text-karateText placeholder-karateGray focus:outline-none focus:border-karatePrimary focus:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all"
                      />
                    </div>

                    {/* Reason Textarea */}
                    <div className="space-y-2">
                      <label htmlFor="reason" className="block text-xs font-bold text-karateGray uppercase tracking-wider">
                        Alasan Ingin Bergabung
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows="4"
                        required
                        value={formData.reason}
                        onChange={handleFormChange}
                        placeholder="Tuliskan motivasi utama Anda berlatih karate..."
                        className="w-full px-4 py-3 bg-karateCard border border-karateCard rounded-xl font-sans text-sm text-karateText placeholder-karateGray focus:outline-none focus:border-karatePrimary focus:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Registration button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-karatePrimary text-karateBg font-bold text-sm hover:bg-karateSecondary transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 shadow-soft-md hover:shadow-soft-lg disabled:bg-karateCard disabled:text-karateGray"
                    >
                      <FaPaperPlane size={14} className={isSubmitting ? 'animate-bounce' : ''} />
                      {isSubmitting ? 'Mengalihkan ke WhatsApp CP...' : 'Submit via WhatsApp CP'}
                    </button>

                  </form>
                </motion.div>
              </div>

            </div>

          </div>
        </section>
      </main>

      {/* ==================== 9. FOOTER SECTION ==================== */}
      <footer className="bg-karateBg border-t border-karateCard py-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-karatePrimary/5 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center gap-6">

          {/* Logo Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 text-center sm:text-left">
            <img src={logo} alt="Excellence Knight Logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain" />
            <div className="flex flex-col">
              <span className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-karateWhite leading-none">KARATE</span>
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-600">LETRIS 2</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-karateGray font-sans text-center max-w-md leading-relaxed font-light">
            Membina seni bela diri Karate Shoto-kan berlandaskan integritas dan Bushido demi mewujudkan siswa SMK Letris Indonesia 2 yang berprestasi, tangguh, dan berdisiplin baja.
          </p>

          {/* Social icons */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://instagram.com/karate.letris2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-karateSurface border border-karateCard text-karateGray hover:text-karatePrimary hover:border-karatePrimary transition-all duration-300"
              aria-label="Instagram Link"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://wa.me/6287780518535"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-karateSurface border border-karateCard text-karateGray hover:text-karatePrimary hover:border-karatePrimary transition-all duration-300"
              aria-label="WhatsApp Link"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>

          <div className="w-full max-w-2xl border-t border-slate-900/60 my-2"></div>

          <div className="text-[10px] font-sans text-slate-500 uppercase tracking-widest text-center">
            &copy; {new Date().getFullYear()} EKSTRAKURIKULER KARATE SMK LETRIS INDONESIA 2. ALL RIGHTS RESERVED.
          </div>

        </div>
      </footer>

      {/* ==================== 10. LIGHTBOX GALLERY MODAL ==================== */}
      <AnimatePresence>
        {selectedGalleryImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedGalleryImg(null)}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-800 text-karateWhite hover:text-karateAccent transition-colors z-55 shadow-lg"
              aria-label="Close Lightbox"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal Image Frame */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-4xl w-full max-h-[80vh] flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 rounded-2xl glass-card border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                <img
                  src={selectedGalleryImg.src}
                  alt={selectedGalleryImg.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                />
              </div>
              <div className="text-center px-4">
                <span className="text-xs text-karateAccent font-bold tracking-wider font-sans uppercase">
                  {selectedGalleryImg.category}
                </span>
                <h4 className="text-xl font-sans font-bold text-karateWhite mt-1">
                  {selectedGalleryImg.title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
