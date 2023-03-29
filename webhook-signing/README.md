# Webhook Signing
This is an example of receiving and verifying a Webhook using Deno.

**Note that this requires Deno v1.28 or greater.**

## Setup

1. Follow instructions for installing [Deno](https://deno.land/#installation).

## Running

You can run your application using:

```
 STRIPE_API_KEY="<YOUR API KEY HERE>"\
 STRIPE_WEBHOOK_SIGNING_SECRET="<YOUR WEBHOOK SIGNING HERE>"\
   deno run\
  --allow-net\
  --allow-env\
  main.js
```

Note that this makes use of a number of Deno flags:

1. `--allow-net`: Required permission for network access (to issue API calls).
1. `--allow-env`: Required permission for environment variable access (`STRIPE_API_KEY`).
