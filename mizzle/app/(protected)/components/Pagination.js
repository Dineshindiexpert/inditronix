'use client'

import { Carousel } from "react-bootstrap";

const Pagination = () => {
  return (
    <div className="container mt-1">
      <Carousel className='rounded'>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVMqdcrdknZNAnXODUXK9yOkzxkj1cKoh3g&s"
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
            src="https://cdn.dribbble.com/userupload/24504622/file/original-ed16c81d6bd952e6ca9a061d5709e8eb.png?resize=400x0"
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWm3i4x3IwvJGSItFKJ5LerDvdLqUnyw3-og&s"
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