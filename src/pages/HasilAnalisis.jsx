import React, { useEffect } from "react";
import { FaChartBar, FaCheck, FaDownload, FaFileDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { Document, Page, PDFDownloadLink } from "@react-pdf/renderer";

const HasilAnalisis = () => {
  const analisisData = useSelector((state) => state.analisis);

  useEffect(() => {
    console.log("Hasil Analisis Data:", analisisData);
  }, [analisisData]);
  return (
    <>
      {!analisisData.process && !analisisData.doneAll && (
        <div className="container mx-auto px-4 py-8">
          <div className="font-bold text-gray-800 text-center">
            <div className="flex flex-col space-y-2.5 items-center mt-3 text-gray-400 font-medium">
              <span className="text-8xl">
                <FaChartBar />
              </span>
              <p className="text-lg tracking-wide font-semibold">
                Belum Ada Hasil Analisis
              </p>
              <p className="mt-2 text-sm">
                Silakan lakukan scraping data terlebih dahulu
              </p>
              <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-600 mt-3 text-gray-50 transition duration-100 px-4 py-2 text-base rounded-md shadow-md"
              >
                Mulai Scraping Data
              </Link>
            </div>
          </div>
        </div>
      )}
      {analisisData.process && (
        <Card>
          <span className="text-xl font-semibold text-gray-800">
            Proses Analisis
          </span>
          <ul className="flex flex-col mt-3 space-y-3">
            {analisisData.processDone.map((process, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-primary">
                  <FaCheck />
                </span>
                <span className="text-gray-600">{process}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <svg className="size-5 animate-spin border-2 border-primary rounded-full border-t-transparent"></svg>
              <span className="text-gray-600">{analisisData.processNow}</span>
            </li>
          </ul>
        </Card>
      )}
      {analisisData.doneAll && (
        <div className="print:-mt-10">
          <div className="flex justify-end mb-2">
            <button onClick={() => {
              window.print();
            }} className="text-blue-500 font-semibold hover:underline flex items-center gap-2 print:hidden"><FaFileDownload /> Unduh hasil analisis (.PDF)</button>
          </div>
          <Card>
            <div className="flex justify-between mb-6">
              {analisisData.additionalData && analisisData.additionalData.keyword && (
                <div className="space-y-1">
                  <h5 className="font-medium">Kata Kunci:</h5>
                  <h5>{analisisData.additionalData.keyword}</h5>
                </div>
              )}
              {analisisData.additionalData && analisisData.additionalData.date && (
                <div className="space-y-1 w-1/3 print:w-1/2">
                  <h5 className="font-medium">Periode Analisis:</h5>
                  <h5>{analisisData.additionalData.date}</h5>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div className="space-y-1">
                <h5 className="font-medium">Jumlah Data:</h5>
                <h5>{analisisData.data.jumlah_data} Total Tweets</h5>
              </div>
              <div className="space-y-1 w-1/3 print:w-1/2">
                <h5 className="font-medium">Waktu Process:</h5>
                <h5>{analisisData.data.process_time}</h5>
              </div>
            </div>
          </Card>

          <div className="mt-10 print:mt-7 grid grid-cols-2 md:grid-cols-4 gap-x-7 gap-y-5 md:gap-20 print:grid-cols-4 print:gap-10">
            <CardPercent color="primary" label="Akurasi">
              {analisisData.data.accuracy}%
            </CardPercent>
            <CardPercent color="green" label="Sentimen Positif">
              {analisisData.data.positif}
            </CardPercent>
            <CardPercent color="gray" label="Sentimen Netral">
              {analisisData.data.netral}
            </CardPercent>
            <CardPercent color="red" label="Sentimen Negatif">
              {analisisData.data.negatif}
            </CardPercent>
          </div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 mt-10 print:grid-cols-2 print:mt-5">
            <Card>
              <h3 className="text-center font-medium text-xl mb-2">Distribusi Sentimen</h3>
              <img src={import.meta.env.VITE_API_URL + '/images/' + analisisData.data.pie_chart} alt="Pie Chart" />
            </Card>
            <Card>
              <h3 className="text-center font-medium text-xl mb-2">Metrix Evaluasi Model</h3>
              <img src={import.meta.env.VITE_API_URL + '/images/' + analisisData.data.evaluasi} alt="Metrix Evaluasi" />
            </Card>
            <Card>
              <h3 className="text-center font-medium text-xl mb-2">Confusion Matrix</h3>
              <img src={import.meta.env.VITE_API_URL + '/images/' + analisisData.data.confusion_matrix} alt="Confusion Matrix" />
            </Card>
            <Card>
              <h3 className="text-center font-medium text-xl mb-2">Word Cloud</h3>
              <img src={import.meta.env.VITE_API_URL + '/images/' + analisisData.data.word_cloud} alt="Word Cloud" />
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

const CardPercent = ({ children, label, color }) => {
  const colorStyle = {
    primary: "border-primary bg-blue-50 text-primary",
    green: "border-green-500 bg-green-50 text-green-500",
    red: "border-red-500 bg-red-50 text-red-500",
    gray: "border-gray-500 bg-gray-100 text-gray-500",
  }
  return (
    <div className={`border-2 px-2 py-5 print:py-3 rounded-xl flex flex-col items-center gap-2 justify-center min-h-44 print:min-h-20 ${colorStyle[color]}`}>
      <h5 className="text-4xl font-bold print:text-xl">{children}</h5>
      <p className="text-gray-600 text-lg print:text-sm w-11/12 text-center">{label}</p>
    </div>
  );
};
export default HasilAnalisis;
