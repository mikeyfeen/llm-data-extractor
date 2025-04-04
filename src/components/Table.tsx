import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableData } from "@/context/tableData";

export default function TableComponent() {
  const { tableData } = useTableData();

  return (
    tableData.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Feature</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="">Dependencies</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((feature, index) => (
            <TableRow key={index}>
              <TableCell>{feature.Feature}</TableCell>
              <TableCell>{feature.Description}</TableCell>
              <TableCell>{feature.Category}</TableCell>
              <TableCell>{feature.Dependencies}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
}
