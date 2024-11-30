import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import Input from "../../components/input/Input";

function Overview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, handlerMap: { updateUserProfile } } = useContext(UserContext);

    return (
        <div className="profileOverview">
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
            </form>
        </div>
    );
}

export default Overview;