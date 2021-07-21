import React, { Component } from 'react';
import axios from "axios";
import './App.css';

//import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newPoke:"", // will become newPoke
      seenList:[],
      favList:[],
      displayRandomPoke:"", // stores the ID number for pokemon
      pokeName:"", // stores the pokemon name
      picOfPoke:"https://pngimg.com/uploads/pokeball/small/pokeball_PNG24.png", // stores image url for the pokemon
      noOfPokemon:898 // max pokemon
    }
  }



  showNewPoke(){
    // NUMBER OF POKEMON TO AVOID INFITIE LOOP IF LIST FILLS UP
    const noOfPokemon = this.state.noOfPokemon;
    // get a random number between 1 and the max number of pokemon
    const displayRandomPoke = Math.floor(Math.random() * noOfPokemon) + 1;

    // stores the list of pokemon have seen
    const seenList = [...this.state.seenList]
    // keeps track of how many have been seen
    var totalSeen = Object.keys(seenList).length;
    // check if the random number selected has already been added to the list
    // ie, have we already seen this pokemon
    var isIn = seenList.find(a => a.id === displayRandomPoke.toString());

    // async function to fetch the pokemon data
    const getPokemon = async() => {
      try{
        const url = 'https://pokeapi.co/api/v2/pokemon-form/' + displayRandomPoke + '/';
        const res = await axios.get(url);

        this.setState({pokeName:res.data.name});
        this.setState({picOfPoke:res.data.sprites.front_default})

        // create the newPoke
        const newPoke={
          id: displayRandomPoke.toString(),//use pokemon ID as unique ID
          value: displayRandomPoke,
          name: res.data.name, // get the pokemon name
          image: res.data.sprites.front_default // get the url for the .png
        };
        // add the new poke to the seen list
        seenList.push(newPoke);
        // update seen list and newpoke value
        this.setState({displayRandomPoke});
        this.setState({
          seenList,
          newPoke
        });
      } catch(e) {
        console.log(e);
      }
    };
    // check to make sure haven't seen pokemon before before calling
   if (isIn === undefined){
     getPokemon();
   }
   else{
     // clear variables and recall function to get a new value
     this.setState({displayRandomPoke:""});
     this.setState({newPoke:""});
     // only call for a new pokemon if there are still pokemon haven't seen
     if(totalSeen < noOfPokemon)
     {
       this.showNewPoke();
     }
   }
  }

// Function to save the pokemon to the favourite list
  saveToFav(){
    // get current fav list
    const favList = [...this.state.favList]
    // get current pokemon
    const newPoke = this.state.newPoke;
    // save current pokemon to list
    favList.push(newPoke);
    // update list and clear the pokemon
    this.setState({
      newPoke:"",
      favList
    });
  }

// Function to delete pokemon from the favlist
  deleteItem(id) {
    // copy current list
    const favList = [...this.state.favList];
    // filter out item being deleted
    const updatedList = favList.filter(item => item.id !== id);
    // update the list
    this.setState({favList:updatedList});
  }

  render() {
    return (
      <div className="App" align="center">
        <div >
          <br/>
          <h1 className="app-title">Pick a Pokemon</h1>
          <br/>
          <div className="image-div">
          <div className="name-text">
            {this.state.pokeName}
            </div>
            <br/>
            <img src={this.state.picOfPoke} alt="pokemon"/>
          </div>
          <button className="app-button" onClick={() => this.showNewPoke()}>
          Show New Pokemon
          </button>
          &nbsp;
          <button className="app-button" onClick={() => this.saveToFav()} disabled={!this.state.newPoke}>
          Save to Favourite list
          </button>
          <br/><br/>
          <h2 className="app-h2">Favourite List:</h2>
          <ul className="app-ul">
            {this.state.favList.map(item => {
              return(
                <li  key={item.id}>
                  <br/>
                  <div className="name-text" >
                  {item.name}
                  &nbsp;
                  <button className="cross-button"
                    onClick={() => this.deleteItem(item.id)}>
                  X
                  </button>
                  </div>
                  <br/>
                  <img src={item.image} alt="pokemon"/>
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
