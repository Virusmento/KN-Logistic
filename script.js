document.addEventListener('DOMContentLoaded', ()=>{
  // keep CSS variable for header height in sync so main/menu don't overlap
  const root = document.documentElement;
  const headerEl = document.querySelector('header');
  function updateHeaderHeight(){
    if(headerEl){
      const h = headerEl.offsetHeight || 64;
      root.style.setProperty('--header-height', h + 'px');
    }
  }
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);

  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  function setMenu(open){
    if(!menu) return;
    menu.classList.toggle('active', open);
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', String(!!open));
    menu.setAttribute('aria-hidden', String(!open));
  }

  burger && burger.addEventListener('click', ()=>{
    setMenu(!menu.classList.contains('active'));
  });

  // Close on Esc
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') setMenu(false);
  });

  // Close on click outside
  document.addEventListener('click', (e)=>{
    if(!menu || !burger) return;
    if(menu.classList.contains('active') && !menu.contains(e.target) && !burger.contains(e.target)){
      setMenu(false);
    }
  });

  // Close when a menu link is clicked
  menu && menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>setMenu(false)));

  // Login form handling
  const authForm = document.getElementById('contactForm');
  if(authForm && authForm.hasAttribute('id') && authForm.id === 'contactForm' && window.location.pathname.includes('auth.html')){
    // This is auth form - override
    const form = document.querySelector('form');
    if(form && form.action !== 'https://formspree.io/f/xqzvyken'){
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const role = document.getElementById('role')?.value;
        const username = document.getElementById('username')?.value || '';
        const password = document.getElementById('password')?.value || '';
        
        // Simple demo validation
        if((role === 'admin' && username === 'admin' && password === 'admin2026') ||
           (role === 'employee' && username === 'user' && password === 'user2026')){
          localStorage.setItem('userRole', role);
          localStorage.setItem('username', username);
          window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
        } else {
          alert('Неправильні облікові дані');
        }
      });
    }
  }

  // Contact form handling (local demo)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(form && form.action === 'https://formspree.io/f/xqzvyken'){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      status.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!name || !email || !message){
        status.textContent = 'Будь ласка, заповніть усі поля.';
        return;
      }
      if(!emailRe.test(email)){
        status.textContent = 'Вкажіть, будь ласка, коректну електронну адресу.';
        return;
      }

      // Simulate send
      status.textContent = 'Відправка...';
      setTimeout(()=>{
        status.textContent = 'Дякуємо! Ваше повідомлення надіслано.';
        form.reset();
      },900);
    });
  }
});
