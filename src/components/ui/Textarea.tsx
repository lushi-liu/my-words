interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-18 text-black-300 mb-2 block font-medium">
          {label}
        </label>
      )}
      <textarea
        className={`bg-white-800 border-black-400/30 text-18 text-black-200 placeholder:text-white-500 focus:ring-blue-light min-h-[140px] w-full resize-y rounded-xl border px-5 py-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none md:min-h-[180px] ${className} `}
        {...props}
      />
    </div>
  );
}
