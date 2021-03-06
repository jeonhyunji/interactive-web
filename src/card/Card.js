import './Card.css';
// import { useState } from 'react';

const cardWidth = 200;
const cardHeight = 300;

function Card({ color, angle, circleX, circleY, radius }) {
    const posX = Math.floor(Math.cos(degreesToRadians(angle)) * radius);
    const posY = - Math.floor(Math.sin(degreesToRadians(angle)) * radius);
    const translateX = circleX + posX - (cardWidth / 2);
    const translateY = circleY + posY - (cardHeight / 2);
    const rotateDeg = 90 - angle;

    const scaleValue = ( 85 < angle%360 && angle%360 < 95) ? 1.05 : 1;
    const transformValue = "translate3d(" + translateX + "px, "
        + translateY + "px, 0px) rotate(" + rotateDeg + "deg) scale("
        + scaleValue + ")";
    return (
        <div className="card-items"
            style={{
                position: "fixed",
                backgroundColor: color, 
                transform: transformValue,
                border: "1px solid",
                borderColor: color,
                zIndex: ( 80 < angle%360 && angle%360 < 100) ? 100 : 0  
            }}>
        </div>
    );
}


function degreesToRadians(degrees) {
    const pi = Math.PI;
    return degrees * (pi / 180);
}

export default Card;