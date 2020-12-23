import React from 'react';

function Menu(props) {
    function isActive(name) {
        if (name === props.showing) {
            return "active";
        } else {
            return "";
        }
    }
    let list = [
        <li key="i1">
            <a className={isActive("home")} onClick={props.click.bind(null, "home")}>
                Home</a>
        </li>,
        <li key="i2">
            <a className={isActive("activities")} onClick={props.click.bind(null, "activities")}>
                Activities</a>
        </li>
    ];
    if (props.role === "guest") {
        list.push(
            <li key="i3">
                <a className={isActive("login")} onClick={props.click.bind(null, "login")}>
                    Login</a>
            </li>
        );
        list.push(
            <li key="i4">
                <a className={isActive("membership")} onClick={props.click.bind(null, "membership")}>
                    Membership</a>
            </li>
        );
    } else {
        list.push(
            <li key="i5">
                <a className={isActive("adminAct")} onClick={props.click.bind(null, "adminAct")}>
                    Manage Activities</a>
            </li>
        );
        list.push(
            <li key="i6">
                <a className={isActive("logout")} onClick={props.click.bind(null, "logout")}>
                    Logout</a>
            </li>
        );
    }
    return (
        <nav>
            <ul className="a">{list}</ul>
        </nav>
    );
}

export default Menu;