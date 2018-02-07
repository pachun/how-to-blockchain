import React from 'react'
import HashExample from './HashExample'
import BlockExample from './BlockExample'
import BlockchainExample from './BlockchainExample'
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
} from 'reactstrap'

const linkColor = '#2f7df6'
const selectedLinkColor = '#000'

class App extends React.Component {
  constructor() {
    super()
    this.state = { route: 'Block' }
  }

  showHashExample  = () => this.setState({route: 'Hash'})
  showBlockExample = () => this.setState({route: 'Block'})
  showBlockchainExample = () => this.setState({route: 'Blockchain'})

  showingHashExample  = () => this.state.route === 'Hash'
  showingBlockExample = () => this.state.route === 'Block'
  showingBlockchainExample = () => this.state.route === 'Blockchain'

  HashExample  = () => this.showingHashExample() && <HashExample/>
  BlockExample = () => this.showingBlockExample() && <BlockExample/>
  BlockchainExample = () => this.showingBlockchainExample() && <BlockchainExample/>

  hashExampleLinkStyle = () => { return {
    color: this.showingHashExample() ? selectedLinkColor : linkColor
  }}
  blockExampleLinkStyle = () => { return {
    color: this.showingBlockExample() ? selectedLinkColor : linkColor
  }}

  render() {
    return (
      <Container style={{fontFamily:'Helvetica'}}>
        <Navbar style={{marginBottom: '50px'}}>
          <NavbarBrand style={{fontSize:'20pt'}}>
            Blockchain Demo
          </NavbarBrand>
          <Nav>
            <NavLink
              href="#"
              onClick={this.showHashExample}
              style={this.hashExampleLinkStyle()}>
              Hash
            </NavLink>
            <NavLink
              href="#"
              onClick={this.showBlockExample}
              style={{color: this.showingBlockExample() ? '#000' : '#2f7df6'}}>
              Block
            </NavLink>
            <NavLink
              href="#"
              onClick={this.showBlockchainExample}
              style={{color: this.showingBlockchainExample() ? '#000' : '#2f7df6'}}>
              Blockchain
            </NavLink>
          </Nav>
        </Navbar>
        { this.HashExample() }
        { this.BlockExample() }
        { this.BlockchainExample() }
      </Container>
    )
  }
}

export default App
