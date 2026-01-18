
import React from 'react';
import { LangCode } from '../types';
import { ShieldCheck, Zap, Globe, Download, Layout, Briefcase } from 'lucide-react';

interface AboutProps {
  lang: LangCode;
}

const AboutSection: React.FC<AboutProps> = ({ lang }) => {
  // Fixed missing language properties for en, es, fr
  const t: Record<LangCode, any> = {
    pt: {
      label: "EXCELÊNCIA PROFISSIONAL",
      title: "Por que milhões escolhem o QRCODE PRO?",
      desc: "Nossa tecnologia garante QR Codes rápidos, seguros e otimizados para qualquer superfície física ou digital.",
      features: [
        { icon: <Briefcase />, h: "Uso Comercial Total", p: "Gere códigos para seu negócio sem taxas ocultas. Licença comercial vitalícia inclusa." },
        { icon: <Download />, h: "Formatos Vetoriais", p: "Exporte em SVG, EPS e PDF. Imprima do cartão de visitas ao outdoor sem perder nitidez." },
        { icon: <ShieldCheck />, h: "Segurança de Dados", p: "Não coletamos seus links. Seus dados são processados localmente com criptografia." },
        { icon: <Zap />, h: "Performance Extrema", p: "Gerador ultra-rápido otimizado para navegadores modernos e dispositivos móveis." }
      ]
    },
    en: {
      label: "PROFESSIONAL EXCELLENCE",
      title: "Why Millions Choose QRCODE PRO?",
      desc: "Our technology ensures fast, secure, and optimized QR Codes for any physical or digital surface.",
      features: [
        { icon: <Briefcase />, h: "Full Commercial Use", p: "Generate codes for your business without hidden fees. Lifetime commercial license included." },
        { icon: <Download />, h: "Vector Formats", p: "Export in SVG, EPS, and PDF. Print from business cards to billboards without losing sharpness." },
        { icon: <ShieldCheck />, h: "Data Security", p: "We don't collect your links. Your data is processed locally with encryption." },
        { icon: <Zap />, h: "Extreme Performance", p: "Ultra-fast generator optimized for modern browsers and mobile devices." }
      ]
    },
    es: {
      label: "EXCELENCIA PROFESIONAL",
      title: "¿Por qué millones eligen QRCODE PRO?",
      desc: "Nuestra tecnología garantiza Códigos QR rápidos, seguros y optimizados para cualquier superficie física o digital.",
      features: [
        { icon: <Briefcase />, h: "Uso Comercial Total", p: "Genera códigos para tu negocio sin tarifas ocultas. Licencia comercial de por vida incluida." },
        { icon: <Download />, h: "Formatos Vectoriales", p: "Exporta en SVG, EPS y PDF. Imprime desde tarjetas de visita hasta vallas publicitarias sin perder nitidez." },
        { icon: <ShieldCheck />, h: "Seguridad de Datos", p: "No recopilamos tus enlaces. Tus datos se procesan localmente con cifrado." },
        { icon: <Zap />, h: "Rendimiento Extremo", p: "Generador ultrarrápido optimizado para navegadores modernos y dispositivos móveis." }
      ]
    },
    fr: {
      label: "EXCELLENCE PROFESSIONNELLE",
      title: "Pourquoi des millions choisissent QRCODE PRO ?",
      desc: "Notre technologie garantit des codes QR rapides, sécurisés et optimisés pour toute surface physique ou numérique.",
      features: [
        { icon: <Briefcase />, h: "Utilisation Commerciale Totale", p: "Générez des codes pour votre entreprise sans frais cachés. Licence commerciale à vie incluse." },
        { icon: <Download />, h: "Formats Vectoriels", p: "Exportez en SVG, EPS et PDF. Imprimez des cartes de visite aux panneaux publicitaires sans perte de netteté." },
        { icon: <ShieldCheck />, h: "Sécurité des Données", p: "Nous ne collectons pas vos liens. Vos données sont traitées localement avec cryptage." },
        { icon: <Zap />, h: "Performance Extrême", p: "Générateur ultra-rapide optimisé pour les navigateurs modernes et les appareils mobiles." }
      ]
    }
  };

  const current = t[lang] || t['pt'];

  return (
    <section className="max-w-7xl mx-auto space-y-16 py-12">
      <div className="text-center space-y-4">
        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{current.label}</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 max-w-3xl mx-auto tracking-tight">{current.title}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">{current.desc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {current.features.map((feat: any, i: number) => (
          <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all duration-300">
             <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(feat.icon, { size: 24 })}
             </div>
             <h3 className="text-xl font-black text-slate-800 mb-3">{feat.h}</h3>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">{feat.p}</p>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="pt-12 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
         <div className="text-xl font-black tracking-tighter">TRUSTED CORE</div>
         <div className="text-xl font-black tracking-tighter">SECURE CLOUD</div>
         <div className="text-xl font-black tracking-tighter">VECTOR FIRST</div>
         <div className="text-xl font-black tracking-tighter">GLOBAL REACH</div>
      </div>
    </section>
  );
};

export default AboutSection;