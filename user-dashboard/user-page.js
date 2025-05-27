// User Profile Management
const userProfile = {
    userName: localStorage.getItem('userName') || 'User',
    updateUserName: function(name) {
        this.userName = name;
        localStorage.setItem('userName', name);
        this.updateUIElements();
    },
    updateUIElements: function() {
        document.getElementById('welcome-heading').textContent = 'Welcome ' + this.userName;
        document.getElementById('user-greeting').textContent = 'Hi, ' + this.userName;
    }
};

// Search Functionality
const searchBar = document.querySelector('.search-bar input');
searchBar.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Add your search logic here
    console.log('Searching for:', searchTerm);
});

// Exam Scheduling
function scheduleTest(event) {
    event.preventDefault();
    const form = event.target;
    const testName = form.querySelector('input[type="text"]').value;
    const testDate = form.querySelector('input[type="date"]').value;
    const testTime = form.querySelector('input[type="time"]').value;

    // Here you would typically send this data to your backend
    const testData = {
        name: testName,
        date: testDate,
        time: testTime
    };

    console.log('Scheduling test:', testData);
    // Add your API call here

    // For now, just show a success message
    alert('Test scheduled successfully!');
    form.reset();
}

// Add event listeners to all test scheduling forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', scheduleTest);
});

// Section Navigation
function initializeSectionNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');

            // Update menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');

            // Update content sections
            contentSections.forEach(section => {
                if (section.id === targetSection) {
                    section.style.display = 'block';
                    section.classList.add('active');
                } else {
                    section.style.display = 'none';
                    section.classList.remove('active');
                }
            });
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    userProfile.updateUIElements();
    initializeSectionNavigation();
});