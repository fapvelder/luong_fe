import React, { useEffect, useState } from "react";
import EmployeeRateSettings from "./components/EmployeeRateSettings";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTabs from "./components/EmployeeTabs";
import WorkLogForm from "./components/WorkLogForm";
import PayrollTable from "./components/PayrollTable";

import { requestApi } from "./services/api";
import { today, currentMonth } from "./utils/format";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [workLogs, setWorkLogs] = useState([]);
  const [selectedLogIds, setSelectedLogIds] = useState([]);
  const [message, setMessage] = useState("");

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    meso_hour: 9000000,
    hourly_rate: 30000,
  });

  const [workLogForm, setWorkLogForm] = useState({
    work_date: today,
    shift: "Sáng",

    meso_start: "",
    meso_end: "",

    pink_pot_start: "",
    pink_pot_end: "",
    pink_pot_price: 9000,

    purple_pot_start: "",
    purple_pot_end: "",
    purple_pot_price: 14000,
  });

  const selectedEmployee = employees.find(
    (employee) => String(employee.id) === selectedEmployeeId,
  );

  const totalSalary = workLogs.reduce((total, log) => {
    return total + log.salary;
  }, 0);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const loadEmployees = async () => {
    try {
      const data = await requestApi("/employees");

      setEmployees(data);

      if (!selectedEmployeeId && data.length > 0) {
        setSelectedEmployeeId(String(data[0].id));
      }
    } catch (error) {
      showMessage(error.message);
    }
  };

  const loadWorkLogs = async () => {
    if (!selectedEmployeeId) {
      setWorkLogs([]);
      return;
    }

    try {
      const data = await requestApi(
        `/logs?employee_id=${selectedEmployeeId}&month=${selectedMonth}`,
      );

      setWorkLogs(data);
      setSelectedLogIds([]);
    } catch (error) {
      showMessage(error.message);
    }
  };
  const handleUpdateEmployeeRate = async (rateData) => {
    if (!selectedEmployeeId) {
      return;
    }

    try {
      const result = await requestApi(`/employees/${selectedEmployeeId}`, {
        method: "PATCH",
        body: JSON.stringify(rateData),
      });

      await loadEmployees();

      showMessage(result.message);
    } catch (error) {
      showMessage(error.message);
    }
  };
  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadWorkLogs();
  }, [selectedEmployeeId, selectedMonth]);
  const handleToggleWorkLog = (workLogId) => {
    setSelectedLogIds((currentIds) => {
      const isSelected = currentIds.includes(workLogId);

      if (isSelected) {
        return currentIds.filter((id) => id !== workLogId);
      }

      return [...currentIds, workLogId];
    });
  };

  const handleMarkSelectedLogsAsPaid = async () => {
    if (selectedLogIds.length === 0) {
      showMessage("Vui lòng chọn ít nhất một ngày công.");
      return;
    }

    const isConfirmed = window.confirm(
      `Bạn có chắc muốn trả lương cho ${selectedLogIds.length} ngày đã chọn không?`,
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const result = await requestApi("/logs/mark-paid", {
        method: "PATCH",
        body: JSON.stringify({
          employee_id: Number(selectedEmployeeId),
          log_ids: selectedLogIds,
        }),
      });

      await loadWorkLogs();

      showMessage(result.message);
    } catch (error) {
      showMessage(error.message);
    }
  };

  const handleMarkLogAsUnpaid = async (workLogId) => {
    const isConfirmed = window.confirm(
      "Chuyển ngày công này về trạng thái chưa trả lương?",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const result = await requestApi(`/logs/${workLogId}/unpaid`, {
        method: "PATCH",
      });

      await loadWorkLogs();

      showMessage(result.message);
    } catch (error) {
      showMessage(error.message);
    }
  };
  const handleEmployeeFormChange = (event) => {
    const { name, value } = event.target;

    setEmployeeForm({
      ...employeeForm,
      [name]: value,
    });
  };

  const handleWorkLogFormChange = (event) => {
    const { name, value } = event.target;

    setWorkLogForm({
      ...workLogForm,
      [name]: value,
    });
  };

  const handleAddEmployee = async (event) => {
    event.preventDefault();

    try {
      await requestApi("/employees", {
        method: "POST",
        body: JSON.stringify(employeeForm),
      });

      setEmployeeForm({
        name: "",
        meso_hour: 7000000,
        hourly_rate: 22000,
      });

      await loadEmployees();

      showMessage("Đã thêm nhân viên thành công.");
    } catch (error) {
      showMessage(error.message);
    }
  };

  const handleAddWorkLog = async (event) => {
    event.preventDefault();

    if (!selectedEmployeeId) {
      showMessage("Vui lòng chọn nhân viên trước.");
      return;
    }

    try {
      await requestApi("/logs", {
        method: "POST",
        body: JSON.stringify({
          ...workLogForm,
          employee_id: Number(selectedEmployeeId),
        }),
      });

      setWorkLogForm({
        ...workLogForm,

        meso_start: "",
        meso_end: "",

        pink_pot_start: "",
        pink_pot_end: "",

        purple_pot_start: "",
        purple_pot_end: "",
      });

      await loadWorkLogs();

      showMessage("Đã lưu dòng công thành công.");
    } catch (error) {
      showMessage(error.message);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployeeId) {
      return;
    }

    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa nhân viên này và toàn bộ dòng công của họ không?",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await requestApi(`/employees/${selectedEmployeeId}`, {
        method: "DELETE",
      });

      setSelectedEmployeeId("");
      setWorkLogs([]);

      await loadEmployees();

      showMessage("Đã xóa nhân viên.");
    } catch (error) {
      showMessage(error.message);
    }
  };

  const handleDeleteWorkLog = async (workLogId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa dòng công này không?",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await requestApi(`/logs/${workLogId}`, {
        method: "DELETE",
      });

      await loadWorkLogs();

      showMessage("Đã xóa dòng công.");
    } catch (error) {
      showMessage(error.message);
    }
  };

  return (
    <main>
      <h1>Quản lý lương</h1>

      {message && <p className="msg">{message}</p>}

      <EmployeeForm
        employeeForm={employeeForm}
        onChange={handleEmployeeFormChange}
        onSubmit={handleAddEmployee}
      />

      <EmployeeTabs
        employees={employees}
        selectedEmployeeId={selectedEmployeeId}
        onSelectEmployee={setSelectedEmployeeId}
      />

      {selectedEmployee && (
        <>
          <EmployeeRateSettings
            employee={selectedEmployee}
            onSave={handleUpdateEmployeeRate}
          />
          <WorkLogForm
            employee={selectedEmployee}
            workLogForm={workLogForm}
            onChange={handleWorkLogFormChange}
            onSubmit={handleAddWorkLog}
            onDeleteEmployee={handleDeleteEmployee}
          />

          <PayrollTable
            employee={selectedEmployee}
            selectedMonth={selectedMonth}
            totalSalary={totalSalary}
            workLogs={workLogs}
            selectedLogIds={selectedLogIds}
            onChangeMonth={setSelectedMonth}
            onToggleWorkLog={handleToggleWorkLog}
            onMarkSelectedAsPaid={handleMarkSelectedLogsAsPaid}
            onMarkLogAsUnpaid={handleMarkLogAsUnpaid}
            onDeleteWorkLog={handleDeleteWorkLog}
          />
        </>
      )}
    </main>
  );
}

export default App;
