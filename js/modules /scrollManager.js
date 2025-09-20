// Manejar el comportamiento del header al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const miniHeader = document.getElementById('miniHeader');
    const mainHeader = document.getElementById('mainHeader');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
            if (scrollTop <= scrollThreshold) {
                document.body.classList.remove('scrolled');
            }
        }
        lastScrollTop = scrollTop;
    });
});