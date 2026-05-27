export default function SummaryBox({ title, value, color }) {
  return (
    <div className={`summary-box ${color}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
