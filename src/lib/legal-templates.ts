import { LegalDemandData } from '@/lib/types';

export function generateLegalDemandText(data: LegalDemandData): string {
  const dateFormatted = data.effectiveDate || new Date().toISOString().split('T')[0];
  const lastFour = data.lastFourDigits ? `(Ending in ****${data.lastFourDigits})` : '';
  const addressBlock = data.userAddress ? `\nSender Address: ${data.userAddress}` : '';

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
`;
}
