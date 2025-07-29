import './Spinner.css'; // Optional: for custom animations if not fully handled by Tailwind

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
    </div>
  );
}

export default Spinner;