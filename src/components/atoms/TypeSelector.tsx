
import { ACTION_TYPES, ActionType } from '@/lib/domain/action-type';

export const TypeSelector = ({ value, onChange }: { value: string, onChange: (val: ActionType) => void }) => (
    <div className="flex flex-col gap-1 mb-4">
        <label className="text-[10px] uppercase text-blue-400 font-bold">Action Type</label>
        <select
            className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value as ActionType)}
        >
            {ACTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
    </div>
);