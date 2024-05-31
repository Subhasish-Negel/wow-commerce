import Sidebar from "@/components/custom/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";

function Dashboard() {
  return (
    <Sidebar currentPage="Dashboard">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-y-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Total number of products in your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">250</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                Total number of customers in your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Revenue</CardTitle>
              <CardDescription>
                Total revenue generated in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$45,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Banned Users</CardTitle>
              <CardDescription>
                Total number of banned users in your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                The best selling products in your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Acme Prism T-Shirt</TableCell>
                    <TableCell>120</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Aqua Filters</TableCell>
                    <TableCell>90</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zest Juicers</TableCell>
                    <TableCell>80</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                The latest orders placed in your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#3210</TableCell>
                    <TableCell>Olivia Martin</TableCell>
                    <TableCell>February 20, 2022</TableCell>
                    <TableCell>$42.25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3209</TableCell>
                    <TableCell>Ava Johnson</TableCell>
                    <TableCell>January 5, 2022</TableCell>
                    <TableCell>$74.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3204</TableCell>
                    <TableCell>Michael Johnson</TableCell>
                    <TableCell>August 3, 2021</TableCell>
                    <TableCell>$64.75</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Banned Users</CardTitle>
              <CardDescription>
                The users that have been banned from your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Abusive behavior</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>Fraud</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>Spam</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </Sidebar>
  );
}

export default Dashboard;
