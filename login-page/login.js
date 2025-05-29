// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize login form
    initializeLoginForm();
    
    // Initialize password visibility toggle
    initializePasswordToggle();
    
    // Initialize remember me functionality
    initializeRememberMe();
});

function initializeLoginForm() {
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleLogin();
        });
    }
    
    // Initialize input validation
    initializeInputValidation();
}

function handleLogin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const rememberMe = document.querySelector('#remember-me').checked;
    
    // Validate inputs
    if (!validateInputs(email, password)) {
        return;
    }
    
    // Perform login
    console.log('Attempting login with:', { email, rememberMe });
    // Add your login logic here
    
    // For demonstration, redirect to dashboard
    window.location.href = '../HR dashborad html/index.html';
}

function initializePasswordToggle() {
    const toggleButton = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('#password');
    
    if (toggleButton && passwordInput) {
        toggleButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type');
            passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
            toggleButton.classList.toggle('show-password');
        });
    }
}

function initializeRememberMe() {
    const rememberMe = document.querySelector('#remember-me');
    if (rememberMe) {
        // Check if there's a saved preference
        const savedPreference = localStorage.getItem('rememberMe');
        if (savedPreference) {
            rememberMe.checked = JSON.parse(savedPreference);
        }
        
        // Save preference when changed
        rememberMe.addEventListener('change', () => {
            localStorage.setItem('rememberMe', rememberMe.checked);
        });
    }
}

function initializeInputValidation() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            // Remove error state while typing
            input.classList.remove('error');
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
}

function validateInputs(email, password) {
    let isValid = true;
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password || password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    
    switch (input.id) {
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
    }
}

function showError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    if (input) {
        input.classList.add('error');
        
        // Remove existing error message if any
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
    }
}