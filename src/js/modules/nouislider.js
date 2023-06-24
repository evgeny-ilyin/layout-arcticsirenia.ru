import noUiSlider from "nouislider";
import wNumb from "wnumb";

const priceSlider = document.getElementById("price-range"),
	priceResult = document.querySelector(".price-range-result"),
	priceResultInput = document.querySelector("input[name=price_range]");

if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [500000, 20000000],
		range: { min: 500000, max: 20000000 },
		step: 500000,
		connect: true,
		format: wNumb({
			decimals: 0,
			thousand: ",",
			prefix: "$",
		}),
		// tooltips: true,
	});

	priceSlider.noUiSlider.on("update", function (values) {
		priceResult.innerHTML = values.join(" — ");
		priceResultInput.value = values.join(" — ");
	});
}
