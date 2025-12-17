import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Code, Mail, Calendar, Linkedin, Users, Globe, PenTool, Brain, Server, Layers } from 'lucide-react';
import BinaryRain from './components/BinaryRain';
import { Section, SectionHeader } from './components/Section';
import LiveTour from './components/LiveTour';
import ChatAgent, { ChatAgentHandle } from './components/ChatAgent';
import { ContactModal, ContactData } from './components/ContactModal';
import SkillMatrix, { SkillMatrixHandle } from './components/SkillMatrix'; 

// Updated to include ID matching SkillMatrix
const TOP_SKILLS = [
  { id: 'fullstack', icon: <Code size={14}/>, label: "Full Stack Dev" },
  { id: 'api', icon: <Server size={14}/>, label: "API Integration" },
  { id: 'model', icon: <Brain size={14}/>, label: "Model Engineering" },
  { id: 'design', icon: <PenTool size={14}/>, label: "Graphic Design" },
  { id: 'strategy', icon: <Users size={14}/>, label: "Strategic Consulting" },
];

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const chatAgentRef = useRef<ChatAgentHandle>(null);
  
  // Ref for the new SkillMatrix component
  const skillMatrixRef = useRef<SkillMatrixHandle>(null);

  const handleBookingDraft = (data: ContactData) => {
    setIsContactOpen(false);
    chatAgentRef.current?.setDraft(
      `I'd like to discuss ${data.intent}.\nMy name is ${data.name} and my email is ${data.email}.\n\n(Please specify your preferred time or specific requirements here...)`
    );
  };

  const handleOpenContact = () => setIsContactOpen(true);

  // New Handler: Scrolls to section AND sets active tab
  const handleSkillClick = (skillId: string) => {
    const section = document.getElementById('capabilities');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Small timeout to allow smooth scroll to start before switching content
      setTimeout(() => {
        skillMatrixRef.current?.setActiveSkill(skillId);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-enterprise-950 text-neutral-200 font-sans selection:bg-enterprise-accent selection:text-black overflow-x-hidden">
      
      {/* --- GLOBAL BINARY RAIN BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <BinaryRain />
      </div>

      <ChatAgent ref={chatAgentRef} />
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        onSubmit={handleBookingDraft} 
      />

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative min-h-screen w-full flex items-center pt-20 pb-10 md:pt-0 md:pb-0">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center">
           <div className="md:col-span-8 space-y-8">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-black/20 backdrop-blur-sm p-6 rounded-3xl border border-white/5 shadow-2xl"
              >
                <span className="text-enterprise-accent font-mono text-xs md:text-sm tracking-widest uppercase mb-4 block">
                  Enterprise AI · Full Stack · Strategic Design
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-enterprise-accent to-emerald-200">Intelligent Systems</span> & Digital Experiences
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                  Combining advanced Model Engineering, resilient Full Stack architecture, and Strategic Design to solve complex enterprise problems.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={handleOpenContact}
                  className="px-8 py-4 bg-enterprise-accent text-black font-bold rounded flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
                >
                  <Terminal size={20} />
                  Request Live Demo
                </button>
                {/* RESTORED: Watch System Tour Button */}
                <button 
                  onClick={() => document.getElementById('live-tour')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-enterprise-900/80 border border-enterprise-800 text-white font-medium rounded hover:bg-enterprise-800 transition-all backdrop-blur-md"
                >
                  Watch System Tour
                </button>
              </motion.div>

              {/* Skills Ticker (Clickable to Redirect) */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 1 }}
                 className="pt-8 border-t border-enterprise-800/50"
              >
                 <div className="flex flex-col md:flex-row md:items-start gap-6">
                   <div className="flex-1">
                     <div className="text-white font-semibold text-lg mb-1">Samwel Chege</div>
                     <motion.div 
                       animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-enterprise-accent to-white bg-[length:200%_auto] bg-clip-text text-transparent mb-2"
                     >
                       Enterprise AI Systems Architect & Founder
                     </motion.div>

                     <div className="text-enterprise-dim text-sm mb-6 max-w-lg">
                       Select a core competency below to explore technical details:
                     </div>

                     <div className="flex flex-wrap gap-3">
                       {TOP_SKILLS.map((skill, i) => (
                         <motion.button
                           key={i}
                           onClick={() => handleSkillClick(skill.id)}
                           initial={{ opacity: 0, scale: 0.5, y: 20 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           transition={{ delay: 1.2 + (i * 0.1), type: "spring", stiffness: 100 }}
                           whileHover={{ 
                             scale: 1.1, 
                             y: -5,
                             backgroundColor: "rgba(16, 185, 129, 0.2)",
                             borderColor: "rgba(16, 185, 129, 0.8)",
                             boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
                           }}
                           whileTap={{ scale: 0.95 }}
                           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-white/10 text-xs md:text-sm font-mono text-emerald-400 cursor-pointer backdrop-blur-md transition-all select-none shadow-lg"
                         >
                           {skill.icon} 
                           <span>{skill.label}</span>
                         </motion.button>
                       ))}
                     </div>
                   </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>

      {/* ---------------- NEW: SKILL MATRIX ---------------- */}
      <Section id="capabilities" className="relative z-10">
        <SectionHeader 
          title="Technical Capabilities" 
          subtitle="A granular look at the technologies, protocols, and strategies I deploy across the entire stack."
        />
        <SkillMatrix ref={skillMatrixRef} />
      </Section>

      {/* ---------------- LIVE TOUR (AI) ---------------- */}
      <Section id="live-tour" className="relative z-10">
        <SectionHeader 
          title="Live Enterprise Agent Tour" 
          subtitle="See how I architect AI agents that operate inside these software environments."
        />
        <LiveTour onContact={handleOpenContact} />
      </Section>

      {/* ---------------- VALUE PROPOSITIONS ---------------- */}
      <Section className="relative z-10 bg-enterprise-950/80 backdrop-blur-md border-y border-enterprise-800/50">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: <Code className="w-8 h-8 text-blue-400" />, 
              title: "Full Stack Architecture", 
              desc: "Building complete digital products from pixel-perfect React frontends to scalable Node.js backends and databases." 
            },
            { 
              icon: <Cpu className="w-8 h-8 text-enterprise-accent" />, 
              title: "AI & Automation", 
              desc: "Integrating intelligent agents directly into software ecosystems to automate complex operational workflows." 
            },
            { 
              icon: <Globe className="w-8 h-8 text-pink-400" />, 
              title: "Creative Design", 
              desc: "Combining technical precision with high-end graphic design and UI/UX principles for superior user experiences." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="space-y-4 p-6 rounded-2xl hover:bg-white/5 transition-all cursor-default"
            >
              <div className="bg-enterprise-900 w-16 h-16 rounded-xl flex items-center justify-center border border-enterprise-800 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ---------------- CTA / FOOTER ---------------- */}
      <Section id="contact" className="relative z-10 pb-16">
        <div className="bg-enterprise-accent rounded-3xl p-8 md:p-24 text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-black">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to Build?</h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-80">
              From Model Engineering to Full Stack Development, I bring the complete technical package.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.href = 'mailto:chegesammwel@gmail.com'} 
                className="px-8 py-4 bg-black text-white font-bold rounded hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95"
              >
                <Mail size={20} /> Request Conversation
              </button>
              <button 
                onClick={handleOpenContact}
                className="px-8 py-4 bg-white text-black font-bold rounded border-2 border-black hover:bg-neutral-100 transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95"
              >
                <Calendar size={20} /> Schedule Demo
              </button>
            </div>
          </div>
        </div>
        
        <footer className="mt-24 border-t border-enterprise-800 pt-12 flex flex-col md:flex-row justify-between items-center text-enterprise-dim text-sm bg-black/40 backdrop-blur-md p-6 rounded-t-xl">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Samwel Chege. All Systems Operational.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-enterprise-accent transition-colors flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
            <a href="mailto:chegesammwel@gmail.com" className="hover:text-enterprise-accent transition-colors">chegesammwel@gmail.com</a>
          </div>
        </footer>
      </Section>
    </div>
  );
}

export default App;