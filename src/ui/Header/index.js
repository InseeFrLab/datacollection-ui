import { AccountCircle, ContactSupport, Logout } from "@mui/icons-material";
import { Button, Divider, ListItem, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { AuthContext } from "ui/auth/provider";
import { UserAccountContext } from "ui/UserAccount/context";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
    const { logout } = useContext(AuthContext);
    const { user } = useContext(UserAccountContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="header">
            <img src={`${process.env.PUBLIC_URL}/logo-proto.png`} alt="alt" />

            <h1>Portail de réponse aux enquêtes de la statistique publique</h1>
            <div className="kfc" style={{ borderLeft: "1px solid #3467ae" }}>
                <Tooltip title="Aide et paramètres">
                    <Button
                        startIcon={<AccountCircle />}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        {user.id}
                    </Button>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <ListItem>{`${user.account.lastName} ${user.account.firstName}`}</ListItem>
                    <Divider />
                    <Link to="/portail">
                        <MenuItem>
                            <ListItemIcon>
                                <ContactSupport fontSize="small" />
                            </ListItemIcon>
                            Aide et contact
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Se déconnecter
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};
