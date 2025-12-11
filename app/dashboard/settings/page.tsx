import { notFound } from "next/navigation";
import { SettingsForm } from "../../customComponents/SettingsForm";
import { prisma } from "../../lib/db";
import { requireUser } from "../../lib/hooks";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function Settingsroute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);
  return (
    <div>
      {/* <h1>Hello from the settings</h1> */}
      <SettingsForm
        email={data?.email as string}
        fullName={data?.name as string}
        profileImage={data?.image as string}
      />
    </div>
  );
}
