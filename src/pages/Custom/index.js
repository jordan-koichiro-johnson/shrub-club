import { React, useState, useEffect } from 'react'
import API from '../../util/API'
import "./style.css"
import shrub from "../../assets/sprites/Shrub.png"
import arrow from '../../util/arrow.png'



export default function Custom() {
    const token = localStorage.getItem("token")
    var headArray = [];
    var eyeArray = [];
    var mouthArray = [];

    const [headItem, setHeadItem] = useState("default")
    const [eyeItem, setEyeItem] = useState("default")
    const [mouthItem, setMouthItem] = useState("default")

    useEffect(() => {
        API.getProfileTag(token).then(data => {
            data.map(
                (map) => {
                    API.getOneItem(map.ItemId).then(data => {
                        if (data.type == "head") {
                            headArray.push(data.name);
                        } else if (data.type == "eye") {
                            eyeArray.push(data.name);
                        } else if (data.type == "mouth") {
                            mouthArray.push(data.name)
                        }
                    })
                })
        })
        headArray.push("default")
        eyeArray.push("default")
        mouthArray.push("default")
    })

    const [headnum, setheadnum] = useState(0)
    const [eyenum, seteyenum] = useState(0)
    const [mouthnum, setmouthnum] = useState(0)

    const handlehead = (e) => {
        e.preventDefault()
        if (e.target.getAttribute('value') === "left") {
            if (headnum === 0) {
                setheadnum(headArray.length - 1)
            } else {
                setheadnum(headnum - 1)
            }
        } else if (e.target.getAttribute('value') === "right") {
            if (headnum === headArray.length - 1) {
                setheadnum(0)
            } else {
                setheadnum(headnum + 1)
            }
        }
        setHeadItem(headArray[headnum])
        console.log(headItem)
    }

    const handleeye = (e) => {
        e.preventDefault()
        if (e.target.getAttribute('value') === "left") {
            if (eyenum === 0) {
                seteyenum(eyeArray.length - 1)
            } else {
                seteyenum(eyenum - 1)
            }
        } else if (e.target.getAttribute('value') === "right") {
            if (eyenum === eyeArray.length - 1) {
                seteyenum(0)
            } else {
                seteyenum(eyenum + 1)
            }
        }
        setEyeItem(eyeArray[eyenum])
    }

    const handlemouth = (e) => {
        e.preventDefault()
        if (e.target.getAttribute('value') === "left") {
            if (mouthnum === 0) {
                setmouthnum(mouthArray.length - 1)
            } else {
                setmouthnum(mouthnum - 1)
            }
        } else if (e.target.getAttribute('value') === "right") {
            if (mouthnum === mouthArray.length - 1) {
                setmouthnum(0)
            } else {
                setmouthnum(mouthnum + 1)
            }
        }
        setMouthItem(mouthArray[mouthnum])
    }

    const [shurbInfo, setShrubInfo] = useState();

    const saveChange = (e) => {
        console.log('clieck')
        API.findcurrentUser(token).then(data => {
            setShrubInfo(data.Shrub)
            API.deleteShrubTag({ ShrubId: shurbInfo.id }).then(data => {
                console.log(shurbInfo)
                console.log(data)
                dataSave(headItem)
                dataSave(eyeItem);
                dataSave(mouthItem);
            })
        })
    }

    const dataSave = (itemName) => {
        API.getItemByName(itemName).then(data => {
            console.log(data)
            API.saveCustom({
                ShrubId: shurbInfo.id,
                ItemId: data.id
            })
        }).then(data => { console.log(data) })
    }

    return (
        <div className="row">
            <div className="nes-container is-centered col-lg-12 col-sm-12 selectTop">
                <div className='leftCell'>
                    <div className='gridCell'>
                        <button className='head arrow left' ><img onClick={handlehead} value="left" className='arrowPic' src={arrow}></img></button>
                    </div>
                    <div className='gridCell'>
                        <button className='eye arrow left'><img onClick={handleeye} value="left" className='arrowPic' src={arrow}></img></button>
                    </div>
                    <div className='gridCell'>
                        <button className='mouth arrow left'><img onClick={handlemouth} value="left" className='arrowPic' src={arrow}></img></button>
                    </div>
                </div>

                <div className='shrubpic'>
                    <div className='pictures'>
                        <img src={shrub} />
                    </div>
                    <div className='pictures'>
                        <img src={require(`../../assets/sprites/${headItem}.png`)} />
                    </div>
                    <div className='pictures'>
                        <img src={require(`../../assets/sprites/${mouthItem}.png`)} />
                    </div>
                    <div className='pictures'>
                        <img src={require(`../../assets/sprites/${eyeItem}.png`)} />
                    </div>
                </div>
                <div className='rightCell'>
                    <div className='gridCell'>
                        <button className='head arrow'><img value="right" onClick={(handlehead)} className='arrowPic' src={arrow}></img></button>
                    </div>


                    <div>
                        <button className='eye arrow'><img value="right" onClick={(handleeye)} className='arrowPic' src={arrow}></img></button>
                    </div>



                    <div className='gridCell'>
                        <button className='mouth arrow'><img value="right" onClick={(handlemouth)} className='arrowPic' src={arrow}></img></button>
                    </div>
                </div>


            </div>

            <div className=" col-lg-12 col-sm-12 bottom change ">
                <a href='/'><button type="button" className="smallButton nes-btn is-error">Take me Home!</button></a>
                <button type="button" className=" nes-btn is-success" onClick={saveChange}>Save Changes!</button>
            </div>

        </div >
    )
}
