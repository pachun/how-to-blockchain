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

  updateNumber = number => this.setState({ ...this.state, block: { ...this.state.block, number } })
  updateNonce = nonce => this.setState({ ...this.state, block: { ...this.state.block, nonce } })
  updateData = data => this.setState({ ...this.state, block: { ...this.state.block, data } })

  valid = block => this.hash(block).substring(0, 4) === "0000"
  backgroundColor = () => this.valid(this.state.block) ? "success" : "danger"

  blockToMine = () => { return { number: this.state.block.number, data: this.state.block.data, nonce: 0 } }
  mine = () => this.setState({ ...this.state, block: { ...this.state.block, mining: true } }, () => setTimeout(this.findValidNonce, 1))
  findValidNonce = () => {
    for(var solvedBlock = this.blockToMine(); !this.valid(solvedBlock); solvedBlock.nonce++) {}
    this.setState({block: {...solvedBlock, mining: false}})
  }

  render() {
    return (
      <Container>
        <h3>Blockchain</h3>
        <Block
          block={this.state.block}
          updateNumber={this.updateNumber}
          updateNonce={this.updateNonce}
          updateData={this.updateData}
          hash={this.hash}
          mine={this.mine}
          backgroundColor={this.backgroundColor}
        />
      </Container>
    )
  }
}

export default BlockchainExample
