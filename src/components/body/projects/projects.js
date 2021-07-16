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
            <div className="all-projects">
                <center>
                <a href="https://projectsbay.herokuapp.com/user/prem">
                    &nbsp; View All On ProjectsBay &nbsp;
                </a>
                
                </center>
            </div>
        </div>
    )
}

export default Projects
