import { gql } from 'apollo-server-express';

export default gql`
    type CoffeeShopPhoto {
        id: Int
        url: String
        shop: CoffeeShop
    }
    type CoffeeShop {
        id: Int!
        name: String!
        latitude: String
        longitude: String
        user: User!
        photo: CoffeeShopPhoto # ëíėŽė§
        photos: [CoffeeShopPhoto]
        categories: [Category]
        isMine: Boolean!
    }
    type Category {
        id: Int
        name: String!
        slug: String
        shops: [CoffeeShop]
        totalShops: Int!
    }
`;
