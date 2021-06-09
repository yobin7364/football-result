import React, { useState, useEffect, useMemo } from 'react'
import footBallLogo from "../images/footballLogo.png"
import { FootballModal } from './FootballModal'
import { useSelector, useDispatch } from "react-redux";
import { getAllPremierLeague } from "../actions/premierLeageAction";
import Spinner from './Spinner';

export const ResultTable = () => {

    const [singleClub, setSingleClub] = useState(null);

    const [eachTeam, setEachTeam] = useState([]);

    const dispatch = useDispatch();

    const premierLeagueMatch = useSelector(state => state.premierLeague.premierLeagueMatch)

    const loading = useSelector(state => state.premierLeague.loading)

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

        //get premier league data when there is no data
        if (eachTeam.length === 0) {
            dispatch(getAllPremierLeague())
        }

        //calcualte the table row data

        else {

            let rowDataArry = [];

            //check each club score status
            const checkStatus = (eachMatch, teamInfo) => {
                let scoreStatus = {
                    won: 0,
                    lost: 0,
                    draw: 0,
                    goalScored: 0,
                    goalConceded: 0
                }

                //If the current iterating club is no "team1" then its score is on "first" element of an "ft" array ,
                //else it will be on "second" element.
                if (eachMatch.team1 === teamInfo.teamName) {

                    //Add scored goals
                    scoreStatus.goalScored = scoreStatus.goalScored + eachMatch.score.ft[0];

                    //Add conceded goals
                    scoreStatus.goalConceded = scoreStatus.goalConceded + eachMatch.score.ft[1];

                    if (eachMatch.score.ft[0] > eachMatch.score.ft[1]) {

                        //Add won games
                        scoreStatus.won = scoreStatus.won + 1;

                    }

                    else if (eachMatch.score.ft[0] < eachMatch.score.ft[1]) {

                        //Add lost games
                        scoreStatus.lost = scoreStatus.lost + 1;

                    }

                    else {

                        //Add drawn games
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

                //return final score from each game
                return (scoreStatus)
            }

            eachTeam.forEach((teamInfo) => {

                //Game staus from last five games for each club
                // 1 = won
                // -1 = lost
                // 0 = drawn

                let lastFiveGamesStatus = [];

                //get latest five matches status
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

                //Variables storing total game scores
                let totalWon = 0,
                    totalLost = 0,
                    totalDraw = 0,
                    totalGoalScored = 0,
                    totalGoalConceded = 0;

                //Caculate game scores from "matchDetails" arry 
                teamInfo.matchDetails.forEach(eachMatch => {

                    if (eachMatch.score) {

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

            //Sort row data array based on "points" in descensing order
            rowDataArry.sort((a, b) => {
                return b.points - a.points
            })

            setTableRowData(rowDataArry);

        }


        // console.log("eachTeam", eachTeam)

    }, [dispatch, eachTeam])

    useEffect(() => {

    }, [tableRowData])

    // console.log("rowDataArry", tableRowData);

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
                        loading &&

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Spinner /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr>
                    }



                    {

                        !loading
                        &&
                        tableRowData?.map((eachRow, index) => (
                            <tr key={index} className="row-layout"
                                onClick={() =>
                                    onRowClick({
                                        clubName: eachRow.club,
                                        clubWonGames: eachRow.won,
                                        clubLostGames: eachRow.lost,
                                        clubDrawnGames: eachRow.draw

                                    })}



                            >

                                <td>{index + 1}</td>
                                <td>
                                    <div className="club-row">
                                        <div>
                                            <img
                                                src={footBallLogo}
                                                alt={eachRow.club}
                                                className="club-logo"
                                            />
                                        </div>

                                        <div className="row-club-title">
                                            {eachRow.club}
                                        </div>

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
                                        {/* Add classes based on form status */}
                                        {
                                            eachRow.form.map((eachForm, indx) => {

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
                                                    <div key={indx} className={"game-status " + classNameDerived}>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </td>
                            </tr>

                        ))
                    }


                </tbody>
                {/* Table Row END*/}
            </table>


            {/* Table END */}
        </div>
    )
}
