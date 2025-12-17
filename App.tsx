import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, Layers, Database, Code, CheckSquare, Mail, Calendar, Linkedin, Users, Globe } from 'lucide-react';
import BinaryRain from './components/BinaryRain';
import { Section, SectionHeader } from './components/Section';
import LiveTour from './components/LiveTour';
import ChatAgent from './components/ChatAgent';
import { ContactModal } from './components/ContactModal';
import { SkillCategory } from './types';

// Updated Data Definitions incorporating CV Skills
const SKILLS: SkillCategory[] = [
  {
    title: "AI Agent Capabilities",
    skills: [
      { name: "Goal-Oriented Agents", description: "Autonomous reasoning engines" },
      { name: "Multi-Agent Systems", description: "Collaborative swarms" },
      { name: "Tool Use / Function Calling", description: "API & DB Interfacing" },
      { name: "Memory Systems", description: "Vector DB / Long-term context" }
    ]
  },
  {
    title: "Automation Architecture",
    skills: [
      { name: "Workflow Orchestration", description: "n8n / Airflow / Temporal" },
      { name: "Event-Driven Systems", description: "Real-time triggers" },
      { name: "Resiliency Patterns", description: "Error handling & retries" },
      { name: "Platform Agnostic", description: "Cross-cloud integration" }
    ]
  },
  {
    title: "Operational Intelligence",
    skills: [
      { name: "Customer Experience", description: "In-depth conflict resolution & support" },
      { name: "Qualitative Research", description: "Psychographics & User Motivations" },
      { name: "Multilingual Support", description: "English & Kiswahili Fluency" },
      { name: "Data Analysis", description: "Network trends & service delivery" }
    ]
  }
];

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-enterprise-950 text-neutral-200 font-sans selection:bg-enterprise-accent selection:text-black">
      
      {/* Floating Interactive Elements */}
      <ChatAgent />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative h-screen w-full flex items-center overflow-hidden">
        <BinaryRain />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center">
           <div className="md:col-span-8 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-enterprise-accent font-mono text-sm tracking-widest uppercase mb-4 block">
                  Enterprise AI · Automation · Data Systems
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  Designing Intelligent Systems That <span className="text-transparent bg-clip-text bg-gradient-to-r from-enterprise-accent to-emerald-200">Operate at Scale</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                  AI agents, automation workflows, and data intelligence built for real enterprise environments — governed, reliable, and production-ready.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 bg-enterprise-accent text-black font-bold rounded flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Terminal size={20} />
                  Request Live Agent Demo
                </button>
                <button 
                  onClick={() => document.getElementById('live-tour')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-enterprise-800 text-white font-medium rounded hover:bg-enterprise-900 transition-all"
                >
                  Watch System Tour
                </button>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 1 }}
                 className="pt-12 border-t border-enterprise-800/50"
              >
                 <div className="text-white font-semibold">Samwel Chege</div>
                 <div className="text-gray-500 text-sm">Enterprise AI Systems Architect & Founder, Gruppy Technologies</div>
                 <div className="text-enterprise-dim text-xs mt-1">Background: Civil Engineering, Customer Ops, & Linguistics</div>
              </motion.div>
           </div>
        </div>
      </div>

      {/* ---------------- VALUE PROPOSITIONS ---------------- */}
      <Section className="bg-enterprise-900/30 border-y border-enterprise-800/50">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: <Cpu className="w-8 h-8 text-enterprise-accent" />, 
              title: "AI Agents as Operators", 
              desc: "I design agents that reason, act, and collaborate within governed systems—not just chatbots, but workers." 
            },
            { 
              icon: <Users className="w-8 h-8 text-blue-400" />, 
              title: "Human-Centric Ops", 
              desc: "Combining technical automation with deep experience in customer service and qualitative research." 
            },
            { 
              icon: <Globe className="w-8 h-8 text-purple-400" />, 
              title: "Multilingual Systems", 
              desc: "Designing inclusive systems with fluency in English and Kiswahili for broader accessibility." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="space-y-4"
            >
              <div className="bg-enterprise-900 w-16 h-16 rounded-xl flex items-center justify-center border border-enterprise-800">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ---------------- LIVE TOUR (FLAGSHIP) ---------------- */}
      <Section id="live-tour">
        <SectionHeader 
          title="Live Enterprise Agent Tour" 
          subtitle="A real-time walkthrough of AI agents operating inside a controlled enterprise automation environment. No mockups—system logic in action."
        />
        <LiveTour />
      </Section>

      {/* ---------------- CAPABILITIES (TAXONOMY) ---------------- */}
      <Section className="bg-enterprise-900/20">
        <SectionHeader 
          title="System Capabilities" 
          subtitle="A technical taxonomy of the systems I architect, blending engineering precision with operational insight."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-enterprise-950 border border-enterprise-800 p-8 rounded-2xl hover:border-enterprise-accent/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <Code className="w-5 h-5 text-enterprise-dim" /> {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <li key={j} className="flex flex-col gap-1">
                    <span className="text-gray-200 font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-enterprise-accent rounded-full" />
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 pl-4 border-l border-enterprise-800 ml-[3px]">
                      {skill.description}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ---------------- CTA / FOOTER ---------------- */}
      <Section id="contact" className="pb-16">
        <div className="bg-enterprise-accent rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-black">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Engage With The System</h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-80">
              Samwel Chege is available for Enterprise Consulting and Strategic Leadership roles.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.href = 'mailto:chegesammwel@gmail.com'} 
                className="px-8 py-4 bg-black text-white font-bold rounded hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
              >
                <Mail size={20} /> Request Conversation
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-4 bg-white text-black font-bold rounded border-2 border-black hover:bg-neutral-100 transition-all flex items-center justify-center gap-3"
              >
                <Calendar size={20} /> Schedule Demo
              </button>
            </div>
          </div>
        </div>
        
        <footer className="mt-24 border-t border-enterprise-800 pt-12 flex flex-col md:flex-row justify-between items-center text-enterprise-dim text-sm">
          <div>
            &copy; {new Date().getFullYear()} Samwel Chege. All Systems Operational.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-enterprise-accent transition-colors flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
            <a href="mailto:chegesammwel@gmail.com" className="hover:text-enterprise-accent transition-colors">chegesammwel@gmail.com</a>
          </div>
        </footer>
      </Section>
    </div>
  );
}

export default App;