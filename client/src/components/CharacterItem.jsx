import React from "react";
// third party
import { Link } from "react-router-dom";

const CharacterItem = ({ character, none }) => {
  const { id, name, status, gender, image } = character;
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-3">
          <img src={image} className="card__img" alt={name} />
        </div>
        <div className="col-md-4 title-container">
          <h4>{name}</h4>
        </div>
        <div className="col-md-5 button-container">
          {none === false ?  
            <Link className="btn btn-primary" to={`/character/${id}`}>Detay</Link>
            : <div className="col-md-6">
                <span className="col-md-2">{gender}</span>
                <spna className="">{status}</spna>
            </div>
          }
          </div>
      </div>
    </div>
  );
};

export default CharacterItem;
