import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// More restrictive CORS headers for security
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://e702b721-8df7-475a-974e-eb87afc0dfba.sandbox.lovable.dev",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface AssessmentRequest {
  companyName: string;
  contactEmail: string;
  contactName: string;
  industry: string;
  companySize: string;
  challenges: string[];
  goals: string[];
  timeline: string;
  budget: string;
  additionalInfo?: string;
}

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per IP per 15 minutes

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize rate limit for this IP
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  clientData.count++;
  return true;
}

function validateInput(data: any): data is AssessmentRequest {
  return (
    typeof data.companyName === 'string' && data.companyName.length > 0 && data.companyName.length < 200 &&
    typeof data.contactEmail === 'string' && data.contactEmail.includes('@') && data.contactEmail.length < 100 &&
    typeof data.contactName === 'string' && data.contactName.length > 0 && data.contactName.length < 100 &&
    typeof data.industry === 'string' && data.industry.length < 100 &&
    typeof data.companySize === 'string' && data.companySize.length < 50 &&
    Array.isArray(data.challenges) && data.challenges.length > 0 &&
    Array.isArray(data.goals) && data.goals.length > 0 &&
    typeof data.timeline === 'string' && data.timeline.length < 50 &&
    typeof data.budget === 'string' && data.budget.length < 50
  );
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const requestData = await req.json();
    
    // Input validation
    if (!validateInput(requestData)) {
      console.log("Invalid input received:", JSON.stringify(requestData, null, 2));
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { 
      companyName, 
      contactEmail, 
      contactName, 
      industry, 
      companySize, 
      challenges, 
      goals, 
      timeline, 
      budget, 
      additionalInfo 
    }: AssessmentRequest = requestData;

    console.log("Processing assessment request for:", companyName);

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Reforzo <noreply@reforzo.com>",
      to: ["business@reforzo.com"],
      subject: `New Business Assessment Request from ${companyName}`,
      html: `
        <h2>New Business Assessment Request</h2>
        <h3>Company Information</h3>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Company Size:</strong> ${companySize}</p>
        
        <h3>Contact Information</h3>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Contact Email:</strong> ${contactEmail}</p>
        
        <h3>Project Details</h3>
        <p><strong>Challenges:</strong> ${challenges.join(', ')}</p>
        <p><strong>Goals:</strong> ${goals.join(', ')}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        ${additionalInfo ? `<p><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
        
        <p>Please follow up with this lead as soon as possible.</p>
      `,
    });

    console.log("Business notification email sent:", businessEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Reforzo <noreply@reforzo.com>",
      to: [contactEmail],
      subject: "Thank you for your business assessment request",
      html: `
        <h2>Thank you for contacting Reforzo, ${contactName}!</h2>
        <p>We have received your business assessment request for <strong>${companyName}</strong>.</p>
        
        <h3>What happens next?</h3>
        <p>Our team will review your request and get back to you within 24-48 hours with:</p>
        <ul>
          <li>A detailed analysis of your requirements</li>
          <li>Customized solutions for your challenges</li>
          <li>A proposed timeline and budget estimate</li>
        </ul>
        
        <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
        
        <p>Best regards,<br>The Reforzo Team</p>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Assessment request submitted successfully" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in secure send-assessment function:", error);
    
    return new Response(JSON.stringify({ 
      error: "Internal server error. Please try again later." 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);