// ===== PORTFOLIO INTERACTIVE SCRIPT =====

// ===== INTERACTIVE TERMINAL CLASS =====
class InteractiveTerminal {
    constructor() {
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            whoami: this.showWhoami.bind(this),
            skills: this.showSkills.bind(this),
            projects: this.showProjects.bind(this),
            experience: this.showExperience.bind(this),
            education: this.showEducation.bind(this),
            contact: this.showContact.bind(this),
            ls: this.listFiles.bind(this),
            cat: this.catFile.bind(this),
            clear: this.clearTerminal.bind(this),
            date: this.showDate.bind(this),
            pwd: this.showPwd.bind(this),
            echo: this.echo.bind(this),
            matrix: this.matrixEffect.bind(this),
            joke: this.showJoke.bind(this),
            quote: this.showQuote.bind(this),
            github: this.openGithub.bind(this),
            linkedin: this.openLinkedin.bind(this),
            resume: this.downloadResume.bind(this),
            ping: this.ping.bind(this)
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.init();
    }

    init() {
        this.input = document.getElementById('terminal-input');
        this.history = document.getElementById('terminal-history');
        this.body = document.getElementById('terminal-body');
        
        if (this.input) {
            this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
            this.input.addEventListener('input', this.handleInput.bind(this));
            this.input.focus();
        }

        // Focus terminal input when clicking anywhere on terminal
        if (this.body) {
            this.body.addEventListener('click', () => {
                if (this.input) this.input.focus();
            });
        }
    }

