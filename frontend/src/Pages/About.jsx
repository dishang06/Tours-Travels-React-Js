import React from "react";
import "../styles/about.css";
import CommonSection from "../shared/CommonSection";

// Main section component
const about = () => (
  <>
        <CommonSection title={"About Us"} />

    <div className="about-container">
      <h1>Our History</h1>
      <p>
        Founded with a passion for exploration and a commitment to immersive
        travel experiences, our journey began in [year]. What started as a
        humble endeavor has blossomed into a thriving community-driven platform
        for adventurers and culture enthusiasts alike. Over the years, we've
        traversed landscapes, delved into diverse cultures, and fostered
        connections that transcend borders. With each expedition, we've woven
        stories that celebrate the beauty of our world and the richness of human
        connection. Today, we stand as a beacon of wanderlust, dedicated to
        curating unforgettable journeys and fostering a global community bound
        by a shared love for discovery. Join us as we continue to write the next
        chapter in our story of exploration, one destination at a time.
      </p>

      <h1>Our Mission</h1>
      <p>
        Our mission at [Your Tourism Website] is to inspire and facilitate
        memorable travel experiences for all our visitors. We strive to showcase
        the beauty and diversity of destinations around the world while
        promoting sustainable tourism practices that respect local cultures,
        economies, and environments. Through our platform, we aim to provide
        comprehensive information, personalized recommendations, and seamless
        booking services to empower travelers to explore new destinations with
        confidence and ease. Whether you're seeking adventure, relaxation, or
        cultural immersion, we're committed to helping you create unforgettable
        journeys that enrich your life and create lasting memories.
      </p>

      <h1>Our Vision</h1>
      <p>
        At our tourism website, our vision is to inspire and facilitate
        memorable travel experiences for everyone. We believe in promoting
        sustainable and responsible tourism practices that benefit both
        travelers and the destinations they visit. Our goal is to provide
        comprehensive information, personalized recommendations, and seamless
        booking services to help travelers explore the world with confidence and
        ease. We are committed to fostering a sense of wonder, curiosity, and
        appreciation for the diverse cultures and natural wonders our planet has
        to offer.
      </p>
    </div>
  </>
);
export default about;
