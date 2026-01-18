
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou o assistente virtual do QRCODE PRO. Como posso te ajudar com seus QR Codes hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Você é o Assistente Especialista do QRCODE PRO. 
          Seu objetivo é ajudar usuários a criarem QR Codes profissionais.
          Informações importantes que você conhece:
          1. Formatos de exportação: PNG (imagem comum), SVG (vetorial para web/design), PDF (documento), EPS (vetorial para gráficas).
          2. Tipos de QR Code: URL, WhatsApp, E-mail, VCard (contatos), Wi-Fi, Localização, etc.
          3. Diferença Estático vs Dinâmico: Estáticos não mudam o link. Dinâmicos (na versão Pro) permitem editar o destino.
          4. O app permite personalizar cores, formas dos pontos e adicionar logotipos.
          Seja sempre cordial, profissional e conciso nas respostas. Se não souber algo técnico do sistema, peça para o usuário contatar visaoapps@gmail.com.`,
        }
      });

      // Format history for the chat
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const result = await chat.sendMessageStream({ message: userMessage });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of result) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = fullResponse;
          return newMsgs;
        });
      }

    } catch (error) {
      console.error("Erro no ChatBot:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um problema técnico. Pode tentar novamente em instantes?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-5 bg-indigo-600 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">QRCODE PRO Helper</h3>
                <span className="text-[10px] text-indigo-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online agora
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text || (isLoading && i === messages.length - 1 ? <Loader2 size={16} className="animate-spin" /> : '')}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="Pergunte sobre QR Codes..."
                className="w-full py-3 px-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-indigo-600 text-white'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;