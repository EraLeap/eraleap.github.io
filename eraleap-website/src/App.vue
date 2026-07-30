<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

const showModal = ref(false)
const mobileMenuOpen = ref(false)
const isSubmitting = ref(false)
const firstFormField = ref<HTMLInputElement | null>(null)

const contactForm = reactive({
  name: '',
  email: '',
  inquiry: '',
})

const capabilities = [
  {
    number: '01',
    label: 'R&D',
    title: 'Applied AI R&D',
    description:
      'Solve complex business challenges through advanced AI research, rapid innovation, and production-ready intelligent systems.',
    tags: ['Rapid innovation', 'Intelligent systems'],
  },
  {
    number: '02',
    label: 'Modular AI',
    title: 'AI Agents & Automation',
    description:
      'Deliver reliable, scalable AI agent services that integrate with your business and automate complex workflows.',
    tags: ['Agentic workflows', 'Human in the loop'],
  },
  {
    number: '03',
    label: 'Quant System',
    title: 'Real-time Quant Systems',
    description:
      'Process massive real-time data streams to power high-speed analytics, predictive intelligence, and immediate decision-making.',
    tags: ['Streaming data', 'Predictive intelligence'],
  },
]

const solutionAreas = [
  'Real-time decision tools',
  'Enterprise knowledge assistants',
  'Document intelligence',
  'Cloud operational platforms',
]

const principles = [
  {
    number: '01',
    title: 'Built around the operation',
    description:
      'We start with the decision, workflow, and people—not the model—so the system creates measurable utility.',
  },
  {
    number: '02',
    title: 'Engineered for trust',
    description:
      'Explainability, observability, audit trails, and human oversight are designed in from the beginning.',
  },
  {
    number: '03',
    title: 'Ready for real constraints',
    description:
      'Private, on-premises, cloud, and Canada-managed deployments support security and data-sovereignty needs.',
  },
]

const openModal = async () => {
  mobileMenuOpen.value = false
  showModal.value = true
  await nextTick()
  firstFormField.value?.focus()
}

const closeModal = () => {
  showModal.value = false
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleSubmit = () => {
  const lastSent = localStorage.getItem('last_inquiry_date')
  const now = Date.now()

  if (lastSent && now - Number(lastSent) < 24 * 60 * 60 * 1000) {
    window.alert(
      'We received an inquiry from this browser today. Please allow us time to respond, or try again tomorrow.',
    )
    return
  }

  isSubmitting.value = true

  const subject = encodeURIComponent(`General inquiry from ${contactForm.name}`)
  const body = encodeURIComponent(
    `Name: ${contactForm.name}\n` +
      `Contact email: ${contactForm.email}\n\n` +
      `Inquiry:\n${contactForm.inquiry}`,
  )

  window.location.href = `mailto:heng.zhang@eraleap.com?subject=${subject}&body=${body}`
  localStorage.setItem('last_inquiry_date', now.toString())
  isSubmitting.value = false
  closeModal()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (showModal.value) closeModal()
    if (mobileMenuOpen.value) closeMobileMenu()
  }
}

