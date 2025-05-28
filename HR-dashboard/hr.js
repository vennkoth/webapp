// HR Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize data tables
    initializeDataTables();
});

function initializeSidebar() {
    // Set active state for current page
    const currentPage = document.querySelector('.sidebar a[href="hr.html"]');
    if (currentPage) {
        currentPage.classList.add('active');
    }
    
    // Add hover effects
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.classList.add('hover');
            }
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('hover');
        });
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    // Implement search functionality
    console.log('Searching for:', query);
    // Add your search logic here
}

function initializeDataTables() {
    // Initialize tables with sorting and pagination
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        // Add your table initialization logic here
    });
}