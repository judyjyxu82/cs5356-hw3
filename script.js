// Fetch design quotes from Quotes on Design API
async function fetchDesignQuote() {
    try {
        const response = await fetch('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=1');
        const data = await response.json();
        
        if (data && data.length > 0) {
            const quote = data[0];
            
            // The quote content comes as HTML with paragraph tags
            // Extract the text content using a temporary element
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = quote.content.rendered;
            const quoteText = tempDiv.textContent || tempDiv.innerText || 'No quote available';
            
            // Extract author from the title
            const author = quote.title.rendered || 'Unknown Designer';
            
            // Update the DOM
            document.getElementById('quote-text').textContent = quoteText.trim();
            document.getElementById('quote-author').textContent = `- ${author}`;
        } else {
            throw new Error('No quotes returned from API');
        }
    } catch (error) {
        console.error('Error fetching design quote:', error);
        document.getElementById('quote-text').textContent = 'Design is intelligence made visible.';
        document.getElementById('quote-author').textContent = '- Alina Wheeler';
    }
}

// Add active class to nav links when scrolling
function handleNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add smooth scrolling behavior for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Call the functions when the page loads
window.addEventListener('DOMContentLoaded', () => {
    fetchDesignQuote();
    handleNavHighlight();
    setupSmoothScrolling();
});