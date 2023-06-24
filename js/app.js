/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/functions.js
/* Проверка поддержки webp браузером */
function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		if (support == true) {
			document.querySelector("body").classList.add("webp");
		} else {
			document.querySelector("body").classList.add("no-webp");
		}
	});
}

function navClick() {
	const navLinks = document.querySelectorAll(".nav__link"),
		menuCheckbox = document.getElementById("menu-toggle"),
		header = document.querySelector("header");

	navLinks.forEach((navLink) => {
		navLink.addEventListener("click", () => {
			if (header.classList.contains("header_show")) {
				menuCheckbox.click();
			}
		});
	});
}

// export function stickyHeader() {
// 	const hasMainCarousel = document.querySelector(".swiper-main"),
// 		header = document.querySelector("header");

// 	hasMainCarousel ? header.classList.add("header_contrast") : "";

// 	let handleScroll = () => {
// 		if (window.scrollY > 0) {
// 			header.classList.add("header_fixed");
// 			hasMainCarousel ? header.classList.remove("header_contrast") : "";
// 		} else {
// 			header.classList.remove("header_fixed");
// 			hasMainCarousel ? header.classList.add("header_contrast") : "";
// 		}
// 	};
// 	window.addEventListener("scroll", handleScroll);
// 	handleScroll();
// }

function stickyHeader() {
	const body = document.body,
		menuCheckbox = document.getElementById("menu-toggle"),
		header = document.querySelector("header"),
		headerH = header.offsetHeight,
		headerFixed = document.querySelector(".header_fixed");

	// https://www.w3schools.com/howto/howto_js_navbar_slide.asp
	let handleScroll = () => {
		if (body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
			headerFixed.style.top = 0;
			body.style.paddingTop = `${headerH}px`;
			header.classList.add("header_scroll");
		} else {
			headerFixed.style.top = `-100%`;
			body.style.paddingTop = 0;
			header.classList.remove("header_scroll");
			// close header on scrolltop if open
			if (header.classList.contains("header_show")) {
				menuCheckbox.click();
			}
		}
	};

	window.addEventListener("scroll", handleScroll);
	handleScroll();
}

function menuToggle() {
	const menuCheckbox = document.getElementById("menu-toggle"),
		header = document.querySelector("header"),
		headerFixed = document.querySelector(".header_fixed"),
		social = document.querySelector(".social_fixed .lang"),
		logo = document.querySelector(".logo_fixed .logo__link");

	if (menuCheckbox.checked) {
		// показать меню
		header.classList.add("header_show");
		social.style.opacity = 0;
		logo.style.opacity = 0;
		setTimeout(() => {
			headerFixed.classList.add("noborder");
		}, 300);
	} else {
		// скрыть меню
		header.classList.remove("header_show");
		social.style.opacity = 1;
		logo.style.opacity = 1;
		setTimeout(() => {
			headerFixed.classList.remove("noborder");
		}, 200);
	}

	menuCheckbox.addEventListener("change", menuToggle);
}

function marginAfterAbout() {
	const stepsH = document.querySelector(".info_block7").offsetHeight,
		sectionNext = document.querySelector(".summary + div");
	sectionNext.style.marginTop = `${stepsH - 165 - 74}px`;

	window.addEventListener("resize", marginAfterAbout);
}

function accordionPerson() {
	const buttons = document.querySelectorAll(".accordion-person");
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			let photo = button.closest(".person").querySelector(".person__photo");
			let article = button.closest(".person").querySelector(".person__article");
			button.classList.toggle("plus-box_active");
			photo.classList.toggle("in-color");
			if (article.style.maxHeight) {
				article.style.maxHeight = null;
			} else {
				article.style.maxHeight = article.scrollHeight + "px";
			}
		});
	});
}

;// CONCATENATED MODULE: ./src/js/app.js

isWebp();
navClick();
stickyHeader();
menuToggle();
marginAfterAbout();
accordionPerson();

// import "./modules/cookies.js";
// import "./modules/swiper.js";
// import "./modules/fancybox.js";
// import "./modules/lc_select.js";
// import "./modules/nouislider.js";

/******/ })()
;