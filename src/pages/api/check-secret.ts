export async function GET() {
    try {
      // Access the secret key from environment variables
      const SECRET_TURNSTILE_SECRET_TOKEN = import.meta.env.SECRET_TURNSTILE_SECRET_TOKEN;
  
      // Log the secret key for debugging purposes (only visible in server logs)
      console.log('SECRET_TURNSTILE_SECRET_TOKEN:', SECRET_TURNSTILE_SECRET_TOKEN);
  
      // Return a generic success message (do NOT expose the secret key in the response)
      if (!SECRET_TURNSTILE_SECRET_TOKEN) {
        return new Response(
          JSON.stringify({ success: false, message: 'Secret key is missing or undefined.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(
        JSON.stringify({ success: true, message: 'Secret key is configured correctly.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error during secret key verification:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'An error occurred during verification.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }