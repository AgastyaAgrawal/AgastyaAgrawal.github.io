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
  <div class="hero-content">
    <h1 class="hero-title">Welcome to my universe.</h1>
  </div>
  
  <svg class="hero-tree-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="120" cy="180" rx="60" ry="10" fill="#a0b4c4" opacity="0.3" filter="blur(4px)"/>
    
    <path d="M100,200 C100,140 85,100 60,60 C75,85 90,120 95,150 C100,120 115,80 140,50 C120,75 105,110 105,150 C105,170 110,190 115,200 Z" fill="#2c3e50" opacity="0.9"/>
    <path d="M95,150 C80,120 65,95 40,80 C55,95 70,120 85,140 Z" fill="#2c3e50" opacity="0.8"/>
    
    <circle cx="80" cy="70" r="40" fill="#ffb7c5" opacity="0.85" filter="blur(3px)"/>
    <circle cx="130" cy="60" r="45" fill="#ff9eb5" opacity="0.75" filter="blur(4px)"/>
    <circle cx="105" cy="35" r="35" fill="#ffa6b9" opacity="0.8" filter="blur(3px)"/>
    <circle cx="145" cy="95" r="30" fill="#ffb7c5" opacity="0.7" filter="blur(2px)"/>
    <circle cx="55" cy="100" r="30" fill="#ffc2d1" opacity="0.8" filter="blur(3px)"/>
    <circle cx="100" cy="80" r="45" fill="#ff8da1" opacity="0.65" filter="blur(5px)"/>
    <circle cx="120" cy="120" r="25" fill="#ffb7c5" opacity="0.7" filter="blur(2px)"/>
  </svg>

  <div class="petal petal-1"></div>
  <div class="petal petal-2"></div>
  <div class="petal petal-3"></div>
  <div class="petal petal-4"></div>
  <div class="petal petal-5"></div>
  <div class="petal petal-6"></div>
</div>

<style>
  .hero-universe {
    width: 100vw;
    height: 60vh;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 0;
    margin-bottom: 4rem;
    /* The "Bluish Squish" gradient background */
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .hero-content {
    padding-left: 10vw;
    z-index: 10;
  }
  
  .hero-title {
    font-size: 4rem;
    font-weight: 800;
    color: #2c3e50;
    letter-spacing: -0.05rem;
    text-shadow: 2px 2px 10px rgba(255,255,255,0.5); /* Helps text stand out */
  }

  /* SVG Tree Positioning */
  .hero-tree-svg {
    position: absolute;
    right: 5vw;
    bottom: -5vh;
    height: 100%;
    width: auto;
    z-index: 5;
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
    box-shadow: 0 0 6px rgba(255,183,197,0.8);
  }

  /* Continuous looping wind effect from Right to Left */
  .petal-1 { animation: driftLeft 12s linear infinite; animation-delay: 0s; right: 25vw; bottom: 40vh; }
  .petal-2 { animation: driftLeft 15s linear infinite; animation-delay: 3s; right: 15vw; bottom: 30vh; background: #ff9eb5; }
  .petal-3 { animation: driftLeft 10s linear infinite; animation-delay: 6s; right: 20vw; bottom: 50vh; }
  .petal-4 { animation: driftLeft 14s linear infinite; animation-delay: 1s; right: 10vw; bottom: 25vh; width: 10px; height: 10px; }
  .petal-5 { animation: driftLeft 11s linear infinite; animation-delay: 8s; right: 18vw; bottom: 45vh; background: #ff9eb5; }
  .petal-6 { animation: driftLeft 13s linear infinite; animation-delay: 4s; right: 22vw; bottom: 35vh; width: 18px; height: 18px; }

  @keyframes driftLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    15% { opacity: 0.9; }
    85% { opacity: 0.9; }
    100% { transform: translate(-80vw, 15vh) rotate(720deg); opacity: 0; }
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .hero-tree-svg { right: -15vw; height: 75%; opacity: 0.8; }
  }
</style>

<div class="clearfix">
  <p>Hi, I'm Agastya. I am an undergraduate at the <a href="https://www.cmi.ac.in/" target="_blank">Chennai Mathematical Institute (CMI)</a>, specializing in mathematics and computer science.</p> 

  <p>My research interests lie heavily in <strong>AI alignment</strong> and <strong>interpreting AI</strong>. I am currently focused on understanding deceptive chain-of-thought in fine-tuned language models—specifically using techniques like PCA and cosine similarity to find "truth directions" in activation spaces. Additionally, I am interested in the applications of probability and statistics in fields like ML and financial markets.</p>

  <p>I recently published independent research on <a href="https://www.lesswrong.com/" target="_blank">Uncovering Unfaithful CoT in Deceptive Models</a> which was featured on the front page of LessWrong. Currently, I am working through the ARENA curriculum to further sharpen my research engineering skills.</p>

  <p><em>I am actively seeking a summer 2026 research internship in machine learning and AI alignment.</em></p>
</div>
