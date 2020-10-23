const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config("/.env");

exports.isAuthenticated = async (req, res, next) => {
    try
    {
     const requestQuery = req.body.query;

        if(requestQuery !== undefined)
        {
            const excludeAPI = [
                "userLogin",
                "addUser",
                
            ];

            if (!excludeAPI.some(function (v) {
                return requestQuery.indexOf(v) >= 0;
            }))
            {
                const authHeader = req.headers.authorization || "";
                console.log("AUTH HEADER", authHeader);
                if (!authHeader) {
                    res.status(401).json({
                    message: "Please Login First!",
                });

                next();
                }
                const token = authHeader.split(" ")[1];
                console.log(token);
                if (!token || token === "") {
                res.status(400).json({
                    message: "You are not Authenticated...!",
                });
                next();
                }
  
                const user  = await jsonwebtoken.verify(token, process.env.SECRET);
                req.user = user;

            } 
        }
    }
    catch (error) {
        return res.status(401).json({
        message: error.message,
    });
  }
  next();
};



// exports.checkToken= async (req, res, next) => {
//     let header = req.headers.authorization;
//     if (header) {
//       // Remove Bearer from string
//      const token = header.split(" ")[1];
//       jwt.verify(token, process.env.SECRET , (err, decoded) => {           //process.env.JWT_KEY
//         if (err) {
//           return res.json({
//             success: 0,
//             message: "Invalid Token..."
//           });
//         } else 
//         {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       return res.json({
//         success: 0,
//         message: "Access Denied! Unauthorized User"
//       });
//     }
//   }


// function getUserId(context) {
//     const Authorization = context.request.get('Authorization')
//     if (Authorization) {
//       const token = Authorization.replace('Bearer ', '')
//       const { userId } = jwt.verify(token, APP_SECRET)
//       return userId
//     }
  
//     throw new Error('Not authenticated')
//   }

// module.exports = {
//    getUserId,
//   }