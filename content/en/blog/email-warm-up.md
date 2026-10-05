---
title: "Email warm-up: what it is and how long it takes"
date: 2026-09-25
description: "New mailboxes have no reputation. Warm-up builds one before the first cold email goes out: what happens, how long it takes, and the signs it worked."
tags: ["infrastructure"]
---
## The problem warm-up solves

A brand-new domain and mailbox have no history. Inbox providers treat them with suspicion, and a sudden burst of outbound email from them is exactly what spammers do. Send fifty cold emails on day one and most of them will never reach an inbox.

## What warm-up is

Warm-up is a period during which the new mailbox sends and receives ordinary-looking emails with other real mailboxes: short messages, replies, messages taken out of spam and marked as important. Modern sending tools automate this through a network of mailboxes that exchange with each other. Over two to three weeks the volume rises gradually and the mailbox earns a reputation.

## How long

==Two weeks is the minimum for a fresh domain; three is safer==, and four for a domain registered the same month. Warm-up does not stop when campaigns start: a lower level of it continues in the background to keep the reputation steady.

## The settings that matter

- Start at a handful of warm-up emails a day and ramp to twenty or thirty.
- Keep a high reply rate in the warm-up exchanges; replies are the strongest trust signal.
- Do not send any cold email during the initial period, not even "one test."
- Once campaigns start, cap each mailbox at a few dozen cold emails a day and keep the warm-up running.

## Signs it worked

A placement test, sent to fresh Gmail and Outlook addresses, lands in the inbox rather than spam or promotions. Bounce rates on the first real sends stay under two percent. Open rates, if you track them, are in the range you would expect for ordinary email.

## Signs it did not

Placement tests landing in spam, a sudden drop in opens, bounces above a few percent, or replies that mention the message arrived in junk. When that happens, pause the mailbox, check the DNS records, lower the volume and let warm-up run again. Pushing through a bad reputation makes it worse.

## The honest cost

Warm-up is why a proper cold email setup takes three to four weeks before the first campaign. ==Skipping it saves two weeks and costs the campaign.==
