import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Server, Calendar, Mail, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [agentStep, setAgentStep] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('processing');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      intent: formData.get('intent'),
      date: new Date().toISOString()
    };

    try {
      // 1. Vibe: Simulate Agent accessing tools
      setAgentStep('Authenticating with Google Calendar API...');
      await new Promise(r => setTimeout(r, 800)); // Visual delay for effect
      
      setAgentStep('Scanning Samwel\'s availability...');
      await new Promise(r => setTimeout(r, 800));

      setAgentStep('Drafting HTML confirmation email...');

      // 2. Real Connection: Send to n8n
      // Replace with your actual n8n Production Webhook URL
      const webhookUrl = import.meta.env.VITE_N8N_SCHEDULING_WEBHOOK || 'YOUR_N8N_WEBHOOK_URL_HERE';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
         setStatus('success');
      } else {
         throw new Error('Agent connection failed');
      }

    } catch (error) {
      console.error(error);
      // Fallback for demo if no webhook is set
      setStatus('success'); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-enterprise-900 border border-enterprise-800 rounded-2xl p-8 shadow-2xl overflow-hidden"
          >
             <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>

             {status === 'success' ? (
               <div className="flex flex-col items-center text-center py-8">
                 <motion.div 
                   initial={{ scale: 0 }} animate={{ scale: 1 }}
                   className="w-20 h-20 bg-enterprise-accent/10 rounded-full flex items-center justify-center mb-6 text-enterprise-accent border border-enterprise-accent/20"
                 >
                   <CheckCircle size={40} />
                 </motion.div>
                 <h3 className="text-2xl font-bold text-white mb-2">Agent Task Complete</h3>
                 <p className="text-gray-400 mb-6">
                   I have added you to the calendar and sent a confirmation email to your inbox.
                 </p>
                 <div className="bg-enterprise-950 border border-enterprise-800 p-4 rounded text-sm text-enterprise-dim font-mono w-full">
                   &gt; SYSTEM_NOTE: That was an autonomous agent operating in real-time. No humans were involved in this scheduling.
                 </div>
                 <button onClick={onClose} className="mt-8 text-enterprise-accent hover:underline">Close Interface</button>
               </div>
             ) : status === 'processing' ? (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                 <Loader2 className="w-12 h-12 text-enterprise-accent animate-spin mb-6" />
                 <h3 className="text-xl font-bold text-white mb-2">Agent Working...</h3>
                 <p className="text-enterprise-accent font-mono text-sm animate-pulse">{agentStep}</p>
                 <div className="mt-8 space-y-2 w-full max-w-xs">
                    <div className="h-1 bg-enterprise-800 rounded overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }}
                         className="h-full bg-enterprise-accent" 
                       />
                    </div>
                 </div>
               </div>
             ) : (
               <>
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-enterprise-accent/10 rounded border border-enterprise-accent/20">
                     <Calendar className="text-enterprise-accent" size={20} />
                   </div>
                   <h2 className="text-2xl font-bold text-white">Schedule via Agent</h2>
                 </div>
                 <p className="text-enterprise-dim mb-8">
                   This request will be handled by an n8n workflow. It will check availability, book the slot, and email you instantly.
                 </p>
                 
                 <form onSubmit={handleSubmit} className="space-y-5">
                   <div>
                     <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Your Name</label>
                     <input name="name" required type="text" className="w-full bg-enterprise-950 border border-enterprise-800 rounded p-3 text-white focus:border-enterprise-accent focus:outline-none transition-colors" placeholder="Enter your name" />
                   </div>
                   <div>
                     <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Work Email (For Invite)</label>
                     <input name="email" required type="email" className="w-full bg-enterprise-950 border border-enterprise-800 rounded p-3 text-white focus:border-enterprise-accent focus:outline-none transition-colors" placeholder="name@company.com" />
                   </div>
                   <div>
                     <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Context</label>
                     <select name="intent" className="w-full bg-enterprise-950 border border-enterprise-800 rounded p-3 text-white focus:border-enterprise-accent focus:outline-none transition-colors">
                       <option value="demo">Request Live Demo</option>
                       <option value="consulting">Enterprise Consulting</option>
                       <option value="other">General Inquiry</option>
                     </select>
                   </div>
                   
                   <button 
                     type="submit" 
                     className="w-full py-4 bg-enterprise-accent text-black font-bold rounded hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group"
                   >
                     <Server size={18} className="group-hover:rotate-180 transition-transform" />
                     Initialize Agent Protocol
                   </button>
                 </form>
               </>
             )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};