import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { BASE_URL } from "../App";
import Spinner from "../ui/Spinner";
import EmojiPicker from "emoji-picker-react";

const TodoForm = () => {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();
  // const [isPending, setIsPending] = useState(false);

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const res = await fetch(BASE_URL + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ body: newTodo, icon: emojiIcon }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }

        setNewTodo("");
        setEmojiIcon("😀");
        return data;

      } catch (error: any) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error: any) => {
      alert(error.message);
    },
  });

  return (
    <div className="px-3 lg:px-16">
      <h1 className="mt-6 block text-3xl lg:text-5xl leading-none font-bold text-gray-900">
        Today's Todo 💻
      </h1>

      <form onSubmit={createTodo}>
        <div className="mt-6 flex w-full items-center gap-x-3">
          <button
            className="relative p-2 bg-gray-200/60 rounded-xl"
            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            type="button"
          >
            {emojiIcon}
          </button>

          <div className="absolute mt-3 z-20 top-[40%] transform">
            { openEmojiPicker && (
              <EmojiPicker
              open={openEmojiPicker}
              onEmojiClick={(icon) => {
                setEmojiIcon(icon.emoji);
                setOpenEmojiPicker(false);
              }}
            />
            ) }
          </div>

          <input
            id="title"
            name="todo"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Type your todo"
            className="min-w-0 flex-auto rounded-xl bg-white/5 px-3.5 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-primary placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <button
            type="submit"
            className="flex-none rounded-xl bg-indigo-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {isCreating ? (
              <Spinner />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
