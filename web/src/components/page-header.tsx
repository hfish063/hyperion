export default function PageHeader({ text }: PageHeaderProps) {
  return <h1 className="text-3xl font-semibold">{text}</h1>;
}

type PageHeaderProps = {
  text: string;
};
