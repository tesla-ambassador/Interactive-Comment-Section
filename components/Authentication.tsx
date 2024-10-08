"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/providers/auth-store-provider";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrimaryButton from "./PrimaryButton";

export default function Authentication() {
  const { image } = useUserStore((state) => state);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage url={image.png} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        avoidCollisions={false}
        className="bg-background"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            console.log("Realest state of mind");
          }}
        >
          Login
        </DropdownMenuItem>
        <DropdownMenuItem>Sign up</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ProfileImage {
  url: string;
  heightAndWidth?: string;
}

export function ProfileImage({ url, heightAndWidth }: ProfileImage) {
  return (
    <Avatar className={`${heightAndWidth}`}>
      <AvatarImage src={url} />
      <AvatarFallback className="bg-neutral-veryLightGray">KM</AvatarFallback>
    </Avatar>
  );
}

export function SignUpForm() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Create a user account... I only need a name and Image.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <Input id="username" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="picture">Upload Image</Label>
              <Input id="picture" type="file" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="picture">Confirm Password</Label>
              <Input id="picture" type="password" defaultValue="" />
            </div>
          </CardContent>
          <CardFooter>
            <PrimaryButton label="Submit" />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Sign Up">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login and say something. I'm available for employment btw
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Name</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <PrimaryButton label="Submit" />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
