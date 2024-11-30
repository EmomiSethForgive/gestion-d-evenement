// Animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effects to event cards
    const eventCards = document.querySelectorAll('.bg-white.rounded-lg');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', 'scale-105', 'transition-transform');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', 'scale-105', 'transition-transform');
        });
    });

    // Add click handlers for buttons
    const exploreButton = document.querySelector('button.bg-blue-500');
    const createButton = document.querySelector('button.border-blue-500');

    exploreButton?.addEventListener('click', () => {
        // Scroll to events section
        document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
    });

    createButton?.addEventListener('click', () => {
        // Show create event modal (to be implemented)
        // alert('Création d\'événement à venir !');
    });

    // Modal handling
    const modal = document.getElementById('createEventModal');
    const closeModal = document.getElementById('closeModal');
    const cancelButton = document.getElementById('cancelEvent');
    const eventForm = document.getElementById('eventForm');

    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        eventForm.reset();
    }

    createButton.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunc);
    cancelButton.addEventListener('click', closeModalFunc);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create FormData object
        const formData = new FormData(eventForm);
        
        // Create event object from form data
        const eventData = {
            name: formData.get('eventName'),
            date: formData.get('eventDate'),
            time: formData.get('eventTime'),
            location: formData.get('eventLocation'),
            type: formData.get('eventType'),
            description: formData.get('eventDescription')
        };

        // Log the event data (replace with actual API call later)
        console.log('Nouvel événement:', eventData);

        // Handle image file
        const imageFile = formData.get('eventImage');
        if (imageFile.size > 0) {
            console.log('Image sélectionnée:', imageFile.name);
        }

        // Show success message
        alert('Événement créé avec succès !');
        closeModalFunc();
    });

    // Add escape key listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModalFunc();
        }
    });
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
