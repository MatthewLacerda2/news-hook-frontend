# News-Hook

A service for natural-language based alerts

**You setup alerts and we keep monitoring for when they happen**

The alerts requests come in what we call "alert prompts". Just like you'd say to a friend or assistant:
- "Inform me when [movie-name] gets a release date"
- "Tell me when [rumor] is either confirmed or denied"
- "Alert me on any tariffs news between USA and Brazil"

We might not know when and even if the alert will be fulfilled. The alert can be a one-time thing or recurring

**The alerts are triggered on user-created or webscraped data**

- When and if a document comes that fulfills an alert, we send the alert via http request

- It's a *natural-language webhook triggered by real-life news*

# How to run:

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

At the first time, run ```npm install``` to install the dependencies. Then, run ```npm run dev```

The project will use the production api. If you're doing changes to the backend, you might wanna change the BASE_PATH at `runtime.ts` to target localhost

# What's the infrastructure

## Alert-Prompt / Alert-Request

- We get the POST request for an alert
    - An LLM validates the request based on semantic rules (must be clear, unambiguous, possible, etc). See "prompts.py" for that
- Valid requests will get stored
    - Their prompts will be vector-embedded
    - We extract keywords from them
- We keep monitoring
    - Periodically webscraping sources / Receiving user-created documents
    - Pgvector-search to see which alert-prompts are related to the scraped document
    - Keyword filtering
        - The document must contain at least one keyword extracted from the prompt
    - We ask an LLM for verification
        - The LLM confirms that the document fulfills the alert-request
    - We ask an LLM to generate a payload
    - We send the alert via HTTP request

# Pricing model

The cost for the alert-requests and events will be:
- The input and output tokens for:
    - The alert prompt
    - The documents sent by the user
    - The alert-sending / generation
- The api requests themselves