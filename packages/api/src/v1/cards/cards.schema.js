const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const CardType = new GraphQLObjectType({
  name: 'Card',
  fields: () => ({
    cardId: { type: GraphQLInt },
    listId: { type: GraphQLInt },
    name: { type: GraphQLString },
    positionId: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
});

const CardInputType = new GraphQLInputObjectType({
  name: 'CardInput',
  fields: () => ({
    name: { type: GraphQLString },
    listId: { type: GraphQLInt }
  })
});

const CardUpdateType = new GraphQLInputObjectType({
  name: 'CardUpdate',
  fields: () => ({
    listId: {type: GraphQLInt },
    cardId: { type: GraphQLInt },
    name: { type: GraphQLString },
    positionId: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
});

module.exports = {
  CardType,
  CardInputType,
  CardUpdateType
};
