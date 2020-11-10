import facade from "./apiFacade";
import React, { useState, useEffect } from 'react';

function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Error!")
    
    // useEffect(() => {
    //   facade.fetchData().then(data=> setDataFromServer(data.msg));
    // }, [])
   
    return (
      <div>
        <h2>Logged in!</h2>
        {/* <h3>{dataFromServer}</h3> */}
      </div>
    )
   
  }

  export default LoggedIn;