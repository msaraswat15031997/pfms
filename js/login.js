document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded credentials
    const validUsername = 'admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'index.html'; // Redirect to home or admin page
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username or password.';
    }
});
