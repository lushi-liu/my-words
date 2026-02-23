import Button from '../ui/Button';
interface DirectionToggleProps {
  direction: 'ja-to-en' | 'en-to-ja';
  onChange: (newDir: 'ja-to-en' | 'en-to-ja') => void;
  onSwap: () => void;
}

export default function DirectionToggle({
  direction,
  onChange,
  onSwap,
}: DirectionToggleProps) {
  return (
    <div className="my-6 flex items-center justify-center gap-4 md:my-8">
      <div className="bg-black-300/10 flex rounded-xl p-1.5">
        <Button
          variant={direction === 'ja-to-en' ? 'primary' : 'outline'}
          size="sm"
          className="min-w-[110px] px-5"
          onClick={() => onChange('ja-to-en')}
        >
          JA → EN
        </Button>
        <Button
          variant={direction === 'en-to-ja' ? 'primary' : 'outline'}
          size="sm"
          className="min-w-[110px] px-5"
          onClick={() => onChange('en-to-ja')}
        >
          EN → JA
        </Button>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={onSwap}
        className="aspect-square rounded-full p-3"
        title="Swap direction"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </Button>
    </div>
  );
}
