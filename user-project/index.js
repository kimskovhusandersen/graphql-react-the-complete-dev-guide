const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schemas/schema');



const app = express();


app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.get("/", (req, res) => {
    res.send("hi")
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server listening to port ${port}`))