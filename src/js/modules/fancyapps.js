import { Fancybox } from "@fancyapps/ui";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import { Splide } from "@splidejs/splide/dist/js/splide.esm.js";

addEventListener("DOMContentLoaded", () => {
	// Модальные окна
	Fancybox.bind("[data-fancybox]", {});

	// Карусели
	Carousel.defaults = {
		...Carousel.defaults,
		infinite: false,
		adaptiveHeight: true,
	};

	// Карусели в модальных окнах
	const modalCarousels = document.querySelectorAll(".modal_carousel .f-carousel");
	modalCarousels.forEach((el) => {
		let carousel = document.getElementById(el.id);
		if (carousel) {
			new Carousel(carousel);
		}
	});

	// Карусель в детальной новости
	const newsElementContainer = document.getElementById("newsElementCarousel");
	if (newsElementContainer) {
		new Carousel(newsElementContainer);
	}

	// Карусель для экспедиции
	const containerExp = document.getElementById("expeditionCarousel"),
		optionsExp = {
			infinite: true,
			slidesPerPage: 1,
			Navigation: false,
			Dots: false,
			center: false,
			on: {
				ready: (instance) => {
					const svgPointFirst = instance.slides[0].el.dataset.point;
					setSvgPathActive(svgPointFirst);
				},
				change: (instance) => {
					const page = instance.page,
						svgPoint = instance.pages[page].slides[0].el.dataset.point;
					setSvgPathActive(svgPoint);
				},
				selectSlide: (instance) => {
					const page = instance.page,
						activeNow = document.querySelectorAll(".splide__toggle.is-active");
					// При смене слайда останавливаем autoplay вложенного сладера (splide) в предыдущем активном слайде
					if (activeNow) {
						activeNow.forEach((btn) => {
							btn.click();
						});
					}
					// И запускаем для текущего
					const btn = instance.pages[page].slides[0].el.querySelector(".splide__toggle");
					if (btn) {
						btn.click();
					}
				},
			},
		},
		fc = new Carousel(containerExp, optionsExp),
		svgRoutes = document.querySelectorAll(".svg-route"),
		isActiveClass = "is-active";

	// Изменить активный маршрут на svg при прокрутке слайдера
	function setSvgPathActive(svgPoint) {
		const getRoute = document.querySelector(`.svg-route[data-point='${svgPoint}']`),
			isActiveClass = "is-active",
			activeRoute = document.querySelector(`.svg-route.${isActiveClass}`);

		if (activeRoute) {
			activeRoute.classList.remove(isActiveClass);
		}
		if (getRoute) {
			getRoute.classList.add(isActiveClass);
		}
	}

	// Клик по маршруту в svg и прокрутка карусели до этого этапа
	svgRoutes.forEach((route) => {
		route.addEventListener("click", (e) => {
			e.preventDefault();
			let activeRoute = document.querySelector(`.svg-route.${isActiveClass}`);
			if (activeRoute) activeRoute.classList.remove(isActiveClass);

			route.classList.add(isActiveClass);
			let slide = containerExp.querySelector(`.f-carousel__slide[data-point='${route.dataset.point}']`),
				fcIndex = slide.dataset.index;
			fc.slideTo(fcIndex);
		});
	});

	/**
	 * Инициализация вложенных каруселей внутри основной карусели для экспедиции
	 * При использовании type: "loop" и автопрокрутки возникает проблема в лайтбоксе родительской карусели: в неё попадают клонированные элементы от splide.
	 * В случае отключения loop, автопрокрутка продолжает заполнять прогрессбар на последнем слайде бесконечно. Встроенных методов контроля последнего слайда нет.
	 * Решение: для ивента autoplay:playing при достижении прокруткой последнего слайда прокрутить карусель в начало.
	 *  */
	const splides = document.querySelectorAll(".splide");
	if (splides.length) {
		splides.forEach((el) => {
			let splide = new Splide(el, {
				// type: "loop",
				perPage: 1,
				arrows: false,
				autoplay: true,
				resetProgress: false,
				// interval: 500
				// pauseOnHover: false,
				// pauseOnFocus: false,
			});

			splide.on("autoplay:playing", function (rate) {
				const count = splide.Components.Slides.getLength(),
					index = splide.Components.Controller.getIndex();
				// console.log(rate, index+1, count);
				if (index + 1 == count && rate == 1) {
					splide.Components.Controller.go(0);
				}
			});

			splide.mount();

			const { Autoplay } = splide.Components;
			Autoplay.pause();
		});
	}

	/**
	 * В элементах основной карусели для экспедиции (containerExp) используется вложенная карусель (splide) для фотографий с точки интереса.
	 * Эти фото показываются в общем для всего маршрута лайтбоксе fancybox, 
	 * но при показе и прокрутке этих фотографий в лайтбоксе сбивается индекс у родительского containerExp,
	 * из-за чего при выходе из лайтбокса карусель оказывается не на том месте, откуда её запускали.
	 * Решение: добавлена прокрутка родительской карусели к точке входа при выходе из лайтбокса.
	 *  */
	Fancybox.bind('[data-fancybox="red"]', {
		on: {
			destroy: () => {
				fc.slideTo(parentSlideIndex);
				// console.log(fancybox.getSlide().triggerEl);
			},
		},
	});
	Fancybox.bind('[data-fancybox="green"]', {
		on: {
			destroy: () => {
				fc.slideTo(parentSlideIndex);
			},
		},
	});
	Fancybox.bind('[data-fancybox="blue"]', {
		on: {
			destroy: () => {
				fc.slideTo(parentSlideIndex);
			},
		},
	});

	const carouselElements = document.querySelectorAll(".route [data-fancybox]");
	carouselElements.forEach((el) => {
		el.addEventListener("click", () => {
			const index = el.closest(".f-carousel__slide");
			window.parentSlideIndex = index.dataset.index;
		});
	});
});
