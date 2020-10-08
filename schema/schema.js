const {ApolloServer, gql} = require('apollo-server-express');

module.exports = gql`
  scalar JSON
  scalar Array
  scalar TimeStamp

  type Query {
    getRole(id:Int): [Role],
    getProduct(id:Int):[Product],
    getBundle(id:Int):[Bundle],
    getUser(id:Int):[User],

  }

  type Mutation {
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


    
  }

  type User { id: Int, name: String, email:String , password:String , role_id:Int ,createdAt: TimeStamp, updatedAt: TimeStamp }
  type Role { id: Int, name: String, createdAt: TimeStamp, updatedAt: TimeStamp }
  type Product { id:Int, name: String, description:String, image:String, price:Int, createdAt: TimeStamp, updatedAt: TimeStamp}
  type Bundle { id: Int, name: String, createdAt: TimeStamp, updatedAt: TimeStamp }
`;