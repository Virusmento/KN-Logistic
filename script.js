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

  // Register form handling
  const registerForm = document.getElementById('registerForm');
  if(registerForm){
    registerForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      handleRegister(e);
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      handleContact(e);
    });
  }
});

function handleLogin(e){
  e.preventDefault();
  console.log('Login form submitted');
  const role = document.getElementById('role')?.value;
  const username = document.getElementById('username')?.value?.trim();
  const password = document.getElementById('password')?.value?.trim();
  const status = document.getElementById('loginStatus');
  
  console.log('Role:', role, 'Username:', username, 'Password:', password);
  
  // Demo credentials
  const validAdminUser = {username: 'admin', password: 'admin2026'};
  const validEmployeeUser = {username: 'user', password: 'user2026'};
  
  const isValid = (role === 'admin' && username === validAdminUser.username && password === validAdminUser.password) ||
                  (role === 'employee' && username === validEmployeeUser.username && password === validEmployeeUser.password);
  
  console.log('Valid:', isValid);
  
  if(isValid){
    console.log('Login successful, redirecting...');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
  } else {
    status.textContent = '❌ Неправильні облікові дані';
    status.style.color = '#dc2626';
  }
}

function handleRegister(e){
  e.preventDefault();
  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const status = document.getElementById('registerStatus');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if(!fullname || !email){
    status.textContent = 'Будь ласка, заповніть усі поля.';
    status.style.color = '#dc2626';
    return;
  }
  
  if(!emailRe.test(email)){
    status.textContent = 'Вкажіть коректну електронну адресу.';
    status.style.color = '#dc2626';
    return;
  }
  
  status.textContent = 'Відправка заявки...';
  status.style.color = '#6b7280';
  
  setTimeout(()=>{
    status.textContent = '✅ Заявка надіслана! Адміністрація розглядатиме вашу заявку.';
    status.style.color = '#059669';
    document.getElementById('registerForm').reset();
  }, 800);
}

function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('contactStatus');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if(!name || !email || !message){
    status.textContent = 'Будь ласка, заповніть усі поля.';
    status.style.color = '#dc2626';
    return;
  }
  
  if(!emailRe.test(email)){
    status.textContent = 'Вкажіть коректну електронну адресу.';
    status.style.color = '#dc2626';
    return;
  }
  
  status.textContent = 'Відправка повідомлення...';
  status.style.color = '#6b7280';
  
  setTimeout(()=>{
    status.textContent = '✅ Дякуємо! Ваше повідомлення отримано.';
    status.style.color = '#059669';
    document.getElementById('contactForm').reset();
  }, 800);
}
