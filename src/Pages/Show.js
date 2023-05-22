// TODO: http://localhost:3000/rocks/${id} -> connects to rock details js,the rock data the user receives after selecting a rock
import RockDetail from "../Components/RockDetail";

function Show() {
  return (
    <div className="Show">
      <h2>Your Rock is ⤵️</h2>
      <RockDetail />
    </div>
  );
}

export default Show;