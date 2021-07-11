import React from 'react'
import { SkillData } from '../../../data/skills'
import SkillCard from './skill-card'
import "./skills.css"
function Skills() {
    const data = SkillData
    return (
        <div>
            <label className="title"> <u> Skills</u></label>
            <div className="skills-container">
                {data.map((item) => {
                return(
                    <div className="skills-section">
                        <label className="skill-type">{item.type}</label>
                        <div className="skills-list">
                            {item.list.map((skill)=> {
                                return(
                                    <SkillCard skill={skill}/>
                                )
                            })}
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
    )
}

export default Skills
