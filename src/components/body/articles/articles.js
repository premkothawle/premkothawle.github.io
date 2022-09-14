import React from 'react'
import ArticleCard from './article-card'
import { ArticleData } from '../../../data/articles'

function Articles() {
  const data = ArticleData 
  return (
    <div className="articles">
        <label className="title"> <u>Articles</u> </label>
        <br /><br />
        <div>
                {data.map((article) => {
                    return <ArticleCard article={article}/>
                })}
            </div>
    </div>
  )
}

export default Articles