import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Brain, PenTool, Users, 
  GitBranch, Terminal, Cpu, Layout
} from 'lucide-react';

const SKILLS_DATA = [
  {
    id: 'fullstack',
    title: 'Full Stack Engineering',
    role: 'System Architect',
    icon: <Layout size={28} />,
    color: 'text-blue-400',
    borderColor: 'border-blue-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/5',
    description: "Building resilient, end-to-end applications that scale. I bridge the gap between reactive frontends and complex backend logic.",
    tools: ['React & Next.js', 'Node.js / Express', 'TypeScript', 'PostgreSQL', 'Redis'],
    metrics: [
      { label: 'System Uptime', value: '99.99%' },
      { label: 'Avg Latency', value: '<40ms' }
    ]
  },
  {
    id: 'api',
    title: 'API Integration',
    role: 'Connectivity Specialist',
    icon: <Server size={28} />,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500',
    bgGradient: 'from-emerald-500/20 to-teal-500/5',
    description: "Orchestrating disparate systems into unified workflows. I design idempotent, secure, and documented API layers.",
    tools: ['REST & GraphQL', 'Webhooks', 'Stripe Connect', 'OAuth 2.0', 'Swagger/OpenAPI'],
    metrics: [
      { label: 'Throughput', value: '10k/sec' },
      { label: 'Error Rate', value: '<0.1%' }
    ]
  },
  {
    id: 'model',
    title: 'Model Engineering',
    role: 'AI Engineer',
    icon: <Brain size={28} />,
    color: 'text-purple-400',
    borderColor: 'border-purple-500',
    bgGradient: 'from-purple-500/20 to-indigo-500/5',
    description: "Going beyond wrapper calls. I implement RAG pipelines, fine-tune local LLMs, and design agentic memory systems.",
    tools: ['LangChain', 'Vector DBs (Pinecone)', 'Llama 3 / Mistral', 'Python', 'HuggingFace'],
    metrics: [
      { label: 'Context Window', value: '128k' },
      { label: 'Retrieval Acc.', value: 'SOTA' }
    ]
  },
  {
    id: 'design',
    title: 'Graphic Design',
    role: 'Visual Designer',
    icon: <PenTool size={28} />,
    color: 'text-pink-400',
    borderColor: 'border-pink-500',
    bgGradient: 'from-pink-500/20 to-rose-500/5',
    description: "Translating technical power into intuitive, beautiful interfaces. Code is only as good as the user experience it delivers.",
    tools: ['Figma', 'Adobe Creative Suite', 'Framer Motion', 'Tailwind CSS', 'UI Systems'],
    metrics: [
      { label: 'Fidelity', value: 'Pixel Perf' },
      { label: 'UX Score', value: 'A+' }
    ]
  },
  {
    id: 'strategy',
    title: 'Strategic Consultation',
    role: 'Technical Lead',
    icon: <Users size={28} />,
    color: 'text-amber-400',
    borderColor: 'border-amber-500',
    bgGradient: 'from-amber-500/20 to-orange-500/5',
    description: "Aligning AI and engineering initiatives with actual business goals. I prevent scope creep and ensure ROI.",
    tools: ['Tech Roadmaps', 'AI Governance', 'Cost Analysis', 'Team Leadership', 'Agile/Scrum'],
    metrics: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'ROI Growth', value: '3x' }
    ]
  }
];

export interface SkillMatrixHandle {
  setActiveSkill: (id: string) => void;
}

const SkillMatrix = forwardRef<SkillMatrixHandle>((props, ref) => {
  const [activeId, setActiveId] = useState('fullstack');

  useImperativeHandle(ref, () => ({
    setActiveSkill: (id) => {
      const exists = SKILLS_DATA.find(s => s.id === id);
      if (exists) setActiveId(id);
    }
  }));

  const activeSkill = SKILLS_DATA.find(s => s.id === activeId) || SKILLS_DATA[0];

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* 1. Top Control Deck - Horizontal Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {SKILLS_DATA.map((skill) => (
          <button
            key={skill.id}
            onClick={() => setActiveId(skill.id)}
            className={`
              relative p-4 rounded-xl border text-left transition-all duration-300 overflow-hidden group
              ${activeId === skill.id 
                ? `bg-enterprise-900 ${skill.borderColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] scale-105 z-10` 
                : 'bg-enterprise-950/50 border-enterprise-800 hover:border-enterprise-700 hover:bg-enterprise-900'}
            `}
          >
            {/* Active Glow Background */}
            {activeId === skill.id && (
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${skill.bgGradient}`} />
            )}
            
            <div className={`relative z-10 mb-3 transition-colors ${activeId === skill.id ? skill.color : 'text-gray-500 group-hover:text-gray-300'}`}>
              {skill.icon}
            </div>
            <div className={`relative z-10 text-xs font-mono uppercase tracking-wider mb-1 opacity-70 ${activeId === skill.id ? 'text-white' : 'text-gray-500'}`}>
              {skill.role}
            </div>
            <div className={`relative z-10 font-bold text-sm leading-tight ${activeId === skill.id ? 'text-white' : 'text-gray-400'}`}>
              {skill.title}
            </div>
          </button>
        ))}
      </div>

      {/* 2. Detail View - Architectural Blueprint Style */}
      <div className="relative w-full min-h-[400px] bg-black border border-enterprise-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Grid Texture */}
        <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-12 h-full"
          >
            {/* Left: Content Info */}
            <div className="flex-1 space-y-8">
               <div>
                 <motion.div 
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                   className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${activeSkill.borderColor} bg-white/5 ${activeSkill.color} text-xs font-bold uppercase tracking-widest mb-4`}
                 >
                   <Cpu size={12} /> {activeSkill.id}_PROTOCOL_ACTIVE
                 </motion.div>
                 <motion.h3 
                   initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                   className="text-4xl md:text-5xl font-black text-white mb-6"
                 >
                   {activeSkill.title}
                 </motion.h3>
                 <motion.p 
                   initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                   className="text-lg text-gray-400 leading-relaxed max-w-xl"
                 >
                   {activeSkill.description}
                 </motion.p>
               </div>

               {/* Metrics Row */}
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                 className="flex gap-8 border-t border-white/10 pt-8"
               >
                 {activeSkill.metrics.map((m, i) => (
                   <div key={i}>
                     <div className={`text-3xl font-bold ${activeSkill.color} font-mono`}>{m.value}</div>
                     <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{m.label}</div>
                   </div>
                 ))}
               </motion.div>
            </div>

            {/* Right: Technical Visualizer (The "Stack" Data) */}
            <div className="w-full md:w-80 shrink-0">
               <div className="bg-enterprise-900/50 border border-enterprise-800 rounded-2xl p-6 h-full">
                 <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                   <Terminal size={18} className="text-gray-500" />
                   Tech Stack
                 </h4>
                 <div className="space-y-3">
                   {activeSkill.tools.map((tool, i) => (
                     <motion.div 
                       key={tool}
                       initial={{ x: 20, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ delay: 0.3 + (i * 0.1) }}
                       className="flex items-center gap-3 p-3 rounded-lg bg-black border border-enterprise-800 text-gray-300 text-sm font-mono"
                     >
                       <GitBranch size={14} className={activeSkill.color} />
                       {tool}
                     </motion.div>
                   ))}
                 </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default SkillMatrix;