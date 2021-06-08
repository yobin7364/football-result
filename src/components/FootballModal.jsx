import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

export const FootballModal = (props) => {
    const { data } = props;

    const isModalOpen = useSelector(state => state.premierLeague.isModalOpen)

    const dispatch = useDispatch();

    //open modal when "isModalOpen" redux state is "true"
    useEffect(() => {
        if (isModalOpen) {
            document.getElementById("myModal").style.display = "block"
        }
    }, [isModalOpen])


    //close modal when clicked on modal "cross"
    const onCrossClick = () => {
        dispatch({ type: "IS_MODAL_OPEN", payload: false })
        document.getElementById("myModal").style.display = "none"
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
                                Liverpool Match
                        </h1>
                            <div
                                className="close"
                                onClick={onCrossClick}
                            >
                                &times;
                        </div>

                        </div>

                        {/* won */}

                        <section className="match-report">
                            <div className="match-status">
                                <h1 className="title">
                                    Won
                            </h1>
                                <div className="scores scores-won">
                                    13
                            </div>
                            </div>

                            <ul className="scores-lists">
                                <li className="scores-item alternate-won-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                                <li className="scores-item alternate-won-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                                <li className="scores-item alternate-won-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                            </ul>
                        </section>

                        {/* Loss */}
                        <section className="match-report">
                            <div className="match-status">
                                <h1 className="title">
                                    Loss
                            </h1>
                                <div className="scores scores-loss">
                                    13
                            </div>
                            </div>

                            <ul className="scores-lists">
                                <li className="scores-item alternate-loss-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                                <li className="scores-item alternate-loss-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                                <li className="scores-item alternate-loss-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                            </ul>
                        </section>

                        {/* Draw */}
                        <section className="match-report">
                            <div className="match-status">
                                <h1 className="title">
                                    Draw
                            </h1>
                                <div className="scores scores-draw">
                                    13
                            </div>
                            </div>

                            <ul className="scores-lists">
                                <li className="scores-item alternate-draw-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                                <li className="scores-item alternate-draw-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                                <li className="scores-item alternate-draw-colors">
                                    <h2 className="scores-title">
                                        Liverpool VS Chelsea
                                    </h2>
                                    <h2 className="scores-number">
                                        0:3
                                    </h2>
                                </li>

                            </ul>
                        </section>

                    </div>
                </div>

            </div>
        </div>
    )
}
