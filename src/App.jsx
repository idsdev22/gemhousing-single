import { useState, useEffect } from 'react'

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [projectTab, setProjectTab] = useState('villa')
  const [galleryTab, setGalleryTab] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTabChanged, setActiveTabChanged] = useState(false)
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [floorPlanTab, setFloorPlanTab] = useState('2bhk')
  const [activeFaq, setActiveFaq] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    verified: false
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Hero slideshow assets
  const heroSlides = [
    {
      image: '/assets/banner.png',
      title: 'GemHousing Lavender',
      desc: 'Exclusive 4 BHK villas & premium 3 BHK apartments crafted for elevated living in Kalapatti, Coimbatore.'
    },
    {
      image: '/assets/banner1.png',
      title: 'Modern Architecture & Sophistication',
      desc: 'Experience modern layouts, Vastu-compliant homes, and curated lifestyle amenities in a secure community.'
    }
  ]

  // Reasons list
  const reasons = [
    { title: 'Gated Community', desc: 'Thoughtfully gated community' },
    { title: 'Layouts', desc: 'Spacious and well-designed layouts' },
    { title: 'Amenities', desc: 'Curated signature amenities' },
    { title: 'Location', desc: 'Prime and strategic location' },
    { title: 'Vastu', desc: 'Vastu-compliant homes' },
    { title: 'Neighbourhood', desc: 'Rapidly developing residential' }
  ]

  // Amenities list
  const amenities = [
    { title: 'Rooftop Pool', image: '/assets/pool-D2aNHb1U.png', className: 'large' },
    { title: 'Fitness Center', image: '/assets/gym-DVR60enG.png', className: 'small' },
    { title: 'Club House', image: '/assets/club-BuFzdcAI.png', className: 'small' },
    { title: 'Indoor Play Area', image: '/assets/play-area-BQSrg8Sh.jpg', className: 'small' },
    { title: 'Multipurpose Hall', image: '/assets/hall-ccpy3vJP.jpg', className: 'small' }
  ]

  // Gallery slides
  const gallerySlides = [
    { title: 'Elegant Exteriors', image: '/assets/sli1-CNQi7nfa.png', tag: 'Exterior' },
    { title: 'Lush Green Landscaping', image: '/assets/slid2-BtdDQ3nF.jpg', tag: 'Landscape' },
    { title: 'Modern Living Spaces', image: '/assets/slid3-BI0P2p4_.jpg', tag: 'Interior' },
    { title: 'Luxury Villa Renderings', image: '/assets/slid4-BrpPGWgx.png', tag: 'Render' },
    { title: 'Premium Apartment Renderings', image: '/assets/slid5-BuBLXT6T.png', tag: 'Render' },
    { title: 'Clubhouse Elevations', image: '/assets/slid6-Bh2Lq1Ra.png', tag: 'Clubhouse' },
    { title: 'Walkways & Parks', image: '/assets/slid7-DT7ytL2u.png', tag: 'Park' },
    { title: 'Spacious Bedrooms', image: '/assets/slid8-DcASU5si.png', tag: 'Interior' },
    { title: 'Sophisticated Kitchens', image: '/assets/slid9-B7NULodB.png', tag: 'Interior' }
  ]

  // Floor Plans Data
  const floorPlansData = {
    '2bhk': [
      { id: 1, name: 'Flat_B_Flat 1', image: '/assets/floor1.png' },
      { id: 2, name: 'Flat_B_Flat 2', image: '/assets/floor2.png' },
      { id: 3, name: 'Flat_B_Flat 3', image: '/assets/floor3.png' },
      { id: 4, name: 'Flat_B_Flat 4', image: '/assets/floor4.png' },
      { id: 5, name: 'Flat_B_Flat 5', image: '/assets/floor5.png' }
    ],
    '3bhk': [
      { id: 6, name: 'Flat_A_Flat 1', image: '/assets/slid15-BlQHCAP2.png' },
      { id: 7, name: 'Flat_A_Flat 2', image: '/assets/slid10-ua_ienhq.png' },
      { id: 8, name: 'Flat_A_Flat 3', image: '/assets/slid11-DhJDMzLd.png' }
    ]
  }


  // Video Gallery Data
  const videosData = [
    {
      title: 'Luxury Villa Tour',
      category: 'Walkthrough',
      duration: '01:45',
      image: '/assets/slid4-BrpPGWgx.png',
      youtubeId: '7X8mFp7nS5I',
      desc: 'Step inside the spacious 4 BHK luxury villas, showcasing premium architectural excellence and layouts.'
    },
    {
      title: 'Apartments Showcase',
      category: 'Virtual Tour',
      duration: '02:15',
      image: '/assets/slid5-BuBLXT6T.png',
      youtubeId: 'JmD8rBv866c',
      desc: 'Explore the beautifully crafted 3 BHK apartments, offering a blend of modern luxury and spaciousness.'
    },
    {
      title: 'Rooftop Pool & Fitness',
      category: 'Amenities',
      duration: '00:45',
      image: '/assets/pool-D2aNHb1U.png',
      youtubeId: 'y9j-LD4R-5Y',
      desc: 'A glance at our signature amenities, featuring the rooftop pool, modern gym, and clubhouse.'
    },
    {
      title: 'Aerial View & Kalapatti',
      category: 'Neighborhood',
      duration: '01:05',
      image: '/assets/slid2-BtdDQ3nF.jpg',
      youtubeId: 'eG8YQJ1rI30',
      desc: 'Drone footage showcasing the strategic connectivity, IT parks, and surroundings of GemHousing Lavender.'
    },
    {
      title: 'Lobby & Club Lounge',
      category: 'Walkthrough',
      duration: '00:50',
      image: '/assets/slid6-Bh2Lq1Ra.png',
      youtubeId: '7X8mFp7nS5I',
      desc: 'Discover the elegant double-height entrance lobby, multipurpose hall, and guest waiting lounges.'
    },
    {
      title: 'Kitchen & Dining Spaces',
      category: 'Interior',
      duration: '01:12',
      image: '/assets/slid9-B7NULodB.png',
      youtubeId: 'y9j-LD4R-5Y',
      desc: 'Take a close look at our Vastu-compliant kitchen layouts, premium finishes, and utility areas.'
    }
  ]

  // Location Highlights Category data
  const locationCategories = [
    {
      title: 'Schools',
      places: [
        'Anan International School • 1 Km',
        'The NGP Schools • 1.5 Km',
        'CMIS International school • 2 Km'
      ]
    },
    {
      title: 'Education',
      places: [
        'NGP Institutions • 1.5 Km',
        'SNS College • 5 Km',
        'CIT College • 7 Km'
      ]
    },
    {
      title: 'Healthcare',
      places: [
        'Lotus Eye • 4.5 Km',
        'KMCH Hospital • 5.4 Km',
        'Kumaran Hospital• 6 Km'
      ]
    },
    {
      title: 'Lifestyle',
      places: [
        'Prozone Mall • 6.8 Km',
        'LuLu Mall • 10 Km'
      ]
    },
    {
      title: 'Connectivity',
      places: [
        'Airport • 5.5 Km',
        'Railway Junction • 14 Km'
      ]
    },
    {
      title: 'IT Parks',
      places: [
        'Global Tech Park • 3 Km',
        'SVB Tech park • 3.5 Km'
      ]
    }
  ]

  // FAQ Data
  const faqs = [
    {
      question: "What is the location of GemHousing Lavender?",
      answer: "GemHousing Lavender is strategically located behind NGP Institutions in Kalapatti, Coimbatore, offering excellent connectivity to IT parks, schools, hospitals, and the airport."
    },
    {
      question: "What types of properties are available?",
      answer: "We offer exclusively designed 4 BHK luxury villas and premium 3 BHK apartments tailored for modern living."
    },
    {
      question: "Is the project RERA approved?",
      answer: "Yes, GemHousing Lavender is fully RERA approved (TN/11/Building/0121/2025), ensuring complete transparency and compliance."
    },
    {
      question: "What amenities are provided?",
      answer: "Residents can enjoy premium amenities including a rooftop swimming pool, modern fitness center, clubhouse, indoor play area, and a multipurpose hall."
    },
    {
      question: "Are the homes Vastu-compliant?",
      answer: "Yes, all our villas and apartments are meticulously designed to be 100% Vastu-compliant for your peace of mind and prosperity."
    }
  ]

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // Handle Scroll to shrink navbar and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hook for animating project tab changes
  useEffect(() => {
    setActiveTabChanged(true)
    const timer = setTimeout(() => setActiveTabChanged(false), 300)
    return () => clearTimeout(timer)
  }, [projectTab])

  // Scroll Reveal Observer Effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Auto-play Hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Form Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, '').slice(-10))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.verified) {
      newErrors.verified = 'Please check the box to confirm you are human'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    // Mock API request
    setTimeout(() => {
      setSubmitting(false)
      setSuccessMsg('Enquiry submitted successfully! Redirecting...')
      // Redirect after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/thankyou.html'
      }, 1500)
    }, 1500)
  }

  return (
    <>
      {/* Page Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation Header */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <a href="#home">
              <img src="/assets/gemhousing_logo.png" alt="GemHousing Logo" />
            </a>
          </div>

          <ul className={`nav-links ${mobileNavOpen ? 'active' : ''}`}>
            <li onClick={() => setMobileNavOpen(false)}><a href="#home">Home</a></li>
            <li onClick={() => setMobileNavOpen(false)}><a href="#overview">Overview</a></li>
            <li onClick={() => setMobileNavOpen(false)}><a href="#pricing">Pricing</a></li>
            <li onClick={() => setMobileNavOpen(false)}><a href="#projects">Projects</a></li>
            <li onClick={() => setMobileNavOpen(false)}><a href="#amenities">Amenities</a></li>
            <li onClick={() => setMobileNavOpen(false)}><a href="#gallery">Gallery</a></li>
            <li onClick={() => setMobileNavOpen(false)}><a href="#location">Location</a></li>
          </ul>

          <div className="cta">
            <button onClick={() => setShowPopup(true)}>Enquire Now</button>
          </div>

          <div className={`hamburger ${mobileNavOpen ? 'open' : ''}`} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className={`slide ${idx === heroIndex ? 'active' : ''}`}>
              <picture>
                <img src={slide.image} alt={slide.title} />
              </picture>
              <div className="overlay"></div>
              {slide.title && (
                <div className="content">
                  <h1>{slide.title}</h1>
                  <p>{slide.desc}</p>
                  <button
                    type="button"
                    className="hero-btn"
                    onClick={() => setShowPopup(true)}
                  >
                    Book a site visit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Overview/About Section */}
      <section id="overview" className="about">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-images-collage reveal-left">
              <div className="image-primary">
                <img src="/assets/about1-DQqXreQn.jpg" alt="Lavender Property Gate View" />
              </div>
              <div className="image-secondary">
                <img src="/assets/about2-x5riPgpI.jpg" alt="Lavender Villa Elevation" />
              </div>
            </div>

            <div className="about-content reveal-right">
              <span className="tag">Overview</span>
              <h2>Welcome to GemHousing Lavender</h2>
              <div className="classic-divider" style={{ margin: '15px 0' }}></div>
              <p>Located right behind NGP Institutions in Kalapatti, the project brings together spacious homes, modern amenities, and strong connectivity to IT parks, schools, hospitals, shopping destinations, and Coimbatore Airport, making it ideal for families seeking comfort, convenience, and an elevated lifestyle.</p>
              <p>Designed for contemporary living, GemHousing Lavender features well-planned layouts, curated lifestyle amenities, and a prime setting in one of Coimbatore’s fast-growing residential neighbourhoods.</p>
              <ul>
                <li>Premium gated community</li>
                <li>Luxury villas & modern flats</li>
                <li>Prime emerging location</li>
                <li>Perfect blend of comfort & class</li>
              </ul>
              <button onClick={() => setShowPopup(true)}>Download Brochure</button>
            </div>
          </div>
        </div>
      </section>

      {/* Price Strip Section */}
      <section id="pricing" className="price-strip reveal">
        <div className="price-card">
          <div className="top">
            <h2>3 BHK Apartments</h2>
            <div className="classic-divider" style={{ margin: '8px auto', width: '50px' }}></div>
            <p>1800 - 2200 <span>SQ.FT.</span></p>
          </div>
          <div className="price">₹1.54 Cr</div>
          <span className="onwards">ONWARDS</span>
        </div>

        <div className="divider"></div>

        <div className="price-card">
          <div className="top">
            <h2>4 BHK Villas</h2>
            <div className="classic-divider" style={{ margin: '8px auto', width: '50px' }}></div>
            <p>3903 - 4236 <span>SQ.FT.</span></p>
          </div>
          <div className="price">₹5 Cr</div>
          <span className="onwards">ONWARDS</span>
        </div>
      </section>

      {/* Reasons to Choose Section */}
      <section className="reasons">
        <div className="container">
          <h2 className="reveal">Top Reasons to Choose Lavender</h2>
          <div className="classic-divider reveal"></div>

          <div className="reasons-grid">
            {reasons.map((item, idx) => (
              <div key={idx} className="reason-card reveal">
                <span className="number">0{idx + 1}</span>
                <div className="content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Display Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title reveal">Project Options</h2>
          <div className="classic-divider reveal" style={{ marginBottom: '30px' }}></div>

          <div className="project-tabs reveal">
            <button
              className={projectTab === 'villa' ? 'active' : ''}
              onClick={() => setProjectTab('villa')}
            >
              Villas
            </button>
            <button
              className={projectTab === 'apartment' ? 'active' : ''}
              onClick={() => setProjectTab('apartment')}
            >
              Apartments
            </button>
          </div>

          <div className={`project-content ${activeTabChanged ? 'tab-transitioning' : ''}`}>
            <div className="project-image reveal-left">
              <img
                src={projectTab === 'villa' ? '/assets/project-villas-BVLO2Utk.jpg' : '/assets/project-appartment-BGY5JSXG.jpg'}
                alt={projectTab === 'villa' ? 'Lavender Luxury Villa' : 'Lavender Premium Apartment'}
              />
            </div>

            <div className="project-info reveal-right">
              {projectTab === 'villa' ? (
                <>
                  <h3>Lavender Villas</h3>
                  <div className="classic-divider" style={{ margin: '15px 0', width: '80px' }}></div>
                  <p>Elegantly designed 4 BHK villas with expansive layouts for a lifestyle of comfort and sophistication. Step into exclusive villas designed for those who seek expansive living, privacy, and an elevated lifestyle in a well-connected neighbourhood.</p>
                  <p>With generous layouts, elegant planning, and premium community features, Greenfield Lavender Villas offer the perfect setting for modern families looking for independent luxury living in Kalapatti.</p>
                  <div className="stats">
                    <p>17 Villas</p>
                    <p>4 BHK</p>
                    <p>4236 Sq.ft</p>
                    <p>RERA Approved</p>
                  </div>
                </>
              ) : (
                <>
                  <h3>Lavender Apartments</h3>
                  <div className="classic-divider" style={{ margin: '15px 0', width: '80px' }}></div>
                  <p>Thoughtfully crafted apartments offering the perfect blend of luxury and space. Discover elegantly planned 3 BHK apartments crafted for families who value spacious interiors, refined finishes, and the convenience of urban connectivity.</p>
                  <p>Every apartment is designed to balance comfort and functionality, with well-ventilated living spaces, smart layouts, and a premium gated community experience in Kalapatti.</p>
                  <div className="stats">
                    <p>35 Apartments</p>
                    <p>3 BHK</p>
                    <p>1800 - 2200 Sq.ft</p>
                    <p>RERA Approved</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="floor-plans" className="floor-plans">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="reveal">Floor Plans</h2>
          </div>

          <div className="floor-plan-tabs reveal">
            <button
              className={`fp-btn ${floorPlanTab === '2bhk' ? 'active' : ''}`}
              onClick={() => setFloorPlanTab('2bhk')}
            >
              2 BHK
            </button>
            <button
              className={`fp-btn ${floorPlanTab === '3bhk' ? 'active' : ''}`}
              onClick={() => setFloorPlanTab('3bhk')}
            >
              3BHK
            </button>
          </div>

          <div className="floor-plan-grid">
            {floorPlansData[floorPlanTab].map((plan) => (
              <div key={plan.id} className="floor-plan-card">
                <div className="fp-image-wrapper">
                  <img src={plan.image} alt={plan.name} />
                </div>
                <div className="fp-label">{plan.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="amenities">
        <div className="container">
          <div className="section-header">
            <span className="reveal">Signature Features</span>
            <h2 className="reveal">Amenities</h2>
            <div className="classic-divider reveal"></div>
          </div>

          <div className="amenities-grid">
            {amenities.map((item, idx) => (
              <div key={idx} className={`amenity-card ${item.className} reveal`}>
                <img src={item.image} alt={item.title} />
                <div className="overlay"></div>
                <div className="content">
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="gallery-header">
            <span className="reveal">Renders and Realizations</span>
            <h2 className="reveal">Project Gallery</h2>
            <div className="classic-divider reveal"></div>
          </div>

          <div className="gallery-slider-wrapper reveal">
            {gallerySlides.map((slide, idx) => (
              <div key={idx} className={`gallery-slide ${idx === galleryTab ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.title} />
                <div className="overlay"></div>
                <div className="slide-content">
                  <span>{slide.tag}</span>
                  <h3>{slide.title}</h3>
                </div>
              </div>
            ))}

            <button
              className="slider-btn prev"
              onClick={() => setGalleryTab((prev) => (prev === 0 ? gallerySlides.length - 1 : prev - 1))}
            >
              &#10094;
            </button>
            <button
              className="slider-btn next"
              onClick={() => setGalleryTab((prev) => (prev + 1) % gallerySlides.length)}
            >
              &#10095;
            </button>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" className="video-gallery">
        <div className="container">
          <div className="video-section-header">
            <span className="section-subtitle reveal">Cinematic Experience</span>
            <h2 className="reveal">Video Tours & Highlights</h2>
            <div className="classic-divider reveal"></div>
          </div>

          {/* Featured & Short Video Showcase */}
          <div className="featured-video-row reveal">
            {/* Main Featured Video (Large 16:9) */}
            <div className="featured-video-wrapper">
              <div className="featured-label">FEATURED WALKTHROUGH</div>
              <div className="video-player-container">
                <iframe
                  src="https://www.youtube.com/embed/8cIP_3jwv3c?autoplay=1&mute=1&loop=1&playlist=8cIP_3jwv3c&controls=1&modestbranding=1&rel=0"
                  title="Lavender Luxury Villas Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="featured-video-info">
                <div className="featured-actions">
                  <button className="play-btn" onClick={() => setActiveVideoId('7X8mFp7nS5I')}>
                    <span className="icon">▶</span> Play with Audio
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Playlist Header */}
          <div className="video-grid-header reveal">
            <h3>Explore Playlist</h3>
          </div>

          {/* Netflix/Hotstar Style Grid */}
          <div className="video-grid-netflix">
            {videosData.map((video, idx) => (
              <div key={idx} className="netflix-card reveal" onClick={() => setActiveVideoId(video.youtubeId)}>
                <div className="netflix-card-img-wrapper">
                  <img src={video.image} alt={video.title} />
                  <span className="duration-badge">{video.duration}</span>
                  <div className="netflix-card-hover-overlay">
                    <div className="play-btn-round">▶</div>
                  </div>
                </div>
                <div className="netflix-card-body">
                  <div className="netflix-card-meta">
                    <span className="category-tag">{video.category}</span>
                  </div>
                  <h4>{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Highlights Section */}
      <section id="location" className="location">
        <div className="container">
          <div className="heading">
            <span className="reveal">Strategic Location</span>
            <h2 className="reveal">Location Advantages</h2>
            <div className="classic-divider reveal"></div>
          </div>

          <div className="map-wrapper reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.188971277031!2d77.02074677549632!3d11.099289653154534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d75b36c9cb48471%3A0x5c2ac580e654bf57!2sGem%20Housing!5e0!3m2!1sen!2sin!4v1781171770449!5m2!1sen!2sin"
              loading="lazy"
              title="map"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="location-badge">Kalapatti, Coimbatore</div>
          </div>

          <div className="location-cards">
            {locationCategories.map((cat, idx) => (
              <div key={idx} className="card reveal">
                <h3>{cat.title}</h3>
                {cat.places.map((place, pIdx) => (
                  <p key={pIdx}>{place}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="reveal">Got Questions?</span>
            <h2 className="reveal">Frequently Asked Questions</h2>
            <div className="classic-divider reveal"></div>
          </div>
          <div className="faq-container reveal">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">{activeFaq === index ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">
              <h2>GemHousing</h2>
              <p>Luxury Apartments & Villas crafted for elevated living in Coimbatore.</p>
            </div>

            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#overview">Overview</a>
              <a href="#pricing">Pricing</a>
              <a href="#projects">Projects</a>
              <a href="#amenities">Amenities</a>
              <a href="#gallery">Gallery</a>
              <a href="#location">Location</a>
            </div>
          </div>

          <div className="footer-middle">
            <div className="rera">
              <span>RERA Registered: <strong>TN/11/Building/0121/2025</strong></span>
              <a href="https://www.rera.tn.gov.in/" target="_blank" rel="noopener noreferrer">
                rera.tn.gov.in
              </a>
            </div>

            <div className="privacy">
              <a href="#home" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Only relevant property updates will be sent to registered contact info. Details are kept confidential."); }}>
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Greenfield Housing India Pvt. Ltd. All rights reserved.</p>
            <p>Designed with excellence for GemHousing Lavender.</p>
          </div>
        </div>
      </footer>

      {/* Mobile CTA */}
      <div className="mobile-cta">
        <button onClick={() => setShowPopup(true)}>Enquire Now</button>
      </div>

      {/* Popup Form Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>&times;</button>
            <span>Ready To Own Your Next Address?</span>
            <h2>Enquire Now</h2>
            <div className="classic-divider" style={{ margin: '15px auto' }}></div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <small>{errors.name}</small>}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <small>{errors.phone}</small>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <small>{errors.email}</small>}
              </div>

              {/* Interactive Premium verification check in place of reCAPTCHA for local testing */}
              <div className="captcha-box">
                <div className="captcha-box-interactive">
                  <label htmlFor="human-check">
                    <input
                      type="checkbox"
                      id="human-check"
                      name="verified"
                      checked={formData.verified}
                      onChange={handleInputChange}
                    />
                    I am not a robot
                  </label>
                  <img
                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                    alt="reCAPTCHA logo"
                    style={{ width: '28px', height: '28px', opacity: 0.8 }}
                  />
                </div>
                {errors.verified && <small>{errors.verified}</small>}
              </div>

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>

              {successMsg && <p className="success-msg">{successMsg}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Video Lightbox Modal */}
      {activeVideoId && (
        <div className="video-modal-overlay" onClick={() => setActiveVideoId(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setActiveVideoId(null)}>&times;</button>
            <div className="video-modal-player">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&controls=1&rel=0`}
                title="Property Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="float-btn whatsapp" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <a href="tel:+919876543210" className="float-btn call" aria-label="Call">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
      </div>
    </>
  )
}

export default App
