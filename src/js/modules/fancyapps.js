import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
Carousel.defaults = {
  ...Carousel.defaults,
  infinite: false,
  adaptiveHeight: true,
};

const newsElementContainer = document.getElementById("newsElementCarousel");
if (newsElementContainer) {
	new Carousel(newsElementContainer);
}
