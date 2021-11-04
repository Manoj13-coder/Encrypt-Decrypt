import React,{Component} from 'react'
import $ from "jquery";
window.jQuery = $;
class Main extends Component{
    componentDidMount(){
        $(document).ready(function(){
            $("#Reciever").hide();
            $("#sw1").click(function(){
                $("#Sender").hide();
                $("#Reciever").show(1000);
            });
            $("#sw4").click(function(){
                $("#Reciever").hide();
                $("#Sender").show(1000);
            });
        });
    }
    Encrypt = (event) =>{
        event.preventDefault();
        const y = document.getElementById('rec_mes').value
        this.props.access.methods.encrypt(y).send({from : this.props.account,gas: 1500000,gasPrice : 100}).on('confirmation',(receipt) =>{
	    	this.setState({Loading : false})
	    })
    }
    Get_Hash = (event) =>{
        event.preventDefault();
        const x = document.getElementById('recieve');
        this.props.access.methods.get_hash().call().then((data)=>{
            x.innerHTML = data;
        });
    }
    Decrypt = (event) =>{
        event.preventDefault();
        const x = document.getElementById('hash_add').value;
        const show = document.getElementById('recover');
        this.props.access.methods.decrypt(x).call().then((data) =>{
            show.innerHTML = data;
        });
    }
    Del_Hash = (event) =>{
        event.preventDefault();
        const x = document.getElementById('hash_add').value;
        this.props.access.methods.del_hash(x).send({from : this.props.account,gas: 1500000,gasPrice : 100}).on('confirmation',(receipt) =>{
	    	this.setState({Loading : false})
	    })
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand bg-light mb-5">
                    <a className="brand text-decoration-none text-dark">Encrypt-Decrypt</a>
                </nav>
                <div className="card mx-auto w-75 text-center my-auto" id="Sender">
                    <div className="card-header" id="header">
                        <div className="text-right ml-auto">
                            <button className="btn btn-outline-light text-dark" id="sw1">Reciever</button>
                            <button className="btn btn-outline-light text-danger">Sender</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <small>Current Account : {this.props.account}</small>
                        <form className="form mt-5 mb-3">
                            <label className="label" htmlFor="rec_mes">Secret Message</label>
                            <input className="form-control w-75 mx-auto mb-5" required placeholder="Enter Message" id="rec_mes"/>
                            <button className="btn btn-outline-dark" type="sumbit" onClick={this.Encrypt}>Encrypt</button><br/><br/>
                            <button className="btn btn-outline-dark" type="sumbit" onClick={this.Get_Hash}>Get Hash</button>
                        </form>
                        <small><b id="recieve"></b></small>
                    </div>
                </div>
                <div className="card mx-auto w-75 text-center my-auto" id="Reciever">
                    <div className="card-header" id="header">
                        <div className="text-right ml-auto">
                            <button className="btn btn-outline-light text-danger">Reciever</button>
                            <button className="btn btn-outline-light text-dark" id="sw4">Sender</button>
                        </div>
                    </div>
                    <div className="card-body">
                    <small>Current Account : {this.props.account}</small>
                        <form className="form mt-5 mb-3">
                            <label className="label" htmlFor="hash_add">Hash Address</label>
                            <input className="form-control w-75 mx-auto mb-5" required placeholder="Enter Address" id="hash_add"/>
                            <button className="btn btn-outline-dark" type="sumbit" onClick={this.Decrypt}>Decrypt</button><br/><br/>
                            <button className="btn btn-outline-dark" type="sumbit" onClick={this.Del_Hash}>Delete Hash</button>
                        </form>
                        <small><b id="recover"></b></small>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main