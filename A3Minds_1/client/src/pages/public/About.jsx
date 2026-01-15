/**
 * About Page
 * Information about Antony Charitable Trust and A3 Minds
 * Content based on official website information
 */
const About = () => {
  const focusAreas = [
    {
      title: 'Education',
      description: 'Empowering individuals through quality education, training programs, and skill development. Breaking the cycle of ignorance by providing opportunities to learn and upgrade.',
    },
    {
      title: 'Healthcare',
      description: 'Creating awareness about healthcare and implementing projects for underprivileged people with necessary healthcare infrastructure. Free medical camps and health screening.',
    },
    {
      title: 'Environmental Sustainability',
      description: 'Raising awareness about environmental issues and implementing corrective measures. Projects like "Save Water Bharat" and "Blue Wave" focus on conservation.',
    },
    {
      title: 'Community Service',
      description: 'Dedicated to serving communities through various programs, activities, and support initiatives. Youth development, scholarships, and special celebrations.',
    },
  ]

  const milestones = [
    { year: '2010', event: 'Antony Charitable Trust established in Chennai' },
    { year: '2020', event: 'COVID-19 relief: 31 Lakh+ free food served during pandemic' },
    { year: '2023', event: 'A3 Minds training program launched for non-academic skills' },
    { year: '2024', event: 'Drug Abuse Awareness program inaugurated by Hon\'ble Governor of Tamil Nadu' },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-primary-100">
              "Life is a gift and it offers us the privilege, opportunity and responsibility to give something back"
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Since its establishment in 2010, the <strong>Antony Charitable Trust</strong> has been 
                  unwavering in its dedication to making a positive impact on society. By empowering 
                  individuals and communities, the Trust has contributed significantly to the overall 
                  well-being and development of the region.
                </p>
                <p>
                  The Antony Charitable Trust employs a comprehensive strategy to empower communities, 
                  enabling them to achieve long-term sustainability and self-reliance. Our efforts are 
                  dedicated to addressing the challenges of creating a sustainable, safe, and improved 
                  lifestyle for everyone.
                </p>
                <p>
                  Leveraging our expertise across various domains, we tackle critical challenges using 
                  the most effective science-based solutions. We increase awareness, provide technical 
                  support, and spur action using a range of effective strategies. We accomplish this 
                  by collaborating with government agencies, other NGOs, and various organizations to 
                  carry out our initiatives.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                <img
                  src="/pics/pic2.webp"
                  alt="Volunteers engaging with community members"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <img
                    src="/pics/pic4.webp"
                    alt="Student interaction during A3 Minds program"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <img
                    src="/pics/pic5.webp"
                    alt="Healthcare awareness initiative"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Focus Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are dedicated to focusing on four key sectors that drive our mission forward
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {focusAreas.map((area, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A3 Minds Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                A3 Minds
              </h2>
              <p className="text-lg text-gray-600">
                A training company focused on building non-academic skills and abilities in individuals
              </p>
            </div>
            <div className="card bg-primary-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">A3 Minds Concept</h3>
              <p className="text-gray-700 mb-4">
                At the heart of A3 Minds lies a simple yet powerful belief: <strong>true excellence begins with the mind</strong>. 
                Our concept is built on shaping the Conscious, Subconscious, and Unconscious dimensions of human potential.
              </p>
              <ul className="space-y-3 text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 font-bold">•</span>
                  <span><strong>The Conscious mind</strong> directs choices, focus, and awareness.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 font-bold">•</span>
                  <span><strong>The Subconscious mind</strong> drives habits, emotions, and creativity.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 font-bold">•</span>
                  <span><strong>The Unconscious mind</strong> anchors deep beliefs and untapped potential.</span>
                </li>
              </ul>
              <p className="text-gray-700">
                By aligning and empowering all three, A3 Minds helps individuals go beyond traditional learning, 
                equipping them with the mindset and abilities required for real-world excellence.
              </p>
              <div className="mt-6 pt-6 border-t border-primary-200">
                <p className="text-gray-700">
                  <strong>Free Training Sessions:</strong> We provide FREE training sessions for students in 
                  government schools and colleges, focusing on essential life skills like communication, 
                  leadership, and problem-solving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Key milestones in our organization's history
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow pt-2">
                    <p className="text-lg text-gray-800">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Moments from Our Journey */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Moments from Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A snapshot of some of the key programs, celebrations, and awareness
              campaigns conducted by Antony Charitable Trust and A3 Minds.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-100">
              <img
                src="/pics/nayanthara.webp"
                alt="Awareness event with guests"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-100">
              <img
                src="/pics/drug.webp"
                alt="Drug abuse awareness program"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-gray-100">
              <img
                src="/pics/rn ravi.webp"
                alt="Event with Hon'ble Governor of Tamil Nadu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                58 Lakh+
              </div>
              <div className="text-gray-700 font-medium">People Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                230+
              </div>
              <div className="text-gray-700 font-medium">Associates Working Together</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                3.68 Crore+
              </div>
              <div className="text-gray-700 font-medium">People Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                460+
              </div>
              <div className="text-gray-700 font-medium">Activities Across India</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
