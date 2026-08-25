import React, { useEffect, useState } from "react";
import { formatInputNumber, removeNumberFormat } from "../utils/format";

function EmployeeRateSettings({ employee, onSave }) {
  const [form, setForm] = useState({
    meso_hour: "",
    hourly_rate: "",
  });

  useEffect(() => {
    if (!employee) {
      return;
    }

    setForm({
      meso_hour: formatInputNumber(employee.meso_hour),
      hourly_rate: formatInputNumber(employee.hourly_rate),
    });
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: formatInputNumber(value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const mesoHour = Number(removeNumberFormat(form.meso_hour));

    const hourlyRate = Number(removeNumberFormat(form.hourly_rate));

    if (!mesoHour || mesoHour <= 0) {
      window.alert("KPI Meso/giờ phải lớn hơn 0.");
      return;
    }

    if (hourlyRate < 0) {
      window.alert("Đơn giá giờ không được âm.");
      return;
    }

    const isConfirmed = window.confirm(
      `Xác nhận cập nhật mức lương cho ${employee.name}?

KPI Meso/giờ mới: ${mesoHour.toLocaleString("vi-VN")}
Đơn giá giờ mới: ${hourlyRate.toLocaleString("vi-VN")} VNĐ

Mức mới chỉ áp dụng cho các dòng công tạo sau khi cập nhật.
Các dòng công cũ sẽ không bị thay đổi.`,
    );

    if (!isConfirmed) {
      return;
    }

    onSave({
      meso_hour: mesoHour,
      hourly_rate: hourlyRate,
    });
  };

  return (
    <section>
      <h2>Điều chỉnh lương: {employee.name}</h2>

      <form onSubmit={handleSubmit} className="grid">
        <input
          type="text"
          name="meso_hour"
          placeholder="KPI Meso/giờ"
          value={form.meso_hour}
          onChange={handleChange}
          inputMode="numeric"
          required
        />

        <input
          type="text"
          name="hourly_rate"
          placeholder="Đơn giá giờ VNĐ"
          value={form.hourly_rate}
          onChange={handleChange}
          inputMode="numeric"
          required
        />

        <button type="submit">Lưu mức mới</button>
      </form>

      <small>Ví dụ KPI: 7,000,000. Ví dụ đơn giá giờ: 22,000 VNĐ.</small>
    </section>
  );
}

export default EmployeeRateSettings;
