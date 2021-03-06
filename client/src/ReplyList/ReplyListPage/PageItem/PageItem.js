import React, { useState, useEffect } from "react";
import "./PageItem.css";
import { useSelector, useDispatch } from "react-redux";
import { addQuote, loginMenuOpen, toggleCreateReply } from "../../../actions";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "../../../axios";
import moment from "moment";
import { Tooltip } from "@mui/material";

function PageItem({
    id,
    floor,
    author,
    verified,
    time,
    content,
    upvote,
    downvote,
    upvotedBy,
    downvotedBy,
    quote,
    preview = false,
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const currentThread = useSelector(
        (state) => state.selectThread.currentThread
    );
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNumber, setUpvoteNumber] = useState(upvote);
    const [downvoteNumber, setDownvoteNumber] = useState(downvote);

    useEffect(() => {
        if (upvotedBy?.includes(user?._id)) {
            setUpvoted(true);
        }
        if (downvotedBy?.includes(user?._id)) {
            setDownvoted(true);
        }
    }, []);

    const handleUpvote = () => {
        if (preview === true) {
            return;
        }

        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        setUpvoteNumber(upvoteNumber + 1);
        setUpvoted(true);
        axios
            .post(`/upvote/${id}?userId=${user._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleDownvote = () => {
        if (preview === true) {
            return;
        }

        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        setDownvoteNumber(downvoteNumber + 1);
        setDownvoted(true);
        axios
            .post(`/downvote/${id}?userId=${user._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleQuoteReply = () => {
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }

        if (preview === true) {
            return;
        }
        dispatch(addQuote({ id, floor, author, content }));
        dispatch(toggleCreateReply());
    };

    return (
        <div className="thread_reply">
            <div className="thread_reply_container">
                <div className="reply_upper_level">
                    <div className="reply_floor">{floor}</div>
                    <div
                        className="reply_author"
                        style={{
                            color: verified ? "rgb(248, 183, 123)" : "white",
                        }}
                    >
                        {author}
                    </div>
                    {verified && (
                        <VerifiedIcon className="reply_verified_icon" />
                    )}
                    {author === currentThread.author.displayName && (
                        <div className="reply_OP">OP</div>
                    )}
                    <div className="reply_time">
                        {moment(time).format("L h:mma")}
                    </div>
                </div>
                <div className="reply_mid_level">
                    <div className="reply_quote">
                        <div className="vl" />
                        <div
                            className="reply_quote_content"
                            dangerouslySetInnerHTML={{ __html: quote?.content }}
                        />
                    </div>
                    <div className="reply_content">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
                <div className="reply_base_level">
                    <div className="vote">
                        <ThumbUpAltIcon
                            style={{
                                cursor:
                                    upvoted || downvoted ? "auto" : "pointer",
                                pointerEvents:
                                    upvoted || downvoted ? "none" : "all",
                                color: upvoted
                                    ? "rgb(231, 91, 91)"
                                    : "rgb(240, 248, 255)",
                            }}
                            className="upvote_button"
                            onClick={() => handleUpvote()}
                        />
                        <div
                            className="upvote_score"
                            style={{
                                color: upvoted
                                    ? "rgb(248, 183, 123)"
                                    : "rgb(240, 248, 255)",
                            }}
                        >
                            {upvoteNumber}
                        </div>
                        <ThumbDownAltIcon
                            style={{
                                cursor:
                                    upvoted || downvoted ? "auto" : "pointer",
                                pointerEvents:
                                    upvoted || downvoted ? "none" : "all",
                                color: downvoted
                                    ? "rgb(91, 154, 231)"
                                    : "rgb(240, 248, 255)",
                            }}
                            className="downvote_button"
                            onClick={() => handleDownvote()}
                        />
                        <div
                            className="downvote_score"
                            style={{
                                color: downvoted
                                    ? "rgb(248, 183, 123)"
                                    : "rgb(240, 248, 255)",
                            }}
                        >
                            {downvoteNumber}
                        </div>
                    </div>
                    <Tooltip title="Quote this reply" arrow disableInteractive>
                        <ReplyIcon
                            className="quote_icon"
                            onClick={() => handleQuoteReply()}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default PageItem;
