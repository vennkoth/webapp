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

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('view-candidates')) {
        e.preventDefault(); 
      const testId = e.target.dataset.id;
      const modal = document.getElementById('viewCandidatesModal');
      const list = document.getElementById('assignedCandidatesList');
      
      try {
        const res = await fetch(`/api/tests/${testId}`);
        const test = await res.json();
  
        if (!test.candidates || test.candidates.length === 0) {
          list.innerHTML = '<p class="text-gray-500">No candidates assigned yet.</p>';
        } else {
          list.innerHTML = test.candidates.map(user => `
            <div class="flex justify-between items-center px-3 py-2 border rounded">
              <span>${user.fullName} (${user.email})</span>
            </div>
          `).join('');
        }
  
        modal.classList.remove('hidden');
      } catch (err) {
        console.error('Error loading assigned candidates:', err);
      }
    }
  });
  
  // Close view modal
  document.getElementById('closeViewCandidatesModal').addEventListener('click', () => {
    document.getElementById('viewCandidatesModal').classList.add('hidden');
  });
  