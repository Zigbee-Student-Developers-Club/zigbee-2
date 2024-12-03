import OTPSendTemplate from "@/components/emailComponent/OTPSendTemplate";
import { resend } from "./config";

export const sendVerificationEmail = async (email: string, otp: string) => {
  try {
    const { error } = await resend.emails.send({
      from: "Zigbee MCA Department, OUTR (CETB) <noreply@urlsnip.online>",
      to: email,
      subject: "Verification Code for Zigbee Login",
      react: OTPSendTemplate({ email, otp }),
    });

    if (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
};
