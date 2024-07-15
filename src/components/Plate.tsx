interface PlateProps {
  children: React.ReactNode ;

}

function Plate({children}: PlateProps) {
  return (
    <div className="flex flex-col items-center p-4 justify-start bg-white w-5/6 h-80  rounded drop-shadow-md">
      {children}
    </div>
  );
}

export default Plate;