interface Props {
  label: string;
  value: string | number;
}

const RecieptRow = ({ label, value }: Props) => {
  return (
    <tr>
      <td className="font-semibold py-2 pr-4 text-muted-foreground">{label}</td>
      <td className="py-2 text-secondary-foreground">{value}</td>
    </tr>
  );
};

export default RecieptRow;
