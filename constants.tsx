import React from 'react';
import { 
  Globe, AlignLeft, Mail, Phone, MessageSquare, User, 
  MapPin, Music, Wifi, Video, FileText, Share2, MessageCircle,
  Contact, Info
} from 'lucide-react';
import { QRType, QRConfig } from './types';

export const CONTENT_TYPES: { type: QRType; icon: React.ReactNode; labelKey: string }[] = [
  { type: 'URL', icon: <Globe size={18} />, labelKey: 'URL' },
  { type: 'WHATSAPP', icon: <MessageCircle size={18} />, labelKey: 'WHATSAPP' },
  { type: 'TEXT', icon: <AlignLeft size={18} />, labelKey: 'TEXT' },
  { type: 'EMAIL', icon: <Mail size={18} />, labelKey: 'EMAIL' },
  { type: 'PHONE', icon: <Phone size={18} />, labelKey: 'PHONE' },
  { type: 'SMS', icon: <MessageSquare size={18} />, labelKey: 'SMS' },
  { type: 'VCARD', icon: <Contact size={18} />, labelKey: 'VCARD' },
  { type: 'MECARD', icon: <User size={18} />, labelKey: 'MECARD' },
  { type: 'LOCATION', icon: <MapPin size={18} />, labelKey: 'LOCATION' },
  { type: 'MP3', icon: <Music size={18} />, labelKey: 'MP3' },
  { type: 'WIFI', icon: <Wifi size={18} />, labelKey: 'WIFI' },
  { type: 'VIDEO', icon: <Video size={18} />, labelKey: 'VIDEO' },
  { type: 'PDF', icon: <FileText size={18} />, labelKey: 'PDF' },
  { type: 'SOCIAL', icon: <Share2 size={18} />, labelKey: 'SOCIAL' },
];

export const LOGO_OPTIONS = [
  { id: 'youtube', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png' },
  { id: 'facebook', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg' },
  { id: 'instagram', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
  { id: 'whatsapp', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
  { id: 'twitter', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg' },
];

export interface TemplateConfig extends Partial<QRConfig> {
  label: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    label: 'Classic',
    content: 'https://swapps.com.br',
    bodyShape: 'square',
    eyeFrameShape: 'square',
    eyeBallShape: 'square',
    fgColor: '#000000',
    isGradient: false
  },
  {
    label: 'WhatsApp',
    content: 'https://whatsapp.com',
    bodyShape: 'classy',
    eyeFrameShape: 'rounded',
    eyeBallShape: 'rounded',
    fgColor: '#25D366',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    isGradient: false
  },
  {
    label: 'Facebook',
    content: 'https://facebook.com',
    bodyShape: 'square',
    eyeFrameShape: 'square',
    eyeBallShape: 'square',
    fgColor: '#1877F2',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
    isGradient: false
  },
  {
    label: 'Twitter',
    content: 'https://x.com',
    bodyShape: 'rounded',
    eyeFrameShape: 'rounded',
    eyeBallShape: 'square',
    fgColor: '#000000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg',
    isGradient: false
  },
  {
    label: 'Youtube',
    content: 'https://youtube.com',
    bodyShape: 'dots',
    eyeFrameShape: 'rounded',
    eyeBallShape: 'rounded',
    fgColor: '#FF0000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
    isGradient: false
  },
  {
    label: 'Rain',
    content: 'https://swapps.com.br',
    bodyShape: 'dots',
    eyeFrameShape: 'rounded',
    eyeBallShape: 'rounded',
    fgColor: '#0EA5E9',
    isGradient: false
  },
  {
    label: 'Jungle',
    content: 'https://swapps.com.br',
    bodyShape: 'classy',
    eyeFrameShape: 'extra-rounded',
    eyeBallShape: 'rounded',
    fgColor: '#15803D',
    isGradient: false
  },
  {
    label: 'Mosaic',
    content: 'https://swapps.com.br',
    bodyShape: 'square',
    eyeFrameShape: 'square',
    eyeBallShape: 'square',
    fgColor: '#4338CA',
    isGradient: true,
    gradientColor: '#B45309'
  },
  {
    label: 'Dot',
    content: 'https://swapps.com.br',
    bodyShape: 'dots',
    eyeFrameShape: 'square',
    eyeBallShape: 'rounded',
    fgColor: '#0284C7',
    isGradient: false
  },
  {
    label: 'Ninja',
    content: 'https://swapps.com.br',
    bodyShape: 'classy-rounded',
    eyeFrameShape: 'extra-rounded',
    eyeBallShape: 'rounded',
    fgColor: '#9D174D',
    isGradient: false
  },
];