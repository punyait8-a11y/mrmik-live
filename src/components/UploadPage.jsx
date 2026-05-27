import { useState } from "react";
import UploadForm from "./UploadForm";
import DocumentTable from "./DocumentTable";

export default function UploadPage() {
  const [docs, setDocs] = useState([]);

  const handleUpload = (newDoc) => {
    setDocs([...docs, newDoc]);
  };

  return (
    <div>
      <h1>Upload Eviden</h1>
      <UploadForm onUpload={handleUpload} />
      <DocumentTable data={docs} />
    </div>
  );
}
