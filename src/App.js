import React, { Component } from 'react';

//import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"", // will become newPoke
      seenList:[],
      favList:[],
      displayRandomPoke:""
    }
  }

  addItem(){ // will become SHOW NEW POKE
    // get a random number between 0 and 9 - will fetch pokemon
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
     this.setState({displayRandomPoke});
     this.setState({
       seenList,
       newItem
     });
   }
   else{
     console.log("was in");
     console.log(isIn.name);
     console.log(displayRandomPoke);
     this.setState({displayRandomPoke:""});
     this.setState({newItem:""});
     //displayRandomPoke = "";
     this.addItem();
   }
   // update state with newlist and resent newItem item


  }

  saveToFav(){
    const favList = [...this.state.favList]
    const newItem = this.state.newItem;
    favList.push(newItem);

    this.setState({
      newItem:"",
      favList
    });
  }




  deleteItem(id) {
    // copy current list
    const favList = [...this.state.favList];
    // filter out item being deleted
    const updatedList = favList.filter(item => item.id !== id);
    this.setState({favList:updatedList});
  }

  render() {
    return (
      <div className="App">
        <div>
          Pick A Pokemon
          <br/>
          {this.state.displayRandomPoke}

          <br/>

          <button
            onClick={() => this.addItem()}
          >
          Show New Pokemon
          </button>
          <button onClick={() => this.saveToFav()} disabled={!this.state.newItem}>
          Save to Favourite list
          </button>
          <br/>
          Seen List:
          <ul>
            {this.state.seenList.map(item => {
              return(
                <li key={item.id}>
                  {item.value}

                </li>
              )
            })}
          </ul>
          <br/>
          Fav List:
          <ul>
            {this.state.favList.map(item => {
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
