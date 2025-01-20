"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Loader2 } from "lucide-react";
import Cookies from 'js-cookie'
import axios from "axios";
 function SignIn() : any {
  const [isLoading, setIsLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your sign-in logic here
    try {
      const response = await axios.post("http://localhost:4000/signin",{
        data : {
          email,
          password
        }
      })
      if(response.status === 200 && response.data.token !== undefined) {
        Cookies.set('token', response.data.token, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        alert("Signed in successfully")
      }
    } catch (error) {
      
      alert("Error: " + error);
      setIsLoading(true);
    }
  };

  return (
    <Card className="p-6 backdrop-blur-md bg-black/40 border-muted/20 shadow-2xl">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                required
                className="pl-9"
                onChange={(event: any) =>{
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                required
                className="pl-9"
                onChange={(event: any) =>{
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign In
          </Button>
        </form>

        <div className="text-center">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </Card>
  );
}
export default SignIn;