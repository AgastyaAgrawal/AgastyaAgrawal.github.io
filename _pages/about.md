---
layout: about
title: Home
permalink: /
news: false 
selected_papers: false 
social: true 
---

<div class="hero-universe">
  <div class="hero-content">
    <h1 class="hero-title">Welcome to my universe.</h1>
  </div>
  
  <svg class="hero-tree" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M 80 100 Q 80 60 70 40 Q 60 20 40 10 Q 55 25 65 45 Q 70 60 75 100 Z" fill="currentColor"/>
    <path d="M 70 40 Q 85 25 95 15 Q 85 30 75 45 Z" fill="currentColor"/>
    <path d="M 65 45 Q 50 40 35 35 Q 45 45 60 55 Z" fill="currentColor"/>
  </svg>

  <div class="leaf leaf-1"></div>
  <div class="leaf leaf-2"></div>
  <div class="leaf leaf-3"></div>
  <div class="leaf leaf-4"></div>
</div>

<style>
  .hero-universe {
    width: 100vw;
    height: 50vh;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: -2rem;
    margin-bottom: 3rem;
    background: var(--global-bg-color);
    border-bottom: 1px dotted var(--global-divider-color);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .hero-content {
    padding-left: 10vw;
    z-index: 10;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--global-text-color);
    letter-spacing: -0.05rem;
  }

  .hero-tree {
    position: absolute;
    right: 5vw;
    bottom: 0;
    height: 85%;
    width: auto;
    color: var(--global-text-color);
    opacity: 0.15; /* Kept very subtle so it acts as a background */
  }

  /* Leaf Geometry and Animation */
  .leaf {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: var(--global-theme-color);
    border-radius: 0 100% 0 100%;
    opacity: 0;
    right: 15vw;
    bottom: 25vh;
  }

  .leaf-1 { animation: blowLeft 8s linear infinite; animation-delay: 0s; }
  .leaf-2 { animation: blowLeft 10s linear infinite; animation-delay: 2s; bottom: 35vh; right: 12vw;}
  .leaf-3 { animation: blowLeft 7s linear infinite; animation-delay: 4s; bottom: 30vh; right: 10vw;}
  .leaf-4 { animation: blowLeft 9s linear infinite; animation-delay: 6s; bottom: 40vh; right: 18vw;}

  @keyframes blowLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.6; }
    80% { opacity: 0.6; }
    100% { transform: translate(-70vw, 15vh) rotate(720deg); opacity: 0; }
  }

  @media (max-width: 768px) {
    .hero-title { font-size: 2rem; }
    .hero-tree { right: -10vw; height: 70%; opacity: 0.1; }
  }
</style>

<div class="clearfix">
  <p>Hi, I'm Agastya. I am an undergraduate at the <a href="https://www.cmi.ac.in/" target="_blank">Chennai Mathematical Institute (CMI)</a>, specializing in mathematics and computer science.</p> 

  <p>My research interests lie heavily in <strong>AI alignment</strong> and <strong>interpreting AI</strong>. I am currently focused on understanding deceptive chain-of-thought in fine-tuned language models—specifically using techniques like PCA and cosine similarity to find "truth directions" in activation spaces. Additionally, I am interested in the applications of probability and statistics in fields like ML and financial markets.</p>

  <p>I recently published independent research on <a href="https://www.lesswrong.com/" target="_blank">Uncovering Unfaithful CoT in Deceptive Models</a> which was featured on the front page of LessWrong. Currently, I am working through the ARENA curriculum to further sharpen my research engineering skills.</p>

  <p><em>I am actively seeking a summer 2026 research internship in machine learning and AI alignment.</em></p>
</div>
