import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EnquiryMailPayload {
  customerName:  string;
  customerEmail: string;
  customerPhone: string;
  productName?:  string;
  quantity?:     string;
  message?:      string;
}

export async function sendEnquiryEmail(payload: EnquiryMailPayload) {
  const recipient = process.env.ENQUIRY_RECIPIENT!;

  // ── Notification to admin ──────────────────────────────────────
  await transporter.sendMail({
    from:    `"SRJ Gold Spices" <${process.env.SMTP_USER}>`,
    to:      recipient,
    subject: `New Enquiry — ${payload.productName ?? "General"} — ${payload.customerName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #EDE3CC;border-radius:8px;overflow:hidden">
        <div style="background:#4A1320;padding:24px 28px">
          <h2 style="color:#E0B428;margin:0;font-size:20px">New Enquiry — SRJ Gold Spices</h2>
        </div>
        <div style="padding:24px 28px;background:#FBF5E4">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#7A6A52;font-size:13px;width:120px">Name</td><td style="font-size:13px;color:#1A1209"><strong>${payload.customerName}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#7A6A52;font-size:13px">Email</td><td style="font-size:13px;color:#1A1209">${payload.customerEmail}</td></tr>
            <tr><td style="padding:8px 0;color:#7A6A52;font-size:13px">Phone</td><td style="font-size:13px;color:#1A1209">${payload.customerPhone}</td></tr>
            ${payload.productName ? `<tr><td style="padding:8px 0;color:#7A6A52;font-size:13px">Product</td><td style="font-size:13px;color:#1A1209">${payload.productName}</td></tr>` : ""}
            ${payload.quantity ? `<tr><td style="padding:8px 0;color:#7A6A52;font-size:13px">Quantity</td><td style="font-size:13px;color:#1A1209">${payload.quantity}</td></tr>` : ""}
            ${payload.message ? `<tr><td style="padding:8px 0;color:#7A6A52;font-size:13px;vertical-align:top">Message</td><td style="font-size:13px;color:#1A1209">${payload.message}</td></tr>` : ""}
          </table>
        </div>
      </div>
    `,
  });

  // ── Auto-reply to customer ─────────────────────────────────────
  await transporter.sendMail({
    from:    `"SRJ Gold Spices" <${process.env.SMTP_USER}>`,
    to:      payload.customerEmail,
    subject: "We received your enquiry — SRJ Gold Spices",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #EDE3CC;border-radius:8px;overflow:hidden">
        <div style="background:#4A1320;padding:24px 28px">
          <h2 style="color:#E0B428;margin:0;font-size:20px">Thank you, ${payload.customerName}!</h2>
        </div>
        <div style="padding:24px 28px;background:#FBF5E4">
          <p style="color:#1A1209;font-size:14px;line-height:1.7">We have received your enquiry${payload.productName ? ` for <strong>${payload.productName}</strong>` : ""} and will get back to you within <strong>24 hours</strong>.</p>
          <p style="color:#7A6A52;font-size:13px;line-height:1.7;margin-top:16px">— The SRJ Gold Spices Team<br/>Since 1981 · Taste Beyond the Limit</p>
        </div>
      </div>
    `,
  });
}
