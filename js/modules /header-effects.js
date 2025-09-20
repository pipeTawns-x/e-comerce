// Efectos del header
document.addEventListener('DOMContentLoaded', function() {
    const mainHeader = document.getElementById('mainHeader');
    const videoOverlay = document.querySelector('.banner-section__video-overlay');
    
    if (mainHeader && videoOverlay) {
        mainHeader.addEventListener('mouseenter', function() {
            videoOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            this.style.backgroundColor = 'rgba(245, 245, 245, 0.95)';
        });

        mainHeader.addEventListener('mouseleave', function() {
            videoOverlay.style.backgroundColor = '';
            this.style.backgroundColor = '';
        });
    }
});