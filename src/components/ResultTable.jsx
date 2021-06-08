import React from 'react'
import testImage from "../images/realM.png"
export const ResultTable = () => {
    return (
        <div className="center-horizontally">
            <table>
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
                <tr className="row-layout">
                    <td>1</td>
                    <td>
                        <div className="club-row">
                            <img
                                src={testImage}
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

                <tr className="row-layout">
                    <td>1</td>
                    <td>
                        <div className="club-row">
                            <img
                                src={testImage}
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

                <tr className="row-layout">

                    <td>1</td>
                    <td>
                        <div className="club-row">
                            <img
                                src={testImage}
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

            </table>
        </div>
    )
}
