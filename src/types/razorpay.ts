interface IApiRes {
  success: boolean;
  message: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name: string;
    email: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
}

interface Razorpay {
  open(): void;
}

export interface Window {
  Razorpay: new (options: RazorpayOptions) => Razorpay;
}

export interface RazorpayOrder {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string | null;
  status: "created" | "paid" | "attempted";
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface ICreatePayOrderRes extends IApiRes {
  order: RazorpayOrder;
}

export interface IVerifyPayOrderRes extends IApiRes {
  isVerified: boolean;
}
