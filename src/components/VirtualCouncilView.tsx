import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Bot,
  User,
  ExternalLink
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
      // Handled inside service
    } finally {
      setLoadingQuery(false);
    }
  };

  const getStanceBadge = (stance: CouncilMember['stance']) => {
    switch (stance) {
      case 'APPROVE':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>APPROVE</span>
          </span>
        );
      case 'CONDITIONAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>CONDITIONAL</span>
          </span>
        );
      case 'CAUTION':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>CAUTION</span>
          </span>
        );
      case 'OBJECT':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600/30 text-red-300 border border-red-500/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            <span>OBJECT</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Overview */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'لایه تفسیر و چالش تخصصی سازمانی' : 'Virtual Executive Council'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isFa ? 'شورای اجرایی مجازی مپنا پارس (Virtual Executive Council)' : 'MAPNA Pars Virtual Executive Council'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isFa 
              ? 'مجموعه ۷ عامل تخصصی هوشمند که خروجی شبیه‌سازی را از زوایای عملیات، مالی، کیفیت، زنجیره تامین، واقعیت ایران و بدبینانه چالش می‌کشند.'
              : 'Multi-agent executive council subjecting deterministic simulation results to rigorous cross-functional challenge.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('decision')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition self-start md:self-auto"
        >
          <span>{isFa ? 'مشاهده بسته تصمیم مصوب' : 'Open Decision Package'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

      {/* Grid of Council Members' Stances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {council.map((member) => (
          <div 
            key={member.id}
            className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 shadow flex flex-col justify-between space-y-3 text-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${member.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow`}>
                    {member.id.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">{isFa ? member.name : member.nameEn}</h3>
                    <span className="text-[10px] text-slate-400 block">{isFa ? member.role : member.roleEn}</span>
                  </div>
                </div>
                {getStanceBadge(member.stance)}
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed mt-2.5">
                "{isFa ? member.comment : member.commentEn}"
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 text-[11px]">
              <span className="text-cyan-400 font-semibold block mb-0.5">
                {isFa ? 'پرسش کلیدی / چالش:' : 'Key Challenge:'}
              </span>
              <p className="text-slate-400 italic">
                {isFa ? member.keyQuestion : member.keyQuestionEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Council Deliberation Chamber (Chat / Consultation) */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-base text-white">
              {isFa ? 'اتاق مشاوره و استعلام مستقیم از اعضای شورا' : 'Interactive Council Consultation Chamber'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'پشتیبانی از مدل تحلیلی Gemini' : 'Powered by Gemini & Grounded Truth'}</span>
          </span>
        </div>

        {/* Preset Questions Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-400 font-semibold">
            {isFa ? 'پرسش‌های پیشنهادی هیئت مدیره:' : 'Suggested Executive Queries:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition text-right"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Chat Thread */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 max-h-[420px] overflow-y-auto space-y-4">
          {chatMessages.map((msg, idx) => {
            const isUser = msg.sender === 'USER';
            return (
              <div 
                key={idx}
                className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-2xl rounded-xl p-4 space-y-2 ${
                  isUser 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}>
                  {!isUser && (
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px]">
                      <span className="font-bold text-cyan-300">
                        {msg.speaker} <span className="text-slate-400 font-normal">({msg.speakerRole})</span>
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">{msg.timestamp}</span>
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {msg.groundedFacts && msg.groundedFacts.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      <span className="font-semibold text-slate-300 block">{isFa ? 'حقایق مستند ارجاع‌شده:' : 'Grounded Reference Facts:'}</span>
                      {msg.groundedFacts.map((fact, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1 font-mono text-[10px] text-cyan-400">
                          <span>•</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.suggestedFollowUp && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <span className="text-amber-400 font-semibold block mb-1">{isFa ? 'پرسش پیگیری پیشنهادی:' : 'Suggested Follow-Up:'}</span>
                      <button
                        onClick={() => handleSend(msg.suggestedFollowUp)}
                        className="text-slate-300 hover:text-white underline text-right cursor-pointer"
                      >
                        {msg.suggestedFollowUp}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold text-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loadingQuery && (
            <div className="flex gap-3 text-xs justify-start">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                <span>{isFa ? 'در حال مشورت با اعضای شورای اجرایی و مدل تحلیلی...' : 'Deliberating with Executive Council agents...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={isFa ? 'پرسش خود را از شورای اجرایی مپنا پارس مطرح فرمایید...' : 'Query the MAPNA Pars Executive Council...'}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loadingQuery}
            className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 transition"
          >
            <span>{isFa ? 'ارسال' : 'Send'}</span>
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

    </div>
  );
};
