---
layout: post
title: An Optimal Data dependent stopping rule for Gradient Descent
date: 2026-11-20
description: Early stopping of kernel gradient descent as regularisation — the bias–variance computation, local Rademacher complexity, and the Raskutti–Wainwright–Yu stopping rule.
tags: learning-theory kernels optimization
categories: math
toc:
  beginning: true
---

## Introduction

Neural Networks typically have multiple weight vector assignments that give it a low training error. However, there are implicit biases in our training methods that make them prefer choose certain solutions over others, affecting the behavior of these machines.

The networks that we work with typically fall in the overparametrized regime, where there are a lot more effective parameters than the training examples (many sources just say parameters, but that does not characterize the overparametrized behaviour. The "effective" part is important, and the quantitative methods of estimating them are being studied currently). Overparametrized regimes generically have manifolds of interpolant solutions (that fit the training data exactly), from which our machine must choose the solution that also has a very low generalization error. The process of making our machine do that is called regularization. A nice goal would be to understand the implicit bias that process creates, but for us to do that, we must analyse what method we choose in the first place.

The paper shows that early stopping is a form of regularisation formally in the discrete setup, and finds a rate-optimal stopping rule (which is data dependent). We will now analyse what the paper does, what the results are, and in what setup it holds.

## The Setup

We consider our observations $$y_i = f^*(x_i) + w_i$$ (the setup of non parametric regression). $$x_i \in X$$ and $$y_i \in \mathbb{R}$$, and we assume that the pair are taken iid from a joint distribution of $$X$$ and $$\mathbb{R}$$; the analysis conditions on the $$x_i$$ (fixed design). $$w_i$$ denotes the noise of our observation process, which we will assume to be independent and mean $$0$$ random variables with variance at most $$\sigma^2$$ (the paper assumes $$\sigma$$-sub-Gaussian, with $$\sigma$$ known). We wish to estimate the regression function $$f^*(x) = \mathbb{E}[Y \mid X = x]$$. Well, the first thing we gotta do is get out of $$X$$ (which has no structure) through a feature vector mapping $$x$$ into a point in a Hilbert space, which should be a Reproducing Kernel Hilbert Space.

We consider $$\mathcal{H} \subset L^2(\mathbb{P})$$, ($$\mathbb{P}$$ is the distribution we take on $$X$$), and an associated inner product which makes it complete. It is an RKHS if we have a corresponding kernel function satisfying the reproducing relation. That kernel function is positive definite (weird terminology, this means each kernel matrix is positive semi-definite) and moreover, by Mercer's theorem (just assume the required regularity conditions), we have:

$$
\mathbb{K}(x, x') = \sum_{k = 1}^{\infty}\lambda_k\phi_k(x)\phi_k(x')
$$

where $$\lambda_1 \geq \lambda_2 \geq \dots \geq 0$$ are the eigenvalues and $$\{\phi_k\}$$ are the corresponding eigenfunctions (orthonormal in $$L^2(\mathbb{P})$$, according to Mercer).

Now, by orthogonal basis decomposition, $$f(x) = \sum_{k = 1}^{\infty}\sqrt{\lambda_k}a_k \phi_k(x)$$, where $$a_k = \dfrac{1}{\sqrt{\lambda_k}}\langle f, \phi_k\rangle_{L^2(\mathbb{P})}$$.

Thus, associated with $$\mathcal{H}$$, there are associated two inner products, one we give to $$\mathcal{H}$$ to make it a RKHS, and the other of the larger space.
By Parseval's theorem,

$$
\begin{aligned}
\langle f, g \rangle_{L^2(\mathbb{P})} &= \sum_{k=1}^{\infty} \lambda_k a_k b_k \\[1em]
\langle f, g \rangle_{\mathcal{H}}       &= \sum_{k=1}^{\infty} a_k b_k
\end{aligned}
$$

(One can check that reproducing property is satisfied now, hence this inner product is valid).

