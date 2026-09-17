---
layout: post
title: Quantum Computing
date: 2026-09-17
description: A descriptive tour of quantum computing — the four postulates, entanglement and its consequences, density operators, and the toy query algorithms from Deutsch to Simon.
tags: quantum-computing information-theory
categories: math
toc:
  beginning: true
---

I want to give a very descriptive view of quantum computing, primarily combining _Quantum Computation and Quantum Information_ by Nielsen and Chuang, Scott Aaronson's notes, and a few other sources. We start by describing quantum computing, and possibly quantum probability (I have not decided about that one yet).

Quantum computing is primarily the method of realising quantum mechanics in the physical world. Quantum mechanics is our best physical theory for describing and predicting the behaviour of small — and maybe larger, later — objects. It can be used to improve the speed and the security of computers. We can identify three quantum mechanical effects that make quantum computers very interesting:

1. **Superposition.** Allows a quantum computer's memory to be in many classical states "at the same time" (there are multiple interpretations of what this means).
2. **Interference.** Allows different superpositions to combine in a way similar to waves.
3. **Entanglement.** Allows different parts of the quantum computer — or even different quantum computers, very far away from each other — to be correlated in ways that are not possible classically.

So essentially, the content below will initially look as if I am introducing quantum mechanical phenomena, and then explaining their implications in terms of the wild results they produce in the real world.

## Quantum Mechanics

The first thing about quantum mechanics is its postulates. Quantum mechanics provides a mathematical and conceptual framework for the development of the laws of physical systems; it does not hand us the laws themselves.

> **Postulate 1 (State space).** Associated to any isolated physical system is a Hilbert space known as the _state space_ of the system. The system is completely described by its _state vector_, which is a unit vector in the state space.

The quantum mechanical system we will be concerned with is the **qubit**. Suppose

$$
\ket{\psi} = \alpha \ket{0} + \beta \ket{1},
$$

where $$\ket{0}, \ket{1}$$ form an orthonormal basis of the state space and the complex coefficients $$\alpha, \beta$$ are called the _amplitudes_. The condition that the vector is a unit vector is $$\braket{\psi}{\psi} = 1$$, i.e. $$\lvert\alpha\rvert^2 + \lvert\beta\rvert^2 = 1$$. We will use the qubit as the fundamental quantum system; there are actual physical systems that can be described in terms of it.

We also have the notion of **phase** between state vectors. If we can rotate one state vector into another by an overall factor $$e^{i\theta}$$, we say they are the same _up to global phase_. Physically they are no different, since the measurement statistics are identical (see Postulate 3 and apply it here). There is also **relative phase**, where the individual amplitudes differ by a phase. That is an actual physical difference.

> **Postulate 2 (Evolution).** The evolution of a closed quantum system is described by a unitary transformation.

Quantum mechanics neither tells us the state space of a particular quantum system, nor does it tell us which unitary operator describes the real-world quantum dynamics. A more refined version of the postulate can be given.

> **Postulate 2′ (Schrödinger equation).** The time evolution of the state of a closed quantum system is described by
>
> $$
> i\hbar \frac{d\ket{\psi}}{dt} = H \ket{\psi}.
> $$

Effectively we can set $$\hbar = 1$$, and solving the Schrödinger equation then gives the unitary $$U = \exp(-itH)$$ — one can check directly that it is indeed unitary. Above, $$H$$ is the _Hamiltonian_ of the physical system.

We will shortly be applying unitary operations to our qubits. How does that work? It turns out to be described by the Hamiltonian of another system which incorporates our operation.

> **Postulate 3 (Measurement).** You can "measure" your quantum state with a collection of _measurement operators_ $$\{M_n\}$$ acting on the state space. This will suddenly change your quantum state, and the new state is described by a new vector. The operators must satisfy the _completeness equation_
>
> $$
> \sum_n M_n^{\dagger} M_n = I.
> $$
>
> The probability that outcome $$n$$ occurs is
>
> $$
> p(n) = \bra{\psi} M_n^{\dagger} M_n \ket{\psi} = \big\lVert M_n \ket{\psi} \big\rVert^2,
> $$
>
> and the post-measurement state is the normalised vector
>
> $$
> \frac{M_n \ket{\psi}}{\big\lVert M_n \ket{\psi} \big\rVert}.
> $$

