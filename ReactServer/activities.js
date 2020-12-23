import React from 'react';

class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    componentDidMount() {
        let that = this;
        fetch("./activities")
            .then(function (response) {
                console.log(
                    "Request status code: ",
                    response.statusText,
                    response.type
                );
                if (response.ok) {
                    return response.json();
                } else {
                    let info = `Status code: ${response.status}`;
                    return Promise.reject(info);
                }
            })
            .then(data => that.setState({ events: data }))
            .catch(info => console.log(info));
    }
    render() {
        const { events } = this.state;
        let tableRows = events.map(function (event) {
            return <tr key={event.name}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td></tr>;
        })
        // Create a table using rows from above
        let myTable = <table>
            <thead>
                <tr><th>Name</th><th>Date</th><th>Location</th></tr>
            </thead>
            <tbody id="ActTable">
                {tableRows}
            </tbody>
        </table>;
        // Use some of the events information below
        return (
            <div>
                <header>
                    <h1>Club Activity</h1>
                </header>

                <main>
                    <h2>Activity Types</h2>
                    <ul>
                        <li>Online classes</li>
                        <li>Online competitions</li>
                        <li>Weekly gatherings</li>
                        <li>Monthly Awards</li>
                    </ul>
                    <h2>Activity Schedule</h2>
                    {myTable}
                </main>
                <footer>
                    <p>&copy; 2020 Contra Costa County Chess Club &#x2655;</p>
                </footer>
            </div>
        );
    }
}

export default Activities;