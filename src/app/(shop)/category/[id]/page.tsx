import { notFound } from "next/navigation";
interface Props {
  params: {
    id: string;
  };
}

export default function Category({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h1>category page</h1>
    </div>
  );
}
