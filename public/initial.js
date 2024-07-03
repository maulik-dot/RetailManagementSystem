document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', function() {
        goToLogin();
    });

    signupButton.addEventListener('click', function() {
        goToSignUp();
    });
});

function goToLogin() {
    // Navigate to the login.html file
    window.location.href = 'login.html';
}

function goToSignUp() {
    // Implement your logic to navigate to the sign-up scene (if needed)
    window.location.href = 'signup.html';
}
