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
  <div class="petal petal-9"></div>
  <div class="petal petal-10"></div>
</div>

<style>
  .hero-universe {
    width: 100vw;
    height: 75vh; /* Expands the canvas to show off the gorgeous HD art */
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 0;
    margin-bottom: 4rem;
    
    /* Pulls your downloaded HD image directly from your repository */
    background-image: url('{{ "/assets/img/sakura.jpg" | relative_url }}');
    background-size: cover;
    background-position: center center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
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
    /* Smooth, elegant fade to protect the text */
    background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(255,255,255,0.85) 25%, transparent 65%);
    z-index: 1;
  }
  
  [data-theme="dark"] .hero-overlay {
      background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(30,30,30,0.85) 25%, transparent 65%);
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
    text-shadow: 0px 4px 20px rgba(0,0,0,0.15); /* Gives the text a premium lift */
  }

  /* Calibrated Cinematic Petal Geometry */
  .petal {
    position: absolute;
    background: #ffb7c5;
    border-radius: 15px 0 15px 0;
    opacity: 0;
    z-index: 6;
  }

  /* Staggered, slow-motion drifting. 
    Smaller sizes (8px-14px) and varied blurs create a 3D depth-of-field effect.
  */
  .petal-1 { width: 12px; height: 12px; animation: driftLeft 18s linear infinite; animation-delay: 0s; right: 10vw; bottom: 60vh; box-shadow: 0 0 4px rgba(255,183,197,0.8); }
  .petal-2 { width: 14px; height: 14px; animation: driftLeft 22s linear infinite; animation-delay: 4s; right: -5vw; bottom: 40vh; background: #ff9eb5; filter: blur(1px); }
  .petal-3 { width: 10px; height: 10px; animation: driftLeft 16s linear infinite; animation-delay: 7s; right: 15vw; bottom: 70vh; opacity: 0.7; }
  .petal-4 { width: 8px; height: 8px; animation: driftLeft 25s linear infinite; animation-delay: 2s; right: 5vw; bottom: 25vh; filter: blur(2px); }
  .petal-5 { width: 13px; height: 13px; animation: driftLeft 19s linear infinite; animation-delay: 11s; right: 20vw; bottom: 50vh; background: #ff9eb5; box-shadow: 0 0 6px rgba(255,183,197,0.9); }
  .petal-6 { width: 15px; height: 15px; animation: driftLeft 21s linear infinite; animation-delay: 5s; right: -2vw; bottom: 35vh; }
  .petal-7 { width: 11px; height: 11px; animation: driftLeft 17s linear infinite; animation-delay: 9s; right: 12vw; bottom: 80vh; filter: blur(1px); }
  .petal-8 { width: 9px; height: 9px; animation: driftLeft 24s linear infinite; animation-delay: 14s; right: 18vw; bottom: 15vh; opacity: 0.6; }
  .petal-9 { width: 14px; height: 14px; animation: driftLeft 20s linear infinite; animation-delay: 1s; right: 25vw; bottom: 45vh; box-shadow: 0 0 5px rgba(255,183,197,0.8); }
  .petal-10{ width: 12px; height: 12px; animation: driftLeft 23s linear infinite; animation-delay: 13s; right: 8vw; bottom: 65vh; background: #ff9eb5; filter: blur(1px); }

  @keyframes driftLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.85; }
    85% { opacity: 0.85; }
    100% { transform: translate(-85vw, 15vh) rotate(720deg); opacity: 0; }
  }

  @media (max-width: 768px) {
    .hero-title { font-size: 2.8rem; }
    .hero-universe { height: 50vh; background-position: 70% center; }
    .hero-overlay { background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(255,255,255,0.9) 40%, transparent 100%); }
    [data-theme="dark"] .hero-overlay { background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(30,30,30,0.9) 40%, transparent 100%); }
  }
</style>

<div class="clearfix">
  <p>Hi, I'm Agastya. I am an undergraduate at the <a href="https://www.cmi.ac.in/" target="_blank">Chennai Mathematical Institute (CMI)</a>, specializing in mathematics and computer science.</p> 

  <p>My research interests lie heavily in <strong>AI alignment</strong> and <strong>interpreting AI</strong>. I am currently focused on understanding deceptive chain-of-thought in fine-tuned language models—specifically using techniques like PCA and cosine similarity to find "truth directions" in activation spaces. Additionally, I am interested in the applications of probability and statistics in fields like ML and financial markets.</p>

  <p>I recently published independent research on <a href="https://www.lesswrong.com/" target="_blank">Uncovering Unfaithful CoT in Deceptive Models</a> which was featured on the front page of LessWrong. Currently, I am working through the ARENA curriculum to further sharpen my research engineering skills.</p>

  <p><em>I am actively seeking a summer 2026 research internship in machine learning and AI alignment.</em></p>
</div>
