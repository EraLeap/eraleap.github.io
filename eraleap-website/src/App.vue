<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, useTemplateRef } from 'vue';

const botSquad = useTemplateRef<HTMLElement>('botSquad');
const eyeTransform = ref('translate(0, 0)');
const showModal = ref(false);
const isSubmitting = ref(false);

const contactForm = reactive({
  name: '',
  email: '',
  inquiry: ''
});

const toggleModal = () => {
  showModal.value = !showModal.value;
  if (!showModal.value) {
    contactForm.name = '';
    contactForm.email = '';
    contactForm.inquiry = '';
  }
};

const handleSubmit = async () => {
  const lastSent = localStorage.getItem('last_inquiry_date');
  const now = new Date().getTime();
  
  if (lastSent && now - parseInt(lastSent) < 24 * 60 * 60 * 1000) {
    alert('We have received your inquiry today. Please give us some time to get back to you or you can resend another inquiry tomorrow.');
    return;
  }

  isSubmitting.value = true;
  
  // Construct the mailto link dynamically
  const subject = encodeURIComponent(`Generak Inquiry from ${contactForm.name}`);
  const body = encodeURIComponent(
    `Name: ${contactForm.name}\n` +
    `Contact Email: ${contactForm.email}\n\n` +
    `Inquiry:\n${contactForm.inquiry}`
  );

  window.location.href = `mailto:heng.zhang@eraleap.com?subject=${subject}&body=${body}`;

  localStorage.setItem('last_inquiry_date', now.toString());
  isSubmitting.value = false;
  toggleModal();
};

const handleMouseMove = (event: MouseEvent) => {
  if (!botSquad.value) return;

  const rect = botSquad.value.getBoundingClientRect();
  const botCenterX = rect.left + rect.width / 2;
  const botCenterY = rect.top + rect.height / 2;

  const deltaX = event.clientX - botCenterX;
  const deltaY = event.clientY - botCenterY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // 1. Calculate how much they should "care" (0 to 1)
  // They start looking away after 400px
  const influence = Math.max(0, 1 - distance / 400);
  
  const maxMove = 2.5; 
  const angle = Math.atan2(deltaY, deltaX);
  
  // 2. Apply the influence to the move calculation
  const moveX = Math.cos(angle) * maxMove * influence;
  const moveY = Math.sin(angle) * maxMove * influence;

  eyeTransform.value = `translate(${moveX}px, ${moveY}px)`;
};

onMounted(() => window.addEventListener('mousemove', handleMouseMove));
onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove));
</script>

<template>
  <div class="page">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">EraLeap</div>

        <div class="nav-right">
          <div class="robot-squad" ref="botSquad">
            
            <div class="mini-bot bot-purple">
              <div class="antenna"></div>
              <div class="bot-head">
                <div class="bot-eye">
                  <div class="pupil" :style="{ transform: eyeTransform }"></div>
                </div>
                <div class="bot-eye">
                  <div class="pupil" :style="{ transform: eyeTransform }"></div>
                </div>
                <div class="bot-mouth"></div> 
              </div>
              <div class="bot-body">
                <div class="detail"></div>
              </div>
            </div>
            
            <div class="mini-bot bot-blue">
              <div class="bot-head">
                <div class="bot-eye">
                  <div class="pupil" :style="{ transform: eyeTransform }"></div>
                </div>
                <div class="bot-eye">
                  <div class="pupil" :style="{ transform: eyeTransform }"></div>
                </div>
                <div class="bot-mouth"></div> 
              </div>
              <div class="bot-body"></div>
            </div>

          </div> <button class="contact-btn" @click="toggleModal">Contact Us</button>
        </div> 
      </div> 
    </nav>

    <section class="hero">
      <video
        autoplay
        muted
        loop
        playsinline
        class="background-video"
      >
        <source src="/video/bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div class="overlay">
        <h1 class="headline">Smarter Decisions Powered by the Intelligence</h1>
      </div>
    </section>

    <section class="intro">
      <div class="intro-container">
        <h2 class="intro-title">About Us</h2>
        <div class="intro-content">
          <p>
            <span class="company-name">EraLeap</span> is a technology-driven company specializing in artificial intelligence and digital innovation. We leverage advanced AI techniques, data analytics, and automation tools designed to support fast, accurate decision-making in high-risk, complex environments.
          </p>
          <p>
            Leveraging our expertise in these domains, we provide bespoke AI transformation solutions that help businesses modernize operations and make smarter, data-driven decisions.
          </p>
          <p>
            Our vision is to be a technology-focused value creator: building AI systems capable of high-stakes decision-making while delivering practical solutions that help enterprises thrive in the era of intelligent automation.
          </p>
        </div>
      </div>
    </section>

    <section class="what-we-do">
      <div class="intro-container">
        <h2 class="intro-title">What We Do</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.31a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
            </div>
            <h3>R&D</h3>
            <p>
              Solve complex business challenges using cutting-edge AI technologies, rapid innovation, and advanced intelligent systems.
            </p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
            </div>
            <h3>Modular AI</h3>
            <p>Deliver reliable and scalable AI Agent services that seamlessly automate workflows and help with your business.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </div>
            <h3>Quant System</h3>
            <p>Process massive real-time data streams to power high-speed analytics, predictive intelligence, and instant decision making.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT MODAL -->
    <Transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="toggleModal">
        <div class="modal-content">
          <button class="close-btn" @click="toggleModal">&times;</button>
          <h2 class="modal-title">Get in Touch</h2>
          <p class="modal-subtitle">We'll get back to you as soon as possible.</p>
          
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="contactForm.name" required placeholder="Your Name" />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="contactForm.email" required placeholder="your@email.com" />
            </div>
            
            <div class="form-group">
              <label for="inquiry">Inquiry</label>
              <textarea 
                id="inquiry" 
                v-model="contactForm.inquiry" 
                required 
                placeholder="How can we help you?"
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <footer class="site-footer">
      <div class="footer-container">
        <p class="ai-note">
          Some media are created with vibe-coding and the generative models, then manually polished by our humans to ensure everything is just right. We're all about embracing the fresh topics, responsibly. If something looks off, please contact us.
        </p>
        <p class="copyright">&copy; 2026 Era Leap. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* IMPORT COMFORTAA FONT */
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');

