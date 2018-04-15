const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
// const redis = require('redis');

// const publish = redis.createClient({ host: 'redis' });
// console.log('Connecting to redis host ', process.env.REDIS_HOST);
// const redisClient = redis.createClient({ host: process.env.REDIS_HOST });
const { ListType, ListInputType, ListUpdateType } = require('./src/v1/lists/lists.schema');
const { CardType, CardInputType, CardUpdateType } = require('./src/v1/cards/cards.schema');

const ListCtrl = require('./src/v1/lists/lists.controller');
const CardCtrl = require('./src/v1/cards/cards.controller');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      lists: {
        type: new GraphQLList(ListType),
        args: {},
        resolve() {
          return new Promise((resolve, reject) => {
            ListCtrl.getLists((err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            });
          });
        }
      },
      cards: {
        type: new GraphQLList(CardType),
        args: {},
        resolve() {
          return new Promise((resolve, reject) => {
            CardCtrl.getCards((err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            });
          });
        }
      },
      list: {
        type: ListType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve(parentValue, args) {
          return new Promise((resolve, reject) => {
            ListCtrl.getListById(args.id, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        }
      }
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addNewList: {
        type: ListType,
        args: {
          list: { type: new GraphQLNonNull(ListInputType) }
        },
        resolve(parent, args){
          return new Promise((resolve, reject) => {
            ListCtrl.addList(args.list, (err, result) => {
              if(err){
                reject(err)
              }
              resolve(result)
            })
          })
        }
      },
      addNewCard: {
        type: CardType,
        args: {
          card: { type: new GraphQLNonNull(CardInputType) }
        },
        resolve(parent, args){
          return new Promise((resolve, reject) => {
            CardCtrl.addCard(args.card, (err, result) => {
              if(err){
                reject(err)
              }
              resolve(result)
            })
          })
        }
      },
      updateList: {
        type: ListType,
        args: {
          list: { type: new GraphQLNonNull(ListUpdateType) }
        },
        resolve(parent, args){
          return new Promise((resolve, reject) => {
            ListCtrl.updateListById(args.list, (err, result) => {
              if(err){
                reject(err)
              }
              // redisClient.publish('LIST_NAME_UPDATE', {
              //   data: result
              // });
              resolve(result)
            })
          })
        }
      },
      updateCard: {
        type: CardType,
        args: {
          card: { type: new GraphQLNonNull(CardUpdateType) }
        },
        resolve(parent, args){
          return new Promise((resolve, reject) => {
            CardCtrl.updateCardById(args.card, (err, result) => {
              if(err){
                reject(err)
              }
              // redisClient.publish('LIST_NAME_UPDATE', {
              //   data: result
              // });
              resolve(result)
            })
          })
        }
      }
    }
  })
});

module.exports = schema;
