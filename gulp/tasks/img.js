import webp from "gulp-webp";
// import imagemin from "gulp-imagemin";
import tinypng from "gulp-tinypng-compress";

export const img = () => {
	return (
		app.gulp
			.src(app.path.src.img)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "IMG",
						message: "<%= error.message %>",
					})
				)
			)

			// создать webp
			.pipe(app.plugins.newer(app.path.build.img))
			.pipe(webp({ quality: 70 }))
			.pipe(app.gulp.dest(app.path.build.img))

			// оптимизировать картинки tinypng (прод)
			.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.img)))
			.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.img)))
			// .pipe(
			// 	app.plugins.if(
			// 		app.isBuild,
			// 		tinypng({
			// 			key: process.env.KEY_TINYPNG,
			// 		})
			// 	)
			// )
			.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.img)))

			// вместо imagemin используем tinypng с лимитом 500 изображений в месяц
			// .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.img)))
			// .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.img)))
			// .pipe(
			// 	app.plugins.if(
			// 		app.isBuild,
			// 		imagemin({
			// 			progressive: true,
			// 			svgoPlugins: [{ removeViewBox: false }],
			// 			interlaced: true,
			// 			optimizationLevel: 3, // 0-7
			// 		})
			// 	)
			// )
			// .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.img))

			// svg просто перенести из src в build
			.pipe(app.gulp.src(app.path.src.svg))
			.pipe(app.gulp.dest(app.path.build.img))

			.pipe(app.plugins.browsersync.stream())
	);
};
