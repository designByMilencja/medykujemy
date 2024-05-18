import Image from "next/image";

interface Props {
  title: string;
}

const Empty = ({ title }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image src="/assets/icons/alarm.svg" alt="" width={270} height={200} />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
    </div>
  );
};

export default Empty;
