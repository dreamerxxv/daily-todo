// import { BASE_URL } from "../App";
// import Loader from "../ui/Loader";
import Navbar from "../components/Navbar";
import TodoItem from "../components/TodoItem";
import { useQuery } from "@tanstack/react-query";

export type Todo = {
  _id: number;
  icon: string;
  body: string;
  createdAt: Date;
  completed: boolean;
};

const AllTodos = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alltodos");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something is wrong");
        }

        return data || [];
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="px-3 lg:px-16">
        <h1 className="mt-14 block text-3xl lg:text-5xl leading-none font-bold text-gray-900">
        Your Todo Notes 📃
        </h1>

        <p className="mt-3 lg:w-[70%] w-[80%] text-gray-700 text-sm">
          What is your todo for today? Start today by writing down your tasks
          and staying productive. 🚀
        </p>

        {!isLoading && todos?.length === 0 && (
          <div className="items-center">
            <h2 className="text-xl font-semibold text-center text-gray-500 mt-5">
              All todos completed! 🤞
            </h2>
          </div>
        )}

        <div className="gap-3">
          {todos?.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllTodos;
