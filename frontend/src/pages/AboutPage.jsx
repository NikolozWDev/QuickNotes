import React from "react";

const AboutPage = () => {
  return (
    <div className="w-[100%] flex flex-row justify-center items-center py-[100px] md:py-[150px] overflow-hidden">
      <div className="w-[100%] flex flex-col justify-center items-center gap-[50px] lg:w-[976px] lg:px-[20px]">
        <div className="flex flex-col justify-start items-start gap-[8px] pb-[20px] border-b-[1px] border-gray-400 rounded-[30px] animate-lefter">
          <p className="text-red-500 font-bold text-[18px]">About Project</p>
          <p className="text-black text-[14px]">
            This project is a simple but fully functional note-taking
            application built with React for the frontend and Django for the
            backend. It allows users to securely register, log in, and manage
            their own notes in a personal dashboard. The design is responsive,
            and the app supports dynamic updates without page reloads. The
            purpose of this project is to practice full-stack development skills
            while providing a useful tool for users to organize their thoughts,
            tasks, and reminders.
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-[8px] pb-[20px] border-b-[1px] border-gray-400 rounded-[30px] animate-righter">
          <p className="text-red-500 font-bold text-[18px]">My Notes</p>
          <p className="text-black text-[14px]">
            Each user can view a list of all their personal notes, create new
            notes with titles and content, edit existing notes whenever needed,
            and delete any notes they no longer require. The interface is
            user-friendly, with buttons clearly labeled for adding, editing, and
            removing notes. Notes are stored in the backend database, ensuring
            that each note is tied securely to the logged-in user. Changes are
            saved instantly, and users can manage their notes efficiently
            without refreshing the page, making the experience smooth and
            intuitive.
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-[8px] pb-[20px] border-b-[1px] border-gray-400 rounded-[30px] animate-bottomer">
          <p className="text-red-500 font-bold text-[18px]">Stats/Summary</p>
          <p className="text-black text-[14px]">
            a summary of the notes created within the app. For example, it
            displays the total number of notes, which currently is 21. Users can
            see an overview of all notes in the system and get a quick
            understanding of their note-taking activity. It may also include
            additional statistics in the future, such as notes created today,
            notes per user, or other analytics. The goal is to give users
            insight into their own usage patterns and help them stay organized
            by visually summarizing their note data in one place.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;