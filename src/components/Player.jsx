import { useState } from "react";

export default function Player({initialName,symbol,isActive,onNameChange}){

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing((editing) => !isEditing);
    }

    function handleNameChange(event){
        setPlayerName(event.target.value);
        onNameChange(symbol,playerName);
    }

    let editablePlayerName =  <span className="player-name">{playerName}</span>;

    if(isEditing){
        editablePlayerName = <input  type = "text" value = {playerName} onChange={handleNameChange} required/>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span> 
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}