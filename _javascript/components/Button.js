import React from "react";

const Button = ({active,children,...others}) => {
    if (active){
        return <span {...others} disabled="disabled" className={['button','active'].concat(others.classNames).join(' ')}>{children}</span>
    }
    return <button {...others} className={['button'].concat(others.classNames).join(' ')} {...others}>{children}</button>;

};

export default Button