import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Server, Brain, PenTool, Users, 
  Database, Globe, Layers, Cpu, Zap, 
  GitBranch, Terminal, Shield, Workflow, Eye
} from 'lucide-react';

// Define the content for each capability
const CAPABILITIES = [
  {
    id: 'fullstack',
    title: 'Full Stack Dev',
    icon: <Code size={24} />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    description: "End-to-end application architecture combining reactive frontends with robust server-side logic.",
    tags: ['React & Next.js', 'Node.js / Express', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    stats: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Latency', value: '<50ms' }
    ]
  },
  {
    id: 'api',
    title: 'API Integration',
    icon: <Server size={24} />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    description: "Connecting disparate systems into unified workflows using REST, GraphQL, and Webhooks.",
    tags: ['Stripe & Payments', 'CRM Sync', 'Custom Webhooks', 'GraphQL Mesh', 'Rate Limiting'],
    stats: [
      { label: 'Requests', value: '10k/sec' },
      { label: 'Reliability', value: 'High' }
    ]
  },
  {
    id: 'model',
    title: 'Model Engineering',
    icon: <Brain size={24} />,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    description: "Designing, fine-tuning, and deploying AI models that solve specific business reasoning tasks.",
    tags: ['RAG Systems', 'Fine-tuning (LoRA)', 'Prompt Engineering', 'Vector Search', 'Local LLMs'],
    stats: [
      { label: 'Context', value: '128k' },
      { label: 'Accuracy', value: 'SOTA' }
    ]
  },
  {
    id: 'design',
    title: 'Graphic Design',
    icon: <PenTool size={24} />,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    description: "Crafting intuitive, high-fidelity user interfaces and brand identities that drive engagement.",
    tags: ['Figma & Prototyping', 'Adobe CC Suite', 'Motion Graphics', 'Design Systems', 'UX Research'],
    stats: [
      { label: 'Fidelity', value: 'Pixel Perf' },
      { label: 'UX Score', value: 'A+' }
    ]
  },
  {
    id: 'strategy',
    title: 'Strategic Consultation',
    icon: <Users size={24} />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    description: "Aligning technical implementation with business goals to ensure ROI and scalability.",
    tags: ['Digital Transformation', 'AI Governance', 'Tech Roadmap', 'Team Leadership', 'Cost Analysis'],
    stats: [
      { label: 'ROI Growth', value: '3x' },
      { label: 'Efficiency', value: '+40%' }
    ]
  }
];

export interface CapabilitiesExplorerHandle {
  setActiveTab: (id: string) => void;
}

const CapabilitiesExplorer = forwardRef<CapabilitiesExplorerHandle>((props, ref) => {
  const [activeId, setActiveId] = useState('fullstack');

  // Allow parent component to control the active tab
  useImperativeHandle(ref, () => ({
    setActiveTab: (id: string) => {
      const exists = CAPABILITIES.find(c => c.id === id);
      if (exists) setActiveId(id);
    }
  }));

  const activeCap = CAPABILITIES.find(c => c.id === activeId) || CAPABILITIES[0];

  return (
    <div className="w-full bg-enterprise-900/50 border border-enterprise-800 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[500px] shadow-2xl">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-72 bg-enterprise-950/80 border-r border-enterprise-800 flex flex-row md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide">
        {CAPABILITIES.map((cap) => (
          <button
            key={cap.id}
            onClick={() => setActiveId(cap.id)}
            className={`
              flex-1 md:flex-none flex items-center gap-4 p-5 text-left transition-all border-b md:border-b-0 md:border-l-4
              hover:bg-white/5 whitespace-nowrap md:whitespace-normal
              ${activeId === cap.id 
                ? `bg-white/5 border-${cap.color.split('-')[1]}-500 text-white` 
                : 'border-transparent text-gray-500 hover:text-gray-300'}
            `}
          >
            <div className={`${activeId === cap.id ? cap.color : 'text-gray-600'}`}>
              {cap.icon}
            </div>
            <span className="font-bold text-sm md:text-base">{cap.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCap.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${activeCap.bg} ${activeCap.border} border ${activeCap.color}`}>
                {activeCap.icon}
              </div>
              <div>
                 <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">System Capability</div>
                 <h3 className="text-3xl md:text-4xl font-bold text-white">{activeCap.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
              {activeCap.description}
            </p>

            {/* Tags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {activeCap.tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-enterprise-950 border border-enterprise-800 text-gray-300">
                  <GitBranch size={16} className={activeCap.color} />
                  <span className="text-sm font-medium">{tag}</span>
                </div>
              ))}
            </div>

            {/* Metrics Footer */}
            <div className="flex gap-8 pt-8 border-t border-enterprise-800">
              {activeCap.stats.map((stat, i) => (
                <div key={i}>
                  <div className={`text-2xl font-bold ${activeCap.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default CapabilitiesExplorer;