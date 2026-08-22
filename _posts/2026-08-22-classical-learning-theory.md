---
layout: post
title: Making Sense of the Boomer Theory
date: 2026-08-22
description: Classical statistical learning theory rebuilt from high-dimensional probability — concentration, chaining, symmetrization, and VC combinatorics.
tags: probability learning-theory
categories: math
toc:
  beginning: true
---

> **A note on the name.** I will call the approach taken by classical statistical learning theory the _boomer approach_, for short.

To make sense of much of the classical theory around machine learning, the aim is first to abstract out all the theory to see what it is really trying to do, and to show that the question is essentially tackled through certain essential probability theory. My first impression of the theory is that the old boomers are really trying to solve these probability questions using clever techniques — none of which, in my opinion, feel "canonical" — to get some loose bounds. I would like to point out that I do not disagree with using probability theory to tackle these questions; my objection is that the methods used do not feel canonical. (There are issues, but we will see them as we see the theory first.)

Essentially, we have a loss from our estimate and a loss from the best possible predictor, and we want to understand this loss.

## The Error Decomposition

The boomer theory cares about the error decomposition.

$$
\begin{aligned}
\mathcal{R}(\hat{f}) - \mathcal{R}(\bar{g})
&= \underbrace{\mathcal{R}(\hat{f}) - \widehat{\mathcal{R}}(\hat{f})}_{\text{generalization}} \\[4pt]
&+ \underbrace{\widehat{\mathcal{R}}(\hat{f}) - \widehat{\mathcal{R}}(\bar{f})}_{\text{optimization}} \\[4pt]
&+ \underbrace{\widehat{\mathcal{R}}(\bar{f}) - \mathcal{R}(\bar{f})}_{\text{concentration}} \\[4pt]
&+ \underbrace{\mathcal{R}(\bar{f}) - \mathcal{R}(\bar{g})}_{\text{approximation}}
\end{aligned}
$$

The errors really source from two things. One is the difference between the empirical and the expected risk, which comes from not seeing everything. The other is our inductive biases influencing the hypothesis class — which itself is needed because we do not know the underlying distribution, and thus possibly does not lead to the best possible predictor. Since we do not know the distribution, each of these terms is a random variable, and so we aim to understand the bounds on them. This becomes a probability question at this point.

At this point it may seem that concentration and generalization can be handled in the same manner. That is untrue. The point of learning is to update our guesses of the best possible estimate as well, hence the function in question in the generalization error continues to change — but that is not so for concentration. Different tools are required, and we can get stronger bounds for concentration if we look at different approaches. Put another way: generalization bounds need more sophisticated tools.

It happens that many of these problems are exactly the problems that the theory of high-dimensional probability investigates. Understanding that theory helps us here.

## On High-Dimensional Probability

Through the historical development of probability theory, four phenomena were observed regularly, and the work of making them precise and quantitative led to applications in multiple areas, including machine learning — though one must point out that a good amount of work is still ongoing in some of them.

**1) Concentration.** Consider a sequence of independent (or sufficiently non-dependent) random variables $$X_1, \dots, X_n$$ and a function $$f(X_1, \dots, X_n)$$. If the function is not very "sensitive" to each of these coordinates, then $$f$$ is close to its mean.

This is exactly the phenomenon we need for our concentration error bound, since the function $$f$$ does not change in that scenario. For generalization, we look at the next one.

**2) Suprema.** The boomer approach is to say that perhaps we can just get a bound for all functions uniformly — controlling the uniform deviations. The phenomenon is:

> If the random process $$\{X_t\}$$ is sufficiently close to its mean, then the magnitude of $$\sup_{t \in T} X_t$$ is controlled by the complexity of the index set $$T$$.

This is where the notions of complexity used in machine learning come in.

**3) Universality.** We skip this for now.

**4) Sharp transitions.** We skip this for now.

## Concentration

We want to look at the fluctuation of $$f$$ with respect to its mean. One thing to check is the variance; then we look for more sophisticated methods.

> **Roadmap.** Bound the variance for a random variable $$X$$; see whether variance tensorizes (it does!); extend that to bounding the variance of a sequence of random variables. After this, look at higher-order bounds, then move to the Chernoff bounds. This gives Hoeffding and Azuma, and then Azuma–Hoeffding. Finally, apply to a certain scenario to get McDiarmid's inequality, and apply that to our machine learning problem.

### Variance Bounds

> **Lemma 1.** The variance of an almost-constant function is almost zero. Precisely, let $$X$$ be any (possibly vector-valued) random variable. Then
>
> $$
> \mathrm{Var}[f(X)] \leq \tfrac{1}{4}(\sup f - \inf f)^2
> \qquad
> \mathrm{Var}[f(X)] \leq \mathbb{E}\big[(f(X) - \inf f)^2\big]
> $$

**Proof.** $$\mathrm{Var}[f(X)] = \mathrm{Var}[f(X) - a] \leq \mathbb{E}[(f(X) - a)^2]$$. Now let $$a = (\sup f + \inf f)/2$$. $$\blacksquare$$

Of course, this is not the high-dimensional result we care about.

If we can deduce bounds for functions of independent random variables $$X_1, \dots, X_n$$ from the individual random variables, then that function is said to **tensorize**. The idea is: variance tensorizes! We denote by $$\mathrm{Var}_i$$ the variance with respect to just the $$i$$-th random variable.

