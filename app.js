/* ==========================================================================
   Coffee & Canvas Express - Client-side Interactive Logic (No Backend)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Shadow on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Elements for Modal & Toast
  const modalBackdrop = document.getElementById('demoModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalForm = document.getElementById('demoOrderForm');
  const selectedCoffeeInput = document.getElementById('selectedCoffee');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Open Modal function
  window.openOrderModal = function(coffeeName = 'Espresso de la Casa') {
    if (selectedCoffeeInput) {
      selectedCoffeeInput.value = coffeeName;
    }
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  };

  // Close Modal function
  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // 3. Show Toast Notification
  function showToast(message) {
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 4500);
    }
  }

  // 4. Handle Simulated Form Submission (100% Frontend)
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const coffee = selectedCoffeeInput ? selectedCoffeeInput.value : 'Tu café';
      const name = document.getElementById('userName')?.value || 'Vecino/a';
      const time = document.getElementById('pickupTime')?.value || '10 min';

      closeModal();
      
      // Feedback Toast
      showToast(`⚡ ¡Excelente ${name}! Simulamos tu pedido de ${coffee} para recoger en ${time}. ¡Gracias por apoyar la iniciativa del barrio!`);
      
      // Reset form
      modalForm.reset();
    });
  }

  // 5. Hero CTA & Buttons Click Listeners
  const allOrderBtns = document.querySelectorAll('.trigger-modal');
  allOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.getAttribute('data-coffee') || 'Latte de Especialidad';
      openOrderModal(item);
    });
  });

  // 6. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#FAF6F0';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }
    });
  }
});
