document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', backToInitial);

    loginButton.addEventListener('click', function() {
        // Get the values entered in the username and password fields
        const username = document.getElementById('user_idField').value;
        const password = document.getElementById('passwordField').value;

        // Check if username and password fields are not empty
        if (username.trim() !== '' && password.trim() !== '') {
            // Both fields have non-empty values
            // Proceed with sending the credentials to the server
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => {
                if (response.ok) {
                    // alert('Login successful!');
                    showSuccess("Login Successfull");
                    // Redirect or perform other actions
                    // window.location.href = '/initial.html';
                } else {
                    // alert('Login failed!');
                    // Display error message to user
                    showError("Try Again!! Username or Password doesn't exist.");

                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
            })
            .catch(error => {
                console.error('Login failed:', error.message);
                // Display error message to user
            });
        } else {
            // Username or password field is empty
            console.log("Empty Field");
            showError('Please enter both username and password.');
        }
    });
});

function showError(message) {
    document.getElementById('errorLabel').textContent = message;
}

function showSuccess(message){
    document.getElementById('successLabel').textContent = message;
}

function backToInitial() {
    // Navigate back to the initial scene
    window.location.href = 'initial.html';
}