watch(showModal, (isOpen) => {
  document.body.classList.toggle('modal-open', isOpen)
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="site-header">
      <div class="nav-container">
        <a class="brand" href="#top" aria-label="EraLeap home" @click="closeMobileMenu">
          <span class="wordmark">EraLeap</span>
        </a>

        <nav class="desktop-nav" aria-label="Primary navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
        </nav>

        <div class="nav-actions">
          <button class="nav-contact" type="button" @click="openModal">
            Let’s talk
            <span aria-hidden="true">↗</span>
          </button>
          <button
            class="menu-toggle"
            type="button"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <Transition name="menu">
        <nav v-if="mobileMenuOpen" id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation">
          <a href="#capabilities" @click="closeMobileMenu">Capabilities</a>
          <a href="#approach" @click="closeMobileMenu">Approach</a>
          <a href="#about" @click="closeMobileMenu">About</a>
          <button type="button" @click="openModal">Start a conversation <span>↗</span></button>
        </nav>
      </Transition>
    </header>

    <main id="main-content">
      <section id="top" class="hero">
        <video
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          class="hero-video"
          aria-hidden="true"
        >
          <source src="/video/bg_video.mp4" type="video/mp4" />
        </video>
        <div class="hero-scrim"></div>
        <div class="hero-grid" aria-hidden="true"></div>

        <div class="content-container hero-content">
          <div class="hero-copy">
            <div class="eyebrow"><span></span> Canadian applied AI</div>
            <h1>AI that holds up<br />in the real world.</h1>
            <p>
              <strong>Practical, reliable AI for complexity.</strong>
              <span class="wordmark-inline">EraLeap</span> builds intelligent systems
              for data-intensive environments—engineered from prototype to production.
            </p>
            <div class="hero-actions">
              <button class="button button-primary" type="button" @click="openModal">
                Start a conversation <span aria-hidden="true">↗</span>
              </button>
              <a class="button button-secondary" href="#capabilities">
                Explore capabilities <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div class="system-card" aria-label="EraLeap intelligence system">
            <div class="system-card-header">
              <span>Intelligence stack</span>
              <span class="live-status"><i></i> Production ready</span>
            </div>
            <div class="system-flow">
              <div class="system-node node-input">
                <span class="node-label">01 / INPUT</span>
                <strong>Operational data</strong>
                <small>Documents · streams · systems</small>
              </div>
              <span class="flow-line"></span>
              <div class="system-node node-core">
                <span class="core-orbit"></span>
                <span class="core-orbit orbit-two"></span>
                <span class="core-dot"></span>
                <div>
                  <span class="node-label">02 / REASONING</span>
                  <strong><span class="wordmark-inline">EraLeap</span> AI</strong>
                  <small>Models · agents · analytics</small>
                </div>
              </div>
              <span class="flow-line"></span>
              <div class="system-node node-output">
                <span class="node-label">03 / OUTCOME</span>
                <strong>Governed action</strong>
                <small>Decisions · automation · insight</small>
              </div>
            </div>
            <div class="system-card-footer">
              <span>Private by design</span>
              <span>Auditable</span>
              <span>Human-governed</span>
            </div>
          </div>
        </div>

        <div class="content-container hero-foot">
          <span>Built in Canada</span>
          <div>
            <span>Private infrastructure</span>
            <span>Enterprise-grade delivery</span>
            <span>Responsible AI</span>
          </div>
        </div>
      </section>

      <section id="capabilities" class="capabilities section-light">
        <div class="content-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker">What we build</p>
              <h2>Intelligence where<br />it matters most.</h2>
            </div>
            <p class="section-intro">
              From a focused use case to a production platform, we combine AI,
              advanced analytics, automation, and software engineering in one delivery team.
            </p>
          </div>

          <div class="capability-grid">
            <article v-for="capability in capabilities" :key="capability.number" class="capability-card">
              <div class="card-top">
                <span>{{ capability.number }}</span>
                <span class="card-arrow" aria-hidden="true">↗</span>
              </div>
              <div>
                <span class="capability-label">{{ capability.label }}</span>
                <h3>{{ capability.title }}</h3>
                <p>{{ capability.description }}</p>
              </div>
              <div class="tag-row">
                <span v-for="tag in capability.tags" :key="tag">{{ tag }}</span>
              </div>
            </article>
          </div>

          <div class="solution-areas">
            <div class="solution-areas-heading">
              <span>Solution areas</span>
              <small>Selected applications</small>
            </div>
            <div class="solution-area-list">
              <span v-for="(area, index) in solutionAreas" :key="area">
                <small>0{{ index + 1 }}</small>
                {{ area }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" class="approach">
        <div class="content-container">
          <div class="approach-heading">
            <p class="section-kicker section-kicker-dark">How we work</p>
            <h2>Advanced technology.<br /><span>Operational discipline.</span></h2>
          </div>

          <div class="principles">
            <article v-for="principle in principles" :key="principle.number" class="principle">
              <span class="principle-number">{{ principle.number }}</span>
              <h3>{{ principle.title }}</h3>
              <p>{{ principle.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="deployment section-light">
        <div class="content-container deployment-grid">
          <div class="deployment-copy">
            <p class="section-kicker">Designed for your environment</p>
            <h2>Your data stays<br />on your terms.</h2>
            <p>
              We architect around your security, privacy, and sovereignty requirements.
              Deploy in your cloud, on premises, on private infrastructure, or in a
              Canada-managed environment.
            </p>
            <ul class="check-list">
              <li><span>✓</span> Flexible deployment architecture</li>
              <li><span>✓</span> Monitoring and model governance</li>
              <li><span>✓</span> Explainable, auditable outcomes</li>
            </ul>
          </div>

          <div class="deployment-visual" aria-label="Flexible AI deployment options">
            <div class="visual-header">
              <span>Deployment architecture</span>
              <span>ERL / 01</span>
            </div>
            <div class="architecture">
              <div class="architecture-ring ring-outer"></div>
              <div class="architecture-ring ring-inner"></div>
              <div class="architecture-core">
                <strong class="wordmark wordmark-core">EraLeap</strong>
                <small>Intelligence layer</small>
              </div>
              <span class="architecture-label label-cloud">Your cloud</span>
              <span class="architecture-label label-private">Private</span>
              <span class="architecture-label label-onprem">On premises</span>
              <span class="architecture-label label-canada">Canada-managed</span>
              <i class="orbit-point point-one"></i>
              <i class="orbit-point point-two"></i>
              <i class="orbit-point point-three"></i>
            </div>
            <div class="visual-footer">
              <span><i></i> Secure connection</span>
              <span>Infrastructure agnostic</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="about">
        <div class="content-container about-grid">
          <div>
            <p class="section-kicker">About EraLeap</p>
            <h2>Built to move from<br />possibility to practice.</h2>
          </div>
          <div class="about-copy">
            <p class="lead">
              <span class="wordmark-inline">EraLeap</span> is a Canadian applied AI
              and digital innovation company building intelligent systems for
              complex, data-intensive environments.
            </p>
            <p>
              We combine AI, advanced analytics, automation, and software engineering
              to deliver real-time decision tools, enterprise knowledge assistants,
              document intelligence, and cloud-based operational platforms.
            </p>
            <p>
              Our end-to-end capabilities span data processing, model development,
              deployment, monitoring, and governance. Solutions can run in private,
              on-premises, cloud, or Canada-managed environments to meet security,
              privacy, and data-sovereignty requirements.
            </p>
            <p>
              We embed explainability, auditability, and human oversight throughout
              our work—turning advanced AI into practical capabilities that help
              organizations operate more efficiently and make better-informed decisions.
            </p>
            <div class="about-values">
              <span>Applied AI</span>
              <span>Software engineering</span>
              <span>Advanced analytics</span>
              <span>Digital innovation</span>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="content-container cta-card">
          <div class="cta-glow" aria-hidden="true"></div>
          <p class="section-kicker section-kicker-dark">Let’s build what’s next</p>
          <h2>Have a complex problem?<br />That’s where we start.</h2>
          <button class="button button-primary button-large" type="button" @click="openModal">
            Talk to our team <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="content-container">
        <div class="footer-main">
          <a class="brand" href="#top" aria-label="EraLeap home">
            <span class="wordmark">EraLeap</span>
          </a>
          <p>Practical, reliable AI<br />for complex environments.</p>
          <nav aria-label="Footer navigation">
            <a href="#capabilities">Capabilities</a>
            <a href="#approach">Approach</a>
            <a href="#about">About</a>
            <button type="button" @click="openModal">Contact</button>
          </nav>
        </div>
        <div class="footer-bottom">
          <span>© 2026 <span class="wordmark-inline">EraLeap</span>. All rights reserved.</span>
          <span>Toronto, Canada</span>
        </div>
      </div>
    </footer>

    <Transition name="modal">
      <div
        v-if="showModal"
        class="modal-overlay"
        role="presentation"
        @mousedown.self="closeModal"
      >
        <div
          class="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          aria-describedby="contact-subtitle"
        >
          <div class="modal-header">
            <span class="modal-label">New inquiry / EraLeap</span>
            <button class="close-button" type="button" aria-label="Close contact form" @click="closeModal">
              <span></span>
              <span></span>
            </button>
          </div>
          <div class="modal-body">
            <h2 id="contact-title">Let’s solve something complex.</h2>
            <p id="contact-subtitle">
              Tell us a little about the opportunity. Your email app will prepare
              the message for you to review and send.
            </p>

            <form class="contact-form" @submit.prevent="handleSubmit">
              <label>
                <span>Name</span>
                <input
                  ref="firstFormField"
                  v-model.trim="contactForm.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                  placeholder="Your name"
                />
              </label>
              <label>
                <span>Work email</span>
                <input
                  v-model.trim="contactForm.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                  placeholder="you@company.com"
                />
              </label>
              <label>
                <span>How can we help?</span>
                <textarea
                  v-model.trim="contactForm.inquiry"
                  name="inquiry"
                  required
                  rows="4"
                  placeholder="A brief overview of your challenge or idea"
                ></textarea>
              </label>
              <button class="button button-primary submit-button" type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Preparing…' : 'Prepare email' }}
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
