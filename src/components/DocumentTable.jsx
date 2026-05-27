export default function DocumentTable({ data }) {
  return (
    <table className="doc-table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Kategori</th>
          <th>Status</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        {data.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.judul}</td>
            <td>{doc.kategori}</td>
            <td>{doc.status}</td>
            <td>{doc.target}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
