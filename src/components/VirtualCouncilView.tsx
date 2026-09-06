import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Bot,
  User,
  Shield,
  Radio
} from 'lucide-react';
import { 
  Language, 
  DecisionPackage, 
  CouncilMember 
} from '../types';
import { askVirtualCouncil, CouncilQueryResponse } from '../services/geminiService';

interface VirtualCouncilViewProps {
  lang: Language;
  decisionPackage: DecisionPackage;
  onNavigateTab: (tab: string) => void;
}

interface ChatMessage {
  sender: 'USER' | 'COUNCIL';
  speaker?: string;
  speakerRole?: string;
  text: string;
  groundedFacts?: string[];
  suggestedFollowUp?: string;
  timestamp: string;
}

export const VirtualCouncilView: React.FC<VirtualCouncilViewProps> = ({
  lang,
  decisionPackage,
  onNavigateTab
}) => {
  const isFa = lang === 'fa';
  const council = decisionPackage.councilDeliberation;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'COUNCIL',
      speaker: isFa ? 'دکتر تقی‌پور' : 'Dr. Taghipour',
      speakerRole: isFa ? 'رئیس شورا و مدیر ارشد اجرایی' : 'Council Chairman & CEO',
      text: isFa
        ? 'جلسه شورای اجرایی مجازی مپنا پارس جهت ارزیابی پیامدهای توقف ۲۰ روزه ماشین بورینگ پاما تشکیل شده است. کلیه معاونین عملیات، مالی، مهندسی، بازرگانی و وکیل مدافع شیطان نظرات خود را ثبت نموده‌اند. هرگونه سوال تکمیلی درباره دلایل تصمیم، ریسک‌های جاده‌ای، یا محاسبات نقدینگی را می‌توانید مطرح فرمایید.'
        : 'The Virtual Executive Council of MAPNA Pars has convened to evaluate the 20-day PAMA Boring CNC outage. All chiefs (COO, CFO, Chief Engineer, Supply Chain, Devil\'s Advocate) have registered their positions. Feel free to interrogate the Council on any aspect of this decision.',
      groundedFacts: [
        'پروژه هدف: ژنراتور ۱۶۰ مگاوات جهرم / بوئین زهرا',
        'ماشین مبدا: بورینگ پاما WC-MCH-BORING01',
        'حکم شورا: CONDITIONAL GO (برون‌سپاری مشروط)'
      ],
      timestamp: '10:00'
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [loadingQuery, setLoadingQuery] = useState<boolean>(false);

  const presetQuestions = isFa ? [
    'چرا برون‌سپاری به ماشین‌سازی اراک بهتر از تعمیر داخلی اسپیندل در کارخانه است؟',
    'ریسک آسیب‌دیدگی قطعه در حمل جاده‌ای بوژی ۸۰ تنی چگونه مدیریت می‌شود؟',
    'اثر این تصمیم بر صورت‌وضعیت مالی ۴۲ میلیارد ریالی خردادماه چیست؟',
    'آیا قطعی برق تابستانه در شهرک صنعتی اراک این پروژه را تهدید نمی‌کند؟'
  ] : [
    'Why is subcontracting to Machine Sazi Arak superior to in-house spindle overhaul?',
    'How is the 80-ton heavy road haulage transit risk mitigated?',
    'What is the impact on our 42 Billion IRR June billing milestone?',
    'Will seasonal summer grid curtailment in Arak disrupt this turnaround?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loadingQuery) return;

    const userMsg: ChatMessage = {
      sender: 'USER',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoadingQuery(true);

    try {
      const response: CouncilQueryResponse = await askVirtualCouncil(textToSend, decisionPackage, lang);

      const councilMsg: ChatMessage = {
        sender: 'COUNCIL',
        speaker: response.speaker,
        speakerRole: response.speakerRole,
        text: response.response,
        groundedFacts: response.groundedFacts,
        suggestedFollowUp: response.suggestedFollowUp,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, councilMsg]);
    } catch {
      // Handled in geminiService fallback
    } finally {
      setLoadingQuery(false);
    }
  };

  const getStanceBadge = (stance: CouncilMember['stance']) => {
    switch (stance) {
      case 'APPROVE':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>APPROVE</span>
          </span>
        );
      case 'CONDITIONAL':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>CONDITIONAL</span>
          </span>
        );
      case 'CAUTION':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>CAUTION</span>
          </span>
        );
      case 'OBJECT':
        return (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-red-900 text-red-100 border border-red-500/60 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-red-300" />
            <span>OBJECT</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Overview - War Room Status */}
      <div className="bg-[#0a0f1a]/95 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'شورای چندعامله اجرایی و اتاق جنگ سازمانی' : 'Multi-Agent Executive War Room'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-mono font-black text-white tracking-wide">
            {isFa ? 'شورای مجازی مدیران مپنا پارس (Virtual Executive Council)' : 'MAPNA Pars Virtual Executive Council'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans max-w-4xl">
            {isFa 
              ? 'مجموعه ۸ عضو تخصصی شورای اجرایی مپنا پارس (مدیرعامل، مالی، مهندسی و کیفیت، تولید و عملیات، سرمایه انسانی، زنجیره تأمین، فناوری اطلاعات و معماری داده، و مدیریت تعهدات و سبد پروژه‌ها) که تصمیم بهینه را نقادی و اعتبارسنجی می‌کنند.'
              : 'The 8-member Executive Council (CEO, CFO, CTO/QA, COO, CHRO, CSCO, CDO, and Commitment Director) subjecting simulation results to rigorous cross-functional challenge.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('decision')}
          className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white flex items-center gap-2 transition self-start md:self-auto cursor-pointer shadow-lg border border-emerald-400/40 radar-glow-emerald"
        >
          <Shield className="w-4 h-4" />
          <span>{isFa ? 'احضار بسته تصمیم هیئت مدیره' : 'Open Decision Package'}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>

      {/* Grid of 8 Council Members' Interactive Holographic Seats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {council.map((member) => (
          <div 
            key={member.id}
            className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col justify-between space-y-3.5 text-xs hover:border-cyan-500/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg ${member.avatarColor} text-white flex items-center justify-center font-bold font-mono text-xs shadow-md border border-white/20`}>
                    {member.id.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{isFa ? member.name : member.nameEn}</h3>
                    <span className="text-[11px] text-cyan-400 font-mono block mt-0.5">{isFa ? member.role : member.roleEn}</span>
                  </div>
                </div>
                {getStanceBadge(member.stance)}
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mt-3 font-sans">
                "{isFa ? member.comment : member.commentEn}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] bg-[#070d18] p-3 rounded-xl border border-slate-800/80">
              <span className="text-amber-400 font-mono font-bold block mb-1">
                {isFa ? 'پرسش کلیدی و دغدغه اصلی:' : 'Key Challenge:'}
              </span>
              <p className="text-slate-300 leading-relaxed font-sans">
                {isFa ? member.keyQuestion : member.keyQuestionEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Council Deliberation Chamber (Chat / Consultation) */}
      <div className="bg-[#0a0f1a]/95 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="font-mono font-bold text-base text-slate-100 tracking-wide">
              {isFa ? 'اتاق مشاوره و استعلام مستقیم از اعضای شورا' : 'Interactive Council Consultation Chamber'}
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-[#0c1628] px-2.5 py-1 rounded border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{isFa ? 'موتور تحلیلی استنتاجی متصل به داده‌های کارخانه' : 'Grounded on Factory Knowledge'}</span>
          </span>
        </div>

        {/* Preset Tactical Questions Chips */}
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-mono font-bold block uppercase tracking-wider">
            {isFa ? 'پرسش‌های پیشنهادی هیئت مدیره:' : 'Suggested Executive Queries:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#0c1628] text-slate-300 border border-slate-800 hover:border-cyan-500/50 hover:bg-[#12203a] hover:text-cyan-200 transition text-right cursor-pointer font-sans"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Tactical Chat Thread */}
        <div className="bg-[#070c16] rounded-xl border border-slate-800 p-4 sm:p-5 max-h-[460px] overflow-y-auto space-y-4">
          {chatMessages.map((msg, idx) => {
            const isUser = msg.sender === 'USER';
            return (
              <div 
                key={idx}
                className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 font-bold text-xs mt-1 shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-xl ${
                  isUser 
                    ? 'bg-cyan-700 text-white font-sans' 
                    : 'bg-[#0d1524] border border-slate-800 text-slate-200'
                }`}>
                  {!isUser && (
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                      <span className="font-bold text-slate-100 font-mono">
                        {msg.speaker} <span className="text-cyan-400 font-normal">({msg.speakerRole})</span>
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">{msg.timestamp}</span>
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap text-xs sm:text-[13px] font-sans">{msg.text}</p>

                  {msg.groundedFacts && msg.groundedFacts.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-400 space-y-1.5 bg-[#080d18] p-2.5 rounded-lg border border-slate-800">
                      <span className="font-bold text-slate-200 block font-mono">{isFa ? 'حقایق مستند ارجاع‌شده در پاسخ:' : 'Grounded Reference Facts:'}</span>
                      {msg.groundedFacts.map((fact, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-300">
                          <span>•</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.suggestedFollowUp && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs">
                      <span className="text-amber-400 font-mono font-bold block mb-1">{isFa ? 'پرسش پیگیری پیشنهادی:' : 'Suggested Follow-Up:'}</span>
                      <button
                        onClick={() => handleSend(msg.suggestedFollowUp)}
                        className="text-cyan-400 hover:text-cyan-200 font-medium underline text-right cursor-pointer"
                      >
                        {msg.suggestedFollowUp}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center shrink-0 font-bold text-xs mt-1">
                    <User className="w-5 h-5 text-cyan-300" />
                  </div>
                )}
              </div>
            );
          })}

          {loadingQuery && (
            <div className="flex gap-3 text-xs justify-start">
              <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 font-bold text-xs">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-[#0d1524] border border-slate-800 rounded-xl p-3.5 text-slate-300 flex items-center gap-2.5 shadow-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                <span className="font-mono">{isFa ? 'در حال مشورت با اعضای شورای مدیران و استخراج فکت‌ها...' : 'Deliberating with Executive Council agents...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Input Bar */}
        <div className="flex gap-2.5">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={isFa ? 'پرسش خود را از شورای مدیران مپنا پارس مطرح فرمایید...' : 'Query the MAPNA Pars Executive Council...'}
            className="flex-1 bg-[#080d18] border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loadingQuery}
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
          >
            <span>{isFa ? 'ارسال' : 'Send'}</span>
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

    </div>
  );
};
