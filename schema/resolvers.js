//const roless = require("../models/role_master");
//const users = require("../models/user_master");
const models=require("../models/index");
var async = require("async");
const validator = require('validator');
const sequelize = require('sequelize');


module.exports = {
    Query: {
        getRole: async (parent, args, context) => {
            try {
                let where = {}
                if(args.id !== undefined && args.id !== ''){
                    where = {id: args.id}
                }


                const role = await models.role_master.findAll({where: where})
                
                return role;
                ;
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

        userLogin: async (parent, args, context) => {
            try {
                
                let where = {}
                if (args.email === undefined) {
                    console.log("Name Required");
                }

                if (args.password === undefined) {
                    console.log("Password Required");
                }
                const user = await models.user_master.findOne({ where: { email: args.email, password: args.password } })
                if (!user) {
                   console.log("No such user found");
                 }
                 else{
                     console.log("Successfully Login");
                 }
                

            return user;
                    
                
            } catch (error) {
                console.log("Error");
            }
        },

        addUser: async (parent, args, context) => {
            try {
               
                if (args.name === undefined) {
                    console.log("Name Required");
                }
                
                if (args.email === undefined) {
                    console.log("Email Required");
                }

                if (args.password === undefined) {
                    console.log("Password Required");
                }
                if (args.role_id === undefined) {
                    console.log("Role Required");
                }

                let result = await models.user_master.findOne({where: {name: args.email}})
                if(result) {
                    console.log("Already Exist");
                } else {

                    let User = await models.user_master.create({
                        name: args.name,
                        email:args.email,
                        password:args.password,
                        role_id:args.role_id
                        
                    });

                    return User;
                }
            } catch (error) {
                console.log("Error");
            }
        },


        addRole: async (parent, args, context) => {
            try {
               
                if (args.name === undefined) {
                    console.log("Name Required");
                }
                let result = await models.role_master.findOne({where: {name: args.name}})
                if(result) {
                    console.log("Already Exist");
                } else {

                    let role = await models.role_master.create({
                        name: args.name,
                        //created_by: context.userData.user.id
                    });

                    return role;
                }
            } catch (error) {
                console.log("Error");
            }
        },
        addProduct: async (parent, args, context) => {
            try {
               
                if (args.name === undefined) {
                    console.log("Name Required");
                }
                
                if (args.description === undefined) {
                    console.log("Description Required");
                }

                if (args.price === undefined) {
                    console.log("Price Required");
                }

                let result = await models.product_master.findOne({where: {name: args.name}})
                if(result) {
                    console.log("Already Exist");
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
                console.log("Error");
            }
        },

        addBundle: async (parent, args, context) => {
            try {
               
                if (args.name === undefined) {
                    console.log("Name Required");
                }

                let result = await models.bundle_master.findOne({where: {name: args.name}})
                if(result) {
                    console.log("Already Exist");
                } else {

                    let bundle = await models.bundle_master.create({
                        name: args.name,
                        
                    });

                    return bundle;
                }
            } catch (error) {
                console.log("Error");
            }
        },

        addBundle_Product: async (parent, args, context) => {
            try {
               
                if (args.product_id === undefined) {
                    console.log("id Required");
                }
                if (args.bundle_id === undefined) {
                    console.log("id Required");
                }


                    let bundle_product = await models.tbl_bundle_product.create({
                        product_id: args.product_id,
                        bundle_id: args.bundle_id
                        
                    });

                    return bundle_product;
                
            } catch (error) {
                console.log("Error");
            }
        },


        deleteUser: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let result = await models.user_master.findByPk(args.id)

                if (!result) {
                    console.log("Not Exist");
                } else {

                    let user = await models.user_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return user;
                }
            } catch (error) {
                console.log("Error");
            }
        },
        deleteRole: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let result = await models.role_master.findByPk(args.id)

                if (!result) {
                    console.log("Not Exist");
                } else {

                    let role = await models.role_master.destroy({
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
        deleteProduct: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let result = await models.product_master.findByPk(args.id)

                if (!result) {
                    console.log("Not Exist");
                } else {

                    let product = await models.product_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return product;
                }
            } catch (error) {
                console.log("Error");
            }
        },
        deleteBundle: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let result = await models.bundle_master.findByPk(args.id)

                if (!result) {
                    console.log("Not Exist");
                } else {

                    let bundle = await models.bundle_master.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return bundle;
                }
            } catch (error) {
                console.log("Error");
            }
        },

        deleteBundle_Product: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let result = await models.tbl_bundle_product.findByPk(args.id)

                if (!result) {
                    console.log("Not Exist");
                } else {

                    let bundle_product = await models.tbl_bundle_product.destroy({
                        where: {
                            id: args.id
                        }
                    });

                    return bundle_product;
                }
            } catch (error) {
                console.log("Error");
            }
        },

        updateUser: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let userData = await models.user_master.findByPk(args.id)

                if (!userData) {
                    console.log("Not Exist");
                } else {

                    let user = await models.user_master.update(
                        {name : args.name || userData.name,
                         email : args.email || userData.email,
                         password : args.password || userData.password,
                         role_id : args.role_id || userData.role_id  
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    return user;
                }
            } catch (error) {
                console.log("Error");
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
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let productData = await models.product_master.findByPk(args.id)

                if (!productData) {
                    console.log("Not Exist");
                } else {

                    let product = await models.product_master.update(
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

                    return product;
                }
            } catch (error) {
                console.log("Error");
            }
        },
        updateBundle: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let bundleData = await models.bundle_master.findByPk(args.id)

                if (!bundleData) {
                    console.log("Not Exist");
                } else {

                    let bundle = await models.bundle_master.update(
                        {
                            name : args.name || bundleData.name,
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    return bundle;
                }
            } catch (error) {
                console.log("Error");
            }
        },
        
        updateBundle_Product: async (parent, args, context) => {
            try {
               
                if (args.id === undefined) {
                    console.log("Id Required");
                }

                let product_bundleData = await models.tbl_bundle_product.findByPk(args.id)

                if (!product_bundleData) {
                    console.log("Not Exist");
                } else {

                    let bundle_product = await models.tbl_bundle_product.update(
                        {
                            product_id : args.product_id || product_bundleData.product_id,
                            bundle_id  : args.bundle_id  || product_bundleData.bundle_id
                        },
                        
                        {
                        where: {
                            id: args.id
                        }
                    });

                    return bundle_product;
                }
            } catch (error) {
                console.log("Error");
            }
        },
        




    },
    

};