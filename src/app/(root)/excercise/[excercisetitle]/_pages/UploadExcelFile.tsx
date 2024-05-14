"use client";
import { projectSchema } from "@/app/(root)/[crudproduct]/add-edit-project-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import * as XLSX from "xlsx";
import { z } from "zod";
import { createProject } from "../../../../../../actions/project";

const UploadExcelFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [isloading, setIsloading] = useState(false)

  //this function Convert Excel file to JSON DATA
  function previewData() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // select which SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  //this function read the the send post data to database to create the file
  function saveData() {
    setIsloading(true)
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json: z.infer<typeof projectSchema>[] =
          XLSX.utils.sheet_to_json(workSheet);
          try {
            //Save to the DB
            await createProject(json);
          } catch (error) {
            console.log(error);
          }
          setIsloading(false)
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  return (
    <section>
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          disabled={isloading}
        />
        <Button onClick={previewData}>Preview </Button>
        <Button onClick={saveData} disabled={isloading}>Save</Button>
        <Button variant="destructive">Clear</Button>
      </div>
      <Table className="top-0 hidden">
        <TableCaption>A list of Projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <pre className="mt-2  rounded-md bg-slate-950 p-4">
        <code className="text-white">{jsonData}</code>
      </pre>
    </section>
  );
};

export default UploadExcelFile;
