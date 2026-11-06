import { siteModel } from '../models/site-model.js';
import { createHomeView } from '../views/home-view.js';

const view = createHomeView(document);

function setupRevealAnimation() {
  if (!('IntersectionObserver' in window)) {
    view.revealElements.forEach((element) => element.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  view.revealElements.forEach((element) => observer.observe(element));
}

function setupSectionIndicator() {
  if (!('IntersectionObserver' in window)) return;

  const activeElements = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeElements.add(entry.target);
      else activeElements.delete(entry.target);
    });
  }, { rootMargin: '-42% 0px -42% 0px' });

  view.gapElements.forEach((element) => observer.observe(element));
}

function setupSharpBackground() {
  if (!view.sharpBackground || !view.revealMarker || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => view.sharpBackground.classList.toggle('on', entry.isIntersecting));
  }, { rootMargin: '-42% 0px -42% 0px' });

  observer.observe(view.revealMarker);
}

function setupSplitScrollEffect() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const viewportHeight = window.innerHeight || 800;

    view.splitElements.forEach((element) => {
      let progress = Math.min(1, Math.max(0,
        (viewportHeight * 0.96 - element.getBoundingClientRect().top) / (viewportHeight * 0.32)));
      progress = 1 - Math.pow(1 - progress, 3);
      element.style.setProperty('--o', `${((1 - progress) * element.offsetHeight).toFixed(1)}px`);
    });

    if (view.hero) {
      const rect = view.hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.9)));
      view.hero.style.setProperty('--hp', progress.toFixed(3));
    }
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  update();
}

function validateForm(data) {
  return siteModel.form.requiredFields.every((field) => String(data.get(field) || '').trim())
    && Boolean(data.get(siteModel.form.consentField));
}

async function handleLeadSubmit(event) {
  event.preventDefault();
  const data = new FormData(view.form);

  if (!validateForm(data)) {
    view.setMessage(siteModel.messages.invalid);
    return;
  }

  const need = String(data.get('need')).trim();
  if (!siteModel.leadEndpoint) {
    view.setMessage(siteModel.messages.unavailable);
    return;
  }

  const payload = {
    name: String(data.get('name')).trim(),
    phone: String(data.get('phone')).trim(),
    need,
    message: String(data.get('message') || '').trim()
  };

  view.setMessage(siteModel.messages.sending);
  try {
    await fetch(siteModel.leadEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    view.form.reset();
    view.setMessage(siteModel.messages.saved);
  } catch (error) {
    console.error('Không thể lưu thông tin tư vấn:', error);
    view.setMessage(siteModel.messages.unavailable);
  }
}

setupRevealAnimation();
setupSectionIndicator();
setupSharpBackground();
setupSplitScrollEffect();
view.form?.addEventListener('submit', handleLeadSubmit);
