import Container from "../components/Container";
import Businessnavbar from "../components/Businessnavbar";
import Plate from "../components/Plate";
import Plate2 from "../components/Plate2";
import Businesssidebar from "../components/Businesssidebar";

function Guided2() {
  return (
    <Container>
            <Businessnavbar/>
            <Businesssidebar selectedTile="Dashboard"/>
            <div className="flex flex-col mt-20 px-16 sm:ml-64">
                <p>hello world</p>
                <Plate2>
                    hello world
                </Plate2>
                <Plate2>
                    hello world
                </Plate2>
                <Plate2>
                    hello world
                </Plate2>
              </div>
            
    </Container>
  );
}

export default Guided2;