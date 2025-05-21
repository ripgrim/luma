import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  
  interface VerificationCodeEmailProps {
    verificationCode?: string;
  }

  
  export default function VerificationCodeEmail({
    verificationCode,
  }: VerificationCodeEmailProps) {
    return (
      <Html>
        <Head />
        <Body style={main}>
          <Preview>Luma Email Verification</Preview>
          <Container style={container}>
            <Section style={coverSection}>
              <Section style={imageSection}>
                <Img
                  src="https://luma-restack.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75"
                  width="75"
                  height="auto"
                  alt="Luma's Logo"
                />
              </Section>
              <Section style={upperSection}>
                <Heading style={h1}>Verify your email address</Heading>
                <Text style={mainText}>
                   Thanks for signing up for my waitlist 😁
                </Text>
                <Section style={verificationSection}>
                  <Text style={verifyText}>Verification code</Text>
  
                  <Text style={codeText}>{verificationCode}</Text>
                  <Text style={validityText}>
                    (This code is valid for 10 minutes)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section style={lowerSection}>
                <Text style={cautionText}>
                  Luma will never email you and ask you to disclose
                  or verify your password, credit card, or banking account number.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
  
  VerificationCodeEmail.PreviewProps = {
    verificationCode: '596853',
  } satisfies VerificationCodeEmailProps;
  
  const main = {
    backgroundColor: '#fff',
    color: '#212121',
  };
  
  const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
  };

  // Geist font stack for consistent text rendering across email clients
  const geistFontStack = 
    "Geist, 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  
  const h1 = {
    color: '#333',
    fontFamily: geistFontStack,
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  };
  
  const link = {
    color: '#2754C5',
    fontFamily: geistFontStack,
    fontSize: '14px',
    textDecoration: 'underline',
  };
  
  const text = {
    color: '#333',
    fontFamily: geistFontStack,
    fontSize: '14px',
    margin: '24px 0',
  };
  
  const imageSection = {
    backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const coverSection = { backgroundColor: '#fff' };
  
  const upperSection = { padding: '25px 35px' };
  
  const lowerSection = { padding: '25px 35px' };
  
  const footerText = {
    ...text,
    fontSize: '12px',
    padding: '0 20px',
  };
  
  const verifyText = {
    ...text,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center' as const,
  };
  
  const codeText = {
    ...text,
    fontWeight: 'bold',
    fontSize: '36px',
    margin: '10px 0',
    textAlign: 'center' as const,
  };
  
  const validityText = {
    ...text,
    margin: '0px',
    textAlign: 'center' as const,
  };
  
  const verificationSection = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const mainText = { ...text, marginBottom: '14px' };
  
  const cautionText = { ...text, margin: '0px' };
  