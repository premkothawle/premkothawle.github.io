import React from 'react'
import "./project-card.css"
function ProjectCard({project}) {
    return (
        <div className="project-card">
            <div className="project-info">
                <label className="project-title">{project.title}</label>
                <div className="project-links">
                    { project.demo && (
                    <a className="project-link" href={project.demo} target="_blank"  rel="noreferrer"  >
                        <div className="link-button">
                            <i class="fas fa-external-link-alt"></i>&nbsp;Live
                        </div>
                    </a> 
                    )}
                    { project.github && (
                    <a className="project-link" href={project.github} target="_blank"  rel="noreferrer" >
                        <div className="link-button">
                           <i class="fab fa-github"></i>&nbsp;Github
                        </div>
                    </a> 
                    )}
                </div>
                <p>{project.about}</p>
                <p>{project.achievements}</p>
                <div className="project-tags">
                    {project.tags.map( (tag) => {
                        return <label className="tag">{tag}</label>
                    })}
                </div>
            </div>
            <img src={project.image} className="project-image" alt={project.title}/>
        </div>
    )
}

export default ProjectCard
