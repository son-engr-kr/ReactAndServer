import React from 'react';
import { useDrop } from 'react-dnd';
import './dragAndDropStyles.css';

interface DropZoneProps {
  zone: number;
  onHover: (draggedId: string, targetZone: number) => void;
  onDrop: (draggedId: string, targetZone: number) => void;
  children: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ zone, onDrop, onHover, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { id: string }) => {
      onDrop(item.id, zone);
    },
    hover: (item:{id:string}) => {
      onHover(item.id, zone)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    
  });

  return (
    <div className={`drop-zone ${isOver ? 'over' : ''}`} ref={drop}>
      {children}
    </div>
  );
};


export default DropZone;