document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('signupButton');
    const backButton = document.getElementById('backButton');

    signupButton.addEventListener('click', function() {
        signUp();
    });

    backButton.addEventListener('click', function() {
        backToInitial();
    });
});

function signUp() {
    const name = document.getElementById('nameField').value;
    const email = document.getElementById('emailField').value;
    const address = document.getElementById('addressField').value;
    const contactNumber = document.getElementById('contactNumberField').value;
    const password = document.getElementById('passwordField').value;

    // Check if the required fields are not empty
    if (name.trim() !== '' && email.trim() !== '' && contactNumber.trim() !== '' && password.trim() !== '' ) {
        // Proceed with sending the credentials to the server
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                address: address,
                contact: contactNumber,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                // Signup successful
                return response.text();
            } else {
                // Signup failed
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .then(message => {
            showSuccess(message);
            clearFields();
        })
        .catch(error => {
            console.error('Signup failed:', error.message);
            // Display error message to user
            showError("Signup failed. Please try again.");
        });
    } else {
        // Required fields are empty
        showError('Please fill in all the required fields.');
    }
}

function backToInitial() {
    // Navigate back to the initial scene
    window.location.href = 'initial.html';
}

function clearFields() {
    document.getElementById('nameField').value = '';
    document.getElementById('emailField').value = '';
    document.getElementById('addressField').value = '';
    document.getElementById('contactNumberField').value = '';
    document.getElementById('passwordField').value = '';
}

function showError(message) {
    document.getElementById('errorLabel').textContent = message;
}

function showSuccess(message){
    document.getElementById('userAdded').textContent = message;
}
