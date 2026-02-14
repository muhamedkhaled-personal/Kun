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

interface SubscriptionConfirmedEmailProps {
  name: string;
  plan: string;
  dashboardUrl: string;
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

const planBadgeStyles: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#D4A843",
  color: "#0D0D0D",
  padding: "8px 16px",
  borderRadius: "4px",
  fontWeight: "600",
  fontSize: "14px",
  margin: "16px 0",
};

const featureBoxStyles: React.CSSProperties = {
  backgroundColor: "#1a1a1a",
  borderRadius: "6px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "left",
};

const featureListStyles: React.CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
};

const featureItemStyles: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.8",
  margin: "12px 0",
  color: "#FFFFFF",
};

const checkmarkStyles: React.CSSProperties = {
  color: "#D4A843",
  marginRight: "8px",
  fontWeight: "700",
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

const getPlanFeatures = (plan: string): string[] => {
  const planLower = plan.toLowerCase();

  if (planLower === "pro") {
    return [
      "Unlimited strategy refinements",
      "Priority AI analysis and insights",
      "Custom positioning statement generation",
      "Advanced content recommendations",
      "Strategy export in multiple formats",
      "Email support (24-hour response)",
    ];
  }

  if (planLower === "business") {
    return [
      "Everything in Pro, plus:",
      "Advanced team collaboration features",
      "Multiple stakeholder accounts",
      "Custom brand guidelines document",
      "Quarterly strategy review sessions",
      "Priority phone and email support",
      "Custom integrations and API access",
      "Dedicated success manager",
    ];
  }

  return [
    "Enhanced AI capabilities",
    "Priority processing",
    "Advanced analytics",
    "Premium support",
  ];
};

export default function SubscriptionConfirmedEmail({
  name,
  plan,
  dashboardUrl,
}: SubscriptionConfirmedEmailProps) {
  const features = getPlanFeatures(plan);

  return (
    <Html style={baseStyles}>
      <Head />
      <Preview>Welcome to Kun {plan} — Subscription Confirmed</Preview>
      <Body style={containerStyles}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <Section style={headerSectionStyles}>
            <Text style={subtitleStyles}>Subscription Confirmed</Text>
            <Text style={titleStyles}>Welcome to Kun {plan}</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSectionStyles}>
            <Text style={bodyTextStyles}>
              Hi <span style={accentTextStyles}>{name}</span>,
            </Text>

            <Text style={bodyTextStyles}>
              Thank you for subscribing! Your account has been upgraded and you
              now have access to premium features designed to accelerate your
              personal brand strategy.
            </Text>

            <div style={planBadgeStyles as React.CSSProperties}>
              {plan} Plan Active
            </div>

            <Hr
              style={{
                borderColor: "#1a1a1a",
                margin: "32px 0",
              }}
            />

            {/* Features Section */}
            <Text
              style={{
                fontSize: "14px",
                color: "#888",
                margin: "0 0 16px 0",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Your {plan} Membership Includes:
            </Text>

            <Section style={featureBoxStyles}>
              {features.map((feature, index) => (
                <div key={index}>
                  <Text style={featureItemStyles}>
                    <span style={checkmarkStyles}>✓</span>
                    {feature}
                  </Text>
                </div>
              ))}
            </Section>

            <Hr
              style={{
                borderColor: "#1a1a1a",
                margin: "32px 0",
              }}
            />

            <Text style={bodyTextStyles}>
              Your account is now fully activated. Dive into your dashboard to
              explore all the advanced tools and features available to you.
            </Text>

            <Text
              style={{
                fontSize: "14px",
                color: "#888",
                margin: "24px 0",
              }}
            >
              Billing & Support
            </Text>

            <Text style={{ fontSize: "14px", color: "#fff", margin: "12px 0" }}>
              You'll receive a billing confirmation shortly. Your subscription
              will automatically renew unless canceled.
            </Text>

            <Text style={{ fontSize: "14px", color: "#fff", margin: "12px 0" }}>
              Have questions? Our support team is here to help. Reply to this
              email or visit the help center in your dashboard.
            </Text>

            <Button href={dashboardUrl} style={buttonStyles}>
              Explore Dashboard
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
              Next Steps: Complete your strategy, generate content, and share
              your positioning with your professional community.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { SubscriptionConfirmedEmail };
