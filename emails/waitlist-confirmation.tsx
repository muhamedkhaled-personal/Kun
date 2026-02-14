import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from "@react-email/components";

interface WaitlistConfirmationEmailProps {
  email: string;
}

const baseStyles = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const containerStyles: React.CSSProperties = {
  backgroundColor: "#0D0D0D",
  color: "#FFFFFF",
  margin: "0",
  padding: "0",
};

const sectionStyles: React.CSSProperties = {
  padding: "40px 20px",
};

const headerSectionStyles: React.CSSProperties = {
  ...sectionStyles,
  textAlign: "center",
  borderBottom: "1px solid #1a1a1a",
};

const titleStyles: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "700",
  margin: "0 0 16px 0",
  color: "#FFFFFF",
};

const subtitleStyles: React.CSSProperties = {
  fontSize: "14px",
  color: "#888888",
  margin: "0",
  textTransform: "uppercase",
  letterSpacing: "2px",
};

const contentSectionStyles: React.CSSProperties = {
  ...sectionStyles,
  textAlign: "center",
};

const bodyTextStyles: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px 0",
  color: "#FFFFFF",
};

const accentTextStyles: React.CSSProperties = {
  color: "#D4A843",
  fontWeight: "600",
};

const footerSectionStyles: React.CSSProperties = {
  ...sectionStyles,
  borderTop: "1px solid #1a1a1a",
  textAlign: "center",
  fontSize: "12px",
  color: "#666666",
};

const footerTextStyles: React.CSSProperties = {
  margin: "8px 0",
  fontSize: "12px",
};

export default function WaitlistConfirmationEmail({
  email,
}: WaitlistConfirmationEmailProps) {
  return (
    <Html style={baseStyles}>
      <Head />
      <Preview>You're on the Kun waitlist — we'll notify you at launch!</Preview>
      <Body style={containerStyles}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <Section style={headerSectionStyles}>
            <Text style={titleStyles}>You're In!</Text>
            <Text style={subtitleStyles}>Kun Waitlist</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSectionStyles}>
            <Text style={bodyTextStyles}>
              Thanks for joining the{" "}
              <span style={accentTextStyles}>Kun</span> waitlist.
            </Text>

            <Text style={bodyTextStyles}>
              We're building the AI-powered personal brand strategy platform
              designed for MENA professionals. When we launch, you'll be among
              the first to know.
            </Text>

            <Section
              style={{
                backgroundColor: "#1a1a1a",
                padding: "24px",
                borderRadius: "6px",
                margin: "24px 0",
              }}
            >
              <Text style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
                <span style={accentTextStyles}>UNCOVER</span> your unique value
                proposition
              </Text>
              <Text style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
                <span style={accentTextStyles}>UNLOCK</span> your brand story
                and positioning
              </Text>
              <Text style={{ margin: "0", fontSize: "14px" }}>
                <span style={accentTextStyles}>UNLEASH</span> your brand with a
                complete strategy
              </Text>
            </Section>

            <Hr style={{ borderColor: "#1a1a1a", margin: "32px 0" }} />

            <Text style={{ ...bodyTextStyles, color: "#888888", fontSize: "14px" }}>
              We registered{" "}
              <span style={accentTextStyles}>{email}</span> for early access.
              No action needed — we'll email you when it's time.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerSectionStyles}>
            <Hr style={{ borderColor: "#1a1a1a", marginBottom: "24px" }} />
            <Text style={footerTextStyles}>
              Kun — Your Personal Brand, Strategized by AI
            </Text>
            <Text style={footerTextStyles}>
              You received this because you signed up at kunbranding.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { WaitlistConfirmationEmail };
