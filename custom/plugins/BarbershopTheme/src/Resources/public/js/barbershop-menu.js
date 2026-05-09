(function () {
    var menu = document.querySelector('[data-bs-menu]');
    var openButton = document.querySelector('[data-bs-menu-open]');

    if (!menu || !openButton) {
        return;
    }

    var closeControls = menu.querySelectorAll('[data-bs-menu-close], [data-bs-menu-link]');
    var firstLink = menu.querySelector('.bs-mobile-menu__links a');

    function openMenu() {
        menu.classList.add('is-open');
        document.body.classList.add('bs-menu-is-open');
        menu.setAttribute('aria-hidden', 'false');
        openButton.setAttribute('aria-expanded', 'true');

        if (firstLink) {
            firstLink.focus({ preventScroll: true });
        }
    }

    function closeMenu() {
        menu.classList.remove('is-open');
        document.body.classList.remove('bs-menu-is-open');
        menu.setAttribute('aria-hidden', 'true');
        openButton.setAttribute('aria-expanded', 'false');
    }

    openButton.addEventListener('click', openMenu);

    closeControls.forEach(function (control) {
        control.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menu.classList.contains('is-open')) {
            closeMenu();
            openButton.focus({ preventScroll: true });
        }
    });
}());
