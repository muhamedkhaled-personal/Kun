import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
  Hr,
  Preview,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
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

const frameworkTextStyles: React.CSSProperties = {
  fontSize: "14px",
  color: "#888888",
  margin: "24px 0",
  fontStyle: "italic",
};

const buttonStyles: React.CSSProperties = {
  backgroundColor: "#D4A843",
  color: "#0D0D0D",
  padding: "12px 32px",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  borderRadius: "6px",
  display: "inline-block",
  marginTop: "24px",
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

export default function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html style={baseStyles}>
      <Head />
      <Preview>Welcome to Kun — Your Personal Brand Strategy Awaits</Preview>
      <Body style={containerStyles}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <Section style={headerSectionStyles}>
            <Text style={titleStyles}>Welcome to Kun</Text>
            <Text style={subtitleStyles}>Personal Brand Strategy</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSectionStyles}>
            <Text style={bodyTextStyles}>
              Hi <span style={accentTextStyles}>{name}</span>,
            </Text>

            <Text style={bodyTextStyles}>
              Your journey to a strategically positioned personal brand starts
              now. Kun uses AI to guide you through a powerful framework:
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
                <span style={accentTextStyles}>UNCOVER</span> your core values
                and strengths
              </Text>
              <Text style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
                <span style={accentTextStyles}>UNLOCK</span> your unique
                positioning
              </Text>
              <Text style={{ margin: "0", fontSize: "14px" }}>
                <span style={accentTextStyles}>UNLEASH</span> your personal
                brand to the world
              </Text>
            </Section>

            <Hr
              style={{
                borderColor: "#1a1a1a",
                margin: "32px 0",
              }}
            />

            <Text style={bodyTextStyles}>
              Ready to discover what makes you uniquely valuable? Let's begin.
            </Text>

            <Button href={loginUrl} style={buttonStyles}>
              Start Your Discovery
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footerSectionStyles}>
            <Hr
              style={{
                borderColor: "#1a1a1a",
                marginBottom: "24px",
              }}
            />
            <Text style={footerTextStyles}>
              Kun — Your Personal Brand, Strategized by AI
            </Text>
            <Text style={footerTextStyles}>
              Questions? Reply to this email or visit our help center.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { WelcomeEmail };
