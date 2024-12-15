import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import Input from "../../components/input/Input";

function ProfileOverviewContainer() {
  const {user} = useContext(UserContext)
  return (
    <div className="profileOverviewForm">
      <form>
        <Input
          type="text"
          className="profileInput"
          placeholder="Name"
          name="name"
          disabled
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="text"
          className="profileInput"
          placeholder="Surname"
          name="surname"
          disabled
        >
          <label className="inputLabel">Surname</label>
        </Input>

        <Input
          type="email"
          className="profileInput"
          placeholder="Email"
          name="email"
          disabled
        >
          <label className="inputLabel">Email</label>
        </Input>

        <Input
          type="tel"
          className="profileInput"
          placeholder="Telephone"
          name="telephone"
          disabled
        >
          <label className="inputLabel">Telephone</label>
        </Input>
      </form>
    </div>
  );
}

export default ProfileOverviewContainer;