This sets the stage for the next assumption: We assume $$f^*$$ is bounded in $$\mathcal{H}$$ norm. WLOG, assume it is bounded by $$1$$. Also assume that $$\sup_x\mathbb{K}(x, x)$$ is bounded (which implies that $$\Vert f\Vert _\infty$$ is also bounded for all $$f$$ in the $$\mathcal{H}$$ unit ball).

Okay, now we got a nice hilbert space $$\mathcal{H}$$ that we can work with. In general, the kernels are chosen so that $$\mathcal{H}$$ is very high dimensional / infinite dimensional. How is one supposed to work here? We are going to be doing a gradient descent to find the minimum function, but we are minimizing in a very high dimensional space. (Something akin to) Representer theorem to the rescue!

Given the samples $$\{(x_1, y_1), \dots, (x_n, y_n)\}$$, consider minimizing the least squares loss function:

$$
L(f) = \frac{1}{2n}\sum_{i = 1}^n(y_i - f(x_i))^2
$$

Now, we cannot use the Representer theorem here. But the idea holds, split $$f$$ into a parallel component and a perpendicular component to the span of $$\mathbb{K}(\cdot, x_i)$$, call that S.  The perpendicular component vanishes at the $$x_i$$ because of the reproducing property, so the loss does not see it (and it stays $$0$$ along gradient descent, see below).

$$
f_w(x) = \frac{1}{\sqrt{n}}\sum_{i = 1}^n w_i\mathbb{K}(x, x_i)
$$

for some vector $$w$$. Define the empirical kernel matrix $$K \in \mathbb{R}^{n \times n}$$ as is the kernel matrix divided by $$n$$ (so the same, just rescaled). The normalization makes the norm cleaner:

$$
||f_w||^2_{\mathcal{H}} = w^TKw
$$

The algorithm we want to study is the following:

$$
f_{t + 1} = f_t - \alpha_t\nabla_{\mathcal{H}} L(f_t)
$$

One can check that the gradient is in the span, $$f_0$$ is in the span, hence $$f_t$$ is in the span. We are good.

We can write the least squares in the form:

$$
L(w) = \frac{1}{2n}||y - \sqrt{n}Kw||_2^2
$$

Now,

