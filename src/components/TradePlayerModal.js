import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const TradePlayerModal = (props) => {
  const [tradePartner, setTradePartner] = useState();
  const [choosingOrTrading, setChoosingOrTrading] = useState('choosing');
  const [currentPlayerOffer, setCurrentPlayerOffer] = useState({'wheat': 0, 'lumber': 0, 'brick': 0, 'ore': 0, 'sheep': 0});
  const [tradingPlayerOffer, setTradingPlayerOffer] = useState({'wheat': 0, 'lumber': 0, 'brick': 0, 'ore': 0, 'sheep': 0});
  const [validTrade, setValidTrade] = useState(false);
  const choosePartner = (e) => {
    setTradePartner(props.players.filter(player => player.name == e.target['id'])[0]);
    props.setForceUpdate(props.forceUpdate + 1);
    setChoosingOrTrading('trading');
  }
  useEffect(() => {
    let currentOffer = false;
    let tradingOffer = false;
    let currentResources = [];
    let tradingResources = [];
    for (const resource in currentPlayerOffer) {
      if (currentPlayerOffer[resource] != 0) {
        currentOffer = true;
        currentResources.push(resource);
      }
    }
    for (const resource in tradingPlayerOffer) {
      if (tradingPlayerOffer[resource] != 0) {
        tradingOffer = true;
        tradingResources.push(resource);
      }
    }
    if (currentOffer && tradingOffer && currentResources.filter((resource) => tradingResources.includes(resource)).length === 0) {
      setValidTrade(true);
    }
    else {
      setValidTrade(false);
    }
  }, [currentPlayerOffer, tradingPlayerOffer])
  const changeCurrentOffer = (e) => {
    let resource = e.target.id.replace('currentPlayer', '').toLowerCase();
    setCurrentPlayerOffer({...currentPlayerOffer, [resource]: parseInt(e.target.value)});
  }
  const changePartnerOffer = (e) => {
    let resource = e.target.id.replace('tradingPlayer', '').toLowerCase();
    setTradingPlayerOffer({...tradingPlayerOffer, [resource]: parseInt(e.target.value)});
  }
  const confirmTrade = (e) => {
    Object.keys(currentPlayerOffer).forEach(type => {
      props.whoseTurn[type] -= currentPlayerOffer[type];
      tradePartner[type] += currentPlayerOffer[type];
    })
    Object.keys(tradingPlayerOffer).forEach(type => {
      tradePartner[type] -= tradingPlayerOffer[type];
      props.whoseTurn[type] += tradingPlayerOffer[type];
    })
    setCurrentPlayerOffer({'wheat': 0, 'lumber': 0, 'brick': 0, 'ore': 0, 'sheep': 0});
    setTradingPlayerOffer({'wheat': 0, 'lumber': 0, 'brick': 0, 'ore': 0, 'sheep': 0});
    props.hideTradePlayerModal();
  }
  return (
    <Modal size={ choosingOrTrading == 'trading' ? 'lg' : ''} show={props.showTradePlayerModal} onHide={props.hideTradePlayerModal}>
      { choosingOrTrading === 'choosing' ?
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Choose a player to trade with</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              { props.potentialPartners.length ? props.potentialPartners.map(player => <Button id={player.name} onClick={choosePartner} className="mb-2">{player.name} ({player.wheat+player.lumber+player.brick+player.sheep+player.ore} resources, {player.points} victory points)</Button>) : <p></p> }
            </div>
          </Modal.Body>
        </div>
        :
        <div>
          <Modal.Header closeButton>
            { tradePartner? <Modal.Title>Trade with {tradePartner.name}</Modal.Title> : <p></p> }
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <p>Current player offer:</p>
                  <Form.Group>
                    <Form.Label>Wheat ({props.whoseTurn.wheat})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="currentPlayerWheat" type="number" min="0" max={props.whoseTurn.wheat} onChange={changeCurrentOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Lumber ({props.whoseTurn.lumber})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="currentPlayerLumber" type="number" min="0" max={props.whoseTurn.lumber} onChange={changeCurrentOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Brick ({props.whoseTurn.brick})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="currentPlayerBrick" type="number" min="0" max={props.whoseTurn.brick} onChange={changeCurrentOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Ore ({props.whoseTurn.ore})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="currentPlayerOre" type="number" min="0" max={props.whoseTurn.ore} onChange={changeCurrentOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Sheep ({props.whoseTurn.sheep})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="currentPlayerSheep" type="number" min="0" max={props.whoseTurn.sheep} onChange={changeCurrentOffer}/>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <p>{tradePartner.name}'s offer:</p>
                  <Form.Group>
                    <Form.Label>Wheat ({tradePartner.wheat})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="tradingPlayerWheat" type="number" min="0" max={tradePartner.wheat} onChange={changePartnerOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Lumber ({tradePartner.lumber})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="tradingPlayerLumber" type="number" min="0" max={tradePartner.lumber} onChange={changePartnerOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Brick ({tradePartner.brick})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="tradingPlayerBrick" type="number" min="0" max={tradePartner.brick} onChange={changePartnerOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Ore ({tradePartner.ore})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="tradingPlayerOre" type="number" min="0" max={tradePartner.ore} onChange={changePartnerOffer}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Sheep ({tradePartner.sheep})</Form.Label>
                    <Col sm="5">
                      <Form.Control id="tradingPlayerSheep" type="number" min="0" max={tradePartner.sheep} onChange={changePartnerOffer}/>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Button className="mr-3" disabled={ validTrade ? false : true } onClick={confirmTrade}>Confirm trade</Button>
              <Button onClick={() => setChoosingOrTrading('choosing')}>Change trade partner</Button>
            </Form>
          </Modal.Body>
        </div>
      }
    </Modal>
  )
}

export { TradePlayerModal };