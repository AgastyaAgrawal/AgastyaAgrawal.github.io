---
layout: about
title: Home
permalink: /
---

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">

<style>
  header.post-header { display: none !important; }
  
  /* BASE TYPOGRAPHY */
  body {
    font-family: 'Inter', sans-serif !important;
    font-weight: 300;
  }

  .hero-universe {
    width: 100vw;
    height: 48vh; 
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: -3.5rem; 
    margin-bottom: 3rem;
    background-size: cover;
    background-position: center center; 
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .hero-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(255,255,255,0.7) 30%, transparent 80%);
    z-index: 1;
  }
  
  [data-theme="dark"] .hero-overlay {
      background: linear-gradient(to right, var(--global-bg-color) 0%, rgba(30,30,30,0.7) 30%, transparent 80%);
  }

  .hero-title {
    position: relative;
    z-index: 10;
    padding-left: 10vw;
    font-family: 'Playfair Display', serif;
    font-size: 4.8rem;
    font-weight: 700;
    font-style: italic;
    color: var(--global-text-color);
  }

  .intro-container {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Centered vertically for a balanced look */
    gap: 60px;
    margin-bottom: 5rem;
  }

  .intro-text {
    flex: 1.5;
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--global-text-color);
  }

  .intro-image-wrapper {
    flex: 1.2; /* Widened as requested */
    text-align: right;
  }

  .intro-image {
    width: 100%;
    aspect-ratio: 1 / 0.8; /* Squarish but slightly wider */
    object-fit: cover;
    border-radius: 4px; /* Shorter radius for a more professional, "art gallery" look */
    box-shadow: 20px 20px 0px var(--global-theme-color-light); /* Modern geometric accent */
  }

  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    border-bottom: none !important; /* NO UNDERLINE */
  }

  .action-link {
    display: inline-block;
    margin-top: 1.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--global-theme-color) !important;
    text-decoration: none;
    letter-spacing: 0.05rem;
    transition: 0.3s;
  }

  .action-link:hover {
    padding-left: 10px;
    opacity: 0.7;
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
  <div class="petal" style="width: 10px; height: 10px; animation: driftLeft 16s linear infinite; right: 15vw; bottom: 40vh;"></div>
</div>

<div class="intro-container">
  <div class="intro-text">
    <h2 class="section-heading">About Me</h2>
    <p>Hi, I'm Agastya. I am an undergraduate at the <strong>Chennai Mathematical Institute (CMI)</strong>, specializing in mathematics and computer science.</p>
    <p>My research focuses on <strong>AI alignment</strong> and <strong>mechanistic interpretability</strong>—specifically uncovering deceptive chain-of-thought in fine-tuned language models.</p>
    
    <a href="{{ '/about/' | relative_url }}" class="action-link">More about me →</a>
  </div>
  
  <div class="intro-image-wrapper">
    <img src="{{ '/assets/img/my_photo.jpg' | relative_url }}" class="intro-image" alt="Agastya Agrawal">
  </div>
</div>

<hr style="opacity: 0.1; margin: 4rem 0;">

<div class="blog-preview">
  <h2 class="section-heading">Latest Writing</h2>
  <div style="margin-top: 2rem;">
    {% for post in site.posts limit:3 %}
      <div style="margin-bottom: 2rem;">
        <a href="{{ post.url | relative_url }}" style="font-size: 1.5rem; font-family: 'Playfair Display', serif; font-weight: 700; text-decoration: none;">{{ post.title }}</a>
        <p style="font-size: 1rem; opacity: 0.6; margin-top: 0.5rem;">{{ post.date | date: "%B %-d, %Y" }}</p>
      </div>
    {% endfor %}
  </div>
  
  <a href="{{ '/blog/' | relative_url }}" class="action-link">Visit the blog →</a>
</div>
