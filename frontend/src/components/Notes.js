import React, { Component } from 'react';
import axios from 'axios';

class Notes extends Component {
    state= {notes: [], newNotes: "", id: 0, isUpdate: false };

    async componentDidMount() {
        axios.get("http://localhost:4000/notes")
        .then (res => (this.setState({ notes:res.data})))
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    createNotes = (e) => {
        if(this.state.isUpdate){
            axios.put(`http://localhost:4000/notes/${this.state.id}`,{notes: this.state.newNotes})
            .then (response => {
                this.setState({isUpdate: false})
            axios.get("http://localhost:4000/notes")
            .then (res => (this.setState({ notes:res.data, newNotes: ""})))
            })
            
        }
        else{
            axios.post("http://localhost:4000/notes", {notes: this.state.newNotes})
        .then (response => {
            axios.get("http://localhost:4000/notes")
        .then (res => (this.setState({ notes:res.data, newNotes: ""})))
        })
        
        }
    }

    deleteNotes = (id) => {
        axios.delete(`http://localhost:4000/notes/${id}`)
        .then (response => {
            axios.get("http://localhost:4000/notes")
        .then (res => (this.setState({ notes:res.data, newNotes: ""})))
        })
    }

    logout = () => {
        localStorage.removeItem ('isLogged');
        window.location.href = '/login'
    }
    render() {
        const { notes, newNotes } = this.state;
        
        return (
        <div className="container"> 
            <h2 className=" p-4 text-center "> Welcome to Notes Making Application 
            <button className="btn btn-danger float-right" onClick={this.logout}> log out </button>
            </h2>
            
                <div className="row">
                    
            <div className="col-6 card" style={{minHeight: 800}}>
                {notes.map(note =>  
                    <div className="row p-3">
                        <div className="col-8"> {note.notes} </div> 
                        <div className="col-2"><button className="btn btn-primary" onClick={() => this.setState({id: note._id, newNotes: note.notes, isUpdate: true })}>Edit</button></div>
                        <div className="col-2"><button className="btn btn-primary" onClick={() => this.deleteNotes(note._id)}>Delete</button></div>
                    </div> 
                )}
            </div>
            <div className="col-6 card "  style={{minHeight: 800}}>
            <div className="mt-3">
                <input name="newNotes" 
                className="col-12 p-4 text-center" 
                placeholder="Enter your notes here" 
                value={newNotes} 
                id="w3mission" 
                onChange={this.handleChange}>
                    
                </input>
                <br />
                <button className="btn btn-primary col-4 mt-3 float-right" onClick={this.createNotes}>Add</button>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default Notes;