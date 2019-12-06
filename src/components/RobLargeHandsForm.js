import React, { useState, useEffect, useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const RobLargeHandsForm = (props) => {
  const handleChange = (e) => {
    let type = e.target.id.substring(4, e.target.id.length).toLowerCase();
    props.setResourcesLost({...props.resourcesLost, [type]: e.target.value});
  }
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Wheat ({props.wheat})</Form.Label>
          <Form.Control id="loseWheat" type="number" min="0" max={props.wheat} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Brick ({props.brick})</Form.Label>
          <Form.Control id="loseBrick" type="number" min="0" max={props.brick} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Lumber ({props.lumber})</Form.Label>
          <Form.Control id="loseLumber" type="number" min="0" max={props.lumber} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ore ({props.ore})</Form.Label>
          <Form.Control id="loseOre" type="number" min="0" max={props.ore} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sheep ({props.sheep})</Form.Label>
          <Form.Control id="loseSheep" type="number" min="0" max={props.sheep} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.chooseLostResources} style={{ display: parseInt(props.resourcesLost.wheat)+parseInt(props.resourcesLost.lumber)+parseInt(props.resourcesLost.brick)+parseInt(props.resourcesLost.ore)+parseInt(props.resourcesLost.sheep) == props.numberResourcesToLose ? "block" : "none" }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export { RobLargeHandsForm };