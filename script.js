// Assignment5 landing page script
document.addEventListener('DOMContentLoaded', function(){
  // navbar toggler (accessible)
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('mainNav');
  if (toggler && collapse){
    toggler.addEventListener('click', ()=>{
      const expanded = toggler.getAttribute('aria-expanded') === 'true';
      toggler.setAttribute('aria-expanded', String(!expanded));
      collapse.classList.toggle('show');
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = this.getAttribute('href');
      if (target === '#') return;
      const el = document.querySelector(target);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
        // move focus for accessibility
        el.setAttribute('tabindex','-1');
        el.focus({preventScroll:true});
        setTimeout(()=>el.removeAttribute('tabindex'),1000);
      }
    });
  });

  // set current year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // reveal animation for service cards
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // animate underline when the title appears (observe all section titles)
  const titles = document.querySelectorAll('.section-title');
  if (titles.length){
    const tObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          const titleEl = e.target;
          const underline = titleEl.nextElementSibling;
          if (underline && underline.classList.contains('underline')) underline.classList.add('underline-active');
          tObs.unobserve(titleEl);
        }
      });
    }, {threshold: 0.2});
    titles.forEach(t => tObs.observe(t));
  }

  // subscribe form handler
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm){
    subscribeForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const emailInput = document.getElementById('subscribe-email');
      const msg = document.getElementById('subscribe-msg');
      const email = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid){
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#ffdddd';
        emailInput.focus();
        return;
      }
      // simulated subscribe success
      msg.textContent = 'Thanks! You are subscribed.';
      msg.style.color = '#dff8e1';
      subscribeForm.reset();
    });
  }
});

