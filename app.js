
const express = require('express');
const { Client } = require('pg');
const graphqlHttp =require('express-graphql');
//var cookieParser = require('cookie-parser');
const logger = require('morgan');

//const routes = require('./routes');
//var path = require('path');

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = require('./schema/schema');

const resolvers = require('./schema/resolvers');


const app = express();

const cors = require('cors');
//const server = http.createServer(app);
const bodyParser = require('body-parser');

app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    graphiql: true,
});

server.applyMiddleware({ app, path: '/graphql' });
//server.start(() => console.log(`Server is running on http://localhost:4000`));


//server.applyMiddleware({ app, path: '/graphql' });


//routes(app);
// app.use('/graphql', graphqlHttp.graphqlHTTP({
//     schema,
//     graphiql: true
// }));




// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'test',
//     password: 'parth7979',
//     port: 5432,
// });

// client.connect( ()=>{
//     console.log('Database connected');
// }

// );
 app.listen(4000, () => {
     console.log('now listening for requests on port 4000');
 });


module.exports=app;