$$
\langle f_w, f_{w'} \rangle = w^TKw'
$$

Taking $$\theta = \sqrt{K}w$$, we get $$\langle f_w, f_{w'} \rangle = \theta^T\theta'$$, becoming a dot product. Hence, in $$\theta$$ coordinates, the span $$S$$ is isometric to (the range of $$\sqrt{K}$$ in) $$\mathbb{R}^n$$. We work with these coordinates. The update rule becomes:

$$
\theta_{t + 1} = \theta_t - \alpha_t(K\theta_t - \frac{1}{\sqrt{n}}\sqrt{K}y)
$$

The update rule for the fitted values $$F_t = (f_t(x_1), \dots, f_t(x_n))^T$$, initialised at 0, becomes:

$$
F_{t + 1} = F_t - \alpha_t  K (F_t - y)
$$

where $$\alpha_t$$ are the step sizes, non-increasing with $$\alpha_t \leq \min\{1, 1/\hat\lambda_1\}$$, and $$\eta_t = \sum_{\tau < t}\alpha_\tau$$. Assume $$\theta_0 = 0$$. $$w_t$$ defines a function $$f_t$$. This is the sequence that we wish to study. The errors are $$\Vert f_t - f^*\Vert ^2_{L^2(\mathbb{P}_n)}$$ and $$\Vert f_t - f^*\Vert ^2_{L^2(\mathbb{P})}$$.

## Analysis

Since K is symmetric, we decompose it as $$K = UDU^T$$, $$D = \operatorname{diag}(\hat\lambda_1, \dots, \hat\lambda_n)$$.

$$
F_{t + 1} = (I - \alpha_tK)F_t + \alpha_tKy
$$

Now, set $$g_t = U^TF_t$$ and $$\tilde y = U^Ty$$. Left multiply our update by $$U^T$$ to get:

$$
g_{t + 1} = (I - \alpha_t D)g_{t} + \alpha_t D \tilde y
$$

Now since $$D$$ is a diagonal matrix, we have a recursion in each coordinate. Fix a $$j$$. Define $$e_t = g_{t, j} - \tilde y_j$$. This gives us:

$$
e_{t + 1} = (1 - \alpha_t\hat\lambda_j)e_t
$$

This gives us the recursion:

$$
g_t = (I - S^t)\, \tilde y, \qquad
S^t := \prod_{\tau=0}^{t-1} (I - \alpha_\tau D).
$$

<!-- added: note -->
> **The filter picture.** Each eigendirection of $$K$$ is kept with weight $$1-S^t_j\approx 1-e^{-\eta_t\hat\lambda_j}$$. Compare kernel ridge regression with penalty $$1/\eta$$, which keeps $$\hat\lambda_j/(\hat\lambda_j+1/\eta)$$. Both are $$\asymp\min\{1,\eta\hat\lambda_j\}$$: directions with $$\hat\lambda_j\gg1/\eta$$ are fitted and directions with $$\hat\lambda_j\ll1/\eta$$ are ignored. That is the precise sense in which early stopping *is* a regulariser, with $$\eta_t$$ playing the role of the inverse ridge penalty.
{: .block-tip }

<!-- added: figure -->
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/early_stopping/filters.png" class="img-fluid rounded" zoomable=true %}
  </div>
</div>
<div class="caption">
Kept fraction \(1-S^t_j\) for gradient descent (solid, \(\alpha=1\)) against ridge with \(\lambda_{\text{ridge}}=1/\eta\) (dashed). Both switch on near \(\hat\lambda_j = 1/\eta\) (dotted); gradient descent has the sharper cutoff.
</div>


Now, let $$\theta^* = U^TF^*$$ (with $$F^* = (f^*(x_1), \dots, f^*(x_n))^T$$) and $$\tilde\varepsilon = U^T\varepsilon$$ (with $$\varepsilon = (w_1, \dots, w_n)^T$$). The rotated noise has the same mean and covariance. We can show that

$$
g_{t, j} - \theta^*_j = -S_j^t\theta^*_j + (1 - S^t_j)\tilde\varepsilon_j
$$

The empirical norm is the same under the rotation. Using this fact, we get the following equations:

$$
\|f_t - f^*\|_n^2
\;\le\;
\underbrace{\frac{2}{n}\sum_{j=1}^n \big(S^t_j\big)^2\, \theta_j^{*2}}_{B_t^2}
\;+\;
\underbrace{\frac{2}{n}\sum_{j=1}^n \big(1 - S^t_j\big)^2\, \tilde\varepsilon_j^{\,2}}_{V_t}
$$

$$
\mathbb{E}\,\|f_t - f^*\|_n^2
= \frac{1}{n}\sum_{j=1}^n \big(S^t_j\big)^2\, \theta_j^{*2}
+ \frac{1}{n}\sum_{j=1}^n \big(1 - S^t_j\big)^2\, \mathbb{E}\,\tilde\varepsilon_j^{\,2}
$$

Now, we have the following lemma:

$$
\frac{1}{n}\sum_{j:\,\hat\lambda_j>0} \frac{\theta_j^{*2}}{\hat\lambda_j} \;\le\; \|f^*\|_{\mathcal H}^2 \;\le\; 1,
\qquad \theta^*_j = 0 \ \text{ whenever } \hat\lambda_j = 0
$$

<!-- added: note -->
> **Why the lemma holds.** Let $$\Pi f^*$$ be the projection of $$f^*$$ onto $$S$$. It agrees with $$f^*$$ at every $$x_i$$ (the perpendicular part vanishes there) and $$\Vert \Pi f^*\Vert_{\mathcal H}\le\Vert f^*\Vert_{\mathcal H}$$. Writing $$\Pi f^* = f_w$$, its fitted values are $$F^* = \sqrt{n}Kw$$, so
>
> $$\Vert f_w\Vert_{\mathcal H}^2 = w^TKw = \tfrac{1}{n}F^{*T}K^{+}F^* = \frac{1}{n}\sum_{j:\,\hat\lambda_j>0}\frac{\theta_j^{*2}}{\hat\lambda_j}.$$
>
> And $$F^*$$ lies in the range of $$K$$, which is why $$\theta^*_j=0$$ when $$\hat\lambda_j=0$$.
{: .block-tip }


This gives the following two inequalities:

$$
\text{bias}^2 = \frac{1}{n}\sum_{j} \big(S^t_j\big)^2 \theta_j^{*2}
= \sum_{j} \big(S^t_j\big)^2 \hat\lambda_j \cdot \frac{\theta_j^{*2}}{n\,\hat\lambda_j}
\;\le\; \max_j \big(S^t_j\big)^2 \hat\lambda_j
\;\le\; \frac{1}{2e\,\eta_t}
$$

<!-- added: note -->
> **Where the two constants come from.** Since $$1-x\le e^{-x}$$, $$S^t_j\le e^{-\eta_t\hat\lambda_j}$$. For the bias, $$(S^t_j)^2\hat\lambda_j\le \sup_{s\ge0} s\,e^{-2\eta_t s} = \frac{1}{2e\,\eta_t}$$ (maximised at $$s = 1/(2\eta_t)$$). For the variance, $$(1-S^t_j)^2\le 1-S^t_j\le\min\{1,\eta_t\hat\lambda_j\}$$, since $$0\le S^t_j\le 1$$ and $$1-\prod_\tau(1-a_\tau)\le\sum_\tau a_\tau$$ for $$a_\tau\in[0,1]$$. So the whole analysis is two scalar inequalities applied coordinate by coordinate.
{: .block-tip }


$$
\mathbb{E}[\text{variance}] \le \frac{\sigma^2}{n}\sum_{j} \big(1 - S^t_j\big)^2
\;\le\; \frac{\sigma^2}{n}\sum_{j} \min\{1,\eta_t\hat\lambda_j\}
= \sigma^2\,\frac{d(\eta_t)}{n}, \qquad d(\eta) := \sum_{j=1}^n \min\{1, \eta\hat\lambda_j\}
$$

This gives us the inequality:

$$
\mathbb{E}\,\|f_t - f^*\|_n^2 \;\le\; \frac{1}{2e\,\eta_t} + \sigma^2\,\frac{d(\eta_t)}{n}
$$

We can write this in terms of the local Rademacher Complexity definition:

$$
\hat{R_K}(\epsilon)  = [\frac{1}{n}\sum_{j = 1}^n \min\{\hat\lambda_j, \epsilon^2\}]^{1/2}
$$

In this notation, the inequality is:

$$
\mathbb{E}||f_t - f^*||^2_n \leq \frac{1}{2e\eta_t} + \sigma^2\eta_t\hat{R_K}^2(\eta_t^{-\frac{1}{2}})
$$

A bit more on the local Rademacher complexity:

This is essentially Rademacher complexity, but you want to take the sup only over the functions that are close to $$0$$ in the empirical norm:

$$
\mathcal{F}_\epsilon = \{f \in \mathbb{B}_H(1): ||f||_n \leq \epsilon\}
$$

This has two constraints, both of which can be written explicitly.

In the coordinates $$\theta = U^T(f(x_1), \dots, f(x_n))^T$$:

$$
\underbrace{\frac{1}{n}\sum_{j=1}^n \frac{\theta_j^2}{\hat\lambda_j} \;\le\; 1}_{\text{RKHS ball (by the lemma above)}}
\qquad\qquad
\underbrace{\frac{1}{n}\sum_{j=1}^n \theta_j^2 \;\le\; \epsilon^2}_{\text{localization: } \|f\|_n^2 = \frac{1}{n}\|\theta\|_2^2}
$$

Taking the intersection gives the local rademacher complexity definition.

$$
\frac{1}{n}\sum_{j} \frac{\theta_j^2}{\min\{\hat\lambda_j, \epsilon^2\}} \le 1
\;\Longrightarrow\; \text{both constraints} \;\Longrightarrow\;
\frac{1}{n}\sum_{j} \frac{\theta_j^2}{\min\{\hat\lambda_j, \epsilon^2\}} \le 2
$$

<!-- added: figure -->
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/early_stopping/two_balls.png" class="img-fluid rounded" zoomable=true %}
  </div>
</div>
<div class="caption">
The two constraints in \(\theta\) coordinates. Along a large eigendirection the \(\epsilon\)-ball binds; along a small one the \(\mathcal H\)-ball binds. The ellipsoid with semi-axes \(\sqrt{n\min\{\hat\lambda_j,\epsilon^2\}}\) (solid) sits inside the intersection, and \(\sqrt2\) times it (dashed) contains it. The supremum of a Gaussian or Rademacher process over an ellipsoid with semi-axes \(r_j\) is \(\asymp(\sum_j r_j^2)^{1/2}\), which gives \(\hat R_K(\epsilon)\).
</div>


$$
\mathbb{E}\sup_{f \in \mathcal{F}_\epsilon} \frac{1}{n}\sum_{i=1}^n \epsilon_i f(x_i)
\;\asymp\; \Big[\frac{1}{n}\sum_{j} \min\{\hat\lambda_j, \epsilon^2\}\Big]^{1/2} = \hat{R_K}(\epsilon)
$$

Now, our first term is decreasing, and the second term is increasing. This gives an idea of the optimal stopping rule . This gives $$\hat{R_K}(\epsilon) \sim \epsilon^2/\sigma$$.

## Stopping rule and Theorem 1

Define the critical empirical radius $$\hat\epsilon_n$$ as the smallest positive solution of

$$
\hat{R_K}(\epsilon) \;\le\; \frac{\epsilon^2}{2e\sigma}.
$$

Since $$\hat{R_K}(\epsilon)/\epsilon = \big[\frac{1}{n}\sum_j \min\{\hat\lambda_j/\epsilon^2, 1\}\big]^{1/2}$$ is non-increasing in $$\epsilon$$, the set of solutions is exactly $$[\hat\epsilon_n, \infty)$$.

The stopping rule is

$$
\hat T \;=\; \arg\min\Big\{t \in \mathbb{N} \;:\; \hat{R_K}\big(\eta_t^{-1/2}\big) > \frac{1}{2e\sigma\eta_t}\Big\} - 1 .
$$

Squaring both sides, the rule fires when

$$
\sigma^2\,\frac{d(\eta_t)}{n} \;=\; \sigma^2\eta_t\hat{R_K}^2\big(\eta_t^{-1/2}\big) \;>\; \frac{1}{4e^2}\cdot\frac{1}{\eta_t},
$$

i.e. we stop just before the variance term overtakes the bias term. With $$\epsilon = \eta^{-1/2}$$ this is the condition $$\hat{R_K}(\epsilon) \sim \epsilon^2/\sigma$$ above, so $$\eta_{\hat T} \approx \hat\epsilon_n^{-2}$$. The rule depends only on the $$\hat\lambda_j$$ (the design) and $$\sigma$$, not on $$y$$.

<!-- added: figure -->
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/early_stopping/rule.png" class="img-fluid rounded" zoomable=true %}
  </div>
</div>
<div class="caption">
The rule on the Sobolev kernel \(\mathbb K(x,x')=\min\{x,x'\}\) with \(x_i=i/n\), \(n=400\), \(\sigma=0.5\), \(\alpha_t=1\). \(\hat T\) is where the variance bound crosses \(1/(4e^2\eta_t)\), not where it crosses the bias bound \(1/(2e\eta_t)\).
</div>

<!-- added: note -->
> **A remark on the constant.** The threshold $$1/(4e^2\eta_t)$$ is the bias bound divided by $$2e\approx5.4$$, so the rule stops well before the two bounds cross. This costs only a constant factor and is what makes the high-probability argument go through: for $$t\le\hat T$$ the variance bound is at most a $$1/(2e)$$ fraction of the bias bound, so random fluctuations of the variance term cannot overturn the comparison. In simulations $$\hat T$$ lands several times earlier than the oracle (best-in-hindsight) stopping time. And because $$\hat T$$ never looks at $$y$$, it is deterministic once the design is fixed.
{: .block-tip }


> **Theorem 1 (fixed design).** There are universal constants $$c_1, c_2$$ such that with probability at least $$1 - c_1\exp(-c_2 n\hat\epsilon_n^2)$$:
>
> (a) for all $$t \le \hat T$$:
>
> $$
> \|f_t - f^*\|_n^2 \;\le\; \frac{4}{e\,\eta_t};
> $$
>
> (b) at the stopping time:
>
> $$
> \|f_{\hat T} - f^*\|_n^2 \;\le\; 12\,\hat\epsilon_n^2;
> $$
>
> (c) for all $$t > \hat T$$:
>
> $$
> \mathbb{E}\,\|f_t - f^*\|_n^2 \;\ge\; \frac{\sigma^2}{4}\,\eta_t\,\hat{R_K}^2\big(\eta_t^{-1/2}\big).
> $$

In words: before $$\hat T$$ the bias dominates, at $$\hat T$$ we get the critical radius rate, and after $$\hat T$$ the variance takes over, so stopping later is genuinely worse.

<!-- added: figure -->
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/early_stopping/error_curve.png" class="img-fluid rounded" zoomable=true %}
  </div>
</div>
<div class="caption">
Exact expected in-sample error, computed from the bias–variance formula above (same setup, \(f^*(x)=\vert x-\tfrac12\vert-\tfrac12\), which has \(\Vert f^*\Vert_{\mathcal H}=1\) for this kernel). The bound of Theorem 1(a) is loose by a constant, as expected. \(\hat T=19\) while the oracle stops at \(t=75\); the error at \(\hat T\) is about \(3\times\) the oracle's.
</div>

<!-- added: figure -->
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/early_stopping/fits.png" class="img-fluid rounded" zoomable=true %}
  </div>
</div>
<div class="caption">
One draw of the data. Too early, the fit is just the top eigendirections; at \(\hat T\) the shape is right but the kink is smoothed out; run long enough, gradient descent heads towards the interpolant and fits the noise.
</div>


Proof idea: the expectation bound above, made high-probability by concentration of the variance term (a quadratic form in sub-Gaussian noise, Hanson–Wright), plus the observation that for $$t \le \hat T$$ the rule has not fired, so variance $$\lesssim$$ bias.

<!-- added: section -->
## What the rate is

<!-- added: note -->
> **Computing the critical radius.** Everything hinges on $$\hat\epsilon_n$$, so it is worth computing it for a kernel whose eigenvalues decay polynomially, $$\hat\lambda_j\asymp j^{-2\nu}$$ (up to constants; this is a heuristic for the empirical eigenvalues, exact for the population ones). Let $$k\asymp\epsilon^{-1/\nu}$$ be the index where $$\hat\lambda_j$$ drops below $$\epsilon^2$$. Then
>
> $$\hat R_K^2(\epsilon)=\frac1n\Big(k\epsilon^2+\sum_{j>k}j^{-2\nu}\Big)\asymp\frac{\epsilon^{2-1/\nu}}{n},$$
>
> and setting this equal to $$\epsilon^4/\sigma^2$$ gives
>
> $$\hat\epsilon_n^2\asymp\Big(\frac{\sigma^2}{n}\Big)^{\frac{2\nu}{2\nu+1}}.$$
>
> For the Sobolev kernel $$\min\{x,x'\}$$, $$\lambda_j=\big((j-\tfrac12)\pi\big)^{-2}$$, so $$\nu=1$$ and the rate is $$n^{-2/3}$$. For a rank-$$m$$ kernel, $$\hat R_K^2(\epsilon)\le m\epsilon^2/n$$ and the rate is $$\sigma^2 m/n$$. Both match the known minimax lower bounds over the $$\mathcal H$$-ball, which is the sense in which the rule is *optimal*.
{: .block-tip }

<!-- added: figure -->
<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/early_stopping/rates.png" class="img-fluid rounded" zoomable=true %}
  </div>
</div>
<div class="caption">
Error at \(\hat T\) and at the oracle time as \(n\) grows (same setup, \(\sigma=0.5\)). The guarantee is \(n^{-2/3}\), the worst case over the unit ball; this particular \(f^*\) is easier, so both curves fall faster. The ratio between them stays between about 1.5 and 3 across this range: same rate, different constant.
</div>

## Theorem 2 (random design)

Now the $$x_i$$ are drawn iid from $$\mathbb{P}$$ and we measure error in $$L^2(\mathbb{P})$$. Let $$\epsilon_n$$ be the population analogue of $$\hat\epsilon_n$$: the smallest positive solution of $$40\,\mathcal{R}_{\mathbb{K}}(\epsilon) \le \epsilon^2/\sigma$$, where $$\mathcal{R}_{\mathbb{K}}(\epsilon) = \big[\frac{1}{n}\sum_{j=1}^\infty \min\{\lambda_j, \epsilon^2\}\big]^{1/2}$$ uses the population eigenvalues $$\lambda_j$$.

> **Theorem 2.** Under the conditions of Theorem 1, with the same $$\hat T$$, there are universal constants $$c_1, c_2, c_3$$ such that
>
> $$
> \|f_{\hat T} - f^*\|_2^2 \;\le\; c_3\,\epsilon_n^2
> $$
>
> with probability at least $$1 - c_1\exp(-c_2 n\hat\epsilon_n^2)$$.

Proof idea (change of norm, from $$\mathbb{P}_n$$ to $$\mathbb{P}$$):
1. the iterates stay bounded, $$\Vert f_t\Vert _{\mathcal{H}} \le 2$$ for $$t \le \hat T$$, so $$f_{\hat T} - f^*$$ lies in an $$\mathcal{H}$$-ball of radius $$3$$;
2. on such a ball, $$\big\vert \Vert g\Vert _n^2 - \Vert g\Vert _2^2\big\vert  \lesssim \epsilon_n^2$$ uniformly (a localized uniform law; this is where $$\Vert f\Vert _\infty \le B$$ is used);
3. $$\hat\epsilon_n \le \epsilon_n$$ with high probability.

Combining with Theorem 1(b) gives the result.

<!-- added: section -->
## What this post does not prove

<!-- added: note -->
> **Gaps, stated honestly.**
>
> - **The high-probability step in Theorem 1.** Above, only the expectation bound is derived. Turning it into a statement with probability $$1-c_1e^{-c_2n\hat\epsilon_n^2}$$ needs Hanson–Wright for the quadratic form $$V_t$$, uniformly over $$t\le\hat T$$.
> - **Part (c), the lower bound.** It is what shows that running past $$\hat T$$ really hurts, and it needs a matching lower bound on $$\frac1n\sum_j(1-S^t_j)^2$$.
> - **Theorem 2's change of norm.** The localized uniform law in step 2 is a separate empirical-process argument (it is where $$\sup_x\mathbb K(x,x)<\infty$$ is used), as is $$\hat\epsilon_n\le\epsilon_n$$.
> - **Optimality.** That $$\epsilon_n^2$$ cannot be beaten is a minimax lower bound that the paper cites, not proves.
> - **Experiments.** The paper's own simulations, which compare $$\hat T$$ with other stopping rules, are not reproduced; the figures here are illustrations.
{: .block-tip }

**Reference.** G. Raskutti, M. J. Wainwright, B. Yu. [Early Stopping and Non-parametric Regression: An Optimal Data-dependent Stopping Rule](https://jmlr.org/papers/v15/raskutti14a.html). *JMLR* 15(11):335–366, 2014.
