export default function DataSummary({ data }) {
  const totalEntries = data.length;
  return (
    <div className="border-b pb-5 justify-end w-full">
      <p className="max-w-fit text-2xl justify-end">القوانين: {totalEntries}</p>
    </div>
  );
}