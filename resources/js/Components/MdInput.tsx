import React, {useRef, useState} from "react";

interface FileInputProps {
    onFileSelect: (file: File) => void;
    error?: string;
    className?: string;
}

const MarkdownFileInput: React.FC<FileInputProps> = ({ onFileSelect, error, className }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): boolean => {
        if (!file.name.toLowerCase().endsWith('.md')) {
            alert('Please select a markdown (.md) file');
            return false;
        }

        // Optional: Check file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('File size must be less than 5MB');
            return false;
        }

        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
        } else {
            e.target.value = '';
            setSelectedFile(null);
        }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
            if (inputRef.current) {
                inputRef.current.files = e.dataTransfer.files;
            }
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={className}>
            <div
                className={`relative border-2 border-dashed rounded-lg p-6
                    ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                    ${error ? 'border-red-500' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".md"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="text-center">
                    {selectedFile ? (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Selected file:</p>
                            <div className="flex items-center justify-center space-x-2">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">
                                    {selectedFile.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                />
                            </svg>
                            <div className="text-sm text-gray-600">
                                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload a markdown file</span>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">Only .md files are supported</p>
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default MarkdownFileInput;
