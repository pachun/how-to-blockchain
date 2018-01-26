import React from 'react'
import HashExample from './HashExample'
import BlockExample from './BlockExample'
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
    this.state = { route: 'Hash' }
  }

  showHashExample  = () => this.setState({route: 'Hash'})
  showBlockExample = () => this.setState({route: 'Block'})

  showingHashExample  = () => this.state.route === 'Hash'
  showingBlockExample = () => this.state.route === 'Block'

  HashExample  = () => this.showingHashExample() && <HashExample/>
  BlockExample = () => this.showingBlockExample() && <BlockExample/>

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
          </Nav>
        </Navbar>
        { this.HashExample() }
        { this.BlockExample() }
      </Container>
    )
  }
}

export default App
