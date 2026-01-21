import { Action } from '@/types/events';
import { actionConfig } from './actionConfig';


interface ActionBadgeProps {
    action: Action;
    onClick?: () => void; // Evento void opcional
}

export const ActionBadge = ({ action, onClick }: ActionBadgeProps) => {
    // Diccionario de Configuración: Color e Icono por tipo


    const config = actionConfig[action.type] || {
        color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
        icon: '⚡'
    };

    return (
        <div
            onClick={onClick}
            className={`
      flex items-center gap-1.5 px-2 py-0.5 rounded 
      text-[12px] font-bold font-mono border 
      transition-all duration-200 select-none
      ${config.color}
      /* Si onClick existe, aplica pointer, si no, cursor por defecto */
      ${onClick ? 'cursor-pointer active:scale-95' : ''}
    `}
        >
            <span>{config.icon}</span>
            <span className="tracking-tight uppercase">{action.type}</span>
        </div>
    );
};