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
    let player1 = new Player("player1", 1); //////
    player1.brick = 50;
    player1.lumber = 50;
    player1.sheep = 50;
    player1.wheat = 50;
    player1.ore = 50;
    player1.purchased_cards = ["Road Building", "Road Building", "Road Building", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Road Building", "Road Building", "Year of Plenty", "Year of Plenty", "Monopoly", "Monopoly"]
    let player2 = new Player("player2", 2); //////
    player2.lumber = 15;
    player2.ore = 3;
    player2.brick = 15;
    player2.sheep = 3;
    player2.wheat = 3;
    player2.purchased_cards = ["Road Building", "Road Building", "Road Building", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Road Building", "Road Building", "Year of Plenty", "Year of Plenty", "Monopoly", "Monopoly"]
    let player3 = new Player("player3", 3); //////
    player3.lumber = 15;
    player3.ore = 3;
    player3.brick = 15;
    player3.sheep = 3;
    player3.wheat = 3;
    let player4 = new Player("player4", 4); //////
    player4.lumber = 4;
    player4.ore = 3;
    player4.brick = 6;

    setPlayers([player1, player2]); //////
    setWhoseTurn(player1); //////
  }, [])

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

  // Add paths to each others' adjacent_paths property when appropriate- search for every non-foreign owned adjacent vertex and find those vertexes' paths that are owned by the same player
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
      // add CSS to the clicked element, note the new road's owner and add adjacent_paths
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
      // add CSS to selected element, note the new road's owner, update player's resources or update road building development card counter, and update adjacent_paths
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
        checkVictory();
      }
      // display error alert
      else {
        alert("New roads must connect to one of your roads or settlements!");
      }
    }
  }

  // When adding a settlement, check to see if any road chains need to be broken
  const breakAdjacentRoads = (_vertex, player) => {
    let brokenRoads = _vertex.paths.filter(path => path.owner && path.owner !== player);
    // if a road has been broken, brokenRoads.length will be 2 because of how Catan rules work-
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
        // point to this as the last built settlement for road setup purposes, add CSS, note the settlement's owner and grant victory point, break road chains (unlikely but possible), and switch to road setup phase
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
        // add CSS to selected element, grant current player victory point, break road chains, subtract resources
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

  // Roll dice
  const rollDice = () => {
    let _roll = (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2)
    setRollDisplay(_roll);
    // If a seven was not rolled, distribute resources and update turn stage/text
    if (_roll !== 7) {
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
    // Proceed to robbing, but first discard half of large hands
    else {
      setHelpText("Place the robber on a new hex");
      setTurnStage("ROBBING");
      setMovingRobber(true);
      robLargeHands();
    }
  }

  // This should only really be called when moving the robber; in that case, checks to see if the clicked hex already has robber or is the desert before calling the moveRobber and robberSteal functions
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

  // Remove robber from old robbed hex and move it to new one, and remove/add appropriate className
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

  // Identify potential victims from selected hex and open relevant modal
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

  // If a victim has been identified, steal a random resource from their hand and add it to robbing player's hand, then proceed to TRADE/BUILD phase
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

  // Identify large hands (those with more than 7 resources), add them to largeHands state and proceed to robHand
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

  // If there are any largeHands left (this function will be called once for each appropriate player), compute the numer of resources the first such hand must give up and use that hand in RobLargeHandsModal.js
  const robHand = () => {
    if (largeHands.length) {
      setNumberResourcesToLose(Math.floor((largeHands[0].wheat + largeHands[0].lumber + largeHands[0].brick + largeHands[0].ore + largeHands[0].sheep) / 2));
      setPlayerLosingResources(largeHands[0]);
    }
  }

  // Upon choosing which resources to give up, a large hand loses those resources, remove it from largeHands state so that it will not go again this roll, clear relevant inputs and states, and call robHand again for any remaining large hands
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
  
  // Buy development cards if allowed; if the card bought is a victory card, add it to the player's played cards and immediately gain a point; otherwise, add to player's purchased_cards
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

  // Search through player's played_cards and returns the number of Knights played
  const getPlayerArmySize = (_player) => {
    let army_size = 0;
    _player.played_cards.forEach(card => {
      if (card === "Knight") {
        army_size += 1;
      }
    })
    return army_size;
  }

  // Play development cards
  const cardEffects = (card) => {
    // If a Knight was played, check to see if any large armies exist
    if (card === "Knight") {
      setTurnStage("ROBBING");
      setMovingRobber(true);
      let largeArmyPlayers = players.filter(_player => {
        return getPlayerArmySize(_player) >= 3;
      })
      // If there do but no largestArmyPlayer has been crowned (this should only happen once, the first time someone accumulates 3 Knights) the current player (who presumably played the card) is rewarded with largest army and 2 points
      if (largeArmyPlayers.length && !largestArmyPlayer) {
        whoseTurn.points += 2;
        setLargestArmyPlayer(whoseTurn);
        setLargestArmySize(getPlayerArmySize(whoseTurn));
        alert(whoseTurn.name + " has raised the largest army in Catan, with 3 knights!");
      }
      // Otherwise, if there is already a largest army:
      else if (largeArmyPlayers.length && largestArmyPlayer) {
        const largerArmies = largeArmyPlayers.filter(_player => getPlayerArmySize(_player) > largestArmySize);
        // If any players have larger armies than largestArmySize (the only such players should be those whose turn it currently is and have just played knights), they take the largest army points, and largestArmyPlayer/largestArmySize are updated accordingly
        if (largerArmies.length) {
          alert(whoseTurn.name + " has recruited a larger army than " + largestArmyPlayer.name + "'s, with " + getPlayerArmySize(whoseTurn) + " knights!");
          largestArmyPlayer.points -= 2;
          whoseTurn.points += 2;
          setLargestArmyPlayer(whoseTurn);
          setLargestArmySize(getPlayerArmySize(whoseTurn));
          checkVictory();
        }
      }
    }
    // Show monopoly/year of plenty modals
    else if (card === "Monopoly") {
      setShowMonopolyModal(true);
    }
    else if (card === "Year of Plenty") {
      setShowYearOfPlentyModal(true);
    }
    // Switch to road building phase and set a counter for how many free roads are left
    else if (card === "Road Building") {
      setTurnStage("ROAD BUILDING");
      setRoadBuildingCounter(2);
    }
  }

  // Return the index of the longest element in an 2D array
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

  // Remove road loops; loop through the array that represents a chain of roads, truncate the array and break when we come across the same road twice
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

  // Recursive function to return an array representation of the longest valid road on the map
  // Three arguments: _path, a highlighted path (road segment), searchedRoads, the array representation that doubles as a list of segments that have already been searched, and other_branch, an optional argument that represents forks in the road not meant to be explored
  const exploreRoad = (_path, searchedRoads, other_branch=null) => {
    // _path's adjacent_roads property is helpful in order to find all nearby segments of road that need to be explored: those that are owned by the same player, are not already in the searchedRoads array, and are not forks in a road that should not count toward road length
    const adjacent_roads = _path.adjacent_roads.filter(road => !searchedRoads.includes(road) && road !== other_branch);
    // If there is a fork in the road, make sure that that fork is not represented in searchedRoads
    if (other_branch && adjacent_roads) {
      searchedRoads = searchedRoads.filter(e => e !== other_branch);
    }
    // Add current road segment to searchedRoads
    searchedRoads.push(_path);
    // Base cases: if there are no adjacent_roads or if there are 4 (the maximum possible number) adjacent_roads, searchedRoads can just be returned.
    // If no adjacent_roads, this is the metaphorical end of the line- there is no more counting to be done.
    // If there are 4 adjacent_roads, _path will be featured in at least one of the roads that would be returned by a call on one of its neighbors; therefore, it does not matter
    if (!adjacent_roads.length || adjacent_roads.length === 4) {
      return searchedRoads;
    }
    // If there is only one adjacent_road, set and return searchedRoads as the result from a recursive call using it and the updated searchedRoads
    else if (adjacent_roads.length === 1) {
      searchedRoads = (exploreRoad(adjacent_roads[0], searchedRoads));
      return searchedRoads;
    }
    // If there are two adjacent_roads, there are two possibilities: either they represent a fork by sharing the same vertex, or they are on opposite sides of _path
    else if (adjacent_roads.length === 2) {
      const furtherRoads = [];
      let vertexesOne = adjacent_roads[0].vertexes;
      let vertexesTwo = adjacent_roads[1].vertexes;
      let intersection = vertexesOne.filter(_vertex => vertexesTwo.includes(_vertex));
      // If there is an intersection (the two adjacent_roads are a fork), do a recursive call on each (while noting a forking road by passing an other_branch argument) and set/return searchedRoads as the longer one
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
      // If there is no fork, the long road here is simply the above case of only one adjacent_road doubled
      else {
        furtherRoads.push(exploreRoad(adjacent_roads[0], searchedRoads));
        furtherRoads.push(exploreRoad(adjacent_roads[1], searchedRoads));
        searchedRoads = searchedRoads.concat(furtherRoads[0]).concat(furtherRoads[1]);
        return searchedRoads;
      }
    }
    // If there are three adjacent_roads, they will be arranged into one fork and one lone segment. We need to concatenate the results from recursive calls on the lone segment and the longer forking segment.
    else if (adjacent_roads.length === 3) {
      const furtherRoads = [];
      // There are three forking possibilities; find which one applies and apply the above logic
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

  // Function to find the longest road, and distribute/redistribute victory points accordingly
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
    console.log(longestRoads);
  }

  // If whoseTurn has more than 10 points, they win the game!
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