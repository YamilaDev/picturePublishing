import ImageUpload from "./components/ImageUpload";
import LoginPage from "./components/LoginPage";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import FilesTable from "./components/FilesTable";
import LoginPageAdmin from "./components/LoginPageAdmin";
import RegistrationPage from "./components/RegistrationPage";
import FilesPendingTableList from "./components/FilesPendingTableList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route exact path="/" element={<LoginPage />} />
            <Route
              exact
              path="/registrationPage"
              element={<RegistrationPage />}
            />
            <Route exact path="/loginPageAdmin" element={<LoginPageAdmin />} />
            <Route exact path="/imageUpload" element={<ImageUpload />} />
            <Route exact path="/filesTable" element={<FilesTable />} />
            <Route
              exact
              path="/filesPendingTableList/:userName"
              element={<FilesPendingTableList />}
            />
            <Route exact path="/imageUpload/:email" element={<ImageUpload />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
