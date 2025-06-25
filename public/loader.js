    function showLoader() {
    let loader = document.getElementById('loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
    }

    function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    }
