import { gql } from 'apollo-server';

export default gql`
    type Coffee {
        id: Int
        name: String!
        price: Int!
        currency: String
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        coffees: [Coffee]
        coffee(id: Int!): Coffee
    }
    type Mutation {
        createCoffee(name: String!, price: Int!, currency: String): Coffee
        deleteCoffee(id: Int!): Coffee
        updateCoffee(id: Int!, price: Int!): Coffee
    }
`;
