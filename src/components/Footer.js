import React from 'react'

const Footer = () => {
    return (
        <div className="bg-gray-500">
          <div className="h-16 px-8 flex items-center justify-center">
            <p className="text-white font-bold text-2xl">Meal Right</p>
          </div>
          <p className="text-white">
                Created by Bradley Hartlove for CS493<br></br>
                Meal Right does not express or represent the views of Regis University
            </p>
          <a className="text-white m-4" href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by kliwir art - Flaticon</a>
        </div>
      );
}

export default Footer