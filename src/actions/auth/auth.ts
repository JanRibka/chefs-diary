"use server";

import { redirect } from "next/navigation";

import { signIn as logIn } from "@/config/auth/auth";
import { prisma } from "@/lib/prisma";
// import { loginSchema } from "@/lib/validations/web/login/loginSchema";
import { registerSchema } from "@/lib/validations/web/register/registerSchema";

export const signUp = async (formData: FormData) => {
  // TODO: Pokus se n2co posere, tak se mus9 ud2lat rollback
  // const [posts, totalPosts] = await prisma.$transaction([
  //   prisma.post.findMany({ where: { title: { contains: 'prisma' } } }),
  //   prisma.post.count(),
  // ])

  const login = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");
  const validatedData = registerSchema.parse({ login, email, password });

  await prisma.user.create({
    data: {
      Login: validatedData.login,
      Email: validatedData.email.toLowerCase(),
      Password: validatedData.password,
    },
  });

  // if (res.success) {
  //   redirect(webRoutes.Login);
  // }
};

export const signIn = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  // const validatedData = loginSchema.parse({ email, password });
  const response = await logIn("credentials", {
    email,
    password,
    redirect: false, //TODO: Zjistit, co to dělá
  });

  if (response?.ok) redirect("/dashboard");
  if (response?.error) {
  }
};
