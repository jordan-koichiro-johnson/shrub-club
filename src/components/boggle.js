import './boggle.css'
import Letter from './boggleComponents/letters'
import React, { useState, useEffect } from "react";


let dice = [["R", "F", "Y", "I", "V", "N"],
["W", "G", "E", "K", "U", "O"],
["H", "L", "P", "S", "D", "T"],
["X", "M", "C", "B", "A", "I"],
["E", "Y", "A", "V", "B", "O"],
["J", "Qu", "R", "M", "N", "H"],
["I", "F", "P", "E", "L", "C"],
["T", "U", "D", "O", "X", "S"],
["Z", "R", "L", "E", "V", "N"],
["G", "Y", "T", "K", "U", "O"],
["D", "H", "S", "B", "F", "M"],
["C", "W", "I", "J", "P", "Z"],
["A", "V", "O", "L", "U", "Y"],
["T", "R", "P", "S", "E", "L"],
["E", "N", "H", "W", "D", "O"],
["G", "K", "F", "U", "M", "B"]
];

const grid = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
]

let letterGlobal = null
// randomizes the dice array
export function Randomize() {
    console.log('random')
    for (let i = dice.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dice[i], dice[j]] = [dice[j], dice[i]];
    }
    for (let i = dice.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (6));
        [dice[i][0], dice[i][j]] = [dice[i][j], dice[i][0]];
    }

}



function makeDice(addLetter) {
    console.log('makeDice')
    let letterComponents = []
    for (let i = 0; i < dice.length; i++) {
        letterComponents.push(<Letter name={grid[i]} letter={dice[i][0]} click={addLetter} />);
    }
    return letterComponents
}

function validClick(name, positions) {
    return Math.abs(name[0] - positions[(positions.length - 1)][0]) <= 1 && Math.abs(name[1] - positions[(positions.length - 1)][1]) <= 1
}

export function Boggle() {
    console.log('outside')
    const [word, makeWord] = useState([])
    const [positions, savePosition] = useState([])
    const [submittedWords, submitWord] = useState([])
    function addLetter(name, newLetter) {
        if (positions.indexOf(name) < 0) {
            if (positions.length === 0 || validClick(name, positions)) {
                savePosition([...positions, name])

                makeWord([...word, newLetter])
            }

        }



    }
    console.log('made letters')
    letterGlobal = makeDice(addLetter)
    console.log(letterGlobal.length)
    function backspace() {

        makeWord(word.slice(0, -1))
        savePosition(positions.slice(0, -1))
        console.log(word)
        console.log(positions)
    }

    function reset() {
        makeWord([])
        savePosition([])
    }

    function submit() {
        let wordString = word.join('')
        console.log(wordString + 'line 109')
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordString}`)
            .then(response => {
                if (response.status === 200) {
                    submitWord([...submittedWords, wordString])
                }

                console.log(response)
            })
    }

    return (
        < div >

            <div className='boggle'>
                {letterGlobal}
            </div>
            <input type={'button'} className={'bspace'} onClick={backspace} value={'backspace'} />
            <input type={'button'} className={'reset'} onClick={reset} value={'reset'} />
            {word}<input type={'button'} className={'submit'} onClick={submit} value={'submit'} />
            {submittedWords}
        </div >
    )
}



export let pressedButton

