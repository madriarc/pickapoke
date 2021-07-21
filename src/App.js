import React, { Component } from 'react';
import axios from "axios";

//import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"", // will become newPoke
      seenList:[],
      favList:[],
      displayRandomPoke:"",
      pokeName:"",
      picOfPoke:""
    }
  }



  showNewPoke(){ // will become SHOW NEW POKE

    var noOfPokemon = 10;
    // get a random number between 0 and 9 - will fetch pokemon
    const displayRandomPoke = Math.floor(Math.random() * noOfPokemon) + 1;
    const seenList = [...this.state.seenList]
    var totalSeen = Object.keys(seenList).length;
    var isIn = seenList.find(a => a.id === displayRandomPoke.toString());
    //const pokeName = this.state.pokeName;
    //const picOfPoke = this.state.picOfPoke;
    var pokeName = "";
    var picOfPoke = "";



    const getPokemon = async() => {

      try{
        const url = 'https://pokeapi.co/api/v2/pokemon-form/' + displayRandomPoke + '/';
        const res = await axios.get(url);
        pokeName = await res.data.name;
        console.log(res);

        console.log(res.data.name);
        this.setState({pokeName:res.data.name});
        //pokeName = res.data.name;
        console.log(res.data.sprites.front_default);
        this.setState({picOfPoke:res.data.sprites.front_default})

        const newItem={
          id: displayRandomPoke.toString(),//1 + Math.random(),
          // add the random number to list
          value: displayRandomPoke,
          name: res.data.name,
          image: res.data.sprites.front_default
        };

        seenList.push(newItem);
        this.setState({displayRandomPoke});
        this.setState({
          seenList,
          newItem
        });
      } catch(e) {
        console.log(e);
      }
    };
    // function getPokemon() {
    //   let url = 'https://pokeapi.co/api/v2/pokemon-form/' + displayRandomPoke + '/';
    //   fetch(url)
    //   .then(response => res)
    //   .then(console.log(res))
    //   .catch(console.log)
    // }


    //var pokemon = Poke.getCharacteristicById(displayRandomPoke);
    //create item with unique id

    //this.setState({newItem.name: this.state.pokeName})
   // copy current list

   // add new item

   if (isIn === undefined){
     console.log("Not present")
     getPokemon();
     //newItem.name = this.state.pokeName;//"thsiName";
     console.log("Here is pokeNameTHIS: " + pokeName);
     console.log("Here is pokeName: " + this.state.pokeName);
     // seenList.push(newItem);
     // this.setState({displayRandomPoke});
     // this.setState({
     //   seenList,
     //   newItem
     // });
     console.log("Here is pokeName2: " + this.state.pokeName);
   }
   else{
     console.log("was in");
     console.log(isIn.name);
     console.log(displayRandomPoke);
     this.setState({displayRandomPoke:""});
     this.setState({
       newItem:""});
     //displayRandomPoke = "";
     if(totalSeen < noOfPokemon)
     {

       this.showNewPoke();

     }
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
          {this.state.pokeName}
          <br/>
          <img src={this.state.picOfPoke} alt="pokemon"/>

          <br/>
          <button
            onClick={() => this.showNewPoke()}
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
                  <br/>
                  {item.name}
                  <br/>
                  <img src={item.image} alt="pokemon"/>

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
                  <br/>
                  {item.name}
                  <br/>
                  <img src={item.image} alt="pokemon"/>
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
