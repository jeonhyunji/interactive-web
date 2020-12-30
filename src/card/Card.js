import {useState} from 'react';
import './Card.css';

function Card({color, translateX}) {
    const [flag, setFlag] = useState(false);

    const onMouseOver = () => setFlag(true);
    const onMouseOut = () => setFlag(false);

    return (
        <div className="card-items" 
            style={{
                backgroundColor:color, transform: "translate3d(" + translateX + "px, 100px, 0px)",
                zIndex: flag ? 100 : 0,
                scale: flag ? 1.2: 1
            }}
            onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        </div>
    );
    
  }
  
  export default Card;