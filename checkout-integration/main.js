import { serveListener } from "https://deno.land/std@0.116.0/http/server.ts";

import Stripe from "npm:stripe@^11.16";

const stripe = Stripe(Deno.env.get("STRIPE_API_KEY"), {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  httpClient: Stripe.createFetchHttpClient(),
});

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// This handler will be called for every incoming request.
async function handler(request) {
  /*
   * Sample checkout integration which redirects a customer to a checkout page
   * for the specified line items.
   *
   * See https://stripe.com/docs/payments/accept-a-payment?integration=checkout.
   */
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  return Response.redirect(session.url, 303);
}

await serveListener(server, handler);
