import React from 'react'
import { ProjectData } from '../../../data/projects'
import ProjectCard from './project-card';
import "./projects.css"
function Projects() {
    const data=ProjectData;
    return (
        <div className="projects">
            <label className="title"> <u>Projects</u> </label>
            <div>
                {data.map((project) => {
                    return <ProjectCard project={project}/>
                })}
            </div>
           
        </div>
    )
}

export default Projects
