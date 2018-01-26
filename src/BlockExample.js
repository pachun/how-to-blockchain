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
        blockNumber: '1',
        nonce: '',
        data: '',
      },
      mining: false,
    }
  }

  hash = block => shajs('sha256').update(`${block.blockNumber}${block.nonce}${block.data}`).digest('hex')
  updateBlockNumber = event => this.setState({ block: { blockNumber: event.target.value } })
  updateNonce = event => this.setState({ block: { nonce: event.target.value } })
  updateData = event => this.setState({ block: { data: event.target.value } })
  valid = block => this.hash(block).substring(0, 4) === "0000"
  backgroundColor = () => this.valid(this.state.block) ? "success" : "danger"

  blockToMine = () => { return { blockNumber: this.state.block.blockNumber, data: this.state.block.data, nonce: 0} }
  mine = () => this.setState({block: this.state.block, mining: true}, () => setTimeout(this.findValidNonce, 6))
  findValidNonce = () => {
    for(var solvedBlock = this.blockToMine(); !this.valid(solvedBlock); solvedBlock.nonce++) {}
    this.setState({block: solvedBlock, mining: false})
  }

  render() {
    return (
      <Container>
        <h1>Block</h1>
        <Alert color={ this.backgroundColor() }>

          <Row>
            <Col xs='2' style={style.label}>
              <Label>Block #: </Label>
            </Col>
            <Col xs='9'>
              <Input onChange={this.updateBlockNumber} value={this.state.block.blockNumber}/>
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
              <Button color="primary" onClick={ this.mine }>
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
