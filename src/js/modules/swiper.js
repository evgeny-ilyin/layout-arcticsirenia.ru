import { Swiper } from "swiper/bundle";

const swiperMain = new Swiper(".swiper.swiper-main", {
	loop: true,
	spaceBetween: 50,
	slidesPerView: 1,
	centeredSlides: true,
	breakpoints: {
		990: {
			initialSlide: 1,
			slidesPerView: 1.5,
			spaceBetween: 15,
		},
	},
	autoplay: {
		delay: 3000,
		pauseOnMouseEnter: true,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-main .swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-main .swiper-button-next",
		prevEl: ".swiper-main .swiper-button-prev",
	},
});
