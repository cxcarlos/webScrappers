import React from 'react'

export default function TodoItem({todo, toggleTodo}) {
    const {id, reference, lote, completed,} = todo;

    const handleTodoClick = () => {
        toggleTodo(id);
    }

    return (
        <li > 
            <input type="checkbox" checked={completed} onChange={handleTodoClick}/>
            {reference}, {lote}
        </li>
    )
}
