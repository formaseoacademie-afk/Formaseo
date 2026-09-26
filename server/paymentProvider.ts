import { db } from './database.ts';

export interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  paymentId: string;
  transactionRef: string;
  status: 'pending' | 'requires_gateway' | 'failed';
  message?: string;
}

export interface PaymentProvider {
  name: string;
  isLive: boolean;
  createCheckout(userId: string, courseId: string, amount: number, currency: string): Promise<CheckoutResult>;
  verifyPayment(transactionRef: string): Promise<{ verified: boolean; status: string; paymentId?: string; message?: string }>;
  handleWebhook(payload: any, signature?: string): Promise<{ success: boolean; event: string }>;
}

/**
 * CMI (Centre Monétique Interbancaire Maroc) Production Gateway Provider
 */
export class CMIPaymentProvider implements PaymentProvider {
  name = 'CMI_MAROC';
  isLive: boolean;
  private merchantId: string | undefined;
  private storeKey: string | undefined;

  constructor() {
    this.merchantId = process.env.CMI_MERCHANT_ID;
    this.storeKey = process.env.CMI_STORE_KEY;
    this.isLive = Boolean(this.merchantId && this.storeKey);
  }

  async createCheckout(userId: string, courseId: string, amount: number, currency: string = 'MAD'): Promise<CheckoutResult> {
    if (!this.isLive && process.env.NODE_ENV === 'production') {
      return {
        success: false,
        paymentId: '',
        transactionRef: '',
        status: 'requires_gateway',
        message: 'Le paiement en ligne par carte bancaire marocaine (CMI) est en cours de validation technique auprès de notre banque partenaire. Veuillez contacter l’administration pour un règlement par virement ou chèque.',
      };
    }

    const course = db.getCourseById(courseId);
    const user = await db.getUserById(userId);

    if (!course || !user) {
      return { success: false, paymentId: '', transactionRef: '', status: 'failed', message: 'Formation ou profil utilisateur introuvable.' };
    }

    const transactionRef = `CMI-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payment = db.createPayment({
      transactionRef,
      userId,
      courseId,
      amount,
      currency,
      provider: 'CMI_MAROC',
      status: 'pending',
    });

    return {
      success: true,
      checkoutUrl: `/checkout/payment-instructions?ref=${transactionRef}`,
      paymentId: payment.id,
      transactionRef,
      status: 'pending',
      message: 'Demande de paiement enregistrée. En attente de validation bancaire.',
    };
  }

  async verifyPayment(transactionRef: string): Promise<{ verified: boolean; status: string; paymentId?: string; message?: string }> {
    const payment = db.getPaymentByRef(transactionRef);
    if (!payment) {
      return { verified: false, status: 'not_found', message: 'Transaction introuvable.' };
    }

    if (!this.isLive) {
      return {
        verified: false,
        status: payment.status,
        paymentId: payment.id,
        message: 'Passerelle CMI en mode sandbox. La transaction reste en statut "en attente" jusqu’à confirmation bancaire réelle.',
      };
    }

    // Real production CMI server-to-server inquiry would go here
    return {
      verified: payment.status === 'paid',
      status: payment.status,
      paymentId: payment.id,
    };
  }

  async handleWebhook(payload: any, signature?: string): Promise<{ success: boolean; event: string }> {
    if (!this.isLive) {
      return { success: false, event: 'cmi.webhook_disabled_sandbox' };
    }

    // Real CMI Hash verification: HASH = base64(SHA512(merchantId|clientId|amount|...|storeKey))
    // If valid: db.updatePaymentStatus(payload.transactionRef, 'paid'); db.enrollUser(userId, courseId);
    return { success: true, event: 'cmi.processed' };
  }
}

export const paymentProvider = new CMIPaymentProvider();
