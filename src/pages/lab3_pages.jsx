import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/components/laba3/Header.jsx";
import Footer from "../components/components/laba3/Footer.jsx";
import SideDrawer from "C:/Projects/ssvr/labs/src/laba7/SideDrawer.jsx";
import Content from "../components/components/laba3/Content.jsx";

export default function LabsPage() {
  const [selectedLab, setSelectedLab] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onDrawerToggle={() => setDrawerOpen(true)} />
      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelect={setSelectedLab}
      />
      <Container sx={{ flex: 1, mt: 3 }}>
        <Box>
          {selectedLab ? (
            <Content lab={selectedLab} />
          ) : (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              Выберите лабораторную работу из меню
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}