import React, { useState } from "react";
// third party libraries
import gql from "graphql-tag";
import { Query } from "react-apollo";
//ccustom components
import CharacterItem from "./CharacterItem";

const CHARACTER_QUERY = gql`
  query charactersQuery($page: Int!) {
    characters(page: $page) {
      id
      name
      gender
      status
      image
    }
  }
`;

const CHARACTERINFO_QUERY = gql`
  query characterInfoQuery($page: Int!) {
    characterInfo(page: $page) {
      pages
      next
      prev
    }
  }
`;

const Characters = () => {
  const [page, setPage] = useState(1);

  const gotoFirstPage = () => {
    setPage(1);
  };

  const gotoPrevPage = (prev) => {
    if (prev != null) {
      setPage((page) => page - 1);
    }
  };

  const gotoNextPage = (next) => {
    if (next != null) {
      setPage((page) => page + 1);
    }
  };

  const gotoLastPage = (pages) => {
    setPage(pages);
  };

  return (
    <>
      <h1 className="my-3">Karakterler</h1>
      <Query query={CHARACTERINFO_QUERY} variables={{ page }}>
        {({ loading, error, data }) => {
          if (error) console.error(error);
          return (
            <>
              <button
                className="btn btn-info m-3"
                onClick={() => gotoFirstPage()}
              >
                İlk Sayfa
              </button>
              <button
                className="btn btn-outline-danger m-3"
                onClick={() => gotoPrevPage(data.characterInfo.prev)}
              >
                Önceki Sayfa
              </button>
              <button
                className="btn btn-outline-danger m-3"
                onClick={() => gotoNextPage(data.characterInfo.next)}
              >
                Sonraki Sayfa
              </button>
              <button
                className="btn btn-info m-3"
                onClick={() => gotoLastPage(data.characterInfo.pages)}
              >
                Son Sayfa
              </button>
            </>
          );
        }}
      </Query>

      <Query query={CHARACTER_QUERY} variables={{ page }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Yükleniyor...</h4>;
          if (error) console.error(error);
          console.log(data)
          return (
            <>
              {data.characters.map((character) => (
                <CharacterItem key={character.id} character={character} none={false} />
              ))}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Characters;
