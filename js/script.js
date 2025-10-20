// ==========================
// Navbar Scroll + Parallax
// ==========================
const header = document.querySelector('.header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 6);

  const bg = document.querySelector('.parallax-bg');
  if (bg) {
    bg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.07)`;
  }
});

// ==========================
// Mobile Menu Toggle
// ==========================
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
    });
  });
}

// ==========================
// Scroll Reveal Animation
// ==========================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================
// Lightbox (Gallery)
// ==========================
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const galleryImgs = Array.from(document.querySelectorAll('#gallery .masonry img'));
let current = 0;

function openLB(index) {
  current = index;
  lbImg.src = galleryImgs[current].src;
  lightbox.classList.add('show');
}
function closeLB() { lightbox.classList.remove('show'); }
function prevLB() { current = (current - 1 + galleryImgs.length) % galleryImgs.length; lbImg.src = galleryImgs[current].src; }
function nextLB() { current = (current + 1) % galleryImgs.length; lbImg.src = galleryImgs[current].src; }

if (galleryImgs.length) {
  galleryImgs.forEach((img, i) => img.addEventListener('click', () => openLB(i)));
  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', prevLB);
  lbNext.addEventListener('click', nextLB);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') prevLB();
    if (e.key === 'ArrowRight') nextLB();
  });
}

// ==========================
// Contact Form Validation
// ==========================
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();

    if (!name || !email || !msg) {
      note.textContent = '⚠️ Please fill in all fields.';
      note.style.color = '#ffd166';
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      note.textContent = '⚠️ Please enter a valid email address.';
      note.style.color = '#ffd166';
      return;
    }

    note.textContent = '✅ Thank you! We will get back to you shortly.';
    note.style.color = '#4de1ca';
    form.reset();
  });
}

// ==========================
// Booking Form Validation
// ==========================
const bookForm = document.getElementById('bookForm');
const bookNote = document.getElementById('bookNote');

if (bookForm) {
  bookForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;

    if (!name || !email || !checkin || !checkout || !guests || !roomType) {
      bookNote.textContent = '⚠️ Please fill in all fields.';
      bookNote.style.color = '#ffd166';
      return;
    }

    bookNote.textContent = `✅ Thank you, ${name}! Your booking for ${roomType} is received.`;
    bookNote.style.color = '#4de1ca';
    bookForm.reset();
  });
}

// ==========================
// Footer Year
// ==========================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ==========================
// Scroll-to-Top Button
// ==========================
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    toTop.style.opacity = window.scrollY > 500 ? 1 : 0.6;
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==========================
// Dark / Light Mode Toggle
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
  }

  // Toggle on click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
});
