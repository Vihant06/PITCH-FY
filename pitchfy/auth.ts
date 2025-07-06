import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const name = user?.name;
      const email = user?.email;
      const image = user?.image;
      const id = profile?.id;
      const login = profile?.login;
      const bio = profile?.bio;

      console.log("[auth.ts] signIn: id", id);

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      console.log("[auth.ts] signIn: existingUser", existingUser);

      if (!existingUser) {
        const created = await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
        console.log("[auth.ts] signIn: created author", created);
      } else {
        const patched = await writeClient
          .patch(existingUser._id)
          .set({
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          })
          .commit();
        console.log("[auth.ts] signIn: patched author", patched);
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});