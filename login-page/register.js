// Register Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize registration form
    initializeRegistrationForm();
    
    // Initialize password visibility toggles
    initializePasswordToggles();
    
    // Initialize form validation
    initializeFormValidation();
});

function initializeRegistrationForm() {
    const registrationForm = document.querySelector('#registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleRegistration();
        });
    }
}

function handleRegistration() {
    const formData = {
        firstName: document.querySelector('#first-name').value,
        lastName: document.querySelector('#last-name').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        confirmPassword: document.querySelector('#confirm-password').value
    };
    
    // Validate inputs
    if (!validateAllInputs(formData)) {
        return;
    }
    
    // Perform registration
    console.log('Attempting registration for:', formData.email);
    // Add your registration logic here
    
    // For demonstration, redirect to login page
    window.location.href = 'login.html';
}

function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
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

function validateAllInputs(formData) {
    let isValid = true;
    
    // Validate first name
    if (!formData.firstName.trim()) {
        showError('first-name', 'First name is required');
        isValid = false;
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
        showError('last-name', 'Last name is required');
        isValid = false;
    }
    
    // Validate email
    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!formData.password || formData.password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    // Validate confirm password
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
            if (!value) {
                showError(input.id, `${input.id.replace('-', ' ')} is required`);
            }
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