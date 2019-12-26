import React, { useState, useEffect, useReducer } from 'react';
import '../css/Board.css'
import { setupBoard } from '../setup';
import { Player } from '../players';
import { PlayerModal } from '../components/PlayerModal';
import { RobModal } from '../components/RobModal';
import { HelpModal } from '../components/HelpModal';
import { PlayerTab } from './PlayerTab';
import HexOverlay from './HexOverlay';
import PathOverlay from './PathOverlay';
import VertexOverlay from './VertexOverlay';
import NumberOverlay from './NumberOverlay';
import { RobLargeHandsModal } from '../components/RobLargeHandsModal';
import { TradeBankModal } from '../components/TradeBankModal';

const Board = () => {
  const [forceUpdate, setForceUpdate] = useState(0);

  const [hexes, setHexes] = useState([]);
  const [vertexes, setVertexes] = useState([]);
  const [paths, setPaths] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [showPlayerModal, setShowPlayerModal] = useState(false); //////
  const [helpText, setHelpText] = useState("");
  const [whoseTurn, setWhoseTurn] = useState("");
  const [setupPhase, setSetupPhase] = useState(true); ///////
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

  const startGame = () => {
    setShowPlayerModal(false);
    setSetupPhase(true);
    let p = players[0];
    setWhoseTurn(p);
    setHelpText(p.name + "Build a settlement!")
  };

  useEffect(() => {
    setupBoard(hexes, vertexes, paths, document);
    let player1 = new Player("player1", 1); //////
    player1.brick = 50;
    player1.lumber = 50;
    player1.sheep = 50;
    player1.wheat = 50;
    player1.ore = 50;
    let player2 = new Player("player2", 2); //////
    player2.sheep = 4;
    player2.ore = 3;
    player2.wheat = 6;
    setPlayers([player1, player2]); //////
    setWhoseTurn(player1); //////
  }, [hexes, paths, vertexes])

  const addPlayers = (e) => {
    if (playerName.length) {
      let number = players.length + 1;
      let player = new Player(playerName, number);
      setPlayers([...players, player]);
      setPlayerName('');
    }
  };

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

  const setupRoad = (e) => {
    if (setupPhase && setupRoadOrSettlement == "settlement") {
      alert("It's time to build a settlement, not a road!");
      return;
    }
    let p = paths[e.target.id.substring(4, e.target.id.length)];
    let _vertexes = p.vertexes;
    let valid = false;
    for (let i = 0; i < _vertexes.length; i++) {
      if (_vertexes[i] === lastSettlement) {
        valid = true;
      }
    }
    if (p.owner) {
      alert("This road has already been built!");
      return;
    }
    if (setupPhase){
      if (valid) {
        e.target['classList'].add("player" + whoseTurn.number);
        p.owner = whoseTurn;
        setSetupRoadOrSettlement("settlement");
        if (whoseTurn == players[players.length - 1] && setupPhaseRound == 1) {
          setSetupPhaseRound(2);
          setHelpText("Build a settlement at least 2 vertexes away from any existing settlements!");
        }
        else if (whoseTurn == players[0] && setupPhaseRound == 2) {
          setSetupPhase(false);
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
    else {
      if (turnStage !== "TRADE/BUILD") {
        alert("Now is not the time to build a road or settlement!");
        return;
      }
      if (_vertexes.filter(_vertex => _vertex.owner === whoseTurn).length) {
        valid = true;
      }
      for (let i = 0; i < _vertexes.length; i++) {
        if (_vertexes[i].owner == null){
          for (let j = 0; j < _vertexes[i].paths.length; j++) {
            if (_vertexes[i].paths[j].owner == whoseTurn) {
              valid = true;
            }
          }
        }
      }
      if (whoseTurn.lumber < 1 || whoseTurn.brick < 1) {
        alert("You don't have enough resources to build a road!");
      }
      else if (valid) {
        e.target['classList'].add("player" + whoseTurn.number);
        p.owner = whoseTurn;
        whoseTurn.brick--;
        whoseTurn.lumber--;
        setForceUpdate(forceUpdate + 1);
      }
      else {
        alert("New roads must connect to one of your roads or settlements!");
      }
    }
  }

  const setupSettlement = (e) => {
    e.target['classList'].add("player1");
  }

  // const setupSettlement = (e) => {
  //   if (setupPhase && setupRoadOrSettlement == "road") {
  //     alert("It's time to build a road, not a settlement!");
  //     return;
  //   }
  //   let v = vertexes[e.target.id.substring(6, e.target.id.length)];
  //   let neighbors = v.neighbors;
  //   let tooClose = false;
  //   for (let i = 0; i < neighbors.length; i++) {
  //     if (neighbors[i].owner) {
  //       tooClose = true;
  //     }
  //   }
  //   if (tooClose) {
  //     alert("This settlement is too close to another one!");
  //   }
  //   else {
  //     let v = vertexes[e.target.id.substring(6, e.target.id.length)];
  //     if (setupPhase) {
  //       if (v.owner) {
  //         alert("This settlement has already been built!");
  //         return;
  //       }
  //       setLastSettlement(v);
  //       e.target['classList'].add("player" + whoseTurn.number);
  //       v.owner = whoseTurn;
  //       if (setupPhaseRound == 2) {
  //         for (let i = 0; i < v.hexes.length; i++) {
  //           let resource_type = v.hexes[i].resource;
  //           whoseTurn[resource_type]++;
  //         }
  //       }
  //       whoseTurn.points++;
  //       setForceUpdate(forceUpdate + 1);
  //       setSetupRoadOrSettlement("road");
  //       setHelpText("Build a road adjacent to the settlement you just placed!");
  //     }
  //     else if (v.owner === whoseTurn) {
  //       if (turnStage !== "TRADE/BUILD") {
  //         alert("Now is not the time to build a road or settlement!");
  //         return;
  //       }
  //       let cities = vertexes.filter(vertex => vertex.owner === whoseTurn && vertex.city);
  //       if (cities.length >= 4) {
  //         alert("You cannot build any more cities!");
  //       }
  //       else if (whoseTurn.wheat < 2 || whoseTurn.ore < 3) {
  //         alert("You don't have enough resources to build a city!");
  //       }
  //       else {
  //         whoseTurn.points++;
  //         whoseTurn.wheat -= 2;
  //         whoseTurn.ore -= 3;
  //         e.target['classList'].add("city");
  //         v.city = true;
  //         setForceUpdate(forceUpdate + 1);
  //       }
  //     }
  //     else if (v.owner && v.owner !== whoseTurn) {
  //       alert("This settlement has already been built!");
  //     }
  //     else if (!v.paths.filter(path => path.owner === whoseTurn).length) {
  //       alert("You must build settlements connected to a road you own!");
  //     }
  //     else {
  //       let settlements = vertexes.filter(vertex => vertex.owner === whoseTurn && !vertex.city);
  //       if (settlements.length >= 5) {
  //         alert("You cannot build any more settlements!");
  //         return;
  //       }
  //       else if (whoseTurn.wheat < 1 || whoseTurn.lumber < 1 || whoseTurn.brick < 1 || whoseTurn.sheep < 1) {
  //         alert("You don't have enough resources to build a settlement!");
  //       }
  //       else {
  //         whoseTurn.points++;
  //         whoseTurn.wheat--;
  //         whoseTurn.lumber--;
  //         whoseTurn.brick--;
  //         whoseTurn.sheep--;
  //         e.target['classList'].add("player" + whoseTurn.number);
  //         v.owner = whoseTurn;
  //         setForceUpdate(forceUpdate + 1);
  //       }
  //     }
  //   }
  // }

  const rollDice = () => {
    let _roll = (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2)
    setRollDisplay(_roll);
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

  const rob = (e) => {
    setShowRobModal(false);
    if (e.target.textContent == "Don't rob anyone") {
      return;
    }
    let victim = players[e.target.textContent.substring(6, 7) - 1];
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
    setShowTradeBankModal(true);
  }

  const hideTradeBankModal = () => {
    setShowTradeBankModal(false);
  }

  return (
    <div id="boardComponent">
      <PlayerModal showPlayerModal={showPlayerModal} startGame={startGame} players={players} playerName={playerName} setPlayerName={setPlayerName} addPlayers={addPlayers} />
      <RobModal showRobModal={showRobModal} robbedPlayers={robbedPlayers} rob={rob} />
      <RobLargeHandsModal playerLosingResources={playerLosingResources} numberResourcesToLose={numberResourcesToLose} chooseLostResources={chooseLostResources} resourcesLost={resourcesLost} setResourcesLost={setResourcesLost} />
      <HelpModal showHelpModal={showHelpModal} hideHelpModal={hideHelpModal}/>
      <TradeBankModal showTradeBankModal={showTradeBankModal} hideTradeBankModal={hideTradeBankModal} whoseTurn={whoseTurn} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate}/>
      <PlayerTab whoseTurn={whoseTurn} helpText={helpText} turnStage={turnStage} rollDice={rollDice} rollDisplay={rollDisplay} movingRobber={movingRobber} nextPlayer={nextPlayer} turnStage={turnStage} openHelpModal={openHelpModal} openTradeBankModal={openTradeBankModal}/>
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