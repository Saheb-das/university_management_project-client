interface IBlockInfoProps {
  label: string;
  name: string;
}

const BlockInfo = ({ label, name }: IBlockInfoProps) => {
  return (
    <div className="flex-col gap-1 ">
      <p className="text-muted-foreground text font-medium capitalize">
        {label}
      </p>
      <p className="text-foreground text-base md:text-lg  font-medium">
        {name}
      </p>
    </div>
  );
};

export default BlockInfo;
