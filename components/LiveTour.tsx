import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Database, MessageSquare, ArrowRight, Play, CheckCircle, AlertCircle, Lock, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// ... (Keep existing mocked DATA_METRICS and STEPS constants here) ...
const DATA_METRICS = [
  { time: '10:00', leads: 120 },
  { time: '10:15', leads: 230 },
  { time: '10:30', leads: 450 },
  { time: '10:45', leads: 510 },
  { time: '11:00', leads: 680 },
  { time: '11:15', leads: 800 },
];

const STEPS = [
  { id: 0, title: "Introduction", label: "Start Tour" },
  { id: 1, title: "System Map", label: "Overview" },
  { id: 2, title: "Customer Ops", label: "Customer AI" },
  { id: 3, title: "Data Intel", label: "Data Pipeline" },
  { id: 4, title: "Automation", label: "Workflow" },
  { id: 5, title: "Governance", label: "Controls" },
  { id: 6, title: "Impact", label: "Results" },
  { id: 7, title: "Apply", label: "Next Steps" },
];

const LiveTour: React.FC = () => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  // New state for Governance interaction
  const [governanceAction, setGovernanceAction] = useState<'pending' | 'approved' | 'rejected'>('pending');

  // Simulated log generation
  useEffect(() => {
    if (step === 3 || step === 4) {
      const interval = setInterval(() => {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const newLog = `[${timestamp}] INFO: Processing batch ID #${Math.floor(Math.random() * 9000) + 1000} | Latency: ${Math.floor(Math.random() * 40)}ms`;
        setLogs(prev => [newLog, ...prev].slice(0, 5));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Reset governance state when entering that step
  useEffect(() => {
    if (step === 5) setGovernanceAction('pending');
  }, [step]);

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const renderContent = () => {
    switch (step) {
      // ... (Keep Cases 0, 1, 2, 3, 4 the same as original) ...
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-enterprise-accent/10 flex items-center justify-center mb-4 border border-enterprise-accent/30 animate-pulse">
              <Play className="w-10 h-10 text-enterprise-accent" />
            </div>
            <h3 className="text-3xl font-bold text-white">Live Enterprise AI Agent Tour</h3>
            <p className="text-enterprise-dim max-w-lg">
              Experience a real-time walkthrough of governed AI agents operating inside a controlled enterprise automation environment.
            </p>
            <button onClick={nextStep} className="px-8 py-3 bg-enterprise-accent text-black font-semibold rounded hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/20">
              Initialize System Tour
            </button>
          </div>
        );
      case 1:
          // Paste original Case 1 code here
           return (
          <div className="h-full flex flex-col justify-center">
            <h3 className="text-xl font-mono text-enterprise-accent mb-8 border-b border-enterprise-800 pb-2">SYSTEM_ARCHITECTURE_MAP_V1.4</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-enterprise-800 bg-enterprise-900 rounded flex flex-col items-center text-center opacity-50 animate-pulse">
                <Database className="w-12 h-12 mb-4 text-blue-400" />
                <h4 className="font-bold mb-2">Data Ingestion</h4>
                <p className="text-xs text-gray-500">APIs, Webhooks, Bulk Files</p>
              </div>
              <div className="p-6 border-2 border-enterprise-accent bg-enterprise-900/50 rounded flex flex-col items-center text-center scale-105 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Activity className="w-16 h-16 mb-4 text-enterprise-accent" />
                <h4 className="font-bold text-white mb-2">AI Core Logic</h4>
                <p className="text-xs text-enterprise-accent">Decision Engine</p>
              </div>
              <div className="p-6 border border-enterprise-800 bg-enterprise-900 rounded flex flex-col items-center text-center opacity-50">
                <ShieldCheck className="w-12 h-12 mb-4 text-purple-400" />
                <h4 className="font-bold mb-2">Human Governance</h4>
                <p className="text-xs text-gray-500">Approval & Audit</p>
              </div>
            </div>
          </div>
        );
      case 2:
        // Paste original Case 2 code here
         return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-enterprise-800 pb-4">
               <h3 className="font-bold text-white flex items-center gap-2"><MessageSquare className="w-5 h-5 text-enterprise-accent"/> Agent: Customer Support</h3>
               <span className="text-xs font-mono text-enterprise-accent bg-enterprise-accent/10 px-2 py-1 rounded">STATUS: ACTIVE</span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto mb-4 p-4 bg-enterprise-950 rounded border border-enterprise-800 font-mono text-sm">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center shrink-0">U</div>
                <div className="bg-enterprise-800 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-gray-300">
                  Where is my order #ORD-8921? It was supposed to be here yesterday.
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded bg-enterprise-accent flex items-center justify-center shrink-0 text-black font-bold">AI</div>
                <div className="bg-enterprise-accent/10 border border-enterprise-accent/20 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-white">
                  <div className="text-xs text-enterprise-accent mb-1 opacity-70">[Thinking: Query Order DB... Found. Status: Delayed in Transit. Sentiment: Negative.]</div>
                  I've located order #ORD-8921. It is currently delayed at the distribution hub. I can process an expedited shipping request or issue a 10% refund for the delay.
                </div>
              </div>
            </div>
             <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-enterprise-900 p-2 rounded border border-enterprise-800">
                <div className="text-xs text-gray-500 uppercase">Response Time</div>
                <div className="font-mono text-enterprise-accent">0.4s</div>
              </div>
              <div className="bg-enterprise-900 p-2 rounded border border-enterprise-800">
                <div className="text-xs text-gray-500 uppercase">Confidence</div>
                <div className="font-mono text-enterprise-accent">98.2%</div>
              </div>
              <div className="bg-enterprise-900 p-2 rounded border border-enterprise-800">
                <div className="text-xs text-gray-500 uppercase">Action</div>
                <div className="font-mono text-yellow-500">Proposed</div>
              </div>
            </div>
          </div>
        );
      case 3:
        // Paste original Case 3 code here
         return (
          <div className="h-full flex flex-col">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-blue-400"/> Module: Data Intelligence</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
              <div className="lg:col-span-2 bg-enterprise-900 border border-enterprise-800 rounded p-4 flex flex-col">
                <h4 className="text-xs font-mono text-gray-400 mb-4">REAL-TIME LEAD ENRICHMENT VOLUME</h4>
                <div className="flex-1 min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA_METRICS}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#525252" fontSize={12} tickLine={false} />
                      <YAxis stroke="#525252" fontSize={12} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#fff' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="leads" stroke="#10b981" fillOpacity={1} fill="url(#colorLeads)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-enterprise-950 border border-enterprise-800 rounded p-4 font-mono text-xs overflow-hidden flex flex-col">
                <div className="text-gray-500 border-b border-enterprise-800 pb-2 mb-2">SYSTEM_LOGS</div>
                <div className="flex-1 overflow-hidden relative">
                   {logs.map((log, i) => (
                     <div key={i} className="mb-2 text-green-400 truncate animate-fade-in">
                       {log}
                     </div>
                   ))}
                   <div className="absolute inset-0 bg-gradient-to-t from-enterprise-950 to-transparent pointer-events-none h-10 top-[80%]"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
         // Paste original Case 4
          return (
           <div className="h-full flex flex-col items-center justify-center">
             <div className="w-full max-w-2xl relative">
                <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-enterprise-800 z-0"></div>
                
                {[
                  { title: "Lead Ingestion", status: "completed", time: "00:00.10" },
                  { title: "Enrichment (Clearbit/Apollo)", status: "completed", time: "00:00.45" },
                  { title: "CRM Update (Salesforce)", status: "active", time: "Processing..." },
                  { title: "Sales Notification (Slack)", status: "pending", time: "--" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="relative z-10 flex items-center gap-4 mb-6"
                  >
                    <div className={`w-20 text-right text-xs font-mono ${item.status === 'completed' ? 'text-enterprise-dim' : 'text-enterprise-accent'}`}>
                      {item.time}
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      item.status === 'completed' ? 'bg-enterprise-accent border-enterprise-accent text-black' :
                      item.status === 'active' ? 'bg-black border-enterprise-accent text-enterprise-accent animate-pulse' :
                      'bg-enterprise-900 border-enterprise-800 text-gray-600'
                    }`}>
                      {item.status === 'completed' && <CheckCircle size={14} />}
                      {item.status === 'active' && <div className="w-2 h-2 bg-enterprise-accent rounded-full" />}
                    </div>
                    <div className={`p-4 rounded border flex-1 ${
                      item.status === 'active' ? 'bg-enterprise-800/50 border-enterprise-accent text-white' : 
                      'bg-enterprise-900 border-enterprise-800 text-gray-400'
                    }`}>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
             </div>
           </div>
        );

      case 5: // Governance - UPDATED TO BE INTERACTIVE
        return (
          <div className="h-full flex flex-col justify-center items-center">
            <Lock className={`w-16 h-16 mb-6 transition-colors ${governanceAction === 'approved' ? 'text-green-500' : governanceAction === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`} />
            <h3 className="text-2xl font-bold text-white mb-2">Human-in-the-Loop Governance</h3>
            
            <AnimatePresence mode="wait">
              {governanceAction === 'pending' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md bg-enterprise-900 border border-yellow-500/30 rounded-lg p-6 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-yellow-400 border border-yellow-500/50 px-2 py-0.5 rounded animate-pulse">ACTION REQUIRED</span>
                    <span className="text-xs text-gray-500">ID: #ACT-9921</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">Execute Bulk Refund &gt; $5,000?</h4>
                  <p className="text-sm text-gray-400 mb-6">Agent identified 45 users impacted by outage. Total value: $5,420.00.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setGovernanceAction('rejected')} className="flex-1 py-3 bg-red-900/50 hover:bg-red-800 border border-red-800 text-white text-sm font-semibold rounded transition-colors">
                      Reject
                    </button>
                    <button onClick={() => setGovernanceAction('approved')} className="flex-1 py-3 bg-enterprise-accent hover:bg-emerald-400 text-black text-sm font-semibold rounded transition-colors">
                      Approve Execution
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-full max-w-md p-8 rounded-lg border text-center ${
                    governanceAction === 'approved' ? 'bg-green-950/30 border-green-800' : 'bg-red-950/30 border-red-800'
                  }`}
                >
                  {governanceAction === 'approved' ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-white mb-2">Action Approved</h4>
                      <p className="text-gray-400 text-sm">Transaction #ACT-9921 has been queued for execution. Audit log updated.</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-white mb-2">Action Rejected</h4>
                      <p className="text-gray-400 text-sm">Transaction #ACT-9921 halted. Agent logic will be flagged for review.</p>
                    </>
                  )}
                  <button onClick={() => setGovernanceAction('pending')} className="mt-6 text-sm text-gray-500 hover:text-white flex items-center justify-center gap-2 mx-auto">
                    <RefreshCw size={14}/> Reset Simulation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 6:
      case 7:
         // Keep the same as before
         return (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h3 className="text-3xl font-bold text-white">Simulation Complete</h3>
                <p className="text-gray-400">Ready to build this for your organization?</p>
             </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[600px] bg-black border border-enterprise-800 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Sidebar - Keep exactly as before */}
      <div className="w-full md:w-64 bg-enterprise-950 border-r border-enterprise-800 p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0">
        <div className="text-xs font-mono text-gray-500 mb-4 hidden md:block px-2">TOUR_SEQUENCE</div>
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setStep(idx)}
            className={`flex items-center gap-3 px-3 py-3 w-full text-left text-sm rounded transition-all shrink-0 md:shrink ${
              step === idx 
                ? 'bg-enterprise-800 text-enterprise-accent border-l-2 border-enterprise-accent' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-enterprise-900'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${step === idx ? 'bg-enterprise-accent animate-pulse' : 'bg-gray-700'}`} />
            <span className="font-mono">{idx + 1}. {s.label}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 bg-gradient-to-br from-enterprise-900 to-black p-6 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 h-full w-full">
           <AnimatePresence mode="wait">
             <motion.div 
               key={step}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="h-full"
             >
               {renderContent()}
             </motion.div>
           </AnimatePresence>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2">
           <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="p-2 rounded bg-enterprise-800 text-white disabled:opacity-30 hover:bg-enterprise-700">← Prev</button>
           <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1} className="p-2 rounded bg-enterprise-accent text-black font-bold disabled:opacity-30 hover:bg-emerald-400">Next →</button>
        </div>
      </div>
    </div>
  );
};

export default LiveTour;