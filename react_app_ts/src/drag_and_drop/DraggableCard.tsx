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
    end: (item:{id:string}) =>{
      console.log(`in DraggableCard.useDrag.end, id:${id}`)
    }
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { id: string }) => {
      if (item.id !== id) {
        console.log(`DraggableCard-hover-item.id(${item.id}) !== id${id}`);
        //드래그 중에 다른 카드 위에 놓이게 되면
        moveCard(item.id, id, targetZone);
      }
      else{
        //같은 카드 위에 놓이게 되면
        console.log(`DraggableCard-hover-item.id(${item.id}) === id${id}`);

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