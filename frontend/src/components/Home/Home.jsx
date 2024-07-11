import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css';

export const Home = () => {
    return (
        <div>
            <div className="homeHeader">

                <div className="homeHeaderLinks">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/faqs">FAQs</Link>
                    <Link to="/Login">Log in</Link>
                </div>
            </div>
            <div className="homeBanner  background-opacity">
                <div className="homePageContainer">
                    <div className="homeBannerHeader">
                        <h1>EliteZ</h1>
                        <div className="homeHeaderLogo">
                            <div id="logoContainer">
                                <div id="ring"></div>
                                <div id="ring"></div>
                                <div id="ring"></div>
                                <div id="ring"></div>
                            </div>
                            {/* <div id="logoTitle">EliteZ</div> */}
                        </div>
                        <p>Inventory Fulfillment and Distribution</p>
                    </div>
                    <p className="homeBannerTagline">Track your goods throughout your entire supply chain, from purchasing to production to end sales.</p>
                    <div className="homeBannerIcons">
                        <a href="https://www.apple.com"><i className="fa-brands fa-apple"></i></a>
                        <a href="https://www.android.com"><i className="fa-brands fa-android"></i></a>
                        <a href="https://www.microsoft.com"><i className="fa-brands fa-windows"></i></a>
                    </div>
                </div>
            </div>
            <div className="homePageFeatures">
                <div className="homePageFeature">
                    <span className="homePageFeatureIcon"><i className="fa-solid fa-gear"></i></span>
                    <h3>Editable Theme</h3>
                    <p>An editable theme provides users with the flexibility to customize the visual appearance of their application. This feature allows users to modify colors, fonts, and layout settings according to their preferences.</p>
                </div>
                <div className="homePageFeature">
                    <span className="homePageFeatureIcon"><i className="fa-solid fa-star"></i></span>
                    <h3>Flat Design</h3>
                    <p>Flat design is a minimalist design approach that emphasizes usability and simplicity. It features clean, open spaces, crisp edges, bright colors, and two-dimensional illustrations.</p>
                </div>
                <div className="homePageFeature">
                    <span className="homePageFeatureIcon"><i className="fa-solid fa-globe"></i></span>
                    <h3>Reach Your Audience</h3>
                    <p>Reaching your audience involves leveraging various digital channels and strategies to connect with potential customers effectively.</p>
                </div>
            </div>
            <div className="homePageNotified">
                <div className="emailForm">
                    <h1>Get Notified of Any Updates!</h1>
                    <p>Stay informed about the latest updates and enhancements to EliteZ. Subscribe with your email to receive timely notifications and ensure you don't miss out on important news and features that can help optimize your business operations.</p>
                    <form action="">
                        <div className="notifyFormContainer">
                            <input type="text" placeholder="Email Address" />
                            <button>Notify</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="homePageSocials">
                <h3>Say Hi & Get in Touch</h3>
                <p>Connect with us on social media and stay engaged with the EliteZ community. Follow us for updates, share your feedback, and join the conversation. We value your input and look forward to hearing from you!</p>
                <div className="homePageSocialsIconsContainer">
                    <a href=""><i className="fa-brands fa-twitter"></i></a>
                    <a href=""><i className="fa-brands fa-facebook"></i></a>
                    <a href=""><i className="fa-brands fa-pinterest"></i></a>
                    <a href=""><i className="fa-brands fa-google-plus"></i></a>
                    <a href=""><i className="fa-brands fa-linkedin"></i></a>
                    <a href=""><i className="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            {/* <div className="homeFooter">
            <a href="">Contacts</a>
            <a href="">Download</a>
            <a href="">Press</a>
            <a href="">Email</a>
            <a href="">Support</a>
            <a href="">Privacy Policy</a>
        </div> */}
        </div>
    )
}

