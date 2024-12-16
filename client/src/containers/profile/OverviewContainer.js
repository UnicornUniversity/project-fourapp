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
          value={user.name || ""}
          disabled
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="email"
          className="profileInput"
          placeholder="Email"
          value={user.email || ""}
          name="email"
          disabled
        >
          <label className="inputLabel">Email</label>
        </Input>
      </form>
    </div>
  );
}

export default ProfileOverviewContainer;
