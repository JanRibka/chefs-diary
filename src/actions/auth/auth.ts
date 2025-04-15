"use server";

import { redirect } from "next/navigation";

import { signIn as logIn } from "@/config/auth/auth";
// import { prisma } from "@/lib/prisma";
import webRoutes from "@/lib/routes/web/routes";
// import { loginSchema } from "@/lib/validations/web/login/loginSchema";
import { SignUpActionState } from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

export const signUpAction = async (
  _prev: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> => {
  // TODO: Pokus se n2co posere, tak se mus9 ud2lat rollback
  // const [posts, totalPosts] = await prisma.$transaction([
  //   prisma.post.findMany({ where: { title: { contains: 'prisma' } } }),
  //   prisma.post.count(),
  // ])
  debugger;
  const form = Object.fromEntries(formData);
  console.log("form", form);
  // const validationResult = signUpFormValidationSchema.safeParse(form);

  // if (!validationResult.success) {
  //   return {
  //     form,
  //     errors: validationResult.error.flatten().fieldErrors,
  //   } as unknown as SignUpActionState;
  // }

  // await prisma.user.create({
  //   data: {
  //     Login: validatedData.login,
  //     Email: validatedData.email.toLowerCase(),
  //     Password: validatedData.password,
  //   },
  // });

  // if (res.success) {
  //   redirect(webRoutes.Login);
  // }

  redirect(webRoutes.Login);
};

export const signInAction = async (formData: FormData) => {
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
