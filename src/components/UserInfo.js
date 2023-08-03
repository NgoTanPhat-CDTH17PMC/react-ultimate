import React from "react";

class UserInfo extends React.Component {
    
    state = {
        name: 'eric',
        address: 'hoi dan it',
        age: 27
    };

    hanldeOnChangeInput = (event) => { // cap nhat trang thai cua react
        this.setState({
            name: event.target.value
        })
    }

    hanldeOnChangeAge = (event) => { // cap nhat trang thai cua react
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault(); // ngan tu lao lai page
        console.log(this.state)
    }

    render() {
        return(
            <div>
                My name is {this.state.name} and i'm from {this.state.address}, I'm {this.state.age} years old!

                <br></br>
                <br></br>



                <form onSubmit={(event) => this.handleOnSubmit(event)}>

                    <label>Your name: </label>
                    <input 
                    value={this.state.name}
                    type="text"
                    onChange={(event) => this.hanldeOnChangeInput(event)}
                    />

                    <label>Your age: </label>
                    <input 
                    value={this.state.age}
                    type="text"
                    onChange={(event) => this.hanldeOnChangeAge(event)}
                    />

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}


export default UserInfo;