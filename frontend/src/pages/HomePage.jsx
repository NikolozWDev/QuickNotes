import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import Note from "../components/Note";
import Loading from "../components/Loading";
import picture3 from "../../public/assets/picture3.jpg";

const HomePage = ({ startLoading, stopLoading, showToast }) => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [openNote, setOpenNote] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [deleteCont, setDeleteCont] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [noteName, setNoteName] = useState("");
    const [selectorTitle, setSelectorTitle] = useState("");
    const [selectorContent, setSelectorContent] = useState("");
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        if (fetching) return;
        setFetching(true);
        startLoading("Loading notes...");
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
        } catch (error) {
            showToast("Failed to load notes.", "error");
        } finally {
            stopLoading();
            setFetching(false);
        }
    };

    const deleteNote = async (id) => {
        const previousNotes = [...notes];
        setNotes(notes.filter(n => n.id !== id));
        setDeleteCont(false);
        setNoteToDelete(null);
        try {
            await api.delete(`/api/notes/delete/${id}/`);
        } catch (error) {
            setNotes(previousNotes);
            showToast("Failed to delete note.", "error");
        }
    };

    const updateNote = async (id, updatedData) => {
        if (updatedData.title.length > 48 || updatedData.content.length > 1200) {
            showToast("Title or content too long.", "error");
            return;
        }
        startLoading("Updating note...");
        try {
            await api.put(`/api/notes/update/${id}/`, updatedData);
            await getNotes();
            resetForm();
        } catch (error) {
            showToast("Failed to update note.", "error");
        } finally {
            stopLoading();
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        if (title.length > 48 || content.length > 1200) {
            showToast("Title or content too long.", "error");
            return;
        }
        startLoading("Creating note...");
        try {
            await api.post("/api/notes/", { title, content });
            await getNotes();
            resetForm();
        } catch (error) {
            showToast("Failed to create note.", "error");
        } finally {
            stopLoading();
        }
    };

    const handleFormSubmit = (e) => {
        if (isEditing && isEditing.id) {
            updateNote(isEditing.id, { title, content });
        } else {
            createNote(e);
        }
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setIsEditing(null);
        setOpenForm(false);
    };

    const editNote = (note) => {
        setIsEditing(note);
        setTitle(note.title);
        setContent(note.content);
        setOpenForm(true);
        setOpenNote(false);
        setDeleteCont(false);
    };

    const confirmDelete = (id) => {
        const name = notes.find(n => n.id === id)?.title || "";
        setNoteName(name);
        setNoteToDelete(id);
        setDeleteCont(true);
        setOpenNote(false);
        setOpenForm(false);
    };

    const searchNotes = (term) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredNotes([]);
            return;
        }
        const filtered = notes.filter(n => n.title.toLowerCase().includes(term.toLowerCase()));
        setFilteredNotes(filtered);
    };

    const openNoteView = (id) => {
        const note = notes.find(n => n.id === id);
        if (note) {
            setSelectorTitle(note.title);
            setSelectorContent(note.content);
            setOpenNote(true);
            setOpenForm(false);
            setDeleteCont(false);
        }
    };

    const displayedNotes = searchTerm ? filteredNotes : notes;

    return (
        <div className="w-[100%] pt-[100px] lg:pt-[140px] flex flex-col justify-center items-center gap-[60px] py-[30px]">
            <div className="lg:w-[976px] lg:px-[20px] w-[100%] flex flex-col justify-start items-start gap-[34px]">
                <div className="w-[100%] flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row gap-[20px] items-center">
                        <p className="text-black text-[18px] font-bold">Your Notes</p>
                        <div className="relative">
                            <input
                                onChange={(e) => searchNotes(e.target.value)}
                                value={searchTerm}
                                className="border rounded-[8px] px-[10px] py-[6px] focus:outline-none focus:border-red-500"
                                placeholder="Search Notes"
                                type="text"
                            />
                        </div>
                    </div>
                    <button onClick={() => { setIsEditing(null); setTitle(""); setContent(""); setOpenForm(true); setOpenNote(false); setDeleteCont(false); }} className="px-[15px] py-[5px] rounded-[8px] text-white bg-gray-700 hover:opacity-[0.8]">
                        Create Note
                    </button>
                </div>
                {fetching ? (
                    <div className="flex justify-center w-full py-20"><Loading /></div>
                ) : (
                    <div className="w-[100%] flex flex-col-reverse justify-start items-start gap-[24px]">
                        {displayedNotes.map(note => (
                            <Note
                                key={note.id}
                                note={note}
                                onSearch={openNoteView}
                                onEdit={editNote}
                                onDelete={confirmDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Note viewer modal */}
            <div className={`fixed left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[976px] max-h-[60vh] bg-white z-50 p-6 flex flex-col gap-6 shadow-lg rounded-lg overflow-y-auto transition-all duration-500 ${openNote ? "opacity-100 top-1/2 -translate-y-1/2" : "opacity-0 top-[100px] pointer-events-none"}`} style={{backgroundImage: `url(${picture3})`}}>
                <div className="relative flex justify-center">
                    <p className="break-words max-w-[200px] font-bold">{selectorTitle}</p>
                    <div onClick={() => setOpenNote(false)} className="absolute top-[-25px] right-[-10px] md:top-[-10px] md:right-[10px] cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    </div>
                </div>
                <div className="overflow-y-auto"><p className="pb-[100px] break-words">{selectorContent}</p></div>
            </div>

            {/* Note form modal */}
            <form onSubmit={handleFormSubmit} className={`fixed left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[976px] max-h-[80vh] bg-white z-50 p-6 flex flex-col gap-6 shadow-lg rounded-lg overflow-y-auto transition-all duration-500 ${openForm ? "opacity-100 top-1/2 -translate-y-1/2" : "opacity-0 top-[200px] pointer-events-none"}`} style={{backgroundImage: `url(${picture3})`}}>
                <div className="relative flex justify-center">
                    <p className="text-[20px] font-bold text-red-500">{isEditing ? "Edit Note" : "Create Note"}</p>
                    <div onClick={() => { setOpenForm(false); resetForm(); }} className="absolute top-[-25px] right-[-10px] md:top-[-10px] md:right-[10px] cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Title (max 48)</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-[14px] py-[6px] rounded-[8px] border-b-[1px] border-black bg-yellow-100" />
                        {title.length > 48 && <p className="text-red-500 text-sm">Title too long</p>}
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Content (max 1200)</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-[14px] py-[6px] rounded-[8px] border-b-[1px] border-black bg-yellow-100 resize-none h-[250px]" />
                        {content.length > 1200 && <p className="text-red-500 text-sm">Content too long</p>}
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="px-[20px] py-[6px] rounded-[8px] bg-gray-700 text-white hover:opacity-80">{isEditing ? "Update" : "Submit"}</button>
                        <button type="button" onClick={resetForm} className="px-[20px] py-[6px] rounded-[8px] bg-red-500 text-white hover:opacity-80">Clear</button>
                    </div>
                </div>
            </form>

            {/* Delete confirmation modal */}
            <div className={`fixed left-1/2 transform -translate-x-1/2 w-[90%] max-w-[400px] bg-white z-50 p-6 flex flex-col gap-6 shadow-lg rounded-lg transition-all duration-500 ${deleteCont ? "opacity-100 top-1/2 -translate-y-1/2" : "opacity-0 top-[300px] pointer-events-none"}`} style={{backgroundImage: `url(${picture3})`}}>
                <p className="text-center">Are you sure you want to delete <strong>{noteName}</strong>?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => deleteNote(noteToDelete)} className="px-6 py-2 rounded-[8px] bg-red-500 text-white">Yes</button>
                    <button onClick={() => setDeleteCont(false)} className="px-6 py-2 rounded-[8px] bg-gray-700 text-white">No</button>
                </div>
            </div>
        </div>
    );
};
export default HomePage;