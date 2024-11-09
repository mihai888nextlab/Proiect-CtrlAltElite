export default function UserPfp({ name }: { name: string }) {
  return (
    <div className="h-11 w-11 rounded-full flex items-center justify-center bg-primary text-xl font-bold cursor-pointer text-white">
      {name[0].toUpperCase()}
    </div>
  );
}