> **Theorem (Tensorization of Variance).** Whenever $$X_1, \dots, X_n$$ are independent,
>
> $$
> \mathrm{Var}[f(X_1, \dots, X_n)] \leq \mathbb{E}\Big[\sum_{i=1}^n \mathrm{Var}_i f(X_1, \dots, X_n)\Big]
> $$
>
> When $$f$$ is linear, equality holds.

The proof is a masterpiece — it introduces the idea called the **martingale method**.

Whenever we have a function of random variables, we can turn it into a martingale called the **Doob martingale**.

By definition of variance (or if you remember the bigger picture), we really care about $$f(X_1, \dots, X_n) - \mathbb{E}f(X_1, \dots, X_n)$$; the variance is the second moment of this. To investigate this bound, we incrementally look at the conditional expectations and try to decompose the difference into a sum of them. That is a very natural thing to do, since $$\mathbb{E}[X \mid Y]$$ is really our best possible guess of $$X$$ given that we know $$Y$$. And we are being given, incrementally, the information provided by $$X_1, \dots, X_n$$.

So we describe that information by the filtration $$\mathcal{F}_k = \sigma(X_1, \dots, X_k)$$, and consider a martingale adapted to it. We convert $$f$$ into the Doob martingale

$$
M_k = \mathbb{E}[f(X_1, \dots, X_n) \mid \mathcal{F}_k]
$$

which satisfies the martingale property by the tower law. Now define the **martingale increment**

$$
\Delta_k = M_k - M_{k-1}
$$

whose sum is the quantity we want to investigate. Observe:

1. $$\mathbb{E}[\Delta_k \mid X_1, \dots, X_{k-1}] = 0$$
2. $$\mathbb{E}[\Delta_k \Delta_l] = 0$$ for $$k \neq l$$
3. Hence $$\mathrm{Var}[f(X_1, \dots, X_n)] = \sum_{k=1}^n \mathbb{E}[\Delta_k^2]$$

We just show the inequality in each term now, which is the tower law plus Jensen's inequality. I leave the details to the reader. $$\blacksquare$$

Observe that this is indeed a concentration phenomenon, as $$\mathrm{Var}_i$$ quantifies the sensitivity of $$f$$ in a given coordinate. But it may not be straightforward to compute, which is why we use a more natural quantifier: the **discrete gradient**. The idea of the theorem is that since you cannot compute $$\mathrm{Var}_i$$, you approximate it using Lemma 1.

Denote by $$D_i$$ the difference of the sup and the inf of $$f$$ where the control is the $$i$$-th coordinate, and by $$D_i^-$$ the difference of the function and the infimum where the control is the $$i$$-th coordinate.

> **Theorem (Bounded Difference Inequalities).** Whenever $$X_1, \dots, X_n$$ are independent,
>
> $$
> \mathrm{Var}[f(X_1, \dots, X_n)] \leq \tfrac{1}{4}\mathbb{E}\Big[\sum_{i=1}^n \big(D_i f(X_1, \dots, X_n)\big)^2\Big]
> $$
>
> $$
> \mathrm{Var}[f(X_1, \dots, X_n)] \leq \mathbb{E}\Big[\sum_{i=1}^n \big(D_i^{-} f(X_1, \dots, X_n)\big)^2\Big]
> $$

These are useful, but often restrictive, as they require $$f$$ to be bounded.

### Subgaussian Concentration

The idea is the following. If a random variable is expected to decay on an exponential or faster scale, it will be subgaussian, and we will develop methods to bound the tail of subgaussian random variables. So the technique works whenever there is fast enough decay. Why consider Gaussians in the first place? The central limit theorem makes it natural, although we could consider other distributions.

First, how do we get tail bounds at all? This is the **Chernoff method**.

$$
\mathbb{P}[X - \mathbb{E}X \geq t]
= \mathbb{P}\big[e^{\lambda(X - \mathbb{E}X)} \geq e^{\lambda t}\big]
\leq \exp(-\psi^*(t))
$$

where $$\psi^*(t) = \sup_{\lambda \geq 0}\{\lambda t - \psi(\lambda)\}$$ is the Legendre dual of the log-moment generating function (also called the cumulant generating function, or CGF).

This gives the lower tail as well — just apply the method to $$-X$$.

> **Definition.** A random variable is **$$\sigma^2$$-subgaussian** if $$\psi(\lambda) \leq \dfrac{\lambda^2\sigma^2}{2}$$ for all $$\lambda \in \mathbb{R}$$. That is, its CGF is bounded by that of the Gaussian.

Then we directly have a bound on the tail probability of a subgaussian variable.

An important check: the Legendre dual of the Gaussian is $$\dfrac{t^2}{2\sigma^2}$$. You may verify this with basic calculus. This is part of the power of introducing the CGF — it is an analytic map.

One of the most interesting results here is that **every bounded random variable is subgaussian**. This is made precise by Hoeffding's lemma, which will be of great importance to us.

> **Lemma (Hoeffding).** Let $$a \leq X \leq b$$ a.s. for reals $$a, b$$. Then $$X$$ is subgaussian with variance proxy $$\dfrac{(b-a)^2}{4}$$.

The proof is another masterpiece, and teaches an important technique.

**Proof.** We may assume WLOG that $$\mathbb{E}X = 0$$. Then

