/**
 * Копировать вендорские js и css в build и подключить отдельно
 * Используется, если не нужно импортировать эти файлы в единый app.js
 */
export const vendors = () => {
	return vendorJS();
	// return vendorJS(), vendorCSS();
};

function vendorJS() {
	const modules = [
		// "node_modules/@splidejs/splide/dist/js/splide.min.js", // если копировать, то ок, а при импорте в app.js работать перестаёт
	];
	return app.gulp.src(modules).pipe(app.gulp.dest(app.path.build.js));
}

function vendorCSS() {
	const modules = [
		// "node_modules/@splidejs/splide/dist/css/splide.min.css",
	];
	return app.gulp.src(modules).pipe(app.gulp.dest(app.path.build.css));
}
