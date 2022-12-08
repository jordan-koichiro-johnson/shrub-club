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



function makeDice(addLetter, style) {
    console.log('makeDice')
    let letterComponents = []
    for (let i = 0; i < dice.length; i++) {
        letterComponents.push(<Letter name={grid[i]} letter={dice[i][0]} click={addLetter} style={style[i]} />);
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
    const [style, setStyle] = useState(Array(16).fill(''))
    const [numberOfWords, wordAdded] = useState(0)
    const [alert, alertFind] = useState('')
    function addLetter(name, newLetter) {
        if (positions.indexOf(name) < 0) {
            if (positions.length === 0 || validClick(name, positions)) {
                savePosition([...positions, name])
                makeWord([...word, newLetter])

                const newArray = [...style]
                newArray.splice(grid.indexOf(name), 1, 'active')
                setStyle(newArray)
            }
        }
    }
    console.log('made letters')
    letterGlobal = makeDice(addLetter, style)
    console.log(letterGlobal.length)
    function backspace() {


        const newArray = [...style]
        newArray.splice(grid.indexOf(positions[positions.length - 1]), 1, '')
        setStyle(newArray)
        makeWord(word.slice(0, -1))
        savePosition(positions.slice(0, -1))
        console.log(word)
        console.log(positions)
    }

    function reset() {
        makeWord([])
        savePosition([])
        setStyle(Array(16).fill(''))
    }

    function submit() {
        let wordString = word.join('')
        if (submittedWords.indexOf(wordString) < 0) {

            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordString}`)
                .then(response => {
                    if (response.status === 200) {
                        submitWord([...submittedWords, wordString])
                        wordAdded(element => element + 1)
                    } else {
                        alertFind('Not A Word')
                    }

                    setStyle(Array(16).fill(''))
                    reset()
                    console.log(response)
                })
        } else {
            alertFind('Already Submitted')
        }
    }

    return (
        < div className={'boggleDiv'}>


            <div className={'title'}>
                Shrubble
            </div>
            <div className={'centerBoggle'}>

                <div className='boggle'>
                    {letterGlobal}
                </div>
            </div>
            <div className={'boggleOther'}>
                <div className={'centerBoggleButtons'}>

                    <input type={'button'} classNa me={'bspace boggleButton'} onClick={backspace} value={'backspace'} />
                    <input type={'button'} className={'reset boggleButton'} onClick={reset} value={'reset'} />
                    <input type={'button'} className={'submit boggleButton'} onClick={submit} value={'submit'} />


                </div>

                <div className={'otherAnswer'}>
                    <div className={'boggleAnswer'}>

                        {word}
                    </div>
                    <div className={'boggleAnswer'}>
                        Number of Words Found:{numberOfWords}

                    </div>
                    <div className={'boggleAnswer'}>

                        {submittedWords.join(', ')}
                    </div>
                    <div className={'boggleAnswer not'}>
                        {alert}

                    </div>
                </div>

            </div>
        </div >
    )
}





