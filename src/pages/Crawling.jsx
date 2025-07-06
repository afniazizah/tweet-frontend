import React, { useState, useRef, useEffect } from "react";
import {
  FaEdit,
  FaFileCsv,
  FaPlay,
  FaQuestion,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "../components/crawling/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { addAdditionalData, startProcess } from "../features/analisisSlice";

const Crawling = ({ socket }) => {
  const analisisData = useSelector((state) => state.analisis);
  const [inputMethod, setInputMethod] = useState("manual");
  const [keyword, setKeyword] = useState("");
  const [dataCount, setDataCount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [processCrawling, setProcessCrawling] = useState({
    status: false,
    percent: 0,
  });
  const [errorCrawling, setErrorCrawling] = useState(null);
  const [isDoneCrawling, setIsDoneCrawling] = useState(false);
  const [fileResult, setFileResult] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [tableName, setTableName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorForm, setErrorForm] = useState({
    dataCount: "",
    authToken: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("update percent", (data) => {
      setProcessCrawling((prev) => ({
        ...prev,
        percent: data,
      }));
    });

    socket.on("complete crawl", (file) => {
      setProcessCrawling({
        status: false,
        percent: 0,
      });
      console.log(file)
      setIsDoneCrawling(true);
      setFileResult(file);
    });

    socket.on("error crawl", (error) => {
      setErrorCrawling(error);
      setProcessCrawling({
        status: false,
        percent: 0,
      });
    });

    return () => {
      socket.off("connect");
      socket.off("update percent");
      socket.off("complete crawl");
      socket.off("error crawl");
    };
  }, [socket]);
  const validateDate = (date, fieldName) => {
    if (!date) return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return "Tanggal tidak boleh lebih dari hari ini";
    }

    if (fieldName === "startDate") {
      if (endDate && date > endDate) {
        return "Tanggal Mulai tidak boleh lebih dari Tanggal Selesai";
      }
      if (endDate && date < endDate) {
        setErrorForm((prev) => ({
          ...prev,
          endDate: "",
        }));
      }
    }

    if (fieldName === "endDate") {
      if (startDate && date < startDate) {
        return "Tanggal Selesai tidak boleh sebelum Tanggal Mulai";
      }
      if (startDate && date > startDate) {
        setErrorForm((prev) => ({
          ...prev,
          startDate: "",
        }));
      }
    }

    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if socket is connected
    if (!socket.connected) {
      alert("Server tidak terhubung. Silakan hidupkan server terlebih dahulu.");
      return;
    }
    if (inputMethod == "manual") {
      if (
        errorForm.dataCount == "" &&
        errorForm.startDate == "" &&
        errorForm.endDate == ""
      ) {
        socket.emit("crawl", {
          auth_token: authToken,
          keyword: keyword,
          limit: parseInt(dataCount),
          since_date: startDate || null,
          until_date: endDate || null,
        });
        setProcessCrawling({
          status: true,
          percent: 0,
        });
      }
    } else {
      const formData = new FormData();
      formData.append("file", fileUpload);
      formData.append("table_name", tableName);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: "POST",
          body: formData,
        });
        if (response.status === 422) {
          const errorData = await response.json();
          alert(errorData.error);
        } else {
          const data = await response.json();
          dispatch(startProcess(data.filename));
          navigate("hasil-analisis");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-black text-3xl">
            <FaGear />
          </span>
          <h2 className="text-xl font-semibold text-gray-800">
            Parameter Scraping
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Pilih metode Input:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setInputMethod("manual")}
                className={`p-4 border border-[1.5] rounded-lg text-left transition-colors ${
                  inputMethod === "manual"
                    ? "border-primary text-primary bg-primary-hover"
                    : "hover:border-primary hover:text-primary hover:bg-primary-hover border-gray-400"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className=" text-2xl">
                    <FaEdit />
                  </span>
                  <div>
                    <div className="font-medium">Input Manual</div>
                    <div className="text-sm">Isi parameter secara manual</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInputMethod("file")}
                className={`p-4 border border-[1.5] rounded-lg text-left transition-colors ${
                  inputMethod === "file"
                    ? "border-primary text-primary bg-primary-hover"
                    : "hover:border-primary hover:text-primary hover:bg-primary-hover border-gray-400"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    <FaFileCsv />
                  </span>
                  <div>
                    <div className="font-medium">Upload File</div>
                    <div className="text-sm">Upload file scraping</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {inputMethod === "manual" ? (
            <>
              {/* Keyword Input */}
              <div>
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kata Kunci <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Masukan Kata Kunci Disini"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs mt-1">Contoh: harga bbm naik</p>
              </div>

              {/* Data Count */}
              <div>
                <label
                  htmlFor="dataCount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jumlah Data <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="dataCount"
                  value={dataCount}
                  onChange={(e) => {
                    // Validate input for data count
                    if (e.target.value < 100 || e.target.value > 1000) {
                      setErrorForm((prev) => ({
                        ...prev,
                        dataCount: "Minimal 100, Maksimal 1000",
                      }));
                    } else {
                      setErrorForm((prev) => ({
                        ...prev,
                        dataCount: "",
                      }));
                    }
                    setDataCount(e.target.value);
                  }}
                  placeholder="Minimal 100, Maksimal 1000"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errorForm.dataCount
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
                <p className="text-sm text-red-600 mt-2">
                  {errorForm.dataCount}
                </p>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tanggal Mulai (Opsional)
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setErrorForm((prev) => ({
                        ...prev,
                        startDate: validateDate(e.target.value, "startDate"),
                      }));
                    }}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errorForm.startDate
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <p className="text-sm text-red-600 mt-2">
                    {errorForm.startDate}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tanggal Selesai (Opsional)
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setErrorForm((prev) => ({
                        ...prev,
                        endDate: validateDate(e.target.value, "endDate"),
                      }));
                    }}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errorForm.endDate
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <p className="text-sm text-red-600 mt-2">
                    {errorForm.endDate}
                  </p>
                </div>
              </div>

              {/* Auth Token */}
              <div>
                <label
                  htmlFor="authToken"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Auth Token X <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="authToken"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  placeholder="Masukkan Token Anda Disini"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-blue-600 mt-1">
                  <Link
                    to="/panduan"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    <FaQuestionCircle />
                    Bagaimana cara mendapatkan token?
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <FileUpload
              tableName={tableName}
              setTableName={setTableName}
              uploadedFile={fileUpload}
              setUploadedFile={setFileUpload}
            />
          )}

          <button
            type="submit"
            disabled={analisisData.process}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-[background-image] duration-200 font-medium text-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              <FaPlay />
            </span>
            <span>
              {analisisData.process
                ? "Proses Sedang Berjalan..."
                : "Mulai Analisis"}
            </span>
          </button>
        </form>
        {/* Progress Bar */}
        {processCrawling.status && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            {processCrawling.percent === 0 ? (
              <div className="text-center">
                <span className="text-sm font-medium text-blue-700">
                  Memulai crawling...
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">
                    Proses Crawling...
                  </span>
                  <span className="text-sm font-medium text-blue-700">
                    {processCrawling.percent}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${processCrawling.percent}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Error Message */}
        {errorCrawling && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 text-lg">
                <FaQuestion />
              </span>
              <span className="text-red-600 font-medium">
                Terjadi kesalahan: {errorCrawling}
              </span>
            </div>
          </div>
        )}
        {/* Result Message */}
        {isDoneCrawling && (
          <>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-lg">
                  <FaFileCsv />
                </span>
                <span className="text-green-600 font-medium">
                  Crawling selesai
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <a
                href={import.meta.env.VITE_API_URL + "/get-file/" + fileResult}
                download
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-center flex items-center justify-center space-x-2"
              >
                <FaFileCsv />
                <span>Download File</span>
              </a>
              <button
                onClick={() => {
                  dispatch(startProcess(fileResult));
                  dispatch(
                    addAdditionalData({
                      keyword: keyword,
                      date: startDate
                        ? startDate.replaceAll("-", "/") +
                          " - " +
                          endDate.replaceAll("-", "/")
                        : null,
                    })
                  );
                  navigate("hasil-analisis");
                }}
                className="flex-1 cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center flex items-center justify-center space-x-2"
              >
                <FaPlay />
                <span>Lanjut Analisis</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Crawling;
