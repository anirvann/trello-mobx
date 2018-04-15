import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Queries from '../queries';
import ListModel from '../models/ListModel';

@inject("store")
@inject("client")
@observer
class SideBar extends Component {

	@observable userInput = '';

	@action
	updateListName = e => {
    this.userInput = e.currentTarget.value;
	}

	@action
	createList = e => {
		if(!this.userInput.trim().length) return;
		let input = this.userInput;
		let context = this;

		this.props.client.mutate({ 
	    mutation: Queries.createOneList, 
	    variables: {
	      list: { "name": input }
	    },
	    // update: (cache, result) => {
     //    const data = cache.readQuery({ query: Queries.fetchAllLists });
     //    data.lists.push({
     //    	listId: data.lists[data.lists.length - 1].listId,
     //    	positionId: data.lists[data.lists.length - 1].positionId,
     //    	name: result.data.addNewList.name,
     //    	status: 'ACTIVE'
     //    });
     //    cache.writeQuery({ query: Queries.fetchAllLists, data });
     //  }
	  });
	  /*.then(data => this.props.client.query({ query: Queries.fetchAllLists }))
	  .then(result => result.data.lists.filter(list => list.status === 'ACTIVE'))
    .then(lists => lists.map( list => this.lists.push(new ListModel(list))))*/;
	}

  render(){
    return(
      <div id="side_bar" style={{ display: 'flex', flexShrink: 0, overflowX: 'auto', width: '200px', padding: '0 20px' }}>
        <Paper style={{boxShadow: 'none'}}>
	        <TextField
	          name="addList"
	          floatingLabelText="Enter new list name"
	          value={this.userInput}
	          onChange={this.updateListName.bind(this)}
	          fullWidth={true}
	        />
	        <RaisedButton 
	        	label="Add List" 
	          fullWidth={true}
	        	primary={true}
	        	onClick={this.createList.bind(this)} />
	      </Paper>
      </div>
    );
  }
}

export default SideBar;