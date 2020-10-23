const ErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: () => ({
        key: {type: GraphQLString},
        message: {type: GraphQLString}
    })
})