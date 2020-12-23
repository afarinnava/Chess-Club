import React from 'react';
import { render } from "react-dom";
import board2 from "./images/board2.jpg";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    // Event handlers
    emailHandler(event) {
        this.setState({ email: event.target.value });
    }
    passwordHandler(event) {
        this.setState({ password: event.target.value });
    }

    loginChange() {
        let that = this;
        console.log("Button pressed");
        fetch("./login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: that.state.email,
                password: that.state.password,
            }),
        })
            .then(function (response) {
                console.log(
                    "Request status code: ",
                    response.statusText,
                    response.status,
                    response.type
                );
                if (response.ok) {
                    return response.json();
                } else {
                    let info = `Status code: ${response.status}, ${response.statusText}`;
                    console.log(response);
                    return Promise.reject(info); // rejected promise
                }
            })
            .then(function (response) {
                console.log(response);
                that.props.userRole(response.role, response);
            })
            .catch(function (info) {
                console.log(info);
                that.props.userRole("guest", null);
            });
    }
    render() {
        let gmaeImage = <img className="im2" src={board2} alt="Board game" />;
        return (
            <div>
                <header>
                    <h1>Login Information</h1>
                    {gmaeImage}
                </header>
                <main>
                    <p>You can login to your account from here.</p>
                    <form>
                        <label>Email </label>
                        <input type="email" value={this.state.email} onChange={this.emailHandler.bind(this)} />
                        <label>Password </label>
                        <input type="password" value={this.state.password} onChange={this.passwordHandler.bind(this)} />
                        {/* <button id="TheButton" onClick={this.loginChange.bind(this)}>Login</button> */}
                        <input type="button" value="Login" onClick={this.loginChange.bind(this)} />
                    </form>
                </main>
                <footer>
                    <p>&copy; 2020 Contra Costa County Chess Club &#x2655;</p>
                </footer>
            </div>
        );
    }
}

export default Login;
