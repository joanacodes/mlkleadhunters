---
title: "Never send cold emails from your main domain"
date: 2026-09-09
description: "Cold email always carries some deliverability risk. Secondary domains absorb it so your company's real inbox never pays for it."
tags: ["infrastructure"]
---
## The rule

Cold emails go out from domains that look like yours but are not yours. If your company is example.com, campaigns are sent from something like example-team.com or tryexample.com, which redirect to your real site. Your real domain, the one your clients and suppliers write to, ==never sends a single cold email==.

## Why

Inbox providers score every sending domain. Cold email, however careful, produces more bounces, more ignored messages and occasionally a spam complaint than ordinary correspondence. Over time that lowers the domain's reputation. If the domain is your main one, your invoices, your quotes and your replies to clients start landing in spam too. Recovering a burnt main domain takes months and sometimes never fully succeeds.

==A secondary domain costs a few euros a year.== If it gets damaged, you retire it and register another. The risk is contained.

## How many you need

For a small campaign, two or three domains with two or three mailboxes each. Each mailbox sends a few dozen emails a day at most, so the total volume stays natural. Larger campaigns scale by adding domains, not by pushing each one harder.

## Setting them up properly

Each domain needs the three records that prove its emails are legitimate: SPF, DKIM and DMARC. It needs a custom tracking domain if you track opens or clicks, so that the tracking links do not point to the sending tool. It needs a website, even a one-page redirect to your main site, because providers check. And it needs warm-up before any cold email is sent: two to three weeks of ordinary-looking exchanges that build its reputation from nothing.

## The tell-tale mistakes

Sending from the main domain "just for a test." Registering a domain and sending the same day. Using free webmail addresses. Putting ten mailboxes on one domain. Each of these shows up as a drop in inbox placement within weeks, and the cure is slower than the prevention.

## The upside

Done properly, secondary domains make cold email boring: emails land, replies come in, and your company's real inbox is exactly as healthy as it was before.
