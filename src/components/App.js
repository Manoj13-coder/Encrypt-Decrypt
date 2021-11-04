import React,{Component} from "react";
import "./App.css";
import Main from './Main.js';
import $ from "jquery";
import Web3 from 'web3';
import Secret from '../abis/Secret.json';
window.jQuery = $;
class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			account: null,
			Loading: true,
			access: null
		}
	}
	async componentWillMount(){
	    await this.loadWeb3()
	    await this.loadBlockchainData()
	}
	async loadWeb3() {
	    if (window.ethereum) {
	      window.web3 = new Web3(window.ethereum)
	      await window.ethereum.enable()
	    }
	    else if (window.web3) {
	      window.web3 = new Web3(window.web3.currentProvider)
	    }
	    else {
	      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
	    }
	}
	async loadBlockchainData() {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({account : accounts[0]})
      const networkId = await web3.eth.net.getId()
      const networkData = Secret.networks[networkId]
      if(networkData) {
      	this.setState({Loading : false})
        const access = web3.eth.Contract(Secret.abi, networkData.address)
        this.setState({access : access})
      }else{
      	alert("Connect it to your localhost (Ganache) !!")
      }
    }
	render(){
		return (
			this.state.Loading ? <div id="Loading">
									<div className="spinner-grow text-muted"></div>
									<div className="spinner-grow text-primary"></div>
									<div className="spinner-grow text-success"></div>
									<div className="spinner-grow text-info"></div>
									<div className="spinner-grow text-warning"></div>
									<div className="spinner-grow text-danger"></div>
									<div className="spinner-grow text-secondary"></div>
									<div className="spinner-grow text-dark"></div>
									<div className="spinner-grow text-light"></div>
								 </div>:
								 <div>
									 <Main
									 account = {this.state.account}
									 access = {this.state.access}
									 Loading = {this.state.Loading}/>
								 </div>
		);
	}
}
export default App;