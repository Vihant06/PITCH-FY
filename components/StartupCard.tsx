import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

type Author = {
  _id: string;
  name: string;
  image?: string;
  bio?: string;
};

type Startup = {
  _id: string;
  _createdAt: string;
  title: string;
  slug?: { _type: "slug"; current: string };
  author?: Author;
  views?: number;
  description?: string;
  category?: string;
  image?: string;
  pitch?: string;
};

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="bg-white border-[5px] border-black rounded-[22px] px-5 py-4 shadow-md hover:border-red-400 hover:bg-red-100 transition-all duration-300 group">
      <div className="flex justify-between items-center">
        <p className="text-sm bg-red-100 text-black px-3 py-1 rounded-full group-hover:bg-white transition">
          {formatDate(_createdAt)}
        </p>
        <div className="flex items-center gap-2 text-black text-sm">
          <EyeIcon className="w-5 h-5 text-red-100" />
          <span>{views}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-black text-sm font-medium line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-black text-xl font-bold line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={
              author?.image && author.image.trim() !== ""
                ? author.image
                : "/logo.png"
            }
            alt={author?.name || "avatar"}
            width={40}
            height={40}
            style={{ width: 40, height: 40 }}
            className="rounded-full ml-2"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="text-black text-sm font-normal mt-3 mb-2 line-clamp-2 break-words">
          {description}
        </p>
        <img
          src={image && image.trim() !== "" ? image : "/logo.png"}
          alt="cover"
          className="w-full h-[150px] object-cover rounded-[10px]"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Link>

      <div className="flex justify-between items-center mt-4">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-black text-sm font-medium">{category}</p>
        </Link>
        <Button
          className="bg-white border-[3px] border-black rounded-full px-4 py-2 text-black font-semibold hover:bg-black hover:text-white transition"
          asChild
        >
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

// export const StartupCardSkeleton = () => (
//   <>
//     {[0, 1, 2, 3, 4].map((index: number) => (
//       <li key={cn("skeleton", index)}>
//         <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400;" />
//       </li>
//     ))}
//   </>
// );

export default StartupCard;
