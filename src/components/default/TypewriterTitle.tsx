import { useTypewriter } from '../../hooks/useTypewriter';

interface Props {
  text: string;
}

export const TypewriterTitle = ({ text }: Props) => {
  const { displayedText, isFinished } = useTypewriter(text, 100);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-primary-dark dark:text-primary-light relative bottom-1 md:bottom-2">
      {displayedText}
      <span
        className={`ml-1 ${isFinished ? 'opacity-0' : 'animate-blink'}`}
      >
        |
      </span>
    </h1>
  );
};