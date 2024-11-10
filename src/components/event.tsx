import { EventType } from "@/type";
import { useRouter } from "next/router";

export default function EventComponent({
  event,
  attending,
  onBtnClick,
}: {
  event: EventType;
  attending: boolean;
  onBtnClick: (eventId: string) => void;
}) {
  const router = useRouter();

  return (
    <div className="border-2 rounded-xl p-3 cursor-pointer">
      <div onClick={() => router.push(`/event/${event._id}`)}>
        <p className="text-red-800 font-bold">
          {new Date(event.date).toLocaleString()}
        </p>
        <h2 className="font-semibold text-gray-800">{event.name}</h2>
        <p className="text-sm text-gray-600">{event.location}</p>
      </div>

      {attending ? (
        <button
          className="border-2 border-primary bg-primary text-white rounded-lg p-3 font-bold mt-2 w-full"
          onClick={() => onBtnClick(event._id)}
        >
          Attending
        </button>
      ) : (
        <button
          className="border-2 border-primary text-primary rounded-lg p-3 font-bold mt-2 w-full"
          onClick={() => onBtnClick(event._id)}
        >
          Attend
        </button>
      )}
    </div>
  );
}
