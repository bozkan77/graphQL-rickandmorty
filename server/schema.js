import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} from "graphql";
import axios from "axios";

const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    status: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    dimension: { type: GraphQLString },
    residents: { type: GraphQLList(GraphQLString) },
  }),
});

const InfoType = new GraphQLObjectType({
  name: "Info",
  fields: () => ({
    pages: { type: GraphQLInt },
    next: { type: GraphQLString },
    prev: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    characters: {
      type: new GraphQLList(CharacterType),
      args: {
        page: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://rickandmortyapi.com/api/character/?page=${args.page}`)
          .then((res) => res.data.results);
      },
    },
    characterInfo: {
      type: InfoType,
      args: {
        page: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://rickandmortyapi.com/api/character/?page=${args.page}`)
          .then((res) => res.data.info);
      },
    },
    character: {
      type: CharacterType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://rickandmortyapi.com/api/character/${args.id}`)
          .then((res) => res.data);
      },
    },
    locations: {
      type: new GraphQLList(LocationType),
      args: {
        page: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://rickandmortyapi.com/api/location?page=${args.page}`)
          .then((res) => res.data.results);
      },
    },
    locationInfo: {
      type: InfoType,
      args: {
        page: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://rickandmortyapi.com/api/location?page=${args.page}`)
          .then((res) => res.data.info);
      },
    },
  }),
});

export default new GraphQLSchema({
  query: RootQuery,
});
