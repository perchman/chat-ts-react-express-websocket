import React from "react";

import {SystemMessageInterface} from "../../../../../types";

export default function SystemMessage({ data}: { data: SystemMessageInterface }) {
    return (
        <div>
            <span style={{color: '#' + data.user.color}}>{data.user.username}</span>
            {
                data.type === "join" ?
                    ' join the chat' :
                    ' left the chat'
            }
        </div>
    );
}