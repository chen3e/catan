import React, { useState, useEffect, useReducer } from 'react';
import '../css/Board.css'
import { setupBoard } from '../setup';
import { Player } from '../players';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { setState } from 'expect/build/jestMatchersObject';

const Grid = () => {
  const [hexes, setHexes] = useState([]);
  const [vertexes, setVertexes] = useState([]);
  const [paths, setPaths] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [showPlayerModal, setShowPlayerModal] = useState(false); //////
  const [whoseTurn, setWhoseTurn] = useState("");
  const [setupPhase, setSetupPhase] = useState(true); ///////
  const [setupPhaseRound, setSetupPhaseRound] = useState(1);
  const [setupRoadOrSettlement, setSetupRoadOrSettlement] = useState("settlement");
  const [lastSettlement, setLastSettlement] = useState();

  const handleClose = () => {
    setShowPlayerModal(false);
    setSetupPhase(true);
    let p = players[0];
    setWhoseTurn(p);
  };

  useEffect(() => {
    setupBoard(hexes, vertexes, paths, document);
    let player1 = new Player("player1", 1); //////
    let player2 = new Player("player2", 2); //////
    setPlayers([player1, player2]); //////
    setWhoseTurn(player1); //////
  }, [])

  const addPlayers = (e) => {
    if (playerName.length) {
      let number = players.length + 1;
      let player = new Player(playerName, number);
      setPlayers([...players, player]);
      setPlayerName('');
    }
  };

  const clickPath = (e) => {
    if (setupPhase) {
      setupRoad(e);
    }
    else {
    }
  }

  const nextPlayer = () => {
    if (setupPhase) {
      if (setupPhaseRound == 1) {
        setWhoseTurn(players[whoseTurn.number]);
      }
      else {
        setWhoseTurn(players[whoseTurn.number - 2]);
      }
    }
  }

  const setupRoad = (e) => {
    if (setupRoadOrSettlement == "settlement") {
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
    if (valid) {
      e.target['classList'].add("player" + whoseTurn.number);
      setSetupRoadOrSettlement("settlement");
      if (whoseTurn == players[players.length - 1] && setupPhaseRound == 1) {
        setSetupPhaseRound(2);
      }
      else if (whoseTurn == players[0] && setupPhaseRound == 2) {
        setSetupPhase(false);
      }
      else {
        nextPlayer();
      }
    }
    else {
      alert("Invalid road- choose a road adjacent to the settlement you just built")
    }
  }

  const clickVertex = (e) => {
    if (setupPhase) {
      setupSettlement(e);
    }
    else {
      console.log("We're free!")
    }
  }

  const setupSettlement = (e) => {
    if (setupRoadOrSettlement == "road") {
      alert("It's time to build a road, not a settlement!");
      return;
    }
    let v = vertexes[e.target.id.substring(6, e.target.id.length)];
    let neighbors = v.neighbors;
    let tooClose = false;
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].owner) {
        tooClose = true;
      }
    }
    if (v.owner) {
      alert("This settlement has already been built!");
    }
    else if (tooClose) {
      alert("This settlement is too close to another one!");
    }
    else {
      e.target['classList'].add("player" + whoseTurn.number);
      let v = vertexes[e.target.id.substring(6, e.target.id.length)];
      v.owner = whoseTurn;
      setLastSettlement(v);
      if (setupPhaseRound == 2) {
        for (let i = 0; i < v.hexes.length; i++) {
          let resource_type = v.hexes[i].resource;
          whoseTurn[resource_type]++;
        }
      }
      setSetupRoadOrSettlement("road");
    }
  }

  return (
    <div id="gridComponent">
      <div id="modalTest">
        <Modal show={showPlayerModal} onHide={handleClose} backdrop="static">
          <Modal.Header>
            <Modal.Title>Add players</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {players.map((player) => {
                return <p>{player.name} {player.number}</p>
              })}
            </div>
            <form style={{ display: players.length < 4 ? "block" : "none" }}>
              <input id="playerNameInput" type="text" placeholder="Enter player name here" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></input>
            </form></Modal.Body>
          <Modal.Footer>
            <Button id="addPlayerButton" variant="secondary" onClick={addPlayers} style={{ display: players.length < 4 ? "block" : "none" }}>
              Add player
            </Button>
            <Button id="exitPlayerModalButton" variant="primary" onClick={handleClose} style={{ display: players.length > 1 ? "block" : "none" }}>
              Start game
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div id="playerInfoTab">
        <h6>Current player: {whoseTurn.name ? whoseTurn.name : "none"}</h6>
      </div>
      <div>
        <div id="hexOverlay">
          <div id="topHexRow" className="hexRow">
            <div id="hex0" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex1" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex2" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
          </div>
          <div id="upperHexRow" className="hexRow">
            <div id="hex3" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex4" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex5" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex6" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
          </div>
          <div id="middle" className="hexRow">
            <div id="hex7" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex8" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex9" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex10" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex11" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
          </div>
          <div id="lowerHexRow" className="hexRow">
            <div id="hex12" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex13" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex14" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex15" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
          </div>
          <div id="bottomHexRow" className="hexRow">
            <div id="hex16" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex17" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
            <div id="hex18" className="hexagon">
              <div className="hexTop"></div>
              <div className="hexBottom"></div>
            </div>
          </div>
        </div>
        <div id="pathOverlay">
          <div id="topPathRow" className="pathRow">
            <div onClick={clickPath} id="path0" className="path tiltUp"></div>
            <div onClick={clickPath} id="path1" className="path tiltDown"></div>
            <div onClick={clickPath} id="path2" className="path tiltUp"></div>
            <div onClick={clickPath} id="path3" className="path tiltDown"></div>
            <div onClick={clickPath} id="path4" className="path tiltUp"></div>
            <div onClick={clickPath} id="path5" className="path tiltDown"></div>
          </div>
          <div id="topVertRow" className="pathRow vertRow">
            <div onClick={clickPath} id="path6" className="path vertical"></div>
            <div onClick={clickPath} id="path7" className="path vertical"></div>
            <div onClick={clickPath} id="path8" className="path vertical"></div>
            <div onClick={clickPath} id="path9" className="path vertical"></div>
          </div>
          <div id="upperTiltRow" className="pathRow tiltRow">
            <div onClick={clickPath} id="path10" className="path tiltUp"></div>
            <div onClick={clickPath} id="path11" className="path tiltDown"></div>
            <div onClick={clickPath} id="path12" className="path tiltUp"></div>
            <div onClick={clickPath} id="path13" className="path tiltDown"></div>
            <div onClick={clickPath} id="path14" className="path tiltUp"></div>
            <div onClick={clickPath} id="path15" className="path tiltDown"></div>
            <div onClick={clickPath} id="path16" className="path tiltUp"></div>
            <div onClick={clickPath} id="path17" className="path tiltDown"></div>
          </div>
          <div id="upperVertRow" className="pathRow vertRow">
            <div onClick={clickPath} id="path18" className="path vertical"></div>
            <div onClick={clickPath} id="path19" className="path vertical"></div>
            <div onClick={clickPath} id="path20" className="path vertical"></div>
            <div onClick={clickPath} id="path21" className="path vertical"></div>
            <div onClick={clickPath} id="path22" className="path vertical"></div>
          </div>
          <div id="upperMiddleTiltRow" className="pathRow tiltRow">
            <div onClick={clickPath} id="path23" className="path tiltUp"></div>
            <div onClick={clickPath} id="path24" className="path tiltDown"></div>
            <div onClick={clickPath} id="path25" className="path tiltUp"></div>
            <div onClick={clickPath} id="path26" className="path tiltDown"></div>
            <div onClick={clickPath} id="path27" className="path tiltUp"></div>
            <div onClick={clickPath} id="path28" className="path tiltDown"></div>
            <div onClick={clickPath} id="path29" className="path tiltUp"></div>
            <div onClick={clickPath} id="path30" className="path tiltDown"></div>
            <div onClick={clickPath} id="path31" className="path tiltUp"></div>
            <div onClick={clickPath} id="path32" className="path tiltDown"></div>
          </div>
          <div id="middleVertRow" className="pathRow vertRow">
            <div onClick={clickPath} id="path33" className="path vertical"></div>
            <div onClick={clickPath} id="path34" className="path vertical"></div>
            <div onClick={clickPath} id="path35" className="path vertical"></div>
            <div onClick={clickPath} id="path36" className="path vertical"></div>
            <div onClick={clickPath} id="path37" className="path vertical"></div>
            <div onClick={clickPath} id="path38" className="path vertical"></div>
          </div>
          <div id="lowerMiddleTiltRow" className="pathRow tiltRow">
            <div onClick={clickPath} id="path39" className="path tiltDown"></div>
            <div onClick={clickPath} id="path40" className="path tiltUp"></div>
            <div onClick={clickPath} id="path41" className="path tiltDown"></div>
            <div onClick={clickPath} id="path42" className="path tiltUp"></div>
            <div onClick={clickPath} id="path43" className="path tiltDown"></div>
            <div onClick={clickPath} id="path44" className="path tiltUp"></div>
            <div onClick={clickPath} id="path45" className="path tiltDown"></div>
            <div onClick={clickPath} id="path46" className="path tiltUp"></div>
            <div onClick={clickPath} id="path47" className="path tiltDown"></div>
            <div onClick={clickPath} id="path48" className="path tiltUp"></div>
          </div>
          <div id="lowerVertRow" className="pathRow vertRow">
            <div onClick={clickPath} id="path49" className="path vertical"></div>
            <div onClick={clickPath} id="path50" className="path vertical"></div>
            <div onClick={clickPath} id="path51" className="path vertical"></div>
            <div onClick={clickPath} id="path52" className="path vertical"></div>
            <div onClick={clickPath} id="path53" className="path vertical"></div>
          </div>
          <div id="lowerTiltRow" className="pathRow tiltRow">
            <div onClick={clickPath} id="path54" className="path tiltDown"></div>
            <div onClick={clickPath} id="path55" className="path tiltUp"></div>
            <div onClick={clickPath} id="path56" className="path tiltDown"></div>
            <div onClick={clickPath} id="path57" className="path tiltUp"></div>
            <div onClick={clickPath} id="path58" className="path tiltDown"></div>
            <div onClick={clickPath} id="path59" className="path tiltUp"></div>
            <div onClick={clickPath} id="path60" className="path tiltDown"></div>
            <div onClick={clickPath} id="path61" className="path tiltUp"></div>
          </div>
          <div id="bottomVertRow" className="pathRow vertRow">
            <div onClick={clickPath} id="path62" className="path vertical"></div>
            <div onClick={clickPath} id="path63" className="path vertical"></div>
            <div onClick={clickPath} id="path64" className="path vertical"></div>
            <div onClick={clickPath} id="path65" className="path vertical"></div>
          </div>
          <div id="bottomPathRow" className="pathRow">
            <div onClick={clickPath} id="path66" className="path tiltDown"></div>
            <div onClick={clickPath} id="path67" className="path tiltUp"></div>
            <div onClick={clickPath} id="path68" className="path tiltDown"></div>
            <div onClick={clickPath} id="path69" className="path tiltUp"></div>
            <div onClick={clickPath} id="path70" className="path tiltDown"></div>
            <div onClick={clickPath} id="path71" className="path tiltUp"></div>
          </div>
        </div>
        <div id="vertexOverlay">
          <div id="topVertexRow" className="vertexRow">
            <div onClick={clickVertex} id="vertex0" className="vertex"></div>
            <div onClick={clickVertex} id="vertex1" className="vertex"></div>
            <div onClick={clickVertex} id="vertex2" className="vertex"></div>
            <div onClick={clickVertex} id="vertex3" className="vertex"></div>
            <div onClick={clickVertex} id="vertex4" className="vertex"></div>
            <div onClick={clickVertex} id="vertex5" className="vertex"></div>
            <div onClick={clickVertex} id="vertex6" className="vertex"></div>
          </div>
          <div id="upperVertexRow" className="vertexRow">
            <div onClick={clickVertex} id="vertex7" className="vertex"></div>
            <div onClick={clickVertex} id="vertex8" className="vertex"></div>
            <div onClick={clickVertex} id="vertex9" className="vertex"></div>
            <div onClick={clickVertex} id="vertex10" className="vertex"></div>
            <div onClick={clickVertex} id="vertex11" className="vertex"></div>
            <div onClick={clickVertex} id="vertex12" className="vertex"></div>
            <div onClick={clickVertex} id="vertex13" className="vertex"></div>
            <div onClick={clickVertex} id="vertex14" className="vertex"></div>
            <div onClick={clickVertex} id="vertex15" className="vertex"></div>
          </div>
          <div id="upperMiddleVertexRow" className="vertexRow">
            <div onClick={clickVertex} id="vertex16" className="vertex"></div>
            <div onClick={clickVertex} id="vertex17" className="vertex"></div>
            <div onClick={clickVertex} id="vertex18" className="vertex"></div>
            <div onClick={clickVertex} id="vertex19" className="vertex"></div>
            <div onClick={clickVertex} id="vertex20" className="vertex"></div>
            <div onClick={clickVertex} id="vertex21" className="vertex"></div>
            <div onClick={clickVertex} id="vertex22" className="vertex"></div>
            <div onClick={clickVertex} id="vertex23" className="vertex"></div>
            <div onClick={clickVertex} id="vertex24" className="vertex"></div>
            <div onClick={clickVertex} id="vertex25" className="vertex"></div>
            <div onClick={clickVertex} id="vertex26" className="vertex"></div>
          </div>
          <div id="lowerMiddleVertexRow" className="vertexRow">
            <div onClick={clickVertex} id="vertex27" className="vertex"></div>
            <div onClick={clickVertex} id="vertex28" className="vertex"></div>
            <div onClick={clickVertex} id="vertex29" className="vertex"></div>
            <div onClick={clickVertex} id="vertex30" className="vertex"></div>
            <div onClick={clickVertex} id="vertex31" className="vertex"></div>
            <div onClick={clickVertex} id="vertex32" className="vertex"></div>
            <div onClick={clickVertex} id="vertex33" className="vertex"></div>
            <div onClick={clickVertex} id="vertex34" className="vertex"></div>
            <div onClick={clickVertex} id="vertex35" className="vertex"></div>
            <div onClick={clickVertex} id="vertex36" className="vertex"></div>
            <div onClick={clickVertex} id="vertex37" className="vertex"></div>
          </div>
          <div id="lowerVertexRow" className="vertexRow">
            <div onClick={clickVertex} id="vertex38" className="vertex"></div>
            <div onClick={clickVertex} id="vertex39" className="vertex"></div>
            <div onClick={clickVertex} id="vertex40" className="vertex"></div>
            <div onClick={clickVertex} id="vertex41" className="vertex"></div>
            <div onClick={clickVertex} id="vertex42" className="vertex"></div>
            <div onClick={clickVertex} id="vertex43" className="vertex"></div>
            <div onClick={clickVertex} id="vertex44" className="vertex"></div>
            <div onClick={clickVertex} id="vertex45" className="vertex"></div>
            <div onClick={clickVertex} id="vertex46" className="vertex"></div>
          </div>
          <div id="bottomVertexRow" className="vertexRow">
            <div onClick={clickVertex} id="vertex47" className="vertex"></div>
            <div onClick={clickVertex} id="vertex48" className="vertex"></div>
            <div onClick={clickVertex} id="vertex49" className="vertex"></div>
            <div onClick={clickVertex} id="vertex50" className="vertex"></div>
            <div onClick={clickVertex} id="vertex51" className="vertex"></div>
            <div onClick={clickVertex} id="vertex52" className="vertex"></div>
            <div onClick={clickVertex} id="vertex53" className="vertex"></div>
          </div>
        </div>
        <div id="numberOverlay">
          <div id="topNumberRow" className="numberRow">
            <div className="hexNumber">fuck</div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
          </div>
          <div id="upperNumberRow" className="numberRow">
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
          </div>
          <div id="middleNumberRow" className="numberRow">
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
          </div>
          <div id="lowerNumberRow" className="numberRow">
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
          </div>
          <div id="bottomNumberRow" className="numberRow">
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
            <div className="hexNumber"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Grid as default }