// User Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar menu functionality
    initSidebarMenu();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize user profile dropdown
    initUserProfile();
    
    // Set user name dynamically
    setUserName();
    
    // Initialize task items
    initTaskItems();
    
    // Initialize meeting items
    initMeetingItems();
    
    // Initialize footer links
    initFooterLinks();
});

// Initialize sidebar menu functionality
function initSidebarMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Get the menu item text
            const menuText = this.querySelector('span').textContent;
            
            // Get the section ID from data attribute
            const sectionId = this.getAttribute('data-section');
            
            // Hide all content sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            
            // Show the selected content section
            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.style.display = 'block';
                    section.classList.add('active');
                }
            }
            
            // Handle different menu items
            switch(menuText) {
                case 'Dashboard':
                    console.log('Dashboard clicked');
                    // Content is already shown via section display
                    break;
                case 'Exams':
                    console.log('Exams clicked');
                    // Content is already shown via section display
                    break;
                case 'New Meeting':
                    console.log('New Meeting clicked');
                    // You can add code to show new meeting form
                    window.location.href = 'new-meeting.html';
                    break;
                case 'Meetings':
                    console.log('Meetings clicked');
                    // You can add code to show meetings list
                    window.location.href = 'meetings.html';
                    break;
                case 'Task':
                    console.log('Task clicked');
                    // You can add code to show tasks
                    window.location.href = 'tasks.html';
                    break;
                case 'Meeting Advisor':
                    console.log('Meeting Advisor clicked');
                    // You can add code to show meeting advisor
                    window.location.href = 'meeting-advisor.html';
                    break;
                case 'Settings':
                    console.log('Settings clicked');
                    // You can add code to show settings
                    window.location.href = 'settings.html';
                    break;
                default:
                    console.log(`${menuText} clicked`);
            }
        });
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                console.log(`Searching for: ${searchTerm}`);
                // Implement search functionality here
                alert(`Searching for: ${searchTerm}`);
            }
        }
    });
}

// Initialize user profile dropdown
function initUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    
    userProfile.addEventListener('click', function() {
        console.log('User profile clicked');
        // Create dropdown if it doesn't exist
        let dropdown = document.getElementById('user-dropdown');
        
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'user-dropdown';
            dropdown.className = 'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50';
            dropdown.style.top = '60px';
            dropdown.style.right = '30px';
            
            // Add dropdown items
            dropdown.innerHTML = `
                <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="account-settings.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</a>
                <div class="border-t border-gray-100"></div>
                <a href="index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            `;
            
            document.body.appendChild(dropdown);
        } else {
            // Toggle dropdown visibility
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-profile')) {
            const dropdown = document.getElementById('user-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }
    });
}

// Set user name dynamically
function setUserName() {
    const userNameElement = document.querySelector('h1.text-2xl');
    if (userNameElement && userNameElement.textContent.includes('[Name]')) {
        // Get user name from localStorage or set default
        const userName = localStorage.getItem('userName') || 'User';
        userNameElement.textContent = `Welcome ${userName}`;
    }
}

// Initialize task items
function initTaskItems() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Task item clicked:', this.querySelector('span').textContent);
            // You can add code to show task details or mark as complete
            this.classList.toggle('completed');
            
            // Add completed style if not already defined in CSS
            if (this.classList.contains('completed') && !document.getElementById('completed-style')) {
                const style = document.createElement('style');
                style.id = 'completed-style';
                style.textContent = `
                    .task-item.completed {
                        background-color: #f8f9fa;
                        text-decoration: line-through;
                        color: #6c757d;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    });
}

// Initialize meeting items
function initMeetingItems() {
    const meetingItems = document.querySelectorAll('.meeting-item');
    
    meetingItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Meeting item clicked:', this.querySelector('span').textContent);
            // You can add code to show meeting details
            window.location.href = `meeting-details.html?meeting=${this.querySelector('span').textContent}`;
        });
    });
}

// Initialize footer links
function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            console.log(`Footer link clicked: ${linkText}`);
            
            switch(linkText) {
                case 'ThemeKita':
                    window.open('https://themekita.com', '_blank');
                    break;
                case 'Help':
                    window.location.href = 'help.html';
                    break;
                case 'Licenses':
                    window.location.href = 'licenses.html';
                    break;
                default:
                    console.log(`Unknown footer link: ${linkText}`);
            }
        });
    });
}