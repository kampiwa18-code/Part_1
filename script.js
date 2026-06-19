// FAQ Accordion with Animations based on actual HTML
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    // Find the h3 question and the p answer inside this specific article item
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    if (question && answer) {
        // Style cursor to point so users know they can click it
        question.style.cursor = 'pointer';

        question.addEventListener('click', () => {
            // Check if this specific item is already active
            const isOpen = item.classList.contains('active');
            
            // Close all other open FAQs first
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // If it wasn't open, add the active class to slide it down
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    }
});