import { MasterSpecChapter } from '../types';
import { CHAPTERS_1_TO_15 } from './chaptersDomain1';
import { CHAPTERS_16_TO_30 } from './chaptersDomain2';
import { CHAPTERS_31_TO_45 } from './chaptersDomain3';
import { CHAPTERS_46_TO_60 } from './chaptersDomain4';

export const ALL_MASTER_SPEC_CHAPTERS: MasterSpecChapter[] = [
  ...CHAPTERS_1_TO_15,
  ...CHAPTERS_16_TO_30,
  ...CHAPTERS_31_TO_45,
  ...CHAPTERS_46_TO_60
];

export const CHAPTER_DOMAINS = [
  { id: 'ALL', nameFa: 'همه فصل‌ها (۶۰ فصل)', nameEn: 'All Chapters (60)' },
  { id: 'Foundation & Scope', nameFa: 'مبانی و دامنه شمول (فصل ۱-۶)', nameEn: 'Foundation & Scope' },
  { id: 'Enterprise & Domain Architecture', nameFa: 'معماری سازمان و دامنه (فصل ۷-۱۰)', nameEn: 'Enterprise Architecture' },
  { id: 'Core Domain Modeling', nameFa: 'مدل‌سازی دامنه‌های پایه (فصل ۱۱-۱۵)', nameEn: 'Core Domain Modeling' },
  { id: 'Integration & Graph Architecture', nameFa: 'معماری یکپارچه‌سازی و گراف (فصل ۱۶-۲۰)', nameEn: 'Integration & Graph' },
  { id: 'Simulation & Optimization', nameFa: 'شبیه‌سازی و بهینه‌سازی (فصل ۲۱-۲۵)', nameEn: 'Simulation & Optimization' },
  { id: 'Executive Governance & AI Layer', nameFa: 'حاکمیت مدیران و هوش مصنوعی (فصل ۲۶-۳۰)', nameEn: 'Executive AI & Governance' },
  { id: 'Operating Context & Tech Stack', nameFa: 'بافت عملیاتی و پشته فناوری (فصل ۳۱-۴۰)', nameEn: 'Operating Context & Tech' },
  { id: 'Security & Operations', nameFa: 'امنیت و بهره‌برداری (فصل ۴۱-۴۵)', nameEn: 'Security & Operations' },
  { id: 'Quality & Governance', nameFa: 'کیفیت و حاکمیت پروژه (فصل ۴۶-۴۹)', nameEn: 'Quality & Testing' },
  { id: 'Project Management & Execution', nameFa: 'مدیریت پروژه و اجرا (فصل ۵۰-۵۲, ۵۷-۵۹)', nameEn: 'Execution & Roadmap' },
  { id: 'Architecture Governance', nameFa: 'حاکمیت معماری و ارزیابی نهایی (فصل ۵۳-۵۶, ۶۰)', nameEn: 'Architecture Governance' }
];

export function getChapterByNumber(chapterNumber: number): MasterSpecChapter | undefined {
  return ALL_MASTER_SPEC_CHAPTERS.find(c => c.chapterNumber === chapterNumber);
}

export function searchChapters(query: string, domainFilter?: string): MasterSpecChapter[] {
  const q = query.trim().toLowerCase();
  return ALL_MASTER_SPEC_CHAPTERS.filter(chapter => {
    const matchesDomain = !domainFilter || domainFilter === 'ALL' || chapter.domain === domainFilter;
    if (!matchesDomain) return false;
    if (!q) return true;
    return (
      chapter.chapterNumber.toString().includes(q) ||
      chapter.titleFa.toLowerCase().includes(q) ||
      chapter.titleEn.toLowerCase().includes(q) ||
      chapter.summaryFa.toLowerCase().includes(q) ||
      chapter.summaryEn.toLowerCase().includes(q) ||
      chapter.domainFa.toLowerCase().includes(q) ||
      chapter.keyDirectives.some(d => d.toLowerCase().includes(q))
    );
  });
}
