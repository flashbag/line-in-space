<?php

require_once 'lang.php';

# fix start time
$mtime = microtime();
$mtime = explode(" ",$mtime);
$mtime = $mtime[1] + $mtime[0];
$starttime = $mtime;


if ($_GET['size']!=null && $_GET['size']!=0 && $_GET['size']>=300) { $s=htmlspecialchars($_GET['size']); } else { $s=400; }
if ($_GET['zoom']!=null && $_GET['zoom']!=0 && $_GET['zoom']>1) { $z=htmlspecialchars($_GET['zoom']); } else { $z=1.5; }

if ($_GET['ax']!=null && $_GET['ax']!=0) { $A[0]=htmlspecialchars($_GET['ax']); } else { $A[0]=90; }
if ($_GET['ay']!=null && $_GET['ay']!=0) { $A[1]=htmlspecialchars($_GET['ay']); } else { $A[1]=75; }
if ($_GET['az']!=null && $_GET['az']!=0) { $A[2]=htmlspecialchars($_GET['az']); } else { $A[2]=10; }

if ($_GET['bx']!=null && $_GET['bx']!=0) { $B[0]=htmlspecialchars($_GET['bx']); } else { $B[0]=40; }
if ($_GET['by']!=null && $_GET['by']!=0) { $B[1]=htmlspecialchars($_GET['by']); } else { $B[1]=50; }
if ($_GET['bz']!=null && $_GET['bz']!=0) { $B[2]=htmlspecialchars($_GET['bz']); } else { $B[2]=45; }

$get='size='.$s.'&amp;zoom='.$z.'&amp;ax='.$A[0].'&amp;ay='.$A[1].'&amp;az='.$A[2].'&amp;bx='.$B[0].'&amp;by='.$B[1].'&amp;bz='.$B[2];

?>
<html>
	<head>
		<title><?= $langLabels['index_title'] ?></title>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
		<meta http-equiv="text/html" charset="utf-8">
		<link rel="icon" href="img/favicon.ico" type="image/x-icon">
	</head>
	<body>
		<form action="index.php" method="get">
			<table align="center" border="0">
				<tr>
					<td class="gdimg" colspan="2"><img src="gd/axenometry.php?<?php echo $get; ?>" height="400" width="400"></img></td>
					<td class="gdimg" colspan="2"><img src="gd/square.php?<?php echo $get; ?>" height="400" width="400"></img></td>
				</tr>
				<tr>
					<td align="left">
						<input name="ax" type="text" size="2" value="<?php echo $A[0]; ?>">
						<input name="ay" type="text" size="2" min="0" max="200" step="1" value ="<?php echo $A[1]; ?>">
						<input name=az type=text size=2 min="0" max="200" step="1" value ="<?php echo $A[2]; ?>">
						<label><b>A</b></label>
					</td>
					<td align=right>
						<label><b>B</b></label>
						<input name="bx" type="text" size="2" value="<?php echo $B[0]; ?>">
						<input name="by" type="text" size="2" value="<?php echo $B[1]; ?>">
						<input name="bz" type="text" size="2" value ="<?php echo $B[2]; ?>">
					</td>
					<td border="0" align="center" rowspan="2"><input type="submit" value="<?= $langLabels['submit_btn'] ?>" class="btn"></td>
					<td border="0" align="center" rowspan="2">
						<a width="100%" height="100%" href='faq.php' id="faq_btn">FAQ</a>
					</td>
				</tr>
				<tr>
					<td align=left>
						<input name=size type="text" size=4 value ="<?php echo $s; ?>"/>
						<label> - <?= $langLabels['size'] ?></label>
					</td>
					<td align=right>
						<label><?= $langLabels['zoom'] ?> - </label><input name=zoom type="text" size=2 value ="<?php echo $z; ?>"/>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>