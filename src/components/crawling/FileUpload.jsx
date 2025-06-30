import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function FileUpload ({ tableName, setTableName, uploadedFile, setUploadedFile }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileSelect = (file) => {
        const allowedTypes = ["text/csv"];

        const allowedExtensions = [".csv"];
        const fileExtension = file.name
            .toLowerCase()
            .substring(file.name.lastIndexOf("."));

        if (
            allowedTypes.includes(file.type) ||
            allowedExtensions.includes(fileExtension)
        ) {
            setUploadedFile(file);
        } else {
            alert("Format file tidak didukung. Silakan upload file CSV");
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div
            className="w-full mx-auto"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div>
                <label
                    htmlFor="tableName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Nama Tabel Data Tweet{" "}
                    <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="tableName"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="Masukkan nama tabel untuk data tweet disini"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                <p className="text-xs text-black mt-1 mb-5">
                    Contoh: tweet_data, full_text, atau teks_tweet
                </p>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Upload file parameter
                    <span className="text-red-500">*</span>
                </label>
            </div>

            <div
                onClick={handleClick}
                className={`
          relative border-2 text-gray-500 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${
              isDragOver
                  ? "border-blue-400 bg-blue-50"
                  : uploadedFile
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
          }
        `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileInputChange}
                />

                {!uploadedFile ? (
                    <>
                        <div className="flex justify-center mb-4 text-4xl">
                            <FiUpload />
                        </div>
                        <p className="text-lg text-gray-500 mb-2">
                            Klik untuk upload file atau drag & drop
                        </p>
                        <p className="text-sm text-gray-500">
                            Format yang didukung: CSV
                        </p>
                    </>
                ) : (
                    <div className="space-y-3">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p className="text-lg text-green-700 font-medium">
                            File berhasil diupload!
                        </p>
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                            <p className="text-sm font-medium text-gray-700">
                                Nama file:{" "}
                                <span className="text-green-600">
                                    {uploadedFile.name}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Ukuran: {(uploadedFile.size / 1024).toFixed(1)}{" "}
                                KB
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFile();
                            }}
                            className="mt-3 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                        >
                            Hapus file
                        </button>
                    </div>
                )}
            </div>
            {isDragOver && (
                <div className=" inset-0 bg-blue-100 bg-opacity-50 rounded-lg flex items-center justify-center z-10">
                    <p className="text-blue-600 font-medium text-lg">
                        Lepaskan file untuk upload
                    </p>
                </div>
            )}
        </div>
    );
};