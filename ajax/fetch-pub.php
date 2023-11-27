<?
try {
	usleep(300000);
	$prop = '
	<li>Аура Койвисто: Человек и его корова. Роковая экспедиция натуралиста Георга Стеллера. Издательство Paulsen, 2021<a class="truncate" rel="nofollow" target="_blank" href="https://www.labirint.ru/pubhouse/2290/">https://www.labirint.ru/pubhouse/2290/</a></li>
	<li>На Командорах нашли крупнейший за последний век скелет морской коровы. Алла Карпова, 2017<a class="truncate" rel="nofollow" target="_blank" href="https://www.mk.ru/science/2017/11/17/na-komandorakh-nashli-krupneyshiy-za-posledniy-vek-skelet-morskoy-korovy.html">https://www.mk.ru/science/2017/11/17/na-komandorakh-nashli-krupneyshiy-za-posledniy-vek-skelet-morskoy-korovy.html</a></li>
	<li>Аура Койвисто: Человек и его корова. Роковая экспедиция натуралиста Георга Стеллера. Издательство Paulsen, 2021<a class="truncate" rel="nofollow" target="_blank" href="https://www.labirint.ru/pubhouse/2290/">https://www.labirint.ru/pubhouse/2290/</a></li>
	<li>На Командорах нашли крупнейший за последний век скелет морской коровы. Алла Карпова, 2017<a class="truncate" rel="nofollow" target="_blank" href="https://www.mk.ru/science/2017/11/17/na-komandorakh-nashli-krupneyshiy-za-posledniy-vek-skelet-morskoy-korovy.html">https://www.mk.ru/science/2017/11/17/na-komandorakh-nashli-krupneyshiy-za-posledniy-vek-skelet-morskoy-korovy.html</a></li>
	<div class="load-more-wrap">
	<a href="javascript:void(0)" class="load-more-href js-load-more" data-target="js-publications" data-url="https://deviart.ru/arcticsirenia/fetch-pub.php">Показать ещё</a>
	</div>
	';

	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 200');
	print $prop;
} catch (Exception $e) {
	header('Content-Type: application/json; charset=UTF-8');
	header('HTTP/1.1 500 Internal Server Error');
	die(json_encode(array('status' => 'error')));
}
