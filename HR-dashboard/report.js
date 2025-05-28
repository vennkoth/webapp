// Report Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Initialize report functionality
    initializeReports();
    
    // Initialize date filters
    initializeDateFilters();
});

function initializeSidebar() {
    // Set active state for current page
    const currentPage = document.querySelector('.sidebar a[href="report.html"]');
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

function initializeReports() {
    // Initialize report cards
    initializeReportCards();
    
    // Initialize report charts
    initializeCharts();
    
    // Initialize report tables
    initializeReportTables();
}

function initializeReportCards() {
    // Update report summary cards with data
    const reportCards = document.querySelectorAll('.report-card');
    reportCards.forEach(card => {
        // Add click handlers for report cards
        card.addEventListener('click', () => {
            const reportType = card.dataset.reportType;
            showDetailedReport(reportType);
        });
    });
}

function initializeCharts() {
    // Initialize charts for data visualization
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        const chartType = container.dataset.chartType;
        createChart(container, chartType);
    });
}

function createChart(container, type) {
    // Implement chart creation based on type
    console.log('Creating chart:', type);
    // Add your chart initialization logic here
}

function initializeReportTables() {
    // Initialize tables with sorting and export functionality
    const tables = document.querySelectorAll('.report-table');
    tables.forEach(table => {
        // Add sorting functionality
        initializeTableSorting(table);
        
        // Add export functionality
        initializeTableExport(table);
    });
}

function initializeDateFilters() {
    const dateFilters = document.querySelectorAll('.date-filter');
    dateFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            updateReports();
        });
    });
}

function updateReports() {
    // Get filter values
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;
    
    // Update all report components
    console.log('Updating reports for date range:', { startDate, endDate });
    // Add your report update logic here
}

function showDetailedReport(reportType) {
    // Show detailed view for selected report type
    console.log('Showing detailed report for:', reportType);
    // Add your detailed report logic here
}

function initializeTableSorting(table) {
    // Add sorting functionality to table headers
    const headers = table.querySelectorAll('th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            sortTable(table, column);
        });
    });
}

function initializeTableExport(table) {
    // Add export buttons and functionality
    const exportBtn = table.parentElement.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableData(table);
        });
    }
}

function exportTableData(table) {
    // Implement table data export functionality
    console.log('Exporting table data');
    // Add your export logic here
}