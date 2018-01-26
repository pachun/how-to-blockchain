import React from 'react'
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

  hash = (simpleBlock) => shajs('sha256').update(`${simpleBlock.blockNumber}${simpleBlock.nonce}${simpleBlock.data}`).digest('hex')
  updateBlockNumber = event => this.setState({ ...this.state, block: { blockNumber: event.target.value } })
  updateNonce = event => this.setState({ ...this.state, block: { nonce: event.target.value } })
  updateData = event => this.setState({ ...this.state, block: { data: event.target.value } })
  valid = (simpleBlock) => this.hash(simpleBlock).substring(0, 4) === "0000"
  backgroundColor = () => this.valid(this.state.block) ? "success" : "danger"

  mine = () => {
    // this.setState({...this.state, mining: true})

    var simpleBlock = {
      blockNumber: this.state.block.blockNumber,
      nonce: 0,
      data: this.state.block.data,
    }

    for(; !this.valid(simpleBlock); simpleBlock.nonce++) {
      this.setState({...this.state, block: simpleBlock})
    }

    // this.setState({...this.state, mining: false})
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
            <Col xs='2'/>
            <Col xs='9'>
              <Button color="primary" onClick={this.mine}>
                Mine
              </Button>
            </Col>
          </Row>

        </Alert>
      </Container>
    )
  }
}

export default BlockExample