// src/pages/api/submit-form.js
import { Resend } from "resend";

export const POST = async ({ request, env }) => {
  try {
    // Access the secret keys from environment variables
    const turnstileSecretKey = import.meta.env.SECRET_TURNSTILE_SECRET_TOKEN;
    const resendApiKey = import.meta.env.SECRET_RESEND_API_KEY;

    console.log("Turnstile Secret Key via env:", turnstileSecretKey);
    console.log("Resend API Key via env:", resendApiKey);

    if (!turnstileSecretKey || !resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required secret keys.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const token = formData.get("cf-turnstile-response");

    console.log("Form Data:", { name, email, message });

    // Validate required fields
    if (!name || !email || !message || !token) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields or Turnstile token.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify the Turnstile token
    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: turnstileSecretKey, response: token }),
      }
    );

    const result = await verificationResponse.json();

    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, message: "Turnstile verification failed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Initialize Resend client
    const resend = new Resend(resendApiKey);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "contact@communication.charlesgek.com", // Replace with your verified domain in Resend
      to: "kalaydjian.charles@gmail.com",   // Replace with the recipient's email
      subject: `New Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (emailResponse.error) {
      console.error("Error sending email:", emailResponse.error);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to send email." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully:", emailResponse);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully and email sent!",
        data: { name, email, message },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};