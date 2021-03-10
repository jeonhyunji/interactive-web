// import logo from './logo.svg';
import './App.css';
import Card from './card/Card';
import { useState, useEffect } from 'react';

const radius = 800;
const angle = 12;

function App() {
	const [moveAngle, setMoveAngle] = useState(0);
	const [isMovable, setIsMovable] = useState(false);
	const [fromXY, setFromXY] = useState({x: 0, y: 0});
	const [circleXY, setCircleXY] = useState({
		x: (window.innerWidth / 2), 
		y: (window.outerHeight + window.outerHeight/5*2)
	});
	const [scale, setScale] = useState(1);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setCircleXY({
				x: (window.innerWidth / 2), 
				y: (window.outerHeight + (window.outerHeight/5*2))
			});
			console.log("x: " + window.innerWidth + ", y: " + window.innerHeight);
			var scale = window.outerHeight/window.screen.height;
			setScale(scale);
		});
	}, []);
	
	const n = Math.floor(360 / angle);
	const cards = [];
	var cardAngle = 90;
	for (var i = 0; i < n; i++) {
		var color;
		if (i === 0) {
			color = "red";
		} else {
			color = "green";
			if (i % 2 === 1)
				color = "green";
			else
				color = "yellow";
		}
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
			{cards}
		</div>
	);
}

function radiansToDegrees(radians) {
	var pi = Math.PI;
	return radians * (180 / pi);
}

export default App;