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

    function handlehead(e) {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === "left") {
            if (headnum === 0) {
                setheadnum(headArray.length - 1)
            } else {
                setheadnum(headnum - 1)
            }
        } else if (e.target.value === "right") {
            if (headnum === headArray.length - 1) {
                setheadnum(0)
            } else {
                setheadnum(headnum + 1)
            }
        }
        setHeadItem(headArray[headnum])
    }

    const handleeye = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.value === "left") {
            if (eyenum === 0) {
                seteyenum(eyeArray.length - 1)
            } else {
                seteyenum(eyenum - 1)
            }
        } else if (e.target.value === "right") {
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
        console.log(e.target.value)
        if (e.target.value === "left") {
            if (mouthnum === 0) {
                setmouthnum(mouthArray.length - 1)
            } else {
                setmouthnum(mouthnum - 1)
            }
        } else if (e.target.value === "right") {
            if (mouthnum === mouthArray.length - 1) {
                setmouthnum(0)
            } else {
                setmouthnum(mouthnum + 1)
            }
        }
        setMouthItem(mouthArray[mouthnum])
    }

    const [shrubId, setShrubId] = useState(0);
    const [profileId, setProfileId] = useState(0);

    const saveChange = (e) => {
        console.log('clieck')
        API.findcurrentUser(token).then(data => {
            console.log(data.Shrub)
            console.log(shrubId)
            setShrubId(data.Shrub.id);
            setProfileId(data.Shrub.ProfileId)
            API.deleteShrubTag({ ShrubId: shrubId }).then(data => {
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
                ShrubId: shrubId,
                ItemId: data.id
            })
        }).then(data => { console.log(data) })
    }

    return (
        <div className="row">
            <div className="nes-container is-centered col-lg-12 col-sm-12 selectTop">
                <div className='leftCell'>
                    <div className='gridCell'>
                        <button className='head arrow left' value="left" onClick={(handlehead)}><img className='arrowPic' src={arrow}></img></button>
                    </div>
                    <div className='gridCell'>
                        <button className='eye arrow left' value="left" onClick={(handleeye)}><img className='arrowPic' src={arrow}></img></button>
                    </div>
                    <div className='gridCell'>
                        <button className='mouth arrow left' value="left" onClick={(handlemouth)}><img className='arrowPic' src={arrow}></img></button>
                    </div>
                </div>

                <div className='shrubpic'>
                    <div className='pictures'>
                        <img src={shrub} />
                    </div>
                    <div className='pictures'>
                        <img className='pictures' src={require(`../../assets/sprites/${headItem}.png`)} />
                    </div>
                    <div className='pictures'>
                        <img className='pictures' src={require(`../../assets/sprites/${mouthItem}.png`)} />
                    </div>
                    <div className='pictures'>
                        <img className='pictures' src={require(`../../assets/sprites/${eyeItem}.png`)} />
                    </div>
                </div>
                <div className='rightCell'>
                    <div className='gridCell'>
                        <button className='head arrow' value="right" onClick={(handlehead)}><img className='arrowPic' src={arrow}></img></button>
                    </div>


                    <div>
                        <button className='eye arrow' value="right" onClick={(handleeye)}><img className='arrowPic' src={arrow}></img></button>
                    </div>



                    <div className='gridCell'>
                        <button className='mouth arrow' value="right" onClick={(handlemouth)}><img className='arrowPic' src={arrow}></img></button>
                    </div>
                </div>


            </div>

            <div className=" col-lg-12 col-sm-12 bottom change ">
                <button type="button" className="smallButton nes-btn is-error">Take me Home!</button>
                <button type="button" className=" nes-btn is-success" onClick={saveChange}>Save Changes!</button>
            </div>

        </div >
    )
}
