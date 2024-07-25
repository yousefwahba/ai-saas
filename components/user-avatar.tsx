import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export const UserAvater = () => {
  const { user } = useUser();
  return (
    <Avatar className="w-8 h-8 bg-muted  flex items-center justify-center">
      {/* <AvatarImage src={user?.imageUrl} />
      <AvatarFallback> */}
      {user?.firstName?.charAt(0)}
      {user?.lastName?.charAt(0)}
      {/* </AvatarFallback> */}
    </Avatar>
  );
};
