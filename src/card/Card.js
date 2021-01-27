import './Card.css';
// import { useState } from 'react';

const cardWidth = 200;
const cardHeight = 300;

function Card({ color, angle, circleX, circleY, radius }) {
    // const [focus, setFocus] = useState(false);

    const posX = Math.floor(Math.cos(degreesToRadians(angle)) * radius);
    const posY = - Math.floor(Math.sin(degreesToRadians(angle)) * radius);
    const translateX = circleX + posX - (cardWidth / 2);
    const translateY = circleY + posY - (cardHeight / 2);
    // const rotateDeg = - (angle - 90);
    const rotateDeg = 90 - angle;

    // const scaleValue = (focus) ? 1.1 : 1;
    const scaleValue = 1;
    const transformValue = "translate3d(" + translateX + "px, "
        + translateY + "px, 0px) rotate(" + rotateDeg + "deg) scale("
        + scaleValue + ")";

    // const onMouseOver = () => {
    //     setFocus(true);
    // };

    // const onMouseOut = () => {
    //     setFocus(false);
    // };

    return (
        <div className="card-items"
            style={{
                backgroundColor: color, 
                transform: transformValue,
                // zIndex: (focus) ? 100 : 0
                zIndex: ( 80 < angle%360 && angle%360 < 100) ? 100 : 0  
            }}>
            {/* {angle} */}
            {/* onMouseOver={() => onMouseOver()} onMouseOut={() => onMouseOut()}> */}
        </div>
    );
}


function degreesToRadians(degrees) {
    const pi = Math.PI;
    return degrees * (pi / 180);
}

export default Card;