import { useEffect } from 'react'
import './App.css'

function App() {
  const handleNavClick = (e) => {
    e.preventDefault()
    document.querySelector('.nav-menu').classList.remove('active')
    const toggle = document.querySelector('.nav-toggle')
    toggle.classList.remove('active')
    toggle.setAttribute('aria-expanded', 'false')

    const targetSection = document.querySelector(e.currentTarget.getAttribute('href'))
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleFilterClick = (e) => {
    const filter = e.currentTarget.getAttribute('data-filter')

    document.querySelectorAll('.project-card').forEach(card => {
      const category = card.getAttribute('data-category')
      card.style.display = filter === 'all' || category === filter ? 'block' : 'none'
    })

    document.querySelectorAll('.filter-btn').forEach(button => {
      button.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
  }

  const handleMobileMenuToggle = () => {
    const menuOpen = document.querySelector('.nav-menu').classList.toggle('active')
    const toggle = document.querySelector('.nav-toggle')
    toggle.classList.toggle('active')
    toggle.setAttribute('aria-expanded', String(menuOpen))
  }

  const validateField = (input) => {
    const value = input.value.trim()
    let message = ''

    if (input.id === 'name' && value.length < 2) {
      message = 'Name must be at least 2 characters'
    }
    if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Please enter a valid email address'
    }
    if (input.id === 'message' && value.length < 10) {
      message = 'Message must be at least 10 characters'
    }

    input.parentElement.querySelector('.error-message').textContent = message
    input.classList.toggle('error', message !== '')
    input.classList.toggle('success', message === '')
    return message === ''
  }

  const handleInputChange = (e) => {
    document.querySelector('.success-message').style.display = 'none'
    validateField(e.currentTarget)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const successMessage = form.querySelector('.success-message')
    successMessage.style.display = 'none'

    const nameValid = validateField(form.elements.name)
    const emailValid = validateField(form.elements.email)
    const messageValid = validateField(form.elements.message)

    if (nameValid && emailValid && messageValid) {
      successMessage.style.display = 'block'
      form.reset()
      form.querySelectorAll('.success').forEach(input => {
        input.classList.remove('success')
      })
    }
  }

  const handleScroll = () => {
    const sections = document.querySelectorAll('section')
    const scrollPos = window.scrollY + 100

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active')
        })
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add('active')
        }
      }
    })
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav id="navbar">
          <div className="nav-brand">
              <span>Alex Johnson</span>
          </div>
          <ul className="nav-menu">
              <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
              <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
              <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
              <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
              <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
          </ul>

          <button type="button" className="nav-toggle" aria-label="Toggle menu" aria-expanded="false" onClick={handleMobileMenuToggle}>
              <span></span>
              <span></span>
              <span></span>
          </button>
      </nav>

      <section id="home" className="hero">
          <div className="hero-content">
              <h1 className="hero-title">Alex Johnson</h1>
              <p className="hero-subtitle">Frontend Developer & UI Designer</p>
              <p className="hero-tagline">Creating beautiful, responsive web experiences with modern technologies</p>
              <div className="hero-buttons">
                  <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>View Projects</a>
                  <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>Get In Touch</a>
              </div>
          </div>
      </section>

      <section id="about" className="section">
          <div className="container">
              <h2>About Me</h2>
              <div className="about-grid">
                  <div className="about-text">
                      <p>I'm a passionate frontend developer with 3 years of experience creating engaging digital experiences. I specialize in React, modern CSS, and responsive design patterns that work beautifully across all devices.</p>
                      <div className="about-details">
                          <div className="detail-item">
                              <span className="detail-icon">📍</span>
                              <span>San Francisco, CA</span>
                          </div>
                          <div className="detail-item">
                              <span className="detail-icon">✉️</span>
                              <a href="mailto:alex@example.com">alex@example.com</a>
                          </div>
                          <div className="detail-item">
                              <span className="detail-icon">📱</span>
                              <span>(555) 123-4567</span>
                          </div>
                      </div>
                  </div>
                  <div className="about-availability">
                      <h3>Currently Available For:</h3>
                      <div className="availability-tags">
                          <span className="tag tag-available">Freelance</span>
                          <span className="tag tag-available">Full-Time</span>
                          <span className="tag tag-available">Remote</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section id="skills" className="section section-alt">
          <div className="container">
              <h2>Skills & Technologies</h2>
              <div className="skills-grid">
                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">⚛️</span>
                          <h3 className="skill-name">React</h3>
                      </div>
                      <div className="skill-category">Frontend Framework</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '90%' }}></div>
                      </div>
                      <span className="skill-percentage">90%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🎨</span>
                          <h3 className="skill-name">CSS3</h3>
                      </div>
                      <div className="skill-category">Styling</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '95%' }}></div>
                      </div>
                      <span className="skill-percentage">95%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">📱</span>
                          <h3 className="skill-name">Responsive Design</h3>
                      </div>
                      <div className="skill-category">Design</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '88%' }}></div>
                      </div>
                      <span className="skill-percentage">88%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🚀</span>
                          <h3 className="skill-name">JavaScript</h3>
                      </div>
                      <div className="skill-category">Programming</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '85%' }}></div>
                      </div>
                      <span className="skill-percentage">85%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🎯</span>
                          <h3 className="skill-name">Figma</h3>
                      </div>
                      <div className="skill-category">Design Tools</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '80%' }}></div>
                      </div>
                      <span className="skill-percentage">80%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🌐</span>
                          <h3 className="skill-name">Node.js</h3>
                      </div>
                      <div className="skill-category">Backend</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '75%' }}></div>
                      </div>
                      <span className="skill-percentage">75%</span>
                  </div>
              </div>
          </div>
      </section>

      <section id="projects" className="section">
          <div className="container">
              <h2>Featured Projects</h2>

              <div className="filter-buttons">
                  <button className="filter-btn active" data-filter="all" onClick={handleFilterClick}>All Projects</button>
                  <button className="filter-btn" data-filter="frontend" onClick={handleFilterClick}>Frontend</button>
                  <button className="filter-btn" data-filter="fullstack" onClick={handleFilterClick}>Full-Stack</button>
                  <button className="filter-btn" data-filter="design" onClick={handleFilterClick}>Design</button>
                  <button className="filter-btn" data-filter="webapp" onClick={handleFilterClick}>Web App</button>
              </div>

              <div className="projects-grid">

                  <div className="project-card featured" data-category="fullstack">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/4f46e5/ffffff?text=E-Commerce+App" alt="E-Commerce Platform" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">E-Commerce Platform</h3>
                              <span className="project-category">Full-Stack</span>
                          </div>
                          <p className="project-description">A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.</p>
                          <div className="project-tags">
                              <span className="project-tag">React</span>
                              <span className="project-tag">Node.js</span>
                              <span className="project-tag">MongoDB</span>
                              <span className="project-tag">Stripe</span>
                          </div>
                      </div>
                  </div>

                  <div className="project-card" data-category="frontend">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/059669/ffffff?text=Weather+App" alt="Weather Dashboard" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">Weather Dashboard</h3>
                              <span className="project-category">Frontend</span>
                          </div>
                          <p className="project-description">Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.</p>
                          <div className="project-tags">
                              <span className="project-tag">JavaScript</span>
                              <span className="project-tag">CSS3</span>
                              <span className="project-tag">API</span>
                          </div>
                      </div>
                  </div>

                  <div className="project-card" data-category="webapp">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/dc2626/ffffff?text=Task+Manager" alt="Task Management App" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">Task Management App</h3>
                              <span className="project-category">Web App</span>
                          </div>
                          <p className="project-description">Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.</p>
                          <div className="project-tags">
                              <span className="project-tag">React</span>
                              <span className="project-tag">TypeScript</span>
                              <span className="project-tag">Firebase</span>
                          </div>
                      </div>
                  </div>

                  <div className="project-card" data-category="design">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/7c3aed/ffffff?text=Portfolio+Site" alt="Portfolio Website" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">Creative Portfolio</h3>
                              <span className="project-category">Design</span>
                          </div>
                          <p className="project-description">Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.</p>
                          <div className="project-tags">
                              <span className="project-tag">HTML5</span>
                              <span className="project-tag">CSS3</span>
                              <span className="project-tag">GSAP</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section id="contact" className="section section-alt">
          <div className="container">
              <h2>Get In Touch</h2>
              <div className="contact-content">
                  <p>I'm always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

                  <form id="contact-form" className="contact-form" noValidate onSubmit={handleFormSubmit}>
                      <div className="form-grid">
                          <div className="form-group">
                              <label htmlFor="name">Name *</label>
                              <input type="text" id="name" name="name" required onChange={handleInputChange} />
                              <span className="error-message" aria-live="polite"></span>

                          </div>

                          <div className="form-group">
                              <label htmlFor="email">Email *</label>
                              <input type="email" id="email" name="email" required onChange={handleInputChange} />
                              <span className="error-message" aria-live="polite"></span>

                          </div>

                          <div className="form-group form-group-full">
                              <label htmlFor="subject">Subject</label>
                              <input type="text" id="subject" name="subject" />
                          </div>

                          <div className="form-group form-group-full">
                              <label htmlFor="message">Message *</label>
                              <textarea id="message" name="message" rows="5" required onChange={handleInputChange}></textarea>
                              <span className="error-message" aria-live="polite"></span>

                          </div>

                          <div className="form-group form-group-full">
                              <button type="submit" className="btn btn-primary">Send Message</button>
                          </div>
                      </div>

                      <div className="success-message" role="status" style={{ display: 'none' }}>Thank you! Your form is complete.</div>
                  </form>
              </div>
          </div>
      </section>

      <footer className="footer">
          <div className="container">
              <div className="footer-content">
                  <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
                  <div className="social-links">
                      <a href="#" className="social-link">GitHub</a>
                      <a href="#" className="social-link">LinkedIn</a>
                      <a href="#" className="social-link">Twitter</a>
                      <a href="#" className="social-link">Dribbble</a>
                  </div>
              </div>
          </div>
      </footer>
    </>
  )
}

export default App
