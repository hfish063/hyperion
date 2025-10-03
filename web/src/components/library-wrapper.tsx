import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function LibraryWrapper() {
  return (
    <div className="flex flex-col space-y-4">
      <UserProfileHeader />
      <h2 className="text-2xl font-semibold">Books</h2>
      <hr />
    </div>
  );
}

function UserProfileHeader() {
  return (
    <div className="flex flex-row space-x-2 items-center">
      <Avatar className="size-12">
        <AvatarImage src={""} alt="" />
        <AvatarFallback>{/* Username */}</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold">User</h1>
    </div>
  );
}
