import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it('renders without crashing', function() {
  render(<Carousel />);
});

// snapshot test
it('matches snapshot', function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

// right arrow test
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// left arrow test
it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  
  // move back to the first image in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

// hidden arrow tests
it(`hides the left and right arrows when it's at either end of the image array`, function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect right arrow to be visible and left arrow to initially be hidden
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument();


  // move forward in the carousel twice
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect right arrow to be hidden and left arrow to be visible
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).toBeInTheDocument();

});
