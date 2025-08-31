import React from 'react'

const Note = ({note, onDelete}) => {

    const formattedDate = new Date(note.created).toLocaleDateString("en-US")

    return (
        <div className="flex flex-row justify-between items-center gap-[4px] pt-[10px] px-[30px] border-t-[1px] border-gray-400 w-[100%]">
            <p className="text-black text-[16px] font-bold cursor-pointer hover:text-gray-500 transition-all duration-[0.3s] break-words whitespace-normal w-[100px] lg:w-[300px]"><small className="text-[12px] font-none text-gray-500 pr-[5px]">Name: </small>{note.title}</p>
            <div className="flex flex-row justify-center items-center gap-[12px]">
                <p className="text-gray-500 text-[12px]"><small>date: </small>{formattedDate}</p>
                <button className="px-[15px] py-[5px] rounded-[8px] text-white bg-red-500" onClick={() => {onDelete(note.id)}}>Delete</button>
            </div>
        </div>
    )
}
export default Note