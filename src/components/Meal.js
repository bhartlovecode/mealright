import React from 'react'

const Meal = ({ imgsrc, mealName, description, tags, rating, poster }) => {
  return (
    <div className="mx-auto my-16 rounded-md border-2 shadow-xl w-10/12 hover:shadow-2xl hover:border-lime-500 h-fit hover:cursor-pointer">
      <div className="m-8">
        <img src={imgsrc} alt="Meal"/><br/><br/>
        <h2 className="m-6 truncate text-ellispis text-xl">{mealName}<br></br></h2>
        <p className="m-6 truncate text-ellipsis">{description}</p>
        <p>Tags:</p>
        <div className="truncate text-ellispis m-auto justify-items-center">
        {tags.map((tag) => (
          <div className="bg-lime-500 border-2 shadow-sm w-1/6 mx-auto my-2 text-white rounded-2xl inline-block">
            {tag}
          </div>
        ))} 
         </div>
         <div className="grid grid-cols-2">
            <h3 className="m-4 text-lg">Rating: {rating}</h3>
            <h3 className="m-4 text-lg">Poster: {poster}</h3>
         </div>
      </div>
    </div>
  )
}

export default Meal