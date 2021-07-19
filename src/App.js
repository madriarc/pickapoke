import React, { Component } from 'react';

//import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"",
      list:[],
      displayRandom:""
    }
  }
  updateInput(key, value){
    //update react state
    this.setState({
      [key]:value
    });
  }

  addItem(){
    // get a random number between 0 and 9
    const displayRandom = Math.floor(Math.random() * 10);
    //create item with unique id
    const newItem={
      id: displayRandom.toString(),//1 + Math.random(),
      // add the random number to list
      value: displayRandom
    };
   // copy current list
   const list = [...this.state.list]

   console.log(displayRandom.toString());//.includes(displayRandom));
   // add new item
   var isIn = list.find(a => a.id === displayRandom.toString());

   if (isIn == undefined){
     console.log("Not present")
     list.push(newItem);
   }
   else{
     console.log("was in");
     console.log(isIn.name);
   }



   // update state with newlist and resent newItem item
   this.setState({
     list,
     newItem:"",
     displayRandom
   });

  }




  deleteItem(id) {
    // copy current list
    const list = [...this.state.list];
    // filter out item being deleted
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list:updatedList});
  }

  render() {
    return (
      <div className="App">
        <div>
          Add an Item...
          {this.state.displayRandom}

          <br/>
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}

          />
          <button
            onClick={() => this.addItem()}
          >
          Add
          </button>
          <br/>
          <ul>
            {this.state.list.map(item => {
              return(
                <li key={item.id}>
                  {item.value}
                  <button
                    onClick={() => this.deleteItem(item.id)}>
                  X
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
