import { Alert } from "octagon-ui";
import { IAnnouncement } from "./IAnnouncement";

export function NewsAnnouncementBox({ announcements }: { announcements: IAnnouncement[]}) {
    return (
        <section>
            <h2>Anuncios</h2>
            {announcements.map(announcement => (
                <Alert
                    key={announcement.id}
                    title={announcement.title}
                    message={announcement.message}
                    type={announcement.type as "info" | "warning" | "error" | "success"}
                    />
            ))}
        </section>
    )
}