Very often the collection $$\{M_n\}$$ is a family of orthogonal projectors, in which case the measurement is called _projective_. This postulate is essentially a generalisation of the classical measure space to a quantum measure space.

We can also take these to be measurements with respect to the **computational basis**, that is, with respect to the one-dimensional projectors $$\ketbra{0}{0}, \ketbra{1}{1}$$ of the usual basis.

We also have the expectation of a Hermitian operator, which is the random variable for us. By spectral decomposition we can break it into the projectors onto its eigenspaces, and then

$$
\mathbb{E}(M) \;=\; \sum_m m \, p(m) \;=\; \sum_m m \bra{\psi} P_m \ket{\psi} \;=\; \bra{\psi} \Big( \sum_m m P_m \Big) \ket{\psi} \;=\; \bra{\psi} M \ket{\psi}.
$$

This gives the variance and the standard deviation directly.

> **To come.** I would like to motivate Postulate 3 and its consequences properly from quantum measure theory, and to finish this section with the uncertainty principle. Both are on my list.

### Distinguishing Quantum States

We say that a pair of quantum states can be **reliably distinguished** if there is a measurement which, with probability $$1$$, identifies which of the two we were handed.

> **Claim.** Orthogonal states can be reliably distinguished; non-orthogonal states cannot.

For the proof we use a very useful fact from linear algebra: there is a bijective correspondence between maps of orthonormal bases (fixing one of them) and unitary operators.

**Orthogonal states.** The orthogonal pair $$\ket{v_1}, \ket{v_2}$$ extends to an orthonormal basis. So take the unitary carrying that basis to the computational basis and measure in the computational basis — or, more directly, measure with the projectors $$P_1 = \ketbra{v_1}{v_1}$$, $$P_2 = \ketbra{v_2}{v_2}$$, $$P_3 = I - P_1 - P_2$$, which satisfy the completeness equation. Each state deterministically produces its own outcome.

**Non-orthogonal states.** Fix one of them, say $$\ket{v_1}$$, and split $$\ket{v_2}$$ into components parallel and perpendicular to it. Apply the unitary carrying $$\ket{v_1}$$ to a computational basis vector, say $$\ket{1}$$. Then $$\ket{v_2}$$ still has a nonzero overlap with $$\ket{1}$$, so measuring in the computational basis assigns both states a nonzero probability of the same outcome, and they cannot be told apart with certainty. Measuring in some other basis does not help: a unitary carries that basis back to the computational one, and the nonzero overlap is carried along with it.

There is, however, an algorithm that _sometimes_ distinguishes non-orthogonal states correctly and _never_ distinguishes them incorrectly — it is allowed to give up.

### Composite Systems

There is one final postulate.

> **Postulate 4 (Composite systems).** The state space of a composite physical system is the tensor product of the state spaces of the component systems. Moreover, if systems $$1$$ through $$n$$ are prepared in states $$\ket{\psi_1}, \dots, \ket{\psi_n}$$, then the joint state of the total system is $$\bigotimes_{i=1}^{n} \ket{\psi_i}$$.

The intuition behind this postulate is that we expect the principle of superposition to hold in the composite system; by the defining property of the tensor product, it follows that the tensor product is the right object.

This leads to a very surprising effect called **quantum entanglement**, which is absolutely wild. It ate up much of Einstein's life, and in trying to disprove it he indirectly proved many of its properties, though he went to his deathbed still not at terms with it. It was later verified experimentally. It is one of the main reasons why quantum computing is powerful — or at least one of the reasons we can infer that it should be — and we will see the following consequences:

1. Superdense coding
2. Quantum teleportation
3. Violation of Bell's inequality

> **Exercise.** Show that $$\dfrac{\ket{00} + \ket{11}}{\sqrt{2}}$$ is an entangled two-qubit state, that is, it cannot be factorised as a tensor product of two single-qubit state vectors.

At this point it is convenient to introduce another basis. Before that, a little on the special unitary operators we will be applying to states — the Pauli matrices and the Hadamard matrix.

$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \qquad
Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \qquad
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}, \qquad
H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}.
$$

All four are unitary and Hermitian, and each squares to the identity. The Hadamard gate takes the computational basis to the _plus/minus_ basis,

