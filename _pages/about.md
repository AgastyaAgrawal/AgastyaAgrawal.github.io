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
  
  /* 1. THE HERO (Top Half) */
  .hero-universe {
    width: 100vw;
    height: 45vh; 
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: -3.5rem; 
    margin-bottom: 2rem;
    background-image: url('{{ "/assets/img/sakura.jpg" | relative_url }}');
    background-size: cover;
    background-position: center center; 
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .hero-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(255,255,255,0.85) 25%, transparent 65%);
    z-index: 1;
  }
  
  [data-theme="dark"] .hero-overlay {
      background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(30,30,30,0.85) 25%, transparent 65%);
  }

  .hero-title {
    position: relative;
    z-index: 10;
    padding-left: 10vw;
    font-size: 4rem;
    font-weight: 800;
    color: var(--global-text-color);
  }

  /* 2. THE INTRO SECTION (Side-by-Side) */
  .intro-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 4rem;
  }

  .intro-text {
    flex: 2;
    font-size: 1.15rem; /* Larger font size */
    line-height: 1.6;
  }

  .intro-image-wrapper {
    flex: 1;
    text-align: right;
  }

  .intro-image {
    width: 100%;
    max-width: 300px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .section-heading {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--global-theme-color);
    display: inline-block;
  }

  .read-more-btn {
    display: inline-block;
    margin-top: 1rem;
    padding: 8px 20px;
    background: var(--global-theme-color);
    color: white !important;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s;
  }

  .read-more-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* 3. BLOG PREVIEW SECTION */
  .featured-blogs {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--global-divider-color);
  }

  /* Petal Styles remain same as your previous working version */
  .petal { position: absolute; background: #ffb7c5; border-radius: 15px 0 15px 0; opacity: 0; z-index: 6; }
  @keyframes driftLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.85; }
    85% { opacity: 0.85; }
    100% { transform: translate(-85vw, 15vh) rotate(720deg); opacity: 0; }
  }
</style>

<div class="hero-universe">
  <div class="hero-overlay"></div>
  <h1 class="hero-title">Welcome to my universe.</h1>
  <div class="petal petal-1" style="animation: driftLeft 18s linear infinite; right: 10vw; bottom: 35vh;"></div>
  <div class="petal petal-2" style="animation: driftLeft 22s linear infinite; right: -5vw; bottom: 20vh;"></div>
  <div class="petal petal-3" style="animation: driftLeft 16s linear infinite; right: 15vw; bottom: 40vh;"></div>
</div>

<div class="intro-container">
  <div class="intro-text">
    <h2 class="section-heading">About Me</h2>
    <p>Hi, I'm Agastya. I am an undergraduate at the <strong>Chennai Mathematical Institute (CMI)</strong>, specializing in mathematics and computer science.</p>
    <p>My research focuses on <strong>AI alignment</strong> and <strong>mechanistic interpretability</strong>—specifically uncovering deceptive chain-of-thought in fine-tuned language models. I enjoy applying probability and statistics to explore complex systems in ML and financial markets.</p>
    
    <a href="{{ '/about/' | relative_url }}" class="read-more-btn">Full Story →</a>
  </div>
  
  <div class="intro-image-wrapper">
    <img src="{{ '/assets/img/prof_pic.jpg' | relative_url }}" class="intro-image" alt="Agastya Agrawal">
  </div>
</div>

<div class="featured-blogs">
  <h2 class="section-heading">Writing & Research</h2>
  <p>I write about my latest experiments in AI safety and mathematics. You can find my front-page LessWrong posts and technical notes here.</p>
  
  <div class="news">
    {% include news.html limit=3 %}
  </div>
  
  <a href="{{ '/blog/' | relative_url }}" class="read-more-btn">View All Posts →</a>
</div>
