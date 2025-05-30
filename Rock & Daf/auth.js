document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      };
      localStorage.setItem(user.username, JSON.stringify(user));
      alert('Registered successfully!');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const user = JSON.parse(localStorage.getItem(username));
      if (user && user.password === password) {
        localStorage.setItem('currentUser', username);
        alert('Login successful!');
        window.location.href = 'instruments.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }
});
