import Nousernavbar from "../components/Nousernavbar";
import Container from "../components/Container";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";



function Guided() {
  return (

    <Container>
        <Nousernavbar/>
        <div className="flex flex-col items-center pt-32 px-20 h-screen">
            <Plate/>
            <div className="p-5"></div>
            <Plate2/>
        </div>
    </Container>
    
  );
}

export default Guided;