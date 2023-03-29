import { serveListener } from "https://deno.land/std@0.116.0/http/server.ts";

import Stripe from "npm:stripe@^11.16";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY"));

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// This handler will be called for every incoming request.
async function handler(request) {
  const signature = request.headers.get("Stripe-Signature");

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text();
  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET"),
      undefined
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  // Secondly, we use this event to query the Stripe API in order to avoid
  // handling any forged event. If available, we use the idempotency key.
  const requestOptions =
    receivedEvent.request && receivedEvent.request.idempotency_key
      ? {
          idempotencyKey: receivedEvent.request.idempotency_key,
        }
      : {};

  let retrievedEvent;
  try {
    retrievedEvent = await stripe.events.retrieve(
      receivedEvent.id,
      requestOptions
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  return new Response(JSON.stringify(retrievedEvent), { status: 200 });
}

await serveListener(server, handler);
