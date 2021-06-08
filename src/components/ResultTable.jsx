import React, { useState, useEffect } from 'react'
import footBallLogo from "../images/footballLogo.png"
import { FootballModal } from './FootballModal'
import { useSelector, useDispatch } from "react-redux";
import { getAllPremierLeague } from "../actions/premierLeageAction";

export const ResultTable = () => {

    const [singleClub, setSingleClub] = useState(null)

    const dispatch = useDispatch();


    //pass data to Modal componenet and set open calue to "true"
    const onRowClick = (clubData) => {
        setSingleClub(clubData)
        dispatch({ type: "IS_MODAL_OPEN", payload: true })
    }

    //fetch premier league data
    useEffect(() => {
        dispatch(getAllPremierLeague())

    }, [dispatch])

    return (
        <div className="center-horizontally">

            {/* modal  START*/}
            <FootballModal
                data={singleClub}
            />
            {/* modal  END*/}

            {/* table  START*/}
            <table>
                <tbody>
                    {/* Table Header START*/}

                    <tr>
                        <th>Position</th>
                        <th className="header-club">
                            <div className="header-inner-div">Club</div>
                        </th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Drawn</th>
                        <th>Lost</th>
                        <th>
                            <div className="dotted-underline">
                                GF
                        </div>
                        </th>
                        <th>
                            <div className="dotted-underline">
                                GA
                        </div>
                        </th>
                        <th>
                            <div className="dotted-underline">
                                GD
                        </div>
                        </th>
                        <th>Points</th>
                        <th className="header-form">Form</th>
                    </tr>
                    {/* Table Header END*/}

                    {/* Table Row START*/}
                    <tr className="row-layout" onClick={() => onRowClick("Real Madrid")}>
                        <td>1</td>
                        <td>
                            <div className="club-row">
                                <img
                                    src={footBallLogo}
                                    alt="real-madrid"
                                    className="club-logo"
                                >

                                </img>
                            Real Madrid
                            </div>
                        </td>
                        <td>38</td>
                        <td>20</td>
                        <td>12</td>
                        <td>0</td>
                        <td>32</td>
                        <td>12</td>
                        <td>+12</td>
                        <td>43</td>
                        <td className="last-column">
                            <div className="last-five-games">
                                <div className="game-status win">

                                </div>
                                <div className="game-status win">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status draw">

                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr className="row-layout" onClick={() => onRowClick("Barcelona")}>
                        <td>1</td>
                        <td>
                            <div className="club-row">
                                <img
                                    src={footBallLogo}
                                    alt="real-madrid"
                                    className="club-logo"
                                >

                                </img>
                            Real Madrid
                            </div>
                        </td>
                        <td>38</td>
                        <td>20</td>
                        <td>12</td>
                        <td>0</td>
                        <td>32</td>
                        <td>12</td>
                        <td>+12</td>
                        <td>43</td>
                        <td className="last-column">
                            <div className="last-five-games">
                                <div className="game-status win">

                                </div>
                                <div className="game-status win">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status draw">

                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr className="row-layout" onClick={() => onRowClick("Liverpool")}>

                        <td>1</td>
                        <td>
                            <div className="club-row">
                                <img
                                    src={footBallLogo}
                                    alt="real-madrid"
                                    className="club-logo"
                                >

                                </img>
                            Real Madrid
                            </div>
                        </td>
                        <td>38</td>
                        <td>20</td>
                        <td>12</td>
                        <td>0</td>
                        <td>32</td>
                        <td>12</td>
                        <td>+12</td>
                        <td>43</td>
                        <td className="last-column">

                            <div className="last-five-games">
                                <div className="game-status win">

                                </div>
                                <div className="game-status win">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status draw">

                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                {/* Table Row END*/}
            </table>
            {/* Table END */}
        </div>
    )
}
