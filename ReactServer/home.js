import React from 'react';
import board1 from "./images/board1.jpg";

let nepImage = <img className="im" src={board1} alt="Chess board picture" />;

function Home() {
    return <div>
        <header>
            <h1>Welcome to Chess Club in Contra Costa County!</h1>

            <p>Contra Costa County(CCC) is located in East Bay, California. Playing chess &#x265F; in CCC is not as popular as other sports.</p>
            {nepImage}
        </header>

        <main>
            <h2>Chess in California</h2>
            <p>Northern California places 2nd in the nation.&#x1F60E; You have seen peopel play chess in senior centers and outside
            in parks and places where young people are playing loud games.</p>
            <h2>Chess as a Sport?&#x1F615;</h2>
            <p>You might be wondering if chess is a sport. Here are some reasons to support this claim:</p>
            <ul>
                <li>The International Olympic Committee considers chess to be a sport.</li>
                <li>Chess requires physical exertion as mental exertion manifests itself physically.</li>
                <li>Chess has rules and etiquette which are officially recognized internationally.</li>
                <li>Chess is competitive as the participating players feel the drive to win.</li>
                <li>Chess requires skill as a deep and serious study is necessary to become good at chess.</li>
            </ul>
        </main>

        <footer>
            <p>&copy; 2020 Contra Costa County Chess Club &#x2655;</p>
        </footer>
    </div>;
}

export default Home;