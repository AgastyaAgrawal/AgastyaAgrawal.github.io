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

  /* --- HERO SECTION STYLES --- */
  .hero-universe {
    width: 100vw;
    height: 50vh; 
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: -3rem; 
    margin-bottom: 4rem;
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
    text-shadow: 0px 4px 20px rgba(0,0,0,0.15); 
  }

  /* --- PETAL ANIMATIONS --- */
  .petal {
    position: absolute;
    background: #ffb7c5;
    border-radius: 15px 0 15px 0;
    opacity: 0;
    z-index: 6;
  }

  .petal-1 { width: 12px; height: 12px; animation: driftLeft 18s linear infinite; animation-delay: 0s; right: 10vw; bottom: 35vh; box-shadow: 0 0 4px rgba(255,183,197,0.8); }
  .petal-2 { width: 14px; height: 14px; animation: driftLeft 22s linear infinite; animation-delay: 4s; right: -5vw; bottom: 20vh; background: #ff9eb5; filter: blur(1px); }
  .petal-3 { width: 10px; height: 10px; animation: driftLeft 16s linear infinite; animation-delay: 7s; right: 15vw; bottom: 40vh; opacity: 0.7; }
  .petal-4 { width: 8px; height: 8px; animation: driftLeft 25s linear infinite; animation-delay: 2s; right: 5vw; bottom: 10vh; filter: blur(2px); }
  .petal-5 { width: 13px; height: 13px; animation: driftLeft 19s linear infinite; animation-delay: 11s; right: 20vw; bottom: 25vh; background: #ff9eb5; box-shadow: 0 0 6px rgba(255,183,197,0.9); }
  .petal-6 { width: 15px; height: 15px; animation: driftLeft 21s linear infinite; animation-delay: 5s; right: -2vw; bottom: 15vh; }
  .petal-7 { width: 11px; height: 11px; animation: driftLeft 17s linear infinite; animation-delay: 9s; right: 12vw; bottom: 45vh; filter: blur(1px); }
  .petal-8 { width: 9px; height: 9px; animation: driftLeft 24s linear infinite; animation-delay: 14s; right: 18vw; bottom: 5vh; opacity: 0.6; }
  .petal-9 { width: 14px; height: 14px; animation: driftLeft 20s linear infinite; animation-delay: 1s; right: 25vw; bottom: 30vh; box-shadow: 0 0 5px rgba(255,183,197,0.8); }
  .petal-10{ width: 12px; height: 12px; animation: driftLeft 23s linear infinite; animation-delay: 13s; right: 8vw; bottom: 38vh; background: #ff9eb5; filter: blur(1px); }

  @keyframes driftLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.85; }
    85% { opacity: 0.85; }
    100% { transform: translate(-85vw, 15vh) rotate(720deg); opacity: 0; }
  }

  /* --- TYPOGRAPHY & LINKS --- */
  .home-section {
    margin-bottom: 4rem;
  }

  .home-section h2 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--global-text-color);
  }

  .home-section p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }

  /* Standard text links */
  .home-section a.text-link {
    color: #c94c6d; 
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    font-weight: 500;
  }
  
  .home-section a.text-link:hover {
    color: #a03b55;
    text-decoration: underline;
  }

  /* Call to action links below sections */
  .section-cta {
    display: inline-block;
    margin-top: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: #c94c6d;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .section-cta:hover {
    color: #a03b55;
    text-decoration: none;
    border-bottom: 2px solid #a03b55;
  }

  .home-section ::selection {
    background: rgba(201, 76, 109, 0.3);
  }

  /* --- PROFILE HEADER LAYOUT --- */
  .profile-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5rem; /* Increased gap to push the image further right */
    margin-top: 2rem;
    width: 124%;         
    margin-left: -12%;   
  }

  .profile-text {
    flex: 1.5; 
  }

  .profile-pic-container {
    flex: 1;
    display: flex;
    justify-content: flex-end; 
  }

  .profile-pic {
    width: 100%;
    max-width: 480px; 
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 0; 
    box-shadow: 0 8px 25px rgba(0,0,0,0.08); 
    transition: transform 0.3s ease;
  }

  .profile-pic:hover {
    transform: translateY(-5px);
  }

  /* Mobile & Tablet responsiveness */
  @media (max-width: 992px) {
    .profile-content {
      flex-direction: column;
      width: 100%;
      margin-left: 0;
      gap: 2rem;
    }
    .profile-pic-container {
      justify-content: center;
    }
    .hero-title { font-size: 2.8rem; }
    .hero-universe { height: 40vh; margin-top: -2rem; background-position: 70% center; }
  }
</style>

<div class="hero-universe">
  <div class="hero-overlay"></div>
  
  <div class="hero-content">
    <h1 class="hero-title">Welcome to my universe</h1>
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

<div class="home-section">

  <div class="profile-content home-section">
    <div class="profile-text">
      <p>Hi, I'm Agastya. I am an undergraduate at the <a href="https://www.cmi.ac.in/" target="_blank" class="text-link">Chennai Mathematical Institute (CMI)</a>, pursuing my bachelors in mathematics and computer science.</p> 

      <p><em>I am actively seeking a summer 2026 research internship in machine learning and AI alignment.</em></p>

      <a href="{{ '/cv/' | relative_url }}" class="section-cta">View my full CV &rarr;</a>
    </div>

    <div class="profile-pic-container">
      <img src="{{ '/assets/img/my_photo.jpg' | relative_url }}" alt="Agastya Agrawal" class="profile-pic">
    </div>
  </div>

  <div class="home-section">
    <h2>Research</h2>
    <p>My research interests lie heavily in <strong>AI alignment</strong> and <strong>interpreting AI</strong>. I am currently focused on understanding deceptive chain-of-thought in fine-tuned language models—specifically using techniques like PCA and cosine similarity to find "truth directions" in activation spaces. Additionally, I am interested in the applications of probability and statistics in fields like ML and financial markets.</p>

    <p>I recently published independent research on <a href="https://www.lesswrong.com/" target="_blank" class="text-link">Uncovering Unfaithful CoT in Deceptive Models</a> which was featured on the front page of LessWrong. Currently, I am working through the ARENA curriculum to further sharpen my research engineering skills.</p>

    <a href="{{ '/publications/' | relative_url }}" class="section-cta">View my publications &rarr;</a>
  </div>

  <div class="home-section">
    <h2>Blog</h2>
    <p>I actively document my experiments, engineering deep-dives, and thoughts on AI alignment. This is where I share technical walkthroughs, notes from my ARENA curriculum progress, and raw ideas as they develop.</p>

    <a href="{{ '/blog/' | relative_url }}" class="section-cta">Read my blog &rarr;</a>
  </div>

</div>
