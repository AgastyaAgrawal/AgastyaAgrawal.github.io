---
layout: post
title: Electrical Networks and Random Walks
date: 2026-04=09
description: Today I will mainly talk about how to connect the notion of electrical networks and random walks. It gives a new perspective on an important and a very interesting subject in Probability and Statistics. I also solve an olympiad problem with it.
tags: updates
categories: general
---

Hi, this material was prepared for a lecture to the participants of STEMS 2026, an annual training camp conducted by CMI students for outstanding high school and college students. 

# Preamble

This is one of the rare instances where you will encounter physics
inspired mathematics in undergraduate level. Today, you will also be
introduced to a very beautiful concept and a very powerful tool (we
shall also solve a very nice olympiad problem). Thus make sure to
understand everything locally in the talk, spend time gluing the local
concepts to understand the global picture, think about applying these
ideas to various other areas in mathematics, and make sure to solve
problems to avoid the illusion of understanding.\
\
Before continuing, make sure you understand what probability
distributions, expectations, and other basic concepts mean.

# Setup

What is a random walk on an undirected graph? At each vertex, you need
to assign a probability distribution on the edges. The best way to
represent this is to assign the numbers in a matrix and make sure all
the entries in a row add up to one. We assume the graph is connected.\
\
Let us now assume that this graph is actually an electrical network.
Each edge has a resistance $r_{xy} > 0$. We will draw connections
between the two. For convenience, we will actually deal with
conductance, which is the reciprocal of resistance.\
\
Associated with an electrical network is a random walk with
$p_{xy} = \frac{c_{xy}}{c_x}$. The fraction in this definition is forced
upon us if you want to create a \"natural\" probability on this graph.
There is a natural relationship between the current flowing in this
electrical network and the considered random walk on the graph.\
\
We will now define Harmonic functions on an undirected connected graph.
Designate a set of the vertices of the graph as the boundary vertices.
The rest are interior vertices. A harmonic function $g$ on the vertices
is a function whose boundary values are fixed, and whose values at any
interior vertex $x$ is a weighted average of its values on all the
adjacent vertices $y$, with the weights being $p_{xy}$. Thus we get the
two following relations: $\sum_y{p_{xy}} = 1$ $g_x = \sum_y{g_yp_{xy}}$.

::: tcolorbox
Prove that a harmonic function on a connected graph attains its maxima
and minima on the boundary vertices.
:::

::: tcolorbox
Thus, there is at most one harmonic function satisfying a given set of
equations and boundary conditions.
:::

This result is used to prove uniqueness. Understand the arguments
carefully, you can perhaps use it to prove uniqueness in other cases. It
suggests a general method to do so.

# The Analogy

Choose two vertices $a$ and $b$. Attach a voltage source between $a$ and
$b$, with $v_a = 1$, $v_b = 0$. This induces a voltage value at all
other vertices.

::: tcolorbox
The voltage at vertex $x$ is the probability that the random walk
starting at vertex $x$ will reach $a$ before reaching $b$.
:::

We first show that the voltage function is a harmonic function, and
hence is unique.\
\
Let $x$ and $y$ be adjacent vertices. By Ohm's law
$i_{xy} = (v_x - v_y)c_{xy}$. Also, by Kirchhoff's law,
$\sum_y i_{xy} = 0$. Thus,
$$\sum_y (v_x - v_y)c_{xy} = 0 \iff \sum_y v_xc_{xy} = \sum_y v_yc_{xy} \iff v_xc_x = \sum_y v_yc_{xy}$$
Remember now that $p_{xy} = \frac{c_{xy}}{c_x}$ to get the equation
$v_x = \sum_y v_yp_{xy}$.\
\
Thus the voltage function is a harmonic function with the boundary
conditions at $a$ and $b$.

::: tcolorbox
Now check yourself, orally, or in writing, but in crystal clear
thoughts, that this too is a harmonic function and satisfies the same
boundary conditions.
:::

Now, by the uniqueness theorem, we have rigorously proved the analogy.

::: tcolorbox
The net (expected) frequency with which a random walk starting at $a$
and ending at $b$ hits the edge $xy$ is the current through the edge
$xy$.
:::

Let $u_x$ be the expected number of visits to vertex $x$ on a walk from
$a$ to $b$ before reaching $b$. Thus $u_b = 0$.

::: tcolorbox
I held your hand for the voltage analogy. You need to do this yourself
now.\
\
Check that $\frac{u_{x}}{c_x}$ is a harmonic function with the boundary
conditions $u_b = 0$ and $u_a$ as some fixed value.\
\
Adjust the current so that $\frac{u_x}{c_x}$ and $v_x$ satisfy the same
boundary conditions. Now we have uniqueness.\
\
Now check that $i_{xy} = u_xp_{xy} - u_yp_{yx}$.
:::