    handleKeyDown(e) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                e.preventDefault();
                this.autoComplete();
                break;
        }
    }

    handleInput(e) {
        // Update cursor position
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.left = (this.input.value.length * 0.6) + 'rem';
        }
    }

    executeCommand() {
        const input = this.input.value.trim();
        if (!input) return;

        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;

        // Display command
        this.addToHistory(`<div class="command-line"><span class="prompt">nitish@portfolio:~$</span> ${input}</div>`);

        // Parse and execute command
        const [command, ...args] = input.split(' ');
        const cmd = command.toLowerCase();

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addToHistory(`<div class="command-output error">Command '${command}' not found. Type 'help' for available commands.</div>`);
        }

        // Clear input
        this.input.value = '';
        this.scrollToBottom();
    }

    addToHistory(html) {
        if (this.history) {
            this.history.innerHTML += html;
        }
    }

    scrollToBottom() {
        if (this.body) {
            this.body.scrollTop = this.body.scrollHeight;
        }
    }

    navigateHistory(direction) {
        if (direction === -1 && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 1 && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 1 && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        }
    }

    autoComplete() {
        const input = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addToHistory(`<div class="command-output info">Available commands: ${matches.join(', ')}</div>`);
            this.scrollToBottom();
        }
    }

    // ===== COMMAND IMPLEMENTATIONS =====
    showHelp() {
        const helpText = `
            <div class="command-output info">
                <strong>Available Commands:</strong><br>
                <div style="margin-top: 0.5rem;">
                    <strong>Personal:</strong><br>
                    • whoami - Display user information<br>
                    • about - Learn more about me<br>
                    • skills - View technical skills<br>
                    • projects - Show my projects<br>
                    • experience - Work experience<br>
                    • education - Educational background<br>
                    • contact - Contact information<br><br>
                    
                    <strong>System:</strong><br>
                    • ls - List directory contents<br>
                    • cat [file] - Display file contents<br>
                    • pwd - Print working directory<br>
                    • date - Show current date<br>
                    • clear - Clear terminal<br>
                    • echo [text] - Display text<br><br>
                    
                    <strong>Fun:</strong><br>
                    • matrix - Enter the Matrix<br>
                    • joke - Random programming joke<br>
                    • quote - Inspirational quote<br>
                    • ping - Test connection<br><br>
                    
                    <strong>Links:</strong><br>
                    • github - Open GitHub profile<br>
                    • linkedin - Open LinkedIn profile<br>
                    • resume - Download resume<br><br>
                    
                    <em>Use Tab for auto-completion and ↑/↓ for command history</em>
                </div>
            </div>
        `;
        this.addToHistory(helpText);
    }

    showWhoami() {
        const whoamiText = `
            <div class="command-output success">
                <strong>Nitish Kumar Sarma</strong><br>
                Role: Full-Stack Developer & Frontend Specialist<br>
                Location: Bangalore, Karnataka<br>
                Passion: Building innovative web applications and exploring new technologies
            </div>
        `;
        this.addToHistory(whoamiText);
    }

    showAbout() {
        const aboutText = `
            <div class="command-output">
                <strong>About Me:</strong><br><br>
                🚀 Passionate full-stack developer with expertise in modern web technologies<br>
                💼 On September 2025 Completed an internship as Associate Software Engineer at Sysfore Technologies<br>
                🎓 Completed Master's in Computer Science from Kristu Jayanti College<br>
                🔧 Specialized in Microsoft Power Platform and web development<br>
                🌟 Always eager to learn new technologies and solve complex problems<br><br>
                
                <strong>Interests:</strong><br>
                • Web Application Development<br>
                • IoT & Embedded Systems<br>
                • Cybersecurity<br>
                • UI/UX Design<br>
                • Open Source Contributions
            </div>
        `;
        this.addToHistory(aboutText);
    }

    showSkills() {
        const skillsText = `
            <div class="command-output">
                <strong>Technical Skills:</strong><br>
                <div class="skill-display">
                    <div class="skill-item-terminal">
                        <strong>Frontend:</strong><br>
                        • JavaScript<br>
                        • React<br>
                        • HTML/CSS<br>
                        • Responsive Design
                    </div>
                    <div class="skill-item-terminal">
                        <strong>Backend:</strong><br>
                        • Python<br>
                        • Flask<br>
                        • SQLite<br>
                        • MySQL
                    </div>
                    <div class="skill-item-terminal">
                        <strong>Platform:</strong><br>
                        • Power Platform<br>
                        • Dataverse<br>
                        • Power Automate<br>
                        • Power Pages
                    </div>
                    <div class="skill-item-terminal">
                        <strong>Tools:</strong><br>
                        • Git & GitHub<br>
                        • Postman<br>
                        • Linux<br>
                        • VS Code
                    </div>
                </div>
            </div>
        `;
        this.addToHistory(skillsText);
    }

    showProjects() {
        const projectsText = `
            <div class="command-output">
                <strong>Featured Projects:</strong><br>
                <div class="project-list">
                    <div class="project-item">
                        <strong>🏥 HealthAnalyzer Pro</strong><br>
                        Intelligent health monitoring system with real-time risk assessment<br>
                        <em>Tech: Flask, SQLite, JavaScript, HTML/CSS</em><br>
                        <a href="https://github.com/Nitishsarma45678/healthanalyzer-pro" target="_blank">GitHub →</a>
                    </div>
                    <div class="project-item">
                        <strong>🛰️ Project Polaris</strong><br>
                        Battery-powered embedded system with custom touchscreen UI<br>
                        <em>Tech: ESP8266, C/C++, TFT Display, IoT</em><br>
                        <a href="https://github.com/Nitishsarma45678/Project-Polaris" target="_blank">GitHub →</a>
                    </div>
                    <div class="project-item">
                        <strong>🔒 HIDS Security System</strong><br>
                        Real-time network intrusion detection with packet analysis<br>
                        <em>Tech: Python, Scapy, Flask, Cybersecurity</em><br>
                        <a href="https://github.com/Nitishsarma45678/HostAware-Intrusion-Detection-System" target="_blank">GitHub →</a>
                    </div>
                </div>
                <em>Use 'cat project_name' for detailed information about specific projects</em>
            </div>
        `;
        this.addToHistory(projectsText);
    }

    showExperience() {
        const experienceText = `
            <div class="command-output">
                <strong>Work Experience:</strong><br><br>
                <div class="project-item">
                    <strong>Associate Software Engineer, Trainee</strong><br>
                    <em>Sysfore Technologies Pvt. Ltd. | April 2025 - Sept 2025</em><br><br>
                    
                    • Developed end-to-end solutions across Power Platform ecosystem<br>
                    • Designed and optimized Dataverse data models and business rules<br>
                    • Automated approval workflows using Power Automate<br>
                    • Contributed to requirement analysis and solution delivery
                </div>
            </div>
        `;
        this.addToHistory(experienceText);
    }

    showEducation() {
        const educationText = `
            <div class="command-output">
                <strong>Education:</strong><br><br>
                <div class="project-item">
                    <strong>Master of Computer Science</strong><br>
                    <em>Kristu Jayanti College, Bangalore | 2023 - 2025</em><br>
                   
                </div>
                <div class="project-item">
                    <strong>Bachelor of Computer Application</strong><br>
                    <em>Assam Downtown University, Guwahati | 2020 - 2023</em><br>
                    Specialization: Cloud Technology and Information Security
                </div>
            </div>
        `;
        this.addToHistory(educationText);
    }

    showContact() {
        const contactText = `
            <div class="command-output success">
                <strong>Contact Information:</strong><br><br>
                📧 Email: nitishsarma8@gmail.com<br>
                📱 Phone: +91 9365627698<br>
                📍 Location: Bangalore, Karnataka<br>
                💼 LinkedIn: <a href="https://www.linkedin.com/in/himjyoti-talukdar-21411222b/" target="_blank">Connect with me</a><br>
                🐙 GitHub: <a href="https://github.com/Nitishsarma45678" target="_blank">Check out my code</a><br>
                🌐 Portfolio: <a href="https://h1mzy0ti.github.io/himzyoti-portfolio/" target="_blank">View my work</a>
            </div>
        `;
        this.addToHistory(contactText);
    }

    listFiles() {
        const lsText = `
            <div class="command-output">
                drwxr-xr-x  2 nitish nitish 4096 Sep 20 20:30 <span style="color: #06b6d4;">projects/</span><br>
                drwxr-xr-x  2 nitish nitish 4096 Sep 20 20:30 <span style="color: #06b6d4;">skills/</span><br>
                -rw-r--r--  1 nitish nitish 2048 Sep 20 20:30 about.txt<br>
                -rw-r--r--  1 nitish nitish 1024 Sep 20 20:30 resume.pdf<br>
                -rw-r--r--  1 nitish nitish  512 Sep 20 20:30 contact.txt<br>
                -rw-r--r--  1 nitish nitish  256 Sep 20 20:30 experience.txt
            </div>
        `;
        this.addToHistory(lsText);
    }

    catFile(args) {
        if (args.length === 0) {
            this.addToHistory('<div class="command-output error">Usage: cat [filename]</div>');
            return;
        }

        const filename = args[0].toLowerCase();
        const files = {
            'about.txt': this.showAbout.bind(this),
            'contact.txt': this.showContact.bind(this),
            'experience.txt': this.showExperience.bind(this),
            'resume.pdf': () => this.addToHistory('<div class="command-output error">Cannot display binary file. Use "resume" command to download.</div>')
        };

        if (files[filename]) {
            files[filename]();
        } else {
            this.addToHistory(`<div class="command-output error">cat: ${filename}: No such file or directory</div>`);
        }
    }

    clearTerminal() {
        if (this.history) {
            this.history.innerHTML = '';
        }
    }

    showDate() {
        const date = new Date().toLocaleString();
        this.addToHistory(`<div class="command-output">${date}</div>`);
    }

    showPwd() {
        this.addToHistory('<div class="command-output">/home/nitish/portfolio</div>');
    }

    echo(args) {
        const text = args.join(' ');
        this.addToHistory(`<div class="command-output">${text}</div>`);
    }

    matrixEffect() {
        this.addToHistory('<div class="command-output success">Entering the Matrix... 🕶️</div>');
        setTimeout(() => {
            this.addToHistory('<div class="command-output">Welcome to the real world, Neo.</div>');
            this.scrollToBottom();
        }, 2000);
    }

    showJoke() {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they can't C#! 👓",
            "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
            "Why did the programmer quit his job? He didn't get arrays! 📊"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        this.addToHistory(`<div class="command-output success">${randomJoke}</div>`);
    }

    showQuote() {
        const quotes = [
            "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
            "\"First, solve the problem. Then, write the code.\" - John Johnson",
            "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
            "\"Simplicity is the soul of efficiency.\" - Austin Freeman",
            "\"Make it work, make it right, make it fast.\" - Kent Beck"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.addToHistory(`<div class="command-output info">${randomQuote}</div>`);
    }

    openGithub() {
        window.open('https://github.com/Nitishsarma45678', '_blank');
        this.addToHistory('<div class="command-output success">Opening GitHub profile... 🐙</div>');
    }

    openLinkedin() {
        window.open('https://www.linkedin.com/in/himjyoti-talukdar-21411222b/', '_blank');
        this.addToHistory('<div class="command-output success">Opening LinkedIn profile... 💼</div>');
    }

    downloadResume() {
        this.addToHistory('<div class="command-output info">Resume download would start here... 📄</div>');
        // You can implement actual resume download here
    }

    ping() {
        this.addToHistory('<div class="command-output">PING portfolio.nitish.dev (127.0.0.1): 56 bytes</div>');
        setTimeout(() => {
            this.addToHistory('<div class="command-output success">64 bytes from 127.0.0.1: icmp_seq=0 time=1.337ms ⚡</div>');
            this.scrollToBottom();
        }, 500);
    }
}

