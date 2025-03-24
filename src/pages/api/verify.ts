// Define your secret key securely (use environment variables)
const SECRET_TURNSTILE_SECRET_TOKEN = import.meta.env.SECRET_TURNSTILE_SECRET_TOKEN;

export async function POST({ request }: { request: Request }) {
  try {
    // Parse the incoming request body
    const formData = await request.formData();
    const token = formData.get('cf-turnstile-response'); // Get the Turnstile token
    const clientIp = request.headers.get('CF-Connecting-IP') || ''; // Optional: Get the client IP

    // Validate input
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: 'No Turnstile token provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare the data to send to Cloudflare's Turnstile API
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: SECRET_TURNSTILE_SECRET_TOKEN,
        response: token,
        remoteip: clientIp, // Optional: Include the client IP for additional validation
      }),
    });

    // Parse the response from Turnstile API
    const result: TurnstileResponse = await turnstileResponse.json();

    // Log the result for debugging purposes
    console.log('Turnstile API response:', result);

    // Check if the token is valid
    if (result.success) {
      return new Response(
        JSON.stringify({ success: true, message: 'Turnstile verification successful.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Log errors if needed
      console.error('Turnstile verification failed. Error codes:', result['error-codes']);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Turnstile verification failed.',
          errors: result['error-codes'], // Include error codes in the response
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error during Turnstile verification:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'An error occurred during verification.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Define TypeScript interfaces for type safety
interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string; // Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname?: string; // Hostname of the site where the challenge was solved
}