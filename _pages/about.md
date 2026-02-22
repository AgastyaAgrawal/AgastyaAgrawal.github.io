---
layout: about
title: Home
permalink: /
---

<style>
  /* Hide default header */
  header.post-header { display: none !important; }
  
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

  .intro-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 3rem;
  }

  .intro-text {
    flex: 2;
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .intro-image-wrapper {
    flex: 1;
    text-align: right;
  }

  .intro-image {
    width: 100%;
    max-width: 280px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .section-heading {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    border-bottom: 3px solid var(--global-theme-color);
    display: inline-block;
  }

  .action-link {
    display: inline-block;
    margin-top: 1rem;
    font-weight: 700;
    color: var(--global-theme-color) !important;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
  }

  .action-link:hover {
    border-bottom: 2px solid var(--global-theme-color);
  }

  /* Petal Styles */
  .petal { position: absolute; background: #ffb7c5; border-radius: 15px 0 15px 0; opacity: 0; z-index: 6; }
  @keyframes driftLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.85; }
    85% { opacity: 0.85; }
    100% { transform: translate(-85vw, 15vh) rotate(720deg); opacity: 0; }
  }
</style>

<div class="hero-universe" style="background-image: url('{{ '/assets/img/sakura.jpg' | relative_url }}');">
  <div class="hero-overlay"></div>
  <h1 class="hero-title">Welcome to my universe.</h1>
  <div class="petal" style="width: 12px; height: 12px; animation: driftLeft 18s linear infinite; right: 10vw; bottom: 35vh;"></div>
  <div class="petal" style="width: 14px; height: 14px; animation: driftLeft 22s linear infinite; right: 5vw; bottom: 20vh;"></div>
  <div class="petal" style="width: 10px; height: 10px; animation: driftLeft 16s linear infinite; right: 15vw; bottom: 40vh;"></div>
</div>

<div class="intro-container">
  <div class="intro-text">
    <h2 class="section-heading">About Me</h2>
    <p>Hi, I'm Agastya. I am an undergraduate at the <strong>Chennai Mathematical Institute (CMI)</strong>, specializing in mathematics and computer science.</p>
    <p>My research focuses on <strong>AI alignment</strong> and <strong>mechanistic interpretability</strong>—specifically uncovering deceptive chain-of-thought in fine-tuned language models.</p>
    
    <a href="{{ '/about/' | relative_url }}" class="action-link">Read the full story →</a>
  </div>
  
  <div class="intro-image-wrapper">
    <img src="{{ '/assets/img/prof_pic.jpg' | relative_url }}" class="intro-image" alt="Agastya Agrawal">
  </div>
</div>

<hr>

<div class="blog-preview" style="margin-top: 3rem;">
  <h2 class="section-heading">Latest Writing</h2>
  <p>Exploring the intersections of probability, statistics, and AI safety.</p>
  
  <div style="margin-top: 1.5rem;">
    {% for post in site.posts limit:3 %}
      <div style="margin-bottom: 1rem;">
        <a href="{{ post.url | relative_url }}" style="font-size: 1.3rem; font-weight: 600;">{{ post.title }}</a>
        <p style="font-size: 0.95rem; color: #666;">{{ post.date | date: "%b %-d, %Y" }}</p>
      </div>
    {% endfor %}
  </div>
  
  <a href="{{ '/blog/' | relative_url }}" class="action-link">Visit the blog →</a>
</div>
