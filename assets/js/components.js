/**
 * کامپوننت‌های مشترک سایت
 * این فایل navbar و footer را به صورت داینامیک لود می‌کند
 */

(function() {
    'use strict';

    // تابع برای لود کردن کامپوننت‌ها
    async function loadComponent(elementId, componentPath) {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error('خطا در بارگذاری کامپوننت');
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error('خطا در بارگذاری کامپوننت:', error);
        }
    }

    // تابع برای تنظیم لینک فعال در navbar
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#navbar .nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // بررسی صفحه اصلی
            if (currentPath === '/' || currentPath === '/index.html') {
                if (href === '/') {
                    link.classList.add('active');
                }
            }
            // بررسی صفحات محصولات
            else if (currentPath.startsWith('/products')) {
                if (href === '/products/' || href.startsWith('/products/')) {
                    link.classList.add('active');
                }
            }
            // بررسی سایر صفحات
            else if (href === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // تابع برای راه‌اندازی mobile menu
    function initMobileNav() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', function(e) {
                const navbar = document.getElementById('navbar');
                navbar.classList.toggle('navbar-mobile');
                this.classList.toggle('bi-list');
                this.classList.toggle('bi-x');
            });
        }

        // dropdown در موبایل
        const dropdowns = document.querySelectorAll('.navbar .dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                const navbar = document.getElementById('navbar');
                if (navbar.classList.contains('navbar-mobile')) {
                    e.preventDefault();
                    this.nextElementSibling.classList.toggle('dropdown-active');
                }
            });
        });
    }

    // لود کردن کامپوننت‌ها هنگام آماده شدن صفحه
    document.addEventListener('DOMContentLoaded', async function() {
        // لود navbar
        await loadComponent('navbar-placeholder', '/components/navbar.html');
        
        // لود footer
        await loadComponent('footer-placeholder', '/components/footer.html');
        
        // تنظیم لینک فعال
        setActiveNavLink();
        
        // راه‌اندازی mobile menu
        initMobileNav();
    });
})();

