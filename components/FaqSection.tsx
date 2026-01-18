
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    id: "1",
    question: "O que é um gerador de QR Code?",
    answer: "É uma ferramenta utilizada para gerar diferentes tipos de QR Codes. Dependendo da sua necessidade, você pode criar QR Codes para abrir um site, visualizar um PDF, ouvir música, ver vídeos do Youtube, armazenar fotos, conectar-se à rede WiFi e muito mais."
  },
  {
    id: "2",
    question: "Os QR Codes são gratuitos?",
    answer: "Todos os QR Codes Estáticos são gratuitos. Isso inclui URL, vCard, Texto, Email, SMS, Twitter, WiFi e Bitcoin. Uma vez criado, você nunca mais irá perdê-lo. Mas não é possível editar nenhum QR Code Estático, assim que antes de imprimi-lo, não esqueça de testá-lo e garantir o código esteja funcionando."
  },
  {
    id: "3",
    question: "Posso usar QR Codes para finalidades comerciais?",
    answer: "Com certeza! Nossa plataforma permite o uso comercial total de todos os códigos gerados."
  },
  {
    id: "4",
    question: "Que tipo de informação pode ser armazenada num QR Code?",
    answer: "Os QR Codes são tão versáteis que são capazes de armazenar uma variedade de informações dependendo de suas necessidades. Por exemplo, eles podem armazenar um URL para que seja mais fácil de abrir uma página web escaneando o código. Também podem armazenar dados de contato, para não precisar digitar manualmente o nome, número de telefone e email a fim de salvá-los no celular."
  },
  {
    id: "5",
    question: "É possível contar os scans dos QR Codes ou ver as estatísticas?",
    answer: "Sim, você pode rastrear onde, quando e o número de scans com a nossa versão PRO. É possível até ver em qual sistema operacional de celular o QR Code está sendo escaneado. Estas são métricas importantes para medir o sucesso da sua campanha."
  },
  {
    id: "6",
    question: "Os QR Code permanecem válidos ou podem expirar?",
    answer: "A não ser que o link seja alterado ou excluído, os QR Codes Estáticos não expiram e permanecem ativos por quanto tempo você quiser. Recomendamos os QR Codes Dinâmicos para que você tenha total controle sobre o conteúdo e possa substituir os links sempre que quiser."
  },
  {
    id: "7",
    question: "Qual a diferença entre um QR Code Estático e Dinâmico?",
    answer: "Depois de criar um QR Code Estático, você não poderá rastrear os scans ou editar o conteúdo. Quanto ao QR Code Dinâmico, a flexibilidade é a que conta! É possível atualizar o conteúdo, adicionar links e corrigir erros, mesmo após a impressão."
  },
  {
    id: "8",
    question: "Como funciona o gerador de QR Codes?",
    answer: "Depois de cadastrar-se, você terá a chance de testar todas as funções gratuitamente por 14 dias. Neste período, será possível criar QR Codes Dinâmicos e Estáticos, adicionar cores, logotipos, molduras, salvar o design do QR Code como modelo, editar o URL curto e aproveitar outras incríveis funções."
  }
];

const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("1");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Perguntas Frequentes</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Tire suas dúvidas sobre o funcionamento do gerador de QR Codes e as diferenças entre os tipos de códigos.</p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-slate-200 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="text-lg font-bold text-slate-800 pr-8">{item.question}</span>
              <ChevronDown 
                className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${openId === item.id ? 'rotate-180 text-indigo-600' : ''}`} 
                size={20} 
              />
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${openId === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
