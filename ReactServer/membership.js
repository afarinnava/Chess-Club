import React from 'react';

let ApplyStyle = {
    display: "grid", gridTemplateColumns: "10em 20rem", gridRowGap: "0.5em", gridColumnGap: "0.3em",
    border: "double rgb(75, 96, 211)", borderRadius: "2rem", padding: "1.0rem", width: "30rem"
};
let labelStyle = { justifySelf: "end", fontStyle: "italic" };
let narrStyle = { maxWidth: "50rem", display: "flex", flexDirection: "column", alignItems: "center" };

function Membership() {
    return <div>
        <header>
            <h1>Apply To Contra Costa County Chess Club here!</h1>
        </header>
        <main className="narrow" style={narrStyle}>
            <p>Thank you for showing interest in joining our Chess club. Please fill out the follwoing information.</p>
            <form style={ApplyStyle}>
                <label style={labelStyle}>Name:</label>
                <input type="text" id="nameC" name="nameC" value="" maxLength="40" minLength="1" required />

                <label style={labelStyle}>Email:</label>
                <input type="email" id="emailC" name="emailC" value="" maxLength="50" minLength="5" required
                    pattern="[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-zA-Z]{2,}$" />

                <label style={labelStyle}>Password: [minimum 8]</label>
                <input type="password" id="pass" name="pass" value="" maxLength="50" minLength="8" required />

                <label style={labelStyle}>Choose your age group:</label>
                <select id="age" name="age" value="" required>
                    <option value=" ">Select one</option>
                    <option value="Below 18">Below 18</option>
                    <option value="19-24">19-24</option>
                    <option value="25-64">25-64</option>
                    <option value="65+">65+</option>
                </select>

                <label style={labelStyle}>Comments:</label>
                <textarea name="Comments:" id="comm" rows="10" cols="30" placeholder="Your comment here..."></textarea>
                <button type="button" id="send1">Send &#x265F;</button>
            </form>
{/*             <div id="setBack" className="off">
                <section id="ThanksDialog" className="off">
                    <h3>Thank you for applying to CCC Chess Club!</h3>
                    <p id="out"></p>
                    <button type="button" id="closeC">
                        close
                </button>
                </section>
            </div> */}
        </main>
        <footer>
            <p>&copy; 2020 Contra Costa County Chess Club &#x2655;</p>
        </footer>
    </div>;
}

export default Membership;