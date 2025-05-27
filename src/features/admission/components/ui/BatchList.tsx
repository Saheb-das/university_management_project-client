import { IBatch } from "../../types/admission";
import BatchItem from "../shared/BatchItem";

interface IBatchListProps {
  list: IBatch[];
}

const BatchList = ({ list }: IBatchListProps) => {
  return (
    <div className="col-span-8 ">
      <h3 className="capitalize font-medium mb-4">batch lists</h3>
      {list.length > 0 ? (
        list.map((item) => <BatchItem title={item.name} key={item.id} />)
      ) : (
        <p>no batch</p>
      )}
    </div>
  );
};

export default BatchList;
