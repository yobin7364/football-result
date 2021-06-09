import React, { useState, useEffect, useMemo } from 'react'
import footBallLogo from "../images/footballLogo.png"
import { FootballModal } from './FootballModal'
import { useSelector, useDispatch } from "react-redux";
import { getAllPremierLeague } from "../actions/premierLeageAction";

export const ResultTable = () => {

    const [singleClub, setSingleClub] = useState(null);

    const [eachTeam, setEachTeam] = useState([]);

    const dispatch = useDispatch();

    const premierLeagueMatch = useSelector(state => state.premierLeague.premierLeagueMatch)

    const [tableRowData, setTableRowData] = useState([])




    //pass data to Modal componenet and set open calue to "true"
    const onRowClick = (clubData) => {
        setSingleClub(clubData)
        dispatch({ type: "IS_MODAL_OPEN", payload: true })
    }

    //get unique team names with its match details
    //useMemo for avoiding rerendering by "premierLeagueMatch" hook
    useMemo(() => {
        if (premierLeagueMatch) {

            let uniqueTeam = Array.from(new Set(premierLeagueMatch.matches.map(teamOne => teamOne.team1)));

            let teamArray = [];

            uniqueTeam.forEach((teamName) => {
                let eachTeamObject = {
                    teamName,
                    matchDetails: premierLeagueMatch.matches
                        .filter(eachMatchDetail => eachMatchDetail.team1 === teamName || eachMatchDetail.team2 === teamName)
                }

                teamArray.push(eachTeamObject);

            })

            setEachTeam(teamArray)

        }

    }
        , [premierLeagueMatch]);


    //fetch premier league data
    useEffect(() => {
        if (eachTeam.length === 0) {
            dispatch(getAllPremierLeague())
        }

        //calcualte the table row data

        else {

            let rowDataArry = [];

            //function to check club score status
            const checkStatus = (eachMatch, teamInfo) => {
                let scoreStatus = {
                    won: 0,
                    lost: 0,
                    draw: 0,
                    goalScored: 0,
                    goalConceded: 0
                }


                if (eachMatch.team1 === teamInfo.teamName) {

                    scoreStatus.goalScored = scoreStatus.goalScored + eachMatch.score.ft[0];

                    scoreStatus.goalConceded = scoreStatus.goalConceded + eachMatch.score.ft[1];

                    if (eachMatch.score.ft[0] > eachMatch.score.ft[1]) {
                        scoreStatus.won = scoreStatus.won + 1;
                    }

                    else if (eachMatch.score.ft[0] < eachMatch.score.ft[1]) {
                        scoreStatus.lost = scoreStatus.lost + 1;
                    }

                    else {
                        scoreStatus.draw = scoreStatus.draw + 1;
                    }

                }

                else {

                    scoreStatus.goalScored = scoreStatus.goalScored + eachMatch.score.ft[1];

                    scoreStatus.goalConceded = scoreStatus.goalConceded + eachMatch.score.ft[0];

                    if (eachMatch.score.ft[0] < eachMatch.score.ft[1]) {
                        scoreStatus.won = scoreStatus.won + 1;
                    }

                    else if (eachMatch.score.ft[0] > eachMatch.score.ft[1]) {
                        scoreStatus.lost = scoreStatus.lost + 1;
                    }

                    else {
                        scoreStatus.draw = scoreStatus.draw + 1;
                    }

                }

                return (scoreStatus)
            }

            eachTeam.forEach((teamInfo) => {

                let lastFiveGamesStatus = [];

                //get last five matches status
                for (let i = teamInfo.matchDetails.length - 1, j = 0; j <= 4; i--) {

                    if (teamInfo.matchDetails[i].score) {
                        j = j + 1;

                        if (checkStatus(teamInfo.matchDetails[i], teamInfo).won) {
                            lastFiveGamesStatus.push(1);
                        }

                        if (checkStatus(teamInfo.matchDetails[i], teamInfo).lost) {
                            lastFiveGamesStatus.push(-1);
                        }

                        if (checkStatus(teamInfo.matchDetails[i], teamInfo).draw) {
                            lastFiveGamesStatus.push(0);
                        }

                    }
                }

                // console.log("lastFiveGamesStatus", lastFiveGamesStatus);

                let totalWon = 0,
                    totalLost = 0,
                    totalDraw = 0,
                    totalGoalScored = 0,
                    totalGoalConceded = 0;

                teamInfo.matchDetails.forEach(eachMatch => {

                    if (eachMatch.score) {

                        // console.log("second", teamInfo.teamName, checkStatus(eachMatch, teamInfo));

                        let calculatedEachScore = checkStatus(eachMatch, teamInfo);

                        totalWon = totalWon + calculatedEachScore.won;
                        totalLost = totalLost + calculatedEachScore.lost;
                        totalDraw = totalDraw + calculatedEachScore.draw;
                        totalGoalScored = totalGoalScored + calculatedEachScore.goalScored;
                        totalGoalConceded = totalGoalConceded + calculatedEachScore.goalConceded;

                    }


                })


                rowDataArry.push({
                    club: teamInfo.teamName,
                    played: teamInfo.matchDetails.length,
                    won: totalWon,
                    lost: totalLost,
                    draw: totalDraw,
                    goalScored: totalGoalScored,
                    goalConceded: totalGoalConceded,
                    goalDifference: totalGoalScored - totalGoalConceded,
                    points: totalWon * 3 + totalDraw,
                    form: lastFiveGamesStatus
                })

            })

            rowDataArry.sort((a, b) => {
                return b.points - a.points
            })

            setTableRowData(rowDataArry);



        }



        console.log("eachTeam", eachTeam)

    }, [dispatch, eachTeam])

    useEffect(() => {

    }, [tableRowData])

    console.log("rowDataArry", tableRowData);

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

                    {
                        tableRowData?.map((eachRow, index) => (
                            <tr className="row-layout" onClick={() => onRowClick("Real Madrid")}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="club-row">
                                        <img
                                            src={footBallLogo}
                                            alt={eachRow.club}
                                            className="club-logo"
                                        />
                                        {eachRow.club}
                                    </div>
                                </td>
                                <td>{eachRow.played}</td>
                                <td>{eachRow.won}</td>
                                <td>{eachRow.draw}</td>
                                <td>{eachRow.lost}</td>
                                <td>{eachRow.goalScored}</td>
                                <td>{eachRow.goalConceded}</td>
                                <td>{eachRow.goalDifference}</td>
                                <td>{eachRow.points}</td>
                                <td className="last-column">
                                    <div className="last-five-games">
                                        {
                                            eachRow.form.map(eachForm => {

                                                let classNameDerived = "";

                                                if (eachForm === 1) {
                                                    classNameDerived = "win"
                                                }

                                                else if (eachForm === -1) {
                                                    classNameDerived = "loss"
                                                }

                                                else {
                                                    classNameDerived = "draw"
                                                }

                                                return (
                                                    <div className={"game-status " + classNameDerived}>
                                                    </div>
                                                )
                                            })
                                        }

                                        {/* <div className="game-status win">

                                </div>
                                <div className="game-status win">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status loss">

                                </div>
                                <div className="game-status draw">

                                </div> */}
                                    </div>
                                </td>
                            </tr>

                        ))
                    }


                    {/* <tr className="row-layout" onClick={() => onRowClick("Real Madrid")}>
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
                    </tr> */}
                </tbody>
                {/* Table Row END*/}
            </table>
            {/* Table END */}
        </div>
    )
}
