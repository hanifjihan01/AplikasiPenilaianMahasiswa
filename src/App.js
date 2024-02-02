import React, { useState } from 'react';


import logo from './user.png';

function App() {
  const [students, setStudents] = useState([
    { name: 'Mahasiswa 1', scores: Array(4).fill('') },
    { name: 'Mahasiswa 2', scores: Array(4).fill('') },
    { name: 'Mahasiswa 3', scores: Array(4).fill('') },
    { name: 'Mahasiswa 4', scores: Array(4).fill('') }
  ]);

  const handleInputChange = (index, aspectIndex, value) => {
    const newStudents = [...students];
    newStudents[index].scores[aspectIndex] = parseInt(value); 
    setStudents(newStudents);
  };

  const handleSaveClick = () => {
    const jsonOutput = {};

    students.forEach((student, studentIndex) => {
      student.scores.forEach((score, aspectIndex) => {
        const aspectKey = `Aspek_penilaian_${aspectIndex + 1}`;
        if (!jsonOutput[aspectKey]) {
          jsonOutput[aspectKey] = {};
        }
        const studentKey = `Mahasiswa_${studentIndex + 1}`;
        jsonOutput[aspectKey][studentKey] = score;
      });
    });

    console.log(jsonOutput); 
    alert('Data berhasil dihasilkan, cek konsol untuk output JSON.');
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h1 className="mb-4 text-center">Aplikasi Penilaian Mahasiswa</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light text-center">
            <tr>
              <th>Nama Mahasiswa</th>
              <th>Aspek Penilaian 1</th>
              <th>Aspek Penilaian 2</th>
              <th>Aspek Penilaian 3</th>
              <th>Aspek Penilaian 4</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
                    {student.name}
                  </div>
                </td>
                {student.scores.map((score, aspectIndex) => (
                  <td key={aspectIndex}>
                    <select
                      className="form-control"
                      value={score}
                      onChange={(e) => handleInputChange(studentIndex, aspectIndex, e.target.value)}
                    >
                      <option value="">Pilih Nilai</option>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((score) => (
                        <option key={score} value={score}>{score}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSaveClick}>Simpan</button>
      </div>
    </div>
  );
}

export default App;
