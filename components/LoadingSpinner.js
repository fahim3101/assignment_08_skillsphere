export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-900 border-t-indigo-500 animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-purple-500 animate-spin animate-[spin_1.5s_linear_infinite_reverse]" />
      </div>
      <p className="text-indigo-400 text-sm animate-pulse">{text}</p>
    </div>
  );
}
