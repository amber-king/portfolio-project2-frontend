// TODO: http://localhost:3000/rocks/new -> displays new form for user to add a new rock 
import RockNewForm from "../Components/RockNewForm";

function New() {
  return (
    <div className="New">
      <h2>Let's Add a Rock 💬</h2>
      <RockNewForm />
    </div>
  );
}

export default New;