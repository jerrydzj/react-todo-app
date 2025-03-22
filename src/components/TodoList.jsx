import { TodoCard } from "./TodoCard";

export function TodoList(props) {

    const { todos, selectedTab } = props
    const filteredTodos = selectedTab == "All" ?
        todos :
        selectedTab == "Open" ?
            todos.filter(val => !val.complete) :
            todos.filter(val => val.complete)

    return (
        <>
            {filteredTodos.map((todo, todoIndex) => {
                return (
                    <TodoCard key={todoIndex} {...props} todo={todo} todoIndex={todos.findIndex(val => val.input == todo.input)}/>
                )
            })}
        </>
    )
}