$$
H\ket{0} = \ket{+} = \frac{\ket{0} + \ket{1}}{\sqrt{2}}, \qquad
H\ket{1} = \ket{-} = \frac{\ket{0} - \ket{1}}{\sqrt{2}}.
$$

If we apply the Hadamard operator to the first qubit of a computational basis state and then apply CNOT (both unitary, hence the composition is unitary), we get what is called the **Bell basis**:

$$
\ket{\Phi^{\pm}} = \frac{\ket{00} \pm \ket{11}}{\sqrt{2}}, \qquad
\ket{\Psi^{\pm}} = \frac{\ket{01} \pm \ket{10}}{\sqrt{2}}.
$$

The entangled state we have been staring at is one of them; all four are entangled. They are also called **EPR pairs** (Einstein–Podolsky–Rosen).

Now, before we talk about the effects of entanglement, it is a good idea not to get overexcited by them — in the sense that while they are very interesting phenomena, they are not enormously more efficient than the classical paradigms. What one should be excited about is how they _challenge_ the classical paradigms, and the potential that opens up.

### Superdense Coding

By sending $$n$$ classical bits you cannot communicate more than $$n$$ bits of information — a basic result of Shannon's classical information theory. We challenge that in the quantum realm: we will send $$2$$ bits of information using $$1$$ qubit plus $$1$$ shared entangled bit prepared in advance,

$$
1 \text{ qubit} + 1 \text{ ebit} \;\geq\; 2 \text{ bits}.
$$

Before the procedure, a caveat: if there is no entanglement, then Alice cannot send more than one bit per qubit. This is **Holevo's theorem**.

Let us say Alice and Bob share $$\ket{\Phi^{+}} = \dfrac{\ket{00} + \ket{11}}{\sqrt{2}}$$ in advance, with Alice holding the first qubit and Bob the second. (This is actually a crazy statement. Both of them have a particle, one on the Earth and the other on the Moon — but there is no quantum system describing the first or the second particle alone. You _need_ the two-qubit system, and its state vector is the entangled state.)

Alice manipulates her half, sends her half to Bob on a rocket, Bob measures both qubits, and gets two bits of information from Alice.

The idea is that by applying $$X$$, $$Z$$, $$ZX$$ to Alice's qubit, you reach the other three states of the Bell basis. Suppose Alice wants to transmit two bits $$x, y$$:

1. If $$x = 1$$, Alice applies $$X$$.
2. If $$y = 1$$, Alice then further applies $$Z$$.

| $$x$$ | $$y$$ | Alice applies | Shared state becomes | Bob reads off |
| :---: | :---: | :-----------: | :------------------: | :-----------: |
|   0   |   0   |     $$I$$     |  $$\ket{\Phi^{+}}$$  |    $$00$$     |
|   1   |   0   |     $$X$$     |  $$\ket{\Psi^{+}}$$  |    $$01$$     |
|   0   |   1   |     $$Z$$     |  $$\ket{\Phi^{-}}$$  |    $$10$$     |
|   1   |   1   |    $$ZX$$     | $$-\ket{\Psi^{-}}$$  |    $$11$$     |

She now sends her qubit to Bob. To decode, Bob applies a CNOT with Alice's qubit as the control and his own as the target, and then a Hadamard to Alice's qubit — this is exactly the inverse of the Hadamard-then-CNOT circuit that took the computational basis to the Bell basis. Measuring the two qubits in the computational basis yields $$y$$ on the first and $$x$$ on the second, which is precisely what Alice wanted to send. (The global sign in the last row is a global phase and does not affect the statistics.)

A natural question to ask: could Alice send an arbitrarily large amount of information by transmitting just a single qubit? There is a theorem that says no.

### Quantum Teleportation

We can use a pre-shared entangled pair and two classical bits to transmit a qubit. Contrast this with superdense coding:

$$
2 \text{ bits} + 1 \text{ ebit} \;\geq\; 1 \text{ qubit}.
$$

This is, in some sense, the converse of superdense coding, and it can be shown to be optimal.

"Teleportation" is not really a good term here, but it has stuck for historical reasons. It is more that Alice is transferring her qubit to Bob through a classical communication channel — so nothing travels faster than light. Alice does not need to know her qubit to do this, and she loses her qubit in the process. She _has_ to lose it, by the **no-cloning theorem**.

