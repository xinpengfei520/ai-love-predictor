interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 w-full border border-white/12 bg-white/10 p-0.5">
      <div
        className="h-full bg-[linear-gradient(90deg,var(--aqua),var(--coral))] transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 
