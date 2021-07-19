import React, { Component } from 'react';

//import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"",
      seenList:[],
      favList:[],
      displayRandomPoke:""
    }
  }

  addItem(){
    // get a random number between 0 and 9
    const displayRandomPoke = Math.floor(Math.random() * 10);
    //create item with unique id
    const newItem={
      id: displayRandomPoke.toString(),//1 + Math.random(),
      // add the random number to list
      value: displayRandomPoke
    };
   // copy current list
   const seenList = [...this.state.seenList]

   console.log(displayRandomPoke.toString());//.includes(displayRandomPoke));
   // add new item
   var isIn = seenList.find(a => a.id === displayRandomPoke.toString());

   if (isIn === undefined){
     console.log("Not present")
     seenList.push(newItem);
   }
   else{
     console.log("was in");
     console.log(isIn.name);
   }



   // update state with newlist and resent newItem item
   this.setState({
     seenList,
     newItem:"",
     displayRandomPoke
   });

  }




  deleteItem(id) {
    // copy current list
    const seenList = [...this.state.seenList];
    // filter out item being deleted
    const updatedList = seenList.filter(item => item.id !== id);
    this.setState({seenList:updatedList});
  }

  render() {
    return (
      <div className="App">
        <div>
          Add an Item...
          {this.state.displayRandomPoke}

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
            {this.state.seenList.map(item => {
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
