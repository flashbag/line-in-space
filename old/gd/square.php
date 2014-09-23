<?php
/**
 * Line Traces Square Proection
 *
 * This file generate square proection image by PHP-GD for line traces script
 * Written in early 2012, saved original code without refactoring
 * @author Oleg Kukil <flashbag.zvir@gmail.com>
 * @version 0.1
 */

if ($_GET['size']!=null) { $s=htmlspecialchars($_GET['size']); } else { $s=400; }
if ($_GET['zoom']!=null) { $z=htmlspecialchars($_GET['zoom']); } else { $z=1.5; }

if ($_GET['ax']!=null) { $A[0]=htmlspecialchars($_GET['ax']); } else { $A[0]=90; }
if ($_GET['ay']!=null) { $A[1]=htmlspecialchars($_GET['ay']); } else { $A[1]=75; }
if ($_GET['az']!=null) { $A[2]=htmlspecialchars($_GET['az']); } else { $A[2]=10; }

if ($_GET['bx']!=null) { $B[0]=htmlspecialchars($_GET['bx']); } else { $B[0]=40; }
if ($_GET['by']!=null) { $B[1]=htmlspecialchars($_GET['by']); } else { $B[1]=50; }
if ($_GET['bz']!=null) { $B[2]=htmlspecialchars($_GET['bz']); } else { $B[2]=45; }


$e=100; $t=5;
$k=(($s/$e)/2); $h=$s/2; $hs=($s*$z)/2; $r=($s*$z)*0.015;

function return_proection_traces($x1,$y1,$x2,$y2,$h){
	$b=($y2-(($x2*$y1)/$x1))/(1-($x2*1)/$x1); $a=($y1-$b)/$x1;
	$tx_x=round(($h-$b)/$a,0); $ty_y=round($a*$h+$b,0); $tx_y=$ty_x=$h;
	return array ( $tx_x,$tx_y,$ty_x,$ty_y );
}

$fA[0]=$z*$h-($h-(($e-$A[0])*$k)); $fA[1]=$z*$h-($h-(($e-$A[2])*$k));
$fB[0]=$z*$h-($h-(($e-$B[0])*$k)); $fB[1]=$z*$h-($h-(($e-$B[2])*$k));

$pA[0]=$z*$h+((($e+$A[1])*$k)-$h); $pA[1]=$z*$h+((($e-$A[2])*$k)-$h);
$pB[0]=$z*$h+((($e+$B[1])*$k)-$h); $pB[1]=$z*$h+((($e-$B[2])*$k)-$h);

$hA[0]=$z*$h-($h-(($e-$A[0])*$k)); $hA[1]=$z*$h+($h-(($e-$A[1])*$k));
$hB[0]=$z*$h-($h-(($e-$B[0])*$k)); $hB[1]=$z*$h+($h-(($e-$B[1])*$k));


list($fH[0],$fH[1],$fP[0],$fP[1])=return_proection_traces($fA[0],$fA[1],$fB[0],$fB[1],$hs);
list($pH[0],$pH[1],$pF[0],$pF[1])=return_proection_traces($pA[0],$pA[1],$pB[0],$pB[1],$hs);
list($hF[0],$hF[1],$hP[0],$hP[1])=return_proection_traces($hA[0],$hA[1],$hB[0],$hB[1],$hs);

$XMIN=1000000; $XMAX=0; $YMIN=1000000; $XMAX=0;

$els=array($fH,$fP,$pH,$pF,$hF,$hP);

foreach($els as $el){
	if ($el[0]<$XMIN) { $XMIN=$el[0]; }
	if ($el[0]>$XMAX) { $XMAX=$el[0]; }
	if ($el[1]<$YMIN) { $YMIN=$el[1]; }
	if ($el[1]>$YMAX) { $YMAX=$el[1]; }
}
if ($pH[0]>$YMAX) { $YMAX=$pH[0]; }

$XMAX=round(($e-(($h-($XMAX-$z*$h))/$k)),0);
$YMAX=round(($e-(($h-($YMAX-$z*$h))/$k)),0);
$XMIN=round(($e-(($h-($XMIN-$z*$h))/$k))*-1,0);
$YMIN=round(($e-(($h-($YMIN-$z*$h))/$k))*-1,0);

$SX=$XMAX+$XMIN; $SY=$YMAX+$YMIN;

$hP1[0]=$hP[1]; $hP1[1]=$hP[0]; $pH1[0]=$pH[1]; $pH1[1]=$pH[0];

$F[0]=$hF[0]; $F[1]=$pF[1]; $P[0]=$hP[1]; $P[1]=$fP[1]; $H[0]=$fH[0]; $H[1]=$pH[0];

header ("Content-type: image/png");
$im = @ImageCreate ($s*$z,$s*$z)
or die ("Cannot Initialize new GD image stream");

# reduced drawing functions
function dc($r,$g,$b) { global $im; return imagecolorallocate($im,$r,$g,$b); }
function dl($p1,$p2,$c) { global $im; imageline($im,$p1['0'],$p1['1'],$p2['0'],$p2['1'],$c); }
function dp($p,$rad,$c) { global $im; imagefilledellipse($im,$p['0'],$p['1'],$rad,$rad,$c); }
function dlg($p1,$p2) { global $im; global $g; imageline($im,$p1['0'],$p1['1'],$p2['0'],$p2['1'],$g); }

# colours initialization
$bgcolor=dc(255,255,255); $green=dc(0,190,0); $g=dc(150,150,150); $blue=dc(95,25,245); $black=dc(0,0,0); $red=dc(240,0,0);

