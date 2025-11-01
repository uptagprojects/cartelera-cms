"use client";

import { useRouter } from "next/navigation";

import { ManageHeader } from "../../_components/ManageHeader";

export const CourseHeader = () => {
    const router = useRouter();

    return (
        <ManageHeader
            title="Cursos"
            label="crear curso"
            onClick={() => {
                const id = globalThis.crypto.randomUUID();
                router.push(`/manage/courses/${id}`);
            }}
        />
    );
};
