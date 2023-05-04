import React from "react";
import "../styles.css";
import Base from "./Base";
import ReusableCard from "./ReusableCard";
import { Scrollbars } from 'react-custom-scrollbars'
const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to home page">
        <div className="product-section">
          <ReusableCard />
        </div>
    </Base>
  );
};

export default Home;
