import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import List from './List';

@inject("store") 
@observer
class Board extends Component {
    render(){
        return(
            <div id="board" style={{ display: 'flex', flexGrow: 1, overflowX: 'auto' }}>
                {this.props.store.lists.map( list => 
                    <List list={list} key={list.listId} />
                )}
            </div>
        );
    }
}

export default Board;