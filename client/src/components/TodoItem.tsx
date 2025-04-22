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
          console.log(data.error)
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

  return (
    <div>
      <ul role="list" className="pt-5">
        <li
          key={todo._id}
          className="bg-gray-200/60 rounded-2xl p-5 flex flex-row justify-between items-center gap-x-6"
        >
          <div className="flex min-w-0 gap-x-4">
            <h2 className="text-2xl p-2 bg-slate-100 rounded-full">{todo?.icon}</h2>
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 text-left font-semibold text-gray-900">
                {todo.body}
              </p>

              {todo.completed ? (
                <p className="rounded-md w-fit bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                  Completed
                </p>
              ) : (
                <p className="rounded-md w-fit bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                  In Progress
                </p>
              )}
            </div>
          </div>

          <div className="justify-end shrink-0 flex flex-col items-end">
            <div className="flex gap-1">
              {/* Update button */}
              <button
                onClick={() => updateTodo()}
                className="progress p-1 rounded z-10"
                type="button"
              >
                {isUpdating ? (
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
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                    />
                  </svg>
                )}
              </button>

              {/* Delete button */}
              <button
                onClick={() => deleteTodo()}
                className="danger p-1 rounded z-10"
                type="button"
              >
                {isDeleting ? (
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
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>

              <p className="text-xs/5 text-gray-500">
                {new Date(todo.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TodoItem;