> **Exercise.** There is no quantum machine given by a unitary operator that can copy an arbitrary qubit, i.e. take $$\ket{\psi} \mapsto \ket{\psi}\ket{\psi}$$ for all $$\ket{\psi}$$. Show that such a machine would violate linearity.

Now, back to the procedure. It is just _there_, I guess. People were trying to disprove this, and then ended up proving that the transfer is actually possible with a circuit.

Alice and Bob share $$\dfrac{\ket{00} + \ket{11}}{\sqrt{2}}$$ beforehand. Suppose Alice wants to send $$\ket{\psi}$$. This is the first qubit, and the entangled pair are the second and third qubits. Consider the combined state. Apply CNOT with the first qubit as control and the second as target. Then Alice applies a Hadamard to her first qubit and measures the first two qubits — which is all she can do, and observe that the state she wanted to send is destroyed in the process. She sends the two classical outcome bits to Bob. Based on them, Bob applies the appropriate correction ($$I$$, $$X$$, $$Z$$ or $$ZX$$) and recovers $$\ket{\psi}$$; the entanglement on his side is destroyed.

### Density Operators

This entanglement business raises some important questions. How much can you say about Bob's qubit from Alice's qubit in an entangled state? More generally, how much can we say about a subsystem from a composite system? This is where the notion of a **density operator** shines. Density operators also help quantify entanglement, which answers the first question. In fact, they are the more canonical choice if we take the viewpoint of quantum probability. What I am getting at is the following: they are equivalent to state vectors, and more useful in many cases.

Thus we can write the quantum postulates in terms of density operators as well. They give a convenient means of describing quantum systems whose state is not completely known.

So let us actually try to describe such systems. Being probabilists at heart, we assign a probability distribution over quantum states to describe the unknown state. A small break for terminology: states we can describe exactly are called **pure states**, and these mixtures are called **mixed states**. We assign the distribution based on our inductive biases, of course — I wonder whether we can do some Bayesian learning here. Anyway, we define our mixed state as an ensemble $$\{p_i, \ket{\psi_i}\}$$.

It turns out that the same physical mixed state can be represented by different ensembles (duh — too much symmetry here; I wonder if we can quantify how much). We want a unique representation, and there it is: the density operator (well, up to a degree of freedom, which we will get to).

The density operator of the ensemble $$\{p_i, \ket{\psi_i}\}$$ is

$$
\rho = \sum_i p_i \ketbra{\psi_i}{\psi_i}.
$$

It is easy to restate the old postulates in terms of the new object. For example, evolution under a unitary $$U$$ becomes

$$
\rho = \sum_i p_i \ketbra{\psi_i}{\psi_i} \;\xrightarrow{\;U\;}\; \sum_i p_i \, U \ketbra{\psi_i}{\psi_i} U^{\dagger} = U \rho \, U^{\dagger}.
$$

One can do the same for the other postulates — not a hard job, and a good exercise. To complete the job, we need an intrinsic characterisation of a density operator that does not refer to any ensemble of state vectors.

> **Theorem (Characterisation of density operators).** An operator $$\rho$$ is the density operator of some ensemble $$\{p_i, \ket{\psi_i}\}$$ if and only if
>
> 1. **Trace condition.** $$\Tr(\rho) = 1$$.
> 2. **Positivity condition.** $$\rho$$ is positive semi-definite.

The trace condition is easy to see: use linearity and the fact that the probabilities sum to $$1$$. For positivity, for any $$\ket{\phi}$$,

$$
\bra{\phi} \rho \ket{\phi} = \sum_i p_i \braket{\phi}{\psi_i} \braket{\psi_i}{\phi} = \sum_i p_i \big\lvert \braket{\phi}{\psi_i} \big\rvert^2 \;\geq\; 0.
$$

We still need the converse. Take a spectral decomposition. The eigenvalues are non-negative and sum to $$1$$, so they form a perfectly valid probability distribution on the ensemble formed by the eigenvectors.

One can also determine from the density operator whether it represents a pure state:

$$
\Tr(\rho^2) \leq 1, \quad \text{with equality if and only if } \rho \text{ is pure.}
$$

