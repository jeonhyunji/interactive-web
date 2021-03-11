import './App.css';
import Card from './card/Card';
import { useState, useEffect } from 'react';
import * as fastColors from '@microsoft/fast-colors';

const radius = 800;
const angle = 12;

function App() {
	const [moveAngle, setMoveAngle] = useState(0);
	const [isMovable, setIsMovable] = useState(false);
	const [fromXY, setFromXY] = useState({x: 0, y: 0});
	const [circleXY, setCircleXY] = useState({
        x: (window.innerWidth / 2), 
		y: (window.outerHeight + window.outerHeight/5)
	});
	const [scale, setScale] = useState(1);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setCircleXY({
                x: (window.innerWidth / 2),
				y: (window.outerHeight + (window.outerHeight/5))
			});
			console.log("x: " + window.innerWidth + ", y: " + window.innerHeight);
			var scale = window.outerHeight/window.screen.height;
			setScale(scale);
		});
	}, []);
	
	const n = Math.floor(360 / angle);
	const cards = [];
    var cardAngle = 90;
    var colors = getCardColors(n);

	for (var i = 0; i < n; i++) {
        var color = colors[i];
		cards.push(
			<Card color={color} angle={cardAngle + moveAngle} circleX={circleXY.x} circleY={circleXY.y} radius={radius}/>
		);
		cardAngle += angle;
	}

	const onMouseDown = (ev) => {
		setIsMovable(true);
		setFromXY({
			x: ev.clientX,
			y: ev.clientY
		});
	};

	const onMouseMove = (ev) => {
		if (isMovable) {
			var toX = ev.clientX;
			var toY = ev.clientY;

			var fromAngle = radiansToDegrees(Math.atan2(circleXY.y - fromXY.y, fromXY.x - circleXY.x));
			var toAngle = radiansToDegrees(Math.atan2(circleXY.y - toY, toX - circleXY.x));

			var move = toAngle - fromAngle;
			setMoveAngle(moveAngle + move);
			setFromXY({
				x: ev.clientX,
				y: ev.clientY
			});
		}
	};

	const onMouseUp = () => {
		setIsMovable(false);
	};

	return (
		<div className="App" 
			style={{transform: "scale(" + scale + ")", position:"fixed"}}
			onMouseDown={(ev) => onMouseDown(ev)} 
			onMouseMove={(ev) => onMouseMove(ev)} 
			onMouseUp={() => onMouseUp()}>
            <h1 align="center" className="Text-logo">
                Rotate the card
            </h1>
			{cards}
		</div>
	);
}

function radiansToDegrees(radians) {
	var pi = Math.PI;
	return radians * (180 / pi);
}

function getCardColors(n) {
    const color1 = fastColors.parseColorHexRGB("#CC95C0");
    const color2 = fastColors.parseColorHexRGB("#DBD4B4"); 
    const color3 = fastColors.parseColorHexRGB("#7AA1D2");

    var n1 = n/2;
    var n2 = n-n1;
    var colors = getGradientColors(n1, color1, color2);
    colors = colors.concat(getGradientColors(n2, color2, color3));

    return colors;
}

function getGradientColors(num, left, right) {
    var colors = [];

    for (var i = 0; i < num; i++) {
        var position = 1/num * i;
        var colorRgb = fastColors.interpolateRGB(position, left, right);
        var hexStr = colorRgb.toStringHexRGB();
        colors.push(hexStr);
    }

    return colors;
}

export default App;