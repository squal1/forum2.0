import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createThreadClose } from "./actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import "tinymce/skins/ui/1.0/skin.css";
import "tinymce/skins/ui/1.0/content.inline.css";
import "./CreateThread.css";

function CreateThread() {
    // For toggling
    const style = useSelector((state) => state.createThreadToggle);
    const dispatch = useDispatch();

    // Styling react-select
    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: 200,
            color: "white",
            background: "#222222",
            borderRadius: "5px",
            borderColor: state.isFocused ? "#f8b77b" : "#505050",
            boxShadow: state.isFocused ? null : null,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "white",
        }),
        menu: (base) => ({
            ...base,
            marginTop: 0,
            zIndex: 9999,
        }),
        menuList: (base) => ({
            ...base,
            background: "#222222",
        }),
        option: (base, state) => ({
            ...base,
            color: "white",
            background: state.isFocused ? "#545454" : "#222222",
            "&:hover": {
                background: "#545454",
            },
        }),
    };

    // Values of category selection
    const options = [
        { value: "general", label: "General" },
        { value: "gossip", label: "Gossip" },
        { value: "course", label: "Courses&Profs" },
        { value: "job", label: "Job Connections" },
    ];

    // For category selection
    const [category, setCategory] = useState("");

    const handleCategoryChange = (option) => {
        setCategory(option.value);
    };

    // For title
    const [title, setTitle] = useState("");

    // Logging out new thread data
    const logInput = () => {
        console.log(category);
        console.log(title);
    };

    // Remember to check input before create new thread

    /* Data needed to create a new thread 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    */

    /* https://www.tiny.cloud/ */
    /* https://www.google.com/search?q=tinymce+editor+get+html+content&client=firefox-b-1-d&ei=iPVDYrs189j0A4mKoNAD&oq=tinymce+editor+get&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwA0oECEEYAEoECEYYAFDQA1iyBWCGFGgBcAF4AIABWYgB-AGSAQEzmAEAoAEByAEIwAEB&sclient=gws-wiz */

    return (
        <div
            className="create_thread"
            style={{
                display: style.display,
            }}
        >
            <div
                className="create_thread_overlay"
                onClick={() => dispatch(createThreadClose())}
            ></div>
            <div className="create_thread_window">
                <div className="create_thread_window_header">
                    <div>
                        <p>Creating new thread in: </p>
                        <Select
                            options={options}
                            styles={customStyles}
                            onChange={(option) => handleCategoryChange(option)}
                        />
                    </div>

                    <div
                        className="create_thread_window_exit_button"
                        onClick={() => dispatch(createThreadClose())}
                    >
                        <ClearRoundedIcon />
                    </div>
                </div>
                <div className="create_thread_window_title">
                    <input
                        className="title"
                        placeholder="Title of the thread"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="create_thread_window_content">
                    <Editor
                        apiKey="n6yu8t20ieccyzq70g4q8hqld8siccaoj0fa11nqkdj4kdds"
                        initialValue="<p></p>"
                        init={{
                            selector: ".editor",
                            content_css: "default",
                            skin: false,
                            content_style: "body { color: white; }",
                            menubar: false,
                            resize: false,
                            height: "99%",
                            width: "98%",
                            plugins: [
                                "advlist autolink lists link image",
                                "charmap print preview anchor help",
                                "searchreplace visualblocks code",
                                "insertdatetime media table paste wordcount",
                            ],

                            toolbar:
                                "formatselect | fontsizeselect | forecolor | bold italic underline strikethrough| \
                                    alignleft aligncenter alignright | \
                                    bullist numlist outdent indent | help",
                        }}
                    />
                </div>
                <div className="create_thread_window_footer">
                    <div className="footer_buttons">
                        <div
                            className="cancel_button"
                            onClick={() => dispatch(createThreadClose())}
                        >
                            <p>Cancel</p>
                        </div>
                        <div
                            className="sumbit_button"
                            onClick={() => logInput()}
                        >
                            <p>Submit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateThread;
