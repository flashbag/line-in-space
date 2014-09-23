<?php require_once 'lang.php';  ?>
<html>
	<head>
		<title><?= $langLabels['faq_title'] ?></title>
		<meta http-equiv="text/html" charset="utf-8">
		<style type="text/css">
			body { font-family: Arial; }
			#main { margin: 0 auto; border:0px solid #aaaaaa; width: 70%; text-align:center; }
			#title { text-decoration: none; color: #000000; }
			p { text-indent: 5%; text-align: left; }
			p.img { text-align: center; }
			#vkc { align:center; }
			#back2 { text-decoration: none; color: #aaaaaa; }
			#back2:active { color: #000000; }
		</style>
	</head>
	<body>
		<div align="center" id="main">
			<p style="text-align: right; font-size: 120%;">
				<?php foreach ($langs as $key => $value): ?>
					<?php if (isset($_SESSION['lang']) && $_SESSION['lang'] == $key): ?>
						<a href="#" style="color: #000; cursor: default; font-weight: bold;"><?= $key ?></a>
					<?php else: ?>
						<a href="?lang=<?= $key ?>"><?= $key ?></a>
					<?php endif; ?>
				<?php endforeach; ?>
			</p>
			<?php include_once 'faq-'.$lang.'.php'; ?>
		</div>
	</body>
</html>