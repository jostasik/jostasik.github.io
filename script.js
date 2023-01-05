// Get all the nav links
// Get all the nav links
const navLinks = document.querySelectorAll('.nav-link');

// Add a click event listener to each nav link
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        // Prevent the default link behavior
        // e.preventDefault();

        // Get the target section ID
        const sectionId = link.getAttribute('href');

        // Get the target section element
        const section = document.querySelector(sectionId);

        // Remove the 'fade-in' class from all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('fade-in');
        });

        // Add the 'fade-in' class to the target section
        section.classList.add('fade-in');
    });
});