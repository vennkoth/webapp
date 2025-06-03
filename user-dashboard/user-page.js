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
        document.getElementById('profile-username').textContent = this.userName;
    }
};

// Search Functionality
const searchBar = document.querySelector('.search-bar input');
searchBar.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Add your search logic here
    console.log('Searching for:', searchTerm);
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

// Initialize Dashboard Charts
function initializeDashboardCharts() {
    // Performance Trends Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Mock Tests',
                data: [75, 82, 78, 85, 80, 82],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score Percentage'
                    }
                }
            }
        }
    });

    // Score Breakdown Chart
    const breakdownCtx = document.getElementById('scoreBreakdownChart').getContext('2d');
    new Chart(breakdownCtx, {
        type: 'doughnut',
        data: {
            labels: ['Passed', 'Failed', 'Upcoming'],
            datasets: [{
                data: [65, 20, 15],
                backgroundColor: ['#22c55e', '#ef4444', '#f59e0b']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize Mock Tests Charts
function initializeMockTestsCharts() {
    // Tests Completed Chart (Bar Chart)
    const completedCtx = document.getElementById('mockTestsCompletedChart').getContext('2d');
    new Chart(completedCtx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Tests Completed',
                data: [2, 3, 4, 3],
                backgroundColor: '#3b82f6',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });

    // Average Performance Chart (Line Chart)
    const performanceCtx = document.getElementById('mockTestsPerformanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
            datasets: [{
                label: 'Score',
                data: [65, 75, 70, 85, 80],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Topic Distribution Chart (Pie Chart)
    const topicsCtx = document.getElementById('mockTestsTopicsChart').getContext('2d');
    new Chart(topicsCtx, {
        type: 'pie',
        data: {
            labels: ['Technical', 'Aptitude', 'Problem Solving'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#3b82f6', '#f59e0b', '#ec4899']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Initialize all charts when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    userProfile.updateUIElements();
    initializeSectionNavigation();
    initializeDashboardCharts();
    initializeMockTestsCharts();
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

// Initialize Combined Performance Charts
function initializeCombinedCharts() {
    // Combined Performance Trends Chart
    const combinedCtx = document.getElementById('combinedPerformanceChart').getContext('2d');
    new Chart(combinedCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Mock Tests',
                data: [75, 82, 78, 85, 80, 82],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }, {
                label: 'Exams',
                data: [70, 75, 80, 78, 85, 90],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score Percentage'
                    }
                }
            }
        }
    });

    // Test Type Distribution Chart
    const distributionCtx = document.getElementById('testDistributionChart').getContext('2d');
    new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Mock Tests Passed', 'Mock Tests Failed', 'Exams Passed', 'Exams Failed'],
            datasets: [{
                data: [6, 2, 4, 1],
                backgroundColor: [
                    '#3b82f6',  // Mock Tests Passed
                    '#93c5fd',  // Mock Tests Failed
                    '#22c55e',  // Exams Passed
                    '#86efac'   // Exams Failed
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    userProfile.updateUIElements();
    initializeSectionNavigation();
    initializeMockTestsCharts();
    initializeCombinedCharts();

    // Performance Trends (Line Chart)
    const perfCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(perfCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Score',
                data: [70, 75, 80, 78, 85, 90],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37,99,235,0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });

    // Score Breakdown (Doughnut Chart)
    const scoreCtx = document.getElementById('scoreBreakdownChart').getContext('2d');
    new Chart(scoreCtx, {
        type: 'doughnut',
        data: {
            labels: ['Passed', 'Failed', 'Upcoming'],
            datasets: [{
                data: [5, 1, 2],
                backgroundColor: ['#22c55e', '#ef4444', '#f59e42']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
});