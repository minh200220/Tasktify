import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "@material-ui/core";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = ({ tasks }) => {
  const formatDate = (input) => {
    var datePart = input.slice(0, 10).match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  return (
    <ExcelFile
      element={
        <Button
          variant="contained"
          style={{ marginLeft: 10, paddingTop: 15, paddingBottom: 15 }}
        >
          Xuất file Excel
        </Button>
      }
      filename="Danh sách Công việc"
    >
      <ExcelSheet data={tasks} name="Danh sách Công việc">
        <ExcelColumn label="Công việc" value="nhom" />
        <ExcelColumn label="Người phân công" value="nguoiphancong" />
        <ExcelColumn label="Người thực hiện" value="nguoithuchien" />
        <ExcelColumn
          label="Ngày phân công"
          value={(col) => formatDate(col.ngayphancong)}
        />
        <ExcelColumn
          label="Ngày hết hạn"
          value={(col) => formatDate(col.ngayhethan)}
        />
        <ExcelColumn label="Nội dung" value="noidung" />
        <ExcelColumn label="Tiến độ (%)" value="ketqua" />
        <ExcelColumn label="Nhận xét" value="nhanxet" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Download;
