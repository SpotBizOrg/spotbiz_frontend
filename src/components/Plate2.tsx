interface Plate2Props {
  children: React.ReactNode;
}

function Plate2({ children }: Plate2Props) {
  return (
    <div className="flex flex-col text-center justify-start bg-white w-full h-auto rounded-lg border border-gray-200 p-4">
      {children}
    </div>
  );
}

export default Plate2;