This is an exercise, and a simple one: do a spectral decomposition — after all, $$\rho$$ is positive semi-definite.

Now let us nail down the uniqueness, and to what degree we have it.

> **Theorem (Unitary freedom in the ensemble).** Two ensembles $$\{\ket{\tilde{\psi}_i}\}$$ and $$\{\ket{\tilde{\varphi}_j}\}$$ of (unnormalised) vectors, with the $$\sqrt{p}$$ absorbed into the vectors, generate the same density operator if and only if
>
> $$
> \ket{\tilde{\psi}_i} = \sum_j u_{ij} \ket{\tilde{\varphi}_j}
> $$
>
> for some unitary matrix of scalars $$(u_{ij})$$, where the shorter list is padded with zero vectors.

Let us now talk about the geometric representation of density matrices: the **Bloch sphere**. An arbitrary density matrix for a mixed-state qubit may be written as

$$
\rho = \frac{I + \vec{r} \cdot \vec{\sigma}}{2},
$$

where $$\vec{\sigma} = (X, Y, Z)$$ is the vector of Pauli matrices and $$\lVert \vec{r} \rVert \leq 1$$, with equality if and only if the state is pure.

Let us see why. Any density matrix is Hermitian, hence can be written as a real linear combination of the Pauli matrices together with the identity, so $$\rho = cI + \vec{r} \cdot \vec{\sigma}$$. Since the Pauli matrices are traceless and $$\Tr(\rho) = 1$$, we get $$c = 1/2$$, giving the representation above. Now write $$\rho$$ in the Pauli basis and compute the eigenvalues, which come out as $$\tfrac{1}{2}(1 \pm \lVert \vec{r} \rVert)$$; non-negativity, which holds because $$\rho$$ is positive semi-definite, forces $$\lVert \vec{r} \rVert \leq 1$$. The equality condition is now trivial to check against $$\Tr(\rho^2) = \tfrac{1}{2}(1 + \lVert \vec{r} \rVert^2)$$.

### Reduced Density Matrices

As I said, the power of density matrices becomes evident here. The **reduced density operator** for system $$A$$ is defined by

$$
\rho^{A} = \Tr_{B}\!\left( \rho^{AB} \right),
$$

where the **partial trace** is the linear map determined by

$$
\Tr_{B}\!\left( \ketbra{a_1}{a_2} \otimes \ketbra{b_1}{b_2} \right) = \ketbra{a_1}{a_2} \, \Tr\!\left( \ketbra{b_1}{b_2} \right) = \ketbra{a_1}{a_2} \braket{b_2}{b_1}.
$$

Now take the entangled state we have been considering for so long and trace out either subsystem: you will see that the reduced density matrix is $$I/2$$. This carries no information whatsoever about what was done on the other side, so Alice cannot infer anything about Bob's qubit, or vice versa, and no operation Alice performs locally changes Bob's reduced state. This is the **no-communication theorem**. The state is called **maximally entangled**: change the basis however you like, and the reduced density operator stays $$I/2$$. Do the computations I have left out here!

> **A note.** There are many things to talk about now: quantum circuits in detail, and before we even move there, quantum mechanics in general and how it leads to quantum computing. There is also Bell's inequality. For now, I will skip directly to a few toy quantum algorithms.

## Quantum Toy Algorithms

### Quantum Query Complexity

There are two major ways to look at the complexity of quantum algorithms. The **circuit complexity** of a unitary transformation $$U$$ is the size — the number of gates — of the smallest circuit implementing $$U$$. Typically this is very hard to compute; we can get some upper bounds, and conjecture lower bounds from hardness assumptions and reduction arguments. This has nothing to do with quantum mechanics in particular: it is a general problem, closely related to $$P$$ versus $$NP$$.

Given this conundrum, we have come up with an alternative complexity measure: **query complexity**, that is, how many times our algorithm calls upon the services of a black-box function, or _oracle_. Given $$f : \{0,1\}^n \to \{0,1\}$$, one might want the map $$\ket{x} \mapsto \ket{f(x)}$$. Unfortunately that is not a unitary transformation, and the gods of quantum mechanics have prohibited it. To make it unitary we need an answer register. So we give the black box two inputs $$\ket{x, y}$$, where the answer is written into the second:

