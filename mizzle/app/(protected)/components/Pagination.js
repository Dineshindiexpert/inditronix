'use client'

import { Carousel } from "react-bootstrap";

const Pagination = () => {
  return (
    <div className="container mt-1">
      <Carousel className='rounded'>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
            alt="First slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Discover Amazing Products</h3>
            <p>Find the best items curated just for you</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg"
            alt="Second slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Exclusive Deals</h3>
            <p>Exclusive Deals</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://t3.ftcdn.net/jpg/03/14/28/96/360_F_314289607_ADADbnGr64dpGnddyhZPidCoc6jgKiHK.jpg"
            alt="Third slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Shop & Save Big</h3>
            <p>Limited time offers available now</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  );
};

export default Pagination;

// imporve this component by adding dynamic images and captions from props or API, and also add indicators and controls for better navigation.