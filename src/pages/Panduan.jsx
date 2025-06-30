import React from "react";
import Card from "../components/Card";
import { FaClipboard, FaKey, FaLink, FaPaperclip, FaQuestionCircle, FaSearch } from "react-icons/fa";

const Panduan = () => {
    return (
        <>
            <Card>
                <div className="flex items-center space-x-3 mb-6">
                    <span className="text-black text-3xl">
                        <FaQuestionCircle />
                    </span>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Parameter Scraping
                    </h2>
                </div>
                <ul className="space-y-4">
                    <li className="flex flex-col">
                        <span className="text-blue-500 font-semibold">
                            1. Persiapan
                        </span>
                        <span>
                            Pastikan Anda telah memiliki Auth Token akun X Anda yang
                            valid
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-green-500 font-semibold">
                            2. Input Data
                        </span>
                        <span>
                            Masukkan keywords, jumlah data, rentang tanggal dan auth
                            token
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-purple-500 font-semibold">
                            3. Analisis
                        </span>
                        <span>Klik “Mulai Analisis” dan tunggu proses selesai</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-red-500 font-semibold">4. Hasil</span>
                        <span>
                            Lihat hasil di tab “Hasil Analisis” dan download sesuai
                            kebutuhan
                        </span>
                    </li>
                </ul>
            </Card>
            <Card className="mt-6">
                <AuthTokenTutorial />
            </Card>
            <Card className="mt-6">
                <TipsBestPractices />
            </Card>
        </>
    );
};

function AuthTokenTutorial() {
  const steps = [
    {
      number: 1,
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-500",
      title: "Langkah 1:",
      content: "Login ke akun Twitter kamu melalui browser (https://twitter.com/)."
    },
    {
      number: 2,
      color: "bg-green-100 border-green-200",
      textColor: "text-green-500",
      title: "Langkah 2:",
      content: "Klik kanan di mana saja pada halaman Twitter (X.com) dan pilih \"Inspect\" (Inspeksi). Atau, gunakan pintasan keyboard Ctrl+Shift+I (Windows/Linux) atau Cmd+Option+I (Mac)."
    },
    {
      number: 3,
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-500",
      title: "Langkah 3:",
      content: "Di jendela alat pengembang yang muncul, cari dan klik tab \"Application\" (Aplikasi)"
    },
    {
      number: 4,
      color: "bg-orange-100 border-orange-200",
      textColor: "text-orange-500",
      title: "Langkah 4:",
      content: "Di panel sebelah kiri di bawah bagian \"Storage\" (Penyimpanan), luaskan opsi \"Cookies\". Pilih domain yang terkait dengan Twitter, yaitu https://x.com atau https://twitter.com."
    },
    {
      number: 5,
      color: "bg-red-100 border-red-200",
      textColor: "text-red-500",
      title: "Langkah 5:",
      content: "Sebuah berisi daftar cookie akan muncul di panel kanan. Cari cookie dengan nama auth_token. Nilai yang tertera di kolom \"Value\" untuk auth_token adalah token autentikasi Anda. Anda dapat menyalin nilai ini."
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-black text-3xl"><FaKey /></span>
        <h1 className="text-xl font-semibold text-gray-800">
          Cara Mendapatkan Auth Token X
        </h1>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`p-4 rounded-lg border-2 ${step.color} transition-all duration-200 hover:shadow-md`}
          >
            <h3 className={`font-semibold mb-2 ${step.textColor}`}>
              {step.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {step.content}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Catatan:</strong> Auth token adalah informasi sensitif. Jangan bagikan dengan orang lain dan gunakan dengan hati-hati.
        </p>
      </div>
    </>
  );
}

function TipsBestPractices() {
  const tipsData = [
    {
      title: "Kata Kunci",
      color: "text-purple-500",
      items: [
        "Gunakan kata kunci yang spesifik",
        "Hindari kata yang terlalu umum"
      ]
    },
    {
      title: "Jumlah Data",
      color: "text-purple-500",
      items: [
        "Maksimum 1000 data per analisis",
        "Sesuaikan dengan kebutuhan analisis"
      ]
    }
  ];

  return (
        <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-black text-3xl"><FaPaperclip /></span>
              <h1 className="text-xl font-bold text-gray-800">
                Tips & Best Practices
              </h1>
            </div>
            {/* Content */}
            <div className="space-y-8">
              {tipsData.map((section, index) => (
                <div key={index}>
                  <h2 className={`font-semibold mb-4 ${section.color}`}>
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-800">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
  );
}

export default Panduan;
