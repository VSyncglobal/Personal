import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageSquare } from 'lucide-react';

export interface ContactData {
  name: string;
  email: string;
  intent: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactData) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSubmit }) => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Pass raw data to parent
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      intent: formData.get('intent') as string,
    });
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

             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-enterprise-accent/10 rounded border border-enterprise-accent/20">
                 <Calendar className="text-enterprise-accent" size={20} />
               </div>
               <h2 className="text-2xl font-bold text-white">Contact & Scheduling</h2>
             </div>
             <p className="text-enterprise-dim mb-8">
               Enter your details to draft a request. You can confirm or adjust the message in the chat agent before sending.
             </p>
             
             <form onSubmit={handleSubmit} className="space-y-5">
               <div>
                 <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Your Name</label>
                 <input name="name" required type="text" className="w-full bg-enterprise-950 border border-enterprise-800 rounded p-3 text-white focus:border-enterprise-accent focus:outline-none transition-colors" placeholder="Enter your name" />
               </div>
               <div>
                 <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Work Email</label>
                 <input name="email" required type="email" className="w-full bg-enterprise-950 border border-enterprise-800 rounded p-3 text-white focus:border-enterprise-accent focus:outline-none transition-colors" placeholder="name@company.com" />
               </div>
               <div>
                 <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Topic</label>
                 <select name="intent" className="w-full bg-enterprise-950 border border-enterprise-800 rounded p-3 text-white focus:border-enterprise-accent focus:outline-none transition-colors">
                   <option value="Request Live Demo">Request Live Demo</option>
                   <option value="Enterprise Consulting">Enterprise Consulting</option>
                   <option value="General Inquiry">General Inquiry</option>
                 </select>
               </div>
               
               <button 
                 type="submit" 
                 className="w-full py-4 bg-enterprise-accent text-black font-bold rounded hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group"
               >
                 <MessageSquare size={18} />
                 Draft Message for Agent
               </button>
             </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};