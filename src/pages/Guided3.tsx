import Container from "../components/Container";
import Businessnavbar from "../components/Businessnavbar";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";
import Businesssidebar from "../components/Businesssidebar";
import Adminsidebar from "../components/Adminsidebar";
import Adminnavbar from "../components/Adminnavbar";

function Guided2() {
  return (
    <Container>
        <Adminsidebar/>
        <div className="flex-1 flex flex-col">
            <Adminnavbar/>
            <div className="flex felx-row  items-center pt-28 px-20">
              <div className='w-1/6 bg-gray-100'>
                  this is another div
              </div>
              <div className="flex flex-col w-5/6 items-center justify-start">
                  <Plate/>
                  <div className="p-5"></div>
                  <Plate/>
                  <div className="p-5"></div>
                  <Plate/>
                  <div className="p-5"></div>
                  <Plate/>
                  <div className="p-5"></div>
                  <Plate/>
              </div>
            </div>
            
        </div>
    </Container>
  );
}

export default Guided2;