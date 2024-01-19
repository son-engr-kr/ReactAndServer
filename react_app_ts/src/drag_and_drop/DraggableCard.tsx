import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface DraggableCardProps {
  id: string;
  text: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {text}
    </div>
  );
};

export default DraggableCard;