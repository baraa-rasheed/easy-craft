export interface ICardProps {
  title?: string;
  text?: string;
  children: React.ReactNode;
}
export default function Card({ children, title, text }: ICardProps) {
  return (
    <div className="bg-white h-full shadow-md px-5 py-10 border rounded-md">
      {text && (
        <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
      )}
      {title && (
        <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
