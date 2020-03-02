import React, { useState, useEffect, useReducer } from 'react';
import '../css/Board.css'
import { setupBoard, Player, shuffleCards } from '../setup';
// import { Player } from '../players';
import { PlayerModal } from '../components/PlayerModal';
import { RobModal } from '../components/RobModal';
import { HelpModal } from '../components/HelpModal';
import { PlayerTab } from './PlayerTab';
import { HexOverlay } from '../components/HexOverlay';
import { PathOverlay } from '../components/PathOverlay';
import { VertexOverlay } from '../components/VertexOverlay';
import { NumberOverlay } from '../components/NumberOverlay';
import { RobLargeHandsModal } from '../components/RobLargeHandsModal';
import { TradeBankModal } from '../components/TradeBankModal';
import { TradePlayerModal } from '../components/TradePlayerModal';
import { DevelopmentCardsModal } from '../components/DevelopmentCardsModal';
import { MonopolyModal } from '../components/MonopolyModal';
import { YearOfPlentyModal } from '../components/YearOfPlentyModal';
import { VictoryModal } from '../components/VictoryModal';

const Board = () => {
  const [forceUpdate, setForceUpdate] = useState(0);

  const [hexes, setHexes] = useState([]);
  const [vertexes, setVertexes] = useState([]);
  const [paths, setPaths] = useState([]);
  const [players, setPlayers] = useState([]);
  const [showPlayerModal, setShowPlayerModal] = useState(true); //////
  const [helpText, setHelpText] = useState("");
  const [whoseTurn, setWhoseTurn] = useState("");
  const [setupPhase, setSetupPhase] = useState(false);
  const [setupPhaseRound, setSetupPhaseRound] = useState(1);
  const [setupRoadOrSettlement, setSetupRoadOrSettlement] = useState("settlement");
  const [lastSettlement, setLastSettlement] = useState();
  const [turnStage, setTurnStage] = useState("ROLL");
  const [rollDisplay, setRollDisplay] = useState();
  const [movingRobber, setMovingRobber] = useState(false);
  const [robbedPlayers, setRobbedPlayers] = useState([]);
  const [showRobModal, setShowRobModal] = useState(false);
  const [largeHands, setLargeHands] = useState([]);
  const [playerLosingResources, setPlayerLosingResources] = useState();
  const [numberResourcesToLose, setNumberResourcesToLose] = useState(0);
  const [resourcesLost, setResourcesLost] = useState({ wheat: 0, lumber: 0, brick: 0, ore: 0, sheep: 0 });
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showTradeBankModal, setShowTradeBankModal] = useState(false);
  const [showTradePlayerModal, setShowTradePlayerModal] = useState(false);
  const [potentialPartners, setPotentialPartners] = useState([]);
  const [availableCards, setAvailableCards] = useState(shuffleCards());
  const [showDevelopmentCardsModal, setShowDevelopmentCardsModal] = useState(false);
  const [showYearOfPlentyModal, setShowYearOfPlentyModal] = useState(false);
  const [showMonopolyModal, setShowMonopolyModal] = useState(false);
  const [roadBuildingCounter, setRoadBuildingCounter] = useState(0);
  const [largestArmySize, setLargestArmySize] = useState(0);
  const [largestArmyPlayer, setLargestArmyPlayer] = useState();
  const [longestRoadLength, setLongestRoadLength] = useState(0);
  const [longestRoadPlayer, setLongestRoadPlayer] = useState();
  const [showVictoryModal, setShowVictoryModal] = useState(false);


  // Starts the game- hides the add player modal and begins the game's setup phase
  const startGame = () => {
    setShowPlayerModal(false);
    setSetupPhase(true);
    setWhoseTurn(players[0]);
    setHelpText(players[0].name + "Build a settlement!")
  };

  // Set up the board- add resources, connections between hex/path/vertex
  useEffect(() => {
    setupBoard(hexes, vertexes, paths, document);
    // let player1 = new Player("player1", 1); //////
    // player1.brick = 50;
    // player1.lumber = 50;
    // player1.sheep = 50;
    // player1.wheat = 50;
    // player1.ore = 50;
    // player1.purchased_cards = ["Road Building", "Road Building", "Road Building", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Road Building", "Road Building", "Year of Plenty", "Year of Plenty", "Monopoly", "Monopoly"]
    // let player2 = new Player("player2", 2); //////
    // player2.lumber = 15;
    // player2.ore = 3;
    // player2.brick = 15;
    // player2.sheep = 3;
    // player2.wheat = 3;
    // player2.purchased_cards = ["Road Building", "Road Building", "Road Building", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Road Building", "Road Building", "Year of Plenty", "Year of Plenty", "Monopoly", "Monopoly"]
    // let player3 = new Player("player3", 3); //////
    // player3.lumber = 15;
    // player3.ore = 3;
    // player3.brick = 15;
    // player3.sheep = 3;
    // player3.wheat = 3;
    // let player4 = new Player("player4", 4); //////
    // player4.lumber = 4;
    // player4.ore = 3;
    // player4.brick = 6;

    // setPlayers([player1, player2, player3]); //////
    // setWhoseTurn(player1); //////
  }, [])

  // Create a player instance and clear the name field


  // Transition to next player- simply next player in array, or previous if in second round of setup
  const nextPlayer = () => {
    if (setupPhase) {
      if (setupPhaseRound == 1) {
        setWhoseTurn(players[whoseTurn.number]);
      }
      else {
        setWhoseTurn(players[whoseTurn.number - 2]);
      }
    }
    else {
      if (whoseTurn.number !== players.length) {
        setWhoseTurn(players[whoseTurn.number]);
      }
      else {
        setWhoseTurn(players[0]);
      }
      setTurnStage("ROLL");
      setHelpText("Roll the dice!")
    }
  }

  const setAdjacentPaths = (_path, player) => {
    _path.vertexes.filter(vertex => !vertex.owner || vertex.owner === player).forEach(end => {
      end.paths.filter(path => path !== _path && path.owner === player).forEach(road => {
        _path.adjacent_roads.push(road);
        road.adjacent_roads.push(_path);
      })
    })
  }

  // Add a road
  const setupRoad = (e) => {
    // can't build roads during setup phase when a settlement is needed instead
    if (setupPhase && setupRoadOrSettlement == "settlement") {
      alert("It's time to build a settlement, not a road!");
      return;
    }
    // collect specified path and its vertices, and declare a variable to track if a road can be built here
    let _path = paths[e.target.id.substring(4, e.target.id.length)];
    let _vertexes = _path.vertexes;
    let valid = false;
    // can't build on top of preexisting roads
    if (_path.owner) {
      alert("This road has already been built!");
      return;
    }
    // setup phase road building
    if (setupPhase) {
      // the selected path is valid if it is adjancent to the last built settlement
      for (let i = 0; i < _vertexes.length; i++) {
        if (_vertexes[i] === lastSettlement) {
          valid = true;
        }
      }
      // add CSS to the clicked element, note the new road's owner
      // then if current player is last in setup round 1, switch to settlement setup mode; OR if current player is last in setup round 2, start game; OR advance to next player and switch to settlement setup mode
      if (valid) {
        e.target['classList'].add("player" + whoseTurn.number);
        _path.owner = whoseTurn;
        setAdjacentPaths(_path, whoseTurn);
        setSetupRoadOrSettlement("settlement");
        if (whoseTurn == players[players.length - 1] && setupPhaseRound == 1) {
          setSetupPhaseRound(2);
          setHelpText("Build a settlement at least 2 vertexes away from any existing settlements!");
        }
        else if (whoseTurn == players[0] && setupPhaseRound == 2) {
          setSetupPhase(false);
          setLastSettlement(null);
          setTurnStage("ROLL");
          setHelpText("The game has started- roll the dice!")
        }
        else {
          nextPlayer();
          setHelpText("Build a settlement at least 2 vertexes away from any existing settlements!");
        }
      }
      else {
        alert("Invalid road- choose a road adjacent to the settlement you just built")
      }
    }
    // normal road building
    else {
      // must be appropriate time to build
      if (turnStage !== "TRADE/BUILD" && turnStage !== "ROAD BUILDING") {
        alert("Now is not the time to build a road or settlement!");
        return;
      }
      // if any adjacent vertices are owned by current player, selected path is valid
      if (_vertexes.filter(_vertex => _vertex.owner === whoseTurn).length) {
        valid = true;
      }
      // if any adjacent vertices are unoccupied and connected to another road owned by current player, selected path is valid
      for (let i = 0; i < _vertexes.length; i++) {
        if (_vertexes[i].owner == null) {
          for (let j = 0; j < _vertexes[i].paths.length; j++) {
            if (_vertexes[i].paths[j].owner == whoseTurn) {
              valid = true;
            }
          }
        }
      }
      // need resources to build without development card
      if (turnStage === "TRADE/BUILD" && whoseTurn.lumber < 1 || whoseTurn.brick < 1) {
        alert("You don't have enough resources to build a road!");
      }
      // add CSS to selected element, note the new road's owner, update player's resources or update road building development card counter
      else if (valid) {
        e.target['classList'].add("player" + whoseTurn.number);
        _path.owner = whoseTurn;
        setAdjacentPaths(_path, whoseTurn);
        if (turnStage === "TRADE/BUILD") {
          whoseTurn.brick--;
          whoseTurn.lumber--;
        }
        else if (turnStage === "ROAD BUILDING") {
          if (roadBuildingCounter === 1) {
            setTurnStage("TRADE/BUILD");
          }
          setRoadBuildingCounter(roadBuildingCounter - 1);
        }
        setForceUpdate(forceUpdate + 1);
        getLongestRoad();
      }
      // display error alert
      else {
        alert("New roads must connect to one of your roads or settlements!");
      }
    }
  }

  const breakAdjacentRoads = (_vertex, player) => {
    let brokenRoads = _vertex.paths.filter(path => path.owner && path.owner !== player);
    if (brokenRoads.length === 2) {
      brokenRoads[0].adjacent_roads = brokenRoads[0].adjacent_roads.filter(adjacent_road => adjacent_road !== brokenRoads[1]);
      brokenRoads[1].adjacent_roads = brokenRoads[1].adjacent_roads.filter(adjacent_road => adjacent_road !== brokenRoads[0]);
    }
    return;
  }

  // Add a settlement
  const setupSettlement = (e) => {
    // can't build settlements during setup phase or road building when a road is needed instead
    if (setupPhase && setupRoadOrSettlement == "road" || turnStage == "ROAD BUILDING") {
      alert("It's time to build a road, not a settlement!");
      return;
    }
    // collect selected vertex, neighboring vertices, and determine if vertex is too close to preexisting settlements
    let _vertex = vertexes[e.target.id.substring(6, e.target.id.length)];
    let neighbors = _vertex.neighbors;
    let tooClose = false;
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].owner) {
        tooClose = true;
      }
    }
    if (tooClose) {
      alert("This settlement is too close to another one!");
    }
    else {
      // setup phase settlement building
      if (setupPhase) {
        // can't build on top of preexisting settlements in setup phase
        if (_vertex.owner) {
          alert("This settlement has already been built!");
          return;
        }
        // point to this as the last built settlement for road setup purposes, add CSS, note the settlement's owner and grant victory point, switch to road setup phase
        // if round 2 of setup, give player appropriate resources
        setLastSettlement(_vertex);
        e.target['classList'].add("player" + whoseTurn.number);
        _vertex.owner = whoseTurn;
        if (setupPhaseRound == 2) {
          for (let i = 0; i < _vertex.hexes.length; i++) {
            let resource_type = _vertex.hexes[i].resource;
            whoseTurn[resource_type]++;
          }
        }
        whoseTurn.points++;
        breakAdjacentRoads(_vertex, whoseTurn);
        if (!whoseTurn["ports"].includes(_vertex.port) && _vertex.port) {
          whoseTurn["ports"].push(_vertex.port);
        }
        setSetupRoadOrSettlement("road");
        setHelpText("Build a road adjacent to the settlement you just placed!");
      }
      // attempt to build city
      else if (_vertex.owner === whoseTurn) {
        // must roll dice before building
        if (turnStage !== "TRADE/BUILD") {
          alert("Now is not the time to build a road or settlement!");
          return;
        }
        // get all current player's cities, and check if they can build anymore
        let cities = vertexes.filter(vertex => vertex.owner === whoseTurn && vertex.city);
        if (cities.length >= 4) {
          alert("You cannot build any more cities!");
        }
        // check to see if player has enough resources
        else if (whoseTurn.wheat < 2 || whoseTurn.ore < 3) {
          alert("You don't have enough resources to build a city!");
        }
        // add CSS to selected element, grant current player victory point, subtract resources
        else {
          whoseTurn.points++;
          whoseTurn.wheat -= 2;
          whoseTurn.ore -= 3;
          e.target['classList'].add(whoseTurn.name+"City");
          _vertex.city = true;
          setForceUpdate(forceUpdate + 1);
          checkVictory();
        }
      }
      // can't build on top of other players' settlements/cities
      else if (_vertex.owner && _vertex.owner !== whoseTurn) {
        alert("This settlement has already been built!");
      }
      // can't build settlements without adjacent road
      else if (!_vertex.paths.filter(path => path.owner === whoseTurn).length) {
        alert("You must build settlements connected to a road you own!");
      }
      else {
        // get all current player's settlements, and check if they can build anymore
        let settlements = vertexes.filter(vertex => vertex.owner === whoseTurn && !vertex.city);
        if (settlements.length >= 5) {
          alert("You cannot build any more settlements!");
          return;
        }
        // check to see if player has enough resources
        else if (whoseTurn.wheat < 1 || whoseTurn.lumber < 1 || whoseTurn.brick < 1 || whoseTurn.sheep < 1) {
          alert("You don't have enough resources to build a settlement!");
        }
        // add CSS to selected element, grant current player victory point, subtract resources
        else {
          whoseTurn.points++;
          whoseTurn.wheat--;
          whoseTurn.lumber--;
          whoseTurn.brick--;
          whoseTurn.sheep--;
          e.target["classList"].add("player" + whoseTurn.number);
          if (!whoseTurn["ports"].includes(_vertex.port) && _vertex.port) {
            whoseTurn["ports"].push(_vertex.port);
          }
          _vertex.owner = whoseTurn;
          breakAdjacentRoads(_vertex, whoseTurn);
          getLongestRoad();
          setForceUpdate(forceUpdate + 1);
          checkVictory();
        }
      }
    }
  }

  const rollDice = () => {
    let _roll = (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2)
    setRollDisplay(_roll);
    if (_roll == 7) {
      let _hexes = hexes.filter(hex => hex.number === _roll);
      for (let i = 0; i < _hexes.length; i++) {
        let _vertexes = _hexes[i].vertexes;
        for (let j = 0; j < _vertexes.length; j++) {
          if (_vertexes[j].owner && !_hexes[i].robber) {
            _vertexes[j].owner[_hexes[i]['resource']]++;
          }
        }
      }
      setTurnStage("TRADE/BUILD");
      setHelpText("Conduct trades, or build settlements and roads by clicking on the board! Click 'end turn' when you're done.");
    }
    else {
      setHelpText("Place the robber on a new hex");
      setTurnStage("ROBBING");
      setMovingRobber(true);
      robLargeHands();
    }
  }

  const clickHex = (e) => {
    let h = hexes[e.target.id.substring(3, e.target.id.length)];
    if (movingRobber) {
      if (!h.resource || h.robber) {
        alert("You cannot move the robber there!");
        return;
      }
      moveRobber(e, h);
      robberSteal(h);
      setMovingRobber(false);
    }
  }

  const moveRobber = (e, h) => {
    for (let i = 0; i < hexes.length; i++) {
      if (hexes[i].robber) {
        hexes[i].robber = false;
        h.robber = true;
        let robbedHexNumber = document.querySelector("div#number" + hexes[i].name.substring(3, hexes[i].name.length));
        robbedHexNumber['classList'].remove("robber");
        robbedHexNumber = document.querySelector("div#number" + e.target.id.substring(3, e.target.id.length));
        robbedHexNumber['classList'].add("robber");
      }
    }
  }

  const robberSteal = (h) => {
    setRobbedPlayers([]);
    let _vertexes = h.vertexes;
    let victims = [];
    for (let i = 0; i < _vertexes.length; i++) {
      if (_vertexes[i].owner && _vertexes[i].owner !== whoseTurn && !victims.includes(_vertexes[i].owner)) {
        victims.push(_vertexes[i].owner);
      }
    }
    setRobbedPlayers(victims);
    setShowRobModal(true);
  }

  const rob = (victim_name) => {
    setShowRobModal(false);
    if (victim_name === null) {
      setTurnStage("TRADE/BUILD");
      setHelpText("Conduct trades, or build settlements and roads by clicking on the board! Click 'end turn' when you're done.");
      return;
    }
    let victim = players.filter(_player => _player.name === victim_name)[0];
    let victimResources = [];
    for (let i = 0; i < victim.wheat; i++) {
      victimResources.push("wheat");
    }
    for (let i = 0; i < victim.brick; i++) {
      victimResources.push("brick");
    }
    for (let i = 0; i < victim.lumber; i++) {
      victimResources.push("lumber");
    }
    for (let i = 0; i < victim.ore; i++) {
      victimResources.push("ore");
    }
    for (let i = 0; i < victim.sheep; i++) {
      victimResources.push("sheep");
    }
    if (victimResources.length) {
      let stolenResource = victimResources[Math.floor(Math.random() * victimResources.length)];
      victim[stolenResource]--;
      whoseTurn[stolenResource]++;
    }
    setTurnStage("TRADE/BUILD");
    setHelpText("Conduct trades, or build settlements and roads by clicking on the board! Click 'end turn' when you're done.");
  }

  const robLargeHands = () => {
    for (let i = 0; i < players.length; i++) {
      let resources = [];
      for (let j = 0; j < players[i].wheat; j++) {
        resources.push("wheat");
      }
      for (let j = 0; j < players[i].brick; j++) {
        resources.push("brick");
      }
      for (let j = 0; j < players[i].lumber; j++) {
        resources.push("lumber");
      }
      for (let j = 0; j < players[i].ore; j++) {
        resources.push("ore");
      }
      for (let j = 0; j < players[i].sheep; j++) {
        resources.push("sheep");
      }
      if (resources.length > 7) {
        largeHands.push(players[i])
      }
    }
    robHand();
  }

  const robHand = () => {
    if (largeHands.length) {
      setNumberResourcesToLose(Math.floor((largeHands[0].wheat + largeHands[0].lumber + largeHands[0].brick + largeHands[0].ore + largeHands[0].sheep) / 2));
      setPlayerLosingResources(largeHands[0]);
    }
  }

  const chooseLostResources = (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(resourcesLost)) {
      playerLosingResources[key] -= value;
    }
    document.querySelector("input#loseOre").value = 0;
    document.querySelector("input#loseWheat").value = 0;
    document.querySelector("input#loseLumber").value = 0;
    document.querySelector("input#loseSheep").value = 0;
    document.querySelector("input#loseBrick").value = 0;
    setResourcesLost({ wheat: 0, lumber: 0, brick: 0, ore: 0, sheep: 0 });
    for (let i = 0; i < largeHands.length; i++) {
      if (largeHands[i] === playerLosingResources) {
        largeHands.splice(i, 1);
      }
    }
    setPlayerLosingResources(false);
    robHand();
  }

  const openHelpModal = () => {
    setShowHelpModal(true);
  }

  const hideHelpModal = () => {
    setShowHelpModal(false);
  }

  const openTradeBankModal = () => {
    if (turnStage !== "TRADE/BUILD") {
      alert("Now is not the time to trade!");
      return;
    }
    setShowTradeBankModal(true);
  }

  const hideTradeBankModal = () => {
    setShowTradeBankModal(false);
  }

  const openTradePlayerModal = () => {
    if (turnStage !== "TRADE/BUILD") {
      alert("Now is not the time to trade!");
      return;
    }
    setPotentialPartners(players.filter(player => player !== whoseTurn));
    setShowTradePlayerModal(true);
  }

  const hideTradePlayerModal = () => {
    setShowTradePlayerModal(false);
  }

  const openDevelopmentCardsModal = () => {
    if (turnStage !== "TRADE/BUILD") {
      alert("Now is not the time to use development cards!");
      return;
    }
    setShowDevelopmentCardsModal(true);
  }

  const hideDevelopmentCardsModal = () => {
    setShowDevelopmentCardsModal(false);
  }
  
  const buyCard = () => {
    if (turnStage !== "TRADE/BUILD") {
      alert("Now is not the time to buy a development card!");
    }
    else if (!whoseTurn.wheat || !whoseTurn.sheep || !whoseTurn.ore) {
      alert("You do not have enough resources to purchase a development card!");
    }
    else if (!availableCards.length) {
      alert("There are no more development cards to buy this game.");
    }
    else {
      whoseTurn.wheat -= 1;
      whoseTurn.sheep -= 1;
      whoseTurn.ore -= 1;
      let card = availableCards.pop();
      if (!["Knight", "Road Building", "Year of Plenty", "Monopoly"].includes(card)) {
        whoseTurn.played_cards.push(card);
        whoseTurn.points += 1;
      }
      else {
        whoseTurn.purchased_cards.push(card);
      }
      setForceUpdate(forceUpdate + 1);
    }
  }

  const getPlayerArmySize = (_player) => {
    let army_size = 0;
    _player.played_cards.forEach(card => {
      if (card === "Knight") {
        army_size += 1;
      }
    })
    return army_size;
  }

  const cardEffects = (card) => {
    if (card === "Knight") {
      setTurnStage("ROBBING");
      setMovingRobber(true);
      let largeArmyPlayers = players.filter(_player => {
        return getPlayerArmySize(_player) >= 3;
      })
      if (largeArmyPlayers.length && !largestArmyPlayer) {
        whoseTurn.points += 2;
        setLargestArmyPlayer(whoseTurn);
        setLargestArmySize(getPlayerArmySize(whoseTurn));
        alert(whoseTurn.name + " has raised the largest army in Catan, with 3 knights!");
      }
      else if (largeArmyPlayers.length && largestArmyPlayer) {
        const largerArmies = largeArmyPlayers.filter(_player => getPlayerArmySize(_player) > largestArmySize);
        if (largerArmies.length) {
          alert(whoseTurn.name + " has recruited a larger army than " + largestArmyPlayer.name + "'s, with " + getPlayerArmySize(whoseTurn) + " knights!");
          largestArmyPlayer.points -= 2;
          whoseTurn.points += 2;
          setLargestArmyPlayer(whoseTurn);
          setLargestArmySize(getPlayerArmySize(whoseTurn));
        }
      }
    }
    else if (card === "Monopoly") {
      setShowMonopolyModal(true);
    }
    else if (card === "Year of Plenty") {
      setShowYearOfPlentyModal(true);
    }
    else if (card === "Road Building") {
      setTurnStage("ROAD BUILDING");
      setRoadBuildingCounter(2);
    }
    // console.log(whoseTurn.played_cards);
  }

  const arrayMaximumIndex = (array) => {
    let maximum = 0;
      let maximumIndex = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].length > maximum) {
          maximum = array[i].length;
          maximumIndex = i;
        }
      }
    return maximumIndex;
  }

  const removeLoops = (array) => {
    let elements = [];
    let index = 0;
    while (index < array.length) {
      if (!elements.includes(array[index])) {
        elements.push(array[index]);
      }
      else {
        array.length = index;
        break;
      }
      index++;
    }
    return array;
  }

  const exploreRoad = (_path, searchedRoads, other_branch=null) => {
    const adjacent_roads = _path.adjacent_roads.filter(road => !searchedRoads.includes(road) && road !== other_branch);
    if (other_branch && adjacent_roads) {
      searchedRoads = searchedRoads.filter(e => e !== other_branch[0]);
    }
    searchedRoads.push(_path);
    if (!adjacent_roads.length || adjacent_roads.length === 4) {
      return searchedRoads;
    }
    else if (adjacent_roads.length === 1) {
      searchedRoads = (exploreRoad(adjacent_roads[0], searchedRoads));
      return searchedRoads;
    }
    else if (adjacent_roads.length === 2) {
      const furtherRoads = [];
      let vertexesOne = adjacent_roads[0].vertexes;
      let vertexesTwo = adjacent_roads[1].vertexes;
      let intersection = vertexesOne.filter(_vertex => vertexesTwo.includes(_vertex));

      if (intersection.length) {
        furtherRoads.push(exploreRoad(adjacent_roads[0], searchedRoads, adjacent_roads[1]));
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads, adjacent_roads[0]));
        if (furtherRoads[0].length >= furtherRoads[1].length) {
          searchedRoads = (furtherRoads[0]);
          return searchedRoads;
        }
        else {
          searchedRoads = (furtherRoads[1]);
          return searchedRoads;
        }
      }
      else {
        furtherRoads.push(exploreRoad(adjacent_roads[0], searchedRoads));
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads));
        searchedRoads = searchedRoads.concat(furtherRoads[0]).concat(furtherRoads[1]);
        return searchedRoads;
      }
    }
    else if (adjacent_roads.length === 3) {
      const furtherRoads = [];
      if (adjacent_roads[0].vertexes.filter(_vertex => adjacent_roads[1].vertexes.includes(_vertex)).length > 0) {
        furtherRoads.push(exploreRoad(adjacent_roads[2], searchedRoads))
        furtherRoads.push(exploreRoad(adjacent_roads[0], searchedRoads, adjacent_roads[1]));
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads, adjacent_roads[0]));
        if (furtherRoads[0].length >= furtherRoads[1].length) {
          searchedRoads = furtherRoads[0].concat(furtherRoads[2]);
          return searchedRoads;
        }
        else {
          searchedRoads = furtherRoads[1].concat(furtherRoads[2]);
          return searchedRoads;
        }
      }
      else if (adjacent_roads[0].vertexes.filter(_vertex => adjacent_roads[2].vertexes.includes(_vertex)).length > 0) {
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads));
        furtherRoads.push(exploreRoad(adjacent_roads[0], searchedRoads, adjacent_roads[2]));
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads, adjacent_roads[0]));
        if (furtherRoads[0].length >= furtherRoads[2].length) {
          searchedRoads = furtherRoads[0].concat(furtherRoads[1]);
          return searchedRoads;
        }
        else {
          searchedRoads = furtherRoads[2].concat(furtherRoads[1]);
          return searchedRoads;
        }
      }
      else {
        furtherRoads.push(exploreRoad(adjacent_roads[0], searchedRoads));
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads, adjacent_roads[2]));
        furtherRoads.push(exploreRoad(adjacent_roads[2], searchedRoads, adjacent_roads[1]));
        if (furtherRoads[1].length >= furtherRoads[2].length) {
          searchedRoads = furtherRoads[0].concat(furtherRoads[1]);
          return searchedRoads;
        }
        else {
          searchedRoads = furtherRoads[2].concat(furtherRoads[0]);
          return searchedRoads;
        }
      }
    }
  }

  // function to longest roads for players

  const getLongestRoad = () => {
    let longestRoads = [];
    let longestLength = 0;
    let longestPlayer = null;
    players.forEach(player => {
      let playerLongRoads = [];
      const playerRoads = paths.filter(path => path.owner === player);
      if (playerRoads.length) {
        playerRoads.forEach(road => {
          let longRoad = exploreRoad(road, [], undefined);
          playerLongRoads.push(removeLoops(longRoad));
        })
        longestRoads.push({[player.name]: playerLongRoads[arrayMaximumIndex(playerLongRoads)].length});
        player.road_length = playerLongRoads[arrayMaximumIndex(playerLongRoads)].length;
      }
    })
    for (let i = 0; i < longestRoads.length; i++) {
      if (Object.values(longestRoads[i])[0] >= 5 && Object.values(longestRoads[i])[0] > longestLength) {
        longestLength = Object.values(longestRoads[i])[0];
        longestPlayer = players.filter(_player => _player.name === Object.keys(longestRoads[i])[0])[0];
      }
    }
    if (!longestRoadPlayer && longestPlayer) {
      setLongestRoadLength(longestLength);
      setLongestRoadPlayer(longestPlayer);
      longestPlayer.points += 2;
      alert(longestPlayer.name+" has built the longest road in Catan, and gains 2 points!");
    }
    else if (longestRoadPlayer && longestPlayer && longestPlayer !== longestRoadPlayer) {
      longestRoadPlayer.points -= 2;
      alert(longestPlayer.name+"'s road has overtaken "+longestRoadPlayer.name+"'s in length, and takes two points!");
      setLongestRoadLength(longestLength);
      setLongestRoadPlayer(longestPlayer);
      longestPlayer.points += 2;
    }
    else if (longestRoadPlayer && !longestPlayer) {
      alert("There are no long roads left in Catan. The previous owner of the longest road loses two points.");
      setLongestRoadLength(0);
      longestRoadPlayer.points -= 2;
      setLongestRoadPlayer();
    }
  }


  const checkVictory = () => {
    if (whoseTurn["points"] >= 10) {
      setShowVictoryModal(true);
    }
  }

  return (
    <div id="boardComponent">
      <PlayerModal showPlayerModal={showPlayerModal} startGame={startGame} players={players} setPlayers={setPlayers}/>
      <RobModal showRobModal={showRobModal} robbedPlayers={robbedPlayers} rob={rob} />
      <RobLargeHandsModal playerLondesingResources={playerLosingResources} numberResourcesToLose={numberResourcesToLose} chooseLostResources={chooseLostResources} resourcesLost={resourcesLost} setResourcesLost={setResourcesLost} />
      <HelpModal showHelpModal={showHelpModal} hideHelpModal={hideHelpModal} />
      <TradeBankModal showTradeBankModal={showTradeBankModal} hideTradeBankModal={hideTradeBankModal} whoseTurn={whoseTurn} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />
      <TradePlayerModal showTradePlayerModal={showTradePlayerModal} hideTradePlayerModal={hideTradePlayerModal} whoseTurn={whoseTurn} players={players} potentialPartners={potentialPartners} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />
      <PlayerTab whoseTurn={whoseTurn} helpText={helpText} turnStage={turnStage} rollDice={rollDice} rollDisplay={rollDisplay} movingRobber={movingRobber} nextPlayer={nextPlayer} turnStage={turnStage} openHelpModal={openHelpModal} openTradeBankModal={openTradeBankModal} openTradePlayerModal={openTradePlayerModal} buyCard={buyCard} openDevelopmentCardsModal={openDevelopmentCardsModal}/>
      <DevelopmentCardsModal whoseTurn={whoseTurn} showDevelopmentCardsModal={showDevelopmentCardsModal} hideDevelopmentCardsModal={hideDevelopmentCardsModal} turnStage={turnStage} setTurnStage={setTurnStage} cardEffects={cardEffects}></DevelopmentCardsModal>
      <MonopolyModal whoseTurn={whoseTurn} players={players} showMonopolyModal={showMonopolyModal} setShowMonopolyModal={setShowMonopolyModal}></MonopolyModal>
      <YearOfPlentyModal whoseTurn={whoseTurn} showYearOfPlentyModal={showYearOfPlentyModal} setShowYearOfPlentyModal={setShowYearOfPlentyModal}></YearOfPlentyModal>
      <VictoryModal whoseTurn={whoseTurn} showVictoryModal={showVictoryModal}></VictoryModal>
      <div id="overlays">
        <HexOverlay clickHex={clickHex} />
        <PathOverlay setupRoad={setupRoad} />
        <VertexOverlay setupSettlement={setupSettlement} />
        <NumberOverlay />
      </div>
    </div>
  )
}

export { Board as default }