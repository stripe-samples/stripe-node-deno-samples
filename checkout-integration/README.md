# Checkout Integration
This is an example Checkout integration using Deno. This is based on 
https://stripe.com/docs/payments/accept-a-payment?integration=checkout.

**Note that this requires Deno v1.16 or greater.**

## Setup

1. Follow instructions for installing [Deno](https://deno.land/#installation).

## Running

You can run your application using:

```
 STRIPE_API_KEY="<YOUR API KEY HERE>"\
   deno run\
  --allow-net\
  --allow-env\
  main.js
```

Note that this makes use of a number of Deno flags:

1. `--allow-net`: Required permission for network access (to issue API calls).
1. `--allow-env`: Required permission for environment variable access (`STRIPE_API_KEY`).
