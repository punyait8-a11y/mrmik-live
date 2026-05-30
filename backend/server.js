import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let documents = [
  { id: 1, name: "Dokumen A", status: "Lengkap" },
  { id: 2, name: "Dokumen B", status: "Progress" }
];

app.get("/", (req, res) => {
  res.send("MRMIK Backend Running");
});

app.get("/api/documents", (req, res) => {
  const stats = {
    total: documents.length,
    lengkap: documents.filter(d => d.status === "Lengkap").length,
    progress: documents.filter(d => d.status === "Progress").length
  };

  res.json({ documents, stats });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});