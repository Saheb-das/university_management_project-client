const BatchItem = ({ title }: { title: string }) => {
  return (
    <div className="col-span-3">
      <div className="flex items-center justify-center cursor-pointer rounded-lg p-4  h-4 bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 dark:hover:bg-blue-900">
        <p className="font-semibold text-sm">{title}</p>
      </div>
    </div>
  );
};

export default BatchItem;
