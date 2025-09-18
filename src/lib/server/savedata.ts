import type { RegisterForm } from "./types";
import prisma from "./prisma";

export async function saveData(data: RegisterForm) {

    const newEntry = await prisma.registerForm.create({
        data: {
            name: data.name,
            studentname: data.studentname,
            whatsapp: data.whatsapp,
            email: data.email
        }
    });

    return newEntry;
}