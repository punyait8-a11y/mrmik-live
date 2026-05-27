/* =========================
   src/pages/Dashboard.jsx
========================= */

import { useState, useEffect } from "react";

import {
  FaFolderOpen,
  FaFileAlt,
  FaTrash,
  FaEdit,
  FaPlus,
  FaSignOutAlt,
  FaChartBar,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from "react-icons/fa";

import "./../styles/Dashboard.css";

function Dashboard() {

  /* =========================
     HELPERS
  ========================= */

  const getDateTime = () => {
    return new Date().toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short"
    });
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  /* =========================
     STATE
  ========================= */

  const [data, setData] = useState([]);
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState("");

  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {
    const savedData = localStorage.getItem("dokumen");
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const loginUser = localStorage.getItem("username");
    if (loginUser) {
      setUser(loginUser);
    }
  }, []);

  /* =========================
     UPLOAD DATA
  ========================= */

  const tambahData = () => {
    if (judul === "" || kategori === "" || status === "") {
      alert("Lengkapi data");
      return;
    }

    if (!file || file.length === 0) {
      alert("Pilih file atau folder");
      return;
    }

    const newData = {
      id: Date.now(),
      user: user,
      judul: judul,
      kategori: kategori,
      status: status,
      tanggal: getDateTime(),

      files: Array.from(file).map((f) => ({
        nama: f.name,
        folder: f.webkitRelativePath || f.name,
        url: URL.createObjectURL(f),
        tanggal: getDateTime()
      }))
    };

    const updatedData = [...data, newData];

    setData(updatedData);
    localStorage.setItem("dokumen", JSON.stringify(updatedData));

    setJudul("");
    setKategori("");
    setStatus("");
    setFile(null);

    alert("Dokumen berhasil upload");
  };

  /* =========================
     DELETE DOKUMEN
  ========================= */

  const hapusData = (id) => {
    const password = window.prompt("Masukkan password delete");

    if (password !== "admin123") {
      alert("Password salah");
      return;
    }

    const konfirmasi = window.confirm("Yakin ingin menghapus dokumen?");
    if (!konfirmasi) return;

    const hasil = data.filter((item) => item.id !== id);

    setData(hasil);
    localStorage.setItem("dokumen", JSON.stringify(hasil));
  };

  /* =========================
     DELETE FILE
  ========================= */

  const hapusFile = (idDokumen, indexFile) => {
    const password = window.prompt("Masukkan password hapus file");

    if (password !== "admin123") {
      alert("Password salah");
      return;
    }

    const updatedData = data.map((item) => {
      if (item.id === idDokumen) {
        const newFiles = item.files.filter((_, i) => i !== indexFile);

        return {
          ...item,
          files: newFiles
        };
      }
      return item;
    });

    setData(updatedData);
    localStorage.setItem("dokumen", JSON.stringify(updatedData));
  };

  /* =========================
     TAMBAH FILE
  ========================= */

  const tambahFileKeFolder = (id, newFiles) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        const tambahanFile = Array.from(newFiles).map((f) => ({
          nama: f.name,
          folder: f.webkitRelativePath || f.name,
          url: URL.createObjectURL(f),
          tanggal: getDateTime()
        }));

        return {
          ...item,
          files: [...item.files, ...tambahanFile]
        };
      }

      return item;
    });

    setData(updatedData);
    localStorage.setItem("dokumen", JSON.stringify(updatedData));
  };

  /* =========================
     EDIT DATA
  ========================= */

  const editData = (id) => {
    const item = data.find((d) => d.id === id);
    if (!item) return;

    const judulBaru = window.prompt("Edit Judul", item.judul);
    if (judulBaru === null) return;

    const kategoriBaru = window.prompt("Edit Kategori", item.kategori);
    if (kategoriBaru === null) return;

    const statusBaru = window.prompt("Edit Status", item.status);
    if (statusBaru === null) return;

    const updatedData = data.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          judul: judulBaru,
          kategori: kategoriBaru,
          status: statusBaru
        };
      }
      return d;
    });

    setData(updatedData);
    localStorage.setItem("dokumen", JSON.stringify(updatedData));

    alert("Data berhasil diupdate");
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div>
          <h2>MRMIK</h2>
          <p className="sidebar-subtitle">Accreditation System</p>
        </div>

        <ul>
          <li className="active-menu">
            <FaChartBar /> Dashboard
          </li>
          <li>
            <FaFolderOpen /> Upload Eviden
          </li>
          <li>
            <FaFileAlt /> Monitoring
          </li>
        </ul>

        <button onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="content">

        {/* TOPBAR */}
        <div className="topbar">
          <div>
            <h1>Dashboard Akreditasi</h1>
            <p>Selamat datang, <b>{user}</b></p>
          </div>
        </div>

        {/* CARDS */}
        <div className="cards">

          <div className="card total-card">
            <h2>{data.length}</h2>
            <p>Total Dokumen</p>
            <FaFolderOpen className="card-icon" />
          </div>

          <div className="card success-card">
            <h2>{data.filter(d => d.status === "Lengkap").length}</h2>
            <p>Lengkap</p>
            <FaCheckCircle className="card-icon" />
          </div>

          <div className="card warning-card">
            <h2>{data.filter(d => d.status === "Progress").length}</h2>
            <p>Progress</p>
            <FaClock className="card-icon" />
          </div>

          <div className="card danger-card">
            <h2>{data.filter(d => d.status === "Terlambat").length}</h2>
            <p>Terlambat</p>
            <FaExclamationTriangle className="card-icon" />
          </div>

        </div>

        {/* UPLOAD */}
        <div className="upload-box">

          <h2>Upload Eviden</h2>

          <div className="form-grid">

            <input type="text" value={user} disabled />

            <input
              type="text"
              placeholder="Judul Dokumen"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />

            <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
              <option value="">Pilih Kategori</option>
              <option>MRMIK</option>
              <option>SNARS</option>
              <option>PMKP</option>
              <option>Mutu</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Status Dokumen</option>
              <option>Lengkap</option>
              <option>Progress</option>
              <option>Terlambat</option>
            </select>

            <label className="upload-btn">
              📄 Pilih File
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => setFile(e.target.files)}
              />
            </label>

            <label className="upload-btn folder-btn">
              📁 Pilih Folder
              <input
                type="file"
                hidden
                multiple
                webkitdirectory=""
                onChange={(e) => setFile(e.target.files)}
              />
            </label>

            <button onClick={tambahData}>
              Upload Dokumen
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="table-box">

          <h2>Monitoring Dokumen</h2>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Judul</th>
                <th>Status</th>
                <th>Isi Folder</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d, index) => (
                <tr key={d.id}>

                  <td>{index + 1}</td>
                  <td>{d.user}</td>
                  <td>{d.judul}</td>

                  <td>
                    <span className={`status ${d.status}`}>
                      {d.status}
                    </span>
                  </td>

                  <td>
                    {d.files && d.files.length > 0
                      ? Object.entries(
                          d.files.reduce((acc, file) => {
                            const folderName =
                              file.folder.includes("/")
                                ? file.folder.split("/")[0]
                                : "File";

                            if (!acc[folderName]) acc[folderName] = [];
                            acc[folderName].push(file);
                            return acc;
                          }, {})
                        ).map(([folderName, files], folderIndex) => (
                          <div key={folderIndex} className="folder-group">

                            <div className="folder-title">
                              📁 {folderName}
                            </div>

                            {files.map((f, i) => (
                              <div key={i} className="file-item">

                                <a
                                  href={f.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="lihat-btn"
                                >
                                  📄 {f.nama} - {f.tanggal}
                                </a>

                                <button
                                  className="hapus-file-btn"
                                  onClick={() => hapusFile(d.id, i)}
                                >
                                  ✕
                                </button>

                              </div>
                            ))}

                          </div>
                        ))
                      : "-"}
                  </td>

                  <td>
                    <div className="aksi-btn">

                      <label className="upload-mini-btn">
                        <FaPlus />
                        <input
                          type="file"
                          multiple
                          hidden
                          onChange={(e) =>
                            tambahFileKeFolder(d.id, e.target.files)
                          }
                        />
                      </label>

                      <button
                        className="edit-btn"
                        onClick={() => editData(d.id)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => hapusData(d.id)}
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;