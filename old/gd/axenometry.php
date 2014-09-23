<?php
/**
 * Line Traces Axenometry Proection
 *
 * This file generate axenometry proection image by PHP-GD for line traces script
 * Written in early 2012, saved original code without refactoring
 * @author Oleg Kukil <flashbag.zvir@gmail.com>
 * @version 0.1
 */

# 90;75;10 30;50;45

if ($_GET['size']!=null) { $s=htmlspecialchars($_GET['size']); } else { $s=400; }
if ($_GET['zoom']!=null) { $z=htmlspecialchars($_GET['zoom']); } else { $z=1.5; }


if ($_GET['ax']!=null) { $cA[0]=htmlspecialchars($_GET['ax']); } else { $cA[0]=90; }
if ($_GET['ay']!=null) { $cA[1]=htmlspecialchars($_GET['ay']); } else { $cA[1]=75; }
if ($_GET['az']!=null) { $cA[2]=htmlspecialchars($_GET['az']); } else { $cA[2]=10; }

if ($_GET['bx']!=null) { $cB[0]=htmlspecialchars($_GET['bx']); } else { $cB[0]=30; }
if ($_GET['by']!=null) { $cB[1]=htmlspecialchars($_GET['by']); } else { $cB[1]=50; }
if ($_GET['bz']!=null) { $cB[2]=htmlspecialchars($_GET['bz']); } else { $cB[2]=45; }

# start basic values
$e=100; $t=5;


# clct helpful values
$k=(($s/$e)/2); $h=$s/2; $r=($s*$z)*0.015; $ht=(($s*$z)/5)*3; $hd=($s*$z)/10;
$O['0']=($s*$z)/2; $O['1']=$O['0']+(($s*$z)/10); $ky=($O['0']/10)*3; $kx=($O['0']/10)*5;

# functions
function _length($x1, $y1, $x2, $y2) {  $l=sqrt(pow((abs($x1-$x2)),2)+pow((abs($y1-$y2)),2)); return $l; }
function _equation($x1,$y1,$x2,$y2) { $b=($y2-(($x2*$y1)/$x1))/(1-$x2/$x1); $a=($y1-$b)/$x1; return array($a,$b); }
function _axis($cx,$cy,$x,$y,$xa) { list($a,$b)=_equation($cx,$cy,$x,$y); $axy=$a*$xa+$b;$axx=($axy-$b)/$a; return array($axx,$axy); }

function _plot($c,$len,$j){
	for ($i=0; $i<=$len; $i=$i+0.06){
		$dd=$c['0']+($i*$j);  $x=$c['0']+((($len/10)*5)*$j); $y=$c['1']+(($len/10)*3);
		$b=($y-(($x*$c['1'])/$c['0']))/(1-($x*1)/$c['0']); $a=($c['1']-$b)/$c['0']; $axy=($a*$dd)+$b; $axx=($axy-$b)/$a;
		$l=sqrt(pow((abs($axx-$c['0'])),2)+pow((abs($axy-$c['1'])),2));
		if (round($l,1)==$len) { break; }
	}
	$plot=array(round($axx,0),round($axy,0));
	return $plot;
}



# get axises coordinated
list($axisX['0'],$axisX['1'])=_axis($O['0'],$O['1'],$O['0']-$kx,$O['1']+$ky,0);
list($axisY['0'],$axisY['1'])=_axis($O['0'],$O['1'],$O['0']+$kx,$ht+$ky,$s*$z);

# convert main plots coordinates to image coordinate system
$efA=array($z*$h-($h-(($e-$cA['0'])*$k)),$z*$h-($h-(($e-$cA['2'])*$k)));
$efB=array($z*$h-($h-(($e-$cB['0'])*$k)),$z*$h-($h-(($e-$cB['2'])*$k)));
$ehA[0]=$z*$h-($h-(($e-$cA['0'])*$k)); $ehB[0]=$z*$h-($h-(($e-$cB['0'])*$k));
$epA[0]=$z*$h+((($e+$cA['1'])*$k)-$h); $epB[0]=$z*$h+((($e+$cB['1'])*$k)-$h);

$zA['0']=$zB['0']=$O['0']; $zA['1']=$efA['1']+$hd; $zB['1']=$efB['1']+$hd;

# get not axenometry lines lenghts
$lxA=_length($efA[0],$O[1],$O[0],$O[1]); $lyA=_length($epA[0],$O[1],$O[0],$O[1]);
$lxB=_length($efB[0],$O[1],$O[0],$O[1]); $lyB=_length($epB[0],$O[1],$O[0],$O[1]);
unset($efA, $efB, $ehA, $ehB, $epA, $epB);


# get axenometry plots coordinates
$xA=_plot($O,$lxA,-1);  $yA=_plot($O,$lyA,1);
$xB=_plot($O,$lxB,-1);  $yB=_plot($O,$lyB,1);

