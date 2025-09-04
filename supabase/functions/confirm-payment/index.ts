import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CONFIRM-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Confirm payment function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { paymentIntentId } = await req.json();
    logStep("Received payment intent ID", { paymentIntentId });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    logStep("Retrieved payment intent", { status: paymentIntent.status });

    // Update booking status based on payment status
    let bookingStatus = 'pending';
    if (paymentIntent.status === 'succeeded') {
      bookingStatus = 'confirmed';
    } else if (paymentIntent.status === 'canceled') {
      bookingStatus = 'cancelled';
    }

    const { data: booking, error: updateError } = await supabaseClient
      .from("bookings")
      .update({ status: bookingStatus })
      .eq('stripe_payment_intent_id', paymentIntentId)
      .select()
      .single();

    if (updateError) {
      logStep("Error updating booking", { error: updateError });
      throw new Error(`Failed to update booking: ${updateError.message}`);
    }

    logStep("Booking updated successfully", { bookingId: booking.id, status: bookingStatus });

    return new Response(JSON.stringify({
      success: true,
      booking: booking,
      paymentStatus: paymentIntent.status,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in confirm-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});