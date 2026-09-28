'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation & Brand
  'nav.brandSubtitle': {
    ar: 'مضاد مصائد الاشتراكات',
    en: 'Anti-Trap Utility',
  },
  'nav.directory': {
    ar: 'دليل الإلغاء',
    en: 'Directory',
  },
  'nav.legalNotice': {
    ar: 'الإخطار القانوني',
    en: 'Legal Notice',
  },
  'nav.reportPattern': {
    ar: 'الإبلاغ عن فخ',
    en: 'Report Pattern',
  },
  'nav.pwaActive': {
    ar: 'تطبيق ويب نشط',
    en: 'PWA Active',
  },

  // Hero Section
  'hero.badge': {
    ar: 'محرك مضاد للأنماط الخادعة والاشتراكات الرقمية',
    en: 'Autonomous Anti-Dark-Pattern Engine',
  },
  'hero.title1': {
    ar: 'تحرر نهائياً من',
    en: 'Break Free From',
  },
  'hero.titleGradient': {
    ar: 'مصائد الاشتراكات',
    en: 'Subscription Traps',
  },
  'hero.subtitle': {
    ar: 'روابط تخطي مباشرة، ومسارات مختصرة لتجاوز متاهات الإلغاء، وإخطارات قانونية ملزمة لأكثر من 50 منصة رقمية. تخطَّ استبيانات الإقناع المرهقة، ومكالمات خدمة العملاء الإلزامية، والأزرار المخفية.',
    en: 'Direct bypass URLs, retention maze shortcuts, and statutory legal cancellation notices for 50+ enterprise services. Skip deceptive exit surveys, cancel phone calls, and hidden buttons.',
  },
  'hero.searchPlaceholder': {
    ar: 'ابحث بين أكثر من 50 خدمة (مثل Adobe، Netflix، Planet Fitness، AWS)...',
    en: 'Search 50+ services (e.g. Adobe, Planet Fitness, Netflix, AWS)...',
  },
  'hero.statServices': {
    ar: 'خدمة مفهرسة',
    en: 'Services Indexed',
  },
  'hero.statFuzzy': {
    ar: 'بحث فائق السرعة',
    en: 'Fuzzy Filter',
  },
  'hero.statPdf': {
    ar: 'PDF محلي 100%',
    en: 'Client-Side PDF',
  },
  'hero.statCarl': {
    ar: 'قانون CARL § 17600',
    en: '§ 17600 Mandate',
  },

  // Flow Comparison
  'flow.sectionTitle': {
    ar: 'بنية الخداع المؤسسي في الاشتراكات',
    en: 'The Corporate Deception Architecture',
  },
  'flow.sectionSubtitle': {
    ar: 'كيف تصمم الشركات عمداً عراقيل الإلغاء لإبقائك محاصراً — وكيف يقوم UnTrap بإزالتها فورياً.',
    en: 'How subscription providers deliberately design cancellation friction — and how UnTrap eliminates it.',
  },
  'flow.comparisonHeading': {
    ar: 'المسار المؤسسي الخادع مقابل زر الإلغاء الفوري من UnTrap',
    en: 'Deceptive Corporate Maze vs. UnTrap Kill-Switch',
  },
  'flow.corporateTitle': {
    ar: 'المسار المؤسسي المعقد',
    en: 'Deceptive Corporate Flow',
  },
  'flow.untrapTitle': {
    ar: 'مسار UnTrap الفوري',
    en: 'UnTrap Instant Kill-Switch',
  },
  'flow.step1Corp': {
    ar: 'إخفاء زر الإلغاء تحت قوائم فرعية متداخلة ومعقدة داخل إعدادات الحساب.',
    en: 'Account settings conceal cancellation button under nested secondary submenus.',
  },
  'flow.step2Corp': {
    ar: 'إجبارك على المرور بـ 3 إلى 5 شاشات استبيان تثير الشعور بالذنب وتظهر رسائل تحذيرية من خسارة المزايا.',
    en: '3 to 5 multi-step guilt-trip surveys showing photos of lost benefits and team alerts.',
  },
  'flow.step3Corp': {
    ar: 'إبراز عروض وهمية مثل "تعليق الاشتراك مؤقتاً" بألوان زاهية مع تصغير خيار الإلغاء النهائي باللون الرمادي الباهت.',
    en: "Deceptive retention offers (e.g. 'Pause membership' or 50% discount) high-contrast highlighted over grayed-out cancel text.",
  },
  'flow.stepPhoneCorp': {
    ar: 'إلزامك بالانتظار في طوابير المكالمات الهاتفية الطويلة (متوسط 20 دقيقة) أو إرسال بريد مسجل ورقياً.',
    en: 'Forced customer service call hold queue (average 20+ min wait) or physical certified letter mandate.',
  },
  'flow.step1Untrap': {
    ar: 'رابط مباشر بنقرة واحدة ينقلك فوراً لنقطة الإلغاء البرمجية الداخلية في المنصة.',
    en: "One-click deep link directly into the service's internal termination endpoint.",
  },
  'flow.step2Untrap': {
    ar: 'نسخ فوري للخطوات المحددة لموقع الأزرار في حافظتك لمواجهة تضليل الموقع.',
    en: 'Instant clipboard copy of exact button positions and counter-deception scripts.',
  },
  'flow.step3Untrap': {
    ar: 'مُولّد إخطار قانوني ملزم بصيغة PDF يستند لقانون كاليفورنيا CARL § 17600 و ROSCA لإلغاء الدفع الدوري.',
    en: 'Statutory legal PDF notice generator invoking California CARL § 17600 and ROSCA if gated.',
  },

  // Featured Section
  'featured.badge': {
    ar: 'سجل المصائد الأكثر تعقيداً',
    en: 'Critical Trap Registry',
  },
  'featured.title': {
    ar: 'أعلى الاشتراكات صعوبة في الإلغاء',
    en: 'Highest-Friction Subscription Bypasses',
  },
  'featured.subtitle': {
    ar: 'منصات معروفة بفرض المكالمات الهاتفية، وغرامات الإنهاء المبكر، ومتاهات الاحتفاظ.',
    en: 'Platforms notorious for phone gates, early termination fees, and retention labyrinths.',
  },
  'featured.viewAll': {
    ar: 'عرض كافة الخدمات الـ 50',
    en: 'View all 50 services',
  },

  // Legal Banner Teaser
  'legalTeaser.badge': {
    ar: 'دفاع قانوني ملزم',
    en: 'Statutory Legal Defense',
  },
  'legalTeaser.title': {
    ar: 'هل تفرض عليك الشركة مكالمة هاتفية أو زيارة شخصية للإلغاء؟',
    en: 'Faced with a Phone Queue or In-Person Gym Visit?',
  },
  'legalTeaser.subtitle': {
    ar: 'قم بإنشاء إخطار قانوني رسمي ملزم بالاستناد إلى المادة 17600 من قانون كاليفورنيا وقواعد لجنة التجارة الفيدرالية (FTC). أوقف تفويض السحب المالي الدوري فوراً مع حماية تامة للخصوصية وبدون إرسال بياناتك لأي خادم.',
    en: 'Generate an enforceable Legal Demand Notice citing California Business & Professions Code § 17600 and the FTC Negative Option Rule. Revoke recurring payment authorization instantly with 100% local client-side PDF generation.',
  },
  'legalTeaser.cta': {
    ar: 'فتح مولّد الإخطار القانوني',
    en: 'Launch Notice Generator',
  },

  // Virtual Card Banner
  'vcard.badge': {
    ar: 'حماية من الرسوم العالقة',
    en: 'Anti-Zombie Billing Defense',
  },
  'vcard.title': {
    ar: 'منع سحب المبالغ غير المصرح بها بعد الإلغاء',
    en: 'Prevent Unauthorized Post-Cancellation Charges',
  },
  'vcard.desc': {
    ar: 'تعتمد الكثير من الشركات على دورات محاسبية متأخرة أو رموز سحب متكررة تستمر في خصم الأموال لأسابيع بعد إلغاء الاشتراك. احمِ بطاقتك البنكية الحقيقية بإنشاء بطاقة افتراضية للاستخدام الواحد بحد أقصى 0 دولار.',
    en: 'Many subscription vendors rely on delayed billing cycles or automated recurring merchant tokens that process charges weeks after cancellation. Mask your real credit card using a virtual burner card with a $0 spend limit.',
  },
  'vcard.cta': {
    ar: 'إنشاء بطاقة افتراضية مجانية',
    en: 'Generate Free Burner Card',
  },
  'vcard.features': {
    ar: 'إيقاف البطاقة بضغطة زر • وضع سقف سحب صارم',
    en: 'Pause cards instantly • Set strict spend caps',
  },

  // Categories
  'cat.all': { ar: 'الكل', en: 'All' },
  'cat.streaming': { ar: 'خدمات البث', en: 'Streaming' },
  'cat.gyms': { ar: 'النوادي واللياقة', en: 'Gyms' },
  'cat.saas': { ar: 'البرمجيات (SaaS)', en: 'SaaS' },
  'cat.cloud': { ar: 'السحابة والاستضافة', en: 'Cloud' },
  'cat.newsMedia': { ar: 'الصحافة والإعلام', en: 'News Media' },

  // Dark Pattern Badges
  'pattern.hidden_button': { ar: 'زر مخفي', en: 'Hidden Button' },
  'pattern.phone_gate': { ar: 'بوابة هاتفية', en: 'Phone-Gated' },
  'pattern.retention_maze': { ar: 'متاهة احتفاظ', en: 'Retention Maze' },
  'pattern.delay_tactic': { ar: 'مماطلة وتأخير', en: 'Delay Tactic' },

  // Service Card
  'card.trapLevel': { ar: 'مستوى الفخ', en: 'Trap Level' },
  'card.bypassTime': { ar: 'دقيقة تخطي', en: 'm bypass' },
  'card.fullGuide': { ar: 'الدليل الكامل', en: 'Full Guide' },
  'card.directBypass': { ar: 'إلغاء مباشر', en: 'Direct Bypass' },
  'card.copied': { ar: 'تم النسخ وجارٍ الفتح...', en: 'Copied & Opening...' },
  'card.copyAndOpen': { ar: 'نسخ الخطوات والانتقال للرابط المباشر', en: 'Copy Guide & Open Bypass Link' },
  'card.executeKillSwitch': { ar: 'تنفيذ الإلغاء الفوري لـ', en: 'Execute Kill-Switch for' },
  'card.copiesToClipboard': { ar: 'ينسخ الخطوات للحافظة ويفتح صفحة الإلغاء فورياً', en: 'Copies steps to clipboard & opens unmasked portal' },

  // Directory Page
  'directory.badge': { ar: 'دليل الإلغاء المباشر المعتمد', en: 'Verified Kill-Switch Directory' },
  'directory.title': { ar: 'روابط الإلغاء وتخطي المصائد', en: 'Direct Subscription Bypass Links' },
  'directory.desc': {
    ar: 'تخطَّ طوابير الانتظار الهاتفية المرهقة، والأزرار المخفية، ومتاهات الاحتفاظ المعقدة. روابط غير مقنّعة وإرشادات مفصلة لـ 50 منصة عالمية.',
    en: 'Bypass 45-minute customer support hold lines, hidden cancel links, and multi-tier retention mazes. Direct unmasked URLs and step-by-step kill switches for 50 enterprise platforms.',
  },
  'directory.minLevel': { ar: 'الحد الأدنى لمستوى الفخ:', en: 'Minimum Trap Level:' },
  'directory.showing': { ar: 'عرض', en: 'Showing' },
  'directory.verifiedCount': { ar: 'إلغاء مباشر موثق', en: 'verified cancellation bypasses' },
  'directory.audited': { ar: 'يتم التدقيق المستمر لإزالة عراقيل الإلغاء', en: 'Continuously audited for counter-retention bypasses' },

  // Legal Generator Page
  'generator.badge': { ar: 'محرك الدفاع القانوني للمستهلك', en: 'Statutory Consumer Defense Engine' },
  'generator.title': { ar: 'مُولّد إخطارات إلغاء الاشتراك الملزمة قانونياً', en: 'Legally Binding Cancellation Notice Generator' },
  'generator.desc': {
    ar: 'عندما تفرض عليك منصة ما الانتظار في الهاتف أو زيارة فروعها شخصياً لإلغاء الاشتراك، استخدم القوانين الفيدرالية وقانون كاليفورنيا لإجبارها على الإلغاء الفوري وإلغاء صلاحية السحب البنكي.',
    en: 'When subscription services gate cancellations behind 45-minute phone queues, hidden buttons, or deceptive retention mazes, invoke federal and California law to force immediate termination and revoke payment authorization.',
  },
  'generator.formTitle': { ar: 'مُولّد الإخطار القانوني في المتصفح', en: 'Client-Side Legal Notice Generator' },
  'generator.formSubtitle': { ar: 'استناداً إلى CARL § 17600 و 15 U.S.C. § 8401 (ROSCA) و EFTA Reg E', en: 'Citing CARL § 17600, 15 U.S.C. § 8401 (ROSCA), and EFTA Reg E' },
  'generator.privacyBadge': {
    ar: 'خصوصية تامة 100%: لا يتم إرسال أي بيانات عبر الإنترنت. يتم توليد ملف الـ PDF مباشرة داخل ذاكرة متصفحك.',
    en: '100% Client-Side Privacy: Zero data transmission. All information is rendered directly into a PDF in local memory.',
  },
  'generator.fullName': { ar: 'الاسم القانوني الكامل *', en: 'Your Full Legal Name *' },
  'generator.accountEmail': { ar: 'البريد الإلكتروني للحساب *', en: 'Your Account Email *' },
  'generator.serviceName': { ar: 'اسم الخدمة / الشركة *', en: 'Service / Company Name *' },
  'generator.accountId': { ar: 'معرف الحساب / رقم العضوية / اسم المستخدم *', en: 'Account ID / Username / Member # *' },
  'generator.billingDate': { ar: 'تاريخ الفاتورة القادمة المتوقعة *', en: 'Upcoming Projected Billing Date *' },
  'generator.cardDigits': { ar: 'آخر 4 أرقام من بطاقة الدفع (اختياري)', en: 'Last 4 Digits of Payment Card (Optional)' },
  'generator.address': { ar: 'عنوان المشترك البريدي (اختياري للبريد المسجل)', en: 'Subscriber Mailing Address (Optional for Certified Mail)' },
  'generator.basis': { ar: 'السند القانوني المعتمد', en: 'Statutory Basis' },
  'generator.basisCombined': { ar: 'مشترك: قانون كاليفورنيا CARL § 17600 + ROSCA الفيدرالي (أعلى قوة قانونية)', en: 'Combined CARL § 17600 + ROSCA (Maximum Legal Weight)' },
  'generator.basisCarl': { ar: 'قانون كاليفورنيا CARL § 17600 (إلزامية زر الإلغاء الفوري الإلكتروني)', en: 'California CARL § 17600 (Strict Click-to-Cancel Mandate)' },
  'generator.basisRosca': { ar: 'قانون ROSCA الفيدرالي وقواعد الـ FTC لمكافحة الخداع', en: 'Federal ROSCA 15 U.S.C. § 8401 & FTC Negative Option' },
  'generator.downloadBtn': { ar: 'تحميل الإخطار بصيغة PDF ملزم قانونياً', en: 'Download Legally Binding PDF' },
  'generator.rendering': { ar: 'جارٍ توليد المستند...', en: 'Rendering PDF...' },
  'generator.copyBtn': { ar: 'نسخ النص', en: 'Copy Text' },
  'generator.copiedBtn': { ar: 'تم النسخ!', en: 'Copied!' },
  'generator.previewTitle': { ar: 'معاينة حية للمستند القانوني', en: 'Document Live Preview' },
  'generator.previewBadge': { ar: 'صيغة قانونية رسمية', en: 'Strict Statutory Form' },
  'generator.howToUse': {
    ar: 'طريقة الاستخدام: قم بتحميل ملف الـ PDF وأرفقه بتذكرة الدعم الفني، أو أرسله عبر البريد الإلكتروني لقسم المحاسبة/الشؤون القانونية بالشركة، أو سلّمه باليد/بالبريد المسجل في النوادي الرياضية.',
    en: 'How to use: Download the PDF and attach it to your support ticket, email it directly to legal/billing, or deliver via USPS Certified Mail for phone-gated gyms.',
  },

  // Report Pattern Page
  'report.badge': { ar: 'رادار الرصد المجتمعي لمصائد الاشتراكات', en: 'Crowdsourced Deception Radar' },
  'report.title': { ar: 'الإبلاغ عن فخ اشتراك خادع', en: 'Report a Subscription Trap' },
  'report.desc': {
    ar: 'هل واجهت منصة تجبرك على الانتظار 45 دقيقة على الهاتف، أو تخفي أزرار الإلغاء، أو تخصم مبالغ بدون إذنك؟ أبلغنا لإضافتها وفضح ممارساتها.',
    en: 'Discovered a service forcing 45-minute phone calls, hiding cancellation buttons in CSS, or charging unauthorized renewal fees? Report it to our consumer watch database.',
  },
  'report.successTitle': { ar: 'تم استلام البلاغ للتحقق والتدقيق', en: 'Report Submitted for Verification' },
  'report.successDesc': {
    ar: 'سيقوم فريق حماية المستهلك بفحص مسار الإلغاء واستخراج رابط التخطي المباشر وفهرسة الحل في منصة UnTrap.',
    en: 'Our consumer security team will audit the reported workflow, extract the direct unmasked bypass URL, and index the counter-measures into UnTrap.',
  },
  'report.submitAnother': { ar: 'إرسال بلاغ آخر', en: 'Submit Another Report' },
  'report.serviceNameLabel': { ar: 'اسم خدمة الاشتراك *', en: 'Subscription Service Name *' },
  'report.serviceUrlLabel': { ar: 'رابط الخدمة أو موقعها *', en: 'Service URL or Website *' },
  'report.typeLabel': { ar: 'تصنيف النمط الخادع *', en: 'Dark Pattern Classification *' },
  'report.typePhone': { ar: 'بوابة هاتفية (إلزام بالاتصال أو إرسال بريد ورقي)', en: 'Phone Gate (Forced call center queue or certified mail)' },
  'report.typeHidden': { ar: 'زر مخفي (إخفاء زر الإلغاء في مكان غير متوقع)', en: 'Hidden Button (Concealed or low-contrast cancellation toggle)' },
  'report.typeMaze': { ar: 'متاهة احتفاظ (أكثر من 3 شاشات استبيان وعروض تضليل)', en: 'Retention Maze (3+ screens of guilt-tripping surveys and traps)' },
  'report.typeDelay': { ar: 'مماطلة وتأخير (فرض أسابيع انتظار قبل التنفيذ)', en: 'Delay Tactic (Mandatory multi-week wait period or cooldown)' },
  'report.descLabel': { ar: 'وصف الممارسة الخادعة بالتفصيل *', en: 'Description of Deceptive Practice *' },
  'report.submitBtn': { ar: 'إرسال التقرير للتدقيق', en: 'Submit Pattern for Analysis' },

  // Footer
  'footer.desc': {
    ar: 'أداة مساعدة رقمية لحماية المستهلك وتجاوز مصائد الاشتراكات التلقائية، وتوفير مفاتيح إلغاء فورية وتوليد إخطارات قانونية ملزمة.',
    en: 'Autonomous enterprise utility neutralizing deceptive recurring subscription traps. Delivering direct kill-switches, bypassing phone-gates, and arming consumers with statutory legal cancellation demands under CARL § 17600 and ROSCA.',
  },
  'footer.privacy': { ar: 'انعدام تام لتتبع المستخدم. توليد محلي للـ PDF.', en: 'Zero user tracking. Pure client-side PDF generation.' },
  'footer.architect': { ar: 'مهندس النظام والمطور', en: 'Platform Architect' },
  'footer.lead': { ar: 'المطور الرئيسي', en: 'Lead Engineer' },
  'footer.developerName': { ar: 'يازد الأشقر (Yazed Al-Ashkar)', en: 'Yazed Al-Ashkar' },
  'footer.developerRole': {
    ar: 'مطور واجهات أمامية ومتخصص حلول الذكاء الاصطناعي (React / Next.js / الأنظمة الذكية المستقلة).',
    en: 'Frontend Web Developer & AI Solutions Specialist specializing in React, Next.js, and autonomous agent architectures.',
  },
  'footer.contact': { ar: 'تواصل مع المطور', en: 'Contact Engineer' },
  'footer.copyright': { ar: '© UnTrap.io — أداة عامة لحماية المستهلك الرقمي.', en: '© UnTrap.io — Public Consumer Protection Utility.' },
  'footer.edge': { ar: 'موزع عبر Vercel Edge', en: 'Vercel Edge Distributed' },
  'footer.pwa': { ar: 'تطبيق ويب تقدمي (PWA)', en: 'Progressive Web App (PWA)' },
  'footer.vitals': { ar: '100/100 تجربة مستخدم وسرعة قياسية', en: '100/100 Core Web Vitals' },
};

interface LanguageContextType {
  lang: Language;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  dir: 'rtl',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ar');

  useEffect(() => {
    // Check saved preference or default to Arabic
    const saved = localStorage.getItem('untrap_lang') as Language | null;
    if (saved === 'en' || saved === 'ar') {
      setLangState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    } else {
      setLangState('ar');
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('untrap_lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key;
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t }}>
      <div dir={dir} className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
