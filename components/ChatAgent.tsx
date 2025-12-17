import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
}

export interface ChatAgentHandle {
  handleExternalMessage: (text: string) => void;
  setDraft: (text: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatAgent = forwardRef<ChatAgentHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: 'Identity verified. I am Samwel\'s autonomous assistant. How can I help you navigate his capabilities?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Persist session ID
  const sessionIdRef = useRef(`session_${Math.random().toString(36).substring(7)}`);

  // Expose methods to parent components via ref
  useImperativeHandle(ref, () => ({
    handleExternalMessage: (text: string) => {
      setIsOpen(true);
      sendMessage(text);
    },
    setDraft: (text: string) => {
      setIsOpen(true);
      setInput(text);
      // Auto-resize textarea after setting draft
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
          textareaRef.current.focus();
        }
      }, 100);
    },
    setIsOpen
  }));

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Auto-resize textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto'; // Reset height
    setIsTyping(true);

    try {
      // --- SECURE ENV VARIABLE ---
      const webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK;
      
      if (!webhookUrl) {
        throw new Error("Webhook URL not configured in .env file");
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chatInput: text,
          sessionId: sessionIdRef.current 
        })
      });

      const data = await response.json();
      const botText = data.output || data.text || "Systems nominal, but I received an empty response.";

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botText }]);
    } catch (error) {
      console.error("Agent Error:", error);
      const errorMessage = error instanceof Error && error.message.includes(".env") 
        ? "System Config Error: Webhook URL missing."
        : "Error connecting to Agent mainframe.";
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendClick = () => {
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-enterprise-950 border border-enterprise-accent/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-enterprise-900 border-b border-enterprise-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                   <div className="w-2 h-2 bg-enterprise-accent rounded-full animate-ping absolute inset-0" />
                   <div className="w-2 h-2 bg-enterprise-accent rounded-full relative" />
                </div>
                <span className="font-mono text-sm font-bold text-white">Support_Agent_Active</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${msg.type === 'bot' ? 'bg-enterprise-accent text-black' : 'bg-enterprise-800 text-gray-300'}`}>
                    {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-3 rounded-lg text-sm max-w-[85%] whitespace-pre-wrap ${
                    msg.type === 'bot' 
                      ? 'bg-enterprise-900 border border-enterprise-800 text-gray-200 rounded-tl-none' 
                      : 'bg-enterprise-accent/10 border border-enterprise-accent/20 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded bg-enterprise-accent text-black flex items-center justify-center shrink-0"><Loader2 size={16} className="animate-spin" /></div>
                   <div className="bg-enterprise-900 border border-enterprise-800 p-3 rounded-lg rounded-tl-none text-gray-400 text-xs">
                     Processing Query...
                   </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-enterprise-900 border-t border-enterprise-800 flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message the agent..."
                rows={1}
                className="flex-1 bg-enterprise-950 border border-enterprise-800 rounded px-3 py-3 text-sm text-white focus:outline-none focus:border-enterprise-accent resize-none min-h-[44px] max-h-[120px]"
              />
              <button onClick={handleSendClick} className="p-3 bg-enterprise-accent text-black rounded hover:bg-emerald-400 transition-colors h-[44px] flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 px-6 py-4 bg-enterprise-accent text-black font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] z-50 flex items-center gap-3 hover:bg-emerald-400 transition-all"
      >
        <MessageSquare size={20} />
        {isOpen ? 'Close Uplink' : 'Chat with Agent'}
      </motion.button>
    </>
  );
});

export default ChatAgent;