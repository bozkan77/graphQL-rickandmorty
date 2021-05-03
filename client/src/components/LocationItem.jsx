import React from "react";
// third party
import { Link } from "react-router-dom";

const LocationItem = ({ location }) => {
  const { id, name, type, dimension } = location;
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-6">
         <h4 className="text-info">{name}</h4>
        </div>
        <div className="col-md-6">
          <h4 class="tex-success">{type}</h4>
        </div>
        <div className="col-md-3">
          <h4>{dimension}</h4>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;