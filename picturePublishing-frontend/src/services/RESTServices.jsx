import axios from "axios";
const FormData = require("form-data");

const headers = {
  "Cache-Control": "no-cache",
  "Accept-Language": "en",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const getFiles = (setFiles, userName, email) => {
  const apiurlFindFilesPending =
    "http://localhost:8080/files/findFilesByStatus/PENDING";
  const apiurlFindFilesAccepted =
    "http://localhost:8080/files/findFilesByStatus/ACCEPTED";

  const apiurl =
    userName !== null && userName !== undefined && userName === "admin"
      ? apiurlFindFilesPending
      : apiurlFindFilesAccepted;
  axios({
    method: "get",
    url: apiurl,
    withCredentials: false,
    headers: headers,
  })
    .then(function (response) {
      setFiles(response.data.data);
    })
    .catch(function (response) {
      console.log(response);
    });
};

const createUser = (values) => {
  const { navigate } = values;
  const apiurl = "http://localhost:8080/users/create";
  axios({
    method: "post",
    url: apiurl,
    withCredentials: false,
    headers: headers,
    data: values,
  })
    .then(function (response) {
      if (response.data.status === 0) {
        navigate(`/imageUpload/${values.email}`);
      }
    })
    .catch(function (response) {
      console.log(response);
    });
};

const loginByEmail = (values) => {
  const { navigate } = values;
  const apiurl = `http://localhost:8080/users/findByEmail`;
  axios({
    method: "post",
    url: apiurl,
    withCredentials: false,
    headers: headers,
    data: values,
  })
    .then(function (response) {
      if (response.data.status === 0) {
        navigate(`/imageUpload/${values.email}`);
      }
    })
    .catch(function (response) {
      alert(response.response.data.message);
    });
};

const loginByUserName = (values) => {
  const { navigate } = values;
  const apiurl = `http://localhost:8080/users/findByUserName`;
  axios({
    method: "post",
    url: apiurl,
    withCredentials: false,
    headers: headers,
    data: values,
  })
    .then(function (response) {
      if (response.data.status === 0) {
        navigate(`/filesPendingTableList/${values.userName}`);
      }
    })
    .catch(function (response) {
      alert(response.response.data.message);
    });
};

const uploadFile = (values) => {
  const {
    category,
    description,
    currentFile,
    setShowAlert,
    setShowAlertMessage,
    setPreviewImage,
  } = values;

  const apiurl = "http://localhost:8080/files/uploadFile";
  const data = new FormData();
  data.append("file", currentFile);
  data.append("category", category);
  data.append("description", description);

  axios({
    method: "post",
    url: apiurl,
    withCredentials: false,
    headers: {
      "Cache-Control": "no-cache",
      "Accept-Language": "en",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    data,
  })
    .then(function (response) {
      if (response.data.status === 0) {
        setShowAlertMessage(response.data.message);
        setShowAlert(true);
        setPreviewImage(undefined);
      }
    })
    .catch(function (response) {
      setShowAlertMessage(response.response.data.message);
      setShowAlert(true);
    });
};
const acceptFile = (values) => {
  const {
    fileDetail,
    userName,
    setShowDetail,
    setFiles,
    setShowAlert,
    setShowAlertMessage,
  } = values;
  const apiurl = `http://localhost:8080/files/acceptFile`;
  axios({
    method: "post",
    url: apiurl,
    withCredentials: false,
    headers: headers,
    data: fileDetail,
  })
    .then(function (response) {
      if (response.data.status === 0) {
        RESTServices.getFiles(setFiles, userName, null);
        setShowDetail(false);
        setShowAlertMessage(response.data.message);
        setShowAlert(true);
      }
    })
    .catch(function (response) {
      setShowAlertMessage(response.response.data.message);
      setShowAlert(true);
    });
};

const rejectFile = (values) => {
  const {
    fileDetail,
    userName,
    setShowDetail,
    setFiles,
    setShowAlert,
    setShowAlertMessage,
  } = values;
  const apiurl = `http://localhost:8080/files/rejectFile`;
  axios({
    method: "post",
    url: apiurl,
    withCredentials: false,
    headers: headers,
    data: fileDetail,
  })
    .then(function (response) {
      if (response.data.status === 0) {
        RESTServices.getFiles(setFiles, userName, null);
        setShowDetail(false);
        setShowAlertMessage(response.data.message);
        setShowAlert(true);
      }
    })
    .catch(function (response) {
      setShowAlertMessage(response.response.data.message);
      setShowAlert(true);
    });
};

const RESTServices = {
  getFiles,
  createUser,
  loginByEmail,
  loginByUserName,
  acceptFile,
  rejectFile,
  uploadFile,
};

export default RESTServices;
