// ===== CONTACT FORM JAVASCRIPT FILE =====

class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.newsletterForm = document.querySelector('.newsletter-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.initContactForm();
        }
        if (this.newsletterForm) {
            this.initNewsletterForm();
        }
        this.initFormAnimations();
        this.initInputEffects();
    }

    // ===== CONTACT FORM HANDLING =====
    initContactForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    handleContactSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const isValid = this.validateForm(data);
        
        if (!isValid) {
            return;
        }

        // Show loading state
        this.showLoadingState();

        // Simulate API call
        setTimeout(() => {
            this.hideLoadingState();
            this.showSuccessMessage();
            this.resetForm();
        }, 2000);
    }

    validateForm(data) {
        let isValid = true;
        const requiredFields = ['name', 'email', 'company', 'service', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!data[fieldName] || data[fieldName].trim() === '') {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            const emailField = this.form.querySelector('[name="email"]');
            this.showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;

        // Clear previous errors
        this.clearFieldError(field);

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        // Phone validation (if applicable)
        if (fieldName === 'phone' && value && !this.isValidPhone(value)) {
            this.showFieldError(field, 'Please enter a valid phone number');
            return false;
        }

        return true;
    }

    showFieldError(field, message) {
        // Remove existing error
        this.clearFieldError(field);

        // Add error class
        field.classList.add('error');

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #F56565;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: slideDown 0.3s ease-out;
        `;

        // Insert after field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    showLoadingState() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Store original text for restoration
        submitBtn.dataset.originalText = originalText;
    }

    hideLoadingState() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.dataset.originalText || 'Send Message';
    }

    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div class="notification-text">
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48BB78;
            color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    resetForm() {
        this.form.reset();
        
        // Clear any error states
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }

    // ===== NEWSLETTER FORM HANDLING =====
    initNewsletterForm() {
        this.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmit();
        });

        // Real-time email validation
        const emailInput = this.newsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                this.validateNewsletterEmail(emailInput);
            });
            
            emailInput.addEventListener('input', () => {
                this.clearNewsletterError(emailInput);
            });
        }
    }

    handleNewsletterSubmit() {
        const emailInput = this.newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!email) {
            this.showNewsletterError(emailInput, 'Please enter your email address');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNewsletterError(emailInput, 'Please enter a valid email address');
            return;
        }

        // Show loading state
        this.showNewsletterLoadingState();

        // Simulate API call
        setTimeout(() => {
            this.hideNewsletterLoadingState();
            this.showNewsletterSuccess();
            this.newsletterForm.reset();
        }, 1500);
    }

    validateNewsletterEmail(emailInput) {
        const email = emailInput.value.trim();
        
        if (!email) {
            this.showNewsletterError(emailInput, 'Please enter your email address');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showNewsletterError(emailInput, 'Please enter a valid email address');
            return false;
        }

        return true;
    }

    showNewsletterError(emailInput, message) {
        this.clearNewsletterError(emailInput);
        
        emailInput.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'newsletter-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #F56565;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            animation: slideDown 0.3s ease-out;
        `;
        
        this.newsletterForm.appendChild(errorDiv);
    }

    clearNewsletterError(emailInput) {
        emailInput.classList.remove('error');
        const errorDiv = this.newsletterForm.querySelector('.newsletter-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showNewsletterLoadingState() {
        const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        submitBtn.dataset.originalText = originalText;
    }

    hideNewsletterLoadingState() {
        const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.dataset.originalText || 'Subscribe';
    }

    showNewsletterSuccess() {
        const notification = document.createElement('div');
        notification.className = 'newsletter-success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Successfully subscribed to our newsletter!</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48BB78;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ===== FORM ANIMATIONS =====
    initFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                group.style.transition = 'all 0.6s ease-out';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // ===== INPUT EFFECTS =====
    initInputEffects() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Focus effects
            input.addEventListener('focus', () => {
                this.addFocusEffect(input);
            });
            
            input.addEventListener('blur', () => {
                this.removeFocusEffect(input);
            });
            
            // Character counter for textarea
            if (input.tagName === 'TEXTAREA') {
                this.addCharacterCounter(input);
            }
            
            // Auto-resize textarea
            if (input.tagName === 'TEXTAREA') {
                input.addEventListener('input', () => {
                    this.autoResizeTextarea(input);
                });
            }
        });
    }

    addFocusEffect(input) {
        input.style.transform = 'translateY(-2px)';
        input.style.boxShadow = '0 8px 25px rgba(107, 70, 193, 0.15)';
        
        // Add floating label effect
        const label = input.parentNode.querySelector('label');
        if (label) {
            label.style.color = '#6B46C1';
            label.style.transform = 'translateY(-20px) scale(0.85)';
        }
    }

    removeFocusEffect(input) {
        input.style.transform = 'translateY(0)';
        input.style.boxShadow = '';
        
        const label = input.parentNode.querySelector('label');
        if (label && !input.value) {
            label.style.color = '';
            label.style.transform = '';
        }
    }

    addCharacterCounter(textarea) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            font-size: 0.75rem;
            color: #718096;
            text-align: right;
            margin-top: 0.25rem;
        `;
        
        textarea.parentNode.appendChild(counter);
        
        const updateCounter = () => {
            const count = textarea.value.length;
            const maxLength = textarea.getAttribute('maxlength') || 1000;
            counter.textContent = `${count}/${maxLength}`;
            
            if (count > maxLength * 0.9) {
                counter.style.color = '#F56565';
            } else {
                counter.style.color = '#718096';
            }
        };
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // ===== ADVANCED FEATURES =====
    
    // Auto-save form data
    initAutoSave() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.saveFormData();
            });
        });
        
        // Restore saved data on page load
        this.restoreFormData();
    }

    saveFormData() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        localStorage.setItem('contactFormData', JSON.stringify(data));
    }

    restoreFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = this.form.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        }
    }

    // Clear saved data after successful submission
    clearSavedData() {
        localStorage.removeItem('contactFormData');
    }

    // File upload handling
    initFileUpload() {
        const fileInput = this.form.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
        }
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showFieldError(event.target, 'File size must be less than 5MB');
                event.target.value = '';
                return;
            }
            
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
            if (!allowedTypes.includes(file.type)) {
                this.showFieldError(event.target, 'Please upload a valid file type (JPEG, PNG, PDF, DOC)');
                event.target.value = '';
                return;
            }
            
            // Show file name
            this.showFileName(event.target, file.name);
        }
    }

    showFileName(input, fileName) {
        let fileDisplay = input.parentNode.querySelector('.file-display');
        if (!fileDisplay) {
            fileDisplay = document.createElement('div');
            fileDisplay.className = 'file-display';
            fileDisplay.style.cssText = `
                margin-top: 0.5rem;
                padding: 0.5rem;
                background: #F7FAFC;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                color: #4A5568;
            `;
            input.parentNode.appendChild(fileDisplay);
        }
        fileDisplay.textContent = `Selected file: ${fileName}`;
    }
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    window.contactFormManager = new ContactFormManager();
});

// ===== UTILITY FUNCTIONS =====

// Format phone number as user types
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => {
            formatPhoneNumber(input);
        });
    });
});

// ===== EXPORT FOR MODULE SYSTEM =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactFormManager;
} 