## Effective Resistance and Escape Probability

Set $v_a = 1$ and $v_b = 0$. Let $i_a$ be the current flowing into the
network at vertex a and out at vertex $b$. The effective resistance
$r_{eff}$ between vertex $a$ and vertex $b$ as
$r_{eff} = \frac{v_a}{i_a}$. The effective conductance is the
reciprocal. Now, we define the escape probability as the probability of
a random walk starting at $a$ reaches $b$ before reaching $a$.\
\
$\textbf{Claim: }$ $p_{escape} = \frac{c_{eff}}{c_a}$.\
\
**Hints for Claim:** $p_{escape} = \frac{c_{eff}}{c_a}$

1.  **Hint 1:** Start by looking at the total current $i_a$ flowing out
    of the source vertex $a$. By Kirchhoff's laws and Ohm's law, write
    $i_a$ in terms of the voltages of the adjacent vertices $y$.
    Remember that $v_a = 1$.

2.  **Hint 2:** Expand the expression from Hint 1. You should get an
    equation involving $c_a$ (the total conductance at $a$) and a sum
    involving $v_y$. Try factoring out $c_a$.

3.  **Hint 3:** Recall the definition of the transition probabilities:
    $p_{ay} = \frac{c_{ay}}{c_a}$. Substitute this into your equation.
    What does the term $\sum_{y} v_y p_{ay}$ represent
    probabilistically?

4.  **Hint 4:** The sum $\sum_{y} v_y p_{ay}$ evaluates the probability
    of moving to a neighbor $y$, and from there, reaching $a$ before
    $b$. Thus, the entire sum is exactly $1 - p_{escape}$.

5.  **Hint 5:** Substitute $1 - p_{escape}$ back into your equation for
    $i_a$. Finally, use the definition of effective conductance
    $c_{eff} = \frac{i_a}{v_a}$ (with $v_a = 1$) to finish the proof.

# Random Walks in Euclidean Space

Random walks are super useful, practically speaking. You can use them to
simulate Brownian motion, for example. One of the most important
inventions of mankind, the PageRank, is built upon random walks. I thus
hope everyone studies them at some point in their lives. We will look at
a certain special class of random walks, particularly those on
$d-$dimensional lattices. We will unfold what this famous quote means
and prove it:

::: tcolorbox
A drunk man will find his way home, but a drunk bird may get lost
forever.
:::

You will notice in the subsequent text that we have done most of the
heavy work already. There are still a few tricks to apply. A walk is
called recurrent if it comes back to the origin, and transient
otherwise.\
\
We will consider the first dimensional case. Consider the segment with
the vertices\
$\{-n, -(n-1), ..., 0, 1, ..., n-1, n\}$ starting from the origin. Is
the walk certain to return to the origin before reaching the boundary?
We will see the asymptotic behavior of this.

