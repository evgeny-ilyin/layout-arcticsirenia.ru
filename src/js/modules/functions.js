/* Проверка поддержки webp браузером */
export function isWebp() {
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

export function navClick() {
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

export function stickyHeader() {
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

export function menuToggle() {
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
			headerFixed.classList.add("header_noborder");
		}, 300);
	} else {
		// скрыть меню
		header.classList.remove("header_show");
		social.style.opacity = 1;
		logo.style.opacity = 1;
		setTimeout(() => {
			headerFixed.classList.remove("header_noborder");
		}, 200);
	}

	menuCheckbox.addEventListener("change", menuToggle);
}

export function marginAfterAbout() {
	const steps = document.querySelector(".info_block7");
	if (!steps) return;
	const stepsH = steps.offsetHeight,
		sectionNext = document.querySelector(".summary + div");
	sectionNext.style.marginTop = `${stepsH - 165 - 74}px`;

	window.addEventListener("resize", marginAfterAbout);
}

export function accordionPerson() {
	const buttons = document.querySelectorAll(".accordion-person");
	if (!buttons) return;
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

export function cowHeight() {
	let setHeight = () => {
		const cow = document.querySelector(".parallax-cow");
		if (!cow) return;
		const cowH = cow.getBoundingClientRect().height,
			sectionNext = document.querySelector(".stellers-cow");
		sectionNext.style.height = `${cowH}px`;
	};
	window.addEventListener("load", setHeight);
	window.addEventListener("resize", setHeight);
}

export function moooo() {
	const cow = document.querySelector(".parallax-cow");
	if (!cow) return;
	const cowH = cow.getBoundingClientRect().height;
	const startMove = document.querySelector(".content.about").getBoundingClientRect().top; //viewport
	const stopMove = document.querySelector(".info_block7").offsetTop;

	if (startMove < 0) {
		if (window.scrollY >= stopMove) {
			cow.style.top = `${stopMove - cowH}px`;
		} else {
			cow.style.top = `${window.scrollY - cowH}px`;
		}
	} else {
		cow.style.top = 0;
	}

	window.addEventListener("load", moooo);
	window.addEventListener("scroll", moooo);
}

export function loadmore() {
	let fetchByUrl = async (trigger) => {
		const target = trigger.dataset.target,
			url = trigger.dataset.url;

		if (!url || !target) return;

		const targetNode = document.querySelector(`.${target}`);

		trigger.innerHTML = "";
		btnLoader(trigger, "start");

		try {
			let response = await fetch(url);
			if (!response.ok) {
				return;
			}
			let result = await response.text(),
				div = document.createElement("div");
			div.innerHTML = result;

			let newPager = div.querySelector(".load-more-wrap"),
				oldPager = document.querySelector(".load-more-wrap");

			oldPager.innerHTML = newPager.innerHTML;
			newPager.remove();

			targetNode.insertAdjacentHTML("beforeend", div.innerHTML);
		} catch (e) {
			console.log(e);
			return;
		}
	};

	document.addEventListener("click", (e) => {
		const el = e.target.closest(".js-load-more");
		if (el) {
			fetchByUrl(el);
		}
	});
}

function btnLoader(where, action = false) {
	if (!where) return;
	const loadingClass = "is-loading";

	if (action == "stop") {
		where.classList.remove(loadingClass);
		return;
	}

	where.classList.add(loadingClass);
}

// Cookies accept box
const delayInSeconds = 1;
const consentValidityInDays = 30;
const consentKey = "cookieConsent";

function hasConsent() {
	const consentData = localStorage.getItem(consentKey);
	if (!consentData) return false;

	try {
		const { acceptedAt } = JSON.parse(consentData);
		const expirationDate = new Date(acceptedAt);
		expirationDate.setDate(expirationDate.getDate() + consentValidityInDays);
		return new Date() < expirationDate;
	} catch {
		return false;
	}
}

function saveConsent() {
	localStorage.setItem(consentKey, JSON.stringify({ acceptedAt: new Date().toISOString() }));
}

function showPopup() {
	const popupBox = document.getElementById("c-popup");
	popupBox.classList.add("show");
}

function hidePopup() {
	const popupBox = document.getElementById("c-popup");
	popupBox.classList.remove("show");
}

export function cookieAccept() {
	if (!hasConsent()) {
		setTimeout(showPopup, delayInSeconds * 1000);
	}

	document.getElementById("c-accept").addEventListener("click", () => {
		saveConsent();
		hidePopup();
	});
}
