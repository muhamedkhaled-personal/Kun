import { Resend } from "resend";

// Initialize Resend client with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

export { resend };

interface SendEmailProps {
  to: string;
  subject: string;
  react: React.ReactElement;
}

interface SendEmailResponse {
  success: boolean;
  error?: string;
}

/**
 * Sends an email using Resend with React Email template
 * @param to - Recipient email address
 * @param subject - Email subject line
 * @param react - React Email component to render
 * @returns Object with success status and optional error message
 */
export async function sendEmail({
  to,
  subject,
  react,
}: SendEmailProps): Promise<SendEmailResponse> {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      return {
        success: false,
        error: "RESEND_FROM_EMAIL environment variable is not set",
      };
    }

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      react,
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
