// class component (co ban ban dau)
// function component (hook) 

import React from 'react'; // import thư viện react

class MyComponent extends React.Component { // ke thua tinh nag cua react component

    state = {
        name: 'eric',
        address: 'hoi dan it',
        age: 27
    };

    render() { //tap hop nhung nguyen lieu, duc ket duoc 1 cai gi day
        return (
            <div>
                my first component <br></br>
                {Math.random()}
                <br></br>
                My name is {this.state.name} and i'm from {this.state.address}, I'm {this.state.age} year old!
            </div>
        );
    }
}

export default MyComponent;