import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AssessmentRequest {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  solutions: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, businessName, businessType, solutions }: AssessmentRequest = await req.json();

    // Send notification email to your business email
    console.log('Attempting to send business notification email...');
    const businessEmailResponse = await resend.emails.send({
      from: "Assessment Requests <onboarding@resend.dev>",
      to: ["fabioivandro04@gmail.com"],
      subject: `New Assessment Request from ${businessName}`,
      html: `
        <h1>New Business Assessment Request</h1>
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        
        <h2>Solutions Needed</h2>
        <p>${solutions}</p>
        
        <hr>
        <p><em>This assessment request was submitted through the Reforzo website.</em></p>
      `,
    });

    if (businessEmailResponse.error) {
      console.error('Business email error:', businessEmailResponse.error);
      throw new Error(`Failed to send business notification: ${businessEmailResponse.error.message}`);
    }

    // Send confirmation email to the user
    console.log('Attempting to send user confirmation email...');
    const userEmailResponse = await resend.emails.send({
      from: "Reforzo Team <onboarding@resend.dev>",
      to: [email],
      subject: "We received your assessment request!",
      html: `
        <h1>Thank you for your assessment request, ${name}!</h1>
        <p>We have received your business assessment request for <strong>${businessName}</strong> and will review it carefully.</p>
        
        <h2>What happens next?</h2>
        <ul>
          <li>Our experts will analyze your business needs within 24 hours</li>
          <li>You'll receive a personalized assessment report</li>
          <li>We'll schedule a consultation to discuss our recommendations</li>
          <li>We'll provide you with a customized action plan</li>
        </ul>
        
        <p>If you have any immediate questions, please don't hesitate to reach out to us.</p>
        
        <p>Best regards,<br>The Reforzo Team</p>
        
        <hr>
        <p><em>This is an automated confirmation email. Please do not reply to this email.</em></p>
      `,
    });

    if (userEmailResponse.error) {
      console.error('User email error:', userEmailResponse.error);
      throw new Error(`Failed to send user confirmation: ${userEmailResponse.error.message}`);
    }

    console.log("Business notification email sent successfully:", businessEmailResponse);
    console.log("User confirmation email sent successfully:", userEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Assessment request submitted successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-assessment function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);