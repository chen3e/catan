import React, { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

const YearOfPlentyModal = (props) => {
  const [wheat, setWheat] = useState(0);
  const [lumber, setLumber] = useState(0);
  const [brick, setBrick] = useState(0);
  const [ore, setOre] = useState(0);
  const [sheep, setSheep] = useState(0);

  // Make adjustments to states
  const setResources = (e) => {
    if (e.target.id === 'wheat') {
      setWheat(e.target.value);
    }
    else if (e.target.id === 'lumber') {
      setLumber(e.target.value);
    }
    else if (e.target.id === 'brick') {
      setBrick(e.target.value);
    }
    else if (e.target.id === 'ore') {
      setOre(e.target.value);
    }
    else if (e.target.id === 'sheep') {
      setSheep(e.target.value);
    }
  }

  // Add appropriate resources, set states to zero and hide modal
  const confirmResources = (e) => {
    props.whoseTurn.wheat += parseInt(wheat);
    props.whoseTurn.lumber += parseInt(lumber);
    props.whoseTurn.brick += parseInt(brick);
    props.whoseTurn.ore += parseInt(ore);
    props.whoseTurn.sheep += parseInt(sheep);
    setWheat(0);
    setLumber(0);
    setBrick(0);
    setOre(0);
    setSheep(0);
    props.setShowYearOfPlentyModal(false);
  }

  return (
    <Modal show={props.showYearOfPlentyModal}>
      <Modal.Header>
        <Modal.Title>Choose 2 resources</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Wheat ({props.whoseTurn.wheat} in hand)</Form.Label>
            <Form.Control id='wheat' type='number' min='0' max='2' onChange={setResources}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Lumber ({props.whoseTurn.lumber} in hand)</Form.Label>
            <Form.Control id='lumber' type='number' min='0' max='2' onChange={setResources}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Brick ({props.whoseTurn.brick} in hand)</Form.Label>
            <Form.Control id='brick' type='number' min='0' max='2' onChange={setResources}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ore ({props.whoseTurn.ore} in hand)</Form.Label>
            <Form.Control id='ore' type='number' min='0' max='2' onChange={setResources}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sheep ({props.whoseTurn.sheep} in hand)</Form.Label>
            <Form.Control id='sheep' type='number' min='0' max='2' onChange={setResources}/>
          </Form.Group>
          <Button onClick={confirmResources} disabled={parseInt(wheat) + parseInt(lumber) + parseInt(brick) + parseInt(ore) + parseInt(sheep) === 2 ? false : true}>Confirm resources</Button>
        </Form>
      </Modal.Body>
    </Modal >
  )
}

export { YearOfPlentyModal };