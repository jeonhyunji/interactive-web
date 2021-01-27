// import logo from './logo.svg';
import './App.css';
import Card from './card/Card';
import { useState } from 'react';

const radius = 400;
const circleX = 100 + radius;
const circleY = 200 + radius;
const angle = 20;

function App() {
	const [moveAngle, setMoveAngle] = useState(0);
	const [isMovable, setIsMovable] = useState(false);
	const [fromXY, setFromXY] = useState({x: 0, y: 0});

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
			<Card color={color} angle={cardAngle + moveAngle} circleX={circleX} circleY={circleY} radius={radius}/>
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

			var fromAngle = getAngle(fromXY.x, fromXY.y);
			var toAngle = getAngle(toX, toY);

			var move = 0;
			// move right
			if (toAngle > fromAngle) {
				move = toAngle - fromAngle;
			} else { // move left
				move = - (fromAngle - toAngle);
			}
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
		<div className="App" onMouseDown={(ev) => onMouseDown(ev)} 
			onMouseMove={(ev) => onMouseMove(ev)} 
			onMouseUp={() => onMouseUp()}>
			{/* <div>move: {moveAngle}</div> */}
			{/* <div className="test-circle"></div> */}
			{/* <div className="center"></div> */}
			<div style={{display: 'inline-block', width: "1000px", height: "1000px", marginTop: "200px"}}>
				{cards}
			</div>
		</div>
	);
}

function getAngle(x, y) {
	return radiansToDegrees(Math.atan2(circleY - y, x - circleX));
}

function radiansToDegrees(radians) {
	var pi = Math.PI;
	return radians * (180 / pi);
}

export default App;