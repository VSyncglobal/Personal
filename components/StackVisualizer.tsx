import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Layout, Globe, Lock, Cpu, Layers, GitBranch } from 'lucide-react';

const STACK_LAYERS = [
  {
    id: 'frontend',
    title: 'Frontend Experience',
    icon: <Layout className="w-6 h-6" />,
    color: 'from-blue-400 to-cyan-300',
    tech: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'State Management']
  },
  {
    id: 'backend',
    title: 'Server & API Logic',
    icon: <Server className="w-6 h-6" />,
    color: 'from-emerald-400 to-green-300',
    tech: ['Node.js / Express', 'Python / FastAPI', 'REST & GraphQL', 'Auth & Security', 'Microservices']
  },
  {
    id: 'database',
    title: 'Data & Infrastructure',
    icon: <Database className="w-6 h-6" />,
    color: 'from-purple-400 to-indigo-300',
    tech: ['PostgreSQL / SQL', 'Vector DBs', 'Redis Caching', 'Docker / CI/CD', 'Cloud (AWS/GCP)']
  }
];

const StackVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
      {/* Interactive Stack Visualization */}
      <div className="relative space-y-4">
        {/* Connecting Line */}
        <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 opacity-20 hidden md:block" />

        {STACK_LAYERS.map((layer, index) => (
          <motion.div
            key={layer.id}
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`
              relative p-6 rounded-2xl border transition-all cursor-pointer group
              ${activeLayer === layer.id 
                ? 'bg-enterprise-900 border-white/20 scale-105 shadow-2xl z-10' 
                : 'bg-black/40 border-enterprise-800 hover:border-enterprise-accent/30'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-16 h-16 rounded-xl flex items-center justify-center shrink-0
                bg-gradient-to-br ${layer.color} text-black shadow-lg
              `}>
                {layer.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {layer.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {layer.tech.slice(0, 3).join(' • ')}...
                </p>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <Globe className="text-gray-400" size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail View */}
      <div className="h-full min-h-[400px] bg-enterprise-950 border border-enterprise-800 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        {activeLayer ? (
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 bg-white/10 text-white border border-white/20`}>
              {STACK_LAYERS.find(l => l.id === activeLayer)?.title.toUpperCase()}
            </div>
            
            <h4 className="text-3xl font-bold text-white mb-6">Technical Competencies</h4>
            <div className="grid grid-cols-1 gap-3">
              {STACK_LAYERS.find(l => l.id === activeLayer)?.tech.map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 text-gray-300"
                >
                  <GitBranch size={16} className="text-enterprise-accent" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center relative z-10 opacity-50">
            <Layers size={64} className="mx-auto mb-4 text-gray-600" />
            <p className="text-xl font-mono text-gray-400">Hover over a stack layer<br/>to inspect technologies.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackVisualizer;