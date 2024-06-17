import Image from "next/image";

interface Props {
  icon: string;
  label: string;
  value: string;
}
const InfoItem = ({ icon, label, value }: Props) => (
  <div className="flex items-center gap-2">
    <div className="flex size-[30px] items-center justify-center rounded-full bg-primary-500 p-1">
      <Image src={icon} width={20} height={20} alt={label} />
    </div>
    <p className="text-dark100_light900">{label}:</p>
    <p className="text-dark100_light900 font-bold">{value}</p>
  </div>
);

export default InfoItem;
