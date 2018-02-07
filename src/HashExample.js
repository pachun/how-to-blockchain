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
    const a = (word) => <a href="#" onClick={() => this.setState({data: word})}>{word}</a>

    return (
      <div>
        <h3>SHA256 Hash</h3>
        <div style={{marginBottom:'30px',marginTop:'30px'}}>
          <p>
            <a target="_blank" href="https://en.wikipedia.org/wiki/Hash_function">A hash function is any function that can be used to map data of arbitrary size to data of fixed size</a>.
          </p>
          <p>
            Hash functions are <a target="_blank" href="https://en.wikipedia.org/wiki/Deterministic_system">deterministic</a> (or "<a target="_blank" href="https://en.wikipedia.org/wiki/Pure_function">pure</a>"), meaning they always return the same output given the same input.
          </p>
          <p>
            <a target="_blank" href="https://en.wikipedia.org/wiki/Vertical_line_test">Remember your math teacher's vertical line test for f(x)</a>? (what computer people call a "pure" function, math people just call functions)
          </p>
          <p>
            {a('The')} {a('output')} {a('for')} {a('each')} {a('of')} {a('these')} {a('will')} {a('never')} {a('change')}.
          </p>
          <p>
            You don't need to understand <em>how</em> hash functions work to understand blockchain. You just need to know <em>that</em> hash functions work this way.
          </p>
        </div>
        <Alert color="secondary">

          <Row>
            <Col xs='2' style={style.label}>
              <Label>Data: </Label>
            </Col>
            <Col xs='9'>
              <Input
                type='textarea'
                rows='10'
                onChange={ this.updateData }
                value={ this.state.data }/>
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
