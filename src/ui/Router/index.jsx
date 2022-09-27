import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Menu } from "../Menu";
import { SurveyList } from "../SurveyList";
import { UserAccount } from "../UserAccount";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portail/mes-enquetes" />} />
        <Route
          path="/portail"
          element={
            <>
              <div className="main-content">
                <Header />
                <Menu />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <div className="main-body">
                    <Outlet />
                  </div>
                  <Footer />
                </Box>
              </div>
            </>
          }
        >
          <Route path="mes-enquetes" element={<SurveyList />} />
          <Route path="mon-compte" element={<UserAccount />} />
          <Route path="*" element={<Navigate to="/portail/mes-enquetes" />} />
        </Route>
        <Route path="*" element={<Navigate to="/portail/mes-enquetes" />} />
      </Routes>
    </BrowserRouter>
  );
};
