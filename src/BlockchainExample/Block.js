import React from 'react'
import { PulseLoader } from 'react-spinners'
import {
  Alert,
  Button,
  Col,
  Row,
  Input,
  Label,
} from 'reactstrap'

const style = {
  label: {
    textAlign: 'right',
    fontWeight: 'bold',
    lineHeight:'30pt',
  },
  notTopRow: {
    marginTop:'20px',
  },
}

const update = updateFunction => event => updateFunction(event.target.value)

const Block = ({ block, updateNumber, updateNonce, updateData, mine, mining, hash, backgroundColor }) =>
  <Alert color={ backgroundColor(block) }>
    <Row>
      <Col xs='2' style={ style.label }>
        <Label>Number: </Label>
      </Col>
      <Col xs='9'>
        <Input onChange={ update(updateNumber) } value={ block.number }/>
      </Col>
    </Row>

    <Row style={ style.notTopRow }>
      <Col xs='2' style={ style.label }>
        <Label>Nonce: </Label>
      </Col>
      <Col xs='9'>
        <Input onChange={ update(updateNonce) } value={ block.nonce }/>
      </Col>
    </Row>

    <Row style={ style.notTopRow }>
      <Col xs='2' style={ style.label }>
        <Label>Data: </Label>
      </Col>
      <Col xs='9'>
        <Input
          type='textarea' rows='10'
          onChange={ update(updateData) } value={ block.data }/>
      </Col>
    </Row>

    <Row style={ style.notTopRow }>
      <Col xs='2' style={ style.label }>
        <Label>Hash: </Label>
      </Col>
      <Col xs='9'>
        <Input disabled={ true } value={ hash(block) }/>
      </Col>
    </Row>

    <Row style={ style.notTopRow }>
      <Col xs='2'/>
      <Col xs='9'>
        <Button color="primary" onClick={ mine } disabled={ block.mining }>
          { !block.mining && <span>Mine</span> }
          <PulseLoader
            color={'#d1e5fd'}
            loading={ block.mining }
          />
        </Button>
      </Col>
    </Row>
  </Alert>

export default Block
