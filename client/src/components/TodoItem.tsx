import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./TodoList";
import { BASE_URL } from "../App";
import Spinner from "../ui/Spinner";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo is already completed!");

      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something is wrong");
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.Error || "Something is wrong");
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  return (
    <div>
      <ul role="list" className="pt-5">
        <li
          key={todo._id}
          className="bg-gray-200/60 rounded-2xl p-5 flex justify-between gap-x-6 py-5"
        >
          <div className="flex min-w-0 gap-x-4">

            
          <h2 className="text-2xl p-2 bg-slate-100 rounded-full">{todo?.icon}</h2>

            {/* <img
              alt=""
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-12 flex-none rounded-full bg-gray-50"
            /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 text-left font-semibold text-gray-900">
                {todo.body}
              </p>

              {/* Completed Badge */}
              {todo.completed && (
                <p className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                  Completed
                </p>
              )}

              {!todo.completed && (
                <p className="rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                  In Progress
                </p>
              )}
            </div>
          </div>

          <div className="justify-end shrink-0 flex flex-col items-end">
            <div className="flex gap-1">
              {/* // Progress Icon  */}
              <a onClick={() => updateTodo()} className="progress">
                {!isUpdating && (
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
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                    />
                  </svg>
                )}

                {/* <Spinner /> */}

                {isUpdating && <Spinner />}
              </a>

              {/* // Cancel Icon  */}
              <a onClick={() => deleteTodo()} className="danger">
                {!isDeleting && (
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
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}

                {isDeleting && <Spinner />}
              </a>
            </div>

            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              
              <p className="text-xs/5 text-gray-500">
              {new Date(todo.createdAt).toLocaleString()}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                    clipRule="evenodd"
                  />
                </svg> */}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TodoItem;
