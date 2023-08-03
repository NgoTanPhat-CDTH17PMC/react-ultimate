// class component (co ban ban dau)
// function component (hook) 

import React from 'react'; // import thư viện react

class MyComponent extends React.Component { // ke thua tinh nag cua react component

    state = {
        name: 'eric',
        address: 'hoi dan it',
        age: 27
    };

    handleClick(event) { // event: do web api tạo ra
        console.log('Random ', Math.floor((Math.random()*100)+1));
        this.setState({
            name: 'Harry',
            age: Math.floor((Math.random()*100) + 1)
        })
    }

    handleOnMouseOver(event) {
        // console.log(event.pageX);
    }

    hanldeOnChangeInput = (event) => { // cap nhat trang thai cua react
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault(); // ngan tu lao lai page
        console.log(this.state)
    }

    render() { //tap hop nhung nguyen lieu, duc ket duoc 1 cai gi day
        return (
            <div>
                my first component 
                <br></br>
                <br></br>
                My name is {this.state.name} and i'm from {this.state.address}, I'm {this.state.age} years old!

                <br></br>
                <br></br>

                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input 
                    type="text"
                    onChange={(event) => this.hanldeOnChangeInput(event)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;