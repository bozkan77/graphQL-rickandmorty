import React from 'react'
// third party libraries
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {Link, useParams} from "react-router-dom";
// custom components
import CharacterItem from './CharacterItem';

const CHARACTER_QUERY = gql`
  query characterQuery($id: Int!) {
    character(id: $id) {
      id
      name
      gender
      status
      image
    }
  }
`;

const Character = () => {

  const params = useParams()
  const id = parseInt(params.id)

  return (
    <>
    <Query query={CHARACTER_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Yükleniyor...</h4>;
          if (error) console.error(error);
          const {character} = data;
          console.log(character)
           return (
            <>
              <h2>{character.name}</h2>
              <CharacterItem character={character} none={true} />
              <Link className="btn btn-primary mt-3" to={'/'}>Geri dön</Link>
            </>
          );
        }}
      </Query>
    </>
  )
}

export default Character