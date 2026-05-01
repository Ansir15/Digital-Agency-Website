import nodemailer from 'nodemailer';

/**
 * Create Nodemailer transporter with Gmail SMTP
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Send formatted HTML email to agency when contact form is submitted
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} - Nodemailer info object
 */
export const sendAgencyEmail = async (contactData) => {
  const transporter = createTransporter();
  
  const { name, email, phone, company, service, budget, message, referenceId, createdAt } = contactData;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0F172A 0%, #6C63FF 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: 600; color: #0F172A; margin-bottom: 5px; }
        .field-value { color: #475569; }
        .message-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #6C63FF; }
        .reference { background: #6C63FF; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; font-weight: 600; }
        .footer { text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Lead Received!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">DevAgency Contact Form</p>
        </div>
        <div class="content">
          <div style="text-align: center; margin-bottom: 25px;">
            <span class="reference">Reference: ${referenceId}</span>
          </div>
          
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">${email}</div>
          </div>
          
          ${phone ? `
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">${phone}</div>
          </div>
          ` : ''}
          
          ${company ? `
          <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${company}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Service Requested</div>
            <div class="field-value">${service}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Budget Range</div>
            <div class="field-value">${budget}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="footer">
            <p>Received on ${new Date(createdAt).toLocaleString()}</p>
            <p>DevAgency Lead Management System</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"DevAgency Website" <${process.env.EMAIL_USER}>`,
    to: process.env.AGENCY_EMAIL,
    subject: `🚀 New Lead: ${name} - ${service}`,
    html: htmlContent
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Send auto-reply confirmation email to client
 * @param {string} clientEmail - Client's email address
 * @param {string} name - Client's name
 * @param {string} referenceId - Unique reference ID
 * @returns {Promise<Object>} - Nodemailer info object
 */
export const sendClientAutoReply = async (clientEmail, name, referenceId) => {
  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6C63FF 0%, #8B85FF 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: #f8fafc; padding: 40px 30px; border-radius: 0 0 8px 8px; }
        .reference-box { background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; border: 2px solid #6C63FF; }
        .reference-label { color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .reference-value { color: #6C63FF; font-size: 24px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        .next-steps { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; }
        .next-steps h3 { color: #0F172A; margin-top: 0; }
        .next-steps ul { padding-left: 20px; }
        .next-steps li { margin-bottom: 10px; color: #475569; }
        .cta-button { background: #6C63FF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px; }
        .social-links { margin: 20px 0; }
        .social-links a { margin: 0 10px; color: #6C63FF; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You, ${name}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
        </div>
        <div class="content">
          <p style="font-size: 16px; color: #475569;">Hi ${name},</p>
          
          <p>Thank you for reaching out to DevAgency! We've received your project inquiry and our team is already reviewing the details.</p>
          
          <div class="reference-box">
            <div class="reference-label">Your Reference ID</div>
            <div class="reference-value">${referenceId}</div>
          </div>
          
          <p style="text-align: center; color: #64748b; font-size: 14px;">Please keep this ID for future reference</p>
          
          <div class="next-steps">
            <h3>📋 What happens next?</h3>
            <ul>
              <li>Our team will review your project requirements within 24 hours</li>
              <li>We'll prepare a detailed proposal tailored to your needs</li>
              <li>You'll receive a follow-up email with next steps</li>
              <li>Schedule a free consultation call (optional)</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.CLIENT_URL}/services" class="cta-button">Explore Our Services</a>
          </div>
          
          <p style="color: #475569;">If you have any urgent questions, feel free to reply to this email or call us directly.</p>
          
          <div class="footer">
            <p><strong>DevAgency</strong></p>
            <p>Building Digital Excellence</p>
            <div class="social-links">
              <a href="#">LinkedIn</a> • 
              <a href="#">Twitter</a> • 
              <a href="#">GitHub</a>
            </div>
            <p style="margin-top: 20px;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"DevAgency Team" <${process.env.EMAIL_USER}>`,
    to: clientEmail,
    subject: 'We received your message! 🚀',
    html: htmlContent
  };

  return await transporter.sendMail(mailOptions);
};
