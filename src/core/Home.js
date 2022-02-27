import React from "react";
import "../styles.css";
import Base from "./Base";
import ReusableCard from "./ReusableCard";
import { Scrollbars } from 'react-custom-scrollbars'
const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to home page">
      {/* <Scrollbars style={{ width: 1200, height: 350 }}> */}
        <div className="d-flex  gap-4 w-100 justify-content-around">
          <ReusableCard />
        </div>
      {/* </Scrollbars> */}
    </Base>
  );
};

export default Home;
