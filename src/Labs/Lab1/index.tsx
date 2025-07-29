
import { Link, Routes, Route, useParams } from "react-router-dom";
import { useState } from "react";


export default function Lab1() {

         //     const ewq = ["234", "345", "456"]
     // const wer = ["123", ...ewq, "567"]
     // const rty = wer.find((asd, bnm) => bnm === 3)

    const [b, x, r] = ["p", "v", "j"];

      const a = ["x", "c", "y", "d", "z"];  
       const g = a.find((h) => h === "c");  
       function Mnb({ d = ["c"] }) {    
  const a = ["b", 1];           
  const e = [...a, ...d, ...a]; 
  return (
    <div>
      <p>{e}</p>        
    </div>
  );
}


  function Dsa() {
  const q = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ul>
      {q.map((s) => (
        <li key={s}>
          2 x {s} = {2 * s}
        </li>
      ))}
    </ul>
  );
}
  function Fds() {
  const u = [1, 9, 3, 8, 6, 5, 7, 4, 2];          // __4__=9, __5__=6
  return (
    <ul>
      {u.filter((f) => f > 5)                   // __1__=filter, __2__=f, __3__=5
        .map((s) => (
          <li>{s}</li>                          // __6__=s
        ))}
    </ul>
  );
}

function Abc() {
  const [x, h] = useState(true);      // __1__ = x, __2__ = true
  return (
    <div>
      <button onClick={() => { h(false); }}>R</button>   {/* __3__ = h, __4__ = false */}
      <input
        type="checkbox"
        checked={x}
        onChange={() => h(!x)}
        id="s"                                           /* __5__ = s */
      />
      <label htmlFor="s">Q</label>
      {x && <h1>P</h1>}
      {!x && <h1>K</h1>}
    </div>
  );
}

function Rew({ d = { b: "c" } }) {  // __1__ = d
  const a = {
    b: "b",
    c: 1,
  };
  const e = {                       // __3__ = e
    ...a,
    ...d,                           // __4__ = d
  };
  return (
    <ul>
      <li>{e.c}</li>               {/* __5__ = c */}
      <li>{e.b}</li>               {/* __6__ = b */}
    </ul>
  );
}

