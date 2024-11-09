import { EventType } from "@/type";

export default function EventComponent({ event }: { event: EventType }) {
  return (
    <div className="border-2 rounded-xl p-3">
      <p className="text-red-800 font-bold">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <h2 className="font-semibold text-gray-800">{event.name}</h2>
      <p className="text-sm text-gray-600">{event.location}</p>

      <button className="border-2 border-primary text-primary rounded-lg p-3 font-bold mt-2 w-full">
        Attend
      </button>
    </div>
  );
}
