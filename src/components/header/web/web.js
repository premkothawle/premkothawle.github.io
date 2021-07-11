import React from 'react'
import "./web.css"

function Web() {
    return (
        <div className="web">
            <div className="web-option">
                <a href="#skills">
                    <i class="fi-rr-book-alt option-icon"></i>Skills
                </a>
            </div>
            <div className="web-option">
                <a href="#projects">
                    <i class="fi-rr-laptop option-icon"></i>Projects
                </a>
            </div>
        </div>
    )
}

export default Web
