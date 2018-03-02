const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const { ListType, ListInputType, ListUpdateType } = require('./src/v1/lists/lists.schema');
const ListCtrl = require('./src/v1/lists/lists.controller');

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
              resolve(result)
            })
          })
        }
      }
    }
  })
});

module.exports = schema;
