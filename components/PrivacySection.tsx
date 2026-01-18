import React from 'react';
import { Shield, Database, QrCode, Info, Share2, Lock, UserCheck, RefreshCw, Mail } from 'lucide-react';

const PrivacySection: React.FC = () => {
  const sections = [
    {
      icon: <Database className="text-indigo-600" size={24} />,
      title: "1. Coleta de Dados Pessoais",
      content: "O site não solicita cadastro, login ou informações pessoais identificáveis dos usuários. Podemos coletar apenas dados técnicos e anônimos, como: Endereço IP; Tipo de navegador; Dispositivo utilizado; Dados de acesso (data, hora e páginas visitadas)."
    },
    {
      icon: <QrCode className="text-indigo-600" size={24} />,
      title: "2. Conteúdo dos QR Codes",
      content: "O conteúdo inserido para gerar QR Codes: Não é associado a dados pessoais; Pode ou não ser armazenado temporariamente apenas para funcionamento do serviço; Não é utilizado para fins comerciais."
    },
    {
      icon: <Info className="text-indigo-600" size={24} />,
      title: "3. Uso das Informações",
      content: "Os dados coletados são utilizados exclusivamente para: Funcionamento do site; Melhoria da performance; Segurança e prevenção de abusos."
    },
    {
      icon: <Share2 className="text-indigo-600" size={24} />,
      title: "4. Compartilhamento de Dados",
      content: "Não vendemos, alugamos ou compartilhamos dados com terceiros, exceto quando exigido por lei."
    },
    {
      icon: <Lock className="text-indigo-600" size={24} />,
      title: "5. Segurança",
      content: "Adotamos medidas técnicas para proteger as informações contra acessos não autorizados."
    },
    {
      icon: <UserCheck className="text-indigo-600" size={24} />,
      title: "6. Direitos do Usuário",
      content: "Mesmo sem cadastro, o usuário pode entrar em contato para esclarecer dúvidas relacionadas à privacidade."
    },
    {
      icon: <RefreshCw className="text-indigo-600" size={24} />,
      title: "7. Alterações",
      content: "Esta Política de Privacidade pode ser atualizada a qualquer momento."
    },
    {
      icon: <Mail className="text-indigo-600" size={24} />,
      title: "8. Contato",
      content: "E-mail para privacidade: visaoapps@gmail.com"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-3xl mb-4 shadow-xl">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Política de Privacidade</h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Última atualização: 27/12/2025</p>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Respeitamos sua privacidade e nos comprometemos com a transparência no uso de informações.
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

      <div className="mt-16 p-8 bg-slate-900 rounded-[32px] text-white text-center shadow-2xl">
        <h4 className="text-xl font-black mb-2">Segurança em Primeiro Lugar</h4>
        <p className="text-slate-400 mb-0">Nossa ferramenta foi desenhada para ser privada por padrão, processando o máximo de informações diretamente no seu navegador.</p>
      </div>
    </div>
  );
};

export default PrivacySection;