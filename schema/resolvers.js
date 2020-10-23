//const roless = require("../models/role_master");
//const users = require("../models/user_master");
const models=require("../models/index");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

//import { combineResolvers } from 'graphql-resolvers';
//const { isAuthenticated } = require("../Middleware/auth");
const UserInputError = require('apollo-server');
//const { checkToken } = require("../Middleware/auth");
var async = require("async");
const validator = require('validator');
const sequelize = require('sequelize');


module.exports = {
    Query: {
        getRole: async (parent, args, {models,user}) => {
            try {
                if(user){
                let where = {}
                if(args.id !== undefined && args.id !== ''){
                    where = {id: args.id}
                }

                   console.log(user);
                const role = await models.role_master.findAll({where: where})
                
                return role;
            
         
            
         //  return await models.role_msater.findAll();
            } 
            } catch (error) {
                console.log(error);
                
            }
        },
        getUser: async (parent, args, context) => {
            try {
                

                
                let where = {}
                if (args.id !== undefined && args.id !== '') {
                    where = {id: args.id}
                }

                const User = await models.user_master.findAll({
                    include: [
                        {
                            model: models.role_master, as: "role"
                        }
                    ],
                    where: where
                });
                return User
            
            } catch (error) {
                console.log("Error");
            }
        },
        
        
        
    


        getProduct: async (parent, args, context) => {
            try {
                let where = {}
                if(args.id !== undefined && args.id !== ''){
                    where = {id: args.id}
                }

                return await models.product_master.findAll({
                    where: where
                })
            } catch (error) {
                console.log("Error");
            }
        },
        getBundle: async (parent, args, context) => {
            try {
                let where = {}
                if(args.id !== undefined && args.id !== ''){
                    where = {id: args.id}
                }

                return await models.bundle_master.findAll({
                    where: where
                })
            } catch (error) {
                console.log("Error");
            }
        },

        getBundle_Product: async (parent, args, context) => {
            try {
                let where = {}
                if (args.id !== undefined && args.id !== '') {
                    where = {id: args.id}
                }

                const bundle = await models.tbl_bundle_product.findAll({
                    include: [
                        {
                            model: models.product_master, as: "product"
                        },
                        {
                            model: models.bundle_master, as: "bundle",
                        }
                    ],
                    where: where
                });
                return bundle
            } catch (error) {
                console.log("Error");
            }
        },


    },
    Mutation : {

        userLogin: async (parent, args,context) => {
            try {
                
               
                if (args.email === ''|| args.email === undefined) {
                    throw new Error("Name Required");
                }

                if (args.password === ''||args.password === undefined) {
                    throw new Error("Password Required");
                }
            
                
                const users = await models.user_master.findOne({ where: { email: args.email} })
                
                
                if (!users) {
                    throw new Error('No such user found');
                    //throw new UserInputError('No User Found');
                  //console.log("No such user found");
                }
                const valid = await bcrypt.compare(args.password, users.password)
                if(!valid){
                    throw new Error("Invalid Password");
                    
                }
                else{
                    console.log("Successful login");
                    var token = jwt.sign({ userId: users.id}, process.env.SECRET ,{expiresIn:'1h'});
                    console.log(token);
                    return {token,email:users.email,name:users.name}
                }
               
                } catch (error) {
                    
                    throw new Error(error.message);
                    
                    
            }
        },

        addUser: async (parent, args, context) => {
            try {
               
                if (args.name === ''||args.name === undefined) {
                    throw new Error("Name Required");
                }
                
                if (args.email === ''|| args.email === undefined) {
                    throw new Error("Email Required");
                }

                if (args.password === ''||args.password === undefined) {
                    throw new Error("Password Required");
                }

                if (args.password.length < 8){
                    throw new Error("Please Enter 8 Characters");
                }
                if ( args.role_id === '' ||args.role_id === undefined) {
                    throw new Error("Role Required");
                }
                const password = await bcrypt.hash(args.password, 10)

                let result = await models.user_master.findOne({where: {email: args.email}})
                if(result) {
                    throw new Error("User Already Exist");
                } else {

                    let User = await models.user_master.create({
                        name: args.name,
                        email:args.email,
                        password,
                        role_id:args.role_id
                        
                    });

                    return User;
                }
            } catch (error) {
                throw new Error(error.message);
               // console.log("Error");
            }
        },


        addRole: async (parent, args, context) => {
            try {
               
                if (args.name === ''||args.name === undefined) {
                    throw new Error(" Name Required");
                }
                let result = await models.role_master.findOne({where: {name: args.name}})
                if(result) {
                    throw new Error("Already Exist");
                } else {

                    let role = await models.role_master.create({
                        name: args.name,
                        //created_by: context.userData.user.id
                    });

                    return role;
                }
            } catch (error) {
                throw new Error(error.message);
                
            }
        },
        addProduct: async (parent, args, context) => {
            try {
               
                if (args.name === '' ||args.name === undefined) {
                    throw new Error("Name Required");
                }
                
                if (args.description === '' || args.description === undefined) {
                    throw new Error("Description Required");
                }

                if (args.price === '' || args.price === undefined) {
                    throw new Error("Price Required");
                }

                let result = await models.product_master.findOne({where: {name: args.name}})
                if(result) {
                    throw new Error("Already Exist");
                } else {

                    let product = await models.product_master.create({
                        name: args.name,
                        description:args.description,
                        image:args.image,
                        price:args.price
                        
                    });

                    return product;
                }
            } catch (error) {
                
                throw new Error(error.message);
            }
        },

        addBundle: async (parent, args, context) => {
            try {
               
                if (args.name === ''|| args.name === undefined) {
                    throw new Error("Name Required");
                }

                let result = await models.bundle_master.findOne({where: {name: args.name}})
                if(result) {
                    throw new Error("Already Exist");
                } else {

                    let bundle = await models.bundle_master.create({
                        name: args.name,
                        
                    });

                    return bundle;
                }
            } catch (error) {
                
                throw new Error(error.message);
            }
        },

        addBundle_Product: async (parent, args, context) => {
            try {
               
                if (args.product_id === ''||args.product_id === undefined) {
                    throw new Error("Productid Required");
                }
                if (args.bundle_id=== ''||args.bundle_id === undefined) {
                    throw new Error("Bundleid Required");
                }

                const bundlepro = await models.tbl_bundle_product.findOne({where:{product_id :args.product_id , bundle_id:args.bundle_id}})
                if (bundlepro)
                {
                    throw new Error("Alredy Exixts");
                }
                else{
                    let bundle_product = await models.tbl_bundle_product.create({
                        product_id: args.product_id,
                        bundle_id: args.bundle_id
                        
                    });

                    return bundle_product;
                }
                
            } catch (error) {
                throw new Error(error.message);
            }
        },


        deleteUser: async (parent, args, context) => {
            try {
               
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }

                let result = await models.user_master.findByPk(args.id)

                if (!result) {
                    throw new Error("Not Exist");
                } else {

                    let user = await models.user_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return user;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deleteRole: async (parent, args, context) => {
            try {
               
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }

                let result = await models.role_master.findByPk(args.id)

                if (!result) {
                    throw new Error("Not Exist");
                } else {

                    let role = await models.role_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return role;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deleteProduct: async (parent, args, context) => {
            try {
               
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }

                let result = await models.product_master.findByPk(args.id)

                if (!result) {
                    throw new Error("Not Exist");
                } else {

                    let product = await models.product_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return product;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deleteBundle: async (parent, args, context) => {
            try {
               
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }

                let result = await models.bundle_master.findByPk(args.id)

                if (!result) {
                    throw new Error("Not Exist");
                } else {

                    let bundle = await models.bundle_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return bundle;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },

        deleteBundle_Product: async (parent, args, context) => {
            try {
               
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }

                let result = await models.tbl_bundle_product.findByPk(args.id)

                if (!result) {
                    throw new Error("Not Exist");
                }else {
                
                    let bundle_product = await models.tbl_bundle_product.destroy({
                        where: {
                            id: args.id
                        }
                        
                    });

                    return bundle_product;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },

        updateUser: async (parent, args, context) => {
            try {
               
                
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }
                
                
                let userData = await models.user_master.findByPk(args.id)
               
                if (!userData) {
                    throw new Error("Not Exist");
                } 
                const password = await bcrypt.hash(args.password, 10)

                await models.user_master.update(
                        {name : args.name || userData.name,
                         email : args.email || userData.email,
                         password,
                         role_id : args.role_id || userData.role_id  
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });
                    const user = await models.user_master.findOne({
                        where: {
                            id: args.id
                        }
                    })
                    

                
                    return user;
                
            } catch (error) {
                throw new Error(error.message);
            }
        },

        updateRole: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let roleData = await models.role_master.findByPk(args.id)

                if (!roleData) {
                    console.log("Not Exist");
                } else {

                    let role = await models.role_master.update(
                        {
                            name : args.name || roleData.name,
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    return role;
                }
            } catch (error) {
                console.log("Error");
            }
        },

        updateProduct: async (parent, args, context) => {
            try {
               
                if (args.id === ''||args.id === undefined) {
                    throw new Error("Id Required");
                }
                let productData = await models.product_master.findByPk(args.id)

                if (!productData) {
                    throw new Error("Not Exist");
                } 
                const pro = await models.product_master.findOne({where:{name :args.name}})
                if (pro)
                {
                    throw new Error("Alredy Exixts");
                }else {

                    await models.product_master.update(
                        {name : args.name || productData.name,
                         description : args.description || productData.description,
                         image : args.image || productData.image,
                         price : args.price || productData.price  
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    const product = await models.product_master.findOne({
                        where: {
                            id: args.id
                        }
                    })

                    return product;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updateBundle: async (parent, args, context) => {
            try {
               
                if  (args.id === ''||args.id === undefined)  {
                    throw new Error("Id Required");
                }

                let bundleData = await models.bundle_master.findByPk(args.id)

                if (!bundleData) {
                    throw new Error("Not Exist");
                } 
                const bnl = await models.bundle_master.findOne({where:{name :args.name}})
                if (bnl)
                {
                    throw new Error("Alredy Exixts");
                }else {

                    await models.bundle_master.update(
                        {
                            name : args.name || bundleData.name,
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    const bundle = await models.bundle_master.findOne({
                        where: {
                            id: args.id
                        }
                    })

                    return bundle;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        
        updateBundle_Product: async (parent, args, context) => {
            try {
               
                if  (args.id === ''||args.id === undefined)  {
                    throw new Error("Id Required");
                }

                let product_bundleData = await models.tbl_bundle_product.findByPk(args.id)

                if (!product_bundleData) {
                    throw new Error("Not Exist");
                } else {

                    await models.tbl_bundle_product.update(
                        {
                            product_id : args.product_id || product_bundleData.product_id,
                            bundle_id  : args.bundle_id  || product_bundleData.bundle_id
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    const bundle_product = await models.tbl_bundle_product.findOne({
                        where: {
                            id: args.id
                        }
                    })

                    return bundle_product;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        




    },
    

};