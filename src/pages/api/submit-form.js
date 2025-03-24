// src/pages/api/submit-form.js
export const POST = async ({ request }) => {
    try {
      // Parse form data
      const formData = await request.formData();
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const token = formData.get("cf-turnstile-response");
  
      // Retrieve the secret key from the environment variable
      const secretKey = process.env.SECRET_TURNSTILE_SECRET_TOKEN;
  
      if (!secretKey) {
        return new Response(
          JSON.stringify({ error: "Server misconfigured. Missing secret key." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      // Verify the Turnstile token
      const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
        }),
      });
  
      const result = await verificationResponse.json();
  
      // Check if the Turnstile token is valid
      if (!result.success) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid Turnstile token. Please try again." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      // Process the form data (e.g., save to a database or send an email)
      console.log({ name, email, message });
  
      // Return a success response
      return new Response(
        JSON.stringify({ success: true, message: "Form submitted successfully!" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error processing form submission:", error);
  
      // Return an error response
      return new Response(
        JSON.stringify({ success: false, message: "An unexpected error occurred." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };