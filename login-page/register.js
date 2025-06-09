// Register Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initializeRegistrationForm();
    initializePasswordToggles();
    initializeFormValidation();
});

function initializeRegistrationForm() {
    const registrationForm = document.querySelector('#registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleRegistration();
        });
    }
}

function handleRegistration() {
    const formData = {
        firstName: document.querySelector('#first-name').value.trim(),
        lastName: document.querySelector('#last-name').value.trim(),
        email: document.querySelector('#email').value.trim(),
        password: document.querySelector('#password').value,
        confirmPassword: document.querySelector('#confirm-password').value
    };

    if (!validateAllInputs(formData)) {
        return;
    }

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg || data.error) {
            alert(data.msg || data.error);
        } else {
            alert('Registration successful! Redirecting to login...');
            document.querySelector('#registration-form').reset();
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        alert('Something went wrong. Please try again.');
    });
}

function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const inputId = this.dataset.for;
            const passwordInput = document.querySelector(`#${inputId}`);

            if (passwordInput) {
                const type = passwordInput.getAttribute('type');
                passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
                this.classList.toggle('show-password');
            }
        });
    });
}

function initializeFormValidation() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));

        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
}

function validateAllInputs(formData) {
    let isValid = true;

    if (!formData.firstName) {
        showError('first-name', 'First name is required');
        isValid = false;
    }

    if (!formData.lastName) {
        showError('last-name', 'Last name is required');
        isValid = false;
    }

    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        showError('confirm-password', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();

    switch (input.id) {
        case 'first-name':
        case 'last-name':
            if (!value) showError(input.id, `${input.id.replace('-', ' ')} is required`);
            break;

        case 'email':
            if (!value || !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                showError(input.id, 'Please enter a valid email address');
            }
            break;

        case 'password':
            if (!value || value.length < 6) {
                showError(input.id, 'Password must be at least 6 characters long');
            }
            break;

        case 'confirm-password':
            const password = document.querySelector('#password').value;
            if (value !== password) {
                showError(input.id, 'Passwords do not match');
            }
            break;
    }
}

function showError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    if (input) {
        input.classList.add('error');

        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
    }
}
