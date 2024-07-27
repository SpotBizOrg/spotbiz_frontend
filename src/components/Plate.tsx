interface PlateProps {
  children: React.ReactNode ;

}

function Plate({children}: PlateProps) {
  return (
    <div className="flex flex-col items-center p-8 justify-start bg-white h-auto rounded shadow-md ">
      {children}
    </div>
  );
}

export default Plate;