// src/pages/api/submit-form.js
export const POST = async ({ request, env }) => {
    try {
      // Access the secret from the `env` object
      const secretKey = import.meta.env.SECRET_TURNSTILE_SECRET_TOKEN;
  
      console.log("Secret Key via env:", secretKey);
  
      if (!secretKey) {
        return new Response(
          JSON.stringify({ success: false, message: "Secret key is missing." }),
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
      const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secretKey, response: token }),
      });
  
      const result = await verificationResponse.json();
  
      if (!result.success) {
        return new Response(
          JSON.stringify({ success: false, message: "Turnstile verification failed." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Process the form data (e.g., save to a database or send an email)
      console.log("Form submitted successfully:", { name, email, message });
  
      return new Response(
        JSON.stringify({
          success: true,
          message: "Form submitted successfully!",
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