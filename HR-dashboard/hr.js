// HR Dashboard JavaScript

document.addEventListener('DOMContentLoaded', async function() {
    initializeSidebar();
    initializeSearch();
    initializeDataTables();

    const testDropdown = document.getElementById('testDropdown');
    if (testDropdown) {
        // Initially load assigned candidates for the selected test
        const selectedTestId = testDropdown.value;
        if (selectedTestId) {
            const test = await fetchTestDetails(selectedTestId);
            if (test && test.candidates) {
                updateAssignedButtons(test.candidates);
            }
        }

        // Listen for dropdown changes
        testDropdown.addEventListener('change', async function() {
            const testId = this.value;
            if (testId) {
                const test = await fetchTestDetails(testId);
                if (test && test.candidates) {
                    updateAssignedButtons(test.candidates);
                } else {
                    clearAssignedButtons();
                }
            }
        });
    }
});

// Fetch test details from backend
async function fetchTestDetails(testId) {
    try {
        const res = await fetch(`/api/tests/${testId}`);
        if (!res.ok) throw new Error('Failed to fetch test details');
        return await res.json();
    } catch (err) {
        console.error('[FETCH TEST DETAILS ERROR]', err);
        return null;
    }
}

// Update Assign buttons to show "Assigned" state
function updateAssignedButtons(candidates) {
    // Reset all assign buttons first
    document.querySelectorAll('.assign-button').forEach(btn => {
        btn.textContent = 'Assign';
        btn.disabled = false;
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        btn.classList.add('bg-blue-500');
    });

    // Now disable buttons for assigned users
    candidates.forEach(candidate => {
        const btn = document.querySelector(
            `.assign-button[data-userid="${candidate._id}"]`
        );
        if (btn) {
            btn.textContent = 'Assigned';
            btn.disabled = true;
            btn.classList.remove('bg-blue-500');
            btn.classList.add('bg-gray-400', 'cursor-not-allowed');
        }
    });
}

// Optional: Clear all assigned buttons if no test selected
function clearAssignedButtons() {
    document.querySelectorAll('.assign-button').forEach(btn => {
        btn.textContent = 'Assign';
        btn.disabled = false;
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        btn.classList.add('bg-blue-500');
    });
}

function initializeSidebar() {
    const currentPage = document.querySelector('.sidebar a[href="hr.html"]');
    if (currentPage) {
        currentPage.classList.add('active');
    }

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
    console.log('Searching for:', query);
    // Add your search logic here
}

function initializeDataTables() {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        // Add your table initialization logic here
    });
}
async function fetchAvailableTests() {
    try {
        const res = await fetch('/api/tests');
        return await res.json();
    } catch (err) {
        console.error('[FETCH TESTS ERROR]', err);
        return [];
    }
}

async function populateMainDropdown() {
    const tests = await fetchAvailableTests();
    const dropdown = document.getElementById('testDropdown');
    if (dropdown && tests.length > 0) {
        dropdown.innerHTML = tests.map(
            t => `<option value="${t._id}">${t.name}</option>`
        ).join('');
    } else if (dropdown) {
        dropdown.innerHTML = `<option disabled>No tests available</option>`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await populateMainDropdown();

    const dropdown = document.getElementById('testDropdown');
    if (dropdown) {
        const testId = dropdown.value;
        if (testId) {
            await loadAssignedCandidates(testId);
        }

        dropdown.addEventListener('change', async () => {
            const testId = dropdown.value;
            if (testId) {
                await loadAssignedCandidates(testId);
            } else {
                clearAssignedButtons();
            }
        });
    }
});

async function loadAssignedCandidates(testId) {
    try {
        const res = await fetch(`/api/tests/${testId}`);
        const test = await res.json();
        if (test && test.candidates) {
            updateAssignedButtons(test.candidates);
        }
    } catch (err) {
        console.error('[LOAD ASSIGNED CANDIDATES ERROR]', err);
    }
}

function updateAssignedButtons(candidates) {
    // Reset all buttons
    document.querySelectorAll('.assign-candidate-btn').forEach(btn => {
        btn.textContent = 'Assign';
        btn.disabled = false;
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        btn.classList.add('bg-blue-500');
    });

    // Update assigned ones
    candidates.forEach(userId => {
        const btn = document.querySelector(`.assign-candidate-btn[data-user-id='${userId}']`);
        if (btn) {
            btn.textContent = 'Assigned';
            btn.disabled = true;
            btn.classList.remove('bg-blue-500');
            btn.classList.add('bg-gray-400', 'cursor-not-allowed');
        }
    });
}

function clearAssignedButtons() {
    document.querySelectorAll('.assign-candidate-btn').forEach(btn => {
        btn.textContent = 'Assign';
        btn.disabled = false;
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        btn.classList.add('bg-blue-500');
    });
}

// Function to handle assigning candidates to tests