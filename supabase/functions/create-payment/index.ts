import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Payment function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { bookingData } = await req.json();
    logStep("Received booking data", { serviceId: bookingData.serviceId, amount: bookingData.totalCost });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create payment intent for one-off payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(bookingData.totalCost * 100), // Convert to cents
      currency: "usd",
      metadata: {
        service_id: bookingData.serviceId,
        service_name: bookingData.serviceName,
        guests: bookingData.guests.toString(),
        booking_date: bookingData.bookingDate,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
      },
    });

    logStep("Payment intent created", { paymentIntentId: paymentIntent.id });

    // Create booking record
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        service_id: bookingData.serviceId,
        service_name: bookingData.serviceName,
        booking_date: bookingData.bookingDate,
        guests: bookingData.guests,
        total_cost: bookingData.totalCost,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        special_requirements: bookingData.specialRequirements,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'pending',
      })
      .select()
      .single();

    if (bookingError) {
      logStep("Error creating booking", { error: bookingError });
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    logStep("Booking created successfully", { bookingId: booking.id });

    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking.id,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});