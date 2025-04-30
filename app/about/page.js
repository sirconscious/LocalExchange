"use client"
import Image from "next/image"
import NavBar from "../Components/NavBar"
import { ArrowRight, Users, Leaf, Shield, Heart, Star, Sparkles, Globe, Clock, TrendingUp, ChevronDown, Quote, Award, Target } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Counter animation component
const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = parseInt(target)
      const incrementTime = (duration * 1000) / end
      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) clearInterval(timer)
      }, incrementTime)
      return () => clearInterval(timer)
    }
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useSpring(1, { stiffness: 100, damping: 30 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 animate-gradient" />
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white max-w-4xl mt-16"
            >
              <motion.div 
                variants={fadeIn}
                className="inline-block mb-4"
              >
                <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                  LocalExchange - Votre plateforme d'échange local
                </span>
              </motion.div>
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Construisons ensemble une communauté plus forte
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-3xl"
              >
                LocalExchange, votre plateforme locale pour des échanges durables et des connexions authentiques. 
                Rejoignez une communauté qui valorise la proximité et le partage.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  Découvrir notre histoire
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center gap-2 backdrop-blur-sm border border-white/20"
                >
                  Rejoindre la communauté
                  <Users className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Story & Vision Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block mb-4"
            >
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                Notre Vision
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Une nouvelle façon d'échanger localement
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Chez LocalExchange, nous croyons en la puissance des connexions locales. Notre mission est de créer une plateforme 
              qui facilite les échanges de biens et services tout en renforçant les liens communautaires et en promouvant 
              une consommation plus durable.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div 
              variants={scaleIn}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
                alt="Local community market"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeIn}>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Notre Histoire</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  LocalExchange est né d'une simple observation : nos communautés regorgent de ressources inutilisées 
                  et de talents cachés. En 2023, nous avons lancé cette plateforme pour transformer la façon dont 
                  les gens échangent et interagissent localement.
                </p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Notre Impact</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Aujourd'hui, nous sommes fiers de connecter des milliers de personnes dans leur quête d'une 
                  consommation plus responsable et d'une vie communautaire plus riche.
                </p>
              </motion.div>
              <motion.div 
                variants={fadeIn}
                className="grid grid-cols-2 gap-6 pt-4"
              >
                {[
                  { icon: <Users className="w-6 h-6" />, label: "10K+ Membres" },
                  { icon: <Globe className="w-6 h-6" />, label: "5 Villes" },
                  { icon: <Clock className="w-6 h-6" />, label: "24/7 Support" },
                  { icon: <TrendingUp className="w-6 h-6" />, label: "95% Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                      {stat.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { 
                number: "10K+", 
                label: "Membres actifs",
                icon: <Users className="w-8 h-8" />,
                color: "text-orange-500"
              },
              { 
                number: "50K+", 
                label: "Échanges réussis",
                icon: <Target className="w-8 h-8" />,
                color: "text-green-500"
              },
              { 
                number: "95%", 
                label: "Satisfaction",
                icon: <Star className="w-8 h-8" />,
                color: "text-blue-500"
              },
              { 
                number: "24/7", 
                label: "Support",
                icon: <Clock className="w-8 h-8" />,
                color: "text-purple-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6`}>
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                  className="text-5xl font-bold mb-4"
                >
                  <Counter target={stat.number.replace(/[^0-9]/g, '')} />
                  {stat.number.includes('+') && '+'}
                  {stat.number.includes('/') && '/7'}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">{stat.label}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block mb-4"
            >
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                Témoignages
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Ce que disent nos membres
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Découvrez les expériences de notre communauté et comment LocalExchange a transformé leur façon d'échanger localement.
            </motion.p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  text: "LocalExchange a transformé ma façon de consommer. J'ai rencontré des gens incroyables et j'ai trouvé des objets uniques tout en réduisant mon impact environnemental.",
                  author: "Marie L.",
                  role: "Casablanca",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                  rating: 5,
                  date: "Il y a 2 mois"
                },
                {
                  text: "La plateforme est intuitive et sécurisée. J'ai pu vendre mes meubles rapidement et j'ai même créé des amitiés durables avec d'autres membres.",
                  author: "Ahmed K.",
                  role: "Rabat",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                  rating: 5,
                  date: "Il y a 1 mois"
                },
                {
                  text: "Une expérience incroyable ! J'ai pu donner une seconde vie à mes objets tout en rencontrant des personnes passionnantes de mon quartier.",
                  author: "Sophie M.",
                  role: "Marrakech",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                  rating: 5,
                  date: "Il y a 3 semaines"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-8 transition-all relative group border border-gray-100 shadow-lg hover:shadow-xl"
                >
                  <div className="absolute top-8 left-8 text-orange-500/10">
                    <Quote className="w-12 h-12" />
                  </div>
                  <div className="flex items-center mb-6 relative">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-orange-500/20">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-sm text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">{testimonial.text}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20"
              >
                Voir plus de témoignages
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block mb-4"
            >
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                Notre Équipe
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Rencontrez notre équipe
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Des passionnés dédiés à la création d'une communauté locale plus forte et durable.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
                name: "Ahmed Benali",
                role: "Fondateur & CEO",
                description: "Passionné par l'économie circulaire et le développement local, Ahmed a créé LocalExchange pour transformer la façon dont les communautés interagissent.",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "#"
                },
                achievements: ["15+ ans d'expérience", "Expert en économie circulaire", "Conférencier international"]
              },
              {
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                name: "Sarah Martin",
                role: "Directrice Marketing",
                description: "Experte en stratégie digitale, Sarah s'assure que notre message de communauté et de durabilité atteint le bon public.",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "#"
                },
                achievements: ["Expert en marketing digital", "Certifiée en développement durable", "Mentor de startups"]
              },
              {
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
                name: "Karim Hassan",
                role: "Directeur Technique",
                description: "Spécialiste en développement web, Karim veille à ce que notre plateforme reste innovante et facile à utiliser.",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "#"
                },
                achievements: ["Architecte logiciel senior", "Expert en UX/UI", "Open Source Contributor"]
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-[400px]"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-lg mb-4">{member.description}</p>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-6">{member.role}</p>
                  <div className="flex gap-4">
                    <a 
                      href={member.social.linkedin} 
                      className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-orange-50 rounded-lg"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-orange-50 rounded-lg"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.social.email} 
                      className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-orange-50 rounded-lg"
                      aria-label="Email"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20"
            >
              Rejoindre notre équipe
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={fadeIn}
                className="p-12 md:p-16 text-white"
              >
                <motion.div 
                  variants={fadeIn}
                  className="inline-block mb-4"
                >
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    Rejoignez-nous
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez notre communauté</h2>
                <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                  Commencez à échanger localement et découvrez une nouvelle façon de consommer. 
                  Ensemble, créons un avenir plus durable et connecté.
                </p>
                <motion.div
                  variants={fadeIn}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-orange-500 px-8 py-4 rounded-xl font-medium hover:bg-orange-50 transition-all flex items-center gap-2 shadow-lg"
                  >
                    Commencer maintenant
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
                  >
                    En savoir plus
                    <Sparkles className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="relative h-[400px] md:h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
                  alt="Community"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-orange-500/50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}