/* RESET DEFAULT MARGINS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* FLOATING NAVBAR */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  backdrop-filter: blur(10px);    /* Modern frosted glass effect */
  z-index: 1000;                  /* Ensures it stays above everything */
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  width: 100%;
  margin: 0 30px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-right {
  display: flex; align-items: flex-end;
  gap: 25px;
}

/* --- ROBOT SQUAD LAYOUT --- */
.robot-squad {
  display: flex; 
  gap: 10px;
  align-items: flex-end; 
  padding-bottom: 8px;
}

.mini-bot {
  display: flex; 
  flex-direction: column; 
  align-items: center;
  position: relative;
  transition: transform 0.3s ease;
}

/* --- ROBOT 1: PURPLE SPECIALIST --- */
.bot-purple .bot-head {
  width: 30px; height: 20px;
  background: #aa3bff;
  border-radius: 5px;
  display: flex; justify-content: space-evenly; align-items: center;
  position: relative; /* Anchor for the mouth */
}
.bot-purple .bot-body {
  width: 20px; height: 10px;
  background: #8e2cdc;
  border-radius: 4px 4px 0 0;
}
.bot-purple .detail {
  width: 6px; height: 3px; background: rgba(255,255,255,0.3); border-radius: 1px; margin: 2px auto 0;
}
.bot-purple .antenna {
  width: 2px; height: 6px; background: #aa3bff; margin-bottom: -1px;
}

/* --- ROBOT 2: BLUE OBSERVER --- */
.bot-blue .bot-head {
  width: 22px; height: 22px;
  background: #00d2ff;
  border-radius: 50%;
  display: flex; justify-content: space-evenly; align-items: center;
  position: relative; /* Anchor for the mouth */
}
.bot-blue .bot-body {
  width: 16px; height: 6px;
  background: #0099cc;
  border-radius: 10px 10px 0 0;
}

/* --- SHARED FACE MECHANICS --- */
.bot-eye {
  width: 7px; height: 7px;
  background: white; border-radius: 50%;
  position: relative; overflow: hidden;
  z-index: 2;
}

.pupil {
  width: 3.5px; height: 3.5px;
  background: #08060d; border-radius: 50%;
  position: absolute;
  top: 1.75px; left: 1.75px;
  transition: transform 0.05s ease-out;
}

/* The Mouth - Lifted slightly to stay on the face */
.bot-mouth {
  position: absolute;
  bottom: 3px; /* Lifted from 4px to avoid the body */
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 1px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  transition: all 0.2s ease;
  z-index: 1;
}

/* --- INTERACTION LOGIC --- */

/* Smile and Perk Up when Button is Hovered */
.nav-right:has(.contact-btn:hover) .bot-mouth {
  height: 5px;
  width: 12px;
  background: transparent;
  border-bottom: 2px solid #000;
  border-radius: 0 0 10px 10px;
  bottom: 4px; /* Adjusting slightly for the curve height */
}

.nav-right:has(.contact-btn:hover) .mini-bot {
  transform: translateY(-5px) scale(1.05);
}

/* --- LOGO & BUTTON --- */
.logo {
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  color: #fff;
  font-size: 1.5rem;
}

