"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { RoomCard } from "@/components/ui/room-card";
import { Input,ButtonB} from "@/components/ui/form-elements";
import Link from "next/link";
interface Room {
  id: number;
  slug: string;
  createdAt : string
}

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Bloading, setBLoading] = useState(false);
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const token = Cookies.get("token");
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await axios.get(`${HTTP_BACKEND}/rooms`);
          setRooms(response.data.rooms);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching rooms:", error);
          setLoading(false);
        }
      };
  
      fetchRooms();
    },[])

   if(!token){
    router.push('/auth');
   }
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      const response = await axios.post(`${HTTP_BACKEND}/room`,{
          name : slug
      },
      { withCredentials: true }
    )
    if(response.status !== 200 && response.data.roomId === undefined) {
      alert("Room currently unavailable");
    }
    if(response.status === 200 && response.data.roomId !== undefined) {
      router.push(`/canvas/${response.data.roomId}`)
    }
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      
      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Available Rooms</h1>
          
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Skeleton Loading
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-40 bg-card animate-pulse rounded-xl" />
            ))
          ) : (
            rooms.map((room : Room) => (
              <Link href={`/canvas/${room.id}`}>
              <Card 
                key={room.id} 
                className="group h-40 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-card via-card/80 to-accent/5 before:absolute before:inset-0 before:bg-grid-white/[0.02] before:content-['']"
              >
                <div className="relative z-20 p-4 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{room.slug}</h3>
                    {/* <p className="text-sm text-muted-foreground">
                      {room.participants} participants
                    </p> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge 
                      variant="default"
                      className="bg-opacity-15 backdrop-blur-sm"
                    >
                      {room.createdAt.split("T")[0]}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Open
                    </Button>
                  </div>
                </div>
              </Card>
              </Link>
            ))
          )}
        </div>
      </main>

      {/* Create Room FAB */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        size="icon"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <RoomCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Room</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Room name"
              aria-label="Room name"
              required
              error={error}
              onChange={(event: any) =>{
                setSlug(event.target.value)
              }}
            />
            <ButtonB type="submit" Bloading={Bloading}>
              Create Room
            </ButtonB>
          </form>
        </div>
      </RoomCard>
    </div>
  );
}