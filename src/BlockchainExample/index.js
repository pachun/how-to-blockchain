import React from 'react'
import update from 'immutability-helper'
import { Button, Container } from 'reactstrap'
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

  removeBlock = () => this.setState({ blocks: this.state.blocks.splice(0, this.state.blocks.length-1) })

  addBlock = () => {
    const index = this.state.blocks.length - 1
    this.setState({blocks: [
    ...this.state.blocks,
    {
      number: parseInt(this.state.blocks[index].number) + 1,
      nonce: '0',
      data: '',
      mining: false,
      parentHash: () => this.hash(this.state.blocks[index]),
    },
    ]})
  }

  addABunchOfBlocks = () => this.setState({ blocks: [{
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
  },{
    number: '3',
    nonce: '74179',
    data: '',
    mining: false,
    parentHash: () => this.hash(this.state.blocks[1]),
  },{
    number: '4',
    nonce: '66249',
    data: '',
    mining: false,
    parentHash: () => this.hash(this.state.blocks[2]),
  },{
    number: '5',
    nonce: '156856',
    data: '',
    mining: false,
    parentHash: () => this.hash(this.state.blocks[3]),
  }]})

  blocks = () => this.state.blocks.map( (block, index) =>
    <Block
      block={block}
      updateNumber={this.updateNumber(index)}
      updateNonce={this.updateNonce(index)}
      updateData={this.updateData(index)}
      hash={this.hash}
      mine={this.mine(index)}
      backgroundColor={this.backgroundColor}
    />
  )

  addBlockButton = () => <Button color="primary" onClick={this.addBlock}>Add Block</Button>

  render() {
    return (
      <Container>
        <h3>Blockchain</h3>
        <p>(<strong>Below is a real blockchain you can play with!</strong>)</p>
        <p>Blocks actually have one more peice of information: A <em>parent hash</em>.</p>
        <p>The parent hash for block number 2 is the hash of block number 1.</p>
        <p>The parent has for block number 3 is the hash of block number 2.</p>
        <p>... you get it ...</p>
        <p>The first block is special. Since no block precedes it, it has no parent hash and blockchain creators put whatever they want in there ¯\_(ツ)_/¯</p>
        <p>Try adding some blocks by clicking or tapping { this.addBlockButton() }</p>
        <p>They initially show up invalid, since their hashes don't begin with four zeroes.</p>
        <p>If you mine them in order without changing them, you can all the blocks in the blockchain valid.</p>
        <p>Try <a href="" onClick={(e) => { e.preventDefault(); this.addABunchOfBlocks()}}>adding a bunch of blocks</a> and then changing one in the middle. See what it does to the rest?</p>
        <p>It's easy to see if one of the blocks in the blockchain have been tampered with.</p>
        <p>Practical applications of the blockchain keep copies on everyone in the network's computer.</p>
        <p>When someone tries to volunteer a maliciously altered version of the blockchain, everyone else in the network will know and reject it.</p>
        <p>I don't confidently understand the distributed part of how blockchains work. If you find a good explanation, pleaase <a href="mailto:nick@pachulski.me">email it to me</a>.</p>
        { this.blocks() }
        <div style={{marginBottom:'50px', maxWidth: '500px', display:'flex',justifyContent:'space-between'}}>
          { this.addBlockButton() }
          { this.state.blocks.length > 1 && <Button color="danger" onClick={this.removeBlock}>Remove Block</Button>}
        </div>
      </Container>
    )
  }
}

export default BlockchainExample