$fA=_plot($zA,$lxA,-1); $pA=_plot($zA,$lyA,1);
$fB=_plot($zB,$lxB,-1); $pB=_plot($zB,$lyB,1);
$hA=_plot($yA,$lxA,-1); $hB=_plot($yB,$lxB,-1);

$A=_plot($pA,$lxA,-1); $B=_plot($pB,$lxB,-1);

unset($lxA,$lyA,$lxB,$lyB);

# get equations of line proections and x,y axises
list($pa,$pb)=_equation($pA['0'],$pA['1'],$pB['0'],$pB['1']);
list($fa,$fb)=_equation($fA['0'],$fA['1'],$fB['0'],$fB['1']);
list($ha,$hb)=_equation($hA['0'],$hA['1'],$hB['0'],$hB['1']);

list($xa,$xb)=_equation($O[0],$O[1],$O[0]-$kx,$O[1]+$ky);
list($ya,$yb)=_equation($O[0],$O[1],$O[0]+$kx,$O[1]+$ky);


$fP['0']=$pF['0']=$O[0]; # x =  middle
$pF['1']=round($pa*$O[0]+$pb,0); # y = from equation
$fP['1']=round($fa*$O[0]+$fb,0); # y = from equation

# get proections of traces on axises from line proections
$fH['0']=intval(($xb-$fb)/($fa-$xa)); $fH['1']=intval($xa*$fH['0']+$xb);
$hF['0']=intval(($xb-$hb)/($ha-$xa)); $hF['1']=intval($xa*$hF['0']+$xb);

$pH['0']=intval(($yb-$pb)/($pa-$ya)); $pH['1']=intval($ya*$pH['0']+$yb);
$hP['0']=intval(($yb-$hb)/($ha-$ya)); $hP['1']=intval($ya*$hP['0']+$yb);

# pF & hF = F
# fH & pH = H
# fP & hP = P

$pFa[0]=$pF[0]+($kx/4); $pFa[1]=$pF[1]-($ky/4); # F
$fPa[0]=$fP[0]+($kx/4); $fPa[1]=$fP[1]+($ky/4); # P
$pHa[0]=$pH[0]+($kx/4); $pHa[1]=$pH[1]-($ky/4); # H
$fHa[0]=$fH[0]+($kx/4); $fHa[1]=$fH[1]+($ky/4); # H

list($pfa,$pfb)=_equation($pF['0'],$pF['1'],$pFa['0'],$pFa['1']); # F
list($fpa,$fpb)=_equation($fPa['0'],$fPa['1'],$fP['0'],$fP['1']); # P
list($pha,$phb)=_equation($pH['0'],$pH['1'],$pHa['0'],$pHa['1']); # H
list($fha,$fhb)=_equation($fH['0'],$fH['1'],$fHa['0'],$fHa['1']); # H

$P['0']=$hP['0'];	$P['1']=round($fpa*$P['0']+$fpb,0);
$F['0']=$hF['0'];	$F['1']=round($pfa*$F['0']+$pfb,0);
$H['0']=intval(($phb-$fhb)/($fha-$pha)); $H['1']=intval($pha*$H['0']+$phb);

$XMIN=1000000; $XMAX=0; $YMIN=1000000; $XMAX=0;

$els=array($fH,$fP,$pH,$pF,$hF,$hP,$F,$H,$P);

foreach($els as $el){
	foreach($els as $el){
		if ($el[0]<$XMIN) { $XMIN=$el[0]; }
		if ($el[0]>$XMAX) { $XMAX=$el[0]; }
		if ($el[1]<$YMIN) { $YMIN=$el[1]; }
		if ($el[1]>$YMAX) { $YMAX=$el[1]; }
	}
}
if ($pH[0]>$YMAX) { $YMAX=$pH[0]; }

$XMAX=round(($e-(($h-($XMAX-$z*$h))/$k)),0);
$YMAX=round(($e-(($h-($YMAX-$z*$h))/$k)),0)-(($s*$z)/20);
$XMIN=round(($e-(($h-($XMIN-$z*$h))/$k))*-1,0);
$YMIN=round(($e-(($h-($YMIN-$z*$h))/$k))*-1,0)+(($s*$z)/20);

$SX=$XMAX+$XMIN; $SY=$YMAX+$YMIN;


header ("Content-type: image/png");
$im = @ImageCreate ($s*$z, $s*$z)
or die ("Cannot Initialize new GD image stream");

# reduced drawing functions
function dc($r,$g,$b) { global $im; return imagecolorallocate($im,$r,$g,$b); }
function dl($p1,$p2,$c) { global $im; imageline($im,$p1['0'],$p1['1'],$p2['0'],$p2['1'],$c); }
function dp($p,$rad,$c) { global $im; imagefilledellipse($im,$p['0'],$p['1'],$rad,$rad,$c); }
function dlg($p1,$p2) { global $im; global $g; imageline($im,$p1['0'],$p1['1'],$p2['0'],$p2['1'],$g); }

