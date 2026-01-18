
import React from 'react';
import { LangCode } from '../types';
import { MousePointer2, Palette, Download } from 'lucide-react';

interface HowToProps {
  lang: LangCode;
}

// Fix: Completed the component by adding a return statement and handling translations to resolve the 'void' return type error for React.FC.
const HowToSection: React.FC<HowToProps> = ({ lang }) => {
  const translations: Record<LangCode, any> = {
    pt: {
      label: "PASSO A PASSO",
      title: "Como gerar seu QR Code",
      desc: "Três etapas simples para criar códigos QR personalizados e profissionais.",
      steps: [
        {
          number: "1",
          icon: <MousePointer2 />,
          title: "Escolha o tipo",
          content: "Selecione o tipo de QR Code acima (URL, WhatsApp, etc). Insira as informações que devem aparecer ao escanear o código."
        },
        {
          number: "2",
          icon: <Palette />,
          title: "Personalize",
          content: "Escolha cores, formatos e adicione seu logotipo para tornar o QR Code único e profissional."
        },
        {
          number: "3",
          icon: <Download />,
          title: "Baixe o arquivo",
          content: "Baixe seu código em formatos de alta qualidade como PNG, SVG, PDF ou EPS, pronto para uso."
        }
      ]
    },
    en: {
      label: "STEP BY STEP",
      title: "How to Generate Your QR Code",
      desc: "Three simple steps to create personalized and professional QR codes.",
      steps: [
        {
          number: "1",
          icon: <MousePointer2 />,
          title: "Choose the Type",
          content: "Select the QR Code type above (URL, WhatsApp, etc). Enter the information you want to encode."
        },
        {
          number: "2",
          icon: <Palette />,
          title: "Customize",
          content: "Choose colors, shapes, and add your logo to make the QR Code unique and professional."
        },
        {
          number: "3",
          icon: <Download />,
          title: "Download",
          content: "Download your code in high-quality formats like PNG, SVG, PDF, or EPS, ready to use."
        }
      ]
    },
    es: {
      label: "PASO A PASO",
      title: "Cómo generar su código QR",
      desc: "Tres sencillos pasos para crear códigos QR personalizados y profesionales.",
      steps: [
        {
          number: "1",
          icon: <MousePointer2 />,
          title: "Elija el tipo",
          content: "Seleccione el tipo de código QR arriba (URL, WhatsApp, etc.). Ingrese la información que desea codificar."
        },
        {
          number: "2",
          icon: <Palette />,
          title: "Personalizar",
          content: "Elija colores, formas y agregue su logotipo para que el código QR sea único y profesional."
        },
        {
          number: "3",
          icon: <Download />,
          title: "Descargar",
          content: "Descargue su código en formatos de alta calidad como PNG, SVG, PDF o EPS, listo para usar."
        }
      ]
    },
    fr: {
      label: "ÉTAPE PAR ÉTAPE",
      title: "Comment générer votre code QR",
      desc: "Trois étapes simples pour créer des codes QR personnalisés et professionnels.",
      steps: [
        {
          number: "1",
          icon: <MousePointer2 />,
          title: "Choisissez le type",
          content: "Sélectionnez le type de code QR ci-dessus (URL, WhatsApp, etc.). Entrez les informations que vous souhaitez encoder."
        },
        {
          number: "2",
          icon: <Palette />,
          title: "Personnaliser",
          content: "Choisissez des couleurs, des formes et ajoutez votre logo pour rendre le code QR unique et professionnel."
        },
        {
          number: "3",
          icon: <Download />,
          title: "Télécharger",
          content: "Téléchargez votre code dans des formats de haute qualité comme PNG, SVG, PDF ou EPS, prêt à l'emploi."
        }
      ]
    }
  };

  const current = translations[lang] || translations['pt'];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 border-t border-slate-200">
      <div className="text-center mb-12 space-y-4">
        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{current.label}</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{current.title}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">{current.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {current.steps.map((step: any, i: number) => (
          <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all duration-300 flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(step.icon, { size: 28 })}
             </div>
             <h3 className="text-xl font-black text-slate-800 mb-3">{step.number}. {step.title}</h3>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToSection;
