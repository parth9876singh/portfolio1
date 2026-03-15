export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxx',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxx',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_xxx'
};
