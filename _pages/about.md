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
    gap: 5rem; 
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
      <p>Hi! I am Agastya Agrawal, a second-year undergraduate at the <a href="https://www.cmi.ac.in/" target="_blank" class="text-link">Chennai Mathematical Institute</a>, pursuing my bachelor's in mathematics and computer science. I am passionate about interpreting artificial intelligence to help drive progress toward safe superintelligence. I particularly enjoy analyzing neural networks through a rigorous mathematical lens, and I am interested in applying mathematics, probability, and statistics to understand complex real-world structures. Please head to my blog or research section to learn more!</p>

      <p><em>I am always open to collaborations or discussions about these topics, so please don't hesitate to reach out!</em></p>

      <a href="{{ '/about-me/' | relative_url }}" class="section-cta">More about me &rarr;</a>
    </div>

    <div class="profile-pic-container">
      <img src="{{ '/assets/img/my_photo.jpg' | relative_url }}" alt="Agastya Agrawal" class="profile-pic">
    </div>
  </div>

  <div class="home-section">
    <h2>Research</h2>
    <p>I am currently studying statistical learning theory, and Singular Learning Theory in particular, for my reinforcement learning course project: "Phase Transitions in RL, a singular learning perspective". I am currently in the exploratory phase and actively refining the exact problem I want to tackle for meaningful research. Check out my blog to see some of the cool mathematics connected to it!</p>
    
    <p>I am also collaborating with Yufeng Zhao to understand deceptive models with unfaithful Chain of Thought. This builds directly upon my recent independent research, <a href="https://www.lesswrong.com/posts/EkuGSFCDQJr4qnXZK/uncovering-unfaithful-cot-in-deceptive-models-2" target="_blank" class="text-link">Uncovering Unfaithful CoT in Deceptive Models</a>, which was featured on the front page of LessWrong.</p>

    <p>Currently, I am also going through ARENA and hosting a deep learning reading group to better refine my skills as an AI researcher and engineer.</p>

    <a href="{{ '/research/' | relative_url }}" class="section-cta">More on my Research &rarr;</a>
  </div>

  <div class="home-section">
    <h2>Blog</h2>
    <p>This is the most interesting part of my universe! I document my notes here and share the cool mathematics and subjects that get me excited. Do check it out!</p>

    <a href="{{ '/blog/' | relative_url }}" class="section-cta">Read my blog &rarr;</a>
  </div>

<div class="home-section">
    <h2>Talks</h2>
    <p>I enjoy talking about mathematics and its applications, AI interpretability, and machine learning in general. Currently, I am hosting a Deep Learning Reading Group with <strong>TWIML</strong>.</p>
    
    <div class="card hoverable mt-4 mb-4" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.08); transition: transform 0.2s ease-in-out;">
      <div class="row no-gutters g-0">
        
        <div class="col-md-4">
          <img src="{{ '/assets/img/thumbnail_talk1.png' | relative_url }}" alt="TWIML Reading Group" style="width: 100%; height: 100%; object-fit: cover; min-height: 200px;">
        </div>
        
        <div class="col-md-8">
          <div class="card-body d-flex flex-column justify-content-center" style="height: 100%; padding: 2rem;">
            <h4 class="card-title" style="font-weight: 700; color: var(--global-text-color); margin-bottom: 0.3rem;">Deep Learning Reading Group - Session 1</h4>
            <h6 class="card-subtitle mb-3 text-muted" style="font-size: 0.95rem; letter-spacing: 0.5px;">HOSTED BY TWIML</h6>
            
            <p class="card-text" style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
              The kickoff session for our deep learning reading group. In this first talk, we cover the foundational concepts and set the stage for our upcoming deep-dives into models and alignment.
            </p>
            
            <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
              <a href="https://us02web.zoom.us/rec/share/wLpGe3KP3O58G0SjmEstFsMQA92T82zbfuSJP3-JWW09tuDqT35Wx1nODUP1Q-ks.LTlyNArB2niMlw5J" target="_blank" style="background-color: #c94c6d; color: white; padding: 0.5rem 1.2rem; border-radius: 6px; font-weight: 600; text-decoration: none; transition: background-color 0.2s;">
                ▶ Watch Recording
              </a>
              <span style="font-size: 0.95rem; color: var(--global-text-color);">
                Passcode: <code style="background: rgba(201, 76, 109, 0.1); color: #c94c6d; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.9rem;">9BAqrU6+</code>
              </span>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>

    <a href="{{ '/talks/' | relative_url }}" class="section-cta">View all my talks &rarr;</a>
  </div>

</div>
