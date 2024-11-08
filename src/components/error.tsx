import { IoClose } from "react-icons/io5";

export default function Error({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed z-[100] bottom-10 right-10 bg-red-500 p-4 rounded-lg flex items-center justify-center">
      <p className="text-white font-bold">{message}</p>
      <button
        onClick={onClose}
        className="text-white flex items-center justify-center font-bold text-xl ml-1"
      >
        <IoClose />
      </button>
    </div>
  );
}
