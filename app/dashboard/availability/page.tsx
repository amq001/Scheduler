import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Switch } from "../../../components/ui/switch";
import { prisma } from "../../lib/db";
import { requireUser } from "../../lib/hooks";
import { Select, SelectContent, SelectGroup, SelectValue } from "../../../components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function AvailabilityRoute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability!
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="flex flex-col gap-y-4">
          {data?.map((item) => (
            <div
              key={item?.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
            >
              <div className="flex items-center gap-x-3">
                <Switch defaultChecked={item.isActive} />
                <p>{item?.day}</p>
              </div>
              <Select >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </form>
    </Card>
  );
}