// ===== PORTFOLIO ANIMATOR CLASS =====
class PortfolioAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupParticles();
        this.setupNavigation();
        this.setupContactForm();
        this.setupThemeToggle();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.showLoadingAnimation();
            setTimeout(() => this.hideLoadingAnimation(), 2000);
        });

        // Window Events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        
        // Navigation
        this.setupMobileMenu();
        
        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Project Card Interactions
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleProjectHover.bind(this));
            card.addEventListener('mouseleave', this.handleProjectLeave.bind(this));
        });

        // Easter Eggs
        this.setupEasterEggs();
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('skill-category')) {
                        this.animateSkillBars(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observe elements
        document.querySelectorAll('.glass-effect, .project-card, .skill-category, .stat-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            this.observer.observe(el);
        });
    }

    // ===== SKILL BARS ANIMATION =====
    setupSkillBars() {
        this.skillBarsAnimated = false;
    }

    animateSkillBars(container) {
        if (this.skillBarsAnimated) return;
        
        const skillBars = container.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 200);
        });
        
        this.skillBarsAnimated = true;
    }

    // ===== COUNTER ANIMATION =====
    animateCounter(card) {
        const numberElement = card.querySelector('.stat-number');
        const targetNumber = parseInt(numberElement.textContent);
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                numberElement.textContent = targetNumber + '+';
                clearInterval(counter);
            } else {
                numberElement.textContent = Math.floor(currentNumber);
            }
        }, stepTime);
    }

    // ===== PARTICLE SYSTEM =====
    setupParticles() {
        this.createFloatingParticles();
    }

    createFloatingParticles() {
        const particleContainer = document.querySelector('.floating-shapes');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer);
            }, i * 200);
        }
    }

    createParticle(container) {
        if (!container) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 20 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 30000);
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        // Active navigation highlighting
        window.addEventListener('scroll', this.throttle(this.updateActiveNavigation.bind(this), 100));
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // ===== PROJECT INTERACTIONS =====
    handleProjectHover(e) {
        const card = e.currentTarget;
        
        // Create ripple effect
        this.createRippleEffect(card, e);
        
        // Add subtle rotation
        card.style.transform = 'rotateY(5deg) rotateX(5deg)';
    }

    handleProjectLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = 50;
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // ===== CONTACT FORM =====
    setupContactForm() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', this.handleContactSubmit.bind(this));
            
            // Form field animations
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const label = group.querySelector('label');
                
                if (input && label) {
                    input.addEventListener('focus', () => {
                        group.classList.add('focused');
                    });
                    
                    input.addEventListener('blur', () => {
                        if (!input.value) {
                            group.classList.remove('focused');
                        }
                    });
                }
            });
        }
    }



