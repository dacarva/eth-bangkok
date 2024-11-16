"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Dummy data for invited users
const invitedUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    address: "0x1234...5678",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    address: "0xabcd...efgh",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    address: "0x9876...5432",
  },
];

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the invitation
    console.log("Inviting:", email);
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${email}`,
    });
    setEmail("");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Invitation Dashboard</h1>

      <Card className="w-1/2 mb-6 bg-muted/50">
        <CardContent className="p-2">
          <form onSubmit={handleInvite} className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Invite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow border-none bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit">Invite</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Invited Users</CardTitle>
          <CardDescription>List of users who have been invited</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <a
                      href={`https://blockscout.com/gnosis/mainnet/address/${user.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      {user.address}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
