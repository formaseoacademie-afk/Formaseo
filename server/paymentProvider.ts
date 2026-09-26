import { db } from './database.ts';

export interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  paymentId: string;
  transactionRef: string;
  message?: string;
}

export interface PaymentProvider {
  createCheckout(userId: string, courseId: string, amount: number, currency: string): Promise<CheckoutResult>;
  verifyPayment(transactionRef: string): Promise<{ verified: boolean; status: string; paymentId?: string }>;
  handleWebhook(payload: any, signature?: string): Promise<{ success: boolean; event: string }>;
}

export class CMIMoroccoPaymentProvider implements PaymentProvider {
  async createCheckout(userId: string, courseId: string, amount: number, currency: string = 'MAD'): Promise<CheckoutResult> {
    const course = db.getCourseById(courseId);
    const user = db.findUserById(userId);

    if (!course || !user) {
      return { success: false, paymentId: '', transactionRef: '', message: 'Cours ou utilisateur introuvable' };
    }

    const transactionRef = 'CMI-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
    const payment = {
      id: 'pay-' + Date.now(),
      userId,
      courseId,
      amount,
      currency,
      provider: 'CMI_MAROC',
      status: 'pending' as const,
      transactionRef,
      createdAt: new Date().toISOString(),
    };

    // Store payment record in DB
    const state = (db as any).data;
    if (state && state.payments) {
      state.payments.push(payment);
      (db as any).save();
    }

    return {
      success: true,
      checkoutUrl: `/checkout/cmi-mock?ref=${transactionRef}`,
      paymentId: payment.id,
      transactionRef,
    };
  }

  async verifyPayment(transactionRef: string): Promise<{ verified: boolean; status: string; paymentId?: string }> {
    const state = (db as any).data;
    const payment = state?.payments?.find((p: any) => p.transactionRef === transactionRef);
    if (!payment) {
      return { verified: false, status: 'not_found' };
    }

    // In production, queries CMI Gateway API with merchant key
    payment.status = 'paid';
    (db as any).save();

    // Automatically enroll student on server side
    db.enrollUser(payment.userId, payment.courseId);

    return { verified: true, status: 'paid', paymentId: payment.id };
  }

  async handleWebhook(payload: any): Promise<{ success: boolean; event: string }> {
    // Process IPN / Webhook from payment gateway
    if (payload && payload.transactionRef && payload.status === 'SUCCESS') {
      await this.verifyPayment(payload.transactionRef);
      return { success: true, event: 'payment.completed' };
    }
    return { success: false, event: 'payment.unknown' };
  }
}

export const paymentProvider = new CMIMoroccoPaymentProvider();
