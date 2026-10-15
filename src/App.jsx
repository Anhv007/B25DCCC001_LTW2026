import { useState } from 'react';
import StudentList from './StudentList';
import './App.css';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'D25CQCN01' },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, class: 'D25CQCN01' },
  { id: 3, name: 'Lê Hoàng Cường', score: 7, class: 'D25CQCN02' },
  { id: 4, name: 'Phạm Minh Dũng', score: 9.2, class: 'D25CQCN02' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ name: '', score: '', class: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { name, score, class: className } = form;

    if (!name.trim() || score === '' || !className.trim()) {
      setError('Vui lòng nhập đầy đủ họ tên, điểm số và lớp!');
      return;
    }

    const numScore = Number(score);
    if (Number.isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError('Điểm số phải nằm trong khoảng từ 0 đến 10!');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numScore,
      class: className.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setForm({ name: '', score: '', class: '' });
    setError('');
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter(({ score }) => {
    if (filter === 'good') return score >= 8;
    if (filter === 'fail') return score < 5;
    return true;
  });

  const total = students.length;
  const average =
    total > 0
      ? students.reduce((sum, { score }) => sum + score, 0) / total
      : 0;

  return (
    <div className="container">
      <h1>Quản lý Điểm Sinh viên</h1>

      <form className="form" onSubmit={handleAdd}>
        <input name="name" placeholder="Họ tên" value={form.name} onChange={handleChange} />
        <input name="score" type="number" step="0.1" placeholder="Điểm số" value={form.score} onChange={handleChange} />
        <input name="class" placeholder="Lớp" value={form.class} onChange={handleChange} />
        <button type="submit">Thêm</button>
      </form>
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tất cả</button>
        <button className={filter === 'good' ? 'active' : ''} onClick={() => setFilter('good')}>Giỏi (≥ 8)</button>
        <button className={filter === 'fail' ? 'active' : ''} onClick={() => setFilter('fail')}>Trượt (&lt; 5)</button>
      </div>

      <p className="stats">
        {`Tổng số sinh viên: ${total} | Điểm trung bình: ${average.toFixed(2)}`}
      </p>

      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;