function Jkl() {
  const q = [                            // __4__ = q
    { a: 1, w: "g" },                    // __1__ = g
    { a: 2, w: "t" },                    // __2__ = t
    { a: 1, w: "j" },                    // __3__ = j
  ];
  return (
    <ul>
      {
        q.map((s, d) => (                // __8__ = map, __7__ = s, __6__ = d
          <li key={d}>{s.w}</li>         // __5__ = w
        ))
      }
    </ul>
  );
}


  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>


    <div>
      u = {b}<br />
      w = {x}<br />
      j = {r}
    </div>
    <div>output = {g}</div>;

      <div>
  <Dsa />
      </div>
    
    <Mnb d={["a"]} />
          <div>
  <Fds />
      </div>

                <div>
  <Abc />
      </div>

    <Rew d={{ b: "a" }} />

                    <div>
  <Jkl />
      </div>
      {/* 1. Heading Tags */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a short title or heading that attempts to summarize the topic of the section it precedes. For instance this paragraph is preceded by the heading Heading Tags. The font of the section headings are usually larger and bolder than their subsection headings. This document uses headings to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used to format plain text so that it renders in a browser as large headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
      </div>

      {/* 2. Paragraph Tags */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-2">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text as shown here on
          the right.
        </p>
        <p id="wd-p-3">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
        <p id="wd-p-4">
          This is the fourth paragraph. Add more paragraphs as needed to practice
          vertical spacing behavior.
        </p>
      </div>

            {/* 3. Ordered Lists */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>

        {/* pancake cooking */}
        <p>How to make pancakes:</p>
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>

        {/* my own */}
        <h5>My favorite recipe</h5>
        <ol id="wd-your-favorite-recipe">
          <li>Step 1: Prepare all ingredients.</li>
          <li>Step 2: Chop the ingredients.</li>
          <li>Step 3: Stir-fry in a pan until cooked through.</li>
        </ol>

        <h5>Unordered List Tag</h5>
          My favorite books (in no particular order)
          <ul id="wd-my-books">
            <li>Dune</li>
            <li>Lord of the Rings</li>
            <li>Ender's Game</li>
            <li>Red Mars</li>
            <li>The Forever War</li>
          </ul>
          <h5>Your favorite books (in no particular order)</h5>
        <ul id="wd-your-books">
          <li>The Hobbit</li>
          <li>To Kill a Mockingbird</li>
          <li>1984</li>
        </ul>
      </div>
        <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
             <tr>
              <td>Q3</td><td>JavaScript</td><td>2/17/21</td><td>95</td>
            </tr>
            <tr>
              <td>Q4</td><td>DOM</td><td>2/24/21</td><td>88</td>
            </tr>
            <tr>
              <td>Q5</td><td>Flexbox</td><td>3/3/21</td><td>92</td>
            </tr>
            <tr>
              <td>Q6</td><td>Grid</td><td>3/10/21</td><td>87</td>
            </tr>
            <tr>
              <td>Q7</td><td>React</td><td>3/17/21</td><td>93</td>
            </tr>
            <tr>
              <td>Q8</td><td>Routing</td><td>3/24/21</td><td>89</td>
            </tr>
            <tr>
              <td>Q9</td><td>State</td><td>3/31/21</td><td>94</td>
            </tr>
            <tr>
              <td>Q10</td><td>Deployment</td><td>4/7/21</td><td>91</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet: <br />
        <img id="wd-starship" width="400px"   src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        <br />
        Loading a local image:
        <br />
        <img id="wd-teslabot" src="/images/teslabot.jpg" height="200px" />
      </div>
    <div id="wd-forms">
      <h4>Form Elements</h4>
      <form id="wd-text-fields">
        <h5>Text Fields</h5>
        <label htmlFor="wd-text-fields-username">Username:</label>
        <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
        <label htmlFor="wd-text-fields-password">Password:</label>
        <input type="password" value="123@#$asd" id="wd-text-fields-password" />
        <br />
        <label htmlFor="wd-text-fields-first-name">First name:</label>
        <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
        <label htmlFor="wd-text-fields-last-name">Last name:</label>
        <input type="text" placeholder="Doe"
              value="Wonderland"
              title="The last name"
              id="wd-text-fields-last-name" />
            {/* 1.3.7.2（Textarea） */}
          <h5>Text Boxes</h5>
          <label htmlFor="wd-textarea">Biography:</label><br/>
          <textarea
            id="wd-textarea"
            cols={30}
            rows={10}
            placeholder="Biography"
            title="Enter your biography"
          >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </textarea>
          <br/>
        <h5 id="wd-buttons">Buttons</h5>
          <button type="button"
                  onClick={() => alert("Life is Good!")}
                  id="wd-all-good">
            Hello World!
          </button>
        <h5 id="wd-radio-buttons">Radio buttons</h5>

        <label>Favorite movie genre:</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
        <label htmlFor="wd-radio-comedy">Comedy</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-drama"/>
        <label htmlFor="wd-radio-drama">Drama</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
        <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
        <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <h5 id="wd-checkboxes">Checkboxes</h5>
        <label>Favorite movie genre:</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
        <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
        <label htmlFor="wd-chkbox-drama">Drama</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
        <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
        <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      <h5>Select one</h5>
      <label htmlFor="wd-select-one-genre">Favorite movie genre:</label><br/>
      <select id="wd-select-one-genre">
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>

      <h5>Select many</h5>
      <label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br/>
      <select multiple id="wd-select-many-genre">
        <option value="COMEDY" selected>Comedy</option>
        <option value="DRAMA">Drama</option>
        <option value="SCIFI" selected>Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>

      <h4>Other HTML field types</h4>
      <label htmlFor="wd-text-fields-email"> Email: </label>
      <input type="email"
            placeholder="jdoe@somewhere.com"
            id="wd-text-fields-email"/><br/>

      <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
      <input type="number"
            value="100000"
            placeholder="1000"
            id="wd-text-fields-salary-start"/><br/>

      <label htmlFor="wd-text-fields-rating"> Rating: </label>
      <input type="range"
            value="4"
            max="5"
            placeholder="Doe"
            id="wd-text-fields-rating"/><br/>

      <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
      <input type="date"
            value="2000-01-21"
            id="wd-text-fields-dob"/><br/>
      
          <h4>Anchor tag</h4>
          Please 
          <a 
            href="https://www.lipsum.com" 
            id="wd-lipsum"
            target="_blank" 
            rel="noopener noreferrer"
          >
            click here
          </a> 
          to get dummy text<br/>

          Please 
          <a 
            href="https://github.com/LZC173/CS5610" 
            id="wd-github"
            target="_blank" 
            rel="noopener noreferrer"
          >
            view the source code on GitHub
          </a><br/>
      </form>

    </div>
    </div>
  );
}