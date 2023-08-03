// class component (co ban ban dau)
// function component (hook) 

import React from 'react'; // import thư viện react
import UserInfo from './UserInfo';

class MyComponent extends React.Component { // ke thua tinh nag cua react component

    render() { //tap hop nhung nguyen lieu, duc ket duoc 1 cai gi day
        return (
            <div>
                my first component 
                <br></br>
                <br></br>

                <UserInfo></UserInfo>
            </div>
        );
    }
}

export default MyComponent;