// 2. Replace your handleContactSubmit with this:
handleContactSubmit(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(e.target);
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'nitishsarma8@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send('service_f6lpqtq', 'template_rzbk1b9', templateParams, 'F8MC0tEP4xFgvA2m1')
        .then(() => {
            this.showNotification('Message sent successfully! 🚀', 'success');
            e.target.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--glass-shadow);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // ===== THEME TOGGLE =====
    setupThemeToggle() {
        // Add theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(10px);
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const themeToggle = document.querySelector('.theme-toggle i');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggle.className = 'fas fa-sun';
        } else {
            themeToggle.className = 'fas fa-moon';
        }
    }

    // ===== EASTER EGGS =====
    setupEasterEggs() {
        // Konami Code Easter Egg
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.triggerEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Double-click logo easter egg
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.addEventListener('dblclick', this.triggerMatrixEffect.bind(this));
        }
    }

    triggerEasterEgg() {
        this.showNotification('🎉 Konami Code activated! You found the secret! 🚀', 'success');
        
        // Add rainbow animation to page
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    triggerMatrixEffect() {
        // Create matrix rain effect
        const matrix = document.createElement('div');
        matrix.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(matrix);
        
        // Matrix animation logic here (simplified)
        this.showNotification('Welcome to the Matrix! 🕶️', 'success');
        
        setTimeout(() => {
            matrix.remove();
        }, 3000);
    }

    // ===== UTILITY FUNCTIONS =====
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        // Navbar background opacity
        if (navbar) {
            if (scrollY > 100) {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            } else {
                navbar.style.background = 'rgba(15, 15, 35, 0.9)';
            }
        }

        // Parallax effect for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const heroContainer = document.querySelector('.hero-container');
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 768 && heroContainer) {
            heroContainer.style.gridTemplateColumns = '1fr';
        } else if (heroContainer) {
            heroContainer.style.gridTemplateColumns = '1fr 1fr';
        }
    }

    showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">NS</div>
                <div class="loader-text">Loading Portfolio...</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: var(--text-primary);
        `;
        
        document.body.appendChild(loader);
    }

    hideLoadingAnimation() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }
}

// ===== ADDITIONAL CSS ANIMATIONS (to be added to CSS) =====
const additionalStyles = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

@keyframes particleFloat {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

.loader-content {
    text-align: center;
}

.loader-logo {
    font-size: 4rem;
    font-weight: 700;
    font-family: var(--font-mono);
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    animation: pulse 1.5s infinite;
}

.loader-text {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--text-secondary);
}

.loader-bar {
    width: 300px;
    height: 4px;
    background: var(--bg-secondary);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
}

.loader-progress {
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
    animation: loading 2s ease-in-out infinite;
}

@keyframes loading {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
}

/* Mobile navigation styles */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: rgba(15, 15, 35, 0.95);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        backdrop-filter: blur(10px);
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
}
`;

