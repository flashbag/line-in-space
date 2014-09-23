			<h1>
				<a id="title" href="./">Line Traces</a>
			</h1>
			<p>
				<b>Line Traces</b> - this is the graphic work if I am not mistaken it is present in the second year of the COP and other specialists who study computer graphics course at <a href="http://ifkepnung.if.ua/" target="_blank"> College of Electronic Devices . </a>
			</p>
			<p>
				You ahve three coordinates of two points. A and B, or C and D.
				In the space of these two points can be joined by straight line which will sooner or later crosses the coordinate planes.
				Where it crosses plane formed a line trace.
				The intersection of a single plane ( trace ) give two projections on the plane of the other two .
				The intersection of the frontal plane <i>F</i> ( trace <i>F</i>) gives a projection of the trace on the other two planes (<i>H</i> and <i>P</i>) ,
				trace <i>P</i> - on the plane <i>H</i> and <i> F </i>, trace <i> H </i> - on the plane <i> P </i> and <i> F </i>.

			</p>
			<p>
				The algorithm is implemented for constructing <b> php </b> using the library <b> gd </b> for picture theories.
			</p>
			<p>
				On the page there are two pictures on the left - axenometry proection , right - square proection .
			</p>
			<p class="img"><img src="img/line-traces.jpg"></p>
			<p>
				By defaults points are taken <i>А(90;75;10)</i> and <i>B(30;50;45)</i>.
				<b> size </b> - picture size , if zoom = 1 .
				<b> zoom </b> - change "remoteness" of the image.

				If the picture goes big and does not fit the image, you can zoom in and figure it far script .
				Image dimensions equal zoom multiplied by the specified size .
			</p>
			<p>
				At each of the images displayed coordinates for convenience outlets and natural size picture <i> (beta) </i>.
				The best option for building - size = 400 , zoom = 1.5 .
				At these sizes, natural size mainly displayed correctly.
				For large and giant sizes, natural size may be false .
				Natural dimensions listed in centimeters.
			</p>
			<p style="text-indent: 0; margin-left: 3%;">
				1 - width <br/>
				2 - the right of the center coordinates <br/>
				3 - general <br/>
				4 - height <br/>
				5 - left of center coordinates <br/>
			</p>
			<p class="img">
				<img src="img/sizes.jpg">
			</p>

			<p>Source Code (early 2012) - <a href="https://github.com/flashbag/line-traces">https://github.com/flashbag/line-traces</a></p>

			<p><a id="back2" href="http://works.flashbag.if.ua/line-traces" ><small>&laquo; back to building</small></a>