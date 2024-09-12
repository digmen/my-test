import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './home.css';

// Функция для перестановки элементов внутри одной колонки
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// Функция для перемещения элементов между колонками
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return {
        source: sourceClone,
        destination: destClone
    };
};

export default function HomePage() {
    // Загрузка состояния из localStorage
    const loadColumnsFromLocalStorage = () => {
        const savedColumns = localStorage.getItem('columns');
        return savedColumns ? JSON.parse(savedColumns) : {
            'column-1': {
                id: 'column-1',
                title: 'To Do',
                items: [
                    { id: 'item-1', content: 'Task 1' },
                    { id: 'item-2', content: 'Task 2' }
                ]
            },
            'column-2': {
                id: 'column-2',
                title: 'In Progress',
                items: [
                    { id: 'item-3', content: 'Task 3' },
                    { id: 'item-4', content: 'Task 4' }
                ]
            },
            'column-3': {
                id: 'column-3',
                title: 'Done',
                items: [
                    { id: 'item-5', content: 'Task 5' },
                    { id: 'item-6', content: 'Task 6' }
                ]
            }
        };
    };

    const [columns, setColumns] = useState(loadColumnsFromLocalStorage);

    useEffect(() => {
        // Сохранение состояния в localStorage при изменении
        localStorage.setItem('columns', JSON.stringify(columns));
    }, [columns]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            // Перемещение внутри одной колонки
            const column = columns[source.droppableId];
            const reorderedItems = reorder(
                column.items,
                source.index,
                destination.index
            );

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: reorderedItems
                }
            });
        } else {
            // Перемещение между колонками
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];

            const { source: updatedSource, destination: updatedDestination } = move(
                sourceColumn.items,
                destColumn.items,
                source,
                destination
            );

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: updatedSource
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: updatedDestination
                }
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='container'>
                {Object.values(columns).map(column => (
                    <Droppable key={column.id} droppableId={column.id} direction="vertical">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="column"
                            >
                                <h2>{column.title}</h2>
                                {column.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="card"
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}
