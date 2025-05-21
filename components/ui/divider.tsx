interface DividerProps {
    className?: string;
}

export function Divider({ className }: DividerProps) {
    return (
        <div className={`w-full h-[1px] bg-white/10 ${className}`} />
    )
}
