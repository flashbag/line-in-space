<?php

if (!session_id()) {
	session_start();
}

if (isset($_GET['lang'])) {
	$lang = htmlentities($_GET['lang']);
} elseif (isset($_SESSION['lang'])) {
	$lang = $_SESSION['lang'];
} else {
	switch (substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2)){
	    case "en":
	        $lang = "en";
	        break;
	    case "ru":
	        $lang = "ru";
	        break;
	    default:
	        $lang = "ua";
	        break;
	}
}

$_SESSION['lang'] = $lang;

$langs = array(
	'ua' => array(
		'index_title' => 'Сліди прямої',
		'faq_title'   => 'FAQ - сліди прямої',
		'submit_btn'  => 'НАРИСУВАТИ',
		'size'		  => 'розмір',
		'zoom'		  => 'масштаб'
		),
	'ru' => array(
		'index_title' => 'Следы прямой',
		'faq_title'   => 'FAQ - Следы прямой',
		'submit_btn'  => 'НАРИСОВАТЬ',
		'size'		  => 'размер',
		'zoom'		  => 'масштаб'
		),
	'en' => array(
		'index_title' => 'Line Traces',
		'faq_title'   => 'FAQ - Line Traces',
		'submit_btn'  => 'DRAW',
		'size'		  => 'size',
		'zoom'		  => 'zoom'
		)
	);

$langLabels = $langs[$_SESSION['lang']];

?>