# colours initialization
$bgcolor=dc(250,250,250); $green=dc(0,190,0); $g=dc(150,150,150); $blue=dc(95,25,245); $black=dc(0,0,0); $red=dc(240,0,0);

# drawing axis lines
imageline($im,$O[0],0,$O[0],$ht,$g);
dl($O,$axisX,$g); dl($O,$axisY,$g); unset($axisX, $axisY);


# drawing helpful gray lines
dlg($O,$fH); dlg($O,$pH); dlg($O,$pF); dlg($O,$hF); dlg($O,$hP); dlg($O,$fP);
dlg($fA,$A); dlg($pA,$A); dlg($hA,$A); dlg($fB,$B); dlg($pB,$B); dlg($hB,$B);

dlg($fA,$xA); dlg($fB,$xB); dlg($fA,$zA); dlg($fB,$zB);
dlg($pA,$yA); dlg($pB,$yB); dlg($pA,$zA); dlg($pB,$zB);
dlg($hA,$xA); dlg($hB,$xB); dlg($hA,$yA); dlg($hB,$yB);

dlg($pA,$pF); dlg($pB,$pF); dlg($fA,$fH); dlg($fB,$fH);
dlg($fA,$fP); dlg($fB,$fP); dlg($pA,$pH); dlg($pB,$pH);
dlg($hA,$hF); dlg($hB,$hF); dlg($hA,$hP); dlg($hB,$hP);

dl($pF,$F,$black); dl($hF,$F,$black); # pF & hF = F
dl($fH,$H,$black); dl($pH,$H,$black); # fH & pH = H
dl($fP,$P,$black); dl($hP,$P,$black); # fP & hP = P

dlg($hP,$H); dlg($hF,$H); # to H
dlg($pF,$P); dlg($pH,$P); # to P
dlg($fP,$F); dlg($fH,$F); # to F

dlg($A,$H); dlg($A,$F); dlg($A,$P); dlg($B,$H); dlg($B,$F); dlg($B,$P);

# drawing line proections and main line
dl($fA,$fB,$blue); dl($pA,$pB,$blue); dl($hA,$hB,$blue);  dl($A,$B,$red);

# drawing proection plots of line proection on axises
dp($xA,$r,$blue); dp($yA,$r,$blue); dp($zA,$r,$blue);
dp($xB,$r,$blue); dp($yB,$r,$blue); dp($zB,$r,$blue);

# drawing line proection plots; proection of main two plots
dp($fA,$r,$blue); dp($pA,$r,$blue); dp($hA,$r,$blue);
dp($fB,$r,$blue); dp($pB,$r,$blue); dp($hB,$r,$blue);

# drawing line proections plots on axises; proections of traces
dp($pF,$r,$green); dp($pH,$r,$green); dp($hP,$r,$green); #x
dp($fH,$r,$green); dp($fP,$r,$green); dp($hF,$r,$green); #y


# drawing main plots, traces plots and center plot
dp($A,$r+3,$red); dp($B,$r+3,$red); dp($O,$r-3,$black);
dp($F,$r+2,$red); dp($H,$r+2,$red); dp($P,$r+2,$red);


imagestring($im, $t, 10, 10, 'A('.$cA[0].';'.$cA[1].';'.$cA[2].')', $black);
imagestring($im, $t, 10, 30, 'B('.$cB[0].';'.$cB[1].';'.$cB[2].')', $black);


imagestring($im,$t,10,70,'X='.$XMIN.'+'.$XMAX.'='.$SX,$black);
imagestring($im,$t,10,90,'Y='.$YMIN.'+'.$YMAX.'='.$SY,$black);


imagestring($im,$t,10,$s*$z-(($z*$s)*0.04),'github.com/flashbag',$black);

imagestring($im, $t, $fP[0]-$r, $fP[1]+$r, 'fP', $black);
imagestring($im, $t, $fH[0]-$r, $fH[1]+$r, 'fH', $black);
imagestring($im, $t, $pF[0]-$r, $pF[1]+$r, 'pF', $black);
imagestring($im, $t, $pH[0]-$r, $pH[1]+$r, 'pH', $black);
imagestring($im, $t, $hP[0]-$r, $hP[1]+$r, 'hP', $black);
imagestring($im, $t, $hF[0]-$r, $hF[1]+$r, 'hF', $black);

imagestring($im,$t,$F[0]+$r,$F[1]-$r,'F',$red);
imagestring($im,$t,$P[0]+$r,$P[1]-$r,'P',$red);
imagestring($im,$t,$H[0]+$r,$H[1]-$r,'H',$red);

imagestring($im, $t, 10, 110, $bbb, $black);
imagepng($im); imagecolordeallocate($bgcolor); imagedestroy($im);

?>
