import React from 'react'
import shajs from 'sha.js'
import {
  Container,
  Col,
  Row,
  Input,
  Jumbotron,
  Label,
} from 'reactstrap'

class BlockExample extends React.Component {
  constructor() {
    super()
    this.state = {
      blockNumber: '',
      nonce: '',
      data: '',
    }
  }

  hash() {
    return(shajs('sha256').update(`${this.state.blockNumber}${this.state.nonce}${this.state.data}`).digest('hex'))
  }

  render() {
    return (
      <Container>
        <h1>Block</h1>
        <Jumbotron style={{textAlign:'right'}}>

          <Row>
            <Col xs='2'>
              <Label>Block #: </Label>
            </Col>
            <Col xs='9'>
              <Input onChange={(event) => this.setState({ ...this.state, blockNumber: event.target.value })}/>
            </Col>
          </Row>

          <Row style={{marginTop:'20px'}}>
            <Col xs='2'>
              <Label>Nonce: </Label>
            </Col>
            <Col xs='9'>
              <Input onChange={(event) => this.setState({ ...this.state, nonce: event.target.value })}/>
            </Col>
          </Row>

          <Row style={{marginTop:'20px'}}>
            <Col xs='2'>
              <Label>Data: </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea'
                rows='10'
                onChange={(event) => this.setState({ ...this.state, data: event.target.value })}/>
            </Col>
          </Row>

          <Row style={{marginTop:'20px'}}>
            <Col xs='2'>
              <Label>Hash: </Label>
            </Col>
            <Col xs='9'>
              <Input disabled={true} placeholder={ this.hash() }></Input>
            </Col>
          </Row>

        </Jumbotron>
      </Container>
    )
  }
}

export default BlockExample
