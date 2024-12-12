import React, { useState } from "react";
import "./../../assets/styles/global.css";

function Accordion({ children, className = "", accordionTitle = "", ...props }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`accordionWrapper ${className}`} {...props}>
            <button className="accordionButton" onClick={toggleAccordion}>
                {accordionTitle}
            </button>
            <div
                className="accordionPanel"
                style={{ display: isOpen ? "block" : "none" }}
            >
                {children}
            </div>
        </div>
    );
}

export default Accordion;
