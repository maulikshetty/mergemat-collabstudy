import React from 'react'
import './styles/index.css'

export default function Landing() {
  const toggleMobileNav = () => {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('hidden');
};

return (
  
    <div className="bg-gray-100">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
        {/* Header */}
        <header className="bg-white shadow">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center flex-wrap">
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 md:hidden" id="mobile-nav-toggle" onClick={toggleMobileNav}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <img src="../../src/imgs/merge.png" alt="MergeMat Logo" className="h-8" />
                    <div className="text-lg font-semibold">MergeMat</div>
                </div>
                <div className="hidden w-full md:flex md:items-center md:w-auto" id="mobile-nav">
                    <div className="text-sm font-semibold flex flex-col md:flex-row md:space-x-4 md:items-center">
                        <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-gray-900">How It Works</a>
                        {/* <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-gray-900">Our Work</a> */}
                        <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-gray-900">FAQ</a>
                        {/* <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-gray-900">About Us</a> */}
                        <a href="/register" className="block mt-4 md:inline-block md:mt-0 bg-blue-700 text-white px-3 py-2 rounded-md">Sign Up</a>
                        <a href="/login" className="block mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-gray-900">Login</a>
                    </div>
                </div>
            </nav>
        </header>

        {/* Main Content */}
        <main>
            <section className="container mx-auto px-6 py-12 flex flex-wrap items-center">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4">Unleash Your Creative Potential</h1>
                    <p className="text-lg mb-6">Connect, collaborate, and create with peers and professionals from around the globe.</p>
                    <div className="flex justify-center md:justify-start items-center space-x-2">
                        <input type="email" placeholder="Enter Your Email" className="border-2 border-gray-300 rounded-md px-4 py-2 w-64" />
                        <button className="bg-blue-700 text-white px-6 py-2 rounded-md" onClick={() => window.location.href = "/register"}>Sign Up</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0" id="nav-toggle">
                    <img src="../../src/imgs/main.png" alt="Illustration of creative people working together" className="mx-auto" />
                </div>
            </section>

            {/* ... Other sections ... */}

            <section className="bg-white py-12">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
                    <div className="flex flex-wrap justify-between items-start">
                        <div className="w-full md:w-1/3 mb-8 md:mb-0">
                            <p className="text-lg mb-4">We believe that collaboration is the key to unlocking artistic potential and innovation. Our platform is designed to make it easy for students and artists to work together, share ideas, and bring their collective vision to life.</p>
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-1 bg-blue-700 mr-3"></div>
                                <p className="text-sm">Productivity</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-16 h-1 bg-gray-300 mr-3"></div>
                                <p className="text-sm">Communication</p>
                            </div>
                            <p className="text-sm mt-4">Simple</p>
                            <p className="text-xs text-gray-600">We strongly believe that successful teams and groups can be made with a simple and intuitive interface</p>
                        </div>
                        <div className="w-full md:w-2/3 grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="mb-4"><i className="fas fa-user-friends fa-2x" style={{ animation: 'icon-bounce 2s infinite' }}></i></div>
                                <h3 className="font-semibold mb-2">Connect</h3>
                                <p className="text-sm">Add peers and professionals with shared interests and complementary skills.</p>
                            </div>
                            <div className="text-center">
                                <div className="mb-4"><i className="fas fa-lightbulb fa-2x" style={{ animation: 'icon-bounce 2s infinite' }}></i></div>
                                <h3 className="font-semibold mb-2">Create/Work</h3>
                                <p className="text-sm">Work together on projects, share ideas, and watch your visions come to life.</p>
                            </div>
                            <div className="text-center">
                                <div className="mb-4"><i className="fas fa-users fa-2x" style={{ animation: 'icon-bounce 2s infinite' }}></i></div>
                                <h3 className="font-semibold mb-2">Collaborate</h3>
                                <p className="text-sm">Utilize our tools to brainstorm, sketch, and refine your creations in real-time.</p>
                            </div>
                            <div className="text-center">
                                <div className="mb-4"><i className="fas fa-share-alt fa-2x" style={{ animation: 'icon-bounce 2s infinite' }}></i></div>
                                <h3 className="font-semibold mb-2">Share</h3>
                                <p className="text-sm">Showcase your collaborative projects to the community, receive feedback, and inspire others.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 text-white py-12 lightning-overlay">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Start Your Journey Now</h2>
                    <div className="flex justify-center items-center space-x-4">
                      <i className="fas fa-rocket fa-2x" style={{ animation: 'icon-spin 3s linear infinite' }}></i>
                      <button className="bg-blue-700 text-white px-6 py-2 rounded-md" onClick={() => { window.location.href = "/register" }}>Start Now</button>
                      <i className="fas fa-globe fa-2x" style={{ animation: 'icon-spin 3s linear infinite reverse' }}></i>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                <div className="flex flex-wrap -mx-4 justify-between items-start mb-8">
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                        {/* FAQ items */}
                        <h3 class="text-lg font-semibold mb-4">Is there any pricing for this?</h3>
                    <div class="faq-collapse ">
                        <p class="text-sm mb-4">MergeMat offers a variety of pricing options to fit your needs. Whether you're an individual or a large enterprise, we have a plan that's right for you.</p>
                    </div>
                    <h3 class="text-lg font-semibold mb-4">What are the limits to using the suite of tools</h3>
                    <div class="faq-collapse">
                        <p class="text-sm mb-4">Our suite of tools is designed to be as inclusive as possible, with few limitations. We want to empower you to create without barriers.</p>
                    </div>
                    <h3 class="text-lg font-semibold mb-4">Do you offer LinkedIn Integration</h3>
                    <div class="faq-collapse">
                        <p class="text-sm mb-4">Yes, MergeMat offers LinkedIn integration to help you connect with professionals and expand your network.</p>
                    </div>
                    <a href="#" class="text-blue-700 hover:underline">More FAQ</a>
                    </div>
                    <div className="w-full md:w-1/2">
                        {/* Newsletter subscription form */}
                        <h4 class="text-xl font-semibold mb-4">How We Can Help You?</h4>
                    <p class="text-lg text-gray-800 mb-4">Follow our newsletter. We will regularly update our latest project and availability.</p>
                    <div class="flex space-x-4 mb-4">
                        <input type="text" placeholder="Enter Your Email" class="border border-gray-300 rounded-md p-3 w-full md:w-2/3"/>
                        <button class="bg-blue-700 text-white px-6 py-3 rounded-md w-full md:w-auto">Lets Talk</button>
                    </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-6">
                <div className="container mx-auto px-6 flex flex-wrap justify-between items-center">
                    <div className="text-lg font-semibold">MergeMat</div>
                    <div className="flex space-x-4">
                        {/* Social media links */}
                        <a href="#" class="hover:text-gray-300"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="hover:text-gray-300"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="hover:text-gray-300"><i class="fab fa-facebook-f"></i></a>
                    </div>
                    <div className="text-sm">
                        {/* Footer links */}
                        <a href="#" class="hover:text-gray-300">Work With Us</a> |
                    <a href="#" class="hover:text-gray-300"> Enterprise Pricing</a> |
                    <a href="#" class="hover:text-gray-300"> About Us</a> |
                    <a href="#" class="hover:text-gray-300"> FAQs</a> |
                    <a href="#" class="hover:text-gray-300"> Report a Bug</a>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Contact Us</button>
                </div>
                <div className="container mx-auto px-6 flex flex-wrap justify-between items-center text-xs mt-4">
                    © MergeMat, Inc. — All Rights Reserved
                </div>
            </footer>
        </main>
    </div>
);
};

