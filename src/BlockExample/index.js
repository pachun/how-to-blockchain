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
import faces from './faces'

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
        nonce: '',
        data: 'ʕ•ᴥ•ʔ',
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

  randomData = () => faces[Math.floor(Math.random() * 161)]

  updateDataRandomly = () => this.setState({ block: { ...this.state.block, data: this.randomData() } })

  showValidBlock = () => this.setState({block: {number: '1', nonce: '72608', data: ''}})

  blockAsStringInstructions = block => <p>hash({ this.blockAsString(block) }) = { this.hash(block) }</p>

  mineButton = () => <Button color="primary" onClick={ this.mine } disabled={ this.state.mining }>
      { !this.state.mining && <span>Mine</span> }
      <PulseLoader
        color={'#d1e5fd'}
        loading={this.state.mining}
      />
    </Button>

  render() {
    return (
      <Container>
        <h3>Block</h3>
        <div style={{marginBottom:'30px',marginTop:'30px'}}>
          <p>
            A blockchain is an ordered list of blocks. Each block has a number, nonce, data, and hash.
          </p>
          <h5>number</h5>
          <p>
            This block's position within the ordered list of blocks <code>[1, 2, 3, 4, 5, ..., last block's number]</code>
          </p>
          <h5>data</h5>
          <p>
            Anything. Cryptocurrency has transactions here.
          </p>
          <h5>hash</h5>
          <p>
            A hash of the <a href="https://en.wikipedia.org/wiki/Concatenation" target="_blank">concatenation</a> of all the parts of the block.
          </p>
          { this.blockAsStringInstructions(this.state.block) }
          <h5>nonce</h5>
          <p>A block is valid (green) when its hash begins with four zeroes. Otherwise, the block is invalid.</p>
          <p>Clicking { this.mineButton() } will set the <em>nonce</em> to zero and increment it until the hash begins with four zeroes.</p>
          <p><a href="" onClick={(e) => { e.preventDefault(); this.updateDataRandomly() }}>
            Changing the data after finding a nonce will likely invalidate the block again
          </a>.</p>
          <p>Finding a nonce that makes a block's hash begin with four zeroes can be time consuming (while the mine button wobbles and loads).</p>
          <p>Testing whether a block's hash begins with four zeros is very quick.</p>
          <p>You can verify this by watching the hash update immediately every time you type a new character into any of the block's fields.</p>
          <p>Since a nonce takes a long time to discover and is quickly validated, it is also called a <em>proof of work</em>.</p>
        </div>
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
              { this.mineButton() }
            </Col>
          </Row>

        </Alert>
      </Container>
    )
  }
}

export default BlockExample
