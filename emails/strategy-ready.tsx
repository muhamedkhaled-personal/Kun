import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

interface StrategyReadyEmailProps {
  name: string;
  strategyUrl: string;
  positioning: string;
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
  margin: "0 0 8px 0",
  color: "#D4A843",
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

const positioningBoxStyles: React.CSSProperties = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #D4A843",
  borderRadius: "6px",
  padding: "32px 24px",
  margin: "32px 0",
};

const positioningTextStyles: React.CSSProperties = {
  fontSize: "18px",
  fontStyle: "italic",
  color: "#D4A843",
  margin: "0",
  lineHeight: "1.6",
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

export default function StrategyReadyEmail({
  name,
  strategyUrl,
  positioning,
}: StrategyReadyEmailProps) {
  return (
    <Html style={baseStyles}>
      <Head />
      <Preview>Your Brand Strategy is Ready</Preview>
      <Body style={containerStyles}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <Section style={headerSectionStyles}>
            <Text style={subtitleStyles}>Strategy Complete</Text>
            <Text style={titleStyles}>Your Brand Is Ready</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSectionStyles}>
            <Text style={bodyTextStyles}>
              Hi <span style={accentTextStyles}>{name}</span>,
            </Text>

            <Text style={bodyTextStyles}>
              Congratulations! Your personal brand strategy has been crafted by
              our AI system. Your unique positioning statement is ready to guide
              your professional journey.
            </Text>

            {/* Positioning Preview */}
            <Section style={positioningBoxStyles}>
              <Text style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>
                Your Positioning
              </Text>
              <Text style={positioningTextStyles}>{positioning}</Text>
            </Section>

            <Text style={bodyTextStyles}>
              This positioning statement captures your core strengths, unique
              value, and the impact you're positioned to make. Use it as the
              foundation for your professional presence.
            </Text>

            <Hr
              style={{
                borderColor: "#1a1a1a",
                margin: "32px 0",
              }}
            />

            <Text style={{ fontSize: "14px", color: "#888", margin: "16px 0" }}>
              Your full strategy includes:
            </Text>

            <Section
              style={{
                textAlign: "left",
                margin: "16px auto",
                maxWidth: "400px",
              }}
            >
              <Text style={{ fontSize: "14px", margin: "8px 0", color: "#fff" }}>
                ✓ Core values and unique strengths
              </Text>
              <Text style={{ fontSize: "14px", margin: "8px 0", color: "#fff" }}>
                ✓ Positioning statement
              </Text>
              <Text style={{ fontSize: "14px", margin: "8px 0", color: "#fff" }}>
                ✓ Key messaging pillars
              </Text>
              <Text style={{ fontSize: "14px", margin: "8px 0", color: "#fff" }}>
                ✓ Content and visibility roadmap
              </Text>
            </Section>

            <Button href={strategyUrl} style={buttonStyles}>
              View Full Strategy
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
              Next: Download your strategy and share your positioning statement
              with your professional community.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { StrategyReadyEmail };
