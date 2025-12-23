// Shared functionality for AI modal across different pages
function openAiModal() {
    const aiModal = document.getElementById('ai-modal');
    if (aiModal) {
        aiModal.classList.remove('hidden');
    }
}

function closeAiModal() {
    const aiModal = document.getElementById('ai-modal');
    if (aiModal) {
        aiModal.classList.add('hidden');
    }
}

// Initialize AI modal closing functionality
document.addEventListener('DOMContentLoaded', () => {
    const aiModal = document.getElementById('ai-modal');
    if (aiModal) {
        // Close modal when clicking outside of it
        aiModal.addEventListener('click', (e) => {
            if (e.target === aiModal) {
                closeAiModal();
            }
        });
    }
});

// Web editor specific functionality for modal
function setupWebEditorModal() {
    const aiModal = document.getElementById('ai-modal');
    if (aiModal) {
        // Close modal when clicking outside of it (web editor specific)
        aiModal.addEventListener('click', (e) => {
            if (e.target === aiModal) {
                closeAiModal();
            }
        });
    }
}