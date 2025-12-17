import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Briefcase, ArrowRight, Terminal,
  Cpu, Video, FileText, 
  Calendar, TrendingUp,
  CheckCircle, X, MessageCircle, 
  Instagram, Linkedin, Facebook, Twitter
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

// --- TYPES & INTERFACES ---

interface LiveTourProps {
  onContact: () => void;
}

const STEPS = [
  { id: 0, label: "The Hook" },
  { id: 1, label: "Social Engine" },
  { id: 2, label: "Digital Worker" },
  { id: 3, label: "Integration" },
  { id: 4, label: "ROI Reality" },
  { id: 5, label: "Your Turn" },
];

// --- HELPER COMPONENTS ---

// Glowing Icons for "Boasting" effect
const GlowIcon = ({ children, color = "text-emerald-400", bg = "bg-emerald-500/10" }: any) => (
  <div className={`p-3 rounded-xl ${bg} ${color} border border-${color.split('-')[1]}-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse-slow`}>
    {children}
  </div>
);

// Typewriter Effect
const Typewriter = ({ text, speed = 15, delay = 0 }: { text: string; speed?: number; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, started]);
  
  return <span>{displayedText}</span>;
};

// --- MAIN COMPONENT ---

const LiveTour: React.FC<LiveTourProps> = ({ onContact }) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation Data Generative Effect (Step 3)
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        const actions = [
          "Analyzing Lead Sentiment... Positive",
          "Syncing with Salesforce CRM...",
          "Updating Google Sheets Row #884...",
          "Detecting Payment Intent...",
          "Generating Weekly Performance Report..."
        ];
        const newLog = `> ${actions[Math.floor(Math.random() * actions.length)]}`;
        setLogs(prev => [newLog, ...prev].slice(0, 8));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLogs([]);
    }
  }, [step]);

  const renderContent = () => {
    switch (step) {
      // ---------------- STEP 0: THE HOOK ----------------
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />
              <Cpu size={80} className="text-emerald-400 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              NOT A <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CHATBOT.</span>
            </h3>
            
            <div className="max-w-2xl space-y-4 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
              <p>
                "What you’re about to see is a <span className="text-white font-bold">working AI agent</span> that replaces multiple roles in a business."
              </p>
              <p>
                It doesn’t sleep. It doesn’t forget. It doesn’t need supervision.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
              className="mt-10 px-8 py-4 bg-emerald-500 text-black font-bold text-lg rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all flex items-center gap-2"
            >
              Witness The Power <ArrowRight size={20} />
            </motion.button>
          </div>
        );

      // ---------------- STEP 1: SOCIAL ENGINE ----------------
      case 1:
        return (
          <div className="h-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

             <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
               <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest">
                   <Zap size={12} /> Social Autopilot Active
                 </div>
                 <h3 className="text-3xl font-bold text-white">One Video. <br/><span className="text-purple-400">Entire Campaign.</span></h3>
                 <ul className="space-y-4 text-gray-400">
                   <li className="flex items-center gap-3">
                     <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                     <span>Converts 1 video into <strong>10+ content pieces</strong></span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                     <span>Generates captions, thumbnails & blog posts</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                     <span>Auto-posts to <strong>FB, IG, LinkedIn, TikTok & X</strong></span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                     <span>Replies to comments & DMs <strong>24/7</strong></span>
                   </li>
                 </ul>
               </div>

               {/* Visualization */}
               <div className="relative bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                 <div className="flex justify-center mb-8">
                   <motion.div 
                     animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                     className="relative"
                   >
                     <Video size={48} className="text-white relative z-10" />
                     <div className="absolute inset-0 bg-white/50 blur-xl" />
                   </motion.div>
                 </div>
                 
                 {/* Processing Lines */}
                 <div className="grid grid-cols-3 gap-4 text-center">
                    {['Image Extraction', 'Caption Gen', 'Auto-Schedule'].map((label, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.5 + 0.5 }}
                        className="bg-enterprise-900 border border-enterprise-800 p-3 rounded-lg flex flex-col items-center gap-2"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                         <span className="text-[10px] font-mono text-gray-400 uppercase">{label}</span>
                      </motion.div>
                    ))}
                 </div>

                 {/* Output Icons */}
                 <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-white/5">
                   {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                     <motion.div 
                        key={i}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 + (i * 0.1) }}
                        className="text-gray-400 hover:text-white transition-colors"
                     >
                       <Icon size={20} />
                     </motion.div>
                   ))}
                 </div>
                 
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                   CAMPAIGN LIVE
                 </div>
               </div>
             </div>
          </div>
        );

      // ---------------- STEP 2: DIGITAL WORKER ----------------
      case 2:
        return (
          <div className="h-full flex flex-col px-6 md:px-12 pt-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">The 24/7 Digital Worker</h3>
              <p className="text-gray-400">"Instead of manually opening files, copying data, or rewriting documents — <span className="text-white font-semibold">the agent does it instantly.</span>"</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 flex-1 min-h-0 pb-6">
              {/* Task List */}
              <div className="bg-enterprise-900/50 border border-enterprise-800 rounded-2xl p-6 flex flex-col justify-center space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400"><FileText size={24} /></div>
                   <div>
                     <h4 className="text-white font-bold text-lg">Document Cruncher</h4>
                     <p className="text-sm text-gray-400 mt-1">Reads PDFs, Excels, & Images. Extracts data & fills your database automatically.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400"><Calendar size={24} /></div>
                   <div>
                     <h4 className="text-white font-bold text-lg">Booking Handler</h4>
                     <p className="text-sm text-gray-400 mt-1">Manages calendar invites, sends confirmations, & handles follow-ups. No double bookings.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400"><MessageCircle size={24} /></div>
                   <div>
                     <h4 className="text-white font-bold text-lg">Support Agent</h4>
                     <p className="text-sm text-gray-400 mt-1">Answers FAQs & resolves tickets instantly. Escalates only real emergencies.</p>
                   </div>
                 </div>
              </div>

              {/* Simulation */}
              <div className="bg-black border border-gray-800 rounded-2xl p-4 font-mono text-sm relative overflow-hidden shadow-inner">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 animate-gradient" />
                <div className="space-y-4 mt-2">
                   <div className="flex gap-3">
                     <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0">U</div>
                     <div className="bg-gray-800 p-3 rounded-lg text-gray-300 text-xs">
                       Here is the invoice PDF. Please process it and book a follow-up for Tuesday.
                     </div>
                   </div>
                   
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                     className="flex gap-3 flex-row-reverse"
                   >
                     <div className="w-8 h-8 bg-emerald-500 text-black font-bold rounded-full flex items-center justify-center shrink-0">AI</div>
                     <div className="bg-emerald-900/30 border border-emerald-500/30 p-3 rounded-lg text-emerald-100 text-xs space-y-2">
                       <p className="flex items-center gap-2"><CheckCircle size={10} /> Reading PDF Invoice #9921...</p>
                       <p className="flex items-center gap-2"><CheckCircle size={10} /> Data Extracted: $4,500 due.</p>
                       <p className="flex items-center gap-2"><CheckCircle size={10} /> Calendar Checked: Tuesday 2pm available.</p>
                       <p className="text-white font-bold mt-2">Done. Invoice logged to CRM and meeting invite sent.</p>
                     </div>
                   </motion.div>
                </div>
              </div>
            </div>
          </div>
        );

      // ---------------- STEP 3: INTEGRATION & INTEL ----------------
      case 3:
        return (
          <div className="h-full flex flex-col px-6 md:px-12 pt-8">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-3xl font-bold text-white">"Everything Connects."</h3>
               <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-1 rounded-full text-emerald-400 text-xs font-mono animate-pulse">
                 SYSTEM LIVE
               </div>
             </div>

             <div className="grid lg:grid-cols-2 gap-8 flex-1 min-h-0 pb-6">
                {/* Visual Graph */}
                <div className="bg-enterprise-900 border border-enterprise-800 rounded-2xl p-6 relative">
                   <h4 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-emerald-400"/> Business Intelligence</h4>
                   <div className="h-48 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={[
                         {name: 'Mon', val: 40}, {name: 'Tue', val: 65}, {name: 'Wed', val: 50}, 
                         {name: 'Thu', val: 90}, {name: 'Fri', val: 85}, {name: 'Sat', val: 120}
                       ]}>
                         <defs>
                           <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                         <Area type="monotone" dataKey="val" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" />
                       </AreaChart>
                     </ResponsiveContainer>
                   </div>
                   <div className="absolute bottom-6 right-6 text-right">
                     <div className="text-3xl font-bold text-white">124%</div>
                     <div className="text-xs text-gray-400 uppercase tracking-widest">Efficiency Gain</div>
                   </div>
                </div>

                {/* Live Logs */}
                <div className="bg-black border border-gray-800 rounded-2xl p-4 font-mono text-xs flex flex-col shadow-2xl">
                   <div className="flex items-center gap-2 text-gray-500 border-b border-gray-800 pb-2 mb-2">
                     <Terminal size={14} /> <span>AGENT_CORE_LOGS</span>
                   </div>
                   <div className="flex-1 space-y-2 overflow-hidden">
                     <AnimatePresence>
                       {logs.map((log, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                           className="text-emerald-400/80 truncate"
                         >
                           {log}
                         </motion.div>
                       ))}
                     </AnimatePresence>
                   </div>
                </div>
             </div>
          </div>
        );

      // ---------------- STEP 4: ROI REALITY ----------------
      case 4:
        return (
          <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
             {/* Background Flash */}
             <div className="absolute inset-0 bg-red-500/5 animate-pulse-slow pointer-events-none" />
             
             <h3 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-tight relative z-10">
               What Does This <span className="text-red-500 line-through decoration-4 decoration-white">Cost?</span> <br/>
               <span className="text-emerald-400">No. What Does It Replace?</span>
             </h3>

             <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
               {/* Old Way */}
               <div className="bg-red-900/10 border border-red-500/30 p-8 rounded-2xl relative opacity-60 grayscale hover:grayscale-0 transition-all">
                  <h4 className="text-red-400 font-bold mb-6 uppercase tracking-widest text-sm">The Old Payroll</h4>
                  <ul className="space-y-4">
                    {['Social Media Manager', 'Content Writer', 'Support Staff', 'Data Entry Clerk', 'Booking Assistant'].map((role, i) => (
                      <li key={i} className="flex items-center justify-between text-gray-400 line-through decoration-red-500 decoration-2">
                        <span>{role}</span>
                        <X size={16} className="text-red-500" />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-red-500/30 text-center">
                     <div className="text-2xl font-bold text-gray-500">$$$ Monthly Burn</div>
                  </div>
               </div>

               {/* New Way */}
               <div className="bg-emerald-900/20 border-2 border-emerald-500 p-8 rounded-2xl relative shadow-[0_0_50px_rgba(16,185,129,0.15)] transform scale-105">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-black px-4 py-1 rounded uppercase text-xs tracking-wider shadow-lg">
                    The Solution
                  </div>
                  <h4 className="text-emerald-400 font-bold mb-6 uppercase tracking-widest text-sm">One AI System</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white font-medium">
                      <CheckCircle size={20} className="text-emerald-400" />
                      <span>Social Media Autopilot</span>
                    </div>
                    <div className="flex items-center gap-3 text-white font-medium">
                      <CheckCircle size={20} className="text-emerald-400" />
                      <span>24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center gap-3 text-white font-medium">
                      <CheckCircle size={20} className="text-emerald-400" />
                      <span>Instant Data Entry</span>
                    </div>
                    <div className="flex items-center gap-3 text-white font-medium">
                      <CheckCircle size={20} className="text-emerald-400" />
                      <span>Zero Sick Days</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-emerald-500/30 text-center">
                     <div className="text-3xl font-black text-white">One Subscription.</div>
                  </div>
               </div>
             </div>
          </div>
        );

      // ---------------- STEP 5: CLOSING (YOUR TURN) ----------------
      case 5:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 space-y-8 relative z-10">
             <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] animate-bounce-slow">
               <Zap size={48} className="text-black" />
             </div>
             
             <div className="space-y-4 max-w-2xl">
               <h3 className="text-4xl md:text-5xl font-black text-white">
                 This Isn't Future Tech. <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">It's Live Right Now.</span>
               </h3>
               <p className="text-xl text-gray-400 font-light">
                 "If you want this customised for your business — your workflows, your customers, your goals — we can set it up for you."
               </p>
             </div>

             <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
               <button 
                 onClick={onContact} // Updated to use prop
                 className="flex-1 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
               >
                 <MessageCircle size={20} /> Build My Agent
               </button>
               <button 
                 onClick={() => setStep(0)}
                 className="flex-1 py-4 border border-gray-700 text-gray-300 font-bold rounded-lg hover:bg-gray-800 transition-all"
               >
                 Replay Tour
               </button>
             </div>
          </div>
        );
        
      default: return null;
    }
  };

  return (
    <div className="w-full h-[650px] bg-black border border-enterprise-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative group">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-enterprise-950/80 backdrop-blur-md border-r border-enterprise-800 p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-4 scrollbar-hide z-20">
        <div className="text-[10px] font-mono text-enterprise-dim mb-2 hidden md:block px-2 uppercase tracking-widest">LIVE_TOUR_SEQUENCE</div>
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm rounded-xl transition-all shrink-0 md:shrink border ${
              step === s.id 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${step === s.id ? 'bg-emerald-400 animate-pulse' : 'bg-gray-700'}`} />
            <span className="font-bold whitespace-nowrap">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-black p-0 relative overflow-hidden flex flex-col">
        {/* Cinematic Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Top Gradient Haze */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 min-h-0 pt-0 flex flex-col">
           <AnimatePresence mode="wait">
             <motion.div 
               key={step}
               initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
               transition={{ duration: 0.4, ease: "circOut" }}
               className="h-full w-full"
             >
               {renderContent()}
             </motion.div>
           </AnimatePresence>
        </div>
        
        {/* Footer Controls */}
        <div className="flex justify-between items-center p-6 border-t border-white/5 bg-black/40 backdrop-blur-md z-20">
           <div className="text-xs text-gray-500 font-mono hidden sm:block">
             SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}
           </div>
           <div className="flex gap-3 w-full sm:w-auto justify-end">
              <button 
                onClick={() => setStep(s => Math.max(0, s - 1))} 
                disabled={step === 0}
                className="px-6 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all text-sm font-bold disabled:opacity-30"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(s => Math.min(5, s + 1))} 
                disabled={step === 5} 
                className={`px-8 py-2 rounded-lg text-black font-black text-sm transition-all flex items-center gap-2 shadow-lg ${
                  step === 5 ? 'opacity-0 pointer-events-none' : 'bg-emerald-500 hover:bg-emerald-400 hover:scale-105'
                }`}
              >
                Next Step <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTour;