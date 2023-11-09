# PROJECT: Digital Safe Deposit Box API

## Introduction

Create a digital safe deposit box that lets users add items and keep them safe from peepers. Security-ish is a security company whose main business is taking care of houses and people's belongings.

Their first product launch is this API, an (unsafe) remote-control safebox that they sell to their customer in order to keep their belongings as safe as possible, providing them the ability to control their safebox remotely through a mobile app.

## Current Status

The CEO of Security-ish, who does not have a technical background, has paid for an external consultant to develop the first version of the product.

These guys have created an API definition (with OpenAPI) with the main endpoints of it, but once they start coding they broke their collaboration. So the CEO is looking for someone who could help her to create the first version of that API. The CEO is not a techie, and he spent a lot of money to make this product a reality. So, despite the low level of security described in the definition of the API, he wants to go ahead and launch this first version. So, let's give it a try!

## Requirements

The CEO has sent us the following business requirements:

- Each safebox will have a unique id, a non-empty name, and a password.
- The safebox has to allow the following actions:
  - Add content to the safebox (based on the generated id)
  - Get the content of the safebox (based on the generated id)
- All endpoints have to be secured with Basic Auth (using name & password)
- You should ensure that the password is strong enough

## What Are We Looking For?

- A well-designed solution and architecture. Avoid duplication, and extract re-usable code where makes sense. We want to see that you can create an easy-to-maintain codebase.
- Test as much as you can. One of the main pain points of maintaining others' code comes when it does not have tests. So try to create tests covering, at least, the main classes.
- Document your decisions. The CEO has a non-tech background so try to explain your decisions, as well as any other technical requirements (how to run the API, external dependencies, etc ...)