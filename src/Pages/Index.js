// TODO: http://localhost:3000/rocks -> shows the log of rocks w/ the search by element filter
import Rocks from "../Components/Rocks";

function Index() {
  return (
    <div className="Index">
      <h2>Choose Your Rock 🤔</h2>
      <Rocks />
    </div>
  );
}

export default Index;
