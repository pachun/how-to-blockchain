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

class HashExample extends React.Component {
  constructor() {
    super()
    this.state = { text: '' }
  }

  render() {
    return (
      <Container>
        <h1>SHA 256 Hash</h1>
        <Jumbotron style={{textAlign:'right'}}>

          <Row>
            <Col xs='2'>
              <Label>Data: </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea'
                rows='10'
                onChange={(event) => this.setState({ text: event.target.value })}/>
            </Col>
          </Row>

          <Row style={{marginTop:'20px'}}>
            <Col xs='2'>
              <Label>Hash: </Label>
            </Col>
            <Col xs='9'>
              <Input disabled={true} placeholder={ shajs('sha256').update(this.state.text).digest('hex') }></Input>
            </Col>
          </Row>

        </Jumbotron>
      </Container>
    )
  }
}

export default HashExample
