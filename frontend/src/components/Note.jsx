import React from 'react'

const Note = ({note, onSearch, onEdit, onDelete}) => {

    function timeAgo(dateString) {

    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);
    const weeks   = Math.floor(days / 7);
    const months  = Math.floor(days / 30);
    const years   = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

    }

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center gap-[12px] md:gap-[4px] pt-[10px] px-[10px] border-t-[1px] border-gray-400 w-[100%]">
            <p onClick={() => {onSearch(note.id)}} className="flex flex-row justify-center items-center md:justify-start items-start text-black text-[16px] font-bold cursor-pointer hover:text-gray-500 transition-all duration-[0.3s] underline break-words whitespace-normal w-[100%] md:w-[100px] md:w-[300px] animate-note"><small className="text-[12px] font-none text-gray-500 pr-[5px]">Name: </small><span className="break-words max-w-[200px]">{note.title}</span></p>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-[8px]">
                <p className="text-gray-500 text-[12px]"><small>created: </small>{timeAgo(note.created)}</p>
                <div className="flex flex-row gap-[4px]">
                    <button className="px-[15px] py-[5px] rounded-[8px] text-white bg-blue-500 hover:opacity-[0.8]
                    transition-all duration-[0.3s]" onClick={() => {onEdit(note)}}>Edit</button>
                    <button className="px-[15px] py-[5px] rounded-[8px] text-white bg-red-500 hover:opacity-[0.8]
                    transition-all duration-[0.3s]" onClick={() => {onDelete(note.id)}}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default Note