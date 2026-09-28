import { LegalDemandData } from '@/lib/types';

export function generateLegalDemandText(data: LegalDemandData, lang: 'ar' | 'en' = 'en'): string {
  const dateFormatted = data.effectiveDate || new Date().toISOString().split('T')[0];
  const lastFour = data.lastFourDigits ? (lang === 'ar' ? `(المنتهية بالأرقام ****${data.lastFourDigits})` : `(Ending in ****${data.lastFourDigits})`) : '';
  const addressBlock = data.userAddress ? (lang === 'ar' ? `\nعنوان المشترك: ${data.userAddress}` : `\nSender Address: ${data.userAddress}`) : '';

  if (lang === 'ar') {
    return `إخطار رسمي بإنهاء فوري للاشتراك وإلغاء تفويض السحب المالي التلقائي
FORMAL NOTICE OF IMMEDIATE SUBSCRIPTION TERMINATION

التاريخ: ${dateFormatted}
إلى: إدارة الشؤون القانونية والمحاسبة، ${data.serviceName}
من: ${data.userName} (${data.userEmail})${addressBlock}
معرّف الحساب / رقم المشترك: ${data.accountIdentifier}
وسيلة الدفع: ${lastFour || 'كافة وسائل الدفع المصرح بها مسبقاً'}
تاريخ الفاتورة القادمة المستهدفة: ${data.billingDate}

--------------------------------------------------------------------------------
1. المطلب القانوني بالإنهاء الفوري للاشتراك (Statutory Cancellation Demand)
--------------------------------------------------------------------------------
بموجب أحكام المادة 17600-17606 من قانون الأعمال والمهن في كاليفورنيا (California Automatic Renewal Law / CARL)، 
والقانون الفيدرالي لاستعادة ثقة المتسوقين عبر الإنترنت (ROSCA, 15 U.S.C. §§ 8401-8405)، وقواعد لجنة التجارة 
الفيدرالية لمكافحة الأنماط السلبية والخادعة (16 CFR Part 425)، أُعلن بموجب هذا الإخطار إنهاءً نهائياً وقاطعاً وفورياً 
لاشتراكي في ${data.serviceName}، ولكافة الخدمات والاشتراكات الدورية التابعة لها والتجديد التلقائي.

--------------------------------------------------------------------------------
2. إلغاء تفويض السحب الإلكتروني والخصم الدوري (Revocation of Pre-Authorized Debits)
--------------------------------------------------------------------------------
يسري مفعول هذا الإلغاء فور استلام هذا الإخطار؛ وبناءً عليه يُلغى فوراً أي تفويض سابق ممنوح لشركة ${data.serviceName} 
أو وسطاء الدفع بالخصم أو السحب الدوري من بطاقتي الائتمانية أو حسابي المصرفي أو محفظتي الرقمية، وذلك وفقاً لأحكام 
قانون التحويل الإلكتروني للأموال (EFTA, 15 U.S.C. § 1693e) واللائحة التنظيمية E (12 CFR § 1005.10(c)).

يُعتبر أي سحب أو خصم لاحق تجريه ${data.serviceName} بعد هذا الإخطار بمثابة تحويل مالي غير مصرح به قانوناً، 
وسيتم الاعتراض عليه ورفضه عبر البنك المصدر.

--------------------------------------------------------------------------------
3. الامتثال لإلزامية الإلغاء الإلكتروني الفوري ("Click-to-Cancel" Mandate)
--------------------------------------------------------------------------------
وفقاً للمادة 17602(c) من قانون كاليفورنيا، يحق لأي مستهلك اشترك في خدمة عبر الإنترنت أن يُلغي اشتراكه عبر الإنترنت 
حصراً وفورياً دون إلزامه بمحادثات هاتفية أو استبيانات استبقاء معقدة أو زيارات شخصية. أي محاولة لفرض عراقيل غير إلكترونية 
تُعد ممارسة تجارية غير مشروعة، ويُعتبر هذا الإخطار وثيقة إثبات رسمية لطلب الإلغاء.

--------------------------------------------------------------------------------
4. طلب التأكيد الخطي (Demand for Confirmation)
--------------------------------------------------------------------------------
يُرجى إرسال تأكيد خطي رسمي يفيد بإنهاء الحساب نهائياً، وتأكيد عدم وجود أي مستحقات مالية (رصيد صفر)، 
وذلك خلال ثلاثة (3) أيام عمل إلى البريد الإلكتروني: ${data.userEmail}.

وتفضلوا بقبول الاحترام،

____________________________________________
توقيع المشترك: ${data.userName}
صادر بموجب المادة 28 U.S.C. § 1746 تحت طائلة المسؤولية القانونية.

--------------------------------------------------------------------------------
تنويه قانوني (Disclaimer):
هذا المستند يمثل نموذج إخطار رسمي لطلب إنهاء الاشتراك تم إعداده استناداً إلى 
نصوص ومراجع حماية المستهلك القانونية، ولا يُعد استشارة قانونية مهنية.
`;
  }

  return `FORMAL NOTICE OF IMMEDIATE SUBSCRIPTION TERMINATION
AND REVOCATION OF AUTOMATIC BILLING AUTHORIZATION

DATE: ${dateFormatted}
TO: Billing Department / Legal Compliance, ${data.serviceName}
FROM: ${data.userName} (${data.userEmail})${addressBlock}
ACCOUNT / USER IDENTIFIER: ${data.accountIdentifier}
PAYMENT INSTRUMENT: ${lastFour || 'Authorized Payment Method on File'}
NEXT PROJECTED BILLING DATE: ${data.billingDate}

--------------------------------------------------------------------------------
1. STATUTORY DEMAND FOR IMMEDIATE CANCELLATION
--------------------------------------------------------------------------------
Please take notice that pursuant to California Business and Professions Code 
§§ 17600-17606 (California Automatic Renewal Law / CARL), the Restore Online 
Shoppers' Confidence Act (ROSCA, 15 U.S.C. §§ 8401-8405), and the Federal Trade 
Commission's Negative Option Rule (16 CFR Part 425), I hereby unequivocally, 
irrevocably, and with immediate effect TERMINATE my subscription to ${data.serviceName}, 
along with all related recurring services, memberships, and automatic renewals.

--------------------------------------------------------------------------------
2. REVOCATION OF PRE-AUTHORIZED DEBITS & ELECTRONIC FUND TRANSFERS
--------------------------------------------------------------------------------
Effective immediately upon receipt of this instrument, any and all authorizations 
previously granted to ${data.serviceName} or its billing intermediaries to charge, debit, 
or execute recurring draws against my debit card, credit card, bank account, or other 
digital payment methods are hereby REVOKED in accordance with the Electronic Fund 
Transfer Act (EFTA, 15 U.S.C. § 1693e) and 12 CFR § 1005.10(c).

Any subsequent draft, charge, fee, penalty, or recurring debit initiated by 
${data.serviceName} following this notice constitutes an unauthorized electronic fund 
transfer and an unlawful consumer extraction under both state and federal law.

--------------------------------------------------------------------------------
3. MANDATE FOR ONLINE 'CLICK-TO-CANCEL' CONFORMANCE
--------------------------------------------------------------------------------
Under California Business and Professions Code § 17602(c) as amended, any consumer 
who accepts an automatic renewal or continuous service offer online must be allowed 
to terminate the automatic renewal exclusively online, at will, and without 
engaging in oral interviews, retention delays, phone queues, or physical in-person 
visitations. Attempts to gate termination behind non-electronic or obstructive 
impediments ('dark patterns') violate statutory mandate and will be submitted 
directly to the Consumer Protection Division of the State Attorney General and the 
FTC Bureau of Consumer Protection.

--------------------------------------------------------------------------------
4. CONFIRMATION DEMAND
--------------------------------------------------------------------------------
You are required to send written confirmation acknowledging receipt of this notice 
and confirming that my recurring billing has been permanently halted, with a zero 
balance due, within three (3) business days of receipt to ${data.userEmail}.

Respectfully submitted,

____________________________________________
${data.userName}
Executed pursuant to 28 U.S.C. § 1746 under penalty of perjury.

--------------------------------------------------------------------------------
STATUTORY NOTICE DISCLAIMER:
This instrument represents a standardized formal subscription cancellation 
notice template prepared pursuant to consumer protection statutes. It does 
not constitute individualized legal representation or legal advice.
`;
}
