import Image from "next/image";

interface EmptyProps {
  label: string;
}
export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className=" h-full p-20 flex flex-col justify-center items-center">
      <div className="relative h-72 w-72">
        <Image src="/empty.png" alt="empty" fill className="object-contain" />
      </div>

      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
