import React from "react";

const Button = ({active,children,onClick,...others}) => {
    if (active){
        return <span {...others} className={['button','active'].concat(others.classNames).join(' ')}>{children}</span>
    }
    return <button {...others} onClick={onClick} className={['button'].concat(others.classNames).join(' ')} {...others}>{children}</button>;

};

export default Button