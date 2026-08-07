---
layout: post
title: The Kolmogorov Series Theorems
date: 2026-08-07
description: The three Kolmogorov series theorems for almost-sure convergence of sums of independent random variables, the Strong Law of Large Numbers, and the 0-1 Law.
tags: probability
categories: math
toc:
  beginning: true
---

If I choose the $$+$$ sign and the $$-$$ sign uniformly at random and attach them to the terms in the sum $$\sum \frac{1}{n}$$, what is the probability that the resulting sum converges? Questions like this — asking for the probability that $$\sum X_n$$ converges — are answered by the **Kolmogorov Series Theorems**, a set of almost-sure convergence criteria that are both strong and useful. They also give the **Kolmogorov Strong Law of Large Numbers**.

There are three series theorems below, each with progressively weaker conditions. Independence of the $$X_n$$ is required throughout.

## Kolmogorov One Series Theorem

> If $$X_n$$ are independent, all with mean $$0$$, then $$\sum X_n$$ converges a.s. if $$\sum \text{var}(X_n)$$ converges. If the variables are uniformly bounded, the converse holds as well.

**Proof (forward direction).** Let $$X_n$$ be independent, mean zero, with $$\text{var}(X_n) = \sigma_n^2$$. Suppose $$\sum \sigma_n^2 < \infty$$; we show a.e. convergence of $$\sum X_n$$, i.e. that the partial sums $$S_n$$ converge almost surely. Since it's hopeless to guess the limit directly, we use the Cauchy criterion.

First, observe:

$$
P\left(\sup_{n \geq N} |S_n - S_N| \geq \epsilon\right) \leq \frac{\sum_{N+1}^\infty \sigma_m^2}{\epsilon^2}
$$

This follows from Kolmogorov's inequality. Write the event as a limit over maxima of partial sums — probability plays well with limits. Let

$$
A_k = \{\max(|S_{N+1} - S_N|, \dots, |S_{N+k} - S_N|) \geq \epsilon\} = \left\{\max\left(|X_{N+1}|, \dots, \left|\sum_{i=1}^k X_{N+i}\right|\right) \geq \epsilon\right\}
$$

By Kolmogorov's inequality,

$$
P(A_k) \leq \sum_{N+1}^{N+k} \sigma_i^2 / \epsilon^2 \leq \sum_{n > N} \sigma_n^2 / \epsilon^2
$$

Taking $$k \to \infty$$ gives the result.

Since the right-hand side is a tail sum of a convergent series, it can be made as small as we like for sufficiently large $$N$$. So there's a subsequence $$N_k$$ with

$$
P\left(\sup_{n \geq N_k} |S_n - S_{N_k}| \geq \frac{1}{2^k}\right) \leq \frac{1}{2^k}
$$

The sum of these probabilities is finite, so by the Borel–Cantelli Lemma, the probability of the limsup of these events is $$0$$. _(Borel–Cantelli is peak.)_

Finally, if $$\omega \notin A$$, then $$S_n(\omega)$$ is Cauchy — this follows directly from the definition of $$A_k$$.

The converse (uniformly bounded case) we skip here.

## Kolmogorov Strong Law of Large Numbers

> Let $$(X_n)$$ be a sequence of independent, mean-$$0$$ (WLOG) random variables such that $$\sum \frac{\text{var}(X_n)}{n^2}$$ converges. Then $$\frac{\sum_{i=1}^n X_i}{n} \to 0$$ a.e.

**Proof.** This follows directly from the One Series Theorem: $$\sum \frac{\text{var}(X_n)}{n^2} = \sum \text{var}\left(\frac{X_n}{n}\right)$$. Since this converges and each term has mean $$0$$, $$\sum \frac{X_n}{n}$$ converges a.e. Finish by invoking the Cesàro theorem.

## Steinhaus Random Signs Theorem

> If $$+$$ or $$-$$ is chosen uniformly at random (Rademacher variables) and $$\sum a_n$$ converges, then $$\sum \pm a_n$$ converges iff $$\sum a_n^2$$ converges.

**Proof.** Each term has mean $$0$$, and the variance sum is $$\sum a_n^2$$. If this converges, the random sum converges by the One Series Theorem. Conversely, since $$\sum a_n$$ converges, each term is uniformly bounded, so the converse direction of the One Series Theorem gives convergence of the variance sum. $$\blacksquare$$

We now relax the conditions of the series theorem further.

## Kolmogorov Two Series Theorem

We first relax the mean-$$0$$ condition, in exchange for uniform boundedness.

> Let $$(X_n)$$ be independent, uniformly bounded random variables. Then $$\sum X_n$$ converges a.e. iff $$\sum E(X_n)$$ converges and $$\sum \text{var}(X_n)$$ converges.

**Proof.** Let $$E(X_n) = \mu_n$$ and $$\text{var}(X_n) = \sigma_n^2$$.

_Suppose the two series converge._ For each $$X_n$$, $$\lvert X_n\rvert \leq c \implies \lvert \mu_n\rvert \leq c \implies \lvert X_n - \mu_n\rvert \leq 2c$$. Let $$Y_n = X_n - \mu_n$$. Then $$Y_n$$ are mean-zero, uniformly bounded, with $$\sum \text{var}(Y_n)$$ converging. Hence $$\sum Y_n$$ converges a.e. by the One Series Theorem, and since $$\sum \mu_n$$ converges too, $$\sum X_n$$ converges a.e.

_Forward direction._ The idea is to construct an independent copy of $$X_n$$ on a product measure space.

