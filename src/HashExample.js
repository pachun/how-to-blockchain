import React from 'react'
import shajs from 'sha.js'
import {
  Alert,
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
  sha256 = text => shajs('sha256').update(text).digest('hex')

  render() {
    return (
      <div>
        <h3>SHA256 Hash</h3>
        <Alert color="secondary">

          <Row>
            <Col xs='2' style={style.label}>
              <Label>Data: </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea'
                rows='10'
                onChange={ this.updateData }/>
            </Col>
          </Row>

          <Row style={style.notTopRow}>
            <Col xs='2' style={style.label}>
              <Label>Hash: </Label>
            </Col>
            <Col xs='9'>
              <Input
                disabled={true}
                value={ this.sha256(this.state.data) }/>
            </Col>
          </Row>

        </Alert>
      </div>
    )
  }
}

export default HashExample
