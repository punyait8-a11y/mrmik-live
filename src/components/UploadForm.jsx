import { useState } from "react";

export default function UploadForm({ onUpload }) {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul || !kategori) return;

    const newDoc = {
      id: Date.now(),
      judul,
      kategori,
      status: "Baru",
      target: "Belum ditentukan"
    };

    onUpload(newDoc);
    setJudul("");
    setKategori("");
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="text"
        placeholder="Judul Dokumen"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
