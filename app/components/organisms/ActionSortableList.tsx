"use client";
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Action } from '@/types/events';
import { SortableActionItem } from '../molecules/SortableActionItem';

interface Props {
    actions: Action[];
    onReorder: (newActions: Action[]) => void;
    onUpdateAction: (idx: number, field: string, val: any) => void;
    onDeleteAction: (idx: number) => void; // <--- Añadir esto
}

export const ActionSortableList = ({ actions, onReorder, onUpdateAction, onDeleteAction }: Props) => {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = active.id as number;
            const newIndex = over.id as number;
            onReorder(arrayMove(actions, oldIndex, newIndex));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={actions.map((_, i) => i)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col">
                    {actions.map((action, idx) => (
                        <SortableActionItem
                            key={`${action.type}-${idx}`}
                            idx={idx}
                            action={action}
                            onUpdate={onUpdateAction}
                            onDeleteAction={onDeleteAction} // <--- Pasar la prop aquí
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};