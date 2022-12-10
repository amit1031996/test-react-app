import React, { useEffect,useState } from 'react';


const Jitter =(props) =>{

   
    const [render,setrender] = useState([]);
useEffect(()=>{

    if(props.children && props.children.length > 0){
        let renderer = [];
        for(let i = 0; i<= props.children.length; i++){
            debugger;
            let char = props.children.charAt(i);
            renderer.push(
                <span className={`animate- ${props.css}`}>
                    {char}
                </span>
            )
        }
        setrender(renderer)
    }
},[props.children,props.css])
    

    return(
        <span>
            {render}
        </span>
    );

}

export default Jitter;