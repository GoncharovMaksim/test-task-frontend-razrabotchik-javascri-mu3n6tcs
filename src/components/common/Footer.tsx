import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Code2 } from 'lucide-react';

export interface FooterContactsProps {
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  year: number;
  stack: string;
  vacanciesUrl?: string;
}

export interface FooterProps {
  contacts: FooterContactsProps;
}

export const Footer: React.FC<FooterProps> = ({ contacts }) => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-900">
          {/* Company details */}
          <div>
            <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              {contacts.company}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-3">
              Тестовое задание на позицию Frontend разработчик (JavaScript/TypeScript + React) Middle.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 rounded px-2.5 py-1">
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>{contacts.stack}</span>
            </div>
          </div>

          {/* Contact Details via props */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              Контакты HR & Офис
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-zinc-400">
                <span className="text-zinc-400 font-medium">Контакт:</span>
                <span className="text-zinc-300">{contacts.contactPerson}</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <a href={`mailto:${contacts.email}`} className="text-zinc-300 hover:text-white transition-colors">
                  {contacts.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-400">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <a href={`tel:${contacts.phone}`} className="text-zinc-300 hover:text-white transition-colors">
                  {contacts.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{contacts.address}</span>
              </li>
            </ul>
          </div>

          {/* Navigation & verification */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              О тестовом задании
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>Архитектурный паттерн: Feature-Component Hierarchy</li>
              <li>Стейт-менеджер: Redux Toolkit + React useState</li>
              <li>Типизация: Strict TypeScript (no implicit any)</li>
              <li>Форма профиля: 20 полей со сложными зависимостями</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
          <p>© {contacts.year} {contacts.company}. Все права защищены.</p>
          <p className="font-mono text-zinc-400">Production-ready build: SPA + Vercel Deployment</p>
        </div>
      </div>
    </footer>
  );
};
