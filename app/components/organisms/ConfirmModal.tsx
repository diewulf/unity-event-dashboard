"use client";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info'; // Para cambiar el color del botón principal
}

export const ConfirmModal = ({
    isOpen,
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = 'danger'
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    const confirmColors = type === 'danger'
        ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20';

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-sm rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Contenido */}
                <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        {type === 'danger' && <span className="text-red-500">⚠️</span>}
                        {title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Acciones */}
                <div className="bg-white/5 p-4 flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded text-[11px] font-bold text-slate-400 hover:text-white transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onCancel();
                        }}
                        className={`px-5 py-2 rounded text-[11px] font-bold text-white transition-all shadow-lg active:scale-95 ${confirmColors}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};