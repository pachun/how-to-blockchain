import React from 'react'
import { PulseLoader } from 'react-spinners'
import shajs from 'sha.js'
import {
  Alert,
  Button,
  Container,
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

class BlockExample extends React.Component {
  constructor() {
    super()
    this.state = {
      block: {
        number: '1',
        nonce: '72608',
        data: '',
      },
      mining: false,
    }
  }

  sha256 = text => shajs('sha256').update(text).digest('hex')
  blockAsString = block => `${block.number}${block.nonce}${block.data}`
  hash = block => this.sha256(this.blockAsString(block))
  updateBlockNumber = event => this.setState({ ...this.state, block: { ...this.state.block, number: event.target.value } })
  updateNonce = event => this.setState({ ...this.state, block: { ...this.state.block, nonce: event.target.value } })
  updateData = event => this.setState({ ...this.state, block: { ...this.state.block, data: event.target.value } })
  valid = block => this.hash(block).substring(0, 4) === "0000"
  backgroundColor = () => this.valid(this.state.block) ? "success" : "danger"

  blockToMine = () => { return { number: this.state.block.number, data: this.state.block.data, nonce: 0} }
  mine = () => this.setState({ ...this.state, mining: true}, () => setTimeout(this.findValidNonce, 6))
  findValidNonce = () => {
    for(var solvedBlock = this.blockToMine(); !this.valid(solvedBlock); solvedBlock.nonce++) {}
    this.setState({block: solvedBlock, mining: false})
  }

  render() {
    return (
      <Container>
        <h3>Block</h3>
        <Alert color={ this.backgroundColor() }>

          <Row>
            <Col xs='2' style={style.label}>
              <Label>Number: </Label>
            </Col>
            <Col xs='9'>
              <Input onChange={this.updateBlockNumber} value={this.state.block.number}/>
            </Col>
          </Row>

          <Row style={style.notTopRow}>
            <Col xs='2' style={style.label}>
              <Label>Nonce: </Label>
            </Col>
            <Col xs='9'>
              <Input onChange={this.updateNonce} value={this.state.block.nonce}/>
            </Col>
          </Row>

          <Row style={style.notTopRow}>
            <Col xs='2' style={style.label}>
              <Label>Data: </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea' rows='10'
                onChange={this.updateData} value={this.state.block.data}/>
            </Col>
          </Row>

          <Row style={style.notTopRow}>
            <Col xs='2' style={style.label}>
              <Label>Hash: </Label>
            </Col>
            <Col xs='9'>
              <Input disabled={true} value={ this.hash(this.state.block) }/>
            </Col>
          </Row>

          <Row style={style.notTopRow}>
            <Col xs='2' style={style.label}>
          </Col>
            <Col xs='9'>
              <Button color="primary" onClick={ this.mine } disabled={ this.state.mining }>
                { !this.state.mining && <span>Mine</span> }
                <PulseLoader
                  color={'#d1e5fd'}
                  loading={this.state.mining}
                />
              </Button>
            </Col>
          </Row>

        </Alert>
      </Container>
    )
  }
}

export default BlockExample
