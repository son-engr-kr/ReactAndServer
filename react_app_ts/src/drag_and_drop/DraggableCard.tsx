import React from 'react';
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd';

interface DraggableCardProps {
  id: string;
  text: string;
  targetZone: number; 
  moveCard: (draggedId: string, targetId: string, targetZone: number) => void;
}
const DraggableCard: React.FC<DraggableCardProps> = ({ id, text, targetZone, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { id: string }) => {
      if (item.id !== id) {
        moveCard(item.id, id, targetZone);
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {text}
    </div>
  );
};

export default DraggableCard;