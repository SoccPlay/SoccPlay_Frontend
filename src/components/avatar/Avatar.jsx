import React from "react";
import "./Avatar.scss";
const Avatar = ({ username }) => {
    return (
        <div>
            <div className="container-avatar">
                <p className="text-avatar">
                    {username ? username.charAt(0).toUpperCase() : ""}
                </p>
            </div>
        </div>
    );
};

export default Avatar;
