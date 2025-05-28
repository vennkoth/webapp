// Test Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Initialize test management functionality
    initializeTestManagement();
    
    // Initialize filters
    initializeFilters();
});

function initializeSidebar() {
    // Set active state for current page
    const currentPage = document.querySelector('.sidebar a[href="test.html"]');
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

function initializeTestManagement() {
    // Add New Test button functionality
    const addTestBtn = document.querySelector('#add-test-btn');
    if (addTestBtn) {
        addTestBtn.addEventListener('click', () => {
            openAddTestModal();
        });
    }
    
    // Initialize test table
    initializeTestTable();
}

function openAddTestModal() {
    const modal = document.querySelector('#add-test-modal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Close button functionality
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }
    }
}

function initializeTestTable() {
    // Initialize test table with sorting and filtering
    const testTable = document.querySelector('.test-table');
    if (testTable) {
        // Add your table initialization logic here
        // Including sorting, pagination, and row actions
    }
}

function initializeFilters() {
    // Date range filter
    const dateFilters = document.querySelectorAll('.date-filter');
    dateFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            applyFilters();
        });
    });
    
    // Role filter
    const roleFilter = document.querySelector('#role-filter');
    if (roleFilter) {
        roleFilter.addEventListener('change', () => {
            applyFilters();
        });
    }
}

function applyFilters() {
    // Get filter values
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;
    const role = document.querySelector('#role-filter').value;
    
    // Apply filters to test table
    console.log('Applying filters:', { startDate, endDate, role });
    // Add your filter logic here
}