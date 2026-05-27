import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DUMMY DATA (NO DATABASE)
========================= */

let documents = [
  { id: 1, name: "Dokumen A", status: "Lengkap" },
  { id: 2, name: "Dokumen B", status: "Progress" },
  { id: 3, name: "Dokumen C", status: "Lengkap" }
];

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀"
  });
});

/* =========================
   GET DOCUMENTS + STATS
========================= */

app.get("/api/documents", (req, res) => {
  const stats = {
    total: documents.length,
    lengkap: documents.filter(d => d.status === "Lengkap").length,
    progress: documents.filter(d => d.status === "Progress").length,
    percent:
      documents.length > 0
        ? Math.round(
            (documents.filter(d => d.status === "Lengkap").length /
              documents.length) *
              100
          )
        : 0
  };

  res.json({
    documents,
    stats
  });
});

/* =========================
   ADD DOCUMENT
========================= */

app.post("/api/documents", (req, res) => {
  const { name, status } = req.body;

  const newDoc = {
    id: documents.length + 1,
    name,
    status
  };

  documents.push(newDoc);

  res.json(newDoc);
});

/* =========================
   DELETE DOCUMENT
========================= */

app.delete("/api/documents/:id", (req, res) => {
  const id = parseInt(req.params.id);

  documents = documents.filter(d => d.id !== id);

  res.json({
    success: true,
    message: "Document deleted"
  });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});