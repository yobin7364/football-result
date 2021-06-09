import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

export const FootballModal = (props) => {
    const { data } = props;
    const [wonDetails, setWonDetails] = useState([]);
    const [lostDetails, setLostDetails] = useState([]);
    const [drawnDetails, setDrawnDetails] = useState([]);

    const isModalOpen = useSelector(state => state.premierLeague.isModalOpen);

    const premierLeagueMatch = useSelector(state => state.premierLeague.premierLeagueMatch);

    const dispatch = useDispatch();

    //open modal when "isModalOpen" redux state is "true"
    useEffect(() => {
        if (isModalOpen) {

            //display modal
            document.getElementById("myModal").style.display = "block";

            //hide body scroll
            document.getElementsByTagName("body")[0].style.overflow = "hidden";

            let wonMatches = [],
                lostMatches = [],
                drawnMatches = [];


            //Search "premierLeagueMatch" to find details of clicked row "club"
            premierLeagueMatch?.matches.forEach((eachMatch) => {

                //If score detail is proveided
                if (eachMatch.score) {

                    //Details in team1 then, current club name score will be on first element of array "ft"
                    //fill arrays according to comparision
                    if (eachMatch.team1 === data?.clubName) {

                        if (eachMatch.score.ft[0] > eachMatch.score.ft[1]) {
                            wonMatches.push(eachMatch);
                        }

                        else if (eachMatch.score.ft[0] < eachMatch.score.ft[1]) {
                            lostMatches.push(eachMatch)
                        }

                        else {
                            drawnMatches.push(eachMatch)
                        }

                    }

                    //Details in team2 then, current club name score will be on second element of array "ft"
                    if (eachMatch.team2 === data?.clubName) {

                        if (eachMatch.score.ft[0] < eachMatch.score.ft[1]) {
                            wonMatches.push(eachMatch);
                        }

                        else if (eachMatch.score.ft[0] > eachMatch.score.ft[1]) {
                            lostMatches.push(eachMatch)
                        }

                        else {
                            drawnMatches.push(eachMatch)
                        }

                    }
                }

            })

            setWonDetails(wonMatches);
            setLostDetails(lostMatches);
            setDrawnDetails(drawnMatches);

        }
    }, [isModalOpen, premierLeagueMatch, data])


    //close modal when clicked on modal "cross"
    const onCrossClick = () => {
        dispatch({ type: "IS_MODAL_OPEN", payload: false })
        document.getElementById("myModal").style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = "auto";
    }

    return (
        <div>

            {/* The Modal  */}
            <div id="myModal" className="modal">

                {/* Modal content  */}
                <div className="container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-header__title">
                                {data?.clubName}
                            </h1>
                            <div
                                className="close"
                                onClick={onCrossClick}
                            >
                                &times;
                        </div>

                        </div>

                        {/* won START*/}

                        <section className="match-report">
                            <div className="match-status">
                                <h1 className="title">
                                    Won
                            </h1>
                                <div className="scores scores-won">
                                    {data?.clubWonGames}
                                </div>
                            </div>

                            <ul className="scores-lists">

                                {
                                    wonDetails?.map((eachWonMatch, index) => {

                                        if (eachWonMatch.team1 === data?.clubName) {
                                            return (
                                                <li key={index} className="scores-item alternate-won-colors">
                                                    <h2 className="scores-title">
                                                        {eachWonMatch.team1} <span className="vs">VS</span>  {eachWonMatch.team2}
                                                    </h2>
                                                    <h2 className="scores-number">
                                                        {eachWonMatch.score.ft[0]} : {eachWonMatch.score.ft[1]}
                                                    </h2>
                                                </li>
                                            )
                                        }

                                        else {
                                            return (
                                                <li key={index} className="scores-item alternate-won-colors">
                                                    <h2 className="scores-title">
                                                        {eachWonMatch.team2} <span className="vs">VS</span>  {eachWonMatch.team1}
                                                    </h2>
                                                    <h2 className="scores-number">
                                                        {eachWonMatch.score.ft[1]} : {eachWonMatch.score.ft[0]}
                                                    </h2>
                                                </li>
                                            )
                                        }


                                    })
                                }

                            </ul>
                        </section>

                        {/* won END*/}

                        {/* Lost START*/}
                        <section className="match-report">
                            <div className="match-status">
                                <h1 className="title">
                                    Lost
                            </h1>
                                <div className="scores scores-loss">
                                    {data?.clubLostGames}
                                </div>
                            </div>

                            <ul className="scores-lists">

                                {
                                    lostDetails?.map((eachLostMatch, index) => {

                                        if (eachLostMatch.team1 === data?.clubName) {
                                            return (
                                                <li key={index} className="scores-item alternate-loss-colors">
                                                    <h2 className="scores-title">
                                                        {eachLostMatch.team1} <span className="vs">VS</span>  {eachLostMatch.team2}
                                                    </h2>
                                                    <h2 className="scores-number">
                                                        {eachLostMatch.score.ft[0]} : {eachLostMatch.score.ft[1]}
                                                    </h2>
                                                </li>
                                            )
                                        }

                                        else {
                                            return (
                                                <li key={index} className="scores-item alternate-loss-colors">
                                                    <h2 className="scores-title">
                                                        {eachLostMatch.team2} <span className="vs">VS</span>  {eachLostMatch.team1}
                                                    </h2>
                                                    <h2 className="scores-number">
                                                        {eachLostMatch.score.ft[1]} : {eachLostMatch.score.ft[0]}
                                                    </h2>
                                                </li>
                                            )
                                        }


                                    })
                                }

                            </ul>
                        </section>

                        {/* Lost END*/}

                        {/* Draw START*/}
                        <section className="match-report">
                            <div className="match-status">
                                <h1 className="title">
                                    Draw
                            </h1>
                                <div className="scores scores-draw">
                                    {data?.clubDrawnGames}
                                </div>
                            </div>

                            <ul className="scores-lists">

                                {
                                    drawnDetails?.map((eachDrawnMatch, index) => {

                                        if (eachDrawnMatch.team1 === data?.clubName) {
                                            return (
                                                <li key={index} className="scores-item alternate-draw-colors">
                                                    <h2 className="scores-title">
                                                        {eachDrawnMatch.team1} <span className="vs">VS</span>  {eachDrawnMatch.team2}
                                                    </h2>
                                                    <h2 className="scores-number">
                                                        {eachDrawnMatch.score.ft[0]} : {eachDrawnMatch.score.ft[1]}
                                                    </h2>
                                                </li>
                                            )
                                        }

                                        else {
                                            return (
                                                <li key={index} className="scores-item alternate-draw-colors">
                                                    <h2 className="scores-title">
                                                        {eachDrawnMatch.team2} <span className="vs">VS</span>  {eachDrawnMatch.team1}
                                                    </h2>
                                                    <h2 className="scores-number">
                                                        {eachDrawnMatch.score.ft[1]} : {eachDrawnMatch.score.ft[0]}
                                                    </h2>
                                                </li>
                                            )
                                        }


                                    })
                                }

                            </ul>
                        </section>

                        {/* Draw END*/}

                    </div>
                </div>

            </div>
        </div>
    )
}
