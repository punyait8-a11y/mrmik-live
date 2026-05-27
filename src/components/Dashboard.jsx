import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Swal from "sweetalert2";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, lengkap: 0, progress: 0, percent: 0 });
  const [documents, setDocuments] = useState([]);

  // Ambil data dari backend
  useEffect(() => {
    fetch("http://localhost:5000/api/documents")
      .then(res => res.json())
      .then(data => {
        setDocuments(data.documents);
        setStats(data.stats);
      })
      .catch(err => console.error("API error:", err));
  }, []);

  // Upload dokumen baru
  const handleUpload = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const status = e.target.status.value;

    fetch("http://localhost:5000/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, status })
    })
      .then(res => res.json())
      .then(data => {
        setDocuments([...documents, data]);
        Swal.fire("Berhasil!", "Dokumen ditambahkan.", "success");
        e.target.reset();
      });
  };

  // Hapus dokumen
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin hapus dokumen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/documents/${id}`, { method: "DELETE" })
          .then(() => {
            setDocuments(documents.filter((doc) => doc.id !== id));
            Swal.fire("Terhapus!", "Dokumen berhasil dihapus.", "success");
          });
      }
    });
  };

  // Data grafik pie
  const pieData = {
    labels: ["Lengkap", "Progress"],
    datasets: [{
      data: [stats.lengkap, stats.progress],
      backgroundColor: ["#22c55e", "#facc15"]
    }]
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🏥 Akreditasi Dashboard</h1>
        <div className="profile">👤 Admin</div>
      </header>

      <main className="content">
        <h2 className="title">Monitoring Berkas Akreditasi</h2>

        {/* Statistik */}
        <div className="stats">
          <div className="card">📄 Total: {stats.total}</div>
          <div className="card">✅ Lengkap: {stats.lengkap}</div>
          <div className="card">⏳ Progress: {stats.progress}</div>
          <div className="card">🎯 Target: {stats.percent}%</div>
        </div>

        {/* Grafik */}
        <div className="chart-card">
          <h3>Grafik Progress Akreditasi</h3>
          <Pie data={pieData} />
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.percent}%` }}>
              {stats.percent}%
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="upload-form">
          <h3>📤 Upload Berkas Baru</h3>
          <form onSubmit={handleUpload}>
            <input type="text" name="name" placeholder="Nama Dokumen" required />
            <select name="status" required>
              <option value="Lengkap">Lengkap</option>
              <option value="Progress">Progress</option>
            </select>
            <button type="submit" className="upload-btn">Upload</button>
          </form>
        </div>

        {/* Tabel Dokumen */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Dokumen</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.status}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(doc.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
