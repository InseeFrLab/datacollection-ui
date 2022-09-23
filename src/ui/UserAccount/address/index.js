import { Button, Card } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserAccountContext } from "../context";
import { AddressDisplay } from "./display";
import { AddressForm } from "./form";

export const AddressBlock = () => {
    const {
        user: { address },
    } = useContext(UserAccountContext);

    const [addressEdit, setAddressEdit] = useState(false);

    const closeAddessEdit = () => {
        setAddressEdit(false);
    };

    return (
        <Card
            sx={{
                p: 2,
            }}
        >
            <AddressDisplay address={address} />
            <Button onClick={() => setAddressEdit(true)} variant="contained">
                Modifer
            </Button>
            <AddressForm open={addressEdit} close={closeAddessEdit} address={address} />
        </Card>
    );
};