Consider $$(\Omega \times \Omega, \mathcal{A} \otimes \mathcal{A}, P \otimes P = Q)$$, and define $$Y_n(\omega, \eta) = X_n(\omega)$$, $$Z_n(\omega, \eta) = X_n(\eta)$$ — independent copies of $$X_n$$.

**Claim 1.** $$Y_1, Z_1, Y_2, Z_2, \dots$$ are independent. We need, for any $$\alpha_i, \beta_i$$ ($$1 \leq i \leq n$$):

$$
Q(Y_i \leq \alpha_i, Z_i \leq \beta_i;\ 1 \leq i \leq n) = \prod_{i=1}^n Q(Y_i \leq \alpha_i) \prod_{i=1}^n Q(Z_i \leq \beta_i)
$$

This splits into independence among the $$Y_i$$ (similarly $$Z_i$$) and independence of the $$Y_i$$ from the $$Z_i$$ — both follow from the definition of the product measure.

**Claim 2.** $$Y_i - Z_i$$ are independent, since $$\sigma(Y_i)$$ and $$\sigma(Z_i)$$ are independent, hence $$\sigma(Y_i, Z_i)$$ are independent.

**Claim 3.** By Fubini's theorem, $$E(Y_i) = E(X_i) = E(Z_i)$$, and likewise for variances.

The One Series Theorem now finishes the proof.

## Kolmogorov Three Series Theorem

Another relaxation — we no longer need uniform boundedness at all.

> Suppose for some $$c > 0$$, all three series $$\sum P(\lvert X_n\rvert > c)$$, $$\sum E(X_n I_{\lvert X_n\rvert \leq c})$$, and $$\sum \text{var}(X_n I_{\lvert X_n\rvert \leq c})$$ converge. Then $$\sum X_n$$ converges almost surely. Conversely, if the sum converges a.s., the three series converge for every $$c > 0$$ (so convergence at one $$c_1$$ implies convergence at any $$c_2$$).

**Proof (forward).** Let $$Z_n = X_n I_{\lvert X_n\rvert \leq c}$$. The $$Z_n$$ are independent, since each is $$\sigma(X_n)$$-measurable. Since

$$
\sum P(X_n \neq Z_n) = \sum P(|X_n| > c) < \infty
$$

by Borel–Cantelli, $$X_n(\omega) = Z_n(\omega)$$ eventually, so it suffices to show $$\sum Z_n$$ converges a.e. The $$Z_n$$ are independent and bounded by $$c$$, so the Two Series Theorem applies.

**Proof (converse).** Fix $$c > 0$$. With probability one, $$X_n \to 0$$, so $$\lvert X_n(\omega)\rvert > c$$ happens only finitely often — i.e. $$P(\limsup A_n) = 0$$ for $$A_n = \{\lvert X_n(\omega)\rvert > c\}$$. By the second Borel–Cantelli lemma, $$\sum P(A_n)$$ converges.

For the second and third series: since $$X_n = Z_n$$ eventually, $$\sum Z_n$$ converges a.s., and the $$Z_n$$ are uniformly bounded, so the Two Series Theorem gives convergence of the remaining two series.

## The 0-1 Law

Whenever we talk about convergence of a sum of independent random variables, the sum either converges a.s. or diverges a.s. — there's no in-between. Even though the variables are independent and seemingly unrelated, their collective convergence behavior is deterministic. This is the **Kolmogorov 0-1 Law**.

> **Theorem.** Suppose $$\{X_i : i \geq 1\}$$ is a sequence of random variables, and $$A$$ is an event such that $$A \in \sigma\{X_i : i \geq n\}$$ for every $$n$$. Then $$P(A) = 0$$ or $$P(A) = 1$$.

Let $$A = \{\omega : \sum X_i(\omega) \text{ converges}\}$$. Since finitely many terms don't affect convergence, $$A$$ is a tail event, so $$A \in \sigma\{X_i : i \geq n\}$$ for every $$n$$, and the theorem applies: $$\sum X_i$$ converges a.s. or diverges a.s.

This is useful for modeling herd behavior as deterministic at scale — even though individual variables are random and independent, a large collection exhibits typical collective behavior.

**Proof sketch.** If $$\{\mathcal{F}_i\}$$ are independent, then $$\sigma\{\mathcal{F}_i : i \leq n-1\}$$ and $$\sigma\{\mathcal{F}_i : i > n\}$$ are independent for any $$n$$. So it suffices to prove: given independent $$\sigma$$-fields $$(\mathcal{F}_i)_{i \geq 1}$$ with $$\mathcal{F}_i \subset \mathcal{F}$$, let $$\mathcal{T}_n = \sigma\{\mathcal{F}_i : i \geq n\}$$ and $$\mathcal{T} = \bigcap_n \mathcal{T}_n$$ (the _tail $$\sigma$$-field_). Then $$P(A) \in \{0, 1\}$$ for every $$A \in \mathcal{T}$$.

The key idea: the tail $$\sigma$$-field is independent of itself, so $$P(A) = P(A)^2$$, which forces $$P(A) \in \{0, 1\}$$.

To see this, let $$B_n = \sigma(\mathcal{F}_1, \dots, \mathcal{F}_{n-1})$$. Then $$B_n$$ and $$\mathcal{T}_n$$ are independent, and since $$\mathcal{T} \subset \mathcal{T}_n$$ for every $$n$$, $$B_n$$ and $$\mathcal{T}$$ are independent too. Thus $$\mathcal{T}$$ is independent of $$B_\infty = \sigma(\cup_n B_n)$$, which contains $$\mathcal{T}$$ itself. $$\blacksquare$$
