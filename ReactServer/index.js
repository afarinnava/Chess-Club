// index.js file
import React from "react";
import ReactDOM from "react-dom";
import Menu from "./menu";
import Home from "./home";
import Activities from "./activities";
import Login from "./login";
import Membership from "./membership";
import AdminActivity from "./AdminActivity"

let addStyle = {
    border: "dashed blue 1px", backgroundColor: "rgb(206, 137, 177)",
    textAlign: "left", marginTop: "3em", maxWidth: "15em"
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "guest", show: "home", userInfo: null
        };
    }
    // Event handlers
    userRole(role, userInfo) {
        this.setState({ role: role, userInfo: userInfo });
        if (role === "admin") {
            this.setState({ show: "adminAct" });
        }
        if (role === "member") {
            this.setState({ show: "activities" });
        }
    }

    showHandler(event) {
        let that = this;
        if (event === "logout") {
            fetch("/logout").then(function (res) {
                that.setState({ role: "guest", show: "home" });
            });
        } else {
            this.setState({ show: event });
        }
    }

    render() {
        let content = <Home />;
        let userInfo = <p className="userInfo"></p>;
        if (this.state.role === "admin" || this.state.role === "member") {
            userInfo = (<p style={addStyle} className="userInfo">
                {this.state.userInfo.firstName} {this.state.userInfo.lastName}, Role: {this.state.role}
            </p>
            );
        }
        switch (this.state.show) {
            case "home":
                content = <Home />;
                break;
            case "activities":
                content = <Activities />;
                break;
            case "login":
                content = <Login userRole={this.userRole.bind(this)} />;
                break;
            case "membership":
                content = <Membership />;
                break;
            case "adminAct":
                content = <AdminActivity />;
                break;
            default:
                content = <h2>Warning something went wrong!</h2>;
        }
        return (
            <>
                <Menu role={this.state.role} showing={this.state.show} click={this.showHandler.bind(this)} />
                {userInfo}
                {content}
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
