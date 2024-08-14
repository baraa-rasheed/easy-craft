import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./primitives/Table";
import Card from "./Card";

export default function TableCard() {
  const data: Array<{
    workspace: string;
    owner: string;
    status: string;
    costs: string;
    region: string;
    capacity: string;
    lastEdited: string;
  }> = [
    {
      workspace: "sales_by_day_api",
      owner: "John Doe",
      status: "Live",
      costs: "$3,509.00",
      region: "US-West 1",
      capacity: "99%",
      lastEdited: "23/09/2023 13:00",
    },
    {
      workspace: "marketing_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "test_environment",
      owner: "David Clark",
      status: "Inactive",
      costs: "$800.00",
      region: "EU-Central 1",
      capacity: "40%",
      lastEdited: "25/09/2023 16:20",
    },
    {
      workspace: "test_environment",
      owner: "David Clark",
      status: "Inactive",
      costs: "$800.00",
      region: "EU-Central 1",
      capacity: "40%",
      lastEdited: "25/09/2023 16:20",
    },
  ];

  return (
    <Card>
      <TableRoot className="h-72">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="">{item.workspace}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </Card>
  );
}
