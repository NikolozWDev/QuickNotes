import React from "react";
import api from "../api";
import Note from "../components/Note";

const HomePage = () => {
  const [notes, setNotes] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  // note selector
  const [selectorTitle, setSelectorTitle] = React.useState("");
  const [selectorContent, setSelectorContent] = React.useState("");
  // delete container
  const [noteToDelete, setNoteToDelete] = React.useState(null);
  const [deleteCont, setDeleteCont] = React.useState(false);
  const [noteName, setNoteName] = React.useState("");

  React.useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    const res = await api.get("/api/notes/");
    setNotes(res.data);
  }
  async function deleteNotes(id) {
    await api.delete(`/api/notes/delete/${id}/`);
    getNotes();
  }
  async function createNotes(e) {
    e.preventDefault();
    validationNotes()
    if(title.length > 48 || content.length > 1200) {
      return
    }

    await api.post("/api/notes/", { title, content });
    getNotes();
    setTitle("");
    setContent("");
    setOpenNote(false);
    setOpenForm(false);
  }
  function searchNotes(id) {
    const note = notes.find((p) => p.id === id);
    setSelectorTitle(note.title);
    setSelectorContent(note.content);
    openNoteFunc();
  }
  // delete cont
  function areYouSure(id) {
    const nameOfNote = notes.find((p) => p.id === id);
    setNoteName(nameOfNote.title);
    closeNoteFunc();
    closeFormFunc();
    setNoteToDelete(id);
    setDeleteCont(true);
  }
  async function confrimDelete() {
    if (noteToDelete) {
      await deleteNotes(noteToDelete);
      setNoteToDelete(null);
      setDeleteCont(false);
    }
  }
  function cancelDelete() {
    setNoteToDelete(null);
    setDeleteCont(false);
  }

  // open/close note
  const [openNote, setOpenNote] = React.useState(false);
  function openNoteFunc() {
    setOpenNote(true);
    closeFormFunc();
    cancelDelete();
  }
  function closeNoteFunc() {
    setOpenNote(false);
  }
  // open/close create form
  const [openForm, setOpenForm] = React.useState(false);
  function openFormFunc() {
    setOpenForm(true);
    closeNoteFunc();
    cancelDelete();
  }
  function closeFormFunc() {
    setOpenForm(false);
  }
  // clear form
  function clearForm() {
    setTitle("");
    setContent("");
  }
  // validations 48/1200
  const [validatedTitle, setValidatedTitle] = React.useState(false)
  const [validatedContent, setValidatedContent] = React.useState(false)
  function validationNotes() {
    if(title.length > 48) {
      setValidatedTitle(true)
    } else {
      setValidatedContent(false)
    }

    if(content.length > 1200) {
      setValidatedContent(true)
    } else {
      setValidatedContent(false)
    }
  }

  return (
    <div className="w-[100%] pt-[100px] lg:pt-[140px] flex flex-col justify-center items-center gap-[60px] py-[30px]">
      <div className="lg:w-[976px] lg:px-[20px] w-[100%] flex flex-col justify-start items-start gap-[34px]">
        <div className="w-[100%] flex flex-row justify-between items-center">
          <p className="text-black text-[18px] font-bold">Your Notes</p>
          <button
            onClick={openFormFunc}
            className="px-[15px] py-[5px] rounded-[8px] text-white bg-gray-700 hover:opacity-[0.8] transition-all duration-[0.3s]"
          >
            Create Note
          </button>
        </div>
        <div className="w-[100%] flex flex-col justify-start items-start gap-[24px]">
          {notes.map((note) => {
            return (
              <Note
                key={note.id}
                note={note}
                onSearch={searchNotes}
                onDelete={areYouSure}
              />
            );
          })}
        </div>
      </div>

      {/* note reader */}
      <div
        className={`fixed
                    left-1/2
                    transform -translate-x-1/2 -translate-y-1/2
                    w-[90%] lg:w-[976px]
                    max-h-[80vh]
                    bg-white
                    z-50
                    p-6
                    flex flex-col gap-6
                    shadow-lg
                    rounded-lg
                    overflow-y-auto
                    bg-[url(../../public/assets/picture3.jpg)] transition-all duration-[0.5s]
            ${
              openNote
                ? "opacity-[1] top-1/2 pointer-events-auto"
                : "opacity-[0] top-[100px] pointer-events-none"
            }`}
      >
        <div className="relative w-[100%] flex flex-row justify-center items-center">
          <p className="break-words">{selectorTitle}</p>
          <div
            onClick={closeNoteFunc}
            className="absolute z-[31] top-[0px] right-[20px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-black cursor-pointer hover:text-red-500 transition-all duration-300"
            >
              <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
        <div className="overflow-y-auto">
          <p className="pb-[100px] break-words">{selectorContent}</p>
        </div>
      </div>
      {/* form container */}
      <form
        onSubmit={createNotes}
        className={`fixed
              top-1/2
              left-1/2
              transform -translate-x-1/2 -translate-y-1/2
              w-[90%] lg:w-[976px]
              max-h-[80vh]
              bg-white
              z-50
              p-6
              flex flex-col gap-6
              shadow-lg
              rounded-lg
              overflow-y-auto
              bg-[url(../../public/assets/picture3.jpg)]
              transition-all duration-500
      ${
        openForm
          ? "opacity-100 mt-[0px] pointer-events-auto"
          : "opacity-0 mt-[200px] pointer-events-none"
      }`}
      >
        <div className="relative w-[100%] flex flex-row justify-center items-center">
          <p className="text-[20px] font-bold text-red-500">Create Note</p>
          <div
            onClick={closeFormFunc}
            className="absolute z-[31] top-[0px] right-[20px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-black cursor-pointer hover:text-red-500 transition-all duration-300"
            >
              <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
        <div className="w-[100%] px-[20px] pb-[30px] flex flex-col justify-center items-center gap-[12px]">
          <div className="w-[100%] flex flex-col justify-start items-start gap-[4px]">
            <p className="text-[14px] text-gray-600">Title: <span className="text-[14px] text-red-500">{validatedTitle ? "title must be less then 48" : null}</span></p>
            <input
              type="text"
              name="title"
              placeholder="less then 48"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-b-[1px] border-black bg-yellow-100 focus:outline-none focus:border-red-500 transition-all duration-[0.3s]"
            />
          </div>
          <div className="w-[100%] flex flex-col justify-start items-start gap-[4px]">
            <p className="text-[14px] text-gray-600">Content: <span className="text-[14px] text-red-500">{validatedContent ? "content must be less then 1200" : null}</span></p>
            <textarea
              type="text"
              name="content"
              placeholder="less then 1200"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-b-[1px] border-black bg-yellow-100 focus:outline-none focus:border-red-500 transition-all duration-[0.3s]
              resize-none h-[250px]"
            ></textarea>
          </div>
          <div className="w-[100%] flex flex-row justify-center lg:justify-start items-center gap-[12px]">
            <button
              onClick={createNotes}
              className="w-[50%] px-[20px] py-[6px] rounded-[8px] bg-gray-700 text-white lg:w-[150px] hover:opacity-[0.8] transition-all duration-[0.3s]"
              type="submit"
            >
              Submit
            </button>
            <button
              onClick={clearForm}
              className="w-[50%] px-[20px] py-[6px] rounded-[8px] bg-red-500 text-white lg:w-[100px] hover:opacity-[0.8] transition-all duration-[0.3s]"
              type="submit"
            >
              clear
            </button>
          </div>
        </div>
      </form>
      {/* are you sure container */}
      <div
        className={`fixed
              top-1/2
              left-1/2
              transform -translate-x-1/2 -translate-y-1/2
              w-[70%] lg:w-[400px]
              max-h-[80vh]
              bg-white
              z-50
              p-6
              flex flex-col gap-6
              shadow-lg
              rounded-lg
              overflow-y-auto
              bg-[url(../../public/assets/picture3.jpg)]
              transition-all duration-500
                    ${
                      deleteCont
                        ? "opacity-100 ml-[0px] pointer-events-auto"
                        : "opacity-0 ml-[300px] pointer-events-none"
                    }
              `}
      >
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <p className="text-black text-[16px]">
            Are You Sure you want to delete{" "}
            <strong className="underline text-[18px]">{noteName}</strong> ?
          </p>
          <div className="flex flex-row justify-center items-center gap-[12px]">
            <button
              onClick={confrimDelete}
              className="px-[16px] py-[6px] rounded-[8px] bg-red-500 text-white hover:opacity-[0.8] transition-all duration-[0.3s]"
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              className="px-[16px] py-[6px] rounded-[8px] bg-gray-700 text-white hover:opacity-[0.8] transition-all duration-[0.3s]"
            >
              No, go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;