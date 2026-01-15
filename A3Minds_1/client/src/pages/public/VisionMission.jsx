/**
 * Vision & Mission Page
 * Clear statements of Antony Charitable Trust's vision, mission, and goals
 * Content based on official website information
 */
const VisionMission = () => {
  const a3MindsPrograms = [
    {
      title: 'Personal Development',
      description: 'Unlock your potential with programs focused on building essential life skills: Enriching Core Values, Ambition and Vision, Time Management, Goal Setting, Self-Care.',
    },
    {
      title: 'Communication and Interpersonal Skills',
      description: 'Master the art of communication and collaboration: Building Effective Communication Skills, Developing Leadership Abilities, Critical Thinking, Problem-Solving, Creativity.',
    },
    {
      title: 'Adaptation to Technology and 21st Century Skills',
      description: 'Embrace technology and stay updated: Ability to comprehend and adopt new technology, Integration of learning across disciplines, Improve ICT proficiency.',
    },
    {
      title: 'Well-Being and Mental Health',
      description: 'Prioritize mental well-being: Emotional Intelligence and Self-Awareness Workshop, Stress Management and Resilience Building.',
    },
    {
      title: 'Academic and Career Readiness',
      description: 'Prepare for academic and professional success: Goal Setting for Academic Excellence, Personal Branding, Networking Skills, Entrepreneurial Skills.',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Vision & Mission</h1>
            <p className="text-xl text-primary-100">
              Our guiding principles and aspirations
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                OUR VISION
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Empowering & Training Students/Individuals
              </h2>
            </div>
            <div className="card bg-primary-50 border-l-4 border-primary-600">
              <p className="text-lg text-gray-800 leading-relaxed">
                Our Vision is to empower & train Students/Individuals with essential skills and 
                foster their personal growth, leadership abilities and soft skills. We envision a 
                future where every individual has access to quality education, where communities 
                are empowered to address their own challenges, and where awareness and action come 
                together to create lasting positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                OUR MISSION
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Science-Based Training & Excellence
              </h2>
            </div>
            <div className="card bg-secondary-50 border-l-4 border-secondary-600">
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                Our training approach is rooted with scientifically tested and proven methods that 
                are practically applicable to real life situations. We are committed to:
              </p>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-3 font-bold">•</span>
                  <span>Delivering top-quality training through a team of highly qualified and talented professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-3 font-bold">•</span>
                  <span>Providing personalized attention to each individual</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-3 font-bold">•</span>
                  <span>Designing training modules meticulously at different levels based on extensive research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-3 font-bold">•</span>
                  <span>Covering a wide range of topics essential for personal growth and success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-600 mr-3 font-bold">•</span>
                  <span>Continuously refining and updating our curriculum to ensure relevance and impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* A3 Minds Programs Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A3 Minds Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our Programs are designed for Non-academic Skills which are essential for Students / Individuals, 
              as they play a crucial role in overall development and future success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {a3MindsPrograms.map((program, index) => (
                <div key={index} className="card h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                <img
                  src="/pics/pic3.webp"
                  alt="Students attending an A3 Minds session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <img
                    src="/pics/pic4.webp"
                    alt="Interactive activity during training"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <img
                    src="/pics/pic5.webp"
                    alt="Group discussion with participants"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why A3 Minds Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why A3 Minds?
              </h2>
            </div>
            <div className="card">
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Non-Academic Skills Focus</h3>
                  <p>
                    Non-academic Skills complement academic knowledge and are fundamental to holistic growth. 
                    They equip individuals with the tools needed to navigate challenges, communicate effectively, 
                    and contribute positively to society.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Free Training for Government Students</h3>
                  <p>
                    We provide FREE training sessions for students in government schools and colleges, 
                    focusing on essential life skills like communication, leadership, and problem-solving. 
                    These programs aim to equip students with practical abilities that complement their 
                    academic education.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Training Modules</h3>
                  <p>
                    Our training modules range from focused 3-hour sessions to multi-session programs, 
                    and can also be tailor-made to align with your specific needs and objectives. We 
                    welcome educational institutions, corporates, and individuals to join us.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Activity-Based Training</h3>
                  <p>
                    We use innovative teaching methods with an analysis-driven approach, evaluating progress 
                    and providing reports after each training session. Our unique pedagogy ensures effective 
                    learning outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Collaborate with A3 Minds
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Partner with A3 Minds to offer students, professionals, and communities a truly 
              transformative learning journey. We welcome educational institutions, corporates, and 
              individuals to join us in cultivating the leaders and innovators of the future.
            </p>
            <div className="card bg-white max-w-md mx-auto">
              <h3 className="font-bold text-gray-900 mb-3">Contact Information</h3>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> No. 38/1, AVM Avenue, 1st Street<br />
                Virugambakkam, Chennai – 600092<br />
                Tamil Nadu, India
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Mobile:</strong> +91 99620 55455
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> info@a3minds.com
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> a3minds.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VisionMission