$$
\ket{x, y} \;\longmapsto\; \ket{x,\, y \oplus f(x)}.
$$

If we take care to set $$y = 0$$, this acts exactly as the classical oracle. We call this the **XOR oracle**.

We will soon see that it is useful to consider queries that map each basis state as

$$
\ket{x} \;\longmapsto\; (-1)^{f(x)} \ket{x},
$$

that is, queries that write the function value into the _phase_ of the amplitude. A refined version is $$\ket{x, b} \mapsto (-1)^{f(x) \cdot b} \ket{x, b}$$, where $$b$$ is a control bit deciding whether the query takes place. This is the **phase oracle**, and it has no classical counterpart.

It turns out the phase oracle and the XOR oracle are equivalent, in the sense that either can simulate the other with no cost in the number of queries. To see it, apply a Hadamard to the second register before running it through the XOR oracle — putting the output register in the $$\ket{-}$$ state makes the XOR oracle act as a phase oracle, and the same trick run backwards gives the other direction.

The query model is also called the **black-box model**, because you are trying to learn some property of $$f$$ just by evaluating it on multiple inputs, and we are interested in how many queries are needed to learn the desired property. There is also another question: can we really even simulate the XOR oracle given an unknown circuit that computes $$f$$? I will answer that some other time.

### Deutsch's Algorithm

Deutsch's algorithm computes the parity of two bits using only one superposed query.

Consider the following oracle: given a bit $$x \in \{0,1\}$$, it returns $$f(x)$$. Classically we need two queries to know the parity $$f(0) \oplus f(1)$$. Our quantum algorithm will do it in one.

Start with $$\ket{0}$$, apply a Hadamard to get $$\ket{+}$$, then apply a phase query:

$$
\ket{0} \;\longrightarrow\; \frac{\ket{0} + \ket{1}}{\sqrt{2}} \;\longrightarrow\; \frac{(-1)^{f(0)} \ket{0} + (-1)^{f(1)} \ket{1}}{\sqrt{2}}.
$$

Now, if $$f(0) = f(1)$$ we get one state, and if they differ we get another. Global phase does not matter, so these are just $$\ket{+}$$ and $$\ket{-}$$ respectively, and a Hadamard followed by a computational-basis measurement tells them apart with certainty.

We can extend this to an $$n$$-bit input string, which takes $$n/2$$ queries: break the string into $$n/2$$ blocks of two bits, use Deutsch's algorithm to learn the parity $$p_B$$ of each block $$B$$, and add them up to get the parity of the whole string.

This query complexity turns out to be optimal, but we will not prove that for now. This algorithm really is a toy, but the idea gets reused repeatedly.

### The Deutsch–Jozsa Algorithm

Suppose we have a black-box function $$f : \{0,1\}^n \to \{0,1\}$$ promised to be either _balanced_ or _constant_, and we want to decide which. Classically, a deterministic solution requires $$2^{n-1} + 1$$ queries. The quantum algorithm requires a single query. Again, this is really a toy problem.

It is good to get the pattern at this point:

1. Put everything in superposition.
2. Query $$f$$ using a phase query.
3. Apply a change of basis — so, Hadamard again.
4. Measure what you want.

Now,

$$
H\ket{x} = \frac{\ket{0} + (-1)^{x} \ket{1}}{\sqrt{2}},
$$

and for an $$n$$-bit string we just tensorise the expression above to get

$$
H^{\otimes n} \ket{x_0 \dots x_{n-1}} = \frac{1}{\sqrt{2^{n}}} \sum_{y \in \{0,1\}^{n}} (-1)^{x \cdot y} \ket{y}.
$$

For us the initial state is $$\ket{0}^{\otimes n}$$, so Hadamarding and then applying the phase query — which acts linearly on each term — gives

$$
\frac{1}{\sqrt{2^{n}}} \sum_{x \in \{0,1\}^{n}} (-1)^{f(x)} \ket{x}.
$$

Hadamarding again and reading off the amplitude of $$\ket{0}^{\otimes n}$$:

$$
\frac{1}{2^{n}} \sum_{x \in \{0,1\}^{n}} (-1)^{f(x)}.
$$

This amplitude is $$1$$ or $$-1$$ if the function is constant, and $$0$$ if it is balanced. So a single measurement decides the question.

### Bernstein–Vazirani

We are given a black-box function $$f : \{0,1\}^n \to \{0,1\}$$, promised that for some secret string $$s$$,

$$
f(x) = s \cdot x \bmod 2.
$$

We need to find $$s$$. Classically we can do this in $$n$$ queries, and that is optimal. The quantum algorithm requires only one.

We first create a superposition:

$$
\ket{\psi} = \frac{1}{\sqrt{2^{n}}} \sum_{x \in \{0,1\}^{n}} \ket{x}.
$$

Now we do a phase query:

$$
\ket{\psi} \;\longmapsto\; \frac{1}{\sqrt{2^{n}}} \sum_{x \in \{0,1\}^{n}} (-1)^{f(x)} \ket{x} = \frac{1}{\sqrt{2^{n}}} \sum_{x \in \{0,1\}^{n}} (-1)^{x \cdot s} \ket{x}.
$$

Observe that this is suspiciously close to the Hadamard formula above — it _is_ $$H^{\otimes n}\ket{s}$$. So applying $$H^{\otimes n}$$ to this state returns $$\ket{s}$$, and measuring gives $$s$$. This is not a convenient result; the problem was made to fit the algorithm.

### Simon's Algorithm

This time we are given an oracle $$f : \{0,1\}^n \to \{0,1\}^n$$ and a secret string $$s \neq 0^n$$ such that

$$
f(x) = f(y) \iff y = x \oplus s.
$$

We need to find $$s$$ with as few queries as possible. Observe that the function is two-to-one.

We can find $$s$$ as soon as we find $$x \neq y$$ with the same output, by XORing them. Deterministically this again takes $$2^{n-1} + 1$$ queries, so exponential. Unlike Deutsch–Jozsa, where a randomised algorithm gets away with constant time, here even the randomised algorithm takes exponentially many queries — by the birthday problem, with $$n$$ days in a year you need about $$\sqrt{n}$$ people for a decent chance of a collision, so here we need $$\Omega(2^{n/2})$$. We can do it on a quantum computer with $$O(n)$$ queries.

**Algorithm.**

1. Start with $$2n$$ qubits initialised to $$\ket{0}^{\otimes 2n}$$. The first $$n$$ are the input register, the second $$n$$ the answer register.
2. Hadamard the first $$n$$ qubits.
3. Query $$f$$ using the XOR oracle.

This gives the state

$$
\frac{1}{\sqrt{2^{n}}} \sum_{x \in \{0,1\}^{n}} \ket{x} \ket{f(x)}.
$$

Now we do not really care about the answer register, so we just measure it and be done with it — or do whatever else you like with it. No matter what it collapses to, say $$\ket{w}$$, we are left with an equal superposition of the inputs consistent with $$w$$:

$$
\frac{\ket{x} + \ket{y}}{\sqrt{2}}, \qquad \text{where } f(x) = f(y) = w, \quad y = x \oplus s.
$$

We are in a bit of a pinch now, since measuring this in the computational basis just returns one of $$x, y$$ at random and tells us nothing. So we measure in the Hadamard basis instead: apply $$H^{\otimes n}$$ and then measure in the computational basis. Hadamarding makes it

$$
\frac{1}{\sqrt{2^{\,n+1}}} \sum_{z \in \{0,1\}^{n}} \left[ (-1)^{x \cdot z} + (-1)^{y \cdot z} \right] \ket{z}.
$$

Since $$y = x \oplus s$$, the bracket is $$\pm 2$$ when $$s \cdot z = 0 \bmod 2$$ and $$0$$ otherwise, so the $$z$$ we measure is uniformly random among those with $$s \cdot z = 0$$. What if we want $$s$$ itself? We repeat the experiment. Each run gives one linear constraint on $$s$$ over $$\mathbb{F}_2$$, and after $$O(n)$$ runs we have $$n - 1$$ independent equations, which we solve to pin down $$s$$. So the query complexity is $$O(n)$$.

Simon was actually trying to _disprove_ that an exponential speedup was possible, and stumbled onto one. But this is really a toy, and has no application. He tried to publish it and it got rejected. Shor, on the committee, found it interesting and noticed that with a few caveats we can do some actual stuff here.

Shor's quantum Fourier transform incoming.
