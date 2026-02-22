---
layout: about
title: Home
permalink: /
news: false 
selected_papers: false 
social: true 
---

<style>
  header.post-header { display: none !important; }
</style>

<div class="hero-universe">
  <div class="hero-overlay"></div>
  
  <div class="hero-content">
    <h1 class="hero-title">Welcome to my universe.</h1>
  </div>

  <div class="petal petal-1"></div>
  <div class="petal petal-2"></div>
  <div class="petal petal-3"></div>
  <div class="petal petal-4"></div>
  <div class="petal petal-5"></div>
  <div class="petal petal-6"></div>
  <div class="petal petal-7"></div>
  <div class="petal petal-8"></div>
</div>

<style>
  .hero-universe {
    width: 100vw;
    height: 70vh; /* Taller section to show off the landscape */
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 0;
    margin-bottom: 4rem;
    
    /* PASTE THE IMAGE URL BETWEEN THE QUOTES BELOW */
    background-image: url('PASTE_URL_HERE');
    
    background-size: cover;
    background-position: right center;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Fades from solid background color to completely clear */
    background: linear-gradient(to right, var(--global-bg-color) 0%, var(--global-bg-color) 35%, transparent 75%);
    z-index: 1;
  }
  
  .hero-content {
    position: relative; 
    padding-left: 10vw;
    z-index: 10;
  }
  
  .hero-title {
    font-size: 4.5rem;
    font-weight: 800;
    color: var(--global-text-color);
    letter-spacing: -0.05rem;
    text-shadow: 0px 4px 15px rgba(0,0,0,0.1); /* Subtle shadow for extra pop */
  }

  /* Petal Geometry and Animation */
  .petal {
    position: absolute;
    width: 14px;
    height: 14px;
    background: #ffb7c5;
    border-radius: 15px 0 15px 0;
    opacity: 0;
    z-index: 6;
    box-shadow: 0 0 8px rgba(255,183,197,0.6);
  }

  /* Looping wind effect from Right to Left, staggered for realism */
  .petal-1 { animation: driftLeft 12s linear infinite; animation-delay: 0s; right: 10vw; bottom: 40vh; }
  .petal-2 { animation: driftLeft 15s linear infinite; animation-delay: 3s; right: 5vw; bottom: 30vh; background: #ff9eb5; }
  .petal-3 { animation: driftLeft 10s linear infinite; animation-delay: 6s; right: 15vw; bottom: 50vh; }
  .petal-4 { animation: driftLeft 14s linear infinite; animation-delay: 1s; right: 8vw; bottom: 25vh; width: 10px; height: 10px; }
  .petal-5 { animation: driftLeft 11s linear infinite; animation-delay: 8s; right: 20vw; bottom: 45vh; background: #ff9eb5; }
  .petal-6 { animation: driftLeft 13s linear infinite; animation-delay: 4s; right: 2vw; bottom: 35vh; width: 18px; height: 18px; }
  .petal-7 { animation: driftLeft 9s linear infinite; animation-delay: 2s; right: 12vw; bottom: 55vh; }
  .petal-8 { animation: driftLeft 16s linear infinite; animation-delay: 5s; right: 18vw; bottom: 20vh; width: 12px; height: 12px; }

  @keyframes driftLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    15% { opacity: 0.9; }
    85% { opacity: 0.9; }
    100% { transform: translate(-80vw, 10vh) rotate(720deg); opacity: 0; }
  }

  @media (max-width: 768px) {
    .hero-title { font-size: 2.8rem; }
    .hero-overlay { background: linear-gradient(to right, var(--global-bg-color) 0%, var(--global-bg-color) 50%, transparent 100%); }
  }
</style>

<div class="clearfix">
  <p>Hi, I'm Agastya. I am an undergraduate at the <a href="https://www.cmi.ac.in/" target="_blank">Chennai Mathematical Institute (CMI)</a>, specializing in mathematics and computer science.</p> 

  <p>My research interests lie heavily in <strong>AI alignment</strong> and <strong>interpreting AI</strong>. I am currently focused on understanding deceptive chain-of-thought in fine-tuned language models—specifically using techniques like PCA and cosine similarity to find "truth directions" in activation spaces. Additionally, I am interested in the applications of probability and statistics in fields like ML and financial markets.</p>

  <p>I recently published independent research on <a href="https://www.lesswrong.com/" target="_blank">Uncovering Unfaithful CoT in Deceptive Models</a> which was featured on the front page of LessWrong. Currently, I am working through the ARENA curriculum to further sharpen my research engineering skills.</p>

  <p><em>I am actively seeking a summer 2026 research internship in machine learning and AI alignment.</em></p>
</div>
