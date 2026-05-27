import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let documents = [
  { id: 1, name: "Dokumen A", status: "Lengkap" },
  { id: 2, name: "Dokumen B", status: "Progress" }
];

app.get("/api/documents", (req, res) => {
  const stats = {
    total: documents.length,
    lengkap: documents.filter(d => d.status === "Lengkap").length,
    progress: documents.filter(d => d.status === "Progress").length,
    percent: documents.length > 0 
      ? Math.round((documents.filter(d => d.status === "Lengkap").length / documents.length) * 100)
      : 0
  };
  res.json({ documents, stats });
});

app.post("/api/documents", (req, res) => {
  const { name, status } = req.body;
  const newDoc = { id: Date.now(), name, status };
  documents.push(newDoc);
  res.json(newDoc);
});

app.delete("/api/documents/:id", (req, res) => {
  const id = parseInt(req.params.id);
  documents = documents.filter(d => d.id !== id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
