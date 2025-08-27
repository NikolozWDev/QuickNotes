import React from 'react'

const Note = ({note, onDelete}) => {

    const formattedDate = new Date(note.created).toLocaleDateString("en-US")

    return (
        <div className="flex flex-col justify-center items-center gap-[4px]">
            <p className="text-black text-[16px] font-bold">{note.title}</p>
            <p className="text-gray-900 text-[14px]">{note.content}</p>
            <p className="text-gray-500 text-[12px]">{formattedDate}</p>
            <button className="px-[20px] py-[8px] rounded-[8px] text-white bg-blue-500" onClick={() => {onDelete(note.id)}}>Delete</button>
        </div>
    )
}
export default Note