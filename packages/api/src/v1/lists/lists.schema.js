const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const ListType = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    listId: { type: GraphQLInt },
    name: { type: GraphQLString },
    positionId: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
});

const ListInputType = new GraphQLInputObjectType({
  name: 'ListInput',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const ListUpdateType = new GraphQLInputObjectType({
  name: 'ListUpdate',
  fields: () => ({
    listId: {type: GraphQLInt },
    name: { type: GraphQLString },
    positionId: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
});

module.exports = {
  ListType,
  ListInputType,
  ListUpdateType
};
