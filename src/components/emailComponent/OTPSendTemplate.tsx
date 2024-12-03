import { FC } from "react";

interface VerificationEmailProps {
  email: string;
  otp: string;
}

const OTPSendTemplate: FC<VerificationEmailProps> = ({ email, otp }) => {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f9",
          color: "#333",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: "600px",
            margin: "40px auto",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <header
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              padding: "20px 15px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Zigbee Community
          </header>
          <div style={{ padding: "25px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Verify Your Email Address
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#555",
                marginBottom: "30px",
                textAlign: "justify",
              }}
            >
              Dear{" "}
              <span style={{ fontWeight: "bold", color: "#007BFF" }}>
                {email}
              </span>
              , <br />
              <br />
              Thank you for connecting with the Zigbee Club, the MCA Community
              at OUTR (formerly CET), Bhubaneswar. Use the code below to
              complete your login process.
            </p>
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                Your OTP Code
              </p>
              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#007BFF",
                  margin: "0",
                }}
              >
                {otp}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              If you didn’t request this email, you can safely ignore it.
            </p>
          </div>
          <footer
            style={{
              padding: "20px 15px",
              backgroundColor: "#f7f7f7",
              textAlign: "center",
              fontSize: "14px",
              color: "#777",
              borderTop: "1px solid #eee",
            }}
          >
            <p style={{ margin: "0 0 8px" }}>
              MCA Community, OUTR Bhubaneswar (CETB)
            </p>
            <p style={{ margin: "0", fontStyle: "italic" }}>
              This is a system-generated email. Please do not reply.
            </p>
            <p style={{ marginTop: "15px" }}>
              <a
                href="https://zigbeeoutr.in/"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Zigbee
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default OTPSendTemplate;