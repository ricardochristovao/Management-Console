document.addEventListener('DOMContentLoaded', function() {
    // OS Detection
    detectOperatingSystem();
    
    // FAQ Toggle
    setupFaqToggle();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Active link highlighting
    setupActiveNavLinks();
});

// Detect user's operating system and highlight appropriate button
function detectOperatingSystem() {
    const osIcon = document.getElementById('os-icon');
    const osMessage = document.getElementById('os-message');
    const windowsBtn = document.getElementById('windows-btn');
    const macBtn = document.getElementById('mac-btn');
    
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.indexOf('win') !== -1) {
        // Windows OS
        osIcon.textContent = '🪟';
        osMessage.textContent = 'Detectamos que você está usando Windows. Recomendamos:';
        windowsBtn.classList.add('btn-primary');
        macBtn.classList.add('btn-secondary');
        macBtn.classList.remove('btn-primary');
    } else if (userAgent.indexOf('mac') !== -1) {
        // macOS
        osIcon.textContent = '🍎';
        osMessage.textContent = 'Detectamos que você está usando macOS. Recomendamos:';
        macBtn.classList.add('btn-primary');
        windowsBtn.classList.add('btn-secondary');
        windowsBtn.classList.remove('btn-primary');
    } else {
        // Other OS or unable to detect
        osIcon.textContent = '🖥️';
        osMessage.textContent = 'Selecione a ferramenta compatível com seu sistema:';
    }
}

// Setup FAQ accordion functionality
function setupFaqToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('open');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('open');
            });
            
            // Toggle the current answer if it wasn't already open
            if (!isOpen) {
                answer.classList.add('open');
            }
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight active navigation links when scrolling
function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Function to copy code examples to clipboard
function copyToClipboard(element) {
    const codeBlock = element.previousElementSibling;
    const textArea = document.createElement('textarea');
    textArea.value = codeBlock.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show copied message
    element.textContent = 'Copiado!';
    setTimeout(() => {
        element.textContent = 'Copiar código';
    }, 2000);
}
