import { Fancybox } from "@fancyapps/ui";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

addEventListener("DOMContentLoaded", () => {
Carousel.defaults = {
	...Carousel.defaults,
	infinite: false,
	adaptiveHeight: true,
};

// модальные окна
Fancybox.bind("[data-fancybox]", {});

// карусели в модальных окнах
const modalCarousels = document.querySelectorAll(".modal_carousel .f-carousel");
modalCarousels.forEach((el) => {
	let carousel = document.getElementById(el.id);
	if (carousel) {
		new Carousel(carousel);
	}
});

// карусель в детальной новости
const newsElementContainer = document.getElementById("newsElementCarousel");
if (newsElementContainer) {
	new Carousel(newsElementContainer);
}
});