.contact-btn {
  background: #fff;
  color: #08060d;
  border: none;
  padding: 10px 22px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.contact-btn:hover {
  background: #f4f3ec;
}

/* UI Elements */
.logo { font-family: 'Comfortaa'; font-weight: 700; color: white; font-size: 1.5rem; }
.contact-btn {
  background: white; color: black; border: none;
  padding: 12px 24px; border-radius: 50px;
  font-weight: 600; cursor: pointer; transition: 0.2s;
}
.contact-btn:hover { background: #f0f0f0; transform: scale(1.05); }

/* Rest of the UI */
.logo { font-family: 'Comfortaa'; font-weight: 700; color: white; font-size: 1.5rem; }
.contact-btn {
  background: white; color: black; border: none;
  padding: 12px 24px; border-radius: 50px;
  font-weight: 600; cursor: pointer;
}

.logo {
  font-family: 'Comfortaa', cursive;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

.contact-btn {
  font-family: Arial, sans-serif;
  background-color: #fff;
  color: #000;
  border: none;
  padding: 10px 22px;
  border-radius: 50px; /* Capsule shape */
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.contact-btn:hover {
  background-color: #e5e5e5;
  transform: translateY(-2px);
}

.page {
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
}

/* HERO VIDEO SECTION */
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: auto; 
  overflow: hidden;
  line-height: 0;
}

.background-video {
  position: relative; 
  width: 100%;
  height: auto;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.headline {
  color: white;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  padding-top: 33%; /* Adjusted padding since navbar is fixed at top */
  text-align: center;
  letter-spacing: 4px;
  text-shadow: 1px 1px 8px rgba(0,0,0,0.7);
}

.company-name {
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  color: #000; /* Keeps it bold and black */
  font-size: 1.2rem; /* Slightly larger to account for Comfortaa's x-height */
  letter-spacing: -0.5px;
}

/* INTRODUCTION SECTION */
.intro {
  padding: 120px 20px;
  background-color: #ffffff;
  color: #222;
  width: 100%;
}

.intro-container {
  max-width: 800px; /* Slightly tighter for better readability */
  margin: 0 auto;    /* Keeps the container centered on the page */
  text-align: left;  /* Aligns the text inside the container to the left */
}

.intro-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #000;
  letter-spacing: -1px;
  position: relative;
}

/* Optional: Adds a small accent line under the title to anchor the left-aligned look */
.intro-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #000; /* You can change this to your --accent color later */
  margin-top: 10px;
}

.intro-content p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 24px;
  letter-spacing: 0;
}

/* FOOTER STYLES */
.site-footer {
  padding: 60px 20%;
  background-color: #f9f9f9; /* Light grey to distinguish from the white Intro section */
  border-top: 1px solid #eee;
  color: #888; /* Soft grey text */
}

.footer-container {
  width: 100%;
  margin: 0 auto;
  text-align: left; /* Keeping consistency with your left-aligned About section */
}

.ai-note {
  font-size: 0.9rem; /* Smaller "fine print" size */
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: center;
}

.ai-note strong {
  color: #555; /* Slightly darker for emphasis */
  font-weight: 600;
}

.footer-link {
  color: #000;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.2s;
}

.footer-link:hover {
  opacity: 0.7;
}

.copyright {
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.6;
  text-align: center;
}

/* WHAT WE DO SECTION */
.what-we-do {
  padding: 120px 20px;
  background-color: #d8f9ff;
  color: #222;
  width: 100%;
  border-top: 1px solid #eee;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.service-icon {
  margin-bottom: 20px;
  color: #000;
}

.service-card h3 {
  font-family: 'Comfortaa', cursive;
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #000;
}

.service-card p {
  color: #555;
  line-height: 1.6;
}

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
  color: #333;
}

.modal-title {
  font-family: 'Comfortaa', cursive;
  font-size: 2rem;
  margin-bottom: 10px;
  color: #000;
}

.modal-subtitle {
  margin-bottom: 30px;
  color: #666;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group input, 
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
}

.submit-btn {
  background: #aa3bff; /* Matches purple bot */
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #8e2cdc;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* SMALL SCREEN STYLES */
@media (max-width: 1150px) and (min-width: 768px) {
  .hero {
    margin-top: 70px; /* Increased top padding to push the video background further down */
  }

  .headline {
    font-size: clamp(1rem, 3.5vw, 2rem); /* Further reduced font size to prevent overlapping */
    padding-top: 20%; /* Removed percentage padding to allow proper centering in the overlay */
    letter-spacing: 1px; /* Tighter letter spacing for better fit on narrow screens */
    line-height: 1.3; /* Adjusted line height for readability */
    max-width: 85%; /* Prevent text from touching the edges of the viewport */
  }
}

/* MOBILE RESPONSIVE STYLES */
@media (max-width: 1150px) and (orientation: portrait) {
  .nav-container {
    margin: 0 10px;
    padding: 0 10px;
  }

  .logo {
    font-size: 1.2rem;
  }

  .nav-right {
    gap: 10px;
  }

  .robot-squad {
    transform: scale(0.8); /* Shrink robots */
    transform-origin: bottom right;
    padding-bottom: 5px;
    gap: 6px;
  }

  .contact-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .hero {
    margin-top: 70px; /* Increased top padding to push the video background further down */
  }

  .headline {
    font-size: clamp(0.75rem, 5vw, 1.1rem); /* Even smaller to avoid overlap */
    padding-top: 20%;
    letter-spacing: 1px; /* Tighter letter spacing for better fit on narrow screens */
    line-height: 1.2;
    max-width: 90%;
  }
}
</style>