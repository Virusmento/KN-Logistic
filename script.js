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

  // Login form handling
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      handleLogin(e);
    });
  }

  // Contact form handling (formspree)
  const contactForm = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(contactForm && contactForm.action === 'https://formspree.io/f/xqzvyken'){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      status.textContent = '';
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
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
        contactForm.reset();
      },900);
    });
  }
});

function handleLogin(e){
  e.preventDefault();
  const form = document.getElementById('loginForm');
  const role = document.getElementById('role').value;
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const status = document.getElementById('loginStatus');
  
  // Demo credentials
  const validAdminUser = {username: 'admin', password: 'admin2026'};
  const validEmployeeUser = {username: 'user', password: 'user2026'};
  
  const isValid = (role === 'admin' && username === validAdminUser.username && password === validAdminUser.password) ||
                  (role === 'employee' && username === validEmployeeUser.username && password === validEmployeeUser.password);
  
  if(isValid){
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
  } else {
    status.textContent = '❌ Неправильні облікові дані';
    status.style.color = '#dc2626';
  }
});
