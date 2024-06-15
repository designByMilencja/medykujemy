import Link from "next/link";

interface Props {
  _id: string;
  name: string;
}

const Tag = ({ _id, name }: Props) => {
  return (
    <Link href={`/articles/tag/${name}`} className="flex justify-between gap-2">
      <p className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </p>
    </Link>
  );
};

export default Tag;
