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
    const form = document.querySelector('#registration-form');
    const formData = new FormData(form);

    if (!validateAllInputs(formData)) {
        return;
    }

    // Generate username from full name and ensure it's included in both places
    const fullName = formData.get('full_name');
    const username = fullName.toLowerCase().replace(/\s+/g, '_');

    // Create a new FormData object with correctly mapped field names
    const mappedFormData = new FormData();
    
    // Core user fields
    mappedFormData.append('username', username);  // Ensure username is set
    mappedFormData.append('email', formData.get('email'));
    mappedFormData.append('password', formData.get('password'));
    mappedFormData.append('role', 'student');
    
    // Profile fields
    mappedFormData.append('fullName', fullName);
    mappedFormData.append('dob', formData.get('dob'));
    mappedFormData.append('collegeName', formData.get('college_name'));
    mappedFormData.append('course', formData.get('course'));
    mappedFormData.append('yearOfStudy', formData.get('yearOfStudy'));

    // Resume file
    const resumeFile = formData.get('resume');
    if (resumeFile) {
        mappedFormData.append('resume', resumeFile);
    }

    fetch('/api/auth/register', {
        method: 'POST',
        body: mappedFormData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => Promise.reject(data));
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'User registered successfully') {
            form.reset();
            // Show success message with callback for redirection
            window.alert('Registration successful! Please login with your credentials.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 100);
        } else {
            throw new Error('Registration failed');
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        alert(error.message || 'Something went wrong. Please try again.');
    });
}

// Update validation function
function validateAllInputs(formData) {
    let isValid = true;

    // Required fields
    const requiredFields = [
        'full_name',
        'email',
        'password',
        'confirm-password',
        'dob',
        'college_name',
        'course',
        'yearOfStudy',
        'resume'
    ];
    
    requiredFields.forEach(field => {
        const value = field === 'confirm-password' ? 
            document.querySelector('#confirm-password').value :
            formData.get(field);

        if (!value) {
            showError(field, `${field.replace(/[_-]/g, ' ')} is required`);
            isValid = false;
        }
    });

    // Password validation
    const password = formData.get('password');
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (password && !validatePassword(password)) {
        isValid = false;
    }

    if (password && confirmPassword && password !== confirmPassword) {
        showError('confirm-password', 'Passwords do not match');
        isValid = false;
    }

    // Resume validation
    const resume = formData.get('resume');
    if (resume && resume.size > 5 * 1024 * 1024) { // 5MB limit
        showError('resume', 'Resume file size must be less than 5MB');
        isValid = false;
    }

    return isValid;
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    let isValid = true;

    if (password.length < minLength) {
        showError('password', 'Password must be at least 8 characters long');
        isValid = false;
    }

    if (!hasUpperCase) {
        showError('password', 'Password must contain at least one uppercase letter');
        isValid = false;
    }

    if (!hasNumber) {
        showError('password', 'Password must contain at least one number');
        isValid = false;
    }

    if (!hasSpecialChar) {
        showError('password', 'Password must contain at least one special character (!@#$%^&*)');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('border-red-500');
        
        // Remove existing error message if any
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }
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
