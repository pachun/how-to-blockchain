import React from 'react'
import shajs from 'sha.js'
import {
  Alert,
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

class HashExample extends React.Component {
  constructor() {
    super()
    this.state = { data: '' }
  }
  updateData = event => this.setState({ data: event.target.value })
  hash = () => shajs('sha256').update(this.state.data).digest('hex')

  render() {
    return (
      <Container>
        <h1>SHA 256 Hash</h1>
        <Alert color="secondary">

          <Row>
            <Col xs='2' style={style.label}>
              <Label>Data: </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea'
                rows='10'
                onChange={this.updateData}/>
            </Col>
          </Row>

          <Row style={style.notTopRow}>
            <Col xs='2' style={style.label}>
              <Label>Hash: </Label>
            </Col>
            <Col xs='9'>
              <Input
                disabled={true}
                value={ this.hash() }/>
            </Col>
          </Row>

        </Alert>
      </Container>
    )
  }
}

export default HashExample
