
import React from 'react';
import { FileText, Shield, Scale, AlertTriangle, EyeOff, Clock, Copyright, Mail } from 'lucide-react';

const TermsSection: React.FC = () => {
  const sections = [
    {
      icon: <FileText className="text-indigo-600" size={24} />,
      title: "1. Descrição do Serviço",
      content: "Disponibilizamos uma ferramenta online para geração de QR Codes, permitindo que qualquer visitante crie QR Codes a partir de informações inseridas diretamente na página, sem necessidade de cadastro ou login."
    },
    {
      icon: <Scale className="text-indigo-600" size={24} />,
      title: "2. Uso do Serviço",
      content: "Ao utilizar o site, o usuário compromete-se a: Utilizar o serviço apenas para fins legais; Não gerar QR Codes com conteúdo ilícito, ofensivo, fraudulento ou que viole direitos de terceiros; Não tentar comprometer a segurança ou o funcionamento do site."
    },
    {
      icon: <Shield className="text-indigo-600" size={24} />,
      title: "3. Conteúdo Gerado",
      content: "Todo o conteúdo inserido para geração dos QR Codes é de inteira responsabilidade do usuário. Não analisamos, monitoramos ou validamos o conteúdo gerado nem o conteúdo acessado por meio dos QR Codes."
    },
    {
      icon: <EyeOff className="text-indigo-600" size={24} />,
      title: "4. Ausência de Cadastro",
      content: "O site não exige login, conta ou fornecimento de dados pessoais para utilização do serviço."
    },
    {
      icon: <Clock className="text-indigo-600" size={24} />,
      title: "5. Disponibilidade",
      content: "O serviço é fornecido “como está” e pode ser alterado, suspenso ou descontinuado a qualquer momento, sem aviso prévio."
    },
    {
      icon: <AlertTriangle className="text-indigo-600" size={24} />,
      title: "6. Limitação de Responsabilidade",
      content: "Não nos responsabilizamos por: Danos decorrentes do uso dos QR Codes gerados; Conteúdos acessados por meio dos QR Codes; Interrupções ou falhas técnicas do serviço."
    },
    {
      icon: <Copyright className="text-indigo-600" size={24} />,
      title: "7. Propriedade Intelectual",
      content: "O layout, textos, marca e funcionalidades do site são protegidos por direitos autorais, sendo proibida a reprodução sem autorização."
    },
    {
      icon: <Mail className="text-indigo-600" size={24} />,
      title: "8. Contato",
      content: "E-mail para dúvidas sobre os termos: visaoapps@gmail.com"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-3xl mb-4 shadow-xl">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Termos de Serviço</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Ao acessar o site, você concorda com os presentes Termos de Serviço. Caso não concorde, por favor, não utilize o site.
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

      <div className="mt-16 p-8 bg-indigo-600 rounded-[32px] text-white text-center shadow-2xl shadow-indigo-200">
        <h4 className="text-xl font-black mb-2">Dúvidas sobre os Termos?</h4>
        <p className="text-indigo-100 mb-0">Se você tiver qualquer dúvida sobre como operamos, sinta-se à vontade para revisar nosso FAQ ou entrar em contato através do e-mail visaoapps@gmail.com.</p>
      </div>
    </div>
  );
};

export default TermsSection;
