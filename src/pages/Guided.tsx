import Nousernavbar from "../components/Nousernavbar";
import Container from "../components/Container";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";
import Customernavbar from "../components/Customernavbar";



function Guided() {
  return (

    <Container>
        <Customernavbar/>
        <div className="flex flex-col justify-start items-center pt-28 px-20 ">

          {/**plate can be used to place contents */}
            <Plate/>
            <div className="p-5"></div>
            <Plate/>
            <div className="p-5"></div>
            <Plate/>
            <div className="p-5"></div>
            <Plate/>
        </div>
    </Container>
    
  );
}

export default Guided;