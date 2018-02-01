import React from 'react'
import update from 'immutability-helper'
import { Container } from 'reactstrap'
import shajs from 'sha.js'
import Block from './Block'

class BlockchainExample extends React.Component {
  constructor() {
    super()
    this.state = {
      blocks: [{
        number: '1',
        nonce: '18012',
        data: 'Genesis',
        mining: false,
        parentHash: () => '¯\\_(ツ)_/¯',
      },{
        number: '2',
        nonce: '27320',
        data: '',
        mining: false,
        parentHash: () => this.hash(this.state.blocks[0]),
      }],
    }
  }

  blockAsString = block => `${block.number}${block.nonce}${block.data}${block.parentHash()}`
  sha256 = text => shajs('sha256').update(text).digest('hex')
  hash = block => this.sha256(this.blockAsString(block))

  newBlock = (index, newAttributes) => { return { ...this.state.blocks[index], ...newAttributes }}

  updateNumber = index => number => this.setState(
    update(this.state, {blocks: {[index]: {$set: this.newBlock(index, {number})}}})
  )

  updateNonce = index => nonce => this.setState(
    update(this.state, {blocks: {[index]: {$set: this.newBlock(index, {nonce})}}})
  )

  updateData = index => data => this.setState(
    update(this.state, {blocks: {[index]: {$set: this.newBlock(index, {data})}}})
  )

  valid = block => this.hash(block).substring(0, 4) === "0000"
  backgroundColor = block => this.valid(block) ? "success" : "danger"

  blockToMine = index => {
    const block = this.state.blocks[index]
    return { ...block, nonce: 0 }
  }

  mine = index => () => this.setState(
    update(this.state, {blocks: {[index]: {$set: this.newBlock(index, {mining: true})}}}),
    () => setTimeout(this.findValidNonce(index), 1),
  )

  findValidNonce = (index) => () => {
    for(var solvedBlock = this.blockToMine(index); !this.valid(solvedBlock); solvedBlock.nonce++) {}
    this.setState(update(this.state, {blocks: {[index]: {$set: this.newBlock(index, {...solvedBlock, mining: false})}}}))
  }

  render() {
    return (
      <Container>
        <h3>Blockchain</h3>
        { this.state.blocks.map( (block, index) =>
          <Block
            block={block}
            updateNumber={this.updateNumber(index)}
            updateNonce={this.updateNonce(index)}
            updateData={this.updateData(index)}
            hash={this.hash}
            mine={this.mine(index)}
            backgroundColor={this.backgroundColor}
          />
        ) }
      </Container>
    )
  }
}

export default BlockchainExample
