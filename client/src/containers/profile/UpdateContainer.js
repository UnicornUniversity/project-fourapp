import Input from "../../components/input/Input";

function ProfileUpdateContainer() {
  return (
    <div className="profileUpdateForm">
      <form>
        <Input
          type="text"
          className="profileInput"
          placeholder="Name"
          name="name"
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="text"
          className="profileInput"
          placeholder="Surname"
          name="surname"
        >
          <label className="inputLabel">Surname</label>
        </Input>

        <Input
          type="email"
          className="profileInput"
          placeholder="Email"
          name="email"
        >
          <label className="inputLabel">Email</label>
        </Input>

        <Input
          type="tel"
          className="profileInput"
          placeholder="Telephone"
          name="telephone"
        >
          <label className="inputLabel">Telephone</label>
        </Input>
        <Input
          type="submit"
          className="profileInput"
          name="submit"
          value="submit"
        ></Input>
      </form>
    </div>
  );
}

export default ProfileUpdateContainer;
