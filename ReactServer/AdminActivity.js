/*  Class component for admin activity management
to add or delete activities.
*/

import React from 'react';
// CSS styles
let labelStyle = { justifySelf: "end", fontStyle: "italic" };
let narrStyle = { maxWidth: "150rem", display: "flex", flexDirection: "column", alignItems: "center" };
let addStyle = { border: "solid 0.5px", backgroundColor: "lightgray", textAlign: "center" };

function ActivityTable(props) {
    let trows = props.events.map(function (event, i) {
        return (
            <tr key={"event" + i}>
                <td>
                    <button onClick={props.del.bind(null, i)}>Delete</button>
                </td>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
            </tr>
        );
    });
    return (
        <table className="second">
            <thead>
                <tr><th>Name</th><th>Date</th><th>Location</th></tr>
            </thead>
            <tbody id="ActTable">
                {trows}
            </tbody>
        </table>
    );
}

class AdminActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [], addName: "", addDate: "", addLocation: ""
        };
    }

    componentDidMount() {
        let that = this;
        fetch("./activities")
            .then(function (response) {
                console.log("Request status code: ", response.statusText,
                    response.status,
                    response.type
                );
                if (response.ok) {
                    return response.json();
                } else {
                    let info = `Status code: ${response.status}, ${response.statusText}`;
                    console.log(response);
                    return Promise.reject(info);
                }
            })
            .then(data => that.setState({ events: data }))
            .catch(info => console.log(info));
    }
    // Event handlers
    nameChange(event) {
        this.setState({ addName: event.target.value });
    }

    dateChange(event) {
        this.setState({ addDate: event.target.value });
    }

    locChange(event) {
        this.setState({ addLocation: event.target.value });
    }

    addData() {
        let that = this;
        console.log("Button pressed");
        fetch("./activities", {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: that.state.addName,
                date: [that.state.addDate],
                location: that.state.addLocation
            })
        })
            .then(function (response) {
                console.log("Request status code: ", response.statusText,
                    response.status,
                    response.type
                );
                if (response.ok) {
                    return response.json();
                } else {
                    let info = `Status code: ${response.status}, ${response.statusText}`;
                    console.log(response);
                    return Promise.reject(info);
                }
            })
            .then(data => that.setState({ events: data }))
            .catch(info => console.log(info));
    }

    delData(i) {
        let that = this;
        console.log("Button pressed");
        fetch(`./activities/:${this.state.events[i]._id}`, {
            method: "delete",
            params: { id: that.state.events[i]._id },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                console.log("Request status code: ", response.statusText,
                    response.status,
                    response.type
                );
                if (response.ok) {
                    return response.json();
                } else {
                    let info = `Status code: ${response.status}, ${response.statusText}`;
                    console.log(response);
                    return Promise.reject(info);
                }
            })
            .then(data => that.setState({ events: data }))
            .catch(info => console.log(info));
    }

    render() {
        
        return (
            <div>
                <main style={narrStyle}>
                    <div className="addActivity" >
                        <h1>Activity Management</h1>
                        <h2>Add Activity</h2>
                        <form style={{
                            display: "grid", gridTemplateColumns: "100px 250px", gridColumnGap: "0.5em", justifySelf: "right",
                            padding: "0.5em", border: "solid 1px", width: "540px", marginBottom: "1em"
                        }}>
                            <label style={labelStyle}>Name:</label>
                            <input type="text" name="name" value={this.state.addName} onChange={this.nameChange.bind(this)} />
                            <label style={labelStyle}>Date:</label>
                            <input type="date" name="date" value={this.state.addDate} onChange={this.dateChange.bind(this)} />
                            <label style={labelStyle}>Location:</label>
                            <input type="text" name="location" value={this.state.addLocation} onChange={this.locChange.bind(this)} />
                            {/* <button style={{ backgroundColor: "lightgray" }} onClick={this.addData.bind(this)}>Add</button> */}
                            <label style={addStyle} type="submit" onClick={this.addData.bind(this)}>Add</label>
                        </form>
                    </div>
                    <h2>Activity</h2>
                    {/* {myTable} */}
                    <ActivityTable
                        events={this.state.events}
                        del={this.delData.bind(this)}
                    />
                </main>

                <footer>
                    <p>&copy; 2020 Contra Costa County Chess Club &#x2655;</p>
                </footer>
            </div>
        );
    }
}

export default AdminActivity;