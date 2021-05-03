import React, { useState } from "react";
// third party libraries
import gql from "graphql-tag";
import { Query } from "react-apollo";
//ccustom components
import LocationItem from "./LocationItem";

const LOCATION_QUERY = gql`
  query locationQuery($page: Int!) {
    locations(page: $page) {
      id
      name
      type
      dimension
    }
  }
`;

const LOCATIONINFO_QUERY = gql`
  query locationInfoQuery($page: Int!) {
    locationInfo(page: $page) {
      pages
      next
      prev
    }
  }
`;

const Locations = () => {
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
      <h1 className="my-3">Konumlar</h1>
      <Query query={LOCATIONINFO_QUERY} variables={{ page }}>
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
                onClick={() => gotoPrevPage(data.locationInfo.prev)}
              >
                Önceki Sayfa
              </button>
              <button
                className="btn btn-outline-danger m-3"
                onClick={() => gotoNextPage(data.locationInfo.next)}
              >
                Sonraki Sayfa
              </button>
              <button
                className="btn btn-info m-3"
                onClick={() => gotoLastPage(data.locationInfo.pages)}
              >
                Son Sayfa
              </button>
            </>
          );
        }}
      </Query>

      <Query query={LOCATION_QUERY} variables={{ page }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Yükleniyor...</h4>;
          if (error) console.error(error);
          console.log(data)
          return (
            
            <>
              {data.locations.map((location) => (
                <LocationItem key={location.id} location={location} />
              ))}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Locations;
