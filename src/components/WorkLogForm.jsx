import React from "react";
function WorkLogForm({
  employee,
  workLogForm,
  onChange,
  onSubmit,
  onDeleteEmployee,
}) {
  return (
    <section>
      <div className="head">
        <h2>Chấm công: {employee.name}</h2>

        {/* <button type="button" className="danger" onClick={onDeleteEmployee}>
          Xóa nhân viên
        </button> */}
      </div>

      <form onSubmit={onSubmit} className="grid log">
        <input
          type="date"
          name="work_date"
          value={workLogForm.work_date}
          onChange={onChange}
          required
        />

        {/* <select name="shift" value={workLogForm.shift} onChange={onChange}>
          <option value="Sáng">Sáng</option>
          <option value="Chiều">Chiều</option>
          <option value="Tối">Tối</option>
        </select> */}

        <input
          type="number"
          name="meso_start"
          placeholder="Meso đầu ngày"
          value={workLogForm.meso_start}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="meso_end"
          placeholder="Meso cuối ngày"
          value={workLogForm.meso_end}
          onChange={onChange}
          required
        />
        <br />
        <input
          type="number"
          name="pink_pot_start"
          placeholder="Pot hồng đầu ngày"
          value={workLogForm.pink_pot_start}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="pink_pot_end"
          placeholder="Pot hồng cuối ngày"
          value={workLogForm.pink_pot_end}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="pink_pot_price"
          placeholder="Đơn giá Pot hồng"
          value={workLogForm.pink_pot_price}
          onChange={onChange}
          required
        />
        <br />
        <input
          type="number"
          name="purple_pot_start"
          placeholder="Pot tím đầu ngày"
          value={workLogForm.purple_pot_start}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="purple_pot_end"
          placeholder="Pot tím cuối ngày"
          value={workLogForm.purple_pot_end}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="purple_pot_price"
          placeholder="Đơn giá Pot tím"
          value={workLogForm.purple_pot_price}
          onChange={onChange}
          required
        />

        <button type="submit">Lưu công</button>
      </form>

      <small>
        Meso thực nhận = Meso cuối − Meso đầu − (Pot hồng dùng × Giá Pot hồng) −
        (Pot tím dùng × Giá Pot tím).
      </small>
    </section>
  );
}

export default WorkLogForm;