// Add additional styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize both classes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimator();
    new InteractiveTerminal();
});

// Add some fun cursor effects
document.addEventListener('mousemove', (e) => {
    // Create trailing particles on mouse move (optional)
    if (Math.random() < 0.1) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeOut 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}
`;
document.head.appendChild(fadeOutStyle);


// ===== SELF-WRITING LOGO CLASS =====
class SelfWritingLogo {
    constructor() {
        this.element = document.getElementById('typing-command');
        this.commands = ['nitish', 'developer', 'whoami', 'ls projects/', 'git status', 'npm start', 'nitish.dev'];
        this.currentCommandIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.typeSpeed = 120; // Typing speed
        this.deleteSpeed = 80; // Deletion speed
        this.pauseTime = 2500; // Pause before deleting
        
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentCommand = this.commands[this.currentCommandIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.currentText = currentCommand.substring(0, this.currentText.length - 1);
        } else {
            // Adding characters
            this.currentText = currentCommand.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let typeDelay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        // Add realistic typing variations
        if (Math.random() < 0.1) {
            typeDelay += Math.random() * 200; // Occasional pauses (thinking)
        }
        
        if (!this.isDeleting && this.currentText === currentCommand) {
            // Finished typing, wait then start deleting
            typeDelay = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            // Finished deleting, move to next command
            this.isDeleting = false;
            this.currentCommandIndex = (this.currentCommandIndex + 1) % this.commands.length;
            typeDelay = 300; // Short pause before starting next word
        }
        
        setTimeout(() => this.type(), typeDelay);
    }
}

// Initialize the self-writing logo
document.addEventListener('DOMContentLoaded', () => {
    new SelfWritingLogo();
});
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
// ===== MOBILE MENU HANDLER (FIXED) =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu on window resize (when switching back to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});
