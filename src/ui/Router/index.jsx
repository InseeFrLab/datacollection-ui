import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Menu } from "../shared/Menu";
import { SurveyList } from "../components/SurveyList";
import { UserAccount } from "../components/UserAccount";

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
