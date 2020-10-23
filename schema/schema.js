const {ApolloServer, gql} = require('apollo-server-express');

module.exports = gql`
  scalar JSON
  scalar Array
  scalar TimeStamp

  type Query {
    getRole: [Role!]!,
    getProduct(id:Int):[Product],
    getBundle(id:Int):[Bundle],
    getUser(id:Int):[User],
    getBundle_Product(id:Int):[Bundle_Product],

  }

  type Mutation {
      userLogin (
          email:String!,
          password:String!
      ):LoginResponse!,
    addUser (
        name:String,
        email:String,
        password:String,
        role_id:Int

    ):User,

    addRole (
        name: String
    ): Role,

    addProduct(
        name: String,
        description: String,
        image:String,
        price:Int
    ): Product,

    addBundle (
        name: String
    ): Bundle,

    addBundle_Product (
        product_id:Int,
        bundle_id:Int
    ): Bundle_Product,

    deleteUser(
        id: Int
    ): User,

    deleteRole(
        id: Int
    ): Role,

    deleteProduct(
        id: Int
    ): Product,

    deleteBundle(
        id: Int
    ): Bundle,

    deleteBundle_Product(
        id:Int
    ): Bundle_Product,

    updateProduct(
        name:String,
        description:String,
        image:String,
        price:Int,
        id: Int

    ): Product,

    updateBundle(
        name:String,   
        id: Int

    ): Bundle,

    updateUser(
        name:String,
        email:String,
        password:String,
        role_id:Int,
        id: Int

    ): User,

    updateRole(
        name:String,   
        id: Int

    ): Role,

    updateBundle_Product (
        product_id:Int,
        bundle_id:Int,
        id:Int
    ): Bundle_Product,


    
  }

  type User { id: Int, name: String, email:String , password:String , role_id:Int ,role:Role,createdAt: TimeStamp, updatedAt: TimeStamp }
  type Role { id: Int, name: String, createdAt: TimeStamp, updatedAt: TimeStamp }
  type Product { id:Int, name: String, description:String, image:String, price:Int, createdAt: TimeStamp, updatedAt: TimeStamp}
  type Bundle { id: Int, name: String, createdAt: TimeStamp, updatedAt: TimeStamp }
  type Bundle_Product { id:Int, product_id:Int, bundle_id:Int,product:Product,bundle:Bundle createdAt: TimeStamp, updatedAt: TimeStamp }
 type LoginResponse {
    token: String,
    email:String,
    name:String
    
  }
`;