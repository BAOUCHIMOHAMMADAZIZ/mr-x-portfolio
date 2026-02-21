export interface ContactSubmission {
  id: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: Date;
  ipHash: string;
  userAgent?: string | null;
  status: string;
}
