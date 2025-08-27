import React from 'react'
import api from '../api'
import Note from '../components/Note'

const HomePage = () => {

    const [notes, setNotes] = React.useState([])
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")

    React.useEffect(() => {
        getNotes()
    }, [])

    async function getNotes() {
        const res = await api.get("/api/notes/")
        setNotes(res.data)
    }
    async function deleteNotes(id) {
        await api.delete(`/api/notes/delete/${id}/`)
        getNotes()
    }
    async function createNotes(e) {
        e.preventDefault()
        await api.post("/api/notes/", {title, content})
        getNotes()
        setTitle("")
        setContent("")
    }

    return (
        <div className="flex flex-col justify-center items-center gap-[60px] py-[30px]">
            <div className="flex flex-col justify-center items-center gap-[16px]">
                <p className="text-black text-[18px] font-bold">Notes</p>
                <div className="flex flex-col justify-center items-center gap-[8px]">
                    {
                        notes.map((note) => {
                            return <Note key={note.id} note={note} onDelete={deleteNotes} />
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[16px]">
                <p className="text-black text-[18px] font-bold">Create Note</p>
                <form onSubmit={createNotes} className="flex flex-col justify-center items-center gap-[4px]">
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black" />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea type="text" name="content" required value={content} onChange={(e) => setContent(e.target.value)} className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"></textarea>
                    <br />
                    <button type='submit' className="w-[100%] rounded-[8px] py-[6px] text-white text-[16px] bg-blue-400">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default HomePage