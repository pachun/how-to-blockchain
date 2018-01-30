import React from 'react'
import { Container } from 'reactstrap'
import shajs from 'sha.js'
import Block from './Block'

class BlockchainExample extends React.Component {
  constructor() {
    super()
    this.state = {
      block: {
        number: '1',
        nonce: '72608',
        data: '',
        mining: false,
      },
    }
  }

  blockAsString = block => `${block.number}${block.nonce}${block.data}`
  sha256 = text => shajs('sha256').update(text).digest('hex')
  hash = block => this.sha256(this.blockAsString(block))

  updateNumber = block => number => this.setState({ ...this.state, block: { ...block, number } })
  updateNonce = block => nonce => this.setState({ ...this.state, block: { ...block, nonce } })
  updateData = block => data => this.setState({ ...this.state, block: { ...block, data } })

  valid = block => this.hash(block).substring(0, 4) === "0000"
  backgroundColor = block => this.valid(block) ? "success" : "danger"

  blockToMine = block => { return { number: block.number, data: block.data, nonce: 0 } }
  mine = block => this.setState({ ...this.state, block: { ...block, mining: true } }, () => setTimeout(this.findValidNonce(block), 1))
  findValidNonce = block => () => {
    for(var solvedBlock = this.blockToMine(block); !this.valid(solvedBlock); solvedBlock.nonce++) {}
    this.setState({block: {...solvedBlock, mining: false}})
  }

  render() {
    return (
      <Container>
        <h3>Blockchain</h3>
        <Block
          block={this.state.block}
          updateNumber={this.updateNumber(this.state.block)}
          updateNonce={this.updateNonce(this.state.block)}
          updateData={this.updateData(this.state.block)}
          hash={this.hash}
          mine={this.mine}
          backgroundColor={this.backgroundColor}
        />
      </Container>
    )
  }
}

export default BlockchainExample
