
import Loader from "../ui/Loader";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";

export type Todo = {
  _id: number;
  icon: string;
  body: string;
  createdAt: Date;
  completed: boolean;
}

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
        try {
            const res = await fetch("http://localhost:5000/api/todos")
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Something is wrong')
            }

            return data || []

        } catch (error) {
            console.log(error)
        }
    }
})

  return (
    <div className="px-3 lg:px-16">

      { isLoading && (
        <div className="flex justify-center my-4">
          <Loader />
        </div>
      ) }

      {!isLoading && todos?.length === 0 && (
        <div className="items-center">
          <h2 className="text-xl font-semibold text-center text-gray-500 mt-5">All todos completed! 🤞</h2>
        </div>
      ) }

      <div className="gap-3">
      {todos?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
      </div>
    </div>
  );
};

export default TodoList;
