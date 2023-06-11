window.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;
      // Perform registration logic here (e.g., send a request to the server)
      console.log('Register:', username, password);
      registerForm.reset();
    });
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      // Perform login logic here (e.g., send a request to the server)
      console.log('Login:', username, password);
      loginForm.reset();
    });
  });
  