First convert it into an electrical network by adding one ohm resistors
on each edge. Then, as we have seen, $p_{escape} = \frac{c_{eff}}{c_a}$.
Now, in a $d$ dimensional lattice with $1$ ohm resistors, $c_a = 2d$.\
\
Now, in a one dimensional lattice, $r_{eff} \to \infty$ as
$n\to \infty$. Thus the probability of escape is $0$.\
\
In the case of two dimensions, we can consider a family of increasing
squares centered around the origin, and consider the limit of $r_{eff}$.
Here is the trick, called Rayleigh's monotonicity principle (a form of
it) : Shorting the resistors can only on each square can only decrease
$r_{eff}$, thus we consider the shorted circuit, analyze the effective
resistance for that circuit, and thus bound our own effective
resistance.\
\
In particular, we short each square into a single node, vertex $i$.
There are $4(2i + 1)$ parallel connections between node $i$ and node
$i+1$.\
\
Thus, $$r_{eff} \geq \sum_i \frac{1}{4(2i + 1)}$$ Hence the effective
resistance goes to infinity, and thus the probability of escape goes to
$0$.\
\
Let us move onto $3$ dimensions now. Since I have already told you the
result, you probably understand that shorting should not work as are
trying to find an upper bound on the effective resistance. Instead, the
trick this time is to \"cut\" the edges. This is the second trick you
should know. This increases effective resistance (since the cut edges
\"effectively\" has infinite resistance).\
\
In this case, there are paths of special importance to us, we forget
about the rest. These are the three directions given by the axes.
Consider the family of planes given by $x + y + z = 2^n - 1$, the family
parametrized by $n$. At each point of intersection of the planes with
the lines, we split it three ways again in the 3 axes directions, and
when two paths meet at the same point, we split the corresponding
vertex. This helps create a tree structure, and we consider the tree
formed by this process.

Now, segments of the paths between the splits are of length
$1, 2, 4, ...$etc. and the resistance of the segments are equal to their
corresponding lengths. Furthermore, at each branching the number of
paths triple, so we have thrice as many parallel connections. Thus, the
resistance of the tree is:
$$\frac{1}{3} + \frac{2}{9} + \frac{4}{27} + ... = \frac{1}{3}(1 + \frac{2}{3} + \frac{4}{9} + ...) = 1$$
It is important to see that the tree is a subgraph of the lattice. This
is equivalent to decreasing the edges which increases resistance. Thus,
the effective resistance of the lattice is less than 1.
$$p_{escape} = \frac{1}{2dr_{eff}} \geq \frac{1}{6}$$

We can also get an upper bound on the escape probability. But you have
already seen how to do that, so do that. Short the resistors on the
surfaces of the boxes centered around the origin.

::: tcolorbox
Find an upper bound on the escape probability.
:::

# Learn to identify Random Walks

::: tcolorbox
Find all functions $f: \mathbb{Z}^2 \to [0, 1]$ such that for any two
integers $x$ and $y$ $$f(x, y) = \frac{f(x-1, y) + f(x, y-1)}{2}$$
:::

Let $S_n$, $S_{n-1}$ be two random walks starting at $x, y$ and $x', y'$
and moving down/left. Then $\mathbb{E}[f(S_n)] = f(x, y)$ and
$\mathbb{E}[f(S'_n)] = f(x', y')$.\
\
Now,
$|f(x, y) - f(x', y')| = |\mathbb{E}[f(S_n) - f(S_n')]| \leq \mathbb{E}[|f(S_n) - f(S_n')|]$.\
\
If, initially, $x + y = x' + y'$, then at each timestep, this condition
will hold. Thus, they will always be on the same diagonal determined by
the initial conditions. Now, the distance between them on this diagonal
is another symmetric random walk! Now remember what we derived. This
random walk is guaranteed to return back to the origin. We use that. We
make the formal argument now.\
\
Let $X_n$ be the random walk which is the difference of these two random
walks. We add a new condition to it, after the two walks intersect,
$X_n$ stays $0$, thus the random walks converge. For notational
convenience, we still call the walk $X_n$, though it is a different walk
$\tilde{X_n}$ now. This just simplifies things and does not change any
previous analysis (this needs to be formalized, I leave this to you to
do. You should do this as an important exercise).\
\
Let $p_n$ be the probability that the stopping time, the epoch at which
the processes have intersected, is greater than $n$.\
\
Now, at any given time $n$, we break the expectation into two cases.
$$\mathbb{E}[|f(S_n) - f(S_n')|] \leq 0 * p(\tau < n) + 1*p(\tau > n) \leq p_n$$
Now, $p_n \to 0$ as $n \to \infty$. We are thus done.\
\
Thus $f$ is a constant function.

# More Problems for You

**Exercise 1** *What is the probability of reaching vertex 1 before
vertex 5 when starting a random walk at vertex 4 in each of the
following graphs.*

1.  ::: center
    :::

2.  ::: center
    :::

**Exercise 2** *What is the most general solution to the difference
equation $t(i + 2) - 5t(i + 1) + 6t(i) = 0$? How many boundary
conditions do you need to make the solution unique?*\
\
**Exercise 3** *Given the difference equation
$a_k t(i+k) + a_{k-1} t(i+k-1) + \cdots + a_1 t(i+1) + a_0 t(i) = 0$ the
polynomial $a_k t^k + a_{k-1} t^{k-1} + \cdots + a_1 t + a_0 = 0$ is
called the characteristic polynomial.*

1.  *If the equation has a set of $r$ distinct roots, what is the most
    general form of the solution?*

2.  *If the roots of the characteristic polynomial are not distinct what
    is the most general form of the solution?*

3.  *What is the dimension of the solution space?*

4.  *If the difference equation is not homogeneous (i.e., the right hand
    side is not 0) and $f(i)$ is a specific solution to the
    nonhomogeneous difference equation, what is the full set of
    solutions to the nonhomogeneous difference equation?*

**Exercise 4** *Consider a random walk on the positive half line, that
is the integers 0,1,2,\.... At the origin, always move right one step.
At all other integers move right with probability 2/3 and left with
probability 1/3. What is the escape probability?*\
\
*A nice way to do this to consider a binary tree instead.*\
\
**Exercise 5** *Prove that two independent random walks starting at the
origin on a two dimensional lattice will eventually meet with
probability one.*
