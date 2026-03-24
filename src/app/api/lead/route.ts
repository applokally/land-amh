import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadPayload = {
  fullName?: string;
  company?: string;
  email?: string;
  country?: string;
  phoneCode?: string;
  phoneNumber?: string;
  interestType?: string;
  language?: string;
};

const REQUIRED_ENV_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
  "LEAD_RECIPIENTS",
] as const;

function getMissingEnvVars(): string[] {
  return REQUIRED_ENV_VARS.filter((key) => !process.env[key]?.trim());
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeRecipients(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseBooleanEnv(value?: string): boolean | undefined {
  if (!value) return undefined;

  const normalized = value.trim().toLowerCase();

  if (["true", "1", "yes", "y", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "n", "off"].includes(normalized)) return false;

  return undefined;
}

function getAutoReplyContent(language: string, fullName: string) {
  const safeName = escapeHtml(fullName);
  const normalized = language.trim().toLowerCase();

  if (normalized === "arabic" || normalized === "ar") {
    return {
      subject: "لقد استلمنا طلبك — American Magic Hair",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#111111;line-height:1.8;direction:rtl;text-align:right;">
          <h2 style="margin:0 0 18px 0;">American Magic Hair</h2>
          <p>مرحبًا ${safeName}،</p>
          <p>
            يسعدنا جدًا اهتمامك بـ American Magic Hair. لقد استلمنا جميع معلوماتك بنجاح،
            وسيقوم أحد متخصصينا في التوسع الدولي بالتواصل معك قريبًا لمتابعة المحادثة.
          </p>
          <p>
            نحن متحمسون لبحث فرص التعاون والتوزيع معك.
          </p>
          <p>إلى لقاء قريب.</p>
        </div>
      `,
      text: [
        `مرحبًا ${fullName}،`,
        "",
        "يسعدنا جدًا اهتمامك بـ American Magic Hair.",
        "لقد استلمنا جميع معلوماتك بنجاح، وسيقوم أحد متخصصينا في التوسع الدولي بالتواصل معك قريبًا لمتابعة المحادثة.",
        "نحن متحمسون لبحث فرص التعاون والتوزيع معك.",
        "",
        "إلى لقاء قريب.",
        "American Magic Hair",
      ].join("\n"),
    };
  }

  return {
    subject: "We received your request — American Magic Hair",
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111111;line-height:1.8;">
        <h2 style="margin:0 0 18px 0;">American Magic Hair</h2>
        <p>Hello ${safeName},</p>
        <p>
          Thank you for your interest in American Magic Hair. We have successfully received
          your information, and one of our international expansion specialists will contact you soon
          to continue the conversation.
        </p>
        <p>
          We look forward to exploring distribution and business opportunities with you.
        </p>
        <p>See you soon.</p>
      </div>
    `,
    text: [
      `Hello ${fullName},`,
      "",
      "Thank you for your interest in American Magic Hair.",
      "We have successfully received your information, and one of our international expansion specialists will contact you soon to continue the conversation.",
      "We look forward to exploring distribution and business opportunities with you.",
      "",
      "See you soon.",
      "American Magic Hair",
    ].join("\n"),
  };
}

export async function POST(request: Request) {
  try {
    const missingEnvVars = getMissingEnvVars();

    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing environment variables: ${missingEnvVars.join(", ")}`,
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as LeadPayload;

    const fullName = (body.fullName ?? "").trim();
    const company = (body.company ?? "").trim();
    const email = (body.email ?? "").trim();
    const country = (body.country ?? "").trim();
    const phoneCode = (body.phoneCode ?? "").trim();
    const phoneNumber = (body.phoneNumber ?? "").trim();
    const interestType = (body.interestType ?? "").trim();
    const language = (body.language ?? "").trim() || "English";

    if (
      !fullName ||
      !company ||
      !email ||
      !country ||
      !phoneCode ||
      !phoneNumber ||
      !interestType
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    const recipients = normalizeRecipients(process.env.LEAD_RECIPIENTS || "");

    if (recipients.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "LEAD_RECIPIENTS is empty.",
        },
        { status: 500 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT);

    if (!Number.isFinite(smtpPort) || smtpPort <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "SMTP_PORT is invalid.",
        },
        { status: 500 }
      );
    }

    const rejectUnauthorizedEnv = parseBooleanEnv(
      process.env.SMTP_TLS_REJECT_UNAUTHORIZED
    );

    const smtpHost = process.env.SMTP_HOST!.trim();

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        servername: smtpHost,
        rejectUnauthorized:
          rejectUnauthorizedEnv === undefined ? true : rejectUnauthorizedEnv,
      },
    });

    await transporter.verify();

    const safeFullName = escapeHtml(fullName);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safeCountry = escapeHtml(country);
    const safePhone = escapeHtml(`${phoneCode} ${phoneNumber}`);
    const safeInterestType = escapeHtml(interestType);
    const safeLanguage = escapeHtml(language);

    const internalSubject = `Novo Lead — American Magic Hair — ${fullName}`;

    const internalHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111111;line-height:1.6;">
        <h2 style="margin:0 0 18px 0;">Novo Lead — American Magic Hair</h2>
        <table cellpadding="10" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:760px;">
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>Nome</strong></td>
            <td style="border:1px solid #dddddd;">${safeFullName}</td>
          </tr>
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>Empresa</strong></td>
            <td style="border:1px solid #dddddd;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>E-mail</strong></td>
            <td style="border:1px solid #dddddd;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>País</strong></td>
            <td style="border:1px solid #dddddd;">${safeCountry}</td>
          </tr>
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>WhatsApp / Telefone</strong></td>
            <td style="border:1px solid #dddddd;">${safePhone}</td>
          </tr>
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>Tipo de interesse</strong></td>
            <td style="border:1px solid #dddddd;">${safeInterestType}</td>
          </tr>
          <tr>
            <td style="border:1px solid #dddddd;background:#f7f7f7;"><strong>Linguagem</strong></td>
            <td style="border:1px solid #dddddd;">${safeLanguage}</td>
          </tr>
        </table>
      </div>
    `;

    const internalText = [
      "Novo Lead — American Magic Hair",
      `Nome: ${fullName}`,
      `Empresa: ${company}`,
      `E-mail: ${email}`,
      `País: ${country}`,
      `WhatsApp / Telefone: ${phoneCode} ${phoneNumber}`,
      `Tipo de interesse: ${interestType}`,
      `Linguagem: ${language}`,
    ].join("\n");

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: recipients,
      replyTo: email,
      subject: internalSubject,
      text: internalText,
      html: internalHtml,
    });

    const autoReply = getAutoReplyContent(language, fullName);

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });

    return NextResponse.json({
      success: true,
      message: "Lead sent successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json(
      {
        success: false,
        error: `SMTP error: ${message}`,
      },
      { status: 500 }
    );
  }
}