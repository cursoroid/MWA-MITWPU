// Check if the user has a preference for dark mode
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
}

// Event listener for dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', function () {
    toggleDarkMode();
});

function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    // Save user preference to localStorage
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    // Remove user preference from localStorage
    localStorage.setItem('darkMode', null);
}



document.getElementById('name').onblur = function () {
    validateName();
};

document.getElementById('email').onblur = function () {
    validateEmail();
};

document.getElementById('phone').onblur = function () {
    validatePhone();
};

document.getElementById('dob').onblur = function () {
    validateDOB();
};

document.getElementById('submitBtn').onclick = function () {
    if (validateForm()) {
        // Successful validation, show notification
        showNotification('Form submitted successfully!');
        // Clear all error messages
        clearAllErrors();
    }
};

function validateForm() {
    var isFormValid = true;

    // Validate Name
    if (!validateName()) {
        isFormValid = false;
    }

    // Validate Email
    if (!validateEmail()) {
        isFormValid = false;
    }

    // Validate Phone
    if (!validatePhone()) {
        isFormValid = false;
    }

    // Validate Date of Birth
    if (!validateDOB()) {
        isFormValid = false;
    }

    return isFormValid;
}

function showNotification(message) {
    alert(message);
}

function clearAllErrors() {
    var errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    });
}

function validateName() {
    var name = document.getElementById('name').value;

    // Regular expression to match only alphabets
    var alphabetRegex = /^[A-Za-z]+$/;

    if (name === '') {
        showError('name', 'Name is required');
        return false;
    } else if (name.length > 128) {
        showError('name', 'Name cannot exceed 128 characters');
        return false;
    } else if (!alphabetRegex.test(name)) {
        showError('name', 'Name must contain only alphabets');
        return false;
    } else {
        hideError('name');
        return true;
    }
}


function validateEmail() {
    var email = document.getElementById('email').value;

    if (email === '') {
        showError('email', 'Email is required');
        return false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Invalid email format');
        return false;
    } else {
        hideError('email');
        return true;
    }
}

function validatePhone() {
    var phone = document.getElementById('phone').value;

    if (phone === '') {
        showError('phone', 'Phone number is required');
        return false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Invalid phone number format');
        return false;
    } else {
        hideError('phone');
        return true;
    }
}

function validateDOB() {
    var dob = document.getElementById('dob').value;
    var dobDate = new Date(dob);
    var currentDate = new Date();
    var age = calculateAge(dobDate, currentDate);

    if (dob === '') {
        showError('dob', 'Date of Birth is required');
        return false;
    } else if (age < 18 || age > 75) {
        showError('dob', 'Age must be between 18 and 75 years');
        return false;
    } else {
        hideError('dob');
        return true;
    }
}

function calculateAge(birthDate, currentDate) {
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function showError(id, message) {
    var inputElement = document.getElementById(id);
    var errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = message;

    var parentElement = inputElement.parentNode;
    parentElement.appendChild(errorElement);
}

function hideError(id) {
    var parentElement = document.getElementById(id).parentNode;
    var errorElement = parentElement.querySelector('.error-message');
    if (errorElement) {
        parentElement.removeChild(errorElement);
    }
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    var phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}
