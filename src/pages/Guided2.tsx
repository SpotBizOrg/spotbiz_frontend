import Container from "../components/Container";
import Businessnavbar from "../components/Businessnavbar";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";
import Businesssidebar from "../components/Businesssidebar";

function Guided2() {
  return (
    <Container>
        <Businesssidebar/>
        <div className="flex-1 flex flex-col">
            <Businessnavbar/>
            <div className="flex felx-row items-center">
              <div className='w-1/6 bg-gray-100'>
                  this is another div
              </div>
              <div className="flex flex-col w-5/6 h-screen items-center justify-center">
                  <Plate/>
                  <div className="p-5"></div>
                  <Plate2/>
              </div>
            </div>
            
        </div>
    </Container>
  );
}

export default Guided2;