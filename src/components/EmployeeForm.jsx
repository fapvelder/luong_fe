import React from "react";
function EmployeeForm({ employeeForm, onChange, onSubmit }) {
  return (
    <section>
      <h2>Thêm nhân viên</h2>

      <form onSubmit={onSubmit} className="grid">
        <input
          type="text"
          name="name"
          placeholder="Tên nhân viên"
          value={employeeForm.name}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="meso_hour"
          placeholder="Meso mỗi giờ"
          value={employeeForm.meso_hour}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="hourly_rate"
          placeholder="Đơn giá giờ"
          value={employeeForm.hourly_rate}
          onChange={onChange}
          required
        />

        <button type="submit">Thêm nhân viên</button>
      </form>

      <small>
        Meso/giờ mặc định: 9,000,000. Đơn giá giờ mặc định: 30,000 VNĐ.
      </small>
    </section>
  );
}

export default EmployeeForm;
