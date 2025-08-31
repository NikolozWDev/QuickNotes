import React from "react";
import api from "../api";
import Note from "../components/Note";

const HomePage = () => {
  const [notes, setNotes] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

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
    await api.post("/api/notes/", { title, content });
    getNotes();
    setTitle("");
    setContent("");
  }

  return (
    <div className="w-[100%] pt-[100px] lg:pt-[140px] flex flex-col justify-center items-center gap-[60px] py-[30px]">
      <div className="lg:w-[976px] w-[100%] flex flex-col justify-start items-start gap-[34px]">
        <div className="w-[100%] flex flex-row justify-between items-center">
          <p className="text-black text-[18px] font-bold">Your Notes</p>
          <button className="px-[15px] py-[5px] rounded-[8px] text-white bg-gray-700">
            Create Note
          </button>
        </div>
        <div className="w-[100%] flex flex-col justify-start items-start gap-[24px]">
          {notes.map((note) => {
            return <Note key={note.id} note={note} onDelete={deleteNotes} />;
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[16px]">
        <p className="text-black text-[18px] font-bold">Create Note</p>
        <form
          onSubmit={createNotes}
          className="flex flex-col justify-center items-center gap-[4px]"
        >
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            type="text"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black"
          ></textarea>
          <br />
          <button
            type="submit"
            className="w-[100%] rounded-[8px] py-[6px] text-white text-[16px] bg-blue-400"
          >
            Submit
          </button>
        </form>
      </div>

      {/* note reader */}
      <div
        className="    fixed
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
            bg-[url(../../public/assets/picture3.jpg)]"
      >
        <div className="relative w-[100%] flex flex-row justify-center items-center">
          <p>title here</p>
          <div className="absolute z-[31] top-[0px] right-[20px]">
            <svg
              className="w-[30px] h-[30px] text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-y-auto">
          <p className="pb-[100px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            accusantium impedit praesentium nulla mollitia, veritatis
            reprehenderit quos molestiae rem culpa sed quo vero corrupti dolor
            aspernatur dolorem cumque! Corrupti recusandae veniam, repellat
            reiciendis ad nulla doloribus minima iusto dolores, voluptate, est
            dolore impedit? Voluptates incidunt veniam repellendus, commodi
            corporis blanditiis excepturi tempore quia impedit assumenda,
            facilis adipisci possimus, eius placeat optio quibusdam? A eius
            natus suscipit minus veniam amet qui, rem consectetur. Tenetur et
            quae laboriosam? Ullam assumenda aut et consequuntur eum atque quae,
            veniam nisi non hic est cupiditate? Eum suscipit molestiae minima
            quaerat dolore aliquid ipsam nisi asperiores ducimus numquam
            laudantium doloribus, unde, distinctio ipsa? Sint a adipisci
            architecto neque at ullam tenetur, maiores earum, ratione labore
            impedit quos odio provident? Sunt qui, aliquam inventore debitis
            omnis repellendus beatae dolor recusandae exercitationem obcaecati
            dignissimos mollitia temporibus. Provident voluptatibus ea tempore
            facilis, ex nesciunt sint eius deserunt eveniet in reprehenderit,
            cumque dolores quam iste voluptatem. Odit nam sint distinctio
            perferendis repellendus dicta repellat fugit quo, quia quam tenetur
            architecto ducimus doloremque, sed possimus ipsum ipsa molestiae
            omnis nihil nobis, iste consequuntur quibusdam nesciunt sequi.
            Officiis illo, deleniti, amet ea in aperiam rem aspernatur odio
            voluptatum atque perspiciatis expedita aut ipsa? Nostrum mollitia
            fuga reiciendis culpa itaque asperiores voluptatibus rem, suscipit
            corrupti nemo, sint esse quam temporibus eveniet eligendi voluptas
            quaerat molestiae, est ab! Assumenda officia cupiditate ratione ut
            ea illum recusandae aut minima qui vitae maxime perspiciatis
            distinctio dolorum perferendis natus omnis nemo laborum, harum
            officiis odit culpa optio dolorem. Necessitatibus similique,
            veritatis earum distinctio fuga eveniet quae dicta inventore. Esse
            nobis maiores nisi voluptate harum unde, officiis inventore, totam
            soluta consectetur molestias laboriosam aut non corrupti. Sed quos
            totam quibusdam, laboriosam suscipit fuga fugiat quis autem. Eius
            nihil praesentium dolorum corrupti? Minima tenetur inventore sunt
            ducimus. Veritatis voluptate impedit in, voluptatum blanditiis
            atque, repellat mollitia dolorem quibusdam quisquam ducimus non.
            Repellat accusantium voluptatem, ab blanditiis dicta repellendus
            rerum fugiat aut debitis veritatis pariatur ipsam repudiandae
            dignissimos illum omnis eius unde a architecto doloribus quisquam
            nisi consequuntur corporis molestiae voluptatibus. Consectetur
            reprehenderit tenetur laudantium impedit. Ut voluptas, perspiciatis
            recusandae atque odit animi sunt molestias
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomePage;