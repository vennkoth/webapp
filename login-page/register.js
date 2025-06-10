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
        fullName: document.querySelector('#full_name').value.trim(),
        email: document.querySelector('#email').value.trim(),
        password: document.querySelector('#password').value,
        confirmPassword: document.querySelector('#confirm_password').value
    };

    if (!validateAllInputs(formData)) return;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error || data.msg) {
            alert(data.error || data.msg);
        } else {
            alert('Registration successful! Redirecting to login...');
            document.querySelector('#registration-form').reset();
            window.location.href = '/login-page/login.html';
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
    const inputs = document.querySelectorAll('#full_name, #email, #password, #confirm_password');
    inputs.forEach(input => {
        input.classList.add('form-input'); // for dynamic binding
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) errorElement.remove();
        });
    });
}

function validateAllInputs(formData) {
    let isValid = true;

    if (!formData.fullName) {
        showError('full_name', 'Full name is required');
        isValid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        showError('confirm_password', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    switch (input.id) {
        case 'full_name':
            if (!value) showError(input.id, 'Full name is required');
            break;
        case 'email':
            if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                showError(input.id, 'Please enter a valid email address');
            }
            break;
        case 'password':
            if (!value || value.length < 6) {
                showError(input.id, 'Password must be at least 6 characters long');
            }
            break;
        case 'confirm_password':
            const password = document.querySelector('#password').value;
            if (value !== password) {
                showError(input.id, 'Passwords do not match');
            }
            break;
    }
}

function showError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    if (!input) return;

    input.classList.add('error');

    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();

    const error = document.createElement('div');
    error.className = 'error-message text-sm text-red-500 mt-1';
    error.textContent = message;
    input.parentElement.appendChild(error);
}
