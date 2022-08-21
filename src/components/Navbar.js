import React from "react";

import 'firebase/compat/auth';

const Navbar = ( {userName } ) => {

  var authed = false;
  if (userName !== ""){
    authed = true;
  }

  return (
    <div className="bg-gray-500">
      <div className="h-16 px-8 grid grid-cols-3 items-center">
        <div></div>
        <a className="text-white font-bold text-2xl justify-self-center" href="/mealList" >Meal Right</a>
        {
          authed ? (
            <div className="mr-4 justify-self-end items-center flex">
              <img className="inline-block mr-2" src="/account.png" alt="Profile"></img>
              <p className="text-white font-bold text-2xl inline-block">{userName}</p>
            </div>
          ) : <div/>
        }
      </div>
    </div>
  );
};

export default Navbar;