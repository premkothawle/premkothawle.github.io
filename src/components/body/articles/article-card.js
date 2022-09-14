import React from 'react'

function ArticleCard({article}) {
  return (
    <div>
        <label className="project-title">{article.title}</label>
        <div className="project-links">
            <a className="project-link" href={article.link} target="_blank"  rel="noreferrer"  >
                        <div className="link-button">
                            <i class="fas fa-external-link-alt"></i>&nbsp; {article.platform}
                        </div>
                    </a> 
        </div>
        <p>{article.description}</p>
    </div>
  )
}

export default ArticleCard