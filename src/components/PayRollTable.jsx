import { formatNumber } from "../utils/format";
import React from "react";
function PayrollTable({
  employee,
  selectedMonth,
  totalSalary,
  workLogs,
  selectedLogIds,
  onChangeMonth,
  onToggleWorkLog,
  onMarkSelectedAsPaid,
  onMarkLogAsUnpaid,
  onDeleteWorkLog,
}) {
  const unpaidSalary = workLogs
    .filter((workLog) => workLog.is_paid === 0)
    .reduce((total, workLog) => {
      return total + workLog.salary;
    }, 0);

  const paidSalary = workLogs
    .filter((workLog) => workLog.is_paid === 1)
    .reduce((total, workLog) => {
      return total + workLog.salary;
    }, 0);

    

  return (
    <section>
      <div className="head">
        <h2>Bảng lương riêng: {employee.name}</h2>

        <input
          type="month"
          value={selectedMonth}
          onChange={(event) => {
            onChangeMonth(event.target.value);
          }}
        />
      </div>

      <h3>Tổng lương tháng: {formatNumber(totalSalary)} VNĐ</h3>

      <p>
        Chưa trả: {formatNumber(unpaidSalary)} VNĐ
        {" | "}
        Đã trả: {formatNumber(paidSalary)} VNĐ
      </p>

      <button
        type="button"
        onClick={onMarkSelectedAsPaid}
        disabled={selectedLogIds.length === 0}
      >
        Đã trả lương cho {selectedLogIds.length} ngày đã chọn
      </button>

      <div className="wrap">
        <table>
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Ngày</th>
              {/* <th>Ca</th> */}

              <th>Pot hồng</th>
              <th>Pot tím</th>

              <th>Điều chỉnh Pot hồng</th>
              <th>Điều chỉnh Pot tím</th>

              <th>Meso thực nhận</th>
              <th>Số giờ</th>
              <th>Lương VNĐ</th>

              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {workLogs.length === 0 && (
              <tr>
                <td colSpan="12">Chưa có dữ liệu chấm công trong tháng này.</td>
              </tr>
            )}

            {workLogs.map((workLog) => {
              const isPaid = workLog.is_paid === 1;

              return (
                <tr key={workLog.id} className={isPaid ? "paid-row" : ""}>
                  <td>
                    {!isPaid && (
                      <input
                        type="checkbox"
                        checked={selectedLogIds.includes(workLog.id)}
                        onChange={() => {
                          onToggleWorkLog(workLog.id);
                        }}
                      />
                    )}
                  </td>

                  <td>{workLog.work_date}</td>
                  {/* <td>{workLog.shift}</td> */}

                  <td>{formatNumber(workLog.pink_pot_change)}</td>

                  <td>{formatNumber(workLog.purple_pot_change)}</td>

                  <td>{formatNumber(workLog.pink_pot_meso_adjustment)}</td>

                  <td>{formatNumber(workLog.purple_pot_meso_adjustment)}</td>

                  <td>{formatNumber(workLog.meso_net)}</td>

                  <td>{formatNumber(workLog.hours)}</td>

                  <td>{formatNumber(workLog.salary)}</td>

                  <td>
                    {isPaid ? (
                      <span className="paid-status">Đã trả</span>
                    ) : (
                      <span className="unpaid-status">Chưa trả</span>
                    )}
                  </td>

                  <td>
                    {isPaid && (
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => {
                          onMarkLogAsUnpaid(workLog.id);
                        }}
                      >
                        Hoàn tác
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => {
                        onDeleteWorkLog(workLog.id);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PayrollTable;
