import React from 'react'
import './body.css'
import Main from './main/main'
import About from './about/about'
import Projects from './projects/projects'
import Skills from './skills/skills'

function Body() {
    return (
        <div className="body">
            <section id="main">
                <Main/>
            </section>
            
            <section id="about">
                <About/>
            </section >
            <section id="skills">
                <Skills/>
            </section>
            <section id="projects">
                <Projects/>
            </section>
        </div>
    )
}

export default Body
