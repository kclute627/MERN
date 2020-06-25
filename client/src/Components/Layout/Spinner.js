import React, { Fragment } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default () => {
  
  return (
    <Fragment>
      <ClipLoader
        style={{display: "block",
            width:" 200px",
            margin: "auto"}}
       
        size={150}
        color={"#123abc"}
        
      />
    </Fragment>
  );
};
