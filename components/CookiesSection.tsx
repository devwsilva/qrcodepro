
import React from 'react';
import { Cookie, Settings, ShieldCheck, Activity, EyeOff, MousePointerClick, RefreshCw, Mail } from 'lucide-react';

const CookiesSection: React.FC = () => {
  const sections = [
    {
      icon: <Cookie className="text-indigo-600" size={24} />,
      title: "1. O que são Cookies",
      content: "Cookies são pequenos arquivos armazenados no navegador do usuário para permitir funcionalidades básicas e análises de uso."
    },
    {
      icon: <Activity className="text-indigo-600" size={24} />,
      title: "2. Cookies Utilizados",
      content: "O site pode utilizar: Cookies essenciais (necessários para o funcionamento do site) e Cookies de desempenho (para análise estatística anônima, como páginas mais acessadas)."
    },
    {
      icon: <EyeOff className="text-indigo-600" size={24} />,
      title: "Privacidade Garantida",
      content: "Não utilizamos cookies para identificação pessoal ou publicidade direcionada. Nosso foco é puramente na funcionalidade técnica."
    },
    {
      icon: <MousePointerClick className="text-indigo-600" size={24} />,
      title: "3. Finalidade",
      content: "Os cookies são usados para garantir o funcionamento correto do site, entender como os usuários utilizam a plataforma e melhorar a experiência geral de navegação."
    },
    {
      icon: <Settings className="text-indigo-600" size={24} />,
      title: "4. Gerenciamento de Cookies",
      content: "O usuário pode desativar os cookies nas configurações do navegador. Isso pode impactar algumas funcionalidades do site, mas a geração básica de QR Codes continuará disponível."
    },
    {
      icon: <RefreshCw className="text-indigo-600" size={24} />,
      title: "5. Alterações",
      content: "Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou por motivos operacionais."
    },
    {
      icon: <Mail className="text-indigo-600" size={24} />,
      title: "6. Contato",
      content: "E-mail para dúvidas sobre cookies: visaoapps@gmail.com"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl mb-4 shadow-xl border border-amber-100">
          <Cookie size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Política de Cookies</h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Última atualização: 27/12/2025</p>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Utilizamos cookies para melhorar a experiência do usuário e garantir a melhor performance da nossa ferramenta.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-200 hover:border-indigo-100 transition-all shadow-sm">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-indigo-50 rounded-2xl flex-shrink-0">
                {section.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{section.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-amber-600 rounded-[32px] text-white text-center shadow-2xl shadow-amber-200">
        <h4 className="text-xl font-black mb-2">Transparência Total</h4>
        <p className="text-amber-50 mb-0">Você tem o controle total sobre quais dados seu navegador armazena. Respeitamos suas escolhas.</p>
      </div>
    </div>
  );
};

export default CookiesSection;
