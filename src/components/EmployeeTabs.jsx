import React from "react";
function EmployeeTabs({ employees, selectedEmployeeId, onSelectEmployee }) {
  return (
    <section>
      <h2>Danh sách nhân viên</h2>

      <div className="tabs">
        {employees.length === 0 && (
          <p>Chưa có nhân viên. Hãy thêm nhân viên đầu tiên.</p>
        )}

        {employees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            className={
              String(employee.id) === selectedEmployeeId ? "active" : ""
            }
            onClick={() => {
              onSelectEmployee(String(employee.id));
            }}
          >
            {employee.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default EmployeeTabs;
