---
title: "SPF, DKIM et DMARC expliqués simplement"
date: 2026-09-17
description: "Les trois enregistrements DNS qui disent aux messageries que votre email vient bien de vous. Ce que fait chacun, et les réglages qui marchent pour le cold email."
tags: ["infrastructure"]
---
## Pourquoi ils existent

N’importe qui peut écrire n’importe quelle adresse dans le champ expéditeur d’un email. Les messageries vérifient donc trois signaux avant de faire confiance à un message : le serveur qui envoie a-t-il le droit d’envoyer pour ce domaine (SPF), le message est-il signé avec une clé que seul le propriétaire du domaine possède (DKIM), et que veut le propriétaire qu’on fasse des messages qui échouent (DMARC). ==Sans les trois, le cold email tombe en spam ou est refusé.==

## SPF

SPF est un enregistrement texte sur votre domaine qui liste les serveurs autorisés à envoyer pour lui. Si vous envoyez via Google Workspace et un outil de cold email, les deux doivent y figurer. Un seul enregistrement par domaine ; deux enregistrements SPF s’annulent. Restez sous dix « lookups », une limite technique que les enregistrements longs atteignent vite.

## DKIM

DKIM ajoute une signature cryptographique à chaque email, et une clé publique dans votre DNS permet aux messageries de la vérifier. Votre fournisseur de boîte vous donne la clé à publier ; c’est un enregistrement texte plus long, avec un nom de sélecteur. S’il est faux, les signatures échouent en silence et la réputation baisse sans erreur visible.

## DMARC

DMARC dit aux messageries quoi faire quand SPF ou DKIM échouent : rien, mettre en quarantaine, ou rejeter. Il vous envoie aussi des rapports. Pour un domaine de cold email, commencez avec `p=none` le temps de confirmer que tout passe, puis passez à `p=quarantine`. Un domaine sans aucun enregistrement DMARC est de plus en plus traité comme suspect par Gmail et Microsoft.

## La liste de contrôle d’un domaine d’envoi

- Un seul enregistrement SPF, avec chaque expéditeur que vous utilisez.
- DKIM publié pour chaque fournisseur de boîte, et vérifié.
- DMARC présent, au moins `p=none` avec une adresse de rapport.
- Un domaine de suivi personnalisé, pour que les liens pointent vers vous et non vers l’outil.
- DNS direct et inverse cohérents pour le serveur d’envoi.
- Un test de placement avant la première campagne, et un autre après tout changement.

## Comment vérifier

Envoyez un message à une adresse Gmail toute neuve et ouvrez « Afficher l’original » : SPF, DKIM et DMARC y apparaissent en PASS ou FAIL. Des vérificateurs en ligne gratuits font de même pour les enregistrements DNS eux-mêmes. Faites-le une fois par domaine avant le début de la chauffe ; ==corriger après une chute de réputation prend bien plus longtemps==.