imageellipse($im,$hs,$hs,($pH[0]-$hs)*2,($pH[0]-$hs)*2,$g);
imageellipse($im,$hs,$hs,($hP[1]-$hs)*2,($hP[1]-$hs)*2,$g);
imageellipse($im,$hs,$hs,($pA[0]-$hs)*2,($pA[0]-$hs)*2,$g);
imageellipse($im,$hs,$hs,($pB[0]-$hs)*2,($pB[0]-$hs)*2,$g);

imagefilledrectangle($im,0,0,$hs,$s*$z,$bgcolor);
imagefilledrectangle($im,0,0,$s*$z,$hs,$bgcolor);

dlg($fA,$fP); dlg($fB,$fH); dlg($pA,$pF);
dlg($pB,$pH); dlg($hA,$hP); dlg($hB,$hF);

imageline($im,$fA[0],$fA[1],$fA[0],$hs,$g); imageline($im,$fA[0],$fA[1],$hs,$fA[1],$g);
imageline($im,$fB[0],$fB[1],$fB[0],$hs,$g); imageline($im,$fB[0],$fB[1],$hs,$fB[1],$g);

imageline($im,$pA[0],$pA[1],$pA[0],$hs,$g); imageline($im,$pA[0],$pA[1],$hs,$pA[1],$g);
imageline($im,$pB[0],$pB[1],$pB[0],$hs,$g); imageline($im,$pB[0],$pB[1],$hs,$pB[1],$g);

imageline($im,$hA[0],$hA[1],$hA[0],$hs,$g); imageline($im,$hA[0],$hA[1],$hs,$hA[1],$g);
imageline($im,$hB[0],$hB[1],$hB[0],$hs,$g); imageline($im,$hB[0],$hB[1],$hs,$hB[1],$g);

dlg($H,$hP); dlg($H,$fH);
dlg($F,$fH); dlg($F,$fP);
dlg($P,$fP); dlg($P,$pF);

imageline ($im,$hF[0],$pF[1],$pF[0],$pF[1],$black);
imageline ($im,$hF[0],$pF[1],$hF[0],$hF[1],$black);
imageline ($im,$fP[0],$fP[1],$hP1[0],$fP[1],$black);
imageline ($im,$fH[0],$pH1[1],$fH[0],$fH[1],$black);
imageline ($im,$fH[0],$pH1[1],$pH1[0],$pH1[1],$black);
imageline ($im,$hP1[0],$hP1[1],$hP1[0],$fP[1],$black);

dl($fA,$fB,$blue); dl($pA,$pB,$blue); dl($hA,$hB,$blue);

imageline($im,$hs,0,$hs,$s*$z,$black);
imageline($im,0,$hs,$s*$z,$hs,$black);

dp($fA,$r,$blue); dp($fB,$r,$blue);
dp($pA,$r,$blue); dp($pB,$r,$blue);
dp($hA,$r,$blue); dp($hB,$r,$blue);

dp($fP,$r,$green); dp($fH,$r,$red);
dp($pF,$r,$green); dp($pH,$r,$green);
dp($hP,$r,$green); dp($hF,$r,$green);

dp($hP1,$r,$green); dp($pH1,$r,$green);

imagefilledellipse($im,$fA[0],$hs,$r,$r,$blue);
imagefilledellipse($im,$pA[0],$hs,$r,$r,$blue);
imagefilledellipse($im,$hA[0],$hs,$r,$r,$blue);

imagefilledellipse($im,$fB[0],$hs,$r,$r,$blue);
imagefilledellipse($im,$pB[0],$hs,$r,$r,$blue);
imagefilledellipse($im,$hB[0],$hs,$r,$r,$blue);

imagefilledellipse($im,$hs,$pA[0],$r,$r,$blue);
imagefilledellipse($im,$hs,$pB[0],$r,$r,$blue);

imagefilledellipse($im,$hs,$fA[1],$r,$r,$blue);
imagefilledellipse($im,$hs,$fB[1],$r,$r,$blue);

imagefilledellipse($im,$F[0],$F[1],$r,$r,$red);
imagefilledellipse($im,$H[0],$H[1],$r,$r,$red);
imagefilledellipse($im,$P[0],$P[1],$r,$r,$red);

imagestring($im,$t,10,10,'A('.$A[0].';'.$A[1].';'.$A[2].')',$black);
imagestring($im,$t,10,30,'B('.$B[0].';'.$B[1].';'.$B[2].')',$black);
imagestring($im,$t,10,70,'X='.$XMIN.'+'.$XMAX.'='.$SX,$black);
imagestring($im,$t,10,90,'Y='.$YMIN.'+'.$YMAX.'='.$SY,$black);

imagestring($im,$t,$fP[0]-$r,$fP[1]+$r,'fP',$black);
imagestring($im,$t,$fH[0]-$r,$fH[1]+$r,'fH',$black);
imagestring($im,$t,$pF[0]-$r,$pF[1]+$r,'pF',$black);
imagestring($im,$t,$pH[0]-$r,$pH[1]+$r,'pH',$black);
imagestring($im,$t,$hP[0]-$r,$hP[1]+$r,'hP',$black);
imagestring($im,$t,$hF[0]-$r,$hF[1]+$r,'hF',$black);

imagestring($im,$t,10,$s*$z-(($z*$s)*0.04),'github.com/flashbag',$black);

imagestring($im,$t,$F[0]+$r,$F[1]-$r,'F',$red);
imagestring($im,$t,$P[0]+$r,$P[1]-$r,'P',$red);
imagestring($im,$t,$H[0]+$r,$H[1]-$r,'H',$red);
imagepng ($im);
?>
