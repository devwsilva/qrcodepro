
import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, ChevronDown, Download, Palette, Image as ImageIcon, 
  Settings, Grid, LayoutTemplate, X, AlertCircle, 
  Zap, ShieldCheck, Check, ArrowLeft, Smartphone, Monitor, 
  QrCode, Lock, Mail, Phone, AlignLeft, User, MapPin, Music, Wifi, Video, FileText, Share2, MessageCircle, Contact, Upload, Maximize, Move
} from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

import { CONTENT_TYPES, LOGO_OPTIONS, TEMPLATES } from './constants';
import { QRConfig, QRType, Language, LangCode, View, UserData } from './types';
import { mockDb } from './mockDb';
import AboutSection from './components/AboutSection';
import SecurityLayer from './components/SecurityLayer';
import FaqSection from './components/FaqSection';
import TermsSection from './components/TermsSection';
import PrivacySection from './components/PrivacySection';
import CookiesSection from './components/CookiesSection';
import HowToSection from './components/HowToSection';
import ChatBot from './components/ChatBot';

const LANGUAGES: Language[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [lang, setLang] = useState<LangCode>('pt');
  const [activeType, setActiveType] = useState<QRType>('URL');
  const [phoneSubtype, setPhoneSubtype] = useState<'fixo' | 'celular'>('celular');
  const [formData, setFormData] = useState<any>({});
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'logo' | 'templates'>('content');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  
  const [config, setConfig] = useState<QRConfig>({
    content: '',
    type: 'URL',
    bodyShape: 'square',
    eyeFrameShape: 'square',
    eyeBallShape: 'square',
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    isGradient: false,
    gradientColor: '#444444',
    logo: '',
    logoSize: 0.4,
    logoMargin: 5,
    resolution: 1000,
  });
  
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [qrCode] = useState(new QRCodeStyling({
    width: 300,
    height: 300,
    data: "https://swapps.com.br",
    margin: 5,
    qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 5 },
  }));

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentView === 'home' && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
      updateQRCode();
    }
  }, [currentView, config]);

  useEffect(() => {
    let valid = false;
    let errorKey: string | null = null;
    const hasValue = (val: any) => val && val.toString().trim().length > 0;

    switch (activeType) {
      case 'URL':
      case 'MP3':
      case 'VIDEO':
      case 'PDF':
      case 'SOCIAL':
        if (hasValue(formData.url)) {
          if (/^(http|https):\/\/[^ "]+$/.test(formData.url)) valid = true;
          else errorKey = 'invalidUrl';
        }
        break;
      case 'WHATSAPP':
        if (hasValue(formData.phone)) {
          const cleanPhone = formData.phone.replace(/\D/g, '');
          if (cleanPhone.length >= 11 && cleanPhone.length <= 15) valid = true;
          else errorKey = 'invalidWhatsapp';
        }
        break;
      case 'PHONE':
        if (hasValue(formData.phone)) {
          const cleanPhone = formData.phone.replace(/\D/g, '');
          const targetLen = phoneSubtype === 'fixo' ? 10 : 11;
          if (cleanPhone.length === targetLen) valid = true;
          else errorKey = 'invalidPhoneLength';
        }
        break;
      case 'TEXT':
        valid = hasValue(formData.text);
        break;
      case 'EMAIL':
        if (hasValue(formData.email)) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) valid = true;
          else errorKey = 'invalidEmail';
        }
        break;
      case 'SMS':
        valid = hasValue(formData.phone);
        break;
      case 'WIFI':
        valid = hasValue(formData.ssid);
        break;
      case 'LOCATION':
        valid = hasValue(formData.lat) && hasValue(formData.lng);
        break;
      case 'VCARD':
      case 'MECARD':
        valid = hasValue(formData.firstName) || hasValue(formData.lastName);
        break;
      default:
        valid = false;
    }
    
    setIsValid(valid);
    setValidationError(errorKey);
  }, [formData, activeType, phoneSubtype]);

  const updateQRCode = () => {
    let content = '';
    const cleanPhone = (val: string) => (val || '').replace(/\D/g, '');

    switch (activeType) {
      case 'URL': 
      case 'MP3': 
      case 'VIDEO': 
      case 'PDF': 
      case 'SOCIAL': 
        content = formData.url || ''; 
        break;
      case 'WHATSAPP':
        content = `https://wa.me/${cleanPhone(formData.phone)}`;
        break;
      case 'TEXT': 
        content = formData.text || ''; 
        break;
      case 'EMAIL': 
        content = `mailto:${formData.email || ''}`; 
        break;
      case 'PHONE':
        content = `tel:${cleanPhone(formData.phone)}`;
        break;
      case 'SMS':
        const smsBody = formData.subject 
          ? `Assunto: ${formData.subject}\n\n${formData.body || ''}`
          : (formData.body || '');
        content = `SMSTO:${cleanPhone(formData.phone)}:${smsBody}`;
        break;
      case 'WIFI':
        content = `WIFI:T:${formData.encryption || 'WPA'};S:${formData.ssid || ''};P:${formData.password || ''};;`;
        break;
      case 'LOCATION':
        content = `geo:${formData.lat || '0'},${formData.lng || '0'}`;
        break;
      case 'VCARD':
        content = `BEGIN:VCARD\nVERSION:3.0\nN:${formData.lastName || ''};${formData.firstName || ''}\nFN:${formData.firstName || ''} ${formData.lastName || ''}\nTEL;TYPE=CELL:${formData.phone || ''}\nEMAIL:${formData.email || ''}\nEND:VCARD`;
        break;
      case 'MECARD':
        content = `MECARD:N:${formData.lastName || ''},${formData.firstName || ''};TEL:${formData.phone || ''};EMAIL:${formData.email || ''};;`;
        break;
      default: 
        content = "https://swapps.com.br";
    }

    qrCode.update({
      data: content || config.content || "https://swapps.com.br",
      dotsOptions: { 
        color: config.fgColor, 
        type: config.bodyShape as any,
        gradient: config.isGradient ? {
          type: 'linear',
          colorStops: [{ offset: 0, color: config.fgColor }, { offset: 1, color: config.gradientColor || config.fgColor }]
        } : undefined
      },
      backgroundOptions: { color: config.bgColor },
      cornersSquareOptions: { type: config.eyeFrameShape as any, color: config.fgColor },
      cornersDotOptions: { type: config.eyeBallShape as any, color: config.fgColor },
      image: config.logo,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: config.logoSize,
        margin: config.logoMargin
      }
    });
  };

  const applyPhoneMask = (val: string, type: 'fixo' | 'celular') => {
    const digits = val.replace(/\D/g, '');
    const limit = type === 'fixo' ? 10 : 11;
    const sliced = digits.slice(0, limit);
    
    let masked = sliced;
    if (sliced.length > 2) {
      masked = `(${sliced.slice(0, 2)}) ${sliced.slice(2)}`;
    }
    if (type === 'fixo' && sliced.length > 6) {
      masked = `(${sliced.slice(0, 2)}) ${sliced.slice(2, 6)}-${sliced.slice(6)}`;
    } else if (type === 'celular' && sliced.length > 7) {
      masked = `(${sliced.slice(0, 2)}) ${sliced.slice(2, 7)}-${sliced.slice(7)}`;
    }
    return masked;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = applyPhoneMask(e.target.value, phoneSubtype);
    setFormData({ ...formData, phone: masked });
  };

  const handleApplyTemplate = (template: Partial<QRConfig>) => {
    setConfig(prev => ({ ...prev, ...template }));
    if (template.content) {
      setActiveType('URL');
      setFormData({ url: template.content });
      setHasGenerated(true);
    }
    if (!isDesktop) setActiveTab('design');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setConfig(prev => ({ ...prev, logo: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const translations: Record<LangCode, any> = {
    pt: {
      create: "GERAR QRCODE",
      download: "DOWNLOAD",
      back: "Voltar",
      footerDesc: "A ferramenta definitiva para QR Codes profissionais e personalizados.",
      typeLabels: { URL: "URL", WHATSAPP: "WhatsApp", TEXT: "Texto", EMAIL: "E-mail", PHONE: "Telefone", SMS: "SMS", VCARD: "VCard", MECARD: "MeCard", LOCATION: "Localização", MP3: "MP3", WIFI: "Wi-Fi", VIDEO: "Vídeo", PDF: "PDF", SOCIAL: "Social" },
      errors: { invalidUrl: "URL inválida", invalidPhoneLength: "Número incompleto", invalidEmail: "E-mail inválido", invalidWhatsapp: "Formato inválido (ex: 5511999999999)" },
      placeholders: { smsPhone: "Número do Celular", smsSubject: "Assunto (Opcional)", smsBody: "Corpo da Mensagem" },
      tabs: { content: "Conteúdo", design: "Design", logo: "Logotipo", templates: "Modelos" },
      logoControls: { size: "Tamanho do Logo", margin: "Margem interna" },
      gradientError: "Gradientes não são suportados nos formatos EPS e PDF. Use cores sólidas para esses formatos."
    },
    en: {
      create: "GENERATE QRCODE",
      download: "DOWNLOAD",
      back: "Back",
      footerDesc: "The ultimate tool for professional and customizable QR Codes.",
      typeLabels: { URL: "URL", WHATSAPP: "WhatsApp", TEXT: "Text", EMAIL: "Email", PHONE: "Phone", SMS: "SMS", VCARD: "VCard", MECARD: "MeCard", LOCATION: "Location", MP3: "MP3", WIFI: "Wi-Fi", VIDEO: "Video", PDF: "PDF", SOCIAL: "Social" },
      errors: { invalidUrl: "Invalid URL", invalidPhoneLength: "Incomplete number", invalidEmail: "Invalid Email", invalidWhatsapp: "Invalid format (ex: 5511999999999)" },
      placeholders: { smsPhone: "Phone Number", smsSubject: "Subject (Optional)", smsBody: "Message Body" },
      tabs: { content: "Content", design: "Design", logo: "Logo", templates: "Templates" },
      logoControls: { size: "Logo Size", margin: "Inner Margin" },
      gradientError: "Gradients are not supported in EPS and PDF formats. Use solid colors for these formats."
    },
    es: {
      create: "GENERAR QRCODE",
      download: "DESCARGAR",
      back: "Volver",
      footerDesc: "La ferramenta definitiva para códigos QR profissionais y personalizados.",
      typeLabels: { URL: "URL", WHATSAPP: "WhatsApp", TEXT: "Texto", EMAIL: "Email", PHONE: "Teléfono", SMS: "SMS", VCARD: "VCard", MECARD: "MeCard", LOCATION: "Ubicación", MP3: "MP3", WIFI: "Wi-Fi", VIDEO: "Video", PDF: "PDF", SOCIAL: "Social" },
      errors: { invalidUrl: "URL inválida", invalidPhoneLength: "Número incompleto", invalidEmail: "Email inválido", invalidWhatsapp: "Formato inválido (ej: 5511999999999)" },
      placeholders: { smsPhone: "Número de Teléfono", smsSubject: "Asunto (Opcional)", smsBody: "Cuerpo del Mensaje" },
      tabs: { content: "Contenido", design: "Diseño", logo: "Logotipo", templates: "Plantillas" },
      logoControls: { size: "Tamaño del Logo", margin: "Margen interno" },
      gradientError: "Los gradientes no son compatibles con os formatos EPS e PDF. Utilice colores sólidos para estos formatos."
    },
    fr: {
      create: "GÉNÉRER QRCODE",
      download: "TÉLÉCHARGER",
      back: "Retour",
      footerDesc: "L'outil ultime pour des codes QR professionnels et personnalisables.",
      typeLabels: { URL: "URL", WHATSAPP: "WhatsApp", TEXT: "Texte", EMAIL: "E-mail", PHONE: "Téléphone", SMS: "SMS", VCARD: "VCard", MECARD: "MeCard", LOCATION: "Localisation", MP3: "MP3", WIFI: "Wi-Fi", VIDEO: "Vidéo", PDF: "PDF", SOCIAL: "Social" },
      errors: { invalidUrl: "URL invalide", invalidPhoneLength: "Numéro incomplet", invalidEmail: "Email invalide", invalidWhatsapp: "Format invalide (ex: 5511999999999)" },
      placeholders: { smsPhone: "Numéro de Téléphone", smsSubject: "Sujet (Optionnel)", smsBody: "Corps du Message" },
      tabs: { content: "Contenu", design: "Design", logo: "Logo", templates: "Modèles" },
      logoControls: { size: "Taille du Logo", margin: "Marge interne" },
      gradientError: "Les dégradés ne sont pas pris en charge dans les formats EPS et PDF. Utilisez des couleurs unies pour ces foramts."
    }
  };

  const t = translations[lang] || translations['pt'];

  const handleSafeDownload = (ext: string) => {
    if (config.isGradient && (ext === 'pdf' || ext === 'eps')) {
      alert(t.gradientError);
      return;
    }
    qrCode.download({ name: 'qrcode-pro-export', extension: ext as any });
  };

  const renderContentSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
        {CONTENT_TYPES.map((item) => (
          <button 
            key={item.type} 
            onClick={() => { setActiveType(item.type); setHasGenerated(false); }} 
            className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${activeType === item.type ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 text-slate-400'}`}
          >
            {item.icon}
            <span className="text-[9px] font-black mt-2 uppercase truncate w-full text-center">{t.typeLabels[item.labelKey] || item.labelKey}</span>
          </button>
        ))}
      </div>
      
      <div className="space-y-4 pt-4 border-t border-slate-50">
        {(activeType === 'URL' || activeType === 'MP3' || activeType === 'VIDEO' || activeType === 'PDF' || activeType === 'SOCIAL') && (
          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="https://..." value={formData.url || ''} onChange={e => setFormData({ ...formData, url: e.target.value })} />
        )}
        
        {activeType === 'WHATSAPP' && (
          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="Código do país + DDD + Número" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        )}

        {activeType === 'PHONE' && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="phoneSubtype" 
                  checked={phoneSubtype === 'celular'} 
                  onChange={() => { setPhoneSubtype('celular'); setFormData({...formData, phone: applyPhoneMask(formData.phone || '', 'celular')}); }} 
                />
                <span className="text-sm font-bold">Celular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="phoneSubtype" 
                  checked={phoneSubtype === 'fixo'} 
                  onChange={() => { setPhoneSubtype('fixo'); setFormData({...formData, phone: applyPhoneMask(formData.phone || '', 'fixo')}); }} 
                />
                <span className="text-sm font-bold">Telefone Fixo</span>
              </label>
            </div>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono" 
              placeholder={phoneSubtype === 'celular' ? "(XX) XXXXX-XXXX" : "(XX) XXXX-XXXX"}
              value={formData.phone || ''} 
              onChange={handlePhoneChange} 
            />
          </div>
        )}

        {activeType === 'TEXT' && (
          <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none min-h-[120px] focus:ring-2 focus:ring-indigo-500/20" placeholder="Digite seu texto aqui..." value={formData.text || ''} onChange={e => setFormData({ ...formData, text: e.target.value })} />
        )}

        {activeType === 'EMAIL' && (
          <input type="email" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="exemplo@email.com" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        )}

        {activeType === 'SMS' && (
          <div className="space-y-4">
             <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" 
              placeholder={t.placeholders.smsPhone} 
              value={formData.phone || ''} 
              onChange={e => setFormData({ ...formData, phone: e.target.value })} 
             />
             <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" 
              placeholder={t.placeholders.smsSubject} 
              value={formData.subject || ''} 
              onChange={e => setFormData({ ...formData, subject: e.target.value })} 
             />
             <textarea 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none min-h-[100px] focus:ring-2 focus:ring-indigo-500/20" 
              placeholder={t.placeholders.smsBody} 
              value={formData.body || ''} 
              onChange={e => setFormData({ ...formData, body: e.target.value })} 
             />
          </div>
        )}

        {activeType === 'WIFI' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="SSID (Nome da rede)" value={formData.ssid || ''} onChange={e => setFormData({ ...formData, ssid: e.target.value })} />
            <input type="password" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Senha" value={formData.password || ''} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <select className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.encryption || 'WPA'} onChange={e => setFormData({ ...formData, encryption: e.target.value })}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Sem senha</option>
            </select>
          </div>
        )}

        {activeType === 'LOCATION' && (
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Latitude" value={formData.lat || ''} onChange={e => setFormData({ ...formData, lat: e.target.value })} />
            <input type="text" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Longitude" value={formData.lng || ''} onChange={e => setFormData({ ...formData, lng: e.target.value })} />
          </div>
        )}

        {(activeType === 'VCARD' || activeType === 'MECARD') && (
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Nome" value={formData.firstName || ''} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
            <input type="text" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Sobrenome" value={formData.lastName || ''} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
            <input type="text" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Celular" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <input type="email" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="E-mail" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
        )}

        {validationError && <div className="text-[10px] font-bold text-red-500 flex items-center gap-1"><AlertCircle size={14}/> {t.errors[validationError]}</div>}
      </div>
    </div>
  );

  const renderDesignSection = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Formato dos Pontos</label>
          <div className="grid grid-cols-3 gap-2">
            {(['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'] as const).map(s => (
              <button key={s} onClick={() => setConfig({...config, bodyShape: s})} className={`p-2 rounded-xl border text-[10px] font-bold capitalize ${config.bodyShape === s ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100'}`}>{s.replace('-', ' ')}</button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cores</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <span className="block text-[9px] font-bold mb-1">Cor Principal</span>
              <input type="color" value={config.fgColor} onChange={e => setConfig({...config, fgColor: e.target.value})} className="w-full h-12 rounded-xl border-none cursor-pointer" />
            </div>
            <div className="flex-1">
              <span className="block text-[9px] font-bold mb-1">Fundo</span>
              <input type="color" value={config.bgColor} onChange={e => setConfig({...config, bgColor: e.target.value})} className="w-full h-12 rounded-xl border-none cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={config.isGradient} onChange={e => setConfig({...config, isGradient: e.target.checked})} className="rounded text-indigo-600" />
            <span className="text-xs font-bold">Usar Gradiente</span>
            {config.isGradient && <input type="color" value={config.gradientColor} onChange={e => setConfig({...config, gradientColor: e.target.value})} className="h-6 w-12 rounded" />}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogoSection = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escolher Logotipo</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          <button 
            title="Limpar Logotipo"
            onClick={() => setConfig({...config, logo: ''})} 
            className={`p-4 rounded-2xl border flex items-center justify-center transition-all ${!config.logo ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <X size={20} className="text-slate-400" />
          </button>
          
          <button 
            title="Fazer Upload de Logo"
            onClick={() => fileInputRef.current?.click()} 
            className="p-4 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/30 flex flex-col items-center justify-center gap-1 hover:bg-indigo-50 hover:border-indigo-300 transition-all text-indigo-600 group"
          >
            <Upload size={20} className="group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[8px] font-black uppercase tracking-widest">Upload</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              hidden 
              accept="image/png, image/jpeg, image/jpg, image/svg+xml" 
              onChange={handleLogoUpload} 
            />
          </button>

          {LOGO_OPTIONS.map(logo => (
            <button key={logo.id} onClick={() => setConfig({...config, logo: logo.url})} className={`p-2 rounded-2xl border flex items-center justify-center transition-all ${config.logo === logo.url ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}>
              <img src={logo.url} alt={logo.id} className="w-8 h-8 object-contain" />
            </button>
          ))}
        </div>
      </div>

      {config.logo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Maximize size={14} /> {t.logoControls.size}
              </label>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{(config.logoSize * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="0.5" 
              step="0.01" 
              value={config.logoSize} 
              onChange={(e) => setConfig({...config, logoSize: parseFloat(e.target.value)})}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Move size={14} /> {t.logoControls.margin}
              </label>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{config.logoMargin}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="20" 
              step="1" 
              value={config.logoMargin} 
              onChange={(e) => setConfig({...config, logoMargin: parseInt(e.target.value)})}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplatesSection = () => (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-8 gap-x-6">
      {TEMPLATES.map((tmpl, idx) => (
        <div key={idx} className="flex flex-col items-center gap-3">
          <button 
            onClick={() => handleApplyTemplate(tmpl)}
            className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-500 transition-all p-2 bg-white flex items-center justify-center"
          >
            <QrCode 
              className="absolute inset-0 w-full h-full p-2 transition-transform duration-500 group-hover:scale-105" 
              style={{ color: tmpl.fgColor, opacity: 0.15 }}
            />
            {tmpl.logo && (
              <div className="relative z-20 w-8 h-8 flex items-center justify-center">
                <img src={tmpl.logo} alt="logo preview" className="w-full h-full object-contain" />
              </div>
            )}
            <div className="absolute inset-0 bg-indigo-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Aplicar</span>
            </div>
          </button>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{(tmpl as any).label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <SecurityLayer>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">QP</div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight hidden sm:block">QRCODE <span className="text-indigo-600">PRO</span></span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView('faq')}
                className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block px-4"
              >
                FAQ
              </button>
              <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm font-medium">
                <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
                <ChevronDown size={14} className={showLangMenu ? 'rotate-180' : ''} />
              </button>
              {showLangMenu && (
                <div className="absolute right-4 mt-12 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-indigo-50 text-sm flex items-center gap-2">
                      {l.flag} {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
          {currentView === 'home' ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side: Main configuration */}
                <div className="lg:col-span-8 space-y-8">
                  {isDesktop ? (
                    /* Desktop Layout: Stacked Cards */
                    <>
                      <section className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">{t.tabs.content}</h2>
                        </div>
                        <div className="p-8">{renderContentSection()}</div>
                      </section>

                      <section className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">{t.tabs.design}</h2>
                        </div>
                        <div className="p-8">{renderDesignSection()}</div>
                      </section>

                      <section className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">{t.tabs.logo}</h2>
                        </div>
                        <div className="p-8">{renderLogoSection()}</div>
                      </section>

                      <section className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">{t.tabs.templates}</h2>
                        </div>
                        <div className="p-8">{renderTemplatesSection()}</div>
                      </section>
                    </>
                  ) : (
                    /* Mobile Layout: Tabbed Card */
                    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                      <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto no-scrollbar">
                        {(['content', 'design', 'logo', 'templates'] as const).map((tab) => (
                          <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 min-w-[100px] py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            {t.tabs[tab]}
                          </button>
                        ))}
                      </div>

                      <div className="p-6">
                        {activeTab === 'content' && renderContentSection()}
                        {activeTab === 'design' && renderDesignSection()}
                        {activeTab === 'logo' && renderLogoSection()}
                        {activeTab === 'templates' && renderTemplatesSection()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side: Preview (Sticky) */}
                <div className="lg:col-span-4">
                  <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-200 sticky top-24 flex flex-col items-center">
                    <div className="relative mb-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-inner">
                      <div ref={qrRef}></div>
                    </div>
                    
                    <div className="w-full space-y-4">
                      <button 
                        onClick={() => { setHasGenerated(true); updateQRCode(); }} 
                        disabled={!isValid}
                        className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl disabled:opacity-50 hover:bg-indigo-700 transition-all"
                      >
                        {t.create}
                      </button>
                      
                      {isValid && (
                        <div className="grid grid-cols-1 gap-2">
                          <button 
                            onClick={() => handleSafeDownload('png')}
                            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                          >
                            <Download size={16}/> {t.download} (PNG)
                          </button>
                          <button 
                            onClick={() => handleSafeDownload('svg')}
                            className="w-full bg-white text-slate-900 border-2 border-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                          >
                            <Download size={16}/> {t.download} (SVG)
                          </button>
                          
                          <div className="border-t border-slate-100 my-1"></div>
                          
                          <button 
                            onClick={() => handleSafeDownload('pdf')}
                            className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${config.isGradient ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50' : 'bg-white text-indigo-700 border-2 border-indigo-100 hover:bg-indigo-50'}`}
                          >
                            <Download size={16}/> {t.download} (PDF)
                          </button>
                          <button 
                            onClick={() => handleSafeDownload('eps')}
                            className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${config.isGradient ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50' : 'bg-white text-indigo-700 border-2 border-indigo-100 hover:bg-indigo-50'}`}
                          >
                            <Download size={16}/> {t.download} (EPS)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="my-20 border-t border-slate-200"></div>
              <HowToSection lang={lang} />
              <div className="my-20 border-t border-slate-200"></div>
              <AboutSection lang={lang} />
            </>
          ) : currentView === 'faq' ? (
            <div className="space-y-8">
              <button 
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-all bg-indigo-50 px-4 py-2 rounded-xl"
              >
                <ArrowLeft size={16} /> {t.back}
              </button>
              <FaqSection />
            </div>
          ) : currentView === 'terms' ? (
            <div className="space-y-8">
              <button 
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-all bg-indigo-50 px-4 py-2 rounded-xl"
              >
                <ArrowLeft size={16} /> {t.back}
              </button>
              <TermsSection />
            </div>
          ) : currentView === 'privacy' ? (
            <div className="space-y-8">
              <button 
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-all bg-indigo-50 px-4 py-2 rounded-xl"
              >
                <ArrowLeft size={16} /> {t.back}
              </button>
              <PrivacySection />
            </div>
          ) : currentView === 'cookies' ? (
            <div className="space-y-8">
              <button 
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-all bg-indigo-50 px-4 py-2 rounded-xl"
              >
                <ArrowLeft size={16} /> {t.back}
              </button>
              <CookiesSection />
            </div>
          ) : null}
        </main>

        <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-sm">QP</div>
                <span className="font-bold text-slate-900">QRCODE PRO</span>
              </div>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">{t.footerDesc}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-slate-900 mb-2 uppercase tracking-widest">Links Úteis</span>
              <button onClick={() => setCurrentView('faq')} className="text-xs text-slate-500 hover:text-indigo-600 text-left transition-colors">FAQ - Perguntas Frequentes</button>
              <button onClick={() => setCurrentView('terms')} className="text-xs text-slate-500 hover:text-indigo-600 text-left transition-colors">Termos de Serviço</button>
              <button onClick={() => setCurrentView('privacy')} className="text-xs text-slate-500 hover:text-indigo-600 text-left transition-colors">Política de Privacidade</button>
              <button onClick={() => setCurrentView('cookies')} className="text-xs text-slate-500 hover:text-indigo-600 text-left transition-colors">Política de Cookies</button>
              <button onClick={() => setCurrentView('home')} className="text-xs text-slate-500 hover:text-indigo-600 text-left transition-colors">Gerador de QR Code</button>
            </div>
            <div className="flex justify-end items-end">
               <span className="text-[10px] font-bold text-slate-400 uppercase">© 2024 QRCODE PRO. All rights reserved.</span>
            </div>
          </div>
        </footer>
        <ChatBot />
      </div>
    </SecurityLayer>
  );
};

export default App;
