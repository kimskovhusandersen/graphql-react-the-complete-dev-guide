const graphql = require('graphql')
const axios = require('axios')
const baseUrl = "http://localhost:3000"

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parentValue, args) {
                const {
                    data
                } = await axios.get(`${baseUrl}/companies/${parentValue.id}/users`)
                return data
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company: {
            type: CompanyType,
            async resolve(parentValue, args) {
                console.log(parentValue, args);
                let {
                    data
                } = await axios.get(`${baseUrl}/companies/${parentValue.companyId}`)
                return data
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            async resolve(parentValue, args) {
                let {
                    data
                } = await axios.get(`${baseUrl}/users/${args.id}`)
                return data
            }
        },
        company: {
            type: CompanyType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            async resolve(parentValue, args) {
                let {
                    data
                } = await axios.get(`${baseUrl}/companies/${args.id}`)
                return data
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                companyId: {
                    type: GraphQLInt
                }
            },
            async resolve(parentValue, {
                firstName,
                age
            }) {
                const {
                    data
                } = await axios.post(`${baseUrl}/users`, {
                    firstName,
                    age
                })
                return data
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                firstName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                companyId: {
                    type: GraphQLInt
                }
            },
            async resolve(parentValue, args) {
                const {
                    data
                } = await axios.patch(`${baseUrl}/users/${id}`, args)
                return data
            }
        },

        deleteUser: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            async resolve(parentValue, {
                id
            }) {
                const data = await axios.delete(`${baseUrl}/users/${id}`, {
                    id
                })
                return data
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation
})