$$
\psi'(\lambda) = \frac{\mathbb{E}[Xe^{\lambda X}]}{\mathbb{E}[e^{\lambda X}]}
\qquad
\psi''(\lambda) = \frac{\mathbb{E}[X^2 e^{\lambda X}]}{\mathbb{E}[e^{\lambda X}]}
- \left(\frac{\mathbb{E}[Xe^{\lambda X}]}{\mathbb{E}[e^{\lambda X}]}\right)^2
$$

Here is the beauty: $$\psi''(\lambda)$$ can be viewed as the variance of $$X$$ after a change of measure with respect to the density

$$
dQ = \frac{e^{\lambda x}}{\mathbb{E}[e^{\lambda x}]}\,dP
$$

which is measurable and non-negative, hence valid. Using the very first variance bound we showed, $$\psi''(\lambda) \leq \dfrac{(b-a)^2}{4}$$.

Now Taylor-expand the CGF with the Lagrange remainder. The first two terms are $$0$$, and we are done. A masterclass. $$\blacksquare$$

This trick is called **exponential tilting**, and is standard in large deviations theory.

### The Martingale Method

Earlier we said the variance of $$f$$ can be bounded by a squared gradient of $$f$$. We want something much stronger: that $$f$$ is subgaussian with variance proxy controlled by the squared gradient.

The issue is that the subgaussian property does **not** tensorize. There are methods to deal with this, but we will do something cruder — the martingale method. Note that just because it is crude does not mean it is not powerful; it applies in many more scenarios than the stronger conditions do. The martingale method is often called the "poor man's tensorization" for sums of martingale increments.

> **Lemma (Azuma).** Let $$\{\mathcal{F}_k\}$$ be any filtration and let $$\{\Delta_k\}_{1:n}$$ satisfy, for $$k = 1, \dots, n$$:
>
> 1. _Martingale difference property:_ $$\Delta_k$$ is $$\mathcal{F}_k$$-measurable and $$\mathbb{E}[\Delta_k \mid \mathcal{F}_{k-1}] = 0$$.
> 2. _Conditional subgaussian property:_ $$\mathbb{E}[e^{\lambda\Delta_k} \mid \mathcal{F}_{k-1}] \leq \exp\!\big(\tfrac{\lambda^2\sigma_k^2}{2}\big)$$ a.s.
>
> Then $$\sum_{k=1}^n \Delta_k$$ is subgaussian with variance proxy $$\sum_{k=1}^n \sigma_k^2$$.

So the sum of martingale differences is bounded if they are conditionally subgaussian — in particular, if they are bounded.

**Proof.** We need to look at

$$
\mathbb{E}\big[e^{\lambda \sum_1^n \Delta_k}\big]
= \mathbb{E}\Big[e^{\lambda \sum_1^{n-1}\Delta_k}\,\mathbb{E}\big[e^{\lambda \Delta_n} \mid \mathcal{F}_{n-1}\big]\Big]
\leq \exp\!\Big(\frac{\lambda^2\sigma_n^2}{2}\Big)\,\mathbb{E}\big[e^{\lambda\sum_1^{n-1}\Delta_k}\big]
$$

The inner expectation comes out by the tower property; then we simply descend in this fashion, chaining the inequalities. $$\blacksquare$$

Apply this lemma together with Hoeffding's lemma, and you uncreatively get the great concentration theorem:

> **Theorem (Azuma–Hoeffding).** Let $$\{\mathcal{F}_k\}$$ be any filtration and let $$\Delta_k, A_k, B_k$$ be such that the first satisfies the martingale difference property and the other two sandwich $$\Delta$$, being predictable sequences. Then $$\sum_{k=1}^n \Delta_k$$ is subgaussian with variance proxy $$\dfrac{1}{4}\sum_{1}^n \lVert B_k - A_k\rVert^2_{\infty}$$.

This is often applied by letting $$X_1, \dots, X_n$$ be independent with $$a_i \leq X_i \leq b_i$$ and setting $$\Delta_k = \frac{X_k - \mathbb{E}X_k}{n}$$, which yields

$$
\mathbb{P}\Big[\frac{1}{n}\sum_{i=1}^n (X_i - \mathbb{E}X_i) \geq t\Big]
\leq \exp\!\Big(\frac{-2nt^2}{(b-a)^2}\Big)
$$

Observe that this bound does not care about the distribution of $$X$$, so it can get somewhat weak in a specific scenario.

Using this theorem, we get the first subgaussian concentration inequality.

> **Theorem (McDiarmid).** For $$X_1, \dots, X_n$$ independent, $$f(X_1, \dots, X_n)$$ is subgaussian with variance proxy $$\frac{1}{4}\sum_{k=1}^{n}\lVert D_k f\rVert^2_{\infty}$$. In particular,
>
> $$
> \mathbb{P}\big[f(X_1, \dots, X_n) - \mathbb{E}f(X_1, \dots, X_n) \geq t\big]
> \leq \exp\!\Big(-\frac{2t^2}{\sum_{k=1}^n \lVert D_k f\rVert^2_{\infty}}\Big)
> $$

For concentration we are generally dealing with independent samples, and in the classification case we have a sequence of independent bounded random variables. So using McDiarmid (which reduces to the softer Hoeffding), we get that with probability at least $$1 - \delta$$,

$$
R_z(f) - \hat{R}_z(f)
= \mathbb{E}Z_i - \frac{1}{n}\sum_{i=1}^{n}Z_i
\leq \sqrt{\dfrac{1}{2n}\ln\Big(\frac{1}{\delta}\Big)}
$$

Very naively, if our hypothesis class is finite, we get the inequality for the sup by union bounding: $$\delta$$ is just multiplied by the size of the hypothesis class. This proves that finite hypothesis classes are uniformly convergent, and hence PAC learnable. It does not work for infinite classes.

## Generalization

For generalization, the simplest thing would be to get a uniform bound on $$\sup_{f \in H} R_z(f) - \hat{R}_z(f)$$, and that is what the boomer theory does. Let us see how to control this.

> **Roadmap.** Solve for maximising over finitely many functions; then approximately reduce to this case; then introduce combinatorial notions of complexity that describe how well we can do this reduction.

### Finite Maxima

The crudest thing we can do is

$$
\mathbb{E}\big[\sup_{t\in T} X_t\big] \leq \lvert T\rvert \sup_{t \in T}\mathbb{E}\lvert X_t\rvert
$$

But why stop here? Let us consider higher moments, and then further still, the moment generating functions.

> **Lemma (Maximal Inequality).** Suppose $$\log \mathbb{E}[\exp(\lambda X_t)] \leq \psi(\lambda)$$ for all $$\lambda \geq 0$$ and $$t \in T$$, where $$\psi$$ is convex and $$\psi(0) = \psi'(0) = 0$$. Then
>
> $$
> \mathbb{E}\big[\sup_{t \in T} X_t\big] \leq \psi^{*-1}(\log \lvert T\rvert)
> $$
>
> In particular, if $$X_t$$ is subgaussian for every $$t \in T$$,
>
> $$
> \mathbb{E}\big[\sup_{t \in T} X_t\big] \leq \sqrt{2\sigma^2 \log \lvert T\rvert}
> $$

**Proof.** By Jensen's inequality, for any $$\lambda > 0$$,

$$
\mathbb{E}\big[\sup_{t \in T}X_t\big] \leq \frac{1}{\lambda}\log \mathbb{E}\big[\exp(\lambda \sup_{t \in T} X_t)\big]
$$

since the exponential is convex; we apply Jensen to the function applied to $$\mathbb{E}[\lambda Y]$$. Now we do the crudest thing:

$$
\mathbb{E}\big[\sup_{t \in T}X_t\big]
\leq \frac{1}{\lambda}\log \sum_{t \in T} \mathbb{E}[\exp(\lambda X_t)]
\leq \frac{\log \lvert T\rvert + \psi(\lambda)}{\lambda}
$$

Now optimise over $$\lambda$$. The only remaining thing is invertibility of the dual operator — but it is a supremum of convex functions, hence convex, and it is also strictly increasing and non-negative. $$\blacksquare$$

This lemma should be viewed as an analogue of the Chernoff method for suprema. It is at the heart of the more sophisticated things we are going to do. That is not a coincidence, since we can use the Chernoff method to directly compute the tail probabilities. This can be done easily, so I leave it as an exercise.

The method is sharp when the variables are independent, but it is easy to see it can be terrible otherwise, since we have made no assumption on their joint distribution — just consider the case when they are all the same.

### Covering, Packing, and Approximation

The lack of independence can actually help us when $$T$$ is infinite. For example, if $$t \mapsto X_t$$ is continuous, the variables are strongly dependent when the indices are nearby, so we can make statements about the suprema by considering somewhat distant points. All these methods are pretty natural; even the continuity example is well motivated, as the Gaussian process satisfies it.

> **Definition (Lipschitz Process).** The random process $$\{X_t\}_{t \in T}$$ is **Lipschitz** for a metric $$d$$ on $$T$$ if there exists a random variable $$C$$ such that
>
> $$
> |X_t - X_s| \leq C\,d(t, s) \qquad \text{for all } t, s \in T
> $$

Using this, we aim to control the supremum by observing over some finite set $$N$$ instead of $$T$$. There are two competing demands: we would like $$N$$ as small as possible, so the maximum is small; but to control the approximation error we must ensure every point of $$T$$ is close to at least one point of $$N$$.

> **Definition ($$\epsilon$$-net and covering number).** A set $$N$$ is an **$$\epsilon$$-net** for $$(T, d)$$ if for every $$t \in T$$ there is $$\pi(t) \in N$$ with $$d(t, \pi(t)) < \epsilon$$. The smallest cardinality of an $$\epsilon$$-net is the **covering number**:
>
> $$
> N(T, d, \epsilon) := \inf \{\lvert N\rvert : N \text{ is an } \epsilon\text{-net for }(T, d)\}
> $$

There are two viewpoints to hold about this:

1. It is a **complexity measure** for our index set. The more complex, the larger the covering number. Remember the phenomenon given at the beginning of this primer.
2. It describes the **geometry** of the metric space $$(T, d)$$.

The second follows from the easily checked equivalence

$$
N \text{ is an } \epsilon\text{-net} \iff T \subseteq \bigcup_{t \in N} B(t, \epsilon)
$$

Thus the covering number is the smallest number of balls of radius $$\epsilon$$ needed to cover $$T$$, and can be viewed as a measure of the degree of non-compactness of $$(T, d)$$. (Recall a set in a metric space is compact iff it is complete and totally bounded; this is the total boundedness part.)

> **Lemma (Lipschitz Maximal Inequality).** Suppose $$\{X_t\}_{t \in T}$$ is a Lipschitz process where each term is $$\sigma^2$$-subgaussian. Then
>
> $$
> \mathbb{E}\big[\sup_{t \in T}X_t\big] \leq \inf_{\epsilon > 0}\Big\{\epsilon\,\mathbb{E}[C] + \sqrt{2\sigma^2\log N(T, d, \epsilon)}\Big\}
> $$

This is the crudest quantification of the phenomenon described. The proof is easy:

$$
\sup_{t \in T}X_t \leq \sup_{t \in T}\{X_t - X_{\pi(t)}\} + \sup_{t \in T}\{X_{\pi(t)}\}
$$

The second term is a finite max, so we use the first inequality there; the expectation of the first term is bounded by the Lipschitz assumption. Thus

$$
\mathbb{E}\big[\sup_{t \in T}X_t\big] \leq \epsilon\,\mathbb{E}[C] + \sqrt{2\sigma^2\log \lvert N\rvert}
$$

Now take the infimum over $$\epsilon$$. $$\blacksquare$$

How do we quantify the trade-off, though? We want $$N$$ dense but not large. This gives rise to another definition that brings the tension to the front.

> **Definition (Packing number).** A set $$N \subseteq T$$ is an **$$\epsilon$$-packing** of $$(T, d)$$ if $$d(t, t') > \epsilon$$ for every pair of distinct points in $$N$$. The largest possible cardinality is the **packing number**:
>
> $$
> D(T, d, \epsilon) := \sup \{\lvert N\rvert : N \text{ is an } \epsilon\text{-packing of } (T, d)\}
> $$

> **Lemma (Duality between covering and packing).** For every $$\epsilon > 0$$,
>
> $$
> D(T, d, 2\epsilon) \leq N(T, d, \epsilon) \leq D(T, d, \epsilon)
> $$

I will skip the proof; it is short and intuition-based.

The issue is that the sense in which we are considering continuity is too crude — it is an almost-sure sense. We should upgrade it to an "in probability" sense, capturing the typical size of the increments instead of the worst case. This can be done with another wonderful technique: **chaining**.

### The Chaining Method

Go back to the proof where we broke up the suprema. The second term — the remainder — is essentially a finite maximum, so it is easy to control. We used the Lipschitz property to directly control the first term, but we want to weaken that assumption, so we analyse it more.

The size of each term $$X_t - X_{\pi(t)}$$ is typically $$\epsilon$$, but the supremum can be much larger. So we are back to the same problem, albeit over a smaller set. Nonetheless the situation must be better, since we expect the terms to be smaller than the original.

To shrink further, consider an $$\epsilon/2$$-net, and continue that chain by dividing by $$2$$. This is the **chaining method**: approximate $$X_t$$ by a chain $$X_{\pi_k(t)}$$ of increasingly accurate approximations, the links being the chain increments $$X_{\pi_k(t)} - X_{\pi_{k-1}(t)}$$. The main difficulty is showing the remainder term vanishes as $$n \to \infty$$.

For this we assume the process is **separable**. We can also weaken the Lipschitz assumption to subgaussian. Why? We want to say the process is sufficiently continuous, so the tail of the difference — in terms of the metric between indices — should fall. Exponential decay corresponds to the subgaussian assumption.

> **Definition (Subgaussian process).** A random process $$\{X_t\}_{t \in T}$$ on $$(T, d)$$ is **subgaussian** if $$\mathbb{E}[X_t] = 0$$ and
>
> $$
> \mathbb{E}[\exp(\lambda(X_t - X_s))] \leq \exp(\lambda^2 d(t, s)^2/2)
> $$

> **Theorem (Dudley).** Let $$\{X_t\}_{t \in T}$$ be a separable subgaussian process on $$(T, d)$$. Then
>
> $$
> \mathbb{E}\big[\sup_{t \in T} X_t\big] \leq 6 \sum_{k \in \mathbb{Z}} 2^{-k}\sqrt{\log N(T, d, 2^{-k})}
> $$

**Proof.** First analyse $$\lvert T\rvert < \infty$$, then use separability to lift the restriction.

Since we are dividing by $$2$$, let $$k_0$$ be the largest integer with $$2^{-k_0} \geq \operatorname{diam}(T)$$. Then any singleton $$N_{k_0}$$ is trivially a $$2^{-k_0}$$-net, so we start chaining at this scale. For $$k > k_0$$, let $$N_k$$ be the corresponding net. Thus

$$
\mathbb{E}\big[\sup_{t \in T}X_t\big]
\leq \mathbb{E}[X_{t_0}]
+ \sum_{k = k_0 + 1}^{n}\mathbb{E}\big[\sup_{t \in T}\{X_{\pi_k(t)} - X_{\pi_{k-1}(t)}\}\big]
+ \mathbb{E}\big[\sup_{t \in T}\{X_t - X_{\pi_n(t)}\}\big]
$$

The first term is $$0$$ by assumption (just take the process centred WLOG). By choosing $$n$$ sufficiently large, the last term also disappears. Observe that the $$k$$-th term in the sum contains at most $$\lvert N_k\rvert^2$$ terms. We can also estimate the distances:

$$
d(\pi_k(t), \pi_{k-1}(t)) \leq d(t, \pi_k(t)) + d(t, \pi_{k-1}(t)) \leq 3 \times 2^{-k}
$$

Now the subgaussian property gives the result. Separability lifts this to general $$T$$: we have a countable dense set where this holds, so monotone convergence extends it. $$\blacksquare$$

This sum is a Riemann sum approximation, which makes the result neater.

> **Corollary (Entropy Integral).** Let $$\{X_t\}_{t \in T}$$ be a separable subgaussian process on $$(T, d)$$. Then
>
> $$
> \mathbb{E}\big[\sup_{t \in T} X_t\big] \leq 12 \int_0^{\infty} \sqrt{\log N(T, d, \epsilon)}\, d\epsilon
> $$

This is called the entropy integral because $$\log N(T, d, \epsilon)$$ is the **metric entropy**. Again, by the standard method, we have a corresponding tail inequality.

So let us apply this to our scenario. Surprise, surprise — it is useless applied directly! To satisfy the subgaussian property we use boundedness of our random variables via the sup norm, and with that the covering number for the corresponding metric is practically useless. Take a specific example: for the class of all threshold functions the sup distance is $$1$$, so for any $$\epsilon < 1$$ the covering number is infinite.

So something more is needed. The specific class we are dealing with must be studied in more detail.

## Empirical Processes and Combinatorics

The considerations of interest to us fall into the category of **empirical processes**. An empirical process is $$\{G_n(f)\}_{f \in \mathcal{F}}$$ over a class of functions $$\mathcal{F}$$, where

$$
G_n(f) = \sqrt{n}\,(\mu_n f - \mu f)
$$

with $$\mu_n$$ the empirical mean and $$\mu$$ the mean. Empirical processes are closely related to Gaussian processes by the multivariate central limit theorem.

Since the suprema cannot be controlled by the uniform metric, we need to understand better how empirical processes resemble Gaussian ones in the limit. I now show another peak method that brings out the "Gaussian nature" of an empirical process: **symmetrization**.

### Symmetrization

First, what is the central limit theorem doing? Look at the sum $$\sum_{k=1}^n f(X_k) - \mu f$$. In the worst case this should be $$O(n)$$, but the CLT tells us the order is $$O(\sqrt{n})$$ in probability, because there are many cancellations from the negative terms. This cancellation between terms of different signs is a key mechanism of the CLT. The remaining distributional features just determine the scale of the limit — the variance. Symmetrization does precisely this.

> **Lemma (Rademacher symmetrization).** Let $$X_1, \dots, X_n$$ be i.i.d. with distribution $$\mu$$, and let $$\mathcal{F}$$ be a class of functions. Then
>
> $$
> \begin{aligned}
> \mathbb{E}\Big[\sup_{f \in \mathcal{F}}\Big\lvert \sum_{k=1}^n (f(X_k) - \mu f)\Big\rvert\Big]
> &\leq \mathbb{E}\Big[\sup_{f \in \mathcal{F}}\Big\lvert \sum_{k=1}^n \varepsilon_k(f(X_k) - f(Y_k))\Big\rvert\Big] \\[4pt]
> &\leq 2\,\mathbb{E}\Big[\sup_{f \in \mathcal{F}}\Big\lvert \sum_{k=1}^n (f(X_k) - \mu f)\Big\rvert\Big]
> \end{aligned}
> $$
>
> where $$Y_1, \dots, Y_n$$ are independent copies of $$X_1, \dots, X_n$$, and $$\varepsilon_1, \dots, \varepsilon_n$$ are i.i.d. symmetric Bernoulli (Rademacher) variables independent of $$X, Y$$.

**Proof.** Since $$f(Y_k)$$ is independent of $$X_{1:n}$$, we have $$\mu f = \mathbb{E}[f(Y_k) \mid X_{1:n}]$$. Substituting this (and writing $$f(X_k) = \mathbb{E}[f(X_k) \mid X_{1:n}]$$) rewrites the expression as

$$
\mathbb{E}\Big[\sup_{f \in \mathcal{F}}\Big\lvert \sum_{k=1}^n \mathbb{E}[f(X_k) - f(Y_k) \mid X_{1:n}]\Big\rvert\Big]
$$

By Jensen's inequality we take the inner expectation outside while getting an upper bound. (Observe that when we do so, the expectation becomes a product expectation over the spaces of $$X$$ and $$Y$$, which are the same, but we suppress that. For Jensen we use that a supremum of convex functions is convex, and that linear functions are convex.) Thus

$$
\mathbb{E}\Big[\sup_{f \in \mathcal{F}}\Big\lvert \sum_{k=1}^n (f(X_k) - \mu f)\Big\rvert\Big]
\leq \mathbb{E}\Big[\sup_{f \in \mathcal{F}}\Big\lvert \sum_{k=1}^{n}\{f(X_k) - f(Y_k)\}\Big\rvert\Big]
$$

Since $$f(X_k) - f(Y_k)$$ is symmetric, it has the same law as $$\varepsilon_k\{f(X_k) - f(Y_k)\}$$ for fixed Rademacher variables; so by the law of total probability, choosing the Rademachers uniformly at random gives the same law. That is the first inequality. The second follows from the triangle inequality. $$\blacksquare$$

Now look at the empirical process we have created:

$$
Z_n(f) = \frac{1}{\sqrt{n}}\sum_{k=1}^{n}\varepsilon_k\{f(X_k) - f(Y_k)\}
$$

We could still apply Azuma–Hoeffding, which shows the subgaussian property with respect to the supremum norm — but as discussed, that is not a good route. Observe instead: the $$\varepsilon_k$$ are independent of the remaining randomness, so we should apply our method **conditionally** on $$X, Y$$, leaving the Gaussian part. Thus

$$
Z_n(f) - Z_n(g) = \sum_{k=1}^{n}\varepsilon_k\Big[\tfrac{1}{\sqrt{n}}\big(f(X_k) - g(X_k) - f(Y_k) + g(Y_k)\big)\Big]
$$

Call each bracket $$c_k$$. Symmetrization has thus handed us a **random metric** $$d_n$$ on $$\mathcal{F}$$ (remember we read off the metric from the subgaussian variance proxy):

$$
d_n(f, g) = \Big[\frac{1}{n}\sum_{k=1}^{n}c_k^2\Big]^{1/2}
$$

Taking $$n \to \infty$$, the law of large numbers gives that this metric converges to $$2\,\mathrm{Var}_\mu[f - g]^{1/2}$$, which is the natural metric for the Gaussian case. We have successfully done the isolation. Now apply the machinery we developed:

$$
\mathbb{E}\Big[\sup_{f \in \mathcal{F}} \lvert G_n(f)\rvert\Big]
\lesssim \mathbb{E}\Big[\int_{0}^{\infty} \sqrt{\log N(\mathcal{F}, d_n, \varepsilon)}\, d\varepsilon\Big]
$$

But the issues do not stop: now we must deal with the random metric, which means dealing with the random geometry of $$(\mathcal{F}, d_n)$$.

Before moving on, here is another form of symmetrization, useful in many cases:

$$
\begin{aligned}
\mathbb{E}\Big[\sup_{f \in \mathcal{F}} \sum_{k=1}^n \{f(X_k) - \mu f\}\Big]
&\le 2\,\mathbb{E}\Big[\sup_{f \in \mathcal{F}} \sum_{k=1}^n \varepsilon_k f(X_k)\Big] \\[4pt]
&\le \sqrt{2\pi}\,\mathbb{E}\Big[\sup_{f \in \mathcal{F}} \sum_{k=1}^n g_k f(X_k)\Big]
\end{aligned}
$$

where the $$\varepsilon_i$$ are Rademacher and the $$g_i$$ are i.i.d. standard normal, independent of $$X$$. This is **Gaussian symmetrization**. The middle term is the **Rademacher complexity** (more precisely, the complexity omits the factor $$2$$).

This introduces the natural random metric induced by Gaussian symmetrization, which suffices in many applications:

$$
\|f - g\|_{L^2(\mu_n)} = \Big[\frac{1}{n} \sum_{k=1}^n \{f(X_k) - g(X_k)\}^2\Big]^{1/2}
$$

Moreover, we can control the uniform deviation by the supremum of the **true** Gaussian process conditional on $$X$$, not just a subgaussian one — though this rarely makes a difference in applications. As usual, we can bound not only the expectation but the tail probabilities too; I will not go over that here.

Let us connect this with our machine learning problem. Call the supremum of $$G_n(f)$$ over $$f$$ by $$\phi(S)$$, as it is completely sample-dependent. In binary classification, $$\phi(S) - \phi(S') \leq \frac{1}{m}$$, where $$m$$ is the sample size (both samples having the same cardinality). By McDiarmid, for any $$\delta > 0$$, with probability at least $$1 - \delta/2$$,

$$
\phi(S) \leq \mathbb{E}_S[\phi(S)] + \sqrt{\frac{\log{\frac{2}{\delta}}}{2m}}
$$

and we bound the first term by twice the Rademacher complexity $$R_m(\mathcal{F})$$ of the class on samples of size $$m$$.

For now, let us get back to the machinery — the Dudley integral. We did so much work to get an improved metric; the real issue is now actually estimating the covering number. This in turn helps estimate the Rademacher complexity.

## Vapnik–Chervonenkis Combinatorics

Back to the bound from Gaussian symmetrization:

$$
\mathbb{E}\Big[\sup_{f \in \mathcal{F}} G_n(f)\Big]
\lesssim \mathbb{E}\Big[\int_{0}^{\infty} \sqrt{\log N(\mathcal{F}, \|\cdot\|_{L^2(\mu_n)}, \varepsilon)}\, d\varepsilon\Big]
$$

We deal with the intermediate problem, where we compute this covering number uniformly. Surprisingly, the combinatorial structure of $$\mathcal{F}$$ makes it possible to control its uniform covering numbers very effectively — while covering in sup norm gives useless bounds, as we saw. Consider $$\mathcal{F}$$ as the class of all binary classification hypotheses, with $$\mathcal{C}$$ the class over which we range the indicator function.

Symmetrization gained us two advantages:

1. The symmetrized bounds require covering only in $$L^2$$ rather than $$L^\infty$$.
2. The symmetrized bound involves only norms supported on the finite set $$\operatorname{supp} \mu_n$$ — because we removed $$\mu f$$ from the term inside.

Analysing the second point:

$$
N(\mathcal{C}, \|\cdot\|_{L^2(\mu_n)}, \epsilon)
\leq N(\mathcal{C}, \|\cdot\|_{L^\infty(\mu_n)}, \epsilon)
= \lvert \mathcal{C} \cap \{X_1, \dots, X_n\}\rvert
$$

This intersection consists of subsets of at most $$n$$ points, so it is bounded by $$2^n$$, giving an upper bound of $$\sqrt{n}$$ for the desired quantity — pretty trivial. To obtain something non-trivial we must exploit the structure of $$\mathcal{C}$$. It turns out that in many cases this quantity is much less than $$2^n$$.

**Example (the empirical distribution function).** Let the sample space be $$\mathbb{R}$$ and $$\mathcal{C} = \{(-\infty, x] : x \in \mathbb{R}\}$$. Then clearly

$$
\lvert \mathcal{C} \cap \{X_1, \dots, X_n\}\rvert \leq n + 1
$$

much smaller than before. This also implies a non-trivial result:

> **Theorem (Glivenko–Cantelli).** Let $$X_1, \dots, X_n$$ be i.i.d. real-valued with distribution $$\mu$$. By the law of large numbers the empirical distribution $$F_n(x) = \mu_n((-\infty, x])$$ converges a.s. to $$F(x)$$ for every $$x \in \mathbb{R}$$ — but in fact the convergence is **uniform**.

The proof follows directly from the Dudley entropy integral (which gives convergence of the expectation); you can deduce a.s. convergence from convergence of the mean using McDiarmid and Borel–Cantelli.

**Example (rectangles).** Let the sample space be $$\mathbb{R}^2$$ and $$\mathcal{C}$$ the set of axis-aligned rectangles. Then

$$
\lvert \mathcal{C} \cap \{X_1, \dots, X_n\}\rvert \leq n^4
$$

Fix the set of points. For any rectangle there is a smallest rectangle with the same intersection — just remove the unnecessary space — so WLOG consider only minimal rectangles. Each minimal rectangle is determined by specifying four points of $$\{X_1, \dots, X_n\}$$, so there are at most $$n^4$$ possibilities.

One might therefore gain the intuition that the cardinality of the intersection captures the **degrees of freedom** of the class $$\mathcal{C}$$. For $$\mathcal{C}$$ of dimension $$1$$ we got order $$n$$; for four degrees of freedom (the vertices) we got order $$n^4$$. In general we expect this for larger $$d$$. So we formalise that combinatorial notion of dimension.

> **Definition (Shattering).** A set $$I$$ in the sample space is **shattered** by $$\mathcal{C}$$ if $$\mathcal{C} \cap I = 2^{I}$$ — that is, for every $$J \subseteq I$$ there exists $$C \in \mathcal{C}$$ with $$C \cap I = J$$.

> **Definition (VC dimension).** The **Vapnik–Chervonenkis dimension** of $$\mathcal{C}$$ is
>
> $$
> \mathrm{vc}(\mathcal{C}) := \sup \{\lvert I\rvert : I \text{ is shattered by } \mathcal{C}\}
> $$

So this is the largest set all of whose subsets we can obtain by intersecting with our hypothesis class.

But $$2^n$$ is not very comforting. Happily, there is a wonderful theorem saying that if the VC dimension is $$d$$, then $$\lvert \mathcal{C} \cap \{x_1, \dots, x_n\}\rvert \sim n^d$$.

> **Theorem (Sauer).** For all $$n \geq 1$$ and $$x_1, \dots, x_n$$ in the sample space,
>
> $$
> \lvert \mathcal{C} \cap \{x_1, \dots, x_n\}\rvert
> \le \sum_{k=0}^{\mathrm{vc}(\mathcal{C})} \binom{n}{k}
> \le \left(\frac{en}{\mathrm{vc}(\mathcal{C})}\right)^{\mathrm{vc}(\mathcal{C})}
> $$

Combining Sauer's theorem with the symmetrization trick gives

$$
\sup_\mu \mathbb{E}\Big[\sup_{c \in \mathcal{C}}\{\mu_n(c) - \mu(c)\}\Big]
\leq \sqrt{\mathrm{vc}(\mathcal{C})}\sqrt{\frac{\log n}{n}}
$$

The idea: do Rademacher symmetrization, use the finite maximal inequality (the first one we did — also called Massart's inequality; we have subgaussianity by Hoeffding), and finish with Sauer's theorem.

Here is a sketch of the proof of Sauer.

> **Lemma.** For any class $$\mathcal{C}$$ of subsets of $$X$$,
>
> $$
> \lvert \mathcal{C}\rvert \leq \lvert \{I \subseteq X : I \text{ is shattered by } \mathcal{C}\}\rvert
> $$

Every shattered set must satisfy $$\lvert I\rvert \leq \mathrm{vc}(\mathcal{C})$$, and by the definition of shattering every such $$I$$ must be contained in $$\{x_1, \dots, x_n\}$$. That gives the first part of the result. For the second part,

$$
\left(\frac{d}{n}\right)^d \sum_{k=0}^{d} \binom{n}{k}
\leq \sum_{k=0}^{d} \binom{n}{k}\left(\frac{d}{n}\right)^k
= \left(1 + \frac{d}{n}\right)^n
\leq e^d
$$

I will leave the proof of the lemma. $$\blacksquare$$
