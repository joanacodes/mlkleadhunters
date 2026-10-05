---
title: "SPF, DKIM and DMARC explained in plain English"
date: 2026-09-17
description: "The three DNS records that tell inbox providers your email is really from you. What each does, and the settings that work for cold email."
tags: ["infrastructure"]
---
## Why they exist

Anyone can type any address in the From field of an email. Inbox providers therefore check three signals before trusting a message: does the sending server have permission to send for this domain (SPF), is the message signed with a key only the domain owner has (DKIM), and what does the domain owner want done with messages that fail (DMARC). ==Without all three, cold email lands in spam or is refused outright.==

## SPF

SPF is a text record on your domain listing the servers allowed to send email for it. If you send through Google Workspace and a cold email tool, both must be included. One record per domain; two SPF records cancel each other. Keep it under ten lookups, which is a technical limit that long records hit easily.

## DKIM

DKIM adds a cryptographic signature to every email, and a public key in your DNS lets providers verify it. Your mailbox provider gives you the key to publish; it is a longer text record with a selector name. If the record is wrong, signatures fail silently and reputation drops without an obvious error.

## DMARC

DMARC tells providers what to do when SPF or DKIM fail: nothing, quarantine, or reject. It also sends you reports. For a cold email domain, start with `p=none` while you confirm everything passes, then move to `p=quarantine`. A domain with no DMARC record at all is increasingly treated as suspicious by Gmail and Microsoft.

## The checklist for a sending domain

- One SPF record including every sender you use.
- DKIM published for each mailbox provider, and verified.
- DMARC present, at least `p=none` with a reporting address.
- A custom tracking domain so links point to you, not the tool.
- Forward and reverse DNS consistent for the sending server.
- A placement test before the first campaign, and another after any change.

## How to check

Send a message to a fresh Gmail address and open "Show original": it lists SPF, DKIM and DMARC as PASS or FAIL. Free online checkers do the same for the DNS records themselves. Do this once per domain before warm-up starts; ==fixing it after reputation has dropped takes far longer==.
