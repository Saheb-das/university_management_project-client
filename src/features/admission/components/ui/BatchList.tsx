import BatchItem from "../shared/BatchItem";
import { TBatch } from "./BatchFilter";

interface IBatchListProps {
  list: TBatch[];
}

const BatchList = ({ list }: IBatchListProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 ">
      {list ? (
        list.map((item) => <BatchItem title={item.title} key={item.id} />)
      ) : (
        <p>no batch</p>
      )}
    </div>
  );